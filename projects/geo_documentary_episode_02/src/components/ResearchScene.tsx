import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const ResearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* BACKGROUND FOOTAGE & REAL SCREENCAST */}

      {/* 0 - 29s: Real Marie Haynes Article Screenshot in Motion */}
      <Sequence from={0} durationInFrames={Math.round(29 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("site_mariehaynes_study.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame, [0, 29 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 29 - 58s: High-tech Financial & Analytics Growth Video */}
      <Sequence from={Math.round(29 * fps)} durationInFrames={Math.round(29 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("05_act1_analytics_growth.mp4")}
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
              transform: `scale(${interpolate(frame - 29 * fps, [0, 29 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 58s+: Data Center Servers */}
      <Sequence from={Math.round(58 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("b_roll_classroom_study.mp4")}
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#f59e0b" />

      {/* PHASE 1 (0 - 29s): Marie Haynes 145M Sessions */}
      {sec < 29 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px 100px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#f59e0b",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ИССЛЕДОВАНИЕ MARIE HAYNES · 12 МЕСЯЦЕВ
          </div>

          <h2
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 35px",
            }}
          >
            РЕАЛЬНЫЙ ОБЪЁМ ТРАФИКА: МАСШТАБ GOOGLE
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                CHATGPT / GOOGLE ORGANIC
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#f59e0b", letterSpacing: -1 }}>
                0.62%
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1" }}>
                Доля переходов от общего поискового объема
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                ВСЕ НЕЙРОСЕТИ ВМЕСТЕ
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#38bdf8", letterSpacing: -1 }}>
                0.73%
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1" }}>
                ChatGPT + Perplexity + Claude + Copilot
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28, fontSize: 17, color: "#64748b", fontWeight: 600 }}>
            Выборка: 100 коммерческих сайтов · 145 000 000+ пользовательских сессий
          </div>
        </div>
      )}

      {/* PHASE 2 (29 - 58s): The Conversion Paradox */}
      {sec >= 29 && sec < 58 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px 100px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              color: "#22c55e",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ПАРАДОКС КОНВЕРСИИ (55 САЙТОВ С ТРЕКИНГОМ)
          </div>

          <h2
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 35px",
            }}
          >
            КОНВЕРСИЯ В 4.5 РАЗА ВЫШЕ ЧЕМ В ПОИСКЕ
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "2px solid #22c55e",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 0 35px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 18, color: "#86efac", fontWeight: 800, marginBottom: 8 }}>
                CHATGPT CONVERSION RATE
              </div>
              <div style={{ fontSize: 88, fontWeight: 900, color: "#22c55e", letterSpacing: -1 }}>
                13.8%
              </div>
              <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 600 }}>
                Сверхвысокая мотивация и готовность к сделке
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 800, marginBottom: 8 }}>
                GOOGLE ORGANIC RATE
              </div>
              <div style={{ fontSize: 88, fontWeight: 900, color: "#94a3b8", letterSpacing: -1 }}>
                3.02%
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 600 }}>
                Классический поисковый трафик
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3 (58s+): Analytics Trap */}
      {sec >= 58 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px 100px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#ef4444",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ГЛАВНАЯ ЛОВУШКА АНАЛИТИКИ
          </div>

          <h2
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 30px",
            }}
          >
            45 ИЗ 100 САЙТОВ НЕ НАСТРОИЛИ KEY EVENTS
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: 24,
              padding: "36px 50px",
              maxWidth: 1000,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, color: "#f8fafc", fontWeight: 700, lineHeight: 1.4, marginBottom: 20 }}>
              Красивые графики визитов ничего не говорят о деньгах. Без событийной аналитики бизнес не знает, кто пришёл: бот или покупатель.
            </div>
            <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 800 }}>
              ➔ Мы отслеживаем цепочку до уведомления бота, WhatsApp и договора
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

