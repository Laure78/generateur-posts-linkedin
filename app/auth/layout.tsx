import type { Metadata } from 'next';
import { NOINDEX_FOLLOW } from '@/lib/bework/seo';

export const metadata: Metadata = NOINDEX_FOLLOW;

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
