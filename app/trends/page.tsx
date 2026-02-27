import Link from "next/link";

const last7DaysTrend = [
  { day: "周一", ratio: "22%" },
  { day: "周二", ratio: "30%" },
  { day: "周三", ratio: "18%" },
  { day: "周四", ratio: "35%" },
  { day: "周五", ratio: "40%" },
  { day: "周六", ratio: "25%" },
  { day: "周日", ratio: "20%" },
];

export default function TrendsPage() {
  return (
    <main style={{ padding: "2rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>最近7天摸鱼趋势</h1>

      <ul style={{ marginTop: "1.5rem", lineHeight: 1.8, paddingLeft: "1.25rem" }}>
        {last7DaysTrend.map((item) => (
          <li key={item.day}>
            {item.day}：摸鱼占比 {item.ratio}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/">返回首页</Link>
      </div>
    </main>
  );
}
