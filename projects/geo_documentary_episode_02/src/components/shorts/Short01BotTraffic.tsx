import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShortLayout } from "./ShortLayout";

export const Short01BotTraffic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Three phases:
  // Phase 1 (0 - 450 frames / ~0-15s): 3-step funnel (Краулер -> Переход -> Клиент)
  // Phase 2 (450 - 930 frames / ~15-31s): 3 OpenAI Bots breakdown
  // Phase 3 (930 - 1503 frames / ~31-50s): Verification rule: Logs vs Deals

  const phase = frame < 450 ? 1 : frame < 930 ? 2 : 3;

  // Animations for Phase 1
  const cardSpring1 = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const step1Opacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const step2Opacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" });
  const step3Opacity = interpolate(frame, [110, 130], [0, 1], { extrapolateRight: "clamp" });

  // Animations for Phase 2
  const f2 = frame - 450;
  const bot1Spring = spring({ frame: f2 - 10, fps, config: { damping: 14, stiffness: 110 } });
  const bot2Spring = spring({ frame: f2 - 40, fps, config: { damping: 14, stiffness: 110 } });
  const bot3Spring = spring({ frame: f2 - 70, fps, config: { damping: 14, stiffness: 110 } });

  // Animations for Phase 3
  const f3 = frame - 930;
  const p3Spring = spring({ frame: f3, fps, config: { damping: 14, stiffness: 100 } });
  const sealScale = interpolate(f3, [30, 45], [2.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sealOpacity = interpolate(f3, [30, 40], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ShortLayout
      shortKey="short01"
      categoryTitle="ПАРАДОКС ТРАФИКА В GEO"
      shortNumber="01 / 07"
      bgVideoSrc="06_act1_server_token_cost.mp4"
      voiceoverStartSec={45.4}
      durationFrames={1503}
    >
      {phase === 1 && (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${cardSpring1})`,
            gap: 22,
          }}
        >
          {/* Header Card */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "36px 36px 30px",
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
                marginBottom: 14,
              }}
            >
              ГЛАВНАЯ ЛОВУШКА В ОТЧЁТАХ ПО GEO
            </div>
            <h1
              style={{
                fontSize: 42,
                lineHeight: "50px",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              ТРИ РАЗНЫХ ЭТАПА: <br />
              <span style={{ color: "#d97706" }}>ОТ БОТА К КЛИЕНТУ</span>
            </h1>
          </div>

          {/* 3 Steps in Funnel */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Step 1 */}
            <div
              style={{
                opacity: step1Opacity,
                transform: `translateX(${(1 - step1Opacity) * -30}px)`,
                background: "rgba(30, 41, 59, 0.92)",
                backdropFilter: "blur(16px)",
                borderRadius: 22,
                padding: "22px 28px",
                border: "1.5px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: "rgba(148, 163, 184, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#cbd5e1",
                }}
              >
                1
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#f8fafc" }}>
                  КРАУЛЕР СКАНЕР
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#94a3b8" }}>
                  Сканирует страницу для индекса. 0 рублей в кассе.
                </div>
              </div>
              <span style={{ padding: "6px 14px", borderRadius: 10, background: "rgba(148,163,184,0.15)", color: "#cbd5e1", fontSize: 16, fontWeight: 800 }}>
                Тех. запрос
              </span>
            </div>

            {/* Step 2 */}
            <div
              style={{
                opacity: step2Opacity,
                transform: `translateX(${(1 - step2Opacity) * -30}px)`,
                background: "rgba(30, 41, 59, 0.92)",
                backdropFilter: "blur(16px)",
                borderRadius: 22,
                padding: "22px 28px",
                border: "1.5px solid rgba(56, 189, 248, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: "rgba(56, 189, 248, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#38bdf8",
                }}
              >
                2
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#f8fafc" }}>
                  ПЕРЕХОД ПОЛЬЗОВАТЕЛЯ
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: "#bae6fd" }}>
                  Человек кликает на сноску в ответе нейросети.
                </div>
              </div>
              <span style={{ padding: "6px 14px", borderRadius: 10, background: "rgba(56,189,248,0.2)", color: "#38bdf8", fontSize: 16, fontWeight: 800 }}>
                AI-Реферал
              </span>
            </div>

            {/* Step 3 */}
            <div
              style={{
                opacity: step3Opacity,
                transform: `translateX(${(1 - step3Opacity) * -30}px)`,
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(20, 83, 45, 0.35) 100%)",
                backdropFilter: "blur(16px)",
                borderRadius: 22,
                padding: "24px 28px",
                border: "2px solid #22c55e",
                display: "flex",
                alignItems: "center",
                gap: 20,
                boxShadow: "0 10px 30px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#052e16",
                }}
              >
                ✓
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: "#ffffff" }}>
                  РЕАЛЬНЫЙ КЛИЕНТ В СRM
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#86efac" }}>
                  Пишет в WhatsApp, оформляет бронь, платит чек.
                </div>
              </div>
              <span style={{ padding: "6px 14px", borderRadius: 10, background: "#22c55e", color: "#052e16", fontSize: 16, fontWeight: 900 }}>
                Деньги в кассе
              </span>
            </div>
          </div>

          {/* Telemetry Strip */}
          <div
            style={{
              width: "100%",
              background: "rgba(15, 23, 42, 0.9)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 18,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <span style={{ fontSize: 19, fontWeight: 700, color: "#e2e8f0" }}>
              ⚡ Охват на графике ботов ≠ Поток клиентов
            </span>
            <span style={{ fontSize: 17, fontWeight: 900, color: "#f59e0b" }}>
              НЕ ПУТАТЬ
            </span>
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
              padding: "32px 36px 26px",
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
                marginBottom: 10,
              }}
            >
              АРХИТЕКТУРА OPENAI
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
              3 РАЗНЫХ БОТА В ВАШИХ ЛОГАХ
            </h1>
          </div>

          {/* Bot 1: GPTBot */}
          <div
            style={{
              width: "100%",
              transform: `scale(${bot1Spring})`,
              background: "rgba(24, 30, 46, 0.94)",
              borderRadius: 22,
              padding: "20px 26px",
              border: "1.5px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: "#94a3b8", fontFamily: "monospace" }}>
                  GPTBot
                </span>
                <span style={{ fontSize: 15, fontWeight: 800, padding: "4px 10px", borderRadius: 8, background: "rgba(148,163,184,0.15)", color: "#cbd5e1" }}>
                  Обучение моделей
                </span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, color: "#94a3b8", marginTop: 6 }}>
                Парсит данные для LLM. Не даёт переходов и клиентов.
              </div>
            </div>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#94a3b8" }}>
              0 Кликов
            </span>
          </div>

          {/* Bot 2: OAI-SearchBot */}
          <div
            style={{
              width: "100%",
              transform: `scale(${bot2Spring})`,
              background: "rgba(24, 30, 46, 0.94)",
              borderRadius: 22,
              padding: "20px 26px",
              border: "2px solid #38bdf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
              boxShadow: "0 10px 25px rgba(56, 189, 248, 0.2)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: "#38bdf8", fontFamily: "monospace" }}>
                  OAI-SearchBot
                </span>
                <span style={{ fontSize: 15, fontWeight: 800, padding: "4px 10px", borderRadius: 8, background: "rgba(56,189,248,0.2)", color: "#38bdf8" }}>
                  Поиск ChatGPT
                </span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 600, color: "#bae6fd", marginTop: 6 }}>
                Индексирует факты под поисковые ответы ChatGPT Search.
              </div>
            </div>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#38bdf8" }}>
              GEO Индекс
            </span>
          </div>

          {/* Bot 3: ChatGPT-User */}
          <div
            style={{
              width: "100%",
              transform: `scale(${bot3Spring})`,
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)",
              borderRadius: 22,
              padding: "22px 26px",
              border: "2px solid #22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
              boxShadow: "0 12px 30px rgba(34, 197, 94, 0.25)",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 26, fontWeight: 900, color: "#4ade80", fontFamily: "monospace" }}>
                  ChatGPT-User
                </span>
                <span style={{ fontSize: 15, fontWeight: 900, padding: "4px 10px", borderRadius: 8, background: "#22c55e", color: "#052e16" }}>
                  Действие человека
                </span>
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#86efac", marginTop: 6 }}>
                Открывает страницу по прямой команде реального пользователя!
              </div>
            </div>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#4ade80" }}>
              ⚡ Лид
            </span>
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
            gap: 22,
          }}
        >
          {/* Header Card */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "36px 36px 28px",
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
                marginBottom: 12,
              }}
            >
              ПРАВИЛО ПРОВЕРКИ ПОДРЯДЧИКОВ
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
              ТРЕБУЙТЕ СТАТУС СДЕЛКИ, <br />
              <span style={{ color: "#ef4444" }}>А НЕ ГРАФИКИ БОТОВ!</span>
            </h1>
          </div>

          {/* Comparison Cards */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "rgba(239, 68, 68, 0.15)",
                border: "1.5px solid rgba(239, 68, 68, 0.4)",
                borderRadius: 20,
                padding: "22px 26px",
                display: "flex",
                alignItems: "center",
                gap: 18,
              }}
            >
              <div style={{ fontSize: 32 }}>❌</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#fca5a5" }}>
                  10 000 серверных запросов ботов
                </div>
                <div style={{ fontSize: 17, color: "#fecaca" }}>
                  Просто трафик краулеров. В кассе 0 рублей.
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(34, 197, 94, 0.18)",
                border: "2px solid #22c55e",
                borderRadius: 20,
                padding: "22px 26px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 10px 25px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div style={{ fontSize: 32 }}>✅</div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#86efac" }}>
                  Переписка в мессенджере + бронь
                </div>
                <div style={{ fontSize: 17, color: "#bbf7d0" }}>
                  Подтвержденный диалог, имя клиента и оплата.
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Seal Stamp */}
          <div
            style={{
              opacity: sealOpacity,
              transform: `scale(${sealScale})`,
              padding: "16px 36px",
              borderRadius: 16,
              background: "#22c55e",
              color: "#052e16",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: "0.04em",
              boxShadow: "0 15px 35px rgba(34, 197, 94, 0.4)",
            }}
          >
            НЕТ СДЕЛКИ В CRM = НЕТ AI-ТРАФИКА
          </div>
        </div>
      )}
    </ShortLayout>
  );
};
