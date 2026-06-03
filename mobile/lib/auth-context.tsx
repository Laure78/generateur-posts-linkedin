import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, supabaseConfigured } from './supabase';
import { fetchProfile, type AppProfile } from './api';

type AuthState = {
  session: Session | null;
  profile: AppProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  accessToken: string | null;
  isChefOrAdmin: boolean;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<AppProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const token = session?.access_token;
    if (!token) {
      setProfile(null);
      return;
    }
    const { data } = await fetchProfile(token);
    if (data?.profile) setProfile(data.profile);
  }, [session?.access_token]);

  useEffect(() => {
    if (!supabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.access_token) void refreshProfile();
    else setProfile(null);
  }, [session?.access_token, refreshProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    return { error: error?.message };
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setProfile(null);
  }, []);

  const value = useMemo<AuthState>(
    () => ({
      session,
      profile,
      loading,
      signIn,
      signOut,
      refreshProfile,
      accessToken: session?.access_token ?? null,
      isChefOrAdmin: profile?.role === 'chef_equipe' || profile?.role === 'admin',
    }),
    [session, profile, loading, signIn, signOut, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth dans AuthProvider');
  return ctx;
}
