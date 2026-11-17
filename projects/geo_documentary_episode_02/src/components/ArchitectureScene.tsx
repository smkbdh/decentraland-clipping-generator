import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TechGlossaryFootnote } from "./TechGlossaryFootnote";

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL & SCREENCAST */}
      
      {/* 0 - 32s: Cyber Neon AI Data Search Stream */}
      <Sequence from={0} durationInFrames={Math.round(32 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("b_roll_ai_data_search.mp4")}
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
              transform: `scale(${interpolate(frame, [0, 32 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 32 - 75s: AI Data Search flow */}
      <Sequence from={Math.round(32 * fps)} durationInFrames={Math.round(43 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("16_act4_geo_ai_search.mp4")}
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
              transform: `scale(${interpolate(frame - 32 * fps, [0, 43 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 75s+: Real Google Search Central Screenshot */}
      <Sequence from={Math.round(75 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("site_google_ai_features.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame - 75 * fps, [0, 45 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#8b5cf6" />

      {/* =========================================================================
          SUB-PHASE 1 (0 - 32s): 10 СИНИХ ССЫЛОК VS СИНТЕЗ ОТВЕТА С ИСТОЧНИКАМИ
          ========================================================================= */}
      {sec < 32 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "90px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(139, 92, 246, 0.2)",
              border: "1.5px solid rgba(139, 92, 246, 0.5)",
              color: "#c084fc",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ЭВОЛЮЦИЯ ПОИСКОВОГО ИНТЕРФЕЙСА
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 32px",
            }}
          >
            10 СИНИХ ССЫЛОК VS СИНТЕТИЧЕСКИЙ ОТВЕТ С ИСТОЧНИКАМИ
          </h2>

          {/* Interactive UI Mockups: Classic Google vs ChatGPT Search */}
          <div style={{ display: "flex", gap: 32, maxWidth: 1400, width: "100%", flex: 1, maxHeight: 530 }}>
            {/* Left: Classic Google (Authentic Light Search UI) */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderRadius: 24,
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                opacity: sec > 18 ? 0.65 : 1.0,
                transform: sec > 18 ? "scale(0.98)" : "scale(1.0)",
                transition: "all 0.4s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontSize: 17, color: "#475569", fontWeight: 900, letterSpacing: 1 }}>
                  КЛАССИЧЕСКИЙ ПОИСК GOOGLE (SEO)
                </span>
                <span style={{ fontSize: 13, color: "#b91c1c", fontWeight: 800, backgroundColor: "#fee2e2", border: "1px solid #fecaca", padding: "4px 12px", borderRadius: 12 }}>
                  10 СИНИХ ССЫЛОК
                </span>
              </div>

              {/* Authentic Google Search Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: "#f1f3f4",
                  border: "1px solid #dfe1e5",
                  borderRadius: 24,
                  padding: "10px 18px",
                  marginBottom: 20,
                  fontSize: 17,
                  color: "#202124",
                }}
              >
                <span style={{ fontSize: 18 }}>🔍</span>
                <span style={{ color: "#202124", fontWeight: 600 }}>аренда авто пхукет без депозита</span>
              </div>

              {/* 3 Blue Search Result Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 10 }}>
                  <div style={{ fontSize: 13, color: "#4d5156" }}>phuket-cars-rental.com › rent</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1a0dab", textDecoration: "underline", margin: "2px 0 4px" }}>
                    Аренда авто на Пхукете 2026 — Низкие цены, бронь онлайн
                  </div>
                  <div style={{ fontSize: 15, color: "#4d5156", lineHeight: 1.35 }}>
                    Лучшие автомобили от эконом до премиум класса на острове Пхукет...
                  </div>
                </div>

                <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: 10 }}>
                  <div style={{ fontSize: 13, color: "#4d5156" }}>thai-drive-phuket.ru › cars</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1a0dab", textDecoration: "underline", margin: "2px 0 4px" }}>
                    Прокат машин Пхукет без залога паспорта — Доставка в аэропорт
                  </div>
                  <div style={{ fontSize: 15, color: "#4d5156", lineHeight: 1.35 }}>
                    Автомобили в аренду по выгодной стоимости. Страховка первого класса...
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 13, color: "#4d5156" }}>rent-a-car-patong.com › fleet</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#1a0dab", textDecoration: "underline", margin: "2px 0 4px" }}>
                    Аренда машин на Пхукете отзывы туристов, цены на месяц...
                  </div>
                  <div style={{ fontSize: 15, color: "#4d5156", lineHeight: 1.35 }}>
                    Сравнение цен в прокатах Карона, Патонга и Банг Тао...
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "auto",
                  padding: "8px 14px",
                  borderRadius: 12,
                  backgroundColor: "#fef2f2",
                  border: "1px solid #fecaca",
                  fontSize: 15,
                  color: "#b91c1c",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                ⚠️ Пользователь открывает 10 вкладок и вручную фильтрует воду
              </div>
            </div>

            {/* Right: Modern ChatGPT Search / GEO (Obsidian Pro Glass) */}
            <div
              style={{
                flex: 1.15,
                background: "linear-gradient(180deg, rgba(24, 27, 34, 0.96) 0%, rgba(12, 14, 18, 0.98) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderTop: "1.5px solid rgba(192, 132, 252, 0.6)",
                borderRadius: 24,
                padding: "26px 32px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 25px 60px rgba(0,0,0,0.75), 0 0 35px rgba(139, 92, 246, 0.25)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <span style={{ fontSize: 18, color: "#c084fc", fontWeight: 900, letterSpacing: 1 }}>
                  ГЕНЕРАТИВНЫЙ AI-ОТВЕТ (GEO)
                </span>
                <span style={{ fontSize: 13, color: "#34d399", fontWeight: 900, backgroundColor: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", padding: "4px 12px", borderRadius: 12 }}>
                  ПРЯМОЕ ЦИТИРОВАНИЕ
                </span>
              </div>

              {/* Chat Input Prompt */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  backgroundColor: "rgba(0, 0, 0, 0.4)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: 14,
                  padding: "10px 18px",
                  marginBottom: 20,
                  fontSize: 18,
                  color: "#f8fafc",
                }}
              >
                <span>💬</span>
                <span style={{ fontWeight: 600 }}>
                  «Найди аренду авто на Пхукете с полной страховкой и без залога паспорта»
                </span>
              </div>

              {/* Synthetic Answer Box */}
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 18,
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  flex: 1,
                }}
              >
                <div style={{ fontSize: 21, color: "#f8fafc", lineHeight: 1.45, fontWeight: 600 }}>
                  На Пхукете под эти условия подходит компания{" "}
                  <span style={{ color: "#22c55e", fontWeight: 800 }}>BenCarRent</span>{" "}
                  <span style={{ backgroundColor: "rgba(34,197,94,0.25)", color: "#86efac", fontSize: 13, padding: "2px 7px", borderRadius: 6, fontWeight: 900 }}>
                    [1]
                  </span>
                  :
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 18, color: "#cbd5e1" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#22c55e" }}>✓</span>
                    <span>Депозит всего 3 000 THB (паспорт в залог не требуется)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#22c55e" }}>✓</span>
                    <span>Полная страховка первого класса (First Class Insurance)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#22c55e" }}>✓</span>
                    <span>Бесплатная доставка авто прямо к терминалу аэропорта</span>
                  </div>
                </div>

                {/* Clickable Citations / Sources */}
                <div style={{ marginTop: "auto", display: "flex", gap: 14, alignItems: "center", paddingTop: 10 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(34, 197, 94, 0.2)",
                      border: "1px solid rgba(34, 197, 94, 0.5)",
                      borderRadius: 10,
                      padding: "6px 14px",
                      fontSize: 15,
                      color: "#86efac",
                      fontWeight: 800,
                    }}
                  >
                    <span>🔗 [1] bencarrent.com/pricing</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      backgroundColor: "rgba(56, 189, 248, 0.2)",
                      border: "1px solid rgba(56, 189, 248, 0.5)",
                      borderRadius: 10,
                      padding: "6px 14px",
                      fontSize: 15,
                      color: "#7dd3fc",
                      fontWeight: 800,
                    }}
                  >
                    <span>💬 [2] Прямой WhatsApp контакт</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 12, fontSize: 16, color: "#34d399", fontWeight: 800, textAlign: "center" }}>
                ✨ Нейросеть даёт готовое решение и перенаправляет в мессенджер
              </div>
            </div>
          </div>

          {/* Below 2 cards: Paradigm Shift Telemetry Strip (Zero Dead Space) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1400,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #8b5cf6",
              borderRadius: 22,
              padding: "18px 30px",
              marginTop: 22,
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
                  ПАРАДИГМА GEO: ОТ ИНДЕКСАЦИИ ССЫЛОК К СИНТЕЗУ ОТВЕТОВ
                </div>
                <div style={{ fontSize: 15, color: "#334155", fontWeight: 600 }}>
                  В Google побеждал тот, кто набил больше ссылок. В GEO побеждает тот, чьи факты и цены модель может процитировать без сомнений.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", fontSize: 14, fontWeight: 900 }}>
                🌐 Google = 10 ссылок
              </div>
              <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#f3e8ff", border: "1px solid #d8b4fe", color: "#7c3aed", fontSize: 14, fontWeight: 900 }}>
                🤖 ChatGPT = 1 точный ответ
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-PHASE 2 (32 - 75s): QUERY FAN-OUT & RAG КОНТЕКСТНАЯ ФИЛЬТРАЦИЯ
          ========================================================================= */}
      {sec >= 32 && sec < 75 && (
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
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1.5px solid rgba(56, 189, 248, 0.5)",
              color: "#38bdf8",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            МЕХАНИКА RAG & QUERY FAN-OUT
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
            КАК НЕЙРОСЕТЬ ДЕЛИТ ВОПРОС И ОТСЕИВАЕТ СПАМ
          </h2>

          {/* User Root Query Box (Editorial Dossier) */}
          <div
            style={{
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderRadius: 20,
              padding: "16px 36px",
              display: "flex",
              alignItems: "center",
              gap: 16,
              boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
              marginBottom: 18,
            }}
          >
            <span style={{ fontSize: 26 }}>💬</span>
            <span style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>
              Запрос пользователя: <span style={{ color: "#0284c7", fontWeight: 900 }}>«Купить кондо на Пхукете до 4 млн бат под аренду с высоким ROI»</span>
            </span>
          </div>

          {/* Fan-Out Branches (4 Rays) */}
          <div style={{ display: "flex", gap: 18, width: "100%", maxWidth: 1400, marginBottom: 20 }}>
            {[
              { title: "ЦЕНЫ И БЮДЖЕТ", desc: "Кондо до 4 000 000 THB", color: "#0284c7", icon: "💰" },
              { title: "ДОХОДНОСТЬ", desc: "Реальный ROI аренды 8%+", color: "#059669", icon: "📈" },
              { title: "ЛОКАЦИЯ", desc: "Камала / Банг Тао у моря", color: "#d97706", icon: "📍" },
              { title: "ПРАВО", desc: "Freehold vs Leasehold квоты", color: "#7c3aed", icon: "📄" },
            ].map((branch, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: `4px solid ${branch.color}`,
                  borderRadius: 20,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
                  transform: `scale(${interpolate(frame - (32 * fps + i * 4), [0, 8], [0.92, 1.0], { extrapolateRight: "clamp" })})`,
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 4 }}>{branch.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: branch.color, letterSpacing: 1 }}>
                  ПОДЗАПРОС #{i + 1}
                </div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                  {branch.title}
                </div>
                <div style={{ fontSize: 16, color: "#475569", fontWeight: 700, marginTop: 2 }}>
                  {branch.desc}
                </div>
              </div>
            ))}
          </div>

          {/* RAG Context Filter (Rejection vs Acceptance) */}
          <div style={{ display: "flex", gap: 28, width: "100%", maxWidth: 1400 }}>
            {/* Rejected SEO Spam (Editorial Audit Card) */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(254, 242, 242, 0.98)",
                border: "1.5px solid #fecaca",
                borderRadius: 22,
                padding: "22px 28px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 36, color: "#dc2626" }}>❌</div>
              <div>
                <div style={{ fontSize: 19, fontWeight: 900, color: "#991b1b" }}>
                  ОТКЛОНЕНО RAG-ФИЛЬТРОМ: SEO-СПАМ
                </div>
                <div style={{ fontSize: 16, color: "#475569", fontWeight: 600, lineHeight: 1.35, marginTop: 4 }}>
                  Страницы с повторами «купить кондо пхукет недорого гео». Нет цен, нет условий, вода.
                </div>
              </div>
            </div>

            {/* Accepted Clean RAG Document (Obsidian Pro Glass / High-tech) */}
            <div
              style={{
                flex: 1.2,
                background: "linear-gradient(180deg, rgba(24, 27, 34, 0.98) 0%, rgba(12, 14, 18, 0.98) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderTop: "2px solid #22c55e",
                borderRadius: 22,
                padding: "22px 28px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                boxShadow: "0 20px 50px rgba(0,0,0,0.7), 0 0 30px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 36, color: "#22c55e" }}>⚡</div>
              <div>
                <div style={{ fontSize: 19, fontWeight: 900, color: "#4ade80" }}>
                  ПРИНЯТО В КОНТЕКСТ МОДЕЛИ: ТОЧНЫЕ ФАКТЫ
                </div>
                <div style={{ fontSize: 16, color: "#e2e8f0", fontWeight: 600, lineHeight: 1.35, marginTop: 4 }}>
                  Объект Oceana Kamala: 3.49M THB, 350м до пляжа, 9.2% ROI, планировка и условия аренды.
                </div>
              </div>
            </div>
          </div>

          {/* Below RAG Filter: Full-Width Result Strip (Zero Dead Space) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1400,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #0284c7",
              borderRadius: 20,
              padding: "18px 30px",
              marginTop: 18,
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
                  ПРИНЦИП ОТБОРА RAG: 90% ВОДЫ ОТСЕИВАЕТСЯ ДО ГЕНЕРАЦИИ ОТВЕТА
                </div>
                <div style={{ fontSize: 15, color: "#334155", fontWeight: 600 }}>
                  Поисковый ИИ цитирует сайт, только если находит конкретные цифры цен, планировок и условий.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#fee2e2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: 14, fontWeight: 900 }}>
                ❌ 0 фактов ➔ Игнор
              </div>
              <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", color: "#15803d", fontSize: 14, fontWeight: 900 }}>
                ✅ Цифры и цены ➔ Цитата [1]
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SUB-PHASE 3 (75s+): GOOGLE STANDARD & REAL ROBOTS.TXT VERIFICATION
          ========================================================================= */}
      {sec >= 75 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "90px 70px 110px",
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
            ОФИЦИАЛЬНАЯ ПОЗИЦИЯ GOOGLE & OPENAI
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 32px",
            }}
          >
            СПЕЦИАЛЬНЫХ GEO-ТЕГОВ НЕ СУЩЕСТВУЕТ
          </h2>

          <div
            style={{
              display: "flex",
              gap: 32,
              maxWidth: 1380,
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #0284c7",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>🤖</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>
                ТЕХНИЧЕСКИЙ ДОСТУП
              </div>
              <div style={{ fontSize: 18, color: "#334155", fontWeight: 600, lineHeight: 1.45 }}>
                Чистый <code style={{ color: "#0369a1", backgroundColor: "#e0f2fe", padding: "3px 8px", borderRadius: 6, fontWeight: 800 }}>robots.txt</code>, разрешенный доступ для <code style={{ color: "#0369a1", fontWeight: 800 }}>OAI-SearchBot</code> и <code style={{ color: "#0369a1", fontWeight: 800 }}>Google-Extended</code>.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #7c3aed",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>📑</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>
                СТРУКТУРА ДАННЫХ
              </div>
              <div style={{ fontSize: 18, color: "#334155", fontWeight: 600, lineHeight: 1.45 }}>
                Семантическая разметка Schema.org (<code style={{ color: "#6d28d9", backgroundColor: "#ede9fe", padding: "3px 8px", borderRadius: 6, fontWeight: 800 }}>Product</code>, <code style={{ color: "#6d28d9", backgroundColor: "#ede9fe", padding: "3px 8px", borderRadius: 6, fontWeight: 800 }}>FAQPage</code>), понятная иерархия H1-H3.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #059669",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 10 }}>💎</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>
                ПОЛЬЗА ДЛЯ ЛЮДЕЙ
              </div>
              <div style={{ fontSize: 18, color: "#334155", fontWeight: 600, lineHeight: 1.45 }}>
                Прозрачные цены без звездочек, реальные фотографии, регламенты аренды и честный FAQ.
              </div>
            </div>
          </div>

          {/* Below 3 cards: Full-Width Architectural Telemetry Card (Zero Dead Space) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1380,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #059669",
              borderRadius: 22,
              padding: "20px 32px",
              marginTop: 22,
              boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", letterSpacing: 0.5 }}>
                  ЗОЛОТОЕ ПРАВИЛО GEO ДЛЯ БИЗНЕСА
                </span>
              </div>
              <div
                style={{
                  padding: "4px 14px",
                  borderRadius: 10,
                  backgroundColor: "#dcfce7",
                  border: "1px solid #86efac",
                  color: "#059669",
                  fontSize: 13,
                  fontWeight: 900,
                }}
              >
                ✓ ПОДТВЕРЖДЕНО GOOGLE & OPENAI
              </div>
            </div>

            <div style={{ fontSize: 16, color: "#334155", fontWeight: 700, lineHeight: 1.4 }}>
              То, что удобно и понятно живому человеку — идеально считывается поисковыми нейросетями:
            </div>

            <div style={{ display: "flex", gap: 18 }}>
              <div
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24, color: "#059669" }}>✓</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#0f172a" }}>Прозрачные цены</div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Без скрытых сборов и звездочек</div>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24, color: "#0284c7" }}>✓</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#0f172a" }}>Реальные фото</div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Подтверждение подлинности бизнеса</div>
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 14,
                  padding: "12px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 24, color: "#7c3aed" }}>✓</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#0f172a" }}>Прямой контакт</div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Ссылка на WhatsApp / CRM-чат</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DYNAMIC TECH GLOSSARY FOOTNOTE (TIMED TO VOICE-OVER)
          ========================================================================= */}
      {sec < 32 && (
        <TechGlossaryFootnote
          term="GEO"
          englishTitle="Generative Engine Optimization"
          russianExplanation="Оптимизация контента сайта под прямое цитирование в ответах нейросетей (ChatGPT, Perplexity, Claude), а не под позиции в поисковой строке Google."
          accentColor="#c084fc"
        />
      )}

      {sec >= 32 && sec < 52 && (
        <TechGlossaryFootnote
          term="Query Fan-Out"
          englishTitle="Веер поисковых запросов"
          russianExplanation="Механизм, при котором поисковый ИИ автоматически делит один сложный вопрос пользователя на 3–5 точных подзапросов по разным базам данных."
          accentColor="#38bdf8"
        />
      )}

      {sec >= 52 && sec < 75 && (
        <TechGlossaryFootnote
          term="RAG"
          englishTitle="Retrieval-Augmented Generation"
          russianExplanation="Архитектура «Поиск + Генерация»: перед ответом нейросеть сначала находит свежие фрагменты страниц с ценами и фактами и загружает их в свой контекст."
          accentColor="#22c55e"
        />
      )}

      {sec >= 75 && (
        <TechGlossaryFootnote
          term="OAI-SearchBot"
          englishTitle="Поисковый краулер OpenAI"
          russianExplanation="Официальный поисковый робот ChatGPT. Если он заблокирован в вашем robots.txt, сайт никогда не появится в ответах ChatGPT Search."
          accentColor="#38bdf8"
        />
      )}
    </div>
  );
};
