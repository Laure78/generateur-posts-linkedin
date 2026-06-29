import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  getValidationChecklistForMissionType,
  getValidationChecklistTitle,
} from '../../lib/bework/mission-checklist';
import { colors, spacing } from '@/lib/theme';

type Props = {
  missionTypeId: string;
};

export function MissionValidationChecklistMobile({ missionTypeId }: Props) {
  const items = getValidationChecklistForMissionType(missionTypeId);
  const title = getValidationChecklistTitle(missionTypeId);
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item, i) => (
        <Pressable
          key={item}
          style={styles.row}
          onPress={() => setChecked((c) => ({ ...c, [i]: !c[i] }))}
        >
          <Text style={styles.check}>{checked[i] ? '☑' : '☐'}</Text>
          <Text style={styles.item}>{item}</Text>
        </Pressable>
      ))}
      <Text style={styles.footer}>Aide-mémoire — non enregistré.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  title: { fontSize: 14, fontWeight: '700', color: colors.navy, marginBottom: spacing.sm },
  row: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  check: { fontSize: 16, color: colors.blue },
  item: { flex: 1, fontSize: 13, color: colors.slate600, lineHeight: 18 },
  footer: { fontSize: 11, color: colors.slate500, marginTop: spacing.sm },
});
