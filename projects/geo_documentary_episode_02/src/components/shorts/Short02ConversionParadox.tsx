import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShortLayout } from "./ShortLayout";

export const Short02ConversionParadox: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 450 frames / ~0-15s): Volume comparison: Google vs 0.73% AI
  // Phase 2 (450 - 1000 frames / ~15-33s): The Conversion Paradox: 13.8% vs 3.02%
  // Phase 3 (1000 - 1422 frames / ~33-47s): Strategic Takeaway: High-Intent Audience

  const phase = frame < 450 ? 1 : frame < 1000 ? 2 : 3;

  // Phase 1 animations
  const p1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const barWidth = interpolate(frame, [20, 80], [0, 99.27], { extrapolateRight: "clamp" });
  const aiBarWidth = interpolate(frame, [50, 110], [0, 0.73], { extrapolateRight: "clamp" });

  // Phase 2 animations
  const f2 = frame - 450;
  const cardChatGpt = spring({ frame: f2, fps, config: { damping: 14, stiffness: 110 } });
  const cardGoogle = spring({ frame: f2 - 20, fps, config: { damping: 14, stiffness: 110 } });
  const badgeSpring = spring({ frame: f2 - 40, fps, config: { damping: 12, stiffness: 130 } });

  // Phase 3 animations
  const f3 = frame - 1000;
  const p3Spring = spring({ frame: f3, fps, config: { damping: 14, stiffness: 100 } });
  const row1 = interpolate(f3, [10, 25], [0, 1], { extrapolateRight: "clamp" });
  const row2 = interpolate(f3, [35, 50], [0, 1], { extrapolateRight: "clamp" });
  const row3 = interpolate(f3, [60, 75], [0, 1], { extrapolateRight: "clamp" });

  return (
    <ShortLayout
      shortKey="short02"
      categoryTitle="ИССЛЕДОВАНИЕ: 145 МЛН СЕССИЙ"
      shortNumber="02 / 07"
      bgVideoSrc="05_act1_analytics_growth.mp4"
      voiceoverStartSec={109.3}
      durationFrames={1422}
    >
      {phase === 1 && (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            transform: `scale(${p1Spring})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 22,
          }}
        >
          {/* Header */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "36px 36px 28px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderTop: "6px solid #38bdf8",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(56, 189, 248, 0.14)",
                color: "#0369a1",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              РЕАЛЬНЫЙ ОБЪЁМ ТРАФИКА
            </div>
            <h1
              style={{
                fontSize: 42,
                lineHeight: "50px",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
              }}
            >
              МАСШТАБ GOOGLE <br />
              <span style={{ color: "#0284c7" }}>ПОКА НЕСОПОСТАВИМ</span>
            </h1>
          </div>

          {/* Volume Metric Cards */}
          <div style={{ width: "100%", display: "flex", gap: 16 }}>
            <div
              style={{
                flex: 1,
                background: "rgba(30, 41, 59, 0.94)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 22,
                padding: "24px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: "#94a3b8" }}>
                CHATGPT / ПОИСК GOOGLE
              </div>
              <div style={{ fontSize: 62, fontWeight: 900, color: "#f59e0b", margin: "10px 0" }}>
                0.62%
              </div>
              <div style={{ fontSize: 16, color: "#cbd5e1" }}>
                Доля переходов из чата
              </div>
            </div>

            <div
              style={{
                flex: 1,
                background: "rgba(30, 41, 59, 0.94)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 22,
                padding: "24px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: "#94a3b8" }}>
                ВСЕ НЕЙРОСЕТИ ВМЕСТЕ
              </div>
              <div style={{ fontSize: 62, fontWeight: 900, color: "#38bdf8", margin: "10px 0" }}>
                0.73%
              </div>
              <div style={{ fontSize: 16, color: "#cbd5e1" }}>
                ChatGPT + Claude + Perplexity
              </div>
            </div>
          </div>

          {/* Scale Progress Visual */}
          <div
            style={{
              width: "100%",
              background: "rgba(15, 23, 42, 0.92)",
              borderRadius: 22,
              padding: "24px 28px",
              border: "1px solid rgba(255,255,255,0.12)",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#e2e8f0" }}>
                Органический поиск Google
              </span>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#38bdf8" }}>
                99.27% трафика
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 18,
                borderRadius: 9,
                background: "rgba(255,255,255,0.1)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: `${barWidth}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #38bdf8 0%, #0284c7 100%)",
                }}
              />
            </div>
            <div style={{ marginTop: 14, fontSize: 16, color: "#94a3b8", textAlign: "center" }}>
              Выборка: 100 коммерческих сайтов за 12 месяцев анализа
            </div>
          </div>
        </div>
      )}

      {phase === 2 && (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Header */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "30px 36px 24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderTop: "6px solid #22c55e",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(34, 197, 94, 0.14)",
                color: "#15803d",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              ПАРАДОКС КОНВЕРСИИ В ДЕНЬГИ
            </div>
            <h1
              style={{
                fontSize: 38,
                lineHeight: "46px",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
              }}
            >
              КОНВЕРСИЯ В 4.5 РАЗА ВЫШЕ, <br />
              <span style={{ color: "#16a34a" }}>ЧЕМ В ОБЫЧНОМ ПОИСКЕ</span>
            </h1>
          </div>

          {/* 4.5x Multiplier Badge */}
          <div
            style={{
              transform: `scale(${badgeSpring})`,
              background: "linear-gradient(90deg, #16a34a 0%, #22c55e 100%)",
              borderRadius: 999,
              padding: "10px 28px",
              color: "#052e16",
              fontSize: 22,
              fontWeight: 900,
              boxShadow: "0 10px 30px rgba(34, 197, 94, 0.4)",
            }}
          >
            ⚡ В 4.5 РАЗА БОЛЬШЕ СДЕЛОК НА 100 ПОСЕТИТЕЛЕЙ
          </div>

          {/* Two Big Metric Cards */}
          <div style={{ width: "100%", display: "flex", gap: 16 }}>
            {/* ChatGPT Card */}
            <div
              style={{
                flex: 1.15,
                transform: `scale(${cardChatGpt})`,
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
                border: "2.5px solid #22c55e",
                borderRadius: 24,
                padding: "26px 20px",
                textAlign: "center",
                boxShadow: "0 15px 35px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: "#86efac", textTransform: "uppercase" }}>
                CHATGPT CONVERSION
              </div>
              <div style={{ fontSize: 70, fontWeight: 900, color: "#ffffff", margin: "10px 0" }}>
                13.8%
              </div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#4ade80" }}>
                Готовые клиенты с чеком
              </div>
              <div style={{ fontSize: 15, color: "#bbf7d0", marginTop: 6 }}>
                Приходит сразу подтвердить бронь или сделку
              </div>
            </div>

            {/* Google Card */}
            <div
              style={{
                flex: 1,
                transform: `scale(${cardGoogle})`,
                background: "rgba(30, 41, 59, 0.92)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 24,
                padding: "26px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>
                GOOGLE ORGANIC
              </div>
              <div style={{ fontSize: 62, fontWeight: 900, color: "#94a3b8", margin: "12px 0" }}>
                3.02%
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#cbd5e1" }}>
                Холодный поиск
              </div>
              <div style={{ fontSize: 15, color: "#94a3b8", marginTop: 6 }}>
                Открывают 10 вкладок и закрывают сайт
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 3 && (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            transform: `scale(${p3Spring})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Header */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "34px 36px 26px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderTop: "6px solid #f59e0b",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(245, 158, 11, 0.14)",
                color: "#b45309",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              СТРАТЕГИЧЕСКИЙ ВЫВОД
            </div>
            <h1
              style={{
                fontSize: 40,
                lineHeight: "48px",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
              }}
            >
              ПОЧЕМУ КЛИЕНТЫ ИЗ CHATGPT <br />
              <span style={{ color: "#d97706" }}>ЦЕННЕЕ ОБЫЧНОГО SEO?</span>
            </h1>
          </div>

          {/* 3 Staggered Insights */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                opacity: row1,
                transform: `translateX(${(1 - row1) * -30}px)`,
                background: "rgba(30, 41, 59, 0.92)",
                borderRadius: 20,
                padding: "20px 24px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 28 }}>🎯</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#f8fafc" }}>
                  ИИ уже провёл квалификацию
                </div>
                <div style={{ fontSize: 16, color: "#94a3b8" }}>
                  Модель сопоставила бюджет, локацию и условия до перехода.
                </div>
              </div>
            </div>

            <div
              style={{
                opacity: row2,
                transform: `translateX(${(1 - row2) * -30}px)`,
                background: "rgba(30, 41, 59, 0.92)",
                borderRadius: 20,
                padding: "20px 24px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 28 }}>⚡</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#f8fafc" }}>
                  Мгновенный переход к сделке
                </div>
                <div style={{ fontSize: 16, color: "#94a3b8" }}>
                  Человек приходит не изучать статьи, а нажимает «Забронировать».
                </div>
              </div>
            </div>

            <div
              style={{
                opacity: row3,
                transform: `translateX(${(1 - row3) * -30}px)`,
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)",
                borderRadius: 20,
                padding: "20px 24px",
                border: "2px solid #22c55e",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 28 }}>💰</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#86efac" }}>
                  10 лидов из ИИ &gt; 100 кликов из поиска
                </div>
                <div style={{ fontSize: 16, color: "#bbf7d0" }}>
                  Сверхосознанный спрос превращается в предоплаты.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ShortLayout>
  );
};
