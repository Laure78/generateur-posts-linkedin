import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { MOEX_CHECKLIST_THEMES, MOEX_CHECKLIST_TASKS } from '../../lib/bework/moex-checklist-3dm';
import { colors, spacing } from '@/lib/theme';

type Props = {
  value: string;
  onChange: (id: string) => void;
};

function normalize(q: string): string {
  return q
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function MissionTypePickerMobile({ value, onChange }: Props) {
  const [themeId, setThemeId] = useState(
    () => MOEX_CHECKLIST_TASKS.find((t) => t.id === value)?.theme ?? 'suivi-chantier'
  );
  const [query, setQuery] = useState('');

  const themeTasks = useMemo(
    () => MOEX_CHECKLIST_TASKS.filter((t) => t.theme === themeId),
    [themeId]
  );

  const searchResults = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return MOEX_CHECKLIST_TASKS.filter(
      (t) => normalize(t.label).includes(q) || normalize(t.id).includes(q)
    );
  }, [query]);

  const showSearch = query.trim().length > 0;

  return (
    <View>
      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder="Rechercher (DPGF, DC4, CR…)"
        placeholderTextColor={colors.slate400}
      />

      {showSearch ? (
        <ScrollView style={styles.taskList} nestedScrollEnabled>
          {searchResults.map((t) => (
            <TaskRow key={t.id} task={t} active={value === t.id} onPress={() => onChange(t.id)} />
          ))}
        </ScrollView>
      ) : (
        <>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themeScroll}>
            {MOEX_CHECKLIST_THEMES.filter((th) => th.id !== 'autre').map((th) => (
              <Pressable
                key={th.id}
                style={[styles.themeChip, themeId === th.id && styles.themeChipActive]}
                onPress={() => setThemeId(th.id)}
              >
                <Text style={[styles.themeChipText, themeId === th.id && styles.themeChipTextActive]}>
                  {th.letter ? `${th.letter}` : '·'} {th.label.length > 22 ? `${th.label.slice(0, 20)}…` : th.label}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          <ScrollView style={styles.taskList} nestedScrollEnabled>
            {themeTasks.map((t) => (
              <TaskRow key={t.id} task={t} active={value === t.id} onPress={() => onChange(t.id)} />
            ))}
          </ScrollView>
        </>
      )}
    </View>
  );
}

function TaskRow({
  task,
  active,
  onPress,
}: {
  task: { id: string; label: string };
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.taskRow, active && styles.taskRowActive]}
      onPress={onPress}
    >
      <Text style={[styles.taskLabel, active && styles.taskLabelActive]}>{task.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  search: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  themeScroll: { marginBottom: spacing.sm, maxHeight: 44 },
  themeChip: {
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  themeChipActive: { backgroundColor: colors.blueSoft, borderColor: colors.blue },
  themeChipText: { fontSize: 11, color: colors.slate600 },
  themeChipTextActive: { color: colors.blue, fontWeight: '600' },
  taskList: { maxHeight: 200, marginBottom: spacing.sm },
  taskRow: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  taskRowActive: { backgroundColor: colors.blueSoft },
  taskLabel: { fontSize: 14, color: colors.slate600 },
  taskLabelActive: { color: colors.blue, fontWeight: '600' },
});
