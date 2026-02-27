'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  getConfigured,
  getSchedule,
  setConfigured,
  setSchedule,
  type ScheduleConfig,
} from '../lib/storage';

const defaultSchedule: ScheduleConfig = {
  workMinutes: 480,
  restPolicy: '50/10',
};

export default function HomePage() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(defaultSchedule.workMinutes);
  const [restPolicy, setRestPolicy] = useState(defaultSchedule.restPolicy);

  useEffect(() => {
    const savedSchedule = getSchedule();
    if (savedSchedule) {
      setWorkMinutes(savedSchedule.workMinutes);
      setRestPolicy(savedSchedule.restPolicy);
    }
    setIsConfigured(getConfigured());
  }, []);

  const todaySlackMinutes = useMemo(() => Math.round(workMinutes * 0.22), [workMinutes]);
  const slackPercent = useMemo(
    () => (workMinutes > 0 ? Math.round((todaySlackMinutes / workMinutes) * 100) : 0),
    [todaySlackMinutes, workMinutes],
  );

  const save = () => {
    const nextSchedule = {
      workMinutes,
      restPolicy,
    };

    setSchedule(nextSchedule);
    setConfigured(true);
    setIsConfigured(true);
  };

  if (!isConfigured) {
    return (
      <main style={{ padding: 24, maxWidth: 560 }}>
        <h1>工作制度设置</h1>
        <div style={{ display: 'grid', gap: 12 }}>
          <label>
            工作时间（分钟）
            <input
              type="number"
              min={1}
              value={workMinutes}
              onChange={(e) => setWorkMinutes(Number(e.target.value) || 0)}
            />
          </label>

          <label>
            休息制度
            <input value={restPolicy} onChange={(e) => setRestPolicy(e.target.value)} />
          </label>

          <button onClick={save}>保存配置</button>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, maxWidth: 560 }}>
      <h1>今日摸鱼统计</h1>
      <p>今日摸鱼时长：{todaySlackMinutes} 分钟</p>
      <p>摸鱼占比：{slackPercent}%</p>
    </main>
  );
}
