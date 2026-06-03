import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import { fetchMissions, type Mission } from '@/lib/api';
import { MissionCard } from '@/components/MissionCard';
import { ValidationBanner } from '@/components/ValidationBanner';
import { colors, spacing } from '@/lib/theme';

export default function HomeTab() {
  const { accessToken, profile, isChefOrAdmin } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [filterPending, setFilterPending] = useState(false);

  const load = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    const { data } = await fetchMissions(accessToken, {
      status: filterPending ? 'en_attente_validation' : undefined,
      q: q.trim() || undefined,
    });
    setMissions(data?.missions ?? []);
    setLoading(false);
  }, [accessToken, filterPending, q]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  useEffect(() => {
    void load();
  }, [filterPending]);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Bonjour{profile?.email ? `, ${profile.email.split('@')[0]}` : ''}
      </Text>
      <ValidationBanner compact />
      <TextInput
        style={styles.search}
        placeholder="Rechercher…"
        value={q}
        onChangeText={setQ}
        onSubmitEditing={() => void load()}
        returnKeyType="search"
      />
      <View style={styles.filters}>
        <Pressable
          style={[styles.chip, filterPending && styles.chipActive]}
          onPress={() => {
            setFilterPending((v) => !v);
            setTimeout(() => void load(), 0);
          }}
        >
          <Text style={[styles.chipText, filterPending && styles.chipTextActive]}>À valider</Text>
        </Pressable>
        {isChefOrAdmin && (
          <Text style={styles.adminHint}>Accès chef — onglet Admin</Text>
        )}
      </View>
      <FlatList
        data={missions}
        keyExtractor={(m) => m.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        renderItem={({ item }) => (
          <MissionCard mission={item} href={`/mission/${item.id}`} />
        )}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>Aucune demande. Créez-en une via l&apos;onglet Nouvelle.</Text>
          ) : null
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  greeting: { fontSize: 20, fontWeight: '700', color: colors.navy, marginBottom: spacing.sm },
  search: {
    marginTop: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    fontSize: 15,
  },
  filters: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: spacing.sm },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  chipActive: { backgroundColor: colors.blueSoft, borderColor: colors.blue },
  chipText: { fontSize: 13, color: colors.slate600 },
  chipTextActive: { color: colors.blue, fontWeight: '600' },
  adminHint: { fontSize: 11, color: colors.slate500, flex: 1 },
  empty: { textAlign: 'center', color: colors.slate500, marginTop: 32, paddingHorizontal: 16 },
});
