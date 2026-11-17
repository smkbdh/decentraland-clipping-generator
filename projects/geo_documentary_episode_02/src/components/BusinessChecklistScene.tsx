import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TechGlossaryFootnote } from "./TechGlossaryFootnote";

export const BusinessChecklistScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  const currentAccent =
    sec < 29.1
      ? "#06b6d4"
      : sec < 58.6
      ? "#a855f7"
      : sec < 87.0
      ? "#f59e0b"
      : sec < 110.0
      ? "#22c55e"
      : "#a3e635";

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* BACKGROUND B-ROLL DYNAMIC SEQUENCES */}

      {/* 0 - 29.1s (Rule 1): Real Estate City & Modern Skyscraper Architecture */}
      <Sequence from={0} durationInFrames={Math.round(29.1 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("14_act3_real_estate_city.mp4")}
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
              transform: `scale(${interpolate(frame, [0, 29.1 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 29.1s - 58.6s (Rule 2): Microchips, GPU Compute & Technical Infrastructure */}
      <Sequence from={Math.round(29.1 * fps)} durationInFrames={Math.round((58.6 - 29.1) * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("07_act1_microchip_gpu.mp4")}
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
              transform: `scale(${interpolate(frame - 29.1 * fps, [0, 29.5 * fps], [1.05, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 58.6s - 87.0s (Rule 3): Corporate Office Sales CRM & Analytics Team */}
      <Sequence from={Math.round(58.6 * fps)} durationInFrames={Math.round((87.0 - 58.6) * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("13_act3_sales_crm_office.mp4")}
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
              transform: `scale(${interpolate(frame - 58.6 * fps, [0, 28.4 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 87.0s - 110.0s (Rule 4): Customer Support & Call Center Instant Response */}
      <Sequence from={Math.round(87.0 * fps)} durationInFrames={Math.round((110.0 - 87.0) * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("12_act3_call_center_support.mp4")}
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
              transform: `scale(${interpolate(frame - 87.0 * fps, [0, 23.0 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 110.0s+ (Synthesis): Counting Cash Money, Profit & Revenue */}
      <Sequence from={Math.round(110.0 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("18_money_counting.mp4")}
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
              transform: `scale(${interpolate(frame - 110.0 * fps, [0, 30.0 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor={currentAccent} />

      {/* =========================================================================
          PHASE 1 (0 - 29.1s): RULE 1 CONTENT UNDER REAL QUESTIONS
          ========================================================================= */}
      {sec < 29.1 && (
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
              backgroundColor: "rgba(6, 182, 212, 0.2)",
              border: "1.5px solid rgba(6, 182, 212, 0.5)",
              color: "#22d3ee",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ШАГ 01 ИЗ 04 · ФУНДАМЕНТ
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
            КОНТЕНТ ПОД РЕАЛЬНЫЕ ВОПРОСЫ КЛИЕНТОВ
          </h2>

          {/* Interactive Comparison: Real Facts Checklist (GEO) vs SEO Boilerplate Spam */}
          <div style={{ display: "flex", gap: 32, maxWidth: 1400, width: "100%", flex: 1, maxHeight: 520 }}>
            {/* Left: Authentic Product Checklist (Editorial Dossier) */}
            <div
              style={{
                flex: 1.15,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #0284c7",
                borderRadius: 24,
                padding: "26px 32px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 17, color: "#0369a1", fontWeight: 900, letterSpacing: 1 }}>
                  1. ТОЧНЫЕ ФАКТЫ И УСЛОВИЯ (GEO-СТАНДАРТ)
                </span>
                <span style={{ fontSize: 13, color: "#059669", fontWeight: 900, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: 12 }}>
                  ⚡ RAG-СОВМЕСТИМОСТЬ
                </span>
              </div>

              <div style={{ fontSize: 20, color: "#0f172a", fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>
                Нейросеть цитирует страницы, где есть исчерпывающие ответы на вопросы человека:
              </div>

              {/* Checklist Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#ffffff", padding: "12px 18px", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 20, color: "#059669", fontWeight: 900 }}>✓</span>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#0f172a" }}>ЦЕНА БЕЗ ЗВЕЗДОЧЕК: </span>
                    <span style={{ fontSize: 16, color: "#334155", fontWeight: 600 }}>от 1 000 ฿/день, скидка от 7 дней, прозрачный расчет.</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#ffffff", padding: "12px 18px", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 20, color: "#059669", fontWeight: 900 }}>✓</span>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#0f172a" }}>УСЛОВИЯ ЗАЛОГА: </span>
                    <span style={{ fontSize: 16, color: "#334155", fontWeight: 600 }}>наличные баты, рубли или USDT без блокировки зарубежных карт.</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#ffffff", padding: "12px 18px", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 20, color: "#059669", fontWeight: 900 }}>✓</span>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#0f172a" }}>ДОСТАВКА И ВОЗВРАТ: </span>
                    <span style={{ fontSize: 16, color: "#334155", fontWeight: 600 }}>бесплатно прямо к терминалу аэропорта Пхукета (HKT).</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, backgroundColor: "#ffffff", padding: "12px 18px", borderRadius: 14, border: "1px solid #e2e8f0" }}>
                  <span style={{ fontSize: 20, color: "#059669", fontWeight: 900 }}>✓</span>
                  <div>
                    <span style={{ fontSize: 16, fontWeight: 900, color: "#0f172a" }}>СТРАХОВКА: </span>
                    <span style={{ fontSize: 16, color: "#334155", fontWeight: 600 }}>полная страховка 1-го класса включена во все договоры.</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 15, color: "#059669", fontWeight: 800, textAlign: "center" }}>
                ✨ 100% попадание в контекстное окно ChatGPT и Perplexity
              </div>
            </div>

            {/* Right: Crossed-Out Boilerplate SEO Card */}
            <div
              style={{
                flex: 0.95,
                backgroundColor: "rgba(254, 242, 242, 0.98)",
                border: "1.5px solid #fecaca",
                borderRadius: 24,
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 17, color: "#991b1b", fontWeight: 900, letterSpacing: 1 }}>
                  УСТАРЕВШИЙ SEO-СПАМ
                </span>
                <span style={{ fontSize: 13, color: "#b91c1c", fontWeight: 900, backgroundColor: "#fee2e2", border: "1px solid #fecaca", padding: "4px 12px", borderRadius: 12 }}>
                  ❌ 0 ТОЧНЫХ ФАКТОВ
                </span>
              </div>

              <div style={{ fontSize: 19, color: "#7f1d1d", fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>
                Шаблонные тексты, которые RAG-фильтр сразу выбрасывает в корзину:
              </div>

              {/* Water text simulation */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  border: "1px dashed #fca5a5",
                  borderRadius: 16,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  fontSize: 15,
                  color: "#64748b",
                  lineHeight: 1.45,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ textDecoration: "line-through", opacity: 0.75 }}>
                  «Мы ведущая динамично развивающаяся компания с многолетним опытом...»
                </div>
                <div style={{ textDecoration: "line-through", opacity: 0.75 }}>
                  «Предлагаем лучшие индивидуальные решения под ключ по самым привлекательным ценам...»
                </div>
                <div style={{ textDecoration: "line-through", opacity: 0.75 }}>
                  «Аренда авто Пхукет недорого отзывы заказать онлайн в Таиланде...»
                </div>

                {/* Big Stamp */}
                <div
                  style={{
                    position: "absolute",
                    top: "42%",
                    left: "22%",
                    transform: "rotate(-12deg)",
                    border: "3px solid #dc2626",
                    color: "#dc2626",
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: 2,
                    padding: "6px 20px",
                    borderRadius: 10,
                    backgroundColor: "rgba(254, 226, 226, 0.95)",
                    boxShadow: "0 4px 15px rgba(220, 38, 38, 0.3)",
                  }}
                >
                  ОТСЕЯНО RAG
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 15, color: "#b91c1c", fontWeight: 800, textAlign: "center" }}>
                ⚠️ Пользователь закрывает вкладку, ИИ не находит сущностей
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 2 (29.1s - 58.6s): RULE 2 TECHNICAL ACCESSIBILITY (ROBOTS.TXT MOCKUP)
          ========================================================================= */}
      {sec >= 29.1 && sec < 58.6 && (
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
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              border: "1.5px solid rgba(168, 85, 247, 0.5)",
              color: "#c084fc",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ШАГ 02 ИЗ 04 · ТЕХНИЧЕСКИЙ БАЗИС
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
            ТЕХНИЧЕСКАЯ ДОСТУПНОСТЬ ДЛЯ КРАУЛЕРОВ
          </h2>

          <div style={{ display: "flex", gap: 32, maxWidth: 1400, width: "100%", flex: 1, maxHeight: 520 }}>
            {/* Left: Obsidian Pro Glass Terminal Mockup for robots.txt */}
            <div
              style={{
                flex: 1.15,
                background: "linear-gradient(180deg, rgba(24, 27, 34, 0.98) 0%, rgba(12, 14, 18, 0.98) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderTop: "1.5px solid rgba(168, 85, 247, 0.6)",
                borderRadius: 24,
                padding: "24px 28px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 25px 60px rgba(0,0,0,0.75), 0 0 35px rgba(168, 85, 247, 0.25)",
              }}
            >
              {/* Terminal Title Bar with Traffic Lights */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#ef4444" }} />
                  <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#eab308" }} />
                  <div style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: "#22c55e" }} />
                  <span style={{ fontSize: 13, color: "#94a3b8", fontFamily: "monospace", marginLeft: 8 }}>
                    server:~/etc/nginx $ cat robots.txt
                  </span>
                </div>
                <span style={{ fontSize: 12, color: "#4ade80", fontWeight: 800, backgroundColor: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)", padding: "3px 10px", borderRadius: 8 }}>
                  ● 200 OK · ДОСТУП ОТКРЫТ
                </span>
              </div>

              {/* Code Snippet Box */}
              <div
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  fontFamily: "monospace",
                  fontSize: 16,
                  color: "#e2e8f0",
                  lineHeight: 1.55,
                  marginBottom: 14,
                  flex: 1,
                }}
              >
                <div><span style={{ color: "#64748b" }}># Поисковый бот ChatGPT Search:</span></div>
                <div><span style={{ color: "#38bdf8" }}>User-agent:</span> <span style={{ color: "#facc15", fontWeight: 700 }}>OAI-SearchBot</span></div>
                <div><span style={{ color: "#4ade80", fontWeight: 700 }}>Allow:</span> /</div>
                <div style={{ marginTop: 6 }}><span style={{ color: "#64748b" }}># AI Overviews от Google:</span></div>
                <div><span style={{ color: "#38bdf8" }}>User-agent:</span> <span style={{ color: "#facc15", fontWeight: 700 }}>Google-Extended</span></div>
                <div><span style={{ color: "#4ade80", fontWeight: 700 }}>Allow:</span> /</div>
                <div style={{ marginTop: 6 }}><span style={{ color: "#64748b" }}># Поисковый краулер Perplexity:</span></div>
                <div><span style={{ color: "#38bdf8" }}>User-agent:</span> <span style={{ color: "#facc15", fontWeight: 700 }}>PerplexityBot</span></div>
                <div><span style={{ color: "#4ade80", fontWeight: 700 }}>Allow:</span> /</div>
              </div>

              <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.35, fontWeight: 600 }}>
                💡 Если бот заблокирован в robots.txt или закрыт Cloudflare JS-челленджем — сайт никогда не появится в ответах ИИ.
              </div>
            </div>

            {/* Right: The LLMS.TXT Myth (Editorial Dossier Card) */}
            <div
              style={{
                flex: 0.95,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "5px solid #d97706",
                borderRadius: 24,
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 16, color: "#d97706", fontWeight: 900, letterSpacing: 1 }}>
                  МИФ О «ВОЛШЕБНОМ» LLMS.TXT
                </span>
                <span style={{ fontSize: 13, color: "#92400e", fontWeight: 900, backgroundColor: "#fef3c7", border: "1px solid #fde68a", padding: "4px 12px", borderRadius: 12 }}>
                  0% ВЛИЯНИЯ НА РАНЖИРОВАНИЕ
                </span>
              </div>

              <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 12, lineHeight: 1.2 }}>
                Файл не заменит продукт, цены и реальный сайт
              </div>

              <div style={{ fontSize: 19, color: "#334155", lineHeight: 1.45, marginBottom: 14, fontWeight: 600 }}>
                Ни Google, ни OpenAI не дают приоритетных позиций за наличие <code style={{ color: "#b45309", backgroundColor: "#fef3c7", padding: "2px 8px", borderRadius: 6, fontWeight: 800 }}>llms.txt</code>. Это шпаргалка, но не волшебная кнопка продаж.
              </div>

              {/* Animated Visual Comparison Diagram: Real Crawler vs llms.txt */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div style={{ backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>🤖</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#0f172a" }}>OAI-SearchBot (Реальная индексация)</div>
                    <div style={{ fontSize: 14, color: "#059669", fontWeight: 700 }}>Сканирует HTML, цены, Schema.org и реальный контент сайта</div>
                  </div>
                </div>

                <div style={{ backgroundColor: "#fffbeb", padding: "12px 16px", borderRadius: 14, border: "1px solid #fde68a", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>📄</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: "#92400e" }}>llms.txt (Экспериментальная сводка)</div>
                    <div style={{ fontSize: 14, color: "#b45309", fontWeight: 700 }}>Игнорируется, если на сайте нет доверия и структурированных данных</div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 12,
                  backgroundColor: "#fef3c7",
                  border: "1px solid #fde68a",
                  borderRadius: 14,
                  padding: "12px 18px",
                  fontSize: 15,
                  color: "#92400e",
                  fontWeight: 800,
                  lineHeight: 1.35,
                  textAlign: "center",
                }}
              >
                ⚠️ Модель рекомендует вас за понятные условия и честные цены, а не за текстовый файл в корне сервера.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 3 (58.6s - 87.0s): RULE 3 END-TO-END FUNNEL TRACKING
          ========================================================================= */}
      {sec >= 58.6 && sec < 87.0 && (
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
              color: "#fbbf24",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ШАГ 03 ИЗ 04 · АНАЛИТИКА
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
            ИЗМЕРЯЙТЕ ВСЮ ЦЕПОЧКУ ДО СДЕЛКИ
          </h2>

          {/* Interactive 4-Stage UTM Attribution Pipeline Flowchart */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1400, width: "100%", flex: 1, maxHeight: 520 }}>
            {/* The 4-Node Pipeline */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, width: "100%" }}>
              {/* Node 1: AI Search */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: "4px solid #8b5cf6",
                  borderRadius: 20,
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 6 }}>🤖</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#7c3aed", letterSpacing: 1 }}>
                  ШАГ 1 · AI-ПОИСК
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                  ChatGPT Search
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontWeight: 600 }}>
                  Клик по сноске-источнику
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#6d28d9", backgroundColor: "#ede9fe", padding: "3px 8px", borderRadius: 8, fontWeight: 800 }}>
                  Пользователь готов купить
                </div>
              </div>

              {/* Arrow 1 */}
              <div style={{ fontSize: 24, color: "#f59e0b", fontWeight: 900 }}>➔</div>

              {/* Node 2: Website & UTM */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: "4px solid #0284c7",
                  borderRadius: 20,
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 6 }}>🌐</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#0284c7", letterSpacing: 1 }}>
                  ШАГ 2 · САЙТ
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                  UTM-Метка входа
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontWeight: 600 }}>
                  <code style={{ color: "#0369a1", fontWeight: 800 }}>utm_source=chatgpt.com</code>
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#0369a1", backgroundColor: "#e0f2fe", padding: "3px 8px", borderRadius: 8, fontWeight: 800 }}>
                  Сессия сохранена в cookie
                </div>
              </div>

              {/* Arrow 2 */}
              <div style={{ fontSize: 24, color: "#f59e0b", fontWeight: 900 }}>➔</div>

              {/* Node 3: WhatsApp Webhook */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: "4px solid #059669",
                  borderRadius: 20,
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 6 }}>💬</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#059669", letterSpacing: 1 }}>
                  ШАГ 3 · МЕССЕНДЖЕР
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                  WhatsApp / Telegram
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontWeight: 600 }}>
                  Бот шлет тег #web-toyota
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#059669", backgroundColor: "#dcfce7", padding: "3px 8px", borderRadius: 8, fontWeight: 800 }}>
                  Мгновенный контакт
                </div>
              </div>

              {/* Arrow 3 */}
              <div style={{ fontSize: 24, color: "#f59e0b", fontWeight: 900 }}>➔</div>

              {/* Node 4: CRM Deal */}
              <div
                style={{
                  flex: 1,
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: "4px solid #16a34a",
                  borderRadius: 20,
                  padding: "20px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 30, marginBottom: 6 }}>💰</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: "#16a34a", letterSpacing: 1 }}>
                  ШАГ 4 · ВЫРУЧКА
                </div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                  Сделка в CRM
                </div>
                <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontWeight: 600 }}>
                  Оплаченная бронь / контракт
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#15803d", backgroundColor: "#bbf7d0", padding: "3px 8px", borderRadius: 8, fontWeight: 900 }}>
                  ● ДЕНЬГИ В КАССЕ
                </div>
              </div>
            </div>

            {/* Editorial Analytics Banner */}
            <div
              style={{
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderRadius: 20,
                padding: "20px 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 15px 35px rgba(0,0,0,0.4)",
              }}
            >
              <div>
                <div style={{ fontSize: 16, fontWeight: 900, color: "#d97706", letterSpacing: 1, marginBottom: 4 }}>
                  ЗОЛОТОЕ ПРАВИЛО GEO-АНАЛИТИКИ
                </div>
                <div style={{ fontSize: 18, color: "#0f172a", fontWeight: 800 }}>
                  Разделяйте технических ботов (обучение модели) и реальных покупателей с деньгами.
                </div>
              </div>
              <div
                style={{
                  backgroundColor: "#fef3c7",
                  border: "1px solid #fde68a",
                  padding: "10px 18px",
                  borderRadius: 14,
                  fontSize: 15,
                  color: "#92400e",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                }}
              >
                🎯 Считайте оплаты, а не хиты в логах
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 4 (87.0s - 110.0s): RULE 4 SPEED OF PROCESSING AFTER CLICK
          ========================================================================= */}
      {sec >= 87.0 && sec < 110.0 && (
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
              color: "#4ade80",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ШАГ 04 ИЗ 04 · ОБРАБОТКА
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
            УЛУЧШАЙТЕ ТО, ЧТО ПРОИСХОДИТ ПОСЛЕ КЛИКА
          </h2>

          {/* Interactive Visual Comparison: Speed-to-Lead Meter (< 15 min vs > 2 hours) */}
          <div style={{ display: "flex", gap: 32, maxWidth: 1400, width: "100%", flex: 1, maxHeight: 520 }}>
            {/* Left: Instant Response (< 15 min) */}
            <div
              style={{
                flex: 1.15,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #059669",
                borderRadius: 24,
                padding: "26px 32px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 16, color: "#059669", fontWeight: 900, letterSpacing: 1 }}>
                  ⚡ СКОРОСТЬ ОТВЕТА ДО 15 МИНУТ
                </span>
                <span style={{ fontSize: 13, color: "#047857", fontWeight: 900, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: 12 }}>
                  МАКСИМАЛЬНЫЙ ROI
                </span>
              </div>

              {/* Huge Metric */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, margin: "6px 0 14px" }}>
                <div style={{ fontSize: 88, fontWeight: 900, color: "#059669", letterSpacing: -3, lineHeight: 0.95 }}>
                  78%
                </div>
                <div style={{ fontSize: 20, color: "#0f172a", fontWeight: 800, lineHeight: 1.25 }}>
                  Конверсия в закрытую сделку и предоплату
                </div>
              </div>

              {/* Animated Action points with Staggered Slide-In */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {(() => {
                  const p1 = interpolate(frame - 87.5 * fps, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p1, transform: `translateX(${(1 - p1) * -20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#059669", fontWeight: 900, fontSize: 20 }}>✓</span>
                      <span style={{ fontSize: 18, color: "#0f172a", fontWeight: 700 }}><strong>Живой диалог в WhatsApp:</strong> клиент держит телефон в руках и ждет.</span>
                    </div>
                  );
                })()}

                {(() => {
                  const p2 = interpolate(frame - 88.3 * fps, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p2, transform: `translateX(${(1 - p2) * -20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#059669", fontWeight: 900, fontSize: 20 }}>✓</span>
                      <span style={{ fontSize: 18, color: "#0f172a", fontWeight: 700 }}><strong>Альтернатива наготове:</strong> если модель занята — сразу предложить 2 похожих.</span>
                    </div>
                  );
                })()}

                {(() => {
                  const p3 = interpolate(frame - 89.1 * fps, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p3, transform: `translateX(${(1 - p3) * -20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#059669", fontWeight: 900, fontSize: 20 }}>✓</span>
                      <span style={{ fontSize: 18, color: "#0f172a", fontWeight: 700 }}><strong>Мгновенная бронь:</strong> ссылка на залог без длинных опросников и анкет.</span>
                    </div>
                  );
                })()}
              </div>

              <div style={{ marginTop: 12, fontSize: 15, color: "#059669", fontWeight: 800, textAlign: "center" }}>
                ✨ Горячий трафик из нейросети сразу превращается в деньги
              </div>
            </div>

            {/* Right: Delayed Response (> 2 hours) */}
            <div
              style={{
                flex: 0.95,
                backgroundColor: "rgba(254, 242, 242, 0.98)",
                border: "1.5px solid #fecaca",
                borderTop: "4px solid #dc2626",
                borderRadius: 24,
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <span style={{ fontSize: 16, color: "#991b1b", fontWeight: 900, letterSpacing: 1 }}>
                  ⏳ ЗАДЕРЖКА БОЛЕЕ 2 ЧАСОВ
                </span>
                <span style={{ fontSize: 13, color: "#b91c1c", fontWeight: 900, backgroundColor: "#fee2e2", border: "1px solid #fecaca", padding: "4px 12px", borderRadius: 12 }}>
                  СЛИВ БЮДЖЕТА
                </span>
              </div>

              {/* Huge Metric */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, margin: "6px 0 14px" }}>
                <div style={{ fontSize: 88, fontWeight: 900, color: "#dc2626", letterSpacing: -3, lineHeight: 0.95 }}>
                  &lt; 8%
                </div>
                <div style={{ fontSize: 20, color: "#7f1d1d", fontWeight: 800, lineHeight: 1.25 }}>
                  Вероятность довести клиента до оплаты
                </div>
              </div>

              {/* Animated Negative points with Staggered Slide-In */}
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {(() => {
                  const p4 = interpolate(frame - 89.8 * fps, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p4, transform: `translateX(${(1 - p4) * 20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 20 }}>✗</span>
                      <span style={{ fontSize: 18, color: "#7f1d1d", fontWeight: 700 }}><strong>Клиент ушел:</strong> уже написал следующему контакту из списка ChatGPT.</span>
                    </div>
                  );
                })()}

                {(() => {
                  const p5 = interpolate(frame - 90.6 * fps, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p5, transform: `translateX(${(1 - p5) * 20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 20 }}>✗</span>
                      <span style={{ fontSize: 18, color: "#7f1d1d", fontWeight: 700 }}><strong>Потеря контекста:</strong> через 2 часа человек забыл, что именно искал.</span>
                    </div>
                  );
                })()}

                {(() => {
                  const p6 = interpolate(frame - 91.4 * fps, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p6, transform: `translateX(${(1 - p6) * 20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 20 }}>✗</span>
                      <span style={{ fontSize: 18, color: "#7f1d1d", fontWeight: 700 }}><strong>Обесценивание GEO:</strong> первое место в цитировании не спасает от лени.</span>
                    </div>
                  );
                })()}
              </div>

              <div style={{ marginTop: 12, fontSize: 15, color: "#b91c1c", fontWeight: 800, textAlign: "center" }}>
                ⚠️ Можно выиграть позицию в ИИ, но проиграть клиенту на звонке
              </div>
            </div>
          </div>

          {/* Below 2 cards: Speed Impact Telemetry Bar (Zero Dead Space) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1400,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #10b981",
              borderRadius: 22,
              padding: "18px 30px",
              marginTop: 20,
              boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 26 }}>⚡</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>
                  ПРАВИЛО 4: СКОРОСТЬ ОБРАБОТКИ ОПРЕДЕЛЯЕТ ВЫРУЧКУ БИЗНЕСА
                </div>
                <div style={{ fontSize: 15, color: "#334155", fontWeight: 600 }}>
                  Ответ за 15 минут увеличивает конверсию почти в 10 раз — нейросеть дает горячих клиентов, но закрывает их живой сервис.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", color: "#047857", fontSize: 14, fontWeight: 900 }}>
                🟢 15 мин = 78% оплаты
              </div>
              <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#fee2e2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: 14, fontWeight: 900 }}>
                🔴 2 часа = 8% оплаты
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 5 (110.0s+ / 10:41 in video): FINAL SYNTHESIS BEFORE OUTRO
          Диктор: «Не культ нового файла, а полезный сайт...»
          Интерактивное поочерёдное выкатывание тезисов (Staggered Animations)
          ========================================================================= */}
      {sec >= 110.0 && (
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
              backgroundColor: "rgba(163, 230, 53, 0.2)",
              border: "1.5px solid rgba(163, 230, 53, 0.5)",
              color: "#a3e635",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ИТОГ РАЗДЕЛА · СТРАТЕГИЯ 2026
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
            НЕ КУЛЬТ НОВОГО ФАЙЛА, А ПОЛЕЗНЫЙ САЙТ
          </h2>

          {/* Side-by-side Editorial Dossier Comparison Cards with Staggered Slide-In */}
          <div style={{ display: "flex", gap: 32, maxWidth: 1420, width: "100%", marginBottom: 18, flex: 1, maxHeight: 490 }}>
            {/* Left: What does NOT work */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(254, 242, 242, 0.98)",
                border: "1px solid rgba(254, 202, 202, 0.9)",
                borderTop: "5px solid #dc2626",
                borderRadius: 24,
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#991b1b", letterSpacing: 0.8 }}>
                  ❌ СУЕТА И ХАЙП (ЧТО НЕ РАБОТАЕТ)
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#b91c1c", backgroundColor: "#fee2e2", padding: "4px 10px", borderRadius: 8 }}>
                  СЛИВ РЕСУРСОВ
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {/* Item 1 */}
                {(() => {
                  const p1 = interpolate(frame - 110.2 * fps, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p1, transform: `translateX(${(1 - p1) * -20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 20 }}>✗</span>
                      <span style={{ fontSize: 19, color: "#7f1d1d", fontWeight: 700 }}>Паника и крики о «похоронах классического SEO»</span>
                    </div>
                  );
                })()}

                {/* Item 2 */}
                {(() => {
                  const p2 = interpolate(frame - 110.9 * fps, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p2, transform: `translateX(${(1 - p2) * -20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 20 }}>✗</span>
                      <span style={{ fontSize: 19, color: "#7f1d1d", fontWeight: 700 }}>Слепая вера в «волшебный» llms.txt без доработки сайта</span>
                    </div>
                  );
                })()}

                {/* Item 3 */}
                {(() => {
                  const p3 = interpolate(frame - 111.6 * fps, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p3, transform: `translateX(${(1 - p3) * -20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 20 }}>✗</span>
                      <span style={{ fontSize: 19, color: "#7f1d1d", fontWeight: 700 }}>Накрутка краулеров ботами ради пустых логов на сервере</span>
                    </div>
                  );
                })()}

                {/* Item 4 */}
                {(() => {
                  const p4 = interpolate(frame - 112.3 * fps, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p4, transform: `translateX(${(1 - p4) * -20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #fecaca", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#dc2626", fontWeight: 900, fontSize: 20 }}>✗</span>
                      <span style={{ fontSize: 19, color: "#7f1d1d", fontWeight: 700 }}>Игнорирование скорости ответа менеджера в мессенджере</span>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Right: The Winning GEO Strategy 2026 */}
            <div
              style={{
                flex: 1.15,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "5px solid #059669",
                borderRadius: 24,
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#047857", letterSpacing: 0.8 }}>
                  ✅ РАБОЧАЯ GEO-СТРАТЕГИЯ (ЧТО ДАЕТ ДЕНЬГИ)
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#065f46", backgroundColor: "#dcfce7", padding: "4px 10px", borderRadius: 8 }}>
                  РЕАЛЬНЫЙ ДОХОД
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {/* Item 1 */}
                {(() => {
                  const p1 = interpolate(frame - 113.2 * fps, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p1, transform: `translateX(${(1 - p1) * 20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#059669", fontWeight: 900, fontSize: 20 }}>✓</span>
                      <span style={{ fontSize: 19, color: "#0f172a", fontWeight: 700 }}>Сайт для людей: точные цены, условия, залог и страховка</span>
                    </div>
                  );
                })()}

                {/* Item 2 */}
                {(() => {
                  const p2 = interpolate(frame - 113.9 * fps, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p2, transform: `translateX(${(1 - p2) * 20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#059669", fontWeight: 900, fontSize: 20 }}>✓</span>
                      <span style={{ fontSize: 19, color: "#0f172a", fontWeight: 700 }}>Открытый robots.txt для OAI-SearchBot и Google-Extended</span>
                    </div>
                  );
                })()}

                {/* Item 3 */}
                {(() => {
                  const p3 = interpolate(frame - 114.6 * fps, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p3, transform: `translateX(${(1 - p3) * 20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#059669", fontWeight: 900, fontSize: 20 }}>✓</span>
                      <span style={{ fontSize: 19, color: "#0f172a", fontWeight: 700 }}>Сквозная UTM-аналитика до сделки в WhatsApp и CRM</span>
                    </div>
                  );
                })()}

                {/* Item 4 */}
                {(() => {
                  const p4 = interpolate(frame - 115.3 * fps, [0, 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
                  return (
                    <div style={{ opacity: p4, transform: `translateX(${(1 - p4) * 20}px)`, backgroundColor: "#ffffff", padding: "12px 16px", borderRadius: 14, border: "1px solid #bbf7d0", display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ color: "#059669", fontWeight: 900, fontSize: 20 }}>✓</span>
                      <span style={{ fontSize: 19, color: "#0f172a", fontWeight: 700 }}>Ответ менеджера за 5-15 минут с готовой альтернативой</span>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Bottom Summary Strip */}
          {(() => {
            const pSummary = interpolate(frame - 116.2 * fps, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                style={{
                  maxWidth: 1420,
                  width: "100%",
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderLeft: "6px solid #84cc16",
                  borderRadius: 20,
                  padding: "16px 36px",
                  textAlign: "center",
                  boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
                  opacity: pSummary,
                  transform: `scale(${0.97 + 0.03 * pSummary})`,
                }}
              >
                <span style={{ fontSize: 24, color: "#0f172a", fontWeight: 900 }}>
                  ➔ Считайте сделки и прибыль в кассе, а не пустых краулеров в серверных логах!
                </span>
              </div>
            );
          })()}
        </div>
      )}

      {/* =========================================================================
          DYNAMIC TECH GLOSSARY FOOTNOTE (TIMED TO VOICE-OVER)
          ========================================================================= */}
      {sec < 29.1 && (
        <TechGlossaryFootnote
          term="Schema.org"
          englishTitle="Семантическая микроразметка"
          russianExplanation="Специальный формат разметки данных в HTML (Product, FAQPage), позволяющий поисковым роботам безошибочно вытаскивать цены, скидки и условия."
          accentColor="#06b6d4"
        />
      )}

      {sec >= 29.1 && sec < 58.6 && (
        <TechGlossaryFootnote
          term="robots.txt vs llms.txt"
          englishTitle="Файлы инструкций для ботов"
          russianExplanation="robots.txt регулирует доступ краулеров к страницам сайта. llms.txt — полезная экспериментальная сводка для ИИ, но без гарантий попадания в выдачу."
          accentColor="#c084fc"
        />
      )}

      {sec >= 58.6 && sec < 87.0 && (
        <TechGlossaryFootnote
          term="UTM & Атрибуция"
          englishTitle="Отслеживание источников лидов"
          russianExplanation="Технология фиксации первого и последнего клика пользователя. Позволяет точно знать, пришел клиент из ChatGPT Search, Google или Telegram."
          accentColor="#fbbf24"
        />
      )}

      {sec >= 87.0 && (
        <TechGlossaryFootnote
          term="Response Time"
          englishTitle="Скорость реакции на лид"
          russianExplanation="Время первого ответа менеджеру в WhatsApp. Ответ в течение первых 5 минут увеличивает конверсию в оплаченную бронь почти в 4 раза."
          accentColor="#22c55e"
        />
      )}
    </div>
  );
};
