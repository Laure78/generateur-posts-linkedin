import { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  Pressable,
  Alert,
  TextInput,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useFocusEffect } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import {
  fetchMission,
  runSkill,
  validateMission,
  documentDownloadUrl,
  type Mission,
} from '@/lib/api';
import { STATUS_LABELS, getMissionTypeLabel } from '@/lib/mission-types';
import { ValidationBanner } from '@/components/ValidationBanner';
import { MissionValidationChecklistMobile } from '@/components/MissionValidationChecklistMobile';
import { colors, spacing } from '@/lib/theme';

export default function MissionDetailScreen() {
  const { id, admin } = useLocalSearchParams<{ id: string; admin?: string }>();
  const { accessToken, isChefOrAdmin } = useAuth();
  const [mission, setMission] = useState<Mission | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [validating, setValidating] = useState(false);
  const [note, setNote] = useState('');

  const showValidate = (admin === '1' || isChefOrAdmin) && mission?.ai_result && !mission.chef_validated_at;

  const load = useCallback(async () => {
    if (!accessToken || !id) return;
    setLoading(true);
    const { data, error } = await fetchMission(accessToken, id);
    if (error) Alert.alert('Erreur', error);
    setMission(data?.mission ?? null);
    setLoading(false);

    if (data?.mission?.status === 'recue' && !data.mission.ai_result) {
      setRunning(true);
      await runSkill(accessToken, id);
      setRunning(false);
      const refreshed = await fetchMission(accessToken, id);
      setMission(refreshed.data?.mission ?? null);
    }
  }, [accessToken, id]);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load])
  );

  if (!mission && loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (!mission) {
    return (
      <View style={styles.centered}>
        <Text>Demande introuvable</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
    >
      <ValidationBanner compact />

      {running && (
        <View style={styles.processing}>
          <ActivityIndicator color={colors.blue} />
          <Text style={styles.processingText}>Traitement IA en cours…</Text>
        </View>
      )}

      <Text style={styles.status}>
        {mission.chef_validated_at
          ? 'Validé chef'
          : STATUS_LABELS[mission.status] ?? mission.status}
      </Text>
      <Text style={styles.title}>{mission.title}</Text>
      <Text style={styles.meta}>{getMissionTypeLabel(mission.type)}</Text>
      {mission.chantier ? <Text style={styles.chantier}>{mission.chantier}</Text> : null}

      <Text style={styles.section}>Demande</Text>
      <Text style={styles.brief}>{mission.brief}</Text>

      {mission.ai_result ? (
        <>
          <Text style={styles.section}>Résultat assistant</Text>
          <Text style={styles.result} numberOfLines={20}>
            {mission.ai_result}
          </Text>
          <Pressable
            style={styles.linkBtn}
            onPress={() => {
              const url = documentDownloadUrl(mission.id);
              Alert.alert(
                'Téléchargement',
                'Ouvrir le livrable dans le navigateur ? (connexion requise)',
                [
                  { text: 'Annuler', style: 'cancel' },
                  { text: 'Ouvrir', onPress: () => void Linking.openURL(url) },
                ]
              );
            }}
          >
            <Text style={styles.linkBtnText}>Ouvrir / télécharger le livrable</Text>
          </Pressable>
        </>
      ) : null}

      {showValidate && (
        <View style={styles.validateBox}>
          <Text style={styles.validateTitle}>Validation chef d&apos;équipe</Text>
          <TextInput
            style={styles.input}
            placeholder="Note (optionnel)"
            value={note}
            onChangeText={setNote}
          />
          <Pressable
            style={[styles.btn, validating && styles.btnDisabled]}
            disabled={validating}
            onPress={async () => {
              if (!accessToken) return;
              setValidating(true);
              const { error } = await validateMission(accessToken, mission.id, note);
              setValidating(false);
              if (error) Alert.alert('Validation', error);
              else void load();
            }}
          >
            <Text style={styles.btnText}>
              {validating ? 'Validation…' : 'Valider le livrable'}
            </Text>
          </Pressable>
        </View>
      )}

      {mission.chef_validated_at && (
        <View style={styles.validated}>
          <Text style={styles.validatedText}>Livrable validé — prêt pour envoi client</Text>
        </View>
      )}

      {mission.ai_result ? (
        <MissionValidationChecklistMobile missionTypeId={mission.type} />
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  processing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: colors.blueSoft,
    borderRadius: 10,
    marginBottom: spacing.sm,
  },
  processingText: { color: colors.blue, fontWeight: '600' },
  status: { fontSize: 12, fontWeight: '600', color: colors.blue },
  title: { fontSize: 22, fontWeight: '800', color: colors.navy, marginTop: 4 },
  meta: { fontSize: 14, color: colors.slate500, marginTop: 4 },
  chantier: { fontSize: 13, color: colors.slate600, marginTop: 4 },
  section: { fontSize: 14, fontWeight: '700', color: colors.navy, marginTop: spacing.lg, marginBottom: 8 },
  brief: { fontSize: 14, color: colors.slate600, lineHeight: 22 },
  result: { fontSize: 13, color: colors.navy, lineHeight: 20, backgroundColor: colors.white, padding: 12, borderRadius: 10 },
  linkBtn: { marginTop: 12, padding: 14, backgroundColor: colors.blue, borderRadius: 12, alignItems: 'center' },
  linkBtnText: { color: colors.white, fontWeight: '700' },
  validateBox: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.blueSoft,
    borderRadius: 12,
  },
  validateTitle: { fontWeight: '700', color: colors.navy, marginBottom: 8 },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  btn: { backgroundColor: colors.blue, borderRadius: 12, padding: 14, alignItems: 'center' },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: colors.white, fontWeight: '700' },
  validated: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.emerald50,
    borderRadius: 12,
  },
  validatedText: { color: colors.emerald800, fontWeight: '600' },
});
