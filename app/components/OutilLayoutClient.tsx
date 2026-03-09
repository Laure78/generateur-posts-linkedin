'use client';

import { useEffect } from 'react';
import AppSidebar from './AppSidebar';
import TopActionBar from './TopActionBar';
import CommandPalette from './CommandPalette';
import { useCommandPalette } from '@/lib/CommandPaletteContext';

export default function OutilLayoutClient({ children }: { children: React.ReactNode }) {
  const { open: cmdOpen, setOpen: setCmdOpen, toggle } = useCommandPalette();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AppSidebar />
      <div className="flex flex-1 flex-col min-w-0 lg:pl-0 pl-14">
        <TopActionBar />
        <main className="flex-1 overflow-auto">
          <div className="w-full px-4 py-6 md:px-6 md:py-8">
            <div className="mx-auto max-w-[1200px]">
              {children}
            </div>
          </div>
        </main>
      </div>
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </div>
  );
}
