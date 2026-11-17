import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TechGlossaryFootnote } from "./TechGlossaryFootnote";

export const BenCarRentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL & REAL WEBSITE SCREENSHOTS */}
      
      {/* 0 - 28s: Real Website Screenshot benphuketcarrent.com */}
      <Sequence from={0} durationInFrames={Math.round(28 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("site_bencar_cars.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.25,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame, [0, 28 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 28 - 38.5s: Real Home Page Screenshot for Metrics */}
      <Sequence from={Math.round(28 * fps)} durationInFrames={Math.round((38.5 - 28) * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("site_bencar_home.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.25,
              filter: "blur(4px)",
              transform: `scale(${interpolate(frame - 28 * fps, [0, 10.5 * fps], [1.0, 1.05], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 38.5 - 55.5s: High-tech Data Stream background for Telegram proof */}
      <Sequence from={Math.round(38.5 * fps)} durationInFrames={Math.round((55.5 - 38.5) * fps)} layout="none">
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
              opacity: 0.28,
              transform: `scale(${interpolate(frame - 38.5 * fps, [0, 17 * fps], [1.03, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 55.5s+: Phuket Road & Cars B-Roll */}
      <Sequence from={Math.round(55.5 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("b_roll_phuket_car.mp4")}
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

      <BackgroundGrid accentColor="#10b981" />

      {/* =========================================================================
          PHASE 1 (0 - 28s): ЧТО МЫ ПОСТРОИЛИ ДЛЯ КЛИЕНТА & ПУТЬ КЛИЕНТА (5:10)
          0 - 9.5s: Архитектура проекта и сайта
          9.5 - 28s: Интерактивная анимированная цепочка Customer Journey
          ========================================================================= */}
      {sec < 28 && (
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
          {sec < 9.5 ? (
            /* Phase 1A (0 - 9.5s): Project Architecture */
            <>
              <div
                style={{
                  padding: "8px 24px",
                  borderRadius: 30,
                  backgroundColor: "rgba(16, 185, 129, 0.2)",
                  border: "1.5px solid rgba(16, 185, 129, 0.5)",
                  color: "#34d399",
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 2,
                  marginBottom: 14,
                }}
              >
                КЛИЕНТСКИЙ КЕЙС 01 · АРЕНДА АВТО НА ПХУКЕТЕ
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
                BENPHUKETCARRENT.COM: ЖИВЫЕ ЗАЯВКИ ИЗ CHATGPT
              </h2>

              <div
                style={{
                  display: "flex",
                  gap: 32,
                  maxWidth: 1350,
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
                    padding: "32px 36px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#0369a1", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                    ЧТО МЫ ПОСТРОИЛИ ДЛЯ КЛИЕНТА
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>
                    Инженерная архитектура под поиск
                  </div>
                  <div style={{ fontSize: 20, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                    Страницы под каждую модель, прозрачные условия депозитов, страховка, локальные гиды и сквозная UTM-атрибуция.
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #059669",
                    borderRadius: 24,
                    padding: "32px 36px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#047857", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                    УВЕДОМЛЕНИЕ В БОТ КОМАНДЫ
                  </div>
                  <div style={{ fontSize: 30, fontWeight: 900, color: "#059669", marginBottom: 12 }}>
                    Источник: AI · ChatGPT
                  </div>
                  <div style={{ fontSize: 20, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                    Запрос мгновенно падает менеджерам с меткой <code style={{ color: "#0369a1", backgroundColor: "#e0f2fe", padding: "2px 6px", borderRadius: 6, fontWeight: 900 }}>utm_source=chatgpt.com</code> и прямой ссылкой на машину.
                  </div>
                </div>
              </div>

              {/* Below 2 cards: Full-Width Results Banner (Zero Dead Space) */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 1350,
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: "4px solid #10b981",
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
                      ИТОГ ВНЕДРЕНИЯ GEO: ПОЛНАЯ АТРИБУЦИЯ ОТ ПОИСКА ДО КАССЫ
                    </div>
                    <div style={{ fontSize: 15, color: "#334155", fontWeight: 600 }}>
                      Все 100% лидов приходят с готовыми вводными и закрываются менеджером в WhatsApp за 3 минуты.
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", color: "#047857", fontSize: 14, fontWeight: 900 }}>
                    🚗 100% занятость парка
                  </div>
                  <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#e0f2fe", border: "1px solid #bae6fd", color: "#0284c7", fontSize: 14, fontWeight: 900 }}>
                    0 ₽ на рекламу
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Phase 1B (9.5s - 28s / 5:10 in video): Animated Customer Journey Flowchart */
            <>
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
                ПУТЬ КЛИЕНТА В GEO · ОТ ПОИСКА ДО СДЕЛКИ
              </div>

              <h2
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.1,
                  margin: "0 0 24px",
                }}
              >
                КАК ТУРИСТ СТАНОВИТСЯ РЕАЛЬНЫМ КЛИЕНТОМ АВТОПАРКА
              </h2>

              {/* 4-Step Animated Customer Journey */}
              <div style={{ display: "flex", gap: 18, maxWidth: 1420, width: "100%", alignItems: "stretch" }}>
                {/* Step 1: Query in ChatGPT */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: sec < 13.5 ? "5px solid #0284c7" : "4px solid #cbd5e1",
                    borderRadius: 22,
                    padding: "20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: sec < 13.5 ? "0 20px 50px rgba(2, 132, 199, 0.4)" : "0 15px 35px rgba(0,0,0,0.5)",
                    transform: sec < 13.5 ? "scale(1.02)" : "scale(1.0)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#0284c7", fontWeight: 900, letterSpacing: 0.8 }}>ШАГ 1 · ВОПРОС</span>
                    <span style={{ fontSize: 20 }}>💬</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", marginBottom: 8 }}>
                    Запрос в ChatGPT
                  </div>
                  <div
                    style={{
                      backgroundColor: "#f1f5f9",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontSize: 14,
                      color: "#334155",
                      fontStyle: "italic",
                      marginBottom: 10,
                      border: "1px solid #e2e8f0",
                      lineHeight: 1.35,
                    }}
                  >
                    «Посоветуй надежную аренду авто на Пхукете без залога паспорта»
                  </div>
                  <div style={{ fontSize: 14, color: "#64748b", fontWeight: 600, marginTop: "auto" }}>
                    🎯 Горячий спрос с конкретными условиями
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "#94a3b8", fontWeight: 900 }}>➔</div>

                {/* Step 2: AI Quotes Website */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: sec >= 13.5 && sec < 18.0 ? "5px solid #8b5cf6" : "4px solid #cbd5e1",
                    borderRadius: 22,
                    padding: "20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: sec >= 13.5 && sec < 18.0 ? "0 20px 50px rgba(139, 92, 246, 0.4)" : "0 15px 35px rgba(0,0,0,0.5)",
                    transform: sec >= 13.5 && sec < 18.0 ? "scale(1.02)" : "scale(1.0)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#7c3aed", fontWeight: 900, letterSpacing: 0.8 }}>ШАГ 2 · ЦИТИРОВАНИЕ</span>
                    <span style={{ fontSize: 20 }}>🤖</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", marginBottom: 8 }}>
                    Ответ нейросети
                  </div>
                  <div
                    style={{
                      backgroundColor: "#f5f3ff",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontSize: 14,
                      color: "#5b21b6",
                      fontWeight: 700,
                      marginBottom: 10,
                      border: "1px solid #ddd6fe",
                      lineHeight: 1.35,
                    }}
                  >
                    «Рекомендую BenPhuketCarRent: прозрачные цены, депозит наличными, страховка 1-го класса»
                  </div>
                  <div style={{ fontSize: 14, color: "#64748b", fontWeight: 600, marginTop: "auto" }}>
                    ⭐ Модель цитирует сайт за точные факты
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "#94a3b8", fontWeight: 900 }}>➔</div>

                {/* Step 3: Transition to WhatsApp */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: sec >= 18.0 && sec < 22.5 ? "5px solid #059669" : "4px solid #cbd5e1",
                    borderRadius: 22,
                    padding: "20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: sec >= 18.0 && sec < 22.5 ? "0 20px 50px rgba(5, 150, 105, 0.4)" : "0 15px 35px rgba(0,0,0,0.5)",
                    transform: sec >= 18.0 && sec < 22.5 ? "scale(1.02)" : "scale(1.0)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#047857", fontWeight: 900, letterSpacing: 0.8 }}>ШАГ 3 · ПЕРЕХОД</span>
                    <span style={{ fontSize: 20 }}>📲</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", marginBottom: 8 }}>
                    Клик в WhatsApp
                  </div>
                  <div
                    style={{
                      backgroundColor: "#dcfce7",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontSize: 13,
                      color: "#065f46",
                      fontWeight: 800,
                      marginBottom: 10,
                      border: "1px solid #86efac",
                      lineHeight: 1.35,
                      fontFamily: "monospace",
                    }}
                  >
                    utm_source=chatgpt.com &car=toyota_yaris_ativ
                  </div>
                  <div style={{ fontSize: 14, color: "#64748b", fontWeight: 600, marginTop: "auto" }}>
                    🔗 Сквозная UTM-метка передана в диалог
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", fontSize: 24, color: "#94a3b8", fontWeight: 900 }}>➔</div>

                {/* Step 4: Instant Booking in Telegram Bot */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: sec >= 22.5 ? "5px solid #16a34a" : "4px solid #cbd5e1",
                    borderRadius: 22,
                    padding: "20px 20px",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: sec >= 22.5 ? "0 25px 60px rgba(22, 163, 74, 0.45)" : "0 15px 35px rgba(0,0,0,0.5)",
                    transform: sec >= 22.5 ? "scale(1.03)" : "scale(1.0)",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, color: "#15803d", fontWeight: 900, letterSpacing: 0.8 }}>ШАГ 4 · БРОНЬ</span>
                    <span style={{ fontSize: 20 }}>💰</span>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a", marginBottom: 8 }}>
                    Сделка за 3 минуты
                  </div>
                  <div
                    style={{
                      backgroundColor: "#ecfdf5",
                      borderRadius: 12,
                      padding: "10px 12px",
                      fontSize: 14,
                      color: "#166534",
                      fontWeight: 800,
                      marginBottom: 10,
                      border: "1px solid #bbf7d0",
                      lineHeight: 1.35,
                    }}
                  >
                    Бот фиксирует дату, модель и отель. Клиент вносит залог.
                  </div>
                  <div style={{ fontSize: 14, color: "#16a34a", fontWeight: 900, marginTop: "auto" }}>
                    ✓ 100% реальный результат в кассе
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* =========================================================================
          PHASE 2 (28 - 38.5s): 38 WHATSAPP + 6 DIRECT BOOKINGS
          Диктор: «За два месяца бот зафиксировал для клиента 38 переходов в WhatsApp
          с меткой chat GPT и еще шесть прямых запросов на бронирование...»
          ========================================================================= */}
      {sec >= 28 && sec < 38.5 && (
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
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1.5px solid rgba(16, 185, 129, 0.5)",
              color: "#34d399",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ФАКТИЧЕСКИЕ ДАННЫЕ ЗА 2 МЕСЯЦА
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
            ТОЧНЫЕ СЛЕДЫ ИЗ НЕЙРОСЕТИ В СИСТЕМЕ
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1350, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #059669",
                borderRadius: 24,
                padding: "24px 32px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 16, color: "#047857", fontWeight: 900, marginBottom: 4, letterSpacing: 1 }}>
                ПЕРЕХОДЫ В WHATSAPP
              </div>
              <div style={{ fontSize: 96, fontWeight: 900, color: "#059669", letterSpacing: -2, lineHeight: 1.0, margin: "4px 0" }}>
                {Math.round(interpolate(frame - 28 * fps, [0, 20], [0, 38], { extrapolateRight: "clamp" }))}
              </div>
              <div style={{ fontSize: 22, color: "#0f172a", fontWeight: 900, marginBottom: 4 }}>
                Клиенты с меткой ChatGPT
              </div>
              <div style={{ fontSize: 16, color: "#475569", fontWeight: 600 }}>
                Прямой переход с сайта в мессенджер к отделу бронирования
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #0284c7",
                borderRadius: 24,
                padding: "24px 32px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 16, color: "#0369a1", fontWeight: 900, marginBottom: 4, letterSpacing: 1 }}>
                ПРЯМЫЕ ЗАПРОСЫ НА БРОНЬ
              </div>
              <div style={{ fontSize: 96, fontWeight: 900, color: "#0284c7", letterSpacing: -2, lineHeight: 1.0, margin: "4px 0" }}>
                {Math.round(interpolate(frame - 28 * fps, [4, 24], [0, 6], { extrapolateRight: "clamp" }))}
              </div>
              <div style={{ fontSize: 22, color: "#0f172a", fontWeight: 900, marginBottom: 4 }}>
                Оформленные заявки на авто
              </div>
              <div style={{ fontSize: 16, color: "#475569", fontWeight: 600 }}>
                С конкретными датами, моделью машины и локацией доставки
              </div>
            </div>
          </div>

          {/* Below 2 metric cards: Full-Width Conversion Impact Dashboard (Zero Dead Space) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1350,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #10b981",
              borderRadius: 22,
              padding: "20px 32px",
              marginTop: 20,
              boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>📊</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: "#0f172a", letterSpacing: 0.5 }}>
                  БИЗНЕС-РЕЗУЛЬТАТ ЗА 60 ДНЕЙ РАБОТЫ GEO-СИСТЕМЫ
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
                ✓ СВЕРХВЫСОКИЙ ROI ПРИ 0 ₽ ЗАТРАТ НА КЛИКИ
              </div>
            </div>

            <div style={{ display: "flex", gap: 18, marginTop: 2 }}>
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
                <span style={{ fontSize: 26 }}>💰</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#0f172a" }}>44 обращения в WhatsApp</div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Прямые запросы на бронь автопарка</div>
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
                <span style={{ fontSize: 26 }}>🎯</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#0f172a" }}>Горячий интент</div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Клиент уже выбрал даты и модель в ИИ</div>
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
                <span style={{ fontSize: 26 }}>⚡</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 900, color: "#0f172a" }}>0 ₽ бюджета рекламы</div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>Органика поисковых нейросетей</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 3 (38.5 - 55.5s): REAL TELEGRAM BOT SCREENSHOT WITH SPOTLIGHT ZOOM
          Диктор: «Посмотрите на экран, даты, машины и источник! Это не абстрактная
          видимость в ответах нейросети. Люди доходят до выбора конкретной машины...»
          ========================================================================= */}
      {sec >= 38.5 && sec < 55.5 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 70px 105px",
            gap: 40,
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          {/* Left Column: Proof Badges & Explanation */}
          <div
            style={{
              flex: 1.1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                alignSelf: "flex-start",
                padding: "8px 20px",
                borderRadius: 30,
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                border: "1.5px solid rgba(16, 185, 129, 0.6)",
                color: "#34d399",
                fontSize: 16,
                fontWeight: 900,
                letterSpacing: 1.5,
                marginBottom: 16,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 10px #10b981" }} />
              ЖИВОЙ БОТ КОМАНДЫ · @BENCARPHUKET_BOT
            </div>

            <h2
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#f8fafc",
                lineHeight: 1.12,
                margin: "0 0 24px",
              }}
            >
              ДАТЫ, МАШИНЫ И ИСТОЧНИК: <br />
              <span style={{ color: "#10b981" }}>AI: CHATGPT</span>
            </h2>

            {/* 3 Callout Evidence Cards (Editorial Dossier) */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderLeft: "4px solid #0284c7",
                  borderRadius: 18,
                  padding: "16px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 28 }}>🤖</div>
                <div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 900, letterSpacing: 0.8 }}>ПАРАМЕТР ИСТОЧНИКА</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0369a1" }}>
                    Source: AI: ChatGPT (utm chatgpt.com)
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderLeft: "4px solid #059669",
                  borderRadius: 18,
                  padding: "16px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 28 }}>🚗</div>
                <div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 900, letterSpacing: 0.8 }}>ВЫБРАННЫЙ АВТОМОБИЛЬ И ПРАЙС</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#047857" }}>
                    Toyota Yaris Ativ 2023 · ฿1,000/сутки
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderLeft: "4px solid #7c3aed",
                  borderRadius: 18,
                  padding: "16px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                }}
              >
                <div style={{ fontSize: 28 }}>📱</div>
                <div>
                  <div style={{ fontSize: 13, color: "#64748b", fontWeight: 900, letterSpacing: 0.8 }}>КЛИЕНТ И УСТРОЙСТВО</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>
                    Язык: EN · Устройство: iPhone · 16 ноября
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real Telegram Bot Screenshot with Spotlight Punch-in Zoom */}
          <div
            style={{
              flex: 0.9,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: 580,
                height: 540,
                backgroundColor: "#0b141a",
                border: "2.5px solid #10b981",
                borderRadius: 26,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 0 50px rgba(16, 185, 129, 0.35), 0 25px 60px rgba(0,0,0,0.8)",
              }}
            >
              {/* Telegram Top Bar Simulation */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 48,
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 20px",
                  zIndex: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 18 }}>🤖</span>
                  <span style={{ fontSize: 16, fontWeight: 800, color: "#f8fafc" }}>bencarphuket_bot</span>
                  <span style={{ fontSize: 13, color: "#94a3b8" }}>бот команды</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ef4444" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#22c55e" }} />
                </div>
              </div>

              {/* Real Telegram Image with Dynamic Camera Zoom onto Message Content */}
              <div
                style={{
                  position: "absolute",
                  top: 48,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  overflow: "hidden",
                }}
              >
                <Img
                  src={staticFile("bencar_telegram_bot_lead.jpg")}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    transformOrigin: "35% 58%",
                    transform: `scale(${interpolate(frame - 38.5 * fps, [0, 17 * fps], [1.02, 1.36], { extrapolateRight: "clamp" })})`,
                  }}
                />
              </div>

              {/* Bottom Glow Indicator */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "rgba(16, 185, 129, 0.9)",
                  color: "#ffffff",
                  fontSize: 13,
                  fontWeight: 900,
                  letterSpacing: 1,
                  padding: "4px 14px",
                  borderRadius: 14,
                  zIndex: 20,
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.6)",
                }}
              >
                РЕАЛЬНЫЙ ЛОГ ЗАЯВКИ ИЗ CHATGPT
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 4 (55.5s+ / 5:57 in video): ВЕСЬ АВТОПАРК КЛИЕНТА СДАН
          Диктор: «А теперь главный результат для бизнеса: весь автопарк клиента
          сдан и занят на недели вперед. Новые запросы приходится передавать
          дружественным агентствам...»
          ========================================================================= */}
      {sec >= 55.5 && (
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
            БИЗНЕС-РЕЗУЛЬТАТ · 100% ЗАПОЛНЯЕМОСТЬ
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
            ВЕСЬ АВТОПАРК КЛИЕНТА СДАН НА НЕДЕЛИ ВПЕРЁД
          </h2>

          {/* 2-Column High-Density Editorial Dossier Dashboard */}
          <div style={{ display: "flex", gap: 32, maxWidth: 1400, width: "100%", flex: 1, maxHeight: 520 }}>
            {/* Left Column: Fleet Occupancy & Breakdown */}
            <div
              style={{
                flex: 1.15,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "5px solid #059669",
                borderRadius: 24,
                padding: "26px 32px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 16, color: "#047857", fontWeight: 900, letterSpacing: 1 }}>
                  СЕТКА БРОНЕЙ АВТОПАРКА
                </span>
                <span style={{ fontSize: 13, color: "#065f46", fontWeight: 900, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", padding: "4px 12px", borderRadius: 12 }}>
                  ● 0 СВОБОДНЫХ МАШИН
                </span>
              </div>

              {/* Big Occupancy Meter */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, margin: "4px 0 12px" }}>
                <div style={{ fontSize: 88, fontWeight: 900, color: "#059669", letterSpacing: -3, lineHeight: 0.95 }}>
                  {Math.round(interpolate(frame - 55.5 * fps, [0, 20], [80, 100], { extrapolateRight: "clamp" }))}%
                </div>
                <div>
                  <div style={{ fontSize: 22, color: "#0f172a", fontWeight: 900 }}>
                    Загрузка парка на недели вперёд
                  </div>
                  <div style={{ fontSize: 15, color: "#64748b", fontWeight: 600 }}>
                    Все 26 автомобилей сданы реальным туристам
                  </div>
                </div>
              </div>

              {/* Fleet Models Breakdown List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", padding: "10px 16px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>🚗</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>Toyota Yaris Ativ (12 авто)</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#059669", backgroundColor: "#dcfce7", padding: "3px 10px", borderRadius: 8 }}>
                    100% ЗАНЯТО
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", padding: "10px 16px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>🚙</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>Toyota Fortuner 4x4 (6 авто)</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#059669", backgroundColor: "#dcfce7", padding: "3px 10px", borderRadius: 8 }}>
                    100% ЗАНЯТО
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "#ffffff", padding: "10px 16px", borderRadius: 12, border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>🚘</span>
                    <span style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>Honda City Hatchback (8 авто)</span>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 900, color: "#059669", backgroundColor: "#dcfce7", padding: "3px 10px", borderRadius: 8 }}>
                    100% ЗАНЯТО
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Demand Overflow & Partner Monetization */}
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 16, color: "#d97706", fontWeight: 900, letterSpacing: 1 }}>
                  МОНЕТИЗАЦИЯ ПЕРЕЛИВА СПРОСА
                </span>
                <span style={{ fontSize: 13, color: "#92400e", fontWeight: 900, backgroundColor: "#fef3c7", border: "1px solid #fde68a", padding: "4px 12px", borderRadius: 12 }}>
                  +15-20% КОМИССИЯ
                </span>
              </div>

              <div style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", marginBottom: 12, lineHeight: 1.25 }}>
                Свои машины закончились — новые заявки передаются партнёрам
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 16, color: "#334155", fontWeight: 600 }}>
                  <span style={{ color: "#d97706", fontWeight: 900, fontSize: 18 }}>✓</span>
                  <span><strong>Непрерывный поток обращений:</strong> отдел бронирования загружен работой на полную мощность.</span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 16, color: "#334155", fontWeight: 600 }}>
                  <span style={{ color: "#d97706", fontWeight: 900, fontSize: 18 }}>✓</span>
                  <span><strong>Суб-аренда без простоя:</strong> избыточные лиды передаются надежным дружественным сервисам за комиссию.</span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 16, color: "#334155", fontWeight: 600 }}>
                  <span style={{ color: "#d97706", fontWeight: 900, fontSize: 18 }}>✓</span>
                  <span><strong>Чистая монетизация:</strong> бизнес зарабатывает даже тогда, когда собственный гараж полон на 100%.</span>
                </div>
              </div>

              {/* Contrast Bottom Badge */}
              <div
                style={{
                  marginTop: 14,
                  backgroundColor: "#fffbeb",
                  border: "1px solid #fde68a",
                  borderRadius: 14,
                  padding: "12px 16px",
                  fontSize: 16,
                  color: "#92400e",
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                ➔ Разница между «нас просканировал бот» и забитой сеткой броней
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DYNAMIC TECH GLOSSARY FOOTNOTE (TIMED TO VOICE-OVER)
          ========================================================================= */}
      {sec < 28 && (
        <TechGlossaryFootnote
          term="High-Intent Query"
          englishTitle="Целевой запрос с условиями"
          russianExplanation="Запрос с точными критериями («без залога паспорта», «со страховкой»). Модель цитирует сайт, где эти условия прописаны открыто и честно."
          accentColor="#10b981"
        />
      )}

      {sec >= 28 && sec < 55.5 && (
        <TechGlossaryFootnote
          term="Direct WhatsApp Lead"
          englishTitle="Прямая конверсия в мессенджер"
          russianExplanation="Переход из ответа ChatGPT сразу в диалог WhatsApp. Клиент уже прогрет и готов вносить предоплату без долгого блуждания по сайту."
          accentColor="#22c55e"
        />
      )}

      {sec >= 55.5 && (
        <TechGlossaryFootnote
          term="Fleet Occupancy"
          englishTitle="Заполняемость автопарка"
          russianExplanation="Полная загрузка коммерческого парка целевыми клиентами из поиска без затрат на платную контекстную рекламу."
          accentColor="#facc15"
        />
      )}
    </div>
  );
};
