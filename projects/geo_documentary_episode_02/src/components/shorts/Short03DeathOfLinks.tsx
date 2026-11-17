import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShortLayout } from "./ShortLayout";

export const Short03DeathOfLinks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 500 frames / ~0-17s): 10 Blue links vs ChatGPT synthesized answer
  // Phase 2 (500 - 1050 frames / ~17-35s): RAG & Query Fan-Out 4 branches
  // Phase 3 (1050 - 1620 frames / ~35-54s): Spam filtered vs Exact facts accepted

  const phase = frame < 500 ? 1 : frame < 1050 ? 2 : 3;

  // Phase 1 animations
  const p1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });

  // Phase 2 animations
  const f2 = frame - 500;
  const p2Spring = spring({ frame: f2, fps, config: { damping: 14, stiffness: 100 } });
  const b1 = interpolate(f2, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  const b2 = interpolate(f2, [35, 50], [0, 1], { extrapolateRight: "clamp" });
  const b3 = interpolate(f2, [55, 70], [0, 1], { extrapolateRight: "clamp" });
  const b4 = interpolate(f2, [75, 90], [0, 1], { extrapolateRight: "clamp" });

  // Phase 3 animations
  const f3 = frame - 1050;
  const p3Spring = spring({ frame: f3, fps, config: { damping: 14, stiffness: 100 } });
  const rejectStampScale = interpolate(f3, [20, 32], [2.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const acceptStampScale = interpolate(f3, [40, 52], [2.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ShortLayout
      shortKey="short03"
      categoryTitle="АРХИТЕКТУРА GEO: RAG И ВЕКТОРЫ"
      shortNumber="03 / 07"
      bgVideoSrc="b_roll_ai_data_search.mp4"
      voiceoverStartSec={177.5}
      durationFrames={1620}
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
              borderTop: "6px solid #8b5cf6",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(139, 92, 246, 0.14)",
                color: "#6d28d9",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              СМЕНА ПОИСКОВОЙ ЭПОХИ
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
              10 СИНИХ ССЫЛОК <br />
              <span style={{ color: "#7c3aed" }}>БОЛЬШЕ НЕ МОНОПОЛИЯ</span>
            </h1>
          </div>

          {/* Comparison Cards */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Old Google Search */}
            <div
              style={{
                background: "rgba(30, 41, 59, 0.92)",
                borderRadius: 22,
                padding: "24px 28px",
                border: "1px solid rgba(255,255,255,0.12)",
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
                🔍
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#cbd5e1" }}>
                  СТАРОЕ SEO: ВЫДАЧА ИЗ 10 ССЫЛОК
                </div>
                <div style={{ fontSize: 17, color: "#94a3b8", marginTop: 4 }}>
                  Борьба за ключевые слова. Пользователь кликает 10 вкладок сам.
                </div>
              </div>
            </div>

            {/* New AI Synthesis */}
            <div
              style={{
                background: "linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
                borderRadius: 22,
                padding: "24px 28px",
                border: "2px solid #8b5cf6",
                display: "flex",
                alignItems: "center",
                gap: 20,
                boxShadow: "0 10px 30px rgba(139, 92, 246, 0.25)",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: "#8b5cf6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 900,
                  color: "#ffffff",
                }}
              >
                ⚡
              </div>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: "#c4b5fd" }}>
                  НОВОЕ GEO: ГОТОВЫЙ СИНТЕЗ ОТВЕТА
                </div>
                <div style={{ fontSize: 17, color: "#e9d5ff", marginTop: 4 }}>
                  Нейросеть связывает факты из разных баз и даёт один результат со ссылками.
                </div>
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
              МЕХАНИКА QUERY FAN-OUT
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
              КАК ИИ ДЕЛИТ ОДИН ВОПРОС НА 4
            </h1>
          </div>

          {/* User Query Mockup */}
          <div
            style={{
              width: "100%",
              background: "rgba(15, 23, 42, 0.95)",
              borderRadius: 18,
              padding: "16px 22px",
              border: "1px solid rgba(255,255,255,0.14)",
              fontSize: 17,
              color: "#94a3b8",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxSizing: "border-box",
            }}
          >
            <span>💬</span>
            <span>
              Запрос: <strong style={{ color: "#ffffff" }}>«Купить кондо на Пхукете до 4 млн бат под аренду с высоким ROI»</strong>
            </span>
          </div>

          {/* 4 Fan-Out Branches (2x2 grid) */}
          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div
              style={{
                opacity: b1,
                transform: `scale(${interpolate(b1, [0, 1], [0.85, 1])})`,
                background: "rgba(30, 41, 59, 0.94)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 18,
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 900, color: "#38bdf8", textTransform: "uppercase" }}>
                1. ЦЕНЫ И БЮДЖЕТ
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc", marginTop: 4 }}>
                Кондо до 4 000 000 THB
              </div>
            </div>

            <div
              style={{
                opacity: b2,
                transform: `scale(${interpolate(b2, [0, 1], [0.85, 1])})`,
                background: "rgba(30, 41, 59, 0.94)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 18,
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 900, color: "#22c55e", textTransform: "uppercase" }}>
                2. ДОХОДНОСТЬ
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc", marginTop: 4 }}>
                Реальный ROI аренды 8%+
              </div>
            </div>

            <div
              style={{
                opacity: b3,
                transform: `scale(${interpolate(b3, [0, 1], [0.85, 1])})`,
                background: "rgba(30, 41, 59, 0.94)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 18,
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 900, color: "#f59e0b", textTransform: "uppercase" }}>
                3. ЛОКАЦИЯ
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc", marginTop: 4 }}>
                Камала / Банг Тао у моря
              </div>
            </div>

            <div
              style={{
                opacity: b4,
                transform: `scale(${interpolate(b4, [0, 1], [0.85, 1])})`,
                background: "rgba(30, 41, 59, 0.94)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                borderRadius: 18,
                padding: "18px 20px",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 900, color: "#ec4899", textTransform: "uppercase" }}>
                4. ПРАВО
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#f8fafc", marginTop: 4 }}>
                Freehold vs Leasehold квота
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
              ЧТО НА САМОМ ДЕЛЕ ВЫИГРЫВАЕТ В GEO
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
              ФАКТЫ И ЦЕНЫ ПРОТИВ SEO-СПАМА
            </h1>
          </div>

          {/* Rejected Spam Card */}
          <div
            style={{
              width: "100%",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1.5px solid rgba(239, 68, 68, 0.35)",
              borderRadius: 22,
              padding: "20px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#fca5a5" }}>
                ❌ Страница набитая словом «GEO»
              </div>
              <div style={{ fontSize: 16, color: "#fecaca", marginTop: 4 }}>
                Водянистый текст без цен, планировок и сроков.
              </div>
            </div>
            <div
              style={{
                transform: `scale(${rejectStampScale}) rotate(-6deg)`,
                border: "2px solid #ef4444",
                padding: "6px 12px",
                borderRadius: 8,
                color: "#ef4444",
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              ОТСЕЯНО RAG
            </div>
          </div>

          {/* Accepted Facts Card */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)",
              border: "2px solid #22c55e",
              borderRadius: 22,
              padding: "22px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
              boxShadow: "0 12px 30px rgba(34, 197, 94, 0.25)",
            }}
          >
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, color: "#86efac" }}>
                ✅ Структурированные факты
              </div>
              <div style={{ fontSize: 16, color: "#bbf7d0", marginTop: 4 }}>
                Точные цены, расстояние до моря, реальный ROI, условия договора.
              </div>
            </div>
            <div
              style={{
                transform: `scale(${acceptStampScale}) rotate(4deg)`,
                background: "#22c55e",
                padding: "8px 16px",
                borderRadius: 8,
                color: "#052e16",
                fontWeight: 900,
                fontSize: 15,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              В ОТВЕТ МОДЕЛИ
            </div>
          </div>
        </div>
      )}
    </ShortLayout>
  );
};
