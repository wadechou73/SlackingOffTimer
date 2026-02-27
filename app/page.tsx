'use client';

import { useState } from 'react';

export default function HomePage() {
  const [minutes, setMinutes] = useState(25);
  const [statusMessage, setStatusMessage] = useState('');

  const save = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('slacking-off-minutes', String(minutes));
    }

    setStatusMessage('已生效，可返回桌面后台运行');

    try {
      if (typeof window !== 'undefined' && typeof window.close === 'function') {
        window.close();
      }
    } catch {
      // 静默降级：大多数普通标签页不允许脚本主动关闭
    }
  };

  return (
    <main style={{ maxWidth: 420, margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h1>SlackingOffTimer</h1>
      <label htmlFor="minutes">摸鱼提醒间隔（分钟）</label>
      <input
        id="minutes"
        type="number"
        min={1}
        value={minutes}
        onChange={(e) => setMinutes(Number(e.target.value) || 1)}
        style={{ display: 'block', marginTop: 8, marginBottom: 12, width: '100%' }}
      />
      <button onClick={save}>保存设置</button>

      {statusMessage ? (
        <div
          role="status"
          aria-live="polite"
          style={{
            marginTop: 12,
            padding: '10px 12px',
            borderRadius: 8,
            background: '#e8f5e9',
            color: '#1b5e20',
          }}
        >
          {statusMessage}
        </div>
      ) : null}
    </main>
  );
}
