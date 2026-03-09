import { TeamProvider } from '@/lib/TeamContext';
import { CommandPaletteProvider } from '@/lib/CommandPaletteContext';
import OutilLayoutClient from '../components/OutilLayoutClient';

export default function OutilLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TeamProvider>
      <CommandPaletteProvider>
        <OutilLayoutClient>{children}</OutilLayoutClient>
      </CommandPaletteProvider>
    </TeamProvider>
  );
}
