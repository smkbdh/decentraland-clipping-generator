import React from "react";
import { BackgroundGrid } from "./BackgroundGrid";

export const CardStyleComparison: React.FC = () => {
  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#07090e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px 80px",
        fontFamily: "Bahnschrift, Segoe UI, -apple-system, sans-serif",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      <BackgroundGrid accentColor="#38bdf8" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40, zIndex: 10 }}>
        <div
          style={{
            display: "inline-block",
            padding: "6px 20px",
            borderRadius: 30,
            backgroundColor: "rgba(56, 189, 248, 0.15)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            color: "#38bdf8",
            fontSize: 16,
            fontWeight: 900,
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          АРТ-ДИРЕКЦИЯ И МАТЕРИАЛЫ ПЛАШЕК
        </div>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: "#ffffff", margin: 0 }}>
          СРАВНЕНИЕ 3 ДИЗАЙН-КОНЦЕПЦИЙ ДЛЯ ВИДЕО
        </h1>
        <p style={{ fontSize: 20, color: "#94a3b8", margin: "8px 0 0" }}>
          Какой стиль выглядит дороже, статуснее и удерживает внимание зрителя?
        </p>
      </div>

      {/* 3 Variations Side by Side */}
      <div style={{ display: "flex", gap: 36, width: "100%", maxWidth: 1760, zIndex: 10 }}>
        {/* OPTION 1: CURRENT (Slate-900 Dark Blue + Neon Border) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#94a3b8", textTransform: "uppercase" }}>
              ВАРИАНТ 1 · ТЕКУЩИЙ
            </span>
            <div style={{ fontSize: 14, color: "#64748b" }}>Тёмно-синий Navy Slate + Неоновые рамки</div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2px solid #22c55e",
              borderRadius: 22,
              padding: "28px 24px",
              boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(34, 197, 94, 0.2)",
              display: "flex",
              flexDirection: "column",
              height: 480,
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 15, color: "#4ade80", fontWeight: 900, marginBottom: 10, letterSpacing: 1 }}>
                КЕЙС 01 · АРЕНДА АВТО (ПХУКЕТ)
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", lineHeight: 1.25, marginBottom: 14 }}>
                38 WhatsApp-лидов из ChatGPT
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.45 }}>
                Сквозные UTM-метки <code style={{ color: "#4ade80" }}>utm=chatgpt.com</code> и прямые брони автопарка на Патонге.
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "16px",
                  borderRadius: 14,
                  backgroundColor: "rgba(30, 41, 59, 0.8)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 14, color: "#94a3b8", marginBottom: 4 }}>Выручка автопарка</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>+100% Занятость</div>
              </div>
              <div
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  color: "#4ade80",
                  fontSize: 16,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                ✓ Проверено в CRM
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#ef4444", textAlign: "center", fontWeight: 600 }}>
            ⚠ Минус: выглядит как типичный шаблон Tailwind / AI-saas
          </div>
        </div>

        {/* OPTION 2: OBSIDIAN STUDIO GLASS (Apple Hardware / VisionOS) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#38bdf8", textTransform: "uppercase" }}>
              ВАРИАНТ 2 · OBSIDIAN PRO GLASS
            </span>
            <div style={{ fontSize: 14, color: "#38bdf8" }}>Глубокий обсидиан + Фаска света + Тихий хром</div>
          </div>

          <div
            style={{
              background: "linear-gradient(180deg, rgba(24, 27, 34, 0.94) 0%, rgba(12, 14, 18, 0.98) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderTop: "1.5px solid rgba(255, 255, 255, 0.22)",
              borderRadius: 22,
              padding: "28px 24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              height: 480,
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 13,
                    color: "#34d399",
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    backgroundColor: "rgba(16, 185, 129, 0.12)",
                    border: "1px solid rgba(16, 185, 129, 0.3)",
                    padding: "4px 10px",
                    borderRadius: 8,
                  }}
                >
                  КЕЙС 01 · АРЕНДА АВТО
                </span>
                <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 700 }}>Пхукет, Таиланд</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f8fafc", lineHeight: 1.25, marginBottom: 14 }}>
                38 WhatsApp-лидов из ChatGPT
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.45 }}>
                Сквозные UTM-метки <code style={{ color: "#34d399", backgroundColor: "rgba(255,255,255,0.06)", padding: "2px 6px", borderRadius: 6 }}>utm=chatgpt.com</code> и прямые брони автопарка на Патонге.
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "16px",
                  borderRadius: 14,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 4 }}>Выручка автопарка</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#34d399", letterSpacing: -0.5 }}>
                  +100% Занятость
                </div>
              </div>
              <div
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  color: "#f8fafc",
                  fontSize: 16,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                ✓ Проверено в CRM
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#38bdf8", textAlign: "center", fontWeight: 600 }}>
            ★ Плюс: кинематографично, дорого, премиальный hardware-стиль Apple
          </div>
        </div>

        {/* OPTION 3: EDITORIAL STUDIO PAPER (Bloomberg / Vox Light Dossier) */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 18, fontWeight: 900, color: "#f59e0b", textTransform: "uppercase" }}>
              ВАРИАНТ 3 · EDITORIAL DOSSIER
            </span>
            <div style={{ fontSize: 14, color: "#f59e0b" }}>Светлая студийная бумага + Журналистский контраст</div>
          </div>

          <div
            style={{
              backgroundColor: "rgba(248, 250, 252, 0.97)",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              borderRadius: 22,
              padding: "28px 24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              height: 480,
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 13,
                    color: "#047857",
                    fontWeight: 900,
                    letterSpacing: 1.5,
                    backgroundColor: "rgba(5, 150, 105, 0.1)",
                    border: "1px solid rgba(5, 150, 105, 0.25)",
                    padding: "4px 10px",
                    borderRadius: 8,
                  }}
                >
                  КЕЙС 01 · АРЕНДА АВТО
                </span>
                <span style={{ fontSize: 13, color: "#64748b", fontWeight: 700 }}>Пхукет, Таиланд</span>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", lineHeight: 1.25, marginBottom: 14 }}>
                38 WhatsApp-лидов из ChatGPT
              </div>
              <div style={{ fontSize: 18, color: "#334155", lineHeight: 1.45 }}>
                Сквозные UTM-метки <code style={{ color: "#047857", backgroundColor: "#e2e8f0", padding: "2px 6px", borderRadius: 6, fontWeight: 700 }}>utm=chatgpt.com</code> и прямые брони автопарка на Патонге.
              </div>
            </div>

            <div>
              <div
                style={{
                  padding: "16px",
                  borderRadius: 14,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: 14, color: "#64748b", marginBottom: 4 }}>Выручка автопарка</div>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#047857", letterSpacing: -0.5 }}>
                  +100% Занятость
                </div>
              </div>
              <div
                style={{
                  padding: "10px 16px",
                  borderRadius: 12,
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  fontSize: 16,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                ✓ Проверено в CRM
              </div>
            </div>
          </div>
          <div style={{ fontSize: 13, color: "#f59e0b", textAlign: "center", fontWeight: 600 }}>
            ★ Плюс: максимальный контраст с темным видео, стиль расследований Vox/Bloomberg
          </div>
        </div>
      </div>
    </div>
  );
};
