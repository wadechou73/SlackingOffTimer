"use client";

import { useEffect, useMemo, useState } from "react";
import {
  getConfigured,
  getSchedule,
  setConfigured,
  setSchedule,
  type ScheduleConfig,
} from "../lib/storage";

const DEFAULT_SCHEDULE: ScheduleConfig = {
  workMinutes: 50,
  restPolicy: "10 分钟短休",
};

export default function Home() {
  const [isConfigured, setIsConfigured] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(DEFAULT_SCHEDULE.workMinutes);
  const [restPolicy, setRestPolicy] = useState(DEFAULT_SCHEDULE.restPolicy);

  useEffect(() => {
    const schedule = getSchedule();
    const configured = getConfigured();

    if (schedule) {
      setWorkMinutes(schedule.workMinutes);
      setRestPolicy(schedule.restPolicy);
    }

    setIsConfigured(configured);
  }, []);

  const schedulePreview = useMemo(
    () => ({ workMinutes, restPolicy }),
    [workMinutes, restPolicy],
  );

  const handleSaveSettings = () => {
    const nextSchedule = {
      workMinutes,
      restPolicy,
    };

    setSchedule(nextSchedule);
    setConfigured(true);
    setIsConfigured(true);
  };

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      {!isConfigured ? (
        <section>
          <h1>工作制度设置</h1>
          <p>请先完成工作时间与休息制度配置。</p>

          <div style={{ marginBottom: 12 }}>
            <label htmlFor="workMinutes">工作时间（分钟）</label>
            <br />
            <input
              id="workMinutes"
              type="number"
              min={1}
              value={workMinutes}
              onChange={(event) => setWorkMinutes(Number(event.target.value || 0))}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label htmlFor="restPolicy">休息制度</label>
            <br />
            <select
              id="restPolicy"
              value={restPolicy}
              onChange={(event) => setRestPolicy(event.target.value)}
            >
              <option value="5 分钟短休">5 分钟短休</option>
              <option value="10 分钟短休">10 分钟短休</option>
              <option value="15 分钟长休">15 分钟长休</option>
            </select>
          </div>

          <button type="button" onClick={handleSaveSettings}>
            保存设置
          </button>
        </section>
      ) : (
        <section>
          <h1>主页面</h1>
          <p>当前配置如下：</p>
          <ul>
            <li>工作时间：{schedulePreview.workMinutes} 分钟</li>
            <li>休息制度：{schedulePreview.restPolicy}</li>
          </ul>
        </section>
      )}
    </main>
  );
}
