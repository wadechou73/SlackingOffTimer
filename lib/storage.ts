export const SCHEDULE_KEY = 'slacking_schedule';
export const CONFIGURED_KEY = 'slacking_configured';

export type ScheduleConfig = {
  workMinutes: number;
  restPolicy: string;
};

const isBrowser = () => typeof window !== 'undefined';

export function getConfigured(): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(CONFIGURED_KEY) === 'true';
}

export function setConfigured(value: boolean): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CONFIGURED_KEY, String(value));
}

export function getSchedule(): ScheduleConfig | null {
  if (!isBrowser()) return null;
  const value = window.localStorage.getItem(SCHEDULE_KEY);
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<ScheduleConfig>;
    if (typeof parsed.workMinutes !== 'number' || typeof parsed.restPolicy !== 'string') {
      return null;
    }
    return {
      workMinutes: parsed.workMinutes,
      restPolicy: parsed.restPolicy,
    };
  } catch {
    return null;
  }
}

export function setSchedule(schedule: ScheduleConfig): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedule));
}
