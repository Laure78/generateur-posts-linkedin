import AppSidebar from '../components/AppSidebar';
import { TeamProvider } from '@/lib/TeamContext';

export default function OutilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeamProvider>
      <div className="flex min-h-screen bg-neutral-50">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </TeamProvider>
  );
}
