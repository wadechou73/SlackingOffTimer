export type ScheduleConfig = {
  workMinutes: number;
  restPolicy: string;
};

const STORAGE_KEYS = {
  schedule: "slacking_schedule",
  configured: "slacking_configured",
} as const;

const isBrowser = () => typeof window !== "undefined";

export function getSchedule(): ScheduleConfig | null {
  if (!isBrowser()) return null;

  const raw = window.localStorage.getItem(STORAGE_KEYS.schedule);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ScheduleConfig;
  } catch {
    return null;
  }
}

export function setSchedule(schedule: ScheduleConfig): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEYS.schedule, JSON.stringify(schedule));
}

export function getConfigured(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(STORAGE_KEYS.configured) === "true";
}

export function setConfigured(configured: boolean): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEYS.configured, String(configured));
}
