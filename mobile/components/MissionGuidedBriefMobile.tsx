import { View, Text, TextInput, StyleSheet } from 'react-native';
import { getBriefSchema } from '../../lib/bework/mission-brief-schema';
import { colors, spacing } from '@/lib/theme';

type Props = {
  missionTypeId: string;
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
};

export function MissionGuidedBriefMobile({ missionTypeId, values, onChange }: Props) {
  const schema = getBriefSchema(missionTypeId);
  if (!schema) return null;

  return (
    <View style={styles.box}>
      <Text style={styles.kicker}>Brief guidé</Text>
      {schema.fields.map((field) => (
        <View key={field.id} style={styles.field}>
          <Text style={styles.label}>
            {field.label}
            {field.required ? ' *' : ''}
          </Text>
          <TextInput
            style={[styles.input, field.type === 'textarea' && styles.area]}
            value={values[field.id] ?? ''}
            onChangeText={(v) => onChange(field.id, v)}
            placeholder={field.placeholder}
            multiline={field.type === 'textarea'}
            numberOfLines={field.type === 'textarea' ? 3 : 1}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    backgroundColor: '#EFF6FF',
  },
  kicker: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.blue,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  field: { marginBottom: spacing.sm },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate600, marginBottom: 4 },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
  },
  area: { minHeight: 72, textAlignVertical: 'top' },
});
