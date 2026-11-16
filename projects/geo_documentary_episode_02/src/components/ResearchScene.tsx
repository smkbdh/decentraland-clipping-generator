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

      {/* 58s+: Red Alert / Alarm Warning for Missing Tracking & Traps */}
      <Sequence from={Math.round(58 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("20_red_alarm_alert.mp4")}
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.38,
              transform: `scale(${interpolate(frame - 58 * fps, [0, 24 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
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
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              border: "1.5px solid rgba(245, 158, 11, 0.5)",
              color: "#f59e0b",
              fontSize: 18,
              fontWeight: 900,
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

          <div style={{ display: "flex", gap: 40, maxWidth: 1250, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid rgba(245, 158, 11, 0.5)",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 20px 45px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ fontSize: 20, color: "#94a3b8", fontWeight: 800, marginBottom: 8 }}>
                CHATGPT / GOOGLE ORGANIC
              </div>
              <div style={{ fontSize: 104, fontWeight: 900, color: "#f59e0b", letterSpacing: -2, lineHeight: 1.0, margin: "10px 0" }}>
                {interpolate(frame, [0, 24], [0, 0.62], { extrapolateRight: "clamp" }).toFixed(2)}%
              </div>
              <div style={{ fontSize: 24, color: "#cbd5e1", fontWeight: 700 }}>
                Доля переходов от общего поискового объема
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid rgba(56, 189, 248, 0.5)",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 20px 45px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ fontSize: 20, color: "#94a3b8", fontWeight: 800, marginBottom: 8 }}>
                ВСЕ НЕЙРОСЕТИ ВМЕСТЕ
              </div>
              <div style={{ fontSize: 104, fontWeight: 900, color: "#38bdf8", letterSpacing: -2, lineHeight: 1.0, margin: "10px 0" }}>
                {interpolate(frame, [6, 28], [0, 0.73], { extrapolateRight: "clamp" }).toFixed(2)}%
              </div>
              <div style={{ fontSize: 24, color: "#cbd5e1", fontWeight: 700 }}>
                ChatGPT + Perplexity + Claude + Copilot
              </div>
            </div>
          </div>

          <div style={{ marginTop: 32, fontSize: 22, color: "#94a3b8", fontWeight: 700 }}>
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
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              border: "1.5px solid rgba(34, 197, 94, 0.5)",
              color: "#22c55e",
              fontSize: 18,
              fontWeight: 900,
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

          <div style={{ display: "flex", gap: 40, maxWidth: 1250, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2.5px solid #22c55e",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 0 45px rgba(34, 197, 94, 0.3)",
              }}
            >
              <div style={{ fontSize: 20, color: "#86efac", fontWeight: 900, marginBottom: 8 }}>
                CHATGPT CONVERSION RATE
              </div>
              <div style={{ fontSize: 116, fontWeight: 900, color: "#22c55e", letterSpacing: -2, lineHeight: 1.0, margin: "10px 0" }}>
                {interpolate(frame - 29 * fps, [0, 24], [0, 13.8], { extrapolateRight: "clamp" }).toFixed(1)}%
              </div>
              <div style={{ fontSize: 24, color: "#f8fafc", fontWeight: 700 }}>
                Сверхвысокая мотивация и готовность к сделке
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 20, color: "#94a3b8", fontWeight: 900, marginBottom: 8 }}>
                GOOGLE ORGANIC RATE
              </div>
              <div style={{ fontSize: 116, fontWeight: 900, color: "#94a3b8", letterSpacing: -2, lineHeight: 1.0, margin: "10px 0" }}>
                {interpolate(frame - 29 * fps, [6, 28], [0, 3.02], { extrapolateRight: "clamp" }).toFixed(2)}%
              </div>
              <div style={{ fontSize: 24, color: "#94a3b8", fontWeight: 700 }}>
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
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              border: "1.5px solid rgba(239, 68, 68, 0.5)",
              color: "#ef4444",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ГЛАВНАЯ ЛОВУШКА АНАЛИТИКИ
          </div>

          <h2
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 32px",
            }}
          >
            45 ИЗ 100 САЙТОВ НЕ НАСТРОИЛИ KEY EVENTS
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "2px solid rgba(239, 68, 68, 0.5)",
              borderRadius: 24,
              padding: "44px 60px",
              maxWidth: 1150,
              textAlign: "center",
              boxShadow: "0 0 45px rgba(239, 68, 68, 0.25)",
            }}
          >
            <div style={{ fontSize: 32, color: "#f8fafc", fontWeight: 800, lineHeight: 1.45, marginBottom: 22 }}>
              Красивые графики визитов ничего не говорят о деньгах. Без событийной аналитики бизнес не знает, кто пришёл: бот или покупатель.
            </div>
            <div style={{ fontSize: 26, color: "#38bdf8", fontWeight: 900 }}>
              ➔ Мы отслеживаем цепочку до уведомления бота, WhatsApp и договора
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

