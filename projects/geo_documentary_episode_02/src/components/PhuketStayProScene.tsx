import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TechGlossaryFootnote } from "./TechGlossaryFootnote";

export const PhuketStayProScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND REAL ESTATE & VILLA FOOTAGE */}
      
      {/* 0 - 35.3s: Luxury Phuket Villa & Pool Video B-Roll */}
      <Sequence from={0} durationInFrames={Math.round(35.3 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("b_roll_phuket_villa.mp4")}
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
              transform: `scale(${interpolate(frame, [0, 35.3 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 58.3s+: Language Classroom B-Roll for Chatterbox */}
      <Sequence from={Math.round(58.3 * fps)} layout="none">
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

      <BackgroundGrid accentColor="#ec4899" />

      {/* PHASE 1 (0 - 35.3s): Live ChatGPT Lead Dario (4M THB) */}
      {sec < 35.3 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px 80px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(236, 72, 153, 0.2)",
              border: "1.5px solid rgba(236, 72, 153, 0.5)",
              color: "#f472b6",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            КЕЙС 02 · PHUKETSTAYPRO · СВЕЖИЙ ЛИД СЕГОДНЯ
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
            КЛИЕНТ ИЗ СИНГАПУРА С БЮДЖЕТОМ 4 МЛН БАТ (ИЗ CHATGPT)
          </h2>

          {/* Sub-phase 1 (0 - 14.0s): Telegram Lead Spotlight */}
          {sec < 14.0 ? (
            <div style={{ display: "flex", gap: 40, alignItems: "center", maxWidth: 1450, width: "100%", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "6px 16px",
                    borderRadius: 12,
                    backgroundColor: "rgba(56, 189, 248, 0.2)",
                    border: "1px solid rgba(56, 189, 248, 0.6)",
                    color: "#38bdf8",
                    fontSize: 16,
                    fontWeight: 900,
                    letterSpacing: 0.8,
                  }}
                >
                  ЖИВОЙ СКРИНШОТ БОТА КОМАНДЫ
                </div>
                <div
                  style={{
                    width: 540,
                    height: 540,
                    borderRadius: 24,
                    overflow: "hidden",
                    border: "2.5px solid rgba(56, 189, 248, 0.6)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(56, 189, 248, 0.25)",
                    position: "relative",
                    backgroundColor: "#0d1117",
                  }}
                >
                  <Img
                    src={staticFile("telegram_lead_dario_chatgpt_anonymized.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      backgroundColor: "#0d1117",
                      transform: `scale(${interpolate(frame, [0, 14 * fps], [1.0, 1.05], { extrapolateRight: "clamp" })})`,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 18, width: 560 }}>
                <div
                  style={{
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #db2777",
                    borderRadius: 20,
                    padding: "24px 28px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 14, color: "#be185d", fontWeight: 900, marginBottom: 4, letterSpacing: 1 }}>БЮДЖЕТ КЛИЕНТА</div>
                  <div style={{ fontSize: 38, fontWeight: 900, color: "#0f172a", letterSpacing: -0.5 }}>4 000 000 THB (~$115 000)</div>
                  <div style={{ fontSize: 18, color: "#334155", fontWeight: 600, marginTop: 4 }}>The Title ViVi Bang Tao (Freehold)</div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #059669",
                    borderRadius: 20,
                    padding: "24px 28px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 14, color: "#047857", fontWeight: 900, marginBottom: 4, letterSpacing: 1 }}>ТОЧНЫЙ ИСТОЧНИК И АТРИБУЦИЯ</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#059669" }}>ai_referral · chatgpt.com</div>
                  <div style={{ fontSize: 18, color: "#475569", fontWeight: 600, marginTop: 4 }}>Прямая рекомендация в ответе ChatGPT Search</div>
                </div>
              </div>
            </div>
          ) : (
            /* Sub-phase 2 (14.0s - 35.3s): WhatsApp Inspection with Camera Zoom onto Chat */
            <div style={{ display: "flex", gap: 36, alignItems: "center", maxWidth: 1550, width: "100%", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div
                  style={{
                    alignSelf: "flex-start",
                    padding: "6px 16px",
                    borderRadius: 12,
                    backgroundColor: "rgba(34, 197, 94, 0.2)",
                    border: "1px solid rgba(34, 197, 94, 0.6)",
                    color: "#22c55e",
                    fontSize: 16,
                    fontWeight: 900,
                    letterSpacing: 0.8,
                  }}
                >
                  РЕАЛЬНЫЙ ДИАЛОГ WHATSAPP (ДЕТАЛЬНО)
                </div>
                <div
                  style={{
                    width: 880,
                    height: 540,
                    borderRadius: 24,
                    overflow: "hidden",
                    border: "2.5px solid rgba(34, 197, 94, 0.6)",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(34, 197, 94, 0.3)",
                    position: "relative",
                    backgroundColor: "#0b141a",
                  }}
                >
                  <Img
                    src={staticFile("whatsapp_chat_dario_singapore_anonymized.jpg")}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      backgroundColor: "#0b141a",
                      transformOrigin: "50% 40%",
                      transform: `scale(${interpolate(frame - 14 * fps, [0, 3 * fps], [1.0, 1.28], { extrapolateRight: "clamp" })}) translate(${interpolate(frame - 14 * fps, [0, 3 * fps], [0, 30], { extrapolateRight: "clamp" })}px, ${interpolate(frame - 14 * fps, [0, 3 * fps], [0, -40], { extrapolateRight: "clamp" })}px)`,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 440 }}>
                <div
                  style={{
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #059669",
                    borderRadius: 20,
                    padding: "24px 26px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 14, color: "#047857", fontWeight: 900, marginBottom: 4, letterSpacing: 1 }}>РЕАКЦИЯ КОМАНДЫ</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: "#059669" }}>Диалог за 6 минут</div>
                  <div style={{ fontSize: 18, color: "#334155", fontWeight: 600, marginTop: 4 }}>PDF брошюра сразу отправлена клиенту</div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #0284c7",
                    borderRadius: 20,
                    padding: "24px 26px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 14, color: "#0369a1", fontWeight: 900, marginBottom: 4, letterSpacing: 1 }}>ВЫВОД ДЛЯ БИЗНЕСА</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a" }}>Сделки выигрывает скорость</div>
                  <div style={{ fontSize: 17, color: "#475569", fontWeight: 600, marginTop: 4 }}>Горячий лид из AI остывает за 15 минут без ответа менеджера</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* PHASE 2A (35.3s - 46.5s): Real Kamala Property Showcase - Shot 1 Panoramic View */}
      {sec >= 35.3 && sec < 46.5 && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 10 }}>
          <Img
            src={staticFile("oceana_kamala_view_01.jpg")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${interpolate(frame - 35.3 * fps, [0, 11.2 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })}) translate(${interpolate(frame - 35.3 * fps, [0, 11.2 * fps], [0, -12], { extrapolateRight: "clamp" })}px, 0)`,
            }}
          />
          {/* Subtle gradient vignette for lower-third legibility */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(7, 9, 14, 0.95) 0%, rgba(7, 9, 14, 0.35) 45%, transparent 75%)",
            }}
          />
          {/* Vox/Netflix Lower-Third Editorial Studio Card (Positioned safely above TechGlossaryFootnote dock) */}
          <div
            style={{
              position: "absolute",
              bottom: 130,
              left: 70,
              maxWidth: 1220,
              zIndex: 20,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #059669",
              borderRadius: 24,
              padding: "26px 36px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.75), 0 6px 18px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ display: "flex", gap: 14, marginBottom: 12, alignItems: "center" }}>
              <div
                style={{
                  padding: "6px 18px",
                  borderRadius: 20,
                  backgroundColor: "#dcfce7",
                  border: "1.5px solid #86efac",
                  color: "#059669",
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: 1,
                }}
              >
                📍 РЕАЛЬНЫЙ ОБЪЕКТ В УПРАВЛЕНИИ · КАМАЛА
              </div>
              <div
                style={{
                  padding: "6px 18px",
                  borderRadius: 20,
                  backgroundColor: "#eff6ff",
                  border: "1.5px solid #bfdbfe",
                  color: "#0284c7",
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                phuketstaypro.com/en/property/oceana-kamala-a76
              </div>
            </div>
            <h2 style={{ fontSize: 48, fontWeight: 900, color: "#0f172a", margin: "0 0 10px", lineHeight: 1.1 }}>
              OCEANA RESIDENCE KAMALA · A76
            </h2>
            <div style={{ fontSize: 22, color: "#334155", fontWeight: 700, lineHeight: 1.4 }}>
              Собственник нашел сайт в поиске и отдал квартиру в доверительное управление команде. <br />
              <span style={{ color: "#059669", fontWeight: 900 }}>➔ Реальный объект и прибыль, а не просто клики или краулеры в логах.</span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2B (46.5s - 58.3s): Real Kamala Property Showcase - Shot 2 Master Bedroom & Balcony */}
      {sec >= 46.5 && sec < 58.3 && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 10 }}>
          <Img
            src={staticFile("oceana_kamala_view_02.jpg")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${interpolate(frame - 46.5 * fps, [0, 11.8 * fps], [1.07, 1.0], { extrapolateRight: "clamp" })}) translate(${interpolate(frame - 46.5 * fps, [0, 11.8 * fps], [-10, 0], { extrapolateRight: "clamp" })}px, 0)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(7, 9, 14, 0.95) 0%, rgba(7, 9, 14, 0.35) 45%, transparent 75%)",
            }}
          />
          {/* Vox/Netflix Lower-Third Editorial Studio Card (Positioned safely above TechGlossaryFootnote dock) */}
          <div
            style={{
              position: "absolute",
              bottom: 130,
              left: 70,
              maxWidth: 1220,
              zIndex: 20,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #d97706",
              borderRadius: 24,
              padding: "26px 36px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.75), 0 6px 18px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{ display: "flex", gap: 14, marginBottom: 12, alignItems: "center" }}>
              <div
                style={{
                  padding: "6px 18px",
                  borderRadius: 20,
                  backgroundColor: "#fef3c7",
                  border: "1.5px solid #fde68a",
                  color: "#b45309",
                  fontSize: 16,
                  fontWeight: 900,
                  letterSpacing: 1,
                }}
              >
                💎 ДОГОВОР ДОВЕРИТЕЛЬНОГО УПРАВЛЕНИЯ
              </div>
            </div>
            <h2 style={{ fontSize: 48, fontWeight: 900, color: "#0f172a", margin: "0 0 10px", lineHeight: 1.1 }}>
              РЕЗУЛЬТАТ, КОТОРЫЙ ВАЖНЕЕ ЛЮБЫХ ГРАФИКОВ
            </h2>
            <div style={{ fontSize: 22, color: "#334155", fontWeight: 700, lineHeight: 1.4 }}>
              Это собственник, объект и новая работа для команды. <br />
              <span style={{ color: "#0284c7", fontWeight: 900 }}>➔ Сайты строятся не ради красивой SEO-таблички, а ради сделок, которые меняют бизнес.</span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2C (58.3s+): Chatterbox Case & Central Aggregator Walkthrough */}
      {sec >= 58.3 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px 80px",
            zIndex: 10,
          }}
        >
          {/* Sub-phase 2C-1 (58.3s - 64.5s): Live Website Walkthrough */}
          {sec < 64.5 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 1450,
                animation: "fadeIn 0.4s ease-out",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 16,
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
                  }}
                >
                  КЕЙС 03 · ЯЗЫКОВОЙ ЦЕНТР CHATTERBOX
                </div>
                <div
                  style={{
                    padding: "8px 22px",
                    borderRadius: 24,
                    backgroundColor: "rgba(248, 250, 252, 0.95)",
                    border: "1.5px solid rgba(5, 150, 105, 0.5)",
                    color: "#047857",
                    fontSize: 18,
                    fontWeight: 900,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  🌐 chatterboxschool.ru · ОФЛАЙН И ОНЛАЙН
                </div>
              </div>

              <h2
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.1,
                  margin: "0 0 24px",
                }}
              >
                ЦИФРОВАЯ СИСТЕМА ДЛЯ ПРИВЛЕЧЕНИЯ И ЗАПИСИ УЧЕНИКОВ
              </h2>

              {/* Browser Window Mockup with Dynamic Pan & Zoom */}
              <div
                style={{
                  width: 1320,
                  height: 580,
                  borderRadius: 24,
                  overflow: "hidden",
                  border: "2px solid rgba(56, 189, 248, 0.45)",
                  boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 35px rgba(56, 189, 248, 0.2)",
                  backgroundColor: "#0d1117",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Browser Tab Bar */}
                <div
                  style={{
                    height: 48,
                    backgroundColor: "#161b22",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 20px",
                    gap: 12,
                  }}
                >
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ef4444" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#22c55e" }} />
                  </div>
                  <div
                    style={{
                      flex: 1,
                      maxWidth: 600,
                      margin: "0 auto",
                      backgroundColor: "#0d1117",
                      borderRadius: 10,
                      padding: "6px 16px",
                      fontSize: 15,
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <span style={{ color: "#22c55e" }}>🔒</span>
                    <span style={{ color: "#e2e8f0", fontWeight: 700 }}>https://chatterboxschool.ru</span>
                  </div>
                </div>

                {/* Animated Viewport of the Site */}
                <div style={{ flex: 1, position: "relative", overflow: "hidden", backgroundColor: "#ffffff" }}>
                  <Img
                    src={staticFile("chatterbox_site.png")}
                    style={{
                      width: "100%",
                      height: "auto",
                      transform: `scale(${interpolate(frame - 58.3 * fps, [0, 6.2 * fps], [1.0, 1.05], { extrapolateRight: "clamp" })}) translateY(${interpolate(frame - 58.3 * fps, [0, 6.2 * fps], [0, -25], { extrapolateRight: "clamp" })}px)`,
                      transformOrigin: "top center",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sub-phase 2C-2 (64.5s - 71.0s): Traffic Aggregation Architecture (Before vs Now) */}
          {sec >= 64.5 && sec < 71.0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 1450,
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
                АРХИТЕКТУРА АГРЕГАЦИИ ТРАФИКА
              </div>

              <h2
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.1,
                  margin: "0 0 20px",
                }}
              >
                РАНЬШЕ ЛИДЫ ТЕРЯЛИСЬ В РАЗБРОС — СЕЙЧАС ВСЁ СТЕКАЕТСЯ НА САЙТ
              </h2>

              {/* Dynamic Aggregation Flow Diagram */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  maxWidth: 1380,
                  gap: 30,
                  marginTop: 10,
                }}
              >
                {/* 4 Inbound Sources (Left Stack) */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 440 }}>
                  <div
                    style={{
                      backgroundColor: "rgba(248, 250, 252, 0.98)",
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      borderLeft: "5px solid #22c55e",
                      borderRadius: 18,
                      padding: "16px 22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>📍 2ГИС Справочник</div>
                      <div style={{ fontSize: 15, color: "#475569", fontWeight: 600 }}>Рейтинг 5.0 · 59 проверенных отзывов</div>
                    </div>
                    <div style={{ fontSize: 26, color: "#22c55e", fontWeight: 900 }}>➔</div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(248, 250, 252, 0.98)",
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      borderLeft: "5px solid #f59e0b",
                      borderRadius: 18,
                      padding: "16px 22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>🗺️ Яндекс Карты & Поиск</div>
                      <div style={{ fontSize: 15, color: "#475569", fontWeight: 600 }}>Запросы: «школа английского рядом»</div>
                    </div>
                    <div style={{ fontSize: 26, color: "#f59e0b", fontWeight: 900 }}>➔</div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(248, 250, 252, 0.98)",
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      borderLeft: "5px solid #0284c7",
                      borderRadius: 18,
                      padding: "16px 22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>🔍 Google Органический Поиск</div>
                      <div style={{ fontSize: 15, color: "#475569", fontWeight: 600 }}>Программы, цены, отзывы родителей</div>
                    </div>
                    <div style={{ fontSize: 26, color: "#0284c7", fontWeight: 900 }}>➔</div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "rgba(248, 250, 252, 0.98)",
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      borderLeft: "5px solid #8b5cf6",
                      borderRadius: 18,
                      padding: "16px 22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#0f172a" }}>💬 VK Сообщество & Рекомендации</div>
                      <div style={{ fontSize: 15, color: "#475569", fontWeight: 600 }}>Фото с уроков и сарафанное радио</div>
                    </div>
                    <div style={{ fontSize: 26, color: "#8b5cf6", fontWeight: 900 }}>➔</div>
                  </div>
                </div>

                {/* Animated Convergence Core (Center Hub) */}
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "5px solid #059669",
                    borderRadius: 24,
                    padding: "36px 30px",
                    boxShadow: "0 25px 60px rgba(0,0,0,0.65), 0 0 40px rgba(5, 150, 105, 0.25)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      padding: "6px 18px",
                      borderRadius: 20,
                      backgroundColor: "#dcfce7",
                      border: "1px solid #bbf7d0",
                      color: "#047857",
                      fontSize: 15,
                      fontWeight: 900,
                      marginBottom: 12,
                    }}
                  >
                    ЕДИНЫЙ ЦЕНТР АГРЕГАЦИИ ЛИДОВ
                  </div>

                  <div style={{ fontSize: 44, fontWeight: 900, color: "#0f172a", marginBottom: 8, textAlign: "center" }}>
                    chatterboxschool.ru
                  </div>

                  <div style={{ fontSize: 22, color: "#475569", textAlign: "center", marginBottom: 24, fontWeight: 600 }}>
                    Все каналы сходятся в прозрачную посадочную воронку
                  </div>

                  {/* Immediate Action Buttons on Site */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 440 }}>
                    <div
                      style={{
                        backgroundColor: "#126861",
                        borderRadius: 14,
                        padding: "16px 24px",
                        color: "#ffffff",
                        fontSize: 22,
                        fontWeight: 900,
                        textAlign: "center",
                        boxShadow: "0 10px 25px rgba(18, 104, 97, 0.5)",
                      }}
                    >
                      🎯 Записаться на бесплатное тестирование
                    </div>
                    <div
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 14,
                        padding: "14px 24px",
                        color: "#f8fafc",
                        fontSize: 20,
                        fontWeight: 700,
                        textAlign: "center",
                      }}
                    >
                      📚 Пробный урок и подбор группы
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-phase 2C-3 (71.0s - 79.5s): Real Telegram Bot Lead Proof & 2GIS Attribution */}
          {sec >= 71.0 && sec < 79.5 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 1450,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    padding: "6px 20px",
                    borderRadius: 30,
                    backgroundColor: "rgba(34, 197, 94, 0.2)",
                    border: "1.5px solid rgba(34, 197, 94, 0.5)",
                    color: "#4ade80",
                    fontSize: 17,
                    fontWeight: 900,
                    letterSpacing: 1.5,
                  }}
                >
                  🟢 РЕАЛЬНЫЕ ЛИДЫ В TELEGRAM-БОТЕ
                </div>
                <div
                  style={{
                    padding: "6px 18px",
                    borderRadius: 20,
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    border: "1.5px solid rgba(245, 158, 11, 0.5)",
                    color: "#f59e0b",
                    fontSize: 16,
                    fontWeight: 800,
                  }}
                >
                  СКВОЗНАЯ АТРИБУЦИЯ: ЯНДЕКС & 2ГИС
                </div>
              </div>

              <h2
                style={{
                  fontSize: 50,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.1,
                  margin: "0 0 22px",
                }}
              >
                ПОДТВЕРЖДЕНИЕ В CRM: ЗАЯВКИ С ЯНДЕКСА И 2ГИС НА САЙТ
              </h2>

              <div style={{ display: "flex", gap: 32, width: "100%", maxWidth: 1400, alignItems: "stretch" }}>
                {/* Real Telegram Bot Screenshot Card */}
                <div
                  style={{
                    width: 560,
                    backgroundColor: "#17212b",
                    border: "2px solid #22c55e",
                    borderRadius: 22,
                    overflow: "hidden",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.85), 0 0 35px rgba(34, 197, 94, 0.3)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Telegram Chat Header */}
                  <div
                    style={{
                      height: 48,
                      backgroundColor: "#0e1621",
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0 18px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: "#2481cc",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 15,
                        }}
                      >
                        🤖
                      </div>
                      <div>
                        <div style={{ fontSize: 16, fontWeight: 800, color: "#ffffff", lineHeight: 1.1 }}>
                          Chatterbox03_bot
                        </div>
                        <div style={{ fontSize: 12, color: "#708499" }}>бот оповещений о лидах</div>
                      </div>
                    </div>
                    <div
                      style={{
                        padding: "3px 10px",
                        borderRadius: 12,
                        backgroundColor: "rgba(34, 197, 94, 0.15)",
                        border: "1px solid #22c55e",
                        color: "#4ade80",
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      LIVE CRM
                    </div>
                  </div>

                  {/* Screenshot Viewport with gentle animation */}
                  <div style={{ flex: 1, position: "relative", overflow: "hidden", backgroundColor: "#0e1621", maxHeight: 420 }}>
                    <Img
                      src={staticFile("chatterbox_telegram_bot_lead.png")}
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        transform: `scale(${interpolate(frame - 71.0 * fps, [0, 8.5 * fps], [1.0, 1.04], { extrapolateRight: "clamp" })}) translateY(${interpolate(frame - 71.0 * fps, [0, 8.5 * fps], [0, -15], { extrapolateRight: "clamp" })}px)`,
                        transformOrigin: "top center",
                      }}
                    />
                  </div>

                  {/* Highlights Bar at Bottom of Card */}
                  <div
                    style={{
                      padding: "14px 18px",
                      backgroundColor: "#0b111a",
                      borderTop: "1.5px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 15,
                        color: "#4ade80",
                        fontWeight: 800,
                        backgroundColor: "rgba(34, 197, 94, 0.12)",
                        border: "1px solid rgba(34, 197, 94, 0.35)",
                        padding: "6px 12px",
                        borderRadius: 10,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>🟢</span>
                      <span>Технический канал: <strong>Яндекс · органика</strong> (referrer: yandex.ru)</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        fontSize: 15,
                        color: "#fbbf24",
                        fontWeight: 800,
                        backgroundColor: "rgba(245, 158, 11, 0.12)",
                        border: "1px solid rgba(245, 158, 11, 0.35)",
                        padding: "6px 12px",
                        borderRadius: 10,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>🟡</span>
                      <span>Со слов клиента: <strong>2ГИС</strong> ➔ Посадочная: <strong>chatterboxschool.ru</strong></span>
                    </div>
                  </div>
                </div>

                {/* Right Stack: 2GIS Reviews & Conversion Funnel */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* 2GIS Proof Card */}
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(248, 250, 252, 0.98)",
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      borderTop: "5px solid #d97706",
                      borderRadius: 22,
                      padding: "22px 26px",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <div style={{ fontSize: 20, color: "#d97706", fontWeight: 900 }}>⭐ РЕЙТИНГ 5.0 В 2ГИС</div>
                      <div style={{ fontSize: 15, color: "#475569", fontWeight: 700 }}>59 проверенных отзывов</div>
                    </div>

                    <div
                      style={{
                        borderRadius: 14,
                        overflow: "hidden",
                        border: "1px solid #e2e8f0",
                        backgroundColor: "#f8fafc",
                        height: 140,
                        marginBottom: 10,
                      }}
                    >
                      <Img
                        src={staticFile("chatterbox_reviews.png")}
                        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 70%" }}
                      />
                    </div>

                    <div style={{ fontSize: 17, color: "#334155", lineHeight: 1.4, fontStyle: "italic", fontWeight: 600 }}>
                      «Отличная школа английского языка, дочка посещает второй год, удобное расписание, хорошие преподаватели!»
                    </div>
                  </div>

                  {/* 2-Step Funnel Card */}
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(248, 250, 252, 0.98)",
                      border: "1px solid rgba(226, 232, 240, 0.9)",
                      borderTop: "5px solid #0284c7",
                      borderRadius: 22,
                      padding: "22px 26px",
                      boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ fontSize: 20, color: "#0284c7", fontWeight: 900, marginBottom: 12 }}>
                      🎯 2-ШАГОВАЯ ВОРОНКА ЗАПИСИ
                    </div>

                    <div style={{ display: "flex", gap: 16 }}>
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "#f0f9ff",
                          borderLeft: "4px solid #0284c7",
                          padding: "12px 16px",
                          borderRadius: 10,
                          border: "1px solid #bae6fd",
                        }}
                      >
                        <div style={{ fontSize: 17, fontWeight: 900, color: "#0369a1" }}>1. ТЕСТИРОВАНИЕ</div>
                        <div style={{ fontSize: 14, color: "#334155", marginTop: 4, fontWeight: 600 }}>
                          Бесплатная проверка уровня и целей ученика
                        </div>
                      </div>

                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "#f0fdf4",
                          borderLeft: "4px solid #16a34a",
                          padding: "12px 16px",
                          borderRadius: 10,
                          border: "1px solid #bbf7d0",
                        }}
                      >
                        <div style={{ fontSize: 17, fontWeight: 900, color: "#15803d" }}>2. ПРОБНЫЙ УРОК</div>
                        <div style={{ fontSize: 14, color: "#334155", marginTop: 4, fontWeight: 600 }}>
                          Подбор группы (английский, китайский)
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        marginTop: 12,
                        padding: "10px 16px",
                        borderRadius: 12,
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        fontSize: 15,
                        color: "#475569",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      Понятный шаг устраняет трение при переходе с поиска и карт
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sub-phase 2C-4 (79.5s+): Strategic Conclusion & GEO Synergy */}
          {sec >= 79.5 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                maxWidth: 1350,
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
                  marginBottom: 16,
                }}
              >
                ГЛАВНЫЙ ВЫВОД КЛИЕНТСКИХ КЕЙСОВ
              </div>

              <h2
                style={{
                  fontSize: 60,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.1,
                  margin: "0 0 32px",
                }}
              >
                SEO НЕ УМЕРЛО — ОНО КОРМИТ ВСЮ ЭТУ СИСТЕМУ
              </h2>

              <div style={{ display: "flex", gap: 36, width: "100%" }}>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "5px solid #0284c7",
                    borderRadius: 24,
                    padding: "36px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#0369a1", fontWeight: 900, marginBottom: 10, letterSpacing: 1 }}>
                    ФУНДАМЕНТ ДЛЯ GEO И AI-ПОИСКА
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", marginBottom: 14 }}>
                    Отвечать на реальные вопросы
                  </div>
                  <div style={{ fontSize: 20, color: "#334155", lineHeight: 1.5, fontWeight: 600 }}>
                    Быть видимым там, где люди ищут (карты, органика, ИИ-справки), и иметь прозрачный сайт с ценами, адресом и отзывами.
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "5px solid #059669",
                    borderRadius: 24,
                    padding: "36px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#047857", fontWeight: 900, marginBottom: 10, letterSpacing: 1 }}>
                    РОЛЬ САЙТА В БИЗНЕСЕ
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", marginBottom: 14 }}>
                    Центр захвата и конверсии
                  </div>
                  <div style={{ fontSize: 20, color: "#334155", lineHeight: 1.5, fontWeight: 600 }}>
                    Сайт строится не ради красивой таблички или графика трафика, а чтобы быстро доводить каждого пришедшего до записи и сделки.
                  </div>
                </div>
              </div>

              {/* Below 2 cards: Strategic Synergy Telemetry Strip (Zero Dead Space) */}
              <div
                style={{
                  width: "100%",
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
                      СТРАТЕГИЧЕСКИЙ ВЫВОД: СИСТЕМА ВМЕСТО РАЗОРИТЕЛЬНОЙ РЕКЛАМЫ
                    </div>
                    <div style={{ fontSize: 15, color: "#334155", fontWeight: 600 }}>
                      Понятный сайт с честными ценами и отзывами аккумулирует трафик со всех каналов и превращает поисковый интерес в прибыль.
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8", fontSize: 14, fontWeight: 900 }}>
                    🌐 Карты + Органика
                  </div>
                  <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", color: "#15803d", fontSize: 14, fontWeight: 900 }}>
                    🤖 AI-Справки = Сделки
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          DYNAMIC TECH GLOSSARY FOOTNOTE (TIMED TO VOICE-OVER)
          ========================================================================= */}
      {sec < 35.3 && (
        <TechGlossaryFootnote
          term="WhatsApp Lead Workflow"
          englishTitle="Сквозная обработка лида"
          russianExplanation="Запрос из бота или ChatGPT передается менеджеру с готовым бюджетом и параметрами, ускоряя отправку брошюры до 6 минут."
          accentColor="#10b981"
        />
      )}

      {sec >= 35.3 && sec < 58.3 && (
        <TechGlossaryFootnote
          term="Entity-Based Search"
          englishTitle="Поиск по точным сущностям"
          russianExplanation="Нейросеть связывает геолокацию (Камала), цену (3.49M THB) и доходность (ROI 9.2%), рекомендуя конкретную квартиру под запрос инвестора."
          accentColor="#38bdf8"
        />
      )}

      {sec >= 58.3 && (
        <TechGlossaryFootnote
          term="Local SEO & GEO Synergy"
          englishTitle="Синергия карт и нейропоиска"
          russianExplanation="Для локального бизнеса GEO усиливает карты Google и Яндекс: ИИ сверяет рейтинг, отзывы и адрес для прямого ответа жителю района."
          accentColor="#f59e0b"
        />
      )}
    </div>
  );
};

