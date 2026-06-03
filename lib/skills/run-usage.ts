let lastRunUsage: { input: number; output: number } | null = null;

export function setMissionRunUsage(usage: { input: number; output: number } | null): void {
  lastRunUsage = usage;
}

export function takeMissionRunUsage(): { input: number; output: number } | null {
  const u = lastRunUsage;
  lastRunUsage = null;
  return u;
}
