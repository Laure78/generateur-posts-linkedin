import { Pressable, Text, View, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import type { Mission } from '@/lib/api';
import { STATUS_LABELS, getMissionTypeLabel } from '@/lib/mission-types';
import { colors, spacing } from '@/lib/theme';

export function MissionCard({ mission, href }: { mission: Mission; href: string }) {
  const validated = Boolean(mission.chef_validated_at);
  const status = validated ? 'Validé chef' : STATUS_LABELS[mission.status] ?? mission.status;

  return (
    <Link href={href as `/mission/${string}`} asChild>
      <Pressable style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={2}>
            {mission.title}
          </Text>
          <View style={[styles.badge, validated && styles.badgeOk]}>
            <Text style={[styles.badgeText, validated && styles.badgeTextOk]}>{status}</Text>
          </View>
        </View>
        <Text style={styles.meta}>{getMissionTypeLabel(mission.type)}</Text>
        {mission.chantier ? (
          <Text style={styles.chantier} numberOfLines={1}>
            {mission.chantier}
          </Text>
        ) : null}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  title: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.navy },
  badge: {
    backgroundColor: colors.blueSoft,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeOk: { backgroundColor: colors.emerald50 },
  badgeText: { fontSize: 11, fontWeight: '600', color: colors.blue },
  badgeTextOk: { color: colors.emerald800 },
  meta: { marginTop: 6, fontSize: 13, color: colors.slate500 },
  chantier: { marginTop: 4, fontSize: 12, color: colors.slate600 },
});
