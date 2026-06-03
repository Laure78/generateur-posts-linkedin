import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import { ROLE_LABELS } from '@/lib/roles';
import { colors, spacing } from '@/lib/theme';

export default function AccountTab() {
  const { profile, signOut, isChefOrAdmin } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon compte</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{profile?.email ?? '—'}</Text>
        <Text style={[styles.label, { marginTop: 12 }]}>Rôle</Text>
        <Text style={styles.value}>
          {profile?.role ? ROLE_LABELS[profile.role] : '—'}
        </Text>
      </View>
      {isChefOrAdmin && (
        <Text style={styles.hint}>
          Vous avez accès à l&apos;onglet Admin pour valider les livrables.
        </Text>
      )}
      <Pressable
        style={styles.btn}
        onPress={async () => {
          await signOut();
          router.replace('/login');
        }}
      >
        <Text style={styles.btnText}>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg },
  title: { fontSize: 22, fontWeight: '800', color: colors.navy, marginBottom: spacing.lg },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  label: { fontSize: 12, color: colors.slate500, fontWeight: '600' },
  value: { fontSize: 16, color: colors.navy, marginTop: 4 },
  hint: { marginTop: spacing.md, fontSize: 13, color: colors.slate600, lineHeight: 20 },
  btn: {
    marginTop: spacing.xl,
    backgroundColor: colors.navy,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  btnText: { color: colors.white, fontWeight: '700' },
});
