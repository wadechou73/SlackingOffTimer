import Link from "next/link";

export default function HomePage() {
  const slackingTime = "2小时15分钟";
  const slackingRatio = "28%";
  const status = "状态：摸鱼中";

  return (
    <main style={{ padding: "2rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>摸鱼计时器</h1>

      <section style={{ marginTop: "1.5rem", lineHeight: 1.8 }}>
        <p>摸鱼时间：{slackingTime}</p>
        <p>摸鱼占比：{slackingRatio}</p>
        <p>{status}</p>
      </section>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/trends">查看最近7天趋势</Link>
      </div>
    </main>
  );
}
