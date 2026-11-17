import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ShortLayout } from "./ShortLayout";

export const Short05KamalaDeal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 480 frames / ~0-16s): Live Lead from Singapore in Telegram / WhatsApp
  // Phase 2 (480 - 950 frames / ~16-31s): Oceana Kamala condo taken into management
  // Phase 3 (950 - 1476 frames / ~31-49.2s): Deals that transform business vs empty SEO charts

  const phase = frame < 480 ? 1 : frame < 950 ? 2 : 3;

  // Phase 1
  const p1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const pulseScale = 1 + Math.sin(frame * 0.15) * 0.03;

  // Phase 2
  const f2 = frame - 480;
  const p2Spring = spring({ frame: f2, fps, config: { damping: 14, stiffness: 100 } });
  const imgScale = interpolate(f2, [0, 500], [1, 1.08], { extrapolateRight: "clamp" });

  // Phase 3
  const f3 = frame - 950;
  const p3Spring = spring({ frame: f3, fps, config: { damping: 14, stiffness: 100 } });
  const stampScale = interpolate(f3, [15, 30], [2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ShortLayout
      shortKey="short05"
      categoryTitle="НЕДВИЖИМОСТЬ: КЕЙС PHUKETSTAYPRO"
      shortNumber="05 / 07"
      bgVideoSrc="b_roll_phuket_villa.mp4"
      voiceoverStartSec={406.8}
      durationFrames={1476}
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
                marginBottom: 8,
              }}
            >
              СВЕЖИЙ ЛИД ВО ВРЕМЯ ЗАПИСИ
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
              КЛИЕНТ ИЗ СИНГАПУРА <br />
              <span style={{ color: "#16a34a" }}>ПО РЕКОМЕНДАЦИИ ИИ</span>
            </h1>
          </div>

          {/* Lead Card */}
          <div
            style={{
              width: "100%",
              background: "rgba(15, 23, 42, 0.95)",
              border: "2px solid #22c55e",
              borderRadius: 24,
              padding: "26px 28px",
              boxSizing: "border-box",
              boxShadow: "0 15px 40px rgba(34, 197, 94, 0.25)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>🇸🇬</span>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>
                    Dario • Сингапур
                  </div>
                  <div style={{ fontSize: 15, color: "#94a3b8" }}>
                    Интерес: апартаменты у моря на Банг Тао
                  </div>
                </div>
              </div>
              <div
                style={{
                  transform: `scale(${pulseScale})`,
                  background: "#22c55e",
                  color: "#052e16",
                  padding: "6px 14px",
                  borderRadius: 10,
                  fontSize: 15,
                  fontWeight: 900,
                }}
              >
                LIVE LEAD
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ background: "rgba(30, 41, 59, 0.8)", padding: "14px 18px", borderRadius: 14 }}>
                <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 700 }}>БЮДЖЕТ СДЕЛКИ</div>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#38bdf8", marginTop: 4 }}>
                  4 000 000 THB (~$115k)
                </div>
              </div>
              <div style={{ background: "rgba(30, 41, 59, 0.8)", padding: "14px 18px", borderRadius: 14 }}>
                <div style={{ fontSize: 14, color: "#94a3b8", fontWeight: 700 }}>ИСТОЧНИК В UTM</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#4ade80", marginTop: 4 }}>
                  ChatGPT Search
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, fontSize: 16, color: "#86efac", fontWeight: 700 }}>
              ⚡ Команда связалась в WhatsApp за 6 минут • Запрос брошюры
            </div>
          </div>
        </div>
      )}

      {phase === 2 && (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            transform: `scale(${p2Spring})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          {/* Header */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "26px 36px 20px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderTop: "6px solid #38bdf8",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 14px",
                borderRadius: 999,
                background: "rgba(56, 189, 248, 0.14)",
                color: "#0369a1",
                fontSize: 17,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              РЕАЛЬНЫЙ ОБЪЕКТ В ПОРТФЕЛЬ
            </div>
            <h1
              style={{
                fontSize: 36,
                lineHeight: "44px",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
              }}
            >
              КВАРТИРА НА КАМАЛЕ <br />
              <span style={{ color: "#0284c7" }}>В УПРАВЛЕНИЕ АГЕНТСТВА</span>
            </h1>
          </div>

          {/* Photo & Specs Card */}
          <div
            style={{
              width: "100%",
              background: "rgba(15, 23, 42, 0.95)",
              borderRadius: 24,
              overflow: "hidden",
              border: "1.5px solid rgba(255,255,255,0.14)",
              boxSizing: "border-box",
            }}
          >
            <div style={{ height: 260, overflow: "hidden", position: "relative" }}>
              <Img
                src={staticFile("oceana_kamala_living.jpg")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: `scale(${imgScale})`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 16,
                  background: "rgba(0,0,0,0.75)",
                  backdropFilter: "blur(8px)",
                  padding: "6px 14px",
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#ffffff",
                }}
              >
                Oceana Residence Kamala • 350м до моря
              </div>
            </div>

            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#f8fafc" }}>
                    Договор доверительного управления
                  </div>
                  <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 4 }}>
                    Собственник выбрал компанию через ответ нейросети
                  </div>
                </div>
                <span
                  style={{
                    background: "#22c55e",
                    color: "#052e16",
                    padding: "8px 16px",
                    borderRadius: 10,
                    fontSize: 16,
                    fontWeight: 900,
                  }}
                >
                  СДЕЛКА
                </span>
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
              padding: "32px 36px 24px",
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
                marginBottom: 8,
              }}
            >
              ФИЛОСОФИЯ AI-ИНЖЕНЕРИИ
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
              САЙТЫ РАДИ СДЕЛОК, <br />
              <span style={{ color: "#16a34a" }}>А НЕ КРАСИВЫХ ТАБЛИЧЕК!</span>
            </h1>
          </div>

          {/* Comparison */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 14 }}>
            <div
              style={{
                background: "rgba(30, 41, 59, 0.9)",
                borderRadius: 20,
                padding: "18px 24px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 28 }}>❌</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#94a3b8" }}>
                  Охваты, лайки и краулеры в логах
                </div>
                <div style={{ fontSize: 15, color: "#64748b" }}>
                  Красивые графики без единого рубля выручки
                </div>
              </div>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
                borderRadius: 20,
                padding: "20px 24px",
                border: "2px solid #22c55e",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 10px 30px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 28 }}>✅</div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#86efac" }}>
                  Собственник, объект и деньги
                </div>
                <div style={{ fontSize: 16, color: "#bbf7d0" }}>
                  Реальные сделки, которые развивают бизнес клиента
                </div>
              </div>
            </div>
          </div>

          {/* Golden Seal */}
          <div
            style={{
              transform: `scale(${stampScale})`,
              padding: "14px 32px",
              borderRadius: 14,
              background: "#22c55e",
              color: "#052e16",
              fontSize: 20,
              fontWeight: 900,
              boxShadow: "0 12px 30px rgba(34, 197, 94, 0.4)",
            }}
          >
            РЕЗУЛЬТАТ В КАССЕ, А НЕ В СЕО-ОТЧЁТАХ
          </div>
        </div>
      )}
    </ShortLayout>
  );
};
