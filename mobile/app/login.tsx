import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/lib/auth-context';
import { supabaseConfigured } from '@/lib/supabase';
import { ValidationBanner } from '@/components/ValidationBanner';
import { colors, spacing } from '@/lib/theme';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!supabaseConfigured) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Configuration requise</Text>
        <Text style={styles.hint}>
          Copiez mobile/.env.example vers mobile/.env et renseignez EXPO_PUBLIC_SUPABASE_URL et
          EXPO_PUBLIC_SUPABASE_ANON_KEY (mêmes valeurs que le site web).
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.brand}>BeWork</Text>
      <Text style={styles.subtitle}>Assistants travaux · MOEX</Text>

      <ValidationBanner compact />

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={[styles.btn, loading && styles.btnDisabled]}
        disabled={loading}
        onPress={async () => {
          setLoading(true);
          const { error } = await signIn(email, password);
          setLoading(false);
          if (error) Alert.alert('Connexion', error);
          else router.replace('/(tabs)');
        }}
      >
        <Text style={styles.btnText}>{loading ? 'Connexion…' : 'Se connecter'}</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.lg, justifyContent: 'center', gap: spacing.md },
  brand: { fontSize: 28, fontWeight: '800', color: colors.navy, textAlign: 'center' },
  subtitle: { fontSize: 14, color: colors.slate500, textAlign: 'center', marginBottom: spacing.md },
  title: { fontSize: 18, fontWeight: '700', color: colors.navy },
  hint: { fontSize: 14, color: colors.slate600, lineHeight: 22, marginTop: 8 },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },
  btn: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: colors.white, fontWeight: '700', fontSize: 16 },
});
