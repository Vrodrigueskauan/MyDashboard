

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  BarChart2,
  PieChart,
  Award,
  Calendar,
} from "lucide-react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Navbar from '../../components/Navbar';
import './Analytics.css'


Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

/* ─── Constantes de dados ──────────────────────────────────────────── */
const WEEKS = ["Semana 1", "Semana 2", "Semana 3", "Semana 4"];
const MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const MONTHS_COMP = ["Abril", "Maio", "Junho"];
const MONTHS_PROJ = ["Julho", "Agosto", "Setembro", "Outubro"];

const PATRIMONIO_DATA = {
  labels: MONTHS,
  datasets: [
    {
      label: "Patrimônio Total",
      data: [42000, 44500, 47200, 49800, 52300, 55100],
      borderColor: "#ffffff",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#ffffff",
      fill: false,
    },
    {
      label: "Investimentos",
      data: [28000, 29500, 31200, 33000, 35200, 37800],
      borderColor: "#4ade80",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointBackgroundColor: "#4ade80",
      fill: false,
    },
    {
      label: "Reserva de Emergência",
      data: [8000, 8500, 8800, 9000, 9200, 9500],
      borderColor: "#94a3b8",
      borderWidth: 1.5,
      tension: 0.4,
      pointRadius: 3,
      pointHoverRadius: 5,
      pointBackgroundColor: "#94a3b8",
      borderDash: [4, 4],
      fill: false,
    },
  ],
};

const GASTOS_DATA = {
  labels: ["Alimentação", "Transporte", "Lazer", "Moradia", "Outros"],
  datasets: [
    {
      data: [1350, 680, 520, 1450, 520],
      backgroundColor: [
        "rgba(255,255,255,0.95)",
        "rgba(255,255,255,0.6)",
        "rgba(255,255,255,0.35)",
        "rgba(255,255,255,0.15)",
        "rgba(255,255,255,0.07)",
      ],
      borderColor: "transparent",
      hoverOffset: 12,
      borderWidth: 0,
    },
  ],
};

const COMPARACAO_DATA = {
  labels: MONTHS_COMP,
  datasets: [
    {
      label: "Receita",
      data: [6800, 7200, 7500],
      backgroundColor: "rgba(255,255,255,0.9)",
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: "Gastos",
      data: [4200, 4520, 4100],
      backgroundColor: "rgba(248,113,113,0.7)",
      borderRadius: 6,
      borderSkipped: false,
    },
    {
      label: "Investimentos",
      data: [1500, 1800, 2100],
      backgroundColor: "rgba(74,222,128,0.7)",
      borderRadius: 6,
      borderSkipped: false,
    },
  ],
};

const PROJECAO_DATA = {
  labels: MONTHS_PROJ,
  datasets: [
    {
      label: "Otimista",
      data: [58000, 61500, 65200, 69800],
      borderColor: "#4ade80",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      fill: false,
    },
    {
      label: "Realista",
      data: [55100, 57200, 59500, 62300],
      borderColor: "#ffffff",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      fill: false,
    },
    {
      label: "Pessimista",
      data: [53000, 53800, 54200, 55000],
      borderColor: "#f87171",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 4,
      fill: false,
    },
  ],
};

const RANKING = [
  { ativo: "NVDA", rent: "+34.2%", valor: "R$ 8.400", pos: true },
  { ativo: "BTC", rent: "+18.7%", valor: "R$ 12.200", pos: true },
  { ativo: "CDI", rent: "+10.4%", valor: "R$ 15.000", pos: true },
  { ativo: "PETR4", rent: "-3.1%", valor: "R$ 5.600", pos: false },
];

const INSIGHTS = [
  {
    icon: <TrendingUp size={16} />,
    text: "Investimentos cresceram 12% este mês",
    color: "#4ade80",
  },
  {
    icon: <TrendingDown size={16} />,
    text: "Gastos com alimentação aumentaram 8%",
    color: "#f87171",
  },
  {
    icon: <Target size={16} />,
    text: "Meta mensal está 60% concluída",
    color: "#ffffff",
  },
  {
    icon: <Zap size={16} />,
    text: "Economia acima da média dos últimos 3 meses",
    color: "#4ade80",
  },
];

/* ─── Heatmap Data ─────────────────────────────────────────────────── */
function generateHeatmap() {
  const data = [];
  for (let week = 0; week < 7; week++) {
    for (let day = 0; day < 7; day++) {
      data.push({ week, day, value: Math.random() });
    }
  }
  return data;
}
const HEATMAP_DATA = generateHeatmap();
const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const WEEKS_LABEL = ["S1", "S2", "S3", "S4", "S5", "S6", "S7"];

/* ─── Chart default options ────────────────────────────────────────── */
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(18,18,22,0.95)",
      borderColor: "rgba(255,255,255,0.1)",
      borderWidth: 1,
      titleColor: "#ffffff",
      bodyColor: "rgba(255,255,255,0.7)",
      padding: 12,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: { color: "rgba(255,255,255,0.4)", font: { size: 11 } },
      border: { color: "transparent" },
    },
    y: {
      grid: { color: "rgba(255,255,255,0.05)" },
      ticks: { color: "rgba(255,255,255,0.4)", font: { size: 11 } },
      border: { color: "transparent" },
    },
  },
};

/* ─── Score Gauge ──────────────────────────────────────────────────── */
function ScoreGauge({ score = 87 }) {
  const canvasRef = useRef(null);
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 1400;
    function animate(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setAnimated(Math.round(ease * score));
      if (p < 1) requestAnimationFrame(animate);
    }
    const timer = setTimeout(() => requestAnimationFrame(animate), 400);
    return () => clearTimeout(timer);
  }, [score]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const r = 70;
    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;
    const progress = (animated / 100) * (endAngle - startAngle);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Track
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    // Fill
    if (animated > 0) {
      const grad = ctx.createLinearGradient(cx - r, cy, cx + r, cy);
      grad.addColorStop(0, "#4ade80");
      grad.addColorStop(1, "#ffffff");
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + progress);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 10;
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }, [animated]);

  return (
    <div style={{ position: "relative", width: 180, height: 180, margin: "0 auto" }}>
      <canvas ref={canvasRef} width={180} height={180} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 700, color: "#fff", lineHeight: 1 }}>
          {animated}
        </span>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>de 100</span>
      </div>
    </div>
  );
}

/* ─── Animation variants ───────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const hoverCard = {
  whileHover: {
    y: -4,
    boxShadow: "0 12px 30px rgba(255,255,255,0.08)",
    transition: { duration: 0.2 },
  },
};

/* ─── Card Wrapper ─────────────────────────────────────────────────── */
function Card({ children, style, index = 0, className = "" }) {
  return (
    <motion.div
      className={`analytics-card ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(255,255,255,0.08)" }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section Header ───────────────────────────────────────────────── */
function SectionHeader({ icon, title, subtitle }) {
  return (
    <div className="section-header">
      <div className="section-icon">{icon}</div>
      <div>
        <h3 className="section-title">{title}</h3>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ─── Legend Item ──────────────────────────────────────────────────── */
function LegendItem({ color, label }) {
  return (
    <div className="legend-item">
      <span className="legend-dot" style={{ background: color }} />
      <span className="legend-label">{label}</span>
    </div>
  );
}

/* ─── Heatmap Tooltip ──────────────────────────────────────────────── */
function HeatCell({ value, day, week }) {
  const [hovered, setHovered] = useState(false);
  const amount = Math.round(value * 480);
  const opacity = 0.06 + value * 0.94;

  return (
    <div
      className="heat-cell"
      style={{ background: `rgba(255,255,255,${opacity})` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="heat-tooltip">
          <span className="heat-tooltip-day">{DAYS[day]}, {WEEKS_LABEL[week]}</span>
          <span className="heat-tooltip-value">R$ {amount}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────── */
export default function Analytics() {
  return (
    <>
      
      

      {/* ── Root ─────────────────────────────────────────────────── */}
      <div className="analytics-root">

        {/* ── Topbar ─────────────────────────────────────────────── */}
        <Navbar />
                    <main style={{ paddingTop: "74px" }}>

        {/* ── Page Header ────────────────────────────────────────── */}
        <div className="page-header">
          <div>
            <p className="page-eyebrow">Dashboard — Analytics</p>
            <h1 className="page-title">Análise Financeira</h1>
          </div>
          <button className="page-period">Janeiro – Junho 2025</button>
        </div>

        {/* ── Grid ───────────────────────────────────────────────── */}
        <div className="analytics-grid">

          {/* 1. Evolução Patrimonial */}
          <Card index={0} className="card-patrimonio">
            <SectionHeader
              icon={<TrendingUp size={16} />}
              title="Evolução Patrimonial"
              subtitle="Crescimento acumulado no semestre"
            />
            <div className="patrimonio-stats">
              {[
                { label: "Patrimônio Total", value: "R$ 55.100", delta: "+12.4%", pos: true },
                { label: "Investimentos", value: "R$ 37.800", delta: "+8.7%", pos: true },
                { label: "Reserva de Emergência", value: "R$ 9.500", delta: "+18.7%", pos: true },
              ].map((s) => (
                <div className="p-stat" key={s.label}>
                  <p className="p-stat-label">{s.label}</p>
                  <p className="p-stat-value">{s.value}</p>
                  <p className={`p-stat-delta ${s.pos ? "positive" : "negative"}`}>{s.delta}</p>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <LegendItem color="#fff" label="Patrimônio Total" />
              <LegendItem color="#4ade80" label="Investimentos" />
              <LegendItem color="#94a3b8" label="Reserva de Emergência" />
            </div>
            <div className="chart-wrap" style={{ height: 200 }}>
              <Line
                data={PATRIMONIO_DATA}
                options={{
                  ...chartDefaults,
                  animation: { duration: 1200, easing: "easeInOutQuart" },
                  plugins: {
                    ...chartDefaults.plugins,
                    legend: { display: false },
                    tooltip: {
                      ...chartDefaults.plugins.tooltip,
                      callbacks: {
                        label: (ctx) => ` R$ ${ctx.raw.toLocaleString("pt-BR")}`,
                      },
                    },
                  },
                  scales: {
                    x: chartDefaults.scales.x,
                    y: {
                      ...chartDefaults.scales.y,
                      ticks: {
                        ...chartDefaults.scales.y.ticks,
                        callback: (v) => `R$ ${(v / 1000).toFixed(0)}k`,
                      },
                    },
                  },
                }}
              />
            </div>
          </Card>

          {/* 2. Gastos por Categoria */}
          <Card index={1} className="card-gastos">
            <SectionHeader
              icon={<PieChart size={16} />}
              title="Gastos por Categoria"
              subtitle="Junho 2025"
            />
            <div className="donut-wrap">
              <Doughnut
                data={GASTOS_DATA}
                options={{
                  ...chartDefaults,
                  cutout: "70%",
                  animation: { duration: 1000 },
                  plugins: {
                    ...chartDefaults.plugins,
                    tooltip: {
                      ...chartDefaults.plugins.tooltip,
                      callbacks: {
                        label: (ctx) => {
                          const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                          const pct = ((ctx.raw / total) * 100).toFixed(1);
                          return ` ${ctx.label}: ${pct}% — R$ ${ctx.raw.toLocaleString("pt-BR")}`;
                        },
                      },
                    },
                  },
                }}
              />
              <div className="donut-center">
                <span className="donut-amount">R$ 4.520</span>
                <span className="donut-label">Gastos</span>
              </div>
            </div>
            <div className="gastos-legend">
              {GASTOS_DATA.labels.map((l, i) => {
                const total = GASTOS_DATA.datasets[0].data.reduce((a, b) => a + b, 0);
                const pct = ((GASTOS_DATA.datasets[0].data[i] / total) * 100).toFixed(0);
                return (
                  <div className="gastos-legend-row" key={l}>
                    <div className="gastos-legend-left">
                      <div
                        className="gastos-legend-swatch"
                        style={{ background: GASTOS_DATA.datasets[0].backgroundColor[i] }}
                      />
                      {l}
                    </div>
                    <span className="gastos-legend-pct">{pct}%</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 3. Score Financeiro */}
          <Card index={2} className="card-score">
            <SectionHeader
              icon={<Award size={16} />}
              title="Score Financeiro"
              subtitle="Baseado nos últimos 6 meses"
            />
            <ScoreGauge score={87} />
            <div className="score-label">
              <p className="score-label-main">87 / 100</p>
              <p className="score-label-sub">Excelente controle financeiro</p>
            </div>
            <div className="score-bars">
              {[
                { name: "Poupança", val: 92, color: "#4ade80" },
                { name: "Investimento", val: 85, color: "#fff" },
                { name: "Controle de gastos", val: 78, color: "#fff" },
                { name: "Reserva de emergência", val: 95, color: "#4ade80" },
              ].map((b) => (
                <div className="score-bar-row" key={b.name}>
                  <div className="score-bar-meta">
                    <span className="score-bar-name">{b.name}</span>
                    <span className="score-bar-val">{b.val}</span>
                  </div>
                  <div className="score-bar-track">
                    <div
                      className="score-bar-fill"
                      style={{ width: `${b.val}%`, background: b.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 4. Comparação Mensal */}
          <Card index={3} className="card-comparacao">
            <SectionHeader
              icon={<BarChart2 size={16} />}
              title="Comparação Mensal"
              subtitle="Receita, gastos e investimentos"
            />
            <div className="chart-legend">
              <LegendItem color="#ffffffee" label="Receita" />
              <LegendItem color="#f87171" label="Gastos" />
              <LegendItem color="#4ade80" label="Investimentos" />
            </div>
            <div className="chart-wrap" style={{ height: 200 }}>
              <Bar
                data={COMPARACAO_DATA}
                options={{
                  ...chartDefaults,
                  animation: { duration: 900 },
                  plugins: {
                    ...chartDefaults.plugins,
                    legend: { display: false },
                    tooltip: {
                      ...chartDefaults.plugins.tooltip,
                      callbacks: {
                        label: (ctx) => ` ${ctx.dataset.label}: R$ ${ctx.raw.toLocaleString("pt-BR")}`,
                      },
                    },
                  },
                }}
              />
            </div>
          </Card>

          {/* 5. Insights Inteligentes */}
          <Card index={4} className="card-insights">
            <SectionHeader
              icon={<Zap size={16} />}
              title="Insights Inteligentes"
              subtitle="Análise automática do seu perfil"
            />
            <div className="insights-list">
              {INSIGHTS.map((ins, i) => (
                <motion.div
                  key={i}
                  className="insight-item"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  <div className="insight-icon" style={{ color: ins.color }}>
                    {ins.icon}
                  </div>
                  <p className="insight-text">{ins.text}</p>
                </motion.div>
              ))}
            </div>
          </Card>

          {/* 6. Projeção Financeira */}
          <Card index={5} className="card-projecao">
            <SectionHeader
              icon={<TrendingUp size={16} />}
              title="Projeção Financeira"
              subtitle="Cenários para o segundo semestre"
            />
            <div className="chart-legend">
              <LegendItem color="#4ade80" label="Otimista" />
              <LegendItem color="#fff" label="Realista" />
              <LegendItem color="#f87171" label="Pessimista" />
            </div>
            <div className="chart-wrap" style={{ height: 220 }}>
              <Line
                data={PROJECAO_DATA}
                options={{
                  ...chartDefaults,
                  animation: { duration: 1100 },
                  plugins: {
                    ...chartDefaults.plugins,
                    legend: { display: false },
                    tooltip: {
                      ...chartDefaults.plugins.tooltip,
                      callbacks: {
                        label: (ctx) => ` ${ctx.dataset.label}: R$ ${ctx.raw.toLocaleString("pt-BR")}`,
                      },
                    },
                  },
                  scales: {
                    x: chartDefaults.scales.x,
                    y: {
                      ...chartDefaults.scales.y,
                      ticks: {
                        ...chartDefaults.scales.y.ticks,
                        callback: (v) => `R$ ${(v / 1000).toFixed(0)}k`,
                      },
                    },
                  },
                }}
              />
            </div>
          </Card>

          {/* 7. Ranking de Investimentos */}
          <Card index={6} className="card-ranking">
            <SectionHeader
              icon={<Award size={16} />}
              title="Ranking de Investimentos"
              subtitle="Ordenado por rentabilidade"
            />
            <table className="ranking-table">
              <thead>
                <tr>
                  <th style={{ width: 28 }}>#</th>
                  <th>Ativo</th>
                  <th>Rentabilidade</th>
                  <th>Valor Investido</th>
                </tr>
              </thead>
              <tbody>
                {RANKING.map((r, i) => (
                  <motion.tr
                    key={r.ativo}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.35 }}
                  >
                    <td className="ranking-rank">{i + 1}</td>
                    <td><span className="ativo-chip">{r.ativo}</span></td>
                    <td>
                      <span className={`rent-badge ${r.pos ? "rent-pos" : "rent-neg"}`}>
                        {r.pos ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {r.rent}
                      </span>
                    </td>
                    <td style={{ color: "rgba(255,255,255,0.55)", fontSize: 13 }}>{r.valor}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>

          {/* 8. Heatmap Financeiro */}
          <Card index={7} className="card-heatmap">
            <SectionHeader
              icon={<Calendar size={16} />}
              title="Heatmap de Gastos"
              subtitle="Intensidade de gastos por dia"
            />
            <div className="heatmap-grid">
              {/* Column headers (days) */}
              <div />
              {DAYS.map((d) => (
                <div className="heatmap-day-label" key={d}>{d}</div>
              ))}
              {/* Rows (weeks) */}
              {WEEKS_LABEL.map((wk, wi) => (
                <>
                  <div className="heatmap-week-label" key={`wl-${wi}`}>{wk}</div>
                  {DAYS.map((_, di) => {
                    const cell = HEATMAP_DATA.find(
                      (c) => c.week === wi && c.day === di
                    );
                    return (
                      <HeatCell
                        key={`${wi}-${di}`}
                        value={cell ? cell.value : 0}
                        day={di}
                        week={wi}
                      />
                    );
                  })}
                </>
              ))}
            </div>
            {/* Scale legend */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 14,
                justifyContent: "flex-end",
              }}
            >
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Menos</span>
              {[0.06, 0.25, 0.5, 0.75, 0.95].map((op, i) => (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: 3,
                    background: `rgba(255,255,255,${op})`,
                  }}
                />
              ))}
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>Mais</span>
            </div>
          </Card>

        </div>
        </main>
      </div>
    </>
  );
}