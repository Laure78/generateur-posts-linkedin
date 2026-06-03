import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '@/lib/auth-context';
import { supabaseConfigured } from '@/lib/supabase';
import { colors } from '@/lib/theme';

export default function Index() {
  const { session, loading } = useAuth();

  if (!supabaseConfigured) {
    return <Redirect href="/login" />;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.blue} />
      </View>
    );
  }

  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/login" />;
}
