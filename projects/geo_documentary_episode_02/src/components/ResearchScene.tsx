import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TechGlossaryFootnote } from "./TechGlossaryFootnote";

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
              opacity: 0.32,
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
              opacity: 0.36,
              transform: `scale(${interpolate(frame - 58 * fps, [0, 24 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#f59e0b" />

      {/* =========================================================================
          PHASE 1 (0 - 29s): MARIE HAYNES 145M SESSIONS & VISUAL SCALE BAR
          ========================================================================= */}
      {sec < 29 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "85px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
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
              marginBottom: 14,
            }}
          >
            ИССЛЕДОВАНИЕ MARIE HAYNES · 12 МЕСЯЦЕВ
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 24px",
            }}
          >
            РЕАЛЬНЫЙ ОБЪЁМ ТРАФИКА: МАСШТАБ GOOGLE
          </h2>

          {/* Metric Cards (Editorial Dossier) */}
          <div style={{ display: "flex", gap: 36, maxWidth: 1350, width: "100%", marginBottom: 24 }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #d97706",
                borderRadius: 24,
                padding: "26px 32px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 17, color: "#92400e", fontWeight: 900, marginBottom: 4, letterSpacing: 1 }}>
                CHATGPT / ПОИСК GOOGLE
              </div>
              <div style={{ fontSize: 96, fontWeight: 900, color: "#d97706", letterSpacing: -2, lineHeight: 1.0, margin: "6px 0" }}>
                {interpolate(frame, [0, 24], [0, 0.62], { extrapolateRight: "clamp" }).toFixed(2)}%
              </div>
              <div style={{ fontSize: 20, color: "#0f172a", fontWeight: 800 }}>
                Доля переходов от общего поискового объема
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #0284c7",
                borderRadius: 24,
                padding: "26px 32px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 17, color: "#0369a1", fontWeight: 900, marginBottom: 4, letterSpacing: 1 }}>
                ВСЕ НЕЙРОСЕТИ ВМЕСТЕ
              </div>
              <div style={{ fontSize: 96, fontWeight: 900, color: "#0284c7", letterSpacing: -2, lineHeight: 1.0, margin: "6px 0" }}>
                {interpolate(frame, [6, 28], [0, 0.73], { extrapolateRight: "clamp" }).toFixed(2)}%
              </div>
              <div style={{ fontSize: 20, color: "#0f172a", fontWeight: 800 }}>
                ChatGPT + Perplexity + Claude + Copilot
              </div>
            </div>
          </div>

          {/* Visual Proportional Scale Bar (Financial Times / Bloomberg Editorial Style) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1350,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderRadius: 20,
              padding: "18px 28px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 900, marginBottom: 10 }}>
              <span style={{ color: "#1d4ed8" }}>🌐 ОРГАНИЧЕСКИЙ ПОИСК GOOGLE: 99.27% (143 900 000+ визитов)</span>
              <span style={{ color: "#d97706" }}>⚡ AI-РЕФЕРАЛЫ: 0.73%</span>
            </div>

            {/* Scale Bar */}
            <div style={{ height: 26, width: "100%", backgroundColor: "#e2e8f0", borderRadius: 13, overflow: "hidden", display: "flex", position: "relative" }}>
              <div style={{ width: "97.5%", height: "100%", backgroundColor: "#2563eb", borderRadius: "13px 0 0 13px" }} />
              <div style={{ width: "2.5%", height: "100%", backgroundColor: "#f59e0b", boxShadow: "0 0 15px #f59e0b", borderRadius: "0 13px 13px 0" }} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#475569", marginTop: 8, fontWeight: 700 }}>
              <span>Выборка: 100 коммерческих сайтов за 12 месяцев исследования</span>
              <span>Классический поиск по-прежнему генерирует 99%+ кликов в интернете</span>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 2 (29 - 58s): THE CONVERSION PARADOX (4.5X HIGHER INTENT)
          ========================================================================= */}
      {sec >= 29 && sec < 58 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "85px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
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
              marginBottom: 14,
            }}
          >
            ПАРАДОКС КОНВЕРСИИ (55 САЙТОВ С ТРЕКИНГОМ)
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 28px",
            }}
          >
            КОНВЕРСИЯ В 4.5 РАЗА ВЫШЕ, ЧЕМ В ОБЫЧНОМ ПОИСКЕ
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1350, width: "100%" }}>
            {/* Left: ChatGPT Conversion Rate (Editorial Dossier) */}
            <div
              style={{
                flex: 1.15,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #059669",
                borderRadius: 24,
                padding: "30px 34px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 6 }}>
                <span style={{ fontSize: 16, color: "#047857", fontWeight: 900, letterSpacing: 1 }}>
                  CHATGPT CONVERSION RATE
                </span>
                <span style={{ fontSize: 12, color: "#047857", fontWeight: 900, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", padding: "2px 8px", borderRadius: 8 }}>
                  ⚡ В 4.5 РАЗА ВЫШЕ
                </span>
              </div>
              <div style={{ fontSize: 104, fontWeight: 900, color: "#059669", letterSpacing: -3, lineHeight: 1.0, margin: "6px 0" }}>
                {interpolate(frame - 29 * fps, [0, 24], [0, 13.8], { extrapolateRight: "clamp" }).toFixed(1)}%
              </div>
              <div style={{ fontSize: 22, color: "#0f172a", fontWeight: 900, marginBottom: 8 }}>
                Готовые клиенты с высоким чеком
              </div>
              <div style={{ fontSize: 16, color: "#475569", lineHeight: 1.4, fontWeight: 600 }}>
                Пользователь уже получил ответ от ИИ и приходит только подтвердить бронь или сделку.
              </div>
            </div>

            {/* Right: Google Organic Rate (Editorial Dossier) */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #64748b",
                borderRadius: 24,
                padding: "30px 34px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 16, color: "#64748b", fontWeight: 900, marginBottom: 6, letterSpacing: 1 }}>
                GOOGLE ORGANIC RATE
              </div>
              <div style={{ fontSize: 104, fontWeight: 900, color: "#475569", letterSpacing: -3, lineHeight: 1.0, margin: "6px 0" }}>
                {interpolate(frame - 29 * fps, [6, 28], [0, 3.02], { extrapolateRight: "clamp" }).toFixed(2)}%
              </div>
              <div style={{ fontSize: 22, color: "#0f172a", fontWeight: 800, marginBottom: 8 }}>
                Классический поисковый трафик
              </div>
              <div style={{ fontSize: 16, color: "#64748b", lineHeight: 1.4, fontWeight: 600 }}>
                Холодные визиты: человек переходит по 5-10 вкладкам и часто закрывает сайт без действия.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 3 (58s+): ANALYTICS TRAP (NGINX LOGS VS REAL MONEY)
          ========================================================================= */}
      {sec >= 58 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "85px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
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
              marginBottom: 14,
            }}
          >
            ГЛАВНАЯ ЛОВУШКА АНАЛИТИКИ
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 26px",
            }}
          >
            45 ИЗ 100 САЙТОВ НЕ НАСТРОИЛИ KEY EVENTS
          </h2>

          {/* Split Comparison: Bot Crawlers Illusion vs Real Client Funnel */}
          <div style={{ display: "flex", gap: 32, maxWidth: 1380, width: "100%" }}>
            {/* Left: Obsidian Pro Glass Terminal for Server Logs */}
            <div
              style={{
                flex: 1,
                background: "linear-gradient(180deg, rgba(24, 27, 34, 0.98) 0%, rgba(12, 14, 18, 0.98) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderTop: "1.5px solid rgba(239, 68, 68, 0.6)",
                borderRadius: 22,
                padding: "22px 26px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 25px 60px rgba(0,0,0,0.75), 0 0 35px rgba(239, 68, 68, 0.2)",
              }}
            >
              {/* Terminal Title Bar */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#ef4444" }} />
                  <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#eab308" }} />
                  <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: "#22c55e" }} />
                  <span style={{ fontSize: 13, color: "#94a3b8", fontFamily: "monospace", marginLeft: 6 }}>
                    tail -f /var/log/nginx/access.log
                  </span>
                </div>
                <span style={{ fontSize: 12, color: "#f87171", fontWeight: 800, backgroundColor: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", padding: "3px 8px", borderRadius: 8 }}>
                  ❌ ШУМ БОТОВ
                </span>
              </div>

              {/* Terminal Log Output */}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.55)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "14px 18px",
                  fontFamily: "monospace",
                  fontSize: 14,
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  marginBottom: 14,
                }}
              >
                <div>[14:22:01] GET /pricing &quot;OAI-SearchBot/1.0&quot; <span style={{ color: "#4ade80" }}>200 OK</span></div>
                <div>[14:22:05] GET /condo/kamala &quot;GPTBot/1.2&quot; <span style={{ color: "#4ade80" }}>200 OK</span></div>
                <div>[14:22:09] GET /robots.txt &quot;ClaudeBot/1.0&quot; <span style={{ color: "#4ade80" }}>200 OK</span></div>
              </div>

              <div style={{ fontSize: 17, color: "#f87171", fontWeight: 800, lineHeight: 1.35 }}>
                10 000 заходов поисковых роботов создают видимость бума трафика. Но боты не покупают товары.
              </div>
            </div>

            {/* Right: Real Deal Funnel (Editorial Dossier) */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #059669",
                borderRadius: 22,
                padding: "22px 28px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 16, fontWeight: 900, color: "#047857", letterSpacing: 1 }}>
                  ✅ РЕАЛЬНЫЙ РЕЗУЛЬТАТ ДЛЯ БИЗНЕСА
                </span>
                <span style={{ fontSize: 12, color: "#047857", fontWeight: 900, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", padding: "3px 8px", borderRadius: 8 }}>
                  ВЫРУЧКА В КАССУ
                </span>
              </div>

              <div
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, color: "#0f172a", fontWeight: 800 }}>
                  <span>🎯 1 целевой переход из ответа ChatGPT Search</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, color: "#0369a1", fontWeight: 800 }}>
                  <span>💬 Клиент сразу пишет в WhatsApp с готовым запросом</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 16, color: "#059669", fontWeight: 900 }}>
                  <span>💰 Подтвержденная бронь на 4 000 000 THB</span>
                </div>
              </div>

              <div style={{ fontSize: 17, color: "#334155", fontWeight: 700, lineHeight: 1.35 }}>
                Сквозной трекинг отсекает шум ботов и фиксирует факт поступления реальных денег.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DYNAMIC TECH GLOSSARY FOOTNOTE (TIMED TO VOICE-OVER)
          ========================================================================= */}
      {sec < 29 && (
        <TechGlossaryFootnote
          term="AI-Рефералы"
          englishTitle="AI Referral Traffic"
          russianExplanation="Переходы пользователей на сайт по кликабельным ссылкам-сноскам прямо из интерфейса ChatGPT, Perplexity или Google AI Overviews."
          accentColor="#f59e0b"
        />
      )}

      {sec >= 29 && sec < 58 && (
        <TechGlossaryFootnote
          term="Conversion Rate"
          englishTitle="Коэффициент конверсии"
          russianExplanation="Доля посетителей, совершивших покупку или бронь. У пользователей из AI-ответов мотивация выше, так как модель уже подобрала для них готовое решение."
          accentColor="#22c55e"
        />
      )}

      {sec >= 58 && (
        <TechGlossaryFootnote
          term="Key Events"
          englishTitle="Ключевые события в GA4"
          russianExplanation="Настроенные целевые действия (клики в WhatsApp, отправки заявок), которые позволяют отличать реальных покупателей от сотен тысяч поисковых роботов."
          accentColor="#ef4444"
        />
      )}
    </div>
  );
};
