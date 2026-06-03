import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '@/lib/auth-context';
import { createDemande, uploadFileText } from '@/lib/api';
import { MISSION_TYPES } from '@/lib/mission-types';
import { ValidationBanner } from '@/components/ValidationBanner';
import { colors, spacing } from '@/lib/theme';

export default function NewMissionTab() {
  const { accessToken } = useAuth();
  const [type, setType] = useState('cr-chantier-moex');
  const [title, setTitle] = useState('');
  const [chantier, setChantier] = useState('');
  const [brief, setBrief] = useState('');
  const [crNumber, setCrNumber] = useState('');
  const [previousCr, setPreviousCr] = useState('');
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);

  const isCr = type === 'cr-chantier-moex' || type === 'cr-chantier-3dm';

  const buildBrief = () => {
    const parts: string[] = [];
    if (crNumber.trim()) parts.push(`N° CR : ${crNumber.trim()}`);
    if (previousCr.trim()) parts.push(`CR précédent / points ouverts :\n${previousCr.trim()}`);
    const prefix = parts.length ? `${parts.join('\n\n')}\n\n---\n\n` : '';
    return `${prefix}${brief}`.trim();
  };

  const pickFile = async () => {
    if (!accessToken) return;
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: ['application/pdf', 'application/msword', 'text/plain', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    });
    if (result.canceled || !result.assets?.[0]) return;

    setImporting(true);
    const asset = result.assets[0];
    const { data, error } = await uploadFileText(accessToken, {
      uri: asset.uri,
      name: asset.name,
      mimeType: asset.mimeType ?? undefined,
    });
    setImporting(false);

    if (error || !data?.text) {
      Alert.alert('Import', error ?? 'Extraction impossible');
      return;
    }
    const block = `--- Pièce : ${asset.name} ---\n\n${data.text}\n\n`;
    setBrief((b) => (b.trim() ? `${b.trim()}\n\n${block}` : block));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ValidationBanner compact />

      <Text style={styles.label}>Type de demande</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.typeScroll}>
        {MISSION_TYPES.map((t) => (
          <Pressable
            key={t.id}
            style={[styles.typeChip, type === t.id && styles.typeChipActive]}
            onPress={() => setType(t.id)}
          >
            <Text style={[styles.typeChipText, type === t.id && styles.typeChipTextActive]}>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Text style={styles.label}>Titre / référence</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Ex. CR n°12 — Résidence…" />

      <Text style={styles.label}>Chantier (optionnel)</Text>
      <TextInput style={styles.input} value={chantier} onChangeText={setChantier} placeholder="Opération, lot…" />

      {isCr && (
        <>
          <Text style={styles.label}>N° du CR</Text>
          <TextInput style={styles.input} value={crNumber} onChangeText={setCrNumber} keyboardType="numeric" />
          <Text style={styles.label}>CR précédent / points ouverts</Text>
          <TextInput
            style={[styles.input, styles.area]}
            value={previousCr}
            onChangeText={setPreviousCr}
            multiline
            numberOfLines={4}
          />
        </>
      )}

      <Pressable style={styles.secondaryBtn} onPress={() => void pickFile()} disabled={importing}>
        {importing ? (
          <ActivityIndicator color={colors.blue} />
        ) : (
          <Text style={styles.secondaryBtnText}>Importer PDF ou Word</Text>
        )}
      </Pressable>

      <Text style={styles.label}>Contenu de la demande</Text>
      <TextInput
        style={[styles.input, styles.area]}
        value={brief}
        onChangeText={setBrief}
        multiline
        numberOfLines={8}
        placeholder="Notes de visite, constats, pièces…"
      />

      <Pressable
        style={[styles.btn, loading && styles.btnDisabled]}
        disabled={loading || !title.trim() || !brief.trim()}
        onPress={async () => {
          if (!accessToken) return;
          setLoading(true);
          const { data, error } = await createDemande(accessToken, {
            type,
            title: title.trim(),
            brief: buildBrief(),
            chantier: chantier.trim() || undefined,
          });
          setLoading(false);
          if (error || !data?.id) {
            Alert.alert('Erreur', error ?? 'Création impossible');
            return;
          }
          router.push(`/mission/${data.id}`);
        }}
      >
        <Text style={styles.btnText}>{loading ? 'Envoi…' : 'Envoyer la demande'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: 40 },
  label: { fontSize: 13, fontWeight: '600', color: colors.slate600, marginTop: spacing.md, marginBottom: 6 },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
  },
  area: { minHeight: 120, textAlignVertical: 'top' },
  typeScroll: { marginBottom: 4 },
  typeChip: {
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  typeChipActive: { backgroundColor: colors.blueSoft, borderColor: colors.blue },
  typeChipText: { fontSize: 12, color: colors.slate600 },
  typeChipTextActive: { color: colors.blue, fontWeight: '600' },
  secondaryBtn: {
    marginTop: spacing.md,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.blue,
    alignItems: 'center',
  },
  secondaryBtnText: { color: colors.blue, fontWeight: '600' },
  btn: {
    marginTop: spacing.lg,
    backgroundColor: colors.blue,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
