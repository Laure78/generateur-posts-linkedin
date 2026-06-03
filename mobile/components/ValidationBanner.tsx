import { Text, View, StyleSheet } from 'react-native';
import { colors, spacing } from '@/lib/theme';

export function ValidationBanner({ compact }: { compact?: boolean }) {
  return (
    <View style={[styles.box, compact && styles.compact]}>
      <Text style={styles.title}>Validation chef d&apos;équipe</Text>
      {!compact && (
        <Text style={styles.text}>
          Aucun envoi au client sans validation du chef d&apos;équipe après relecture.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.red50,
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 12,
    padding: spacing.md,
  },
  compact: { padding: spacing.sm },
  title: { fontWeight: '700', color: colors.red800, fontSize: 13 },
  text: { marginTop: 4, fontSize: 12, color: colors.red800, lineHeight: 18 },
});
