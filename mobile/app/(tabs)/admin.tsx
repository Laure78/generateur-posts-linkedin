import { useCallback, useState } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Redirect, useFocusEffect } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import { fetchMissions, type Mission } from '@/lib/api';
import { MissionCard } from '@/components/MissionCard';
import { ValidationBanner } from '@/components/ValidationBanner';
import { colors, spacing } from '@/lib/theme';

export default function AdminTab() {
  const { accessToken, isChefOrAdmin } = useAuth();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  if (!isChefOrAdmin) {
    return <Redirect href="/(tabs)" />;
  }

  const load = useCallback(async () => {
    if (!accessToken) return;
    setLoading(true);
    const { data } = await fetchMissions(accessToken, { status: 'en_attente_validation' });
    const pending = (data?.missions ?? []).filter((m) => !m.chef_validated_at);
    setMissions(pending);
    setLoading(false);
  }, [accessToken]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administration</Text>
      <Text style={styles.sub}>Livrables à valider avant envoi client</Text>
      <ValidationBanner />
      <FlatList
        data={missions}
        keyExtractor={(m) => m.id}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        renderItem={({ item }) => (
          <MissionCard mission={item} href={`/mission/${item.id}?admin=1`} />
        )}
        ListEmptyComponent={
          !loading ? (
            <Text style={styles.empty}>Aucun livrable en attente de validation.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  title: { fontSize: 22, fontWeight: '800', color: colors.navy },
  sub: { fontSize: 14, color: colors.slate500, marginBottom: spacing.md },
  empty: { textAlign: 'center', color: colors.slate500, marginTop: 40 },
});
