'use client';

import { createContext, useContext, useState, useCallback } from 'react';

type CommandPaletteContextValue = {
  open: boolean;
  setOpen: (v: boolean) => void;
  toggle: () => void;
};

const Context = createContext<CommandPaletteContextValue | null>(null);

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);
  return (
    <Context.Provider value={{ open, setOpen, toggle }}>
      {children}
    </Context.Provider>
  );
}

export function useCommandPalette() {
  const ctx = useContext(Context);
  if (!ctx) return { open: false, setOpen: () => {}, toggle: () => {} };
  return ctx;
}
