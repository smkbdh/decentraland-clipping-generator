import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShortLayout } from "./ShortLayout";

export const Short06LlmsTxtMyth: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 450 frames / ~0-15s): Real Technical Foundation (robots.txt, sitemap, OAI-SearchBot)
  // Phase 2 (450 - 920 frames / ~15-30s): The llms.txt Myth: 0% Guarantees
  // Phase 3 (920 - 1395 frames / ~30-46.5s): Full-Funnel Attribution Standard

  const phase = frame < 450 ? 1 : frame < 920 ? 2 : 3;

  // Phase 1
  const p1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  // Phase 2
  const f2 = frame - 450;
  const p2Spring = spring({ frame: f2, fps, config: { damping: 14, stiffness: 100 } });
  const mythStampScale = interpolate(f2, [25, 40], [2.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Phase 3
  const f3 = frame - 920;
  const p3Spring = spring({ frame: f3, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <ShortLayout
      shortKey="short06"
      categoryTitle="ИНЖЕНЕРНЫЙ СТАНДАРТ GEO"
      shortNumber="06 / 07"
      bgVideoSrc="01_hook_coding.mp4"
      voiceoverStartSec={518.5}
      durationFrames={1395}
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
            gap: 18,
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
                marginBottom: 8,
              }}
            >
              ПРАВИЛО №2 ДЛЯ БИЗНЕСА
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
              ТЕХНИЧЕСКАЯ ДОСТУПНОСТЬ: <br />
              <span style={{ color: "#0284c7" }}>ЧТО РЕАЛЬНО НУЖНО ИИ</span>
            </h1>
          </div>

          {/* Checklist */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 22, color: "#22c55e", fontWeight: 900 }}>✓</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>
                robots.txt и sitemap.xml без блокировок
              </div>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 22, color: "#22c55e", fontWeight: 900 }}>✓</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>
                Канонические адреса и чистый семантический HTML
              </div>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "2px solid #38bdf8",
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 8px 25px rgba(56, 189, 248, 0.2)",
              }}
            >
              <div style={{ fontSize: 22, color: "#38bdf8", fontWeight: 900 }}>⚡</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: "#bae6fd" }}>
                Разрешение доступа для бота OAI-SearchBot
              </div>
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
              padding: "28px 36px 22px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderTop: "6px solid #ef4444",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(239, 68, 68, 0.14)",
                color: "#b91c1c",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              МИФ О ВОЛШЕБНОЙ ТАБЛЕТКЕ
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
              ФАЙЛ LLMS.TXT <br />
              <span style={{ color: "#ef4444" }}>НЕ ГАРАНТИРУЕТ ПРОДАЖ!</span>
            </h1>
          </div>

          {/* Terminal Window Mockup */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(24, 27, 34, 0.98) 0%, rgba(12, 14, 18, 0.98) 100%)",
              borderRadius: 20,
              border: "1.5px solid rgba(255,255,255,0.14)",
              overflow: "hidden",
              boxSizing: "border-box",
              position: "relative",
            }}
          >
            <div style={{ display: "flex", gap: 8, padding: "12px 16px", background: "rgba(255,255,255,0.05)" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
              <span style={{ marginLeft: 12, fontSize: 14, color: "#94a3b8", fontFamily: "monospace" }}>
                cat /var/www/llms.txt
              </span>
            </div>
            <div style={{ padding: "18px 20px", fontFamily: "monospace", fontSize: 15, color: "#cbd5e1", lineHeight: "24px" }}>
              # llms.txt draft specification<br />
              &gt; Ни Google, ни OpenAI не дают за него приоритет.<br />
              &gt; Не превращайте техническую гипотезу в гарантию!
            </div>

            {/* Myth Stamp */}
            <div
              style={{
                position: "absolute",
                top: 35,
                right: 30,
                transform: `scale(${mythStampScale}) rotate(-8deg)`,
                border: "3px solid #ef4444",
                borderRadius: 12,
                padding: "8px 16px",
                color: "#ef4444",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                background: "rgba(239, 68, 68, 0.12)",
              }}
            >
              0% ГАРАНТИЙ
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
            gap: 18,
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
              СКВОЗНОЙ СТАНДАРТ АНАЛИТИКИ
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
              ИЗМЕРЯЙТЕ ВСЮ ВОРОНКУ: <br />
              <span style={{ color: "#16a34a" }}>ОТ UTM ДО КАССЫ В CRM</span>
            </h1>
          </div>

          {/* Funnel Pipeline */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>
                1. Исходная метка &amp; реферер
              </span>
              <span style={{ fontSize: 15, fontWeight: 900, color: "#38bdf8" }}>
                utm_source=chatgpt.com
              </span>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>
                2. Разделение кликов и заявок
              </span>
              <span style={{ fontSize: 15, fontWeight: 900, color: "#f59e0b" }}>
                Key Events в GA4
              </span>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "2px solid #22c55e",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 18, fontWeight: 900, color: "#86efac" }}>
                3. Подтвержденная бронь и оплата
              </span>
              <span style={{ fontSize: 15, fontWeight: 900, color: "#22c55e" }}>
                Деньги в кассе
              </span>
            </div>
          </div>
        </div>
      )}
    </ShortLayout>
  );
};
