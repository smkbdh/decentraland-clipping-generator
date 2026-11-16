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
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "2px solid rgba(236, 72, 153, 0.5)",
                    borderRadius: 20,
                    padding: "24px 28px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#f472b6", fontWeight: 800, marginBottom: 4 }}>БЮДЖЕТ КЛИЕНТА</div>
                  <div style={{ fontSize: 38, fontWeight: 900, color: "#ffffff", letterSpacing: -0.5 }}>4 000 000 THB (~$115 000)</div>
                  <div style={{ fontSize: 20, color: "#cbd5e1", marginTop: 4 }}>The Title ViVi Bang Tao (Freehold)</div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "2px solid #22c55e",
                    borderRadius: 20,
                    padding: "24px 28px",
                    boxShadow: "0 0 30px rgba(34, 197, 94, 0.25)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#86efac", fontWeight: 800, marginBottom: 4 }}>ТОЧНЫЙ ИСТОЧНИК И АТРИБУЦИЯ</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#22c55e" }}>ai_referral · chatgpt.com</div>
                  <div style={{ fontSize: 20, color: "#94a3b8", marginTop: 4 }}>Прямая рекомендация в ответе ChatGPT Search</div>
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
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "2px solid #22c55e",
                    borderRadius: 20,
                    padding: "24px 26px",
                    boxShadow: "0 0 35px rgba(34, 197, 94, 0.25)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#86efac", fontWeight: 800, marginBottom: 4 }}>РЕАКЦИЯ КОМАНДЫ</div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: "#22c55e" }}>Диалог за 6 минут</div>
                  <div style={{ fontSize: 20, color: "#cbd5e1", marginTop: 4 }}>PDF брошюра сразу отправлена клиенту</div>
                </div>

                <div
                  style={{
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    border: "2px solid rgba(56, 189, 248, 0.5)",
                    borderRadius: 20,
                    padding: "24px 26px",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#38bdf8", fontWeight: 800, marginBottom: 4 }}>ВЫВОД ДЛЯ БИЗНЕСА</div>
                  <div style={{ fontSize: 26, fontWeight: 900, color: "#ffffff" }}>Сделки выигрывает скорость</div>
                  <div style={{ fontSize: 18, color: "#cbd5e1", marginTop: 4 }}>Горячий лид из AI остывает за 15 минут без ответа менеджера</div>
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
          {/* Vox/Netflix Lower-Third Card */}
          <div
            style={{
              position: "absolute",
              bottom: 65,
              left: 80,
              maxWidth: 1300,
              zIndex: 20,
            }}
          >
            <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
              <div
                style={{
                  padding: "8px 22px",
                  borderRadius: 24,
                  backgroundColor: "rgba(16, 185, 129, 0.95)",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 1,
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.6)",
                }}
              >
                📍 РЕАЛЬНЫЙ ОБЪЕКТ В УПРАВЛЕНИИ · КАМАЛА
              </div>
              <div
                style={{
                  padding: "8px 22px",
                  borderRadius: 24,
                  backgroundColor: "rgba(15, 23, 42, 0.92)",
                  border: "1.5px solid rgba(56, 189, 248, 0.6)",
                  color: "#38bdf8",
                  fontSize: 18,
                  fontWeight: 800,
                }}
              >
                phuketstaypro.com/en/property/oceana-kamala-a76
              </div>
            </div>
            <h2 style={{ fontSize: 62, fontWeight: 900, color: "#ffffff", margin: "0 0 12px", lineHeight: 1.1 }}>
              OCEANA RESIDENCE KAMALA · A76
            </h2>
            <div style={{ fontSize: 26, color: "#f1f5f9", fontWeight: 700, lineHeight: 1.4 }}>
              Собственник нашел сайт в поиске и отдал квартиру в доверительное управление команде. <br />
              <span style={{ color: "#34d399", fontWeight: 900 }}>➔ Реальный объект и прибыль, а не просто клики или краулеры в логах.</span>
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
          <div
            style={{
              position: "absolute",
              bottom: 65,
              left: 80,
              maxWidth: 1300,
              zIndex: 20,
            }}
          >
            <div style={{ display: "flex", gap: 16, marginBottom: 16, alignItems: "center" }}>
              <div
                style={{
                  padding: "8px 22px",
                  borderRadius: 24,
                  backgroundColor: "rgba(245, 158, 11, 0.95)",
                  color: "#ffffff",
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 1,
                  boxShadow: "0 0 25px rgba(245, 158, 11, 0.6)",
                }}
              >
                💎 ДОГОВОР ДОВЕРИТЕЛЬНОГО УПРАВЛЕНИЯ
              </div>
            </div>
            <h2 style={{ fontSize: 62, fontWeight: 900, color: "#ffffff", margin: "0 0 12px", lineHeight: 1.1 }}>
              РЕЗУЛЬТАТ, КОТОРЫЙ ВАЖНЕЕ ЛЮБЫХ ГРАФИКОВ
            </h2>
            <div style={{ fontSize: 26, color: "#f1f5f9", fontWeight: 700, lineHeight: 1.4 }}>
              Это собственник, объект и новая работа для команды. <br />
              <span style={{ color: "#38bdf8", fontWeight: 900 }}>➔ Сайты строятся не ради красивой SEO-таблички, а ради сделок, которые меняют бизнес.</span>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2C (58.3s+): Chatterbox Case & Final Synthesis */}
      {sec >= 58.3 && (
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
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1.5px solid rgba(56, 189, 248, 0.5)",
              color: "#38bdf8",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            КЕЙС 03 · ЯЗЫКОВАЯ ШКОЛА CHATTERBOX
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
            КЛАССИЧЕСКИЙ ПОИСК И КАРТЫ: ФУНДАМЕНТ ДЛЯ ЗАЯВОК
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1250, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid #38bdf8",
                borderRadius: 24,
                padding: "36px",
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.2)",
              }}
            >
              <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 900, marginBottom: 10 }}>
                ИСТОЧНИКИ ТРАФИКА
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                Яндекс, 2ГИС, Google
              </div>
              <div style={{ fontSize: 24, color: "#cbd5e1", lineHeight: 1.45 }}>
                Люди ищут школу в своем районе, записываются на бесплатный пробный урок и тестирование.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid #22c55e",
                borderRadius: 24,
                padding: "36px",
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div style={{ fontSize: 20, color: "#22c55e", fontWeight: 900, marginBottom: 10 }}>
                ГЛАВНЫЙ ВЫВОД
              </div>
              <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                SEO не умерло — оно кормит
              </div>
              <div style={{ fontSize: 24, color: "#cbd5e1", lineHeight: 1.45 }}>
                Отвечать на вопросы людей, быть видимым там, где они ищут, и быстро доводить заявку до следующего шага.
              </div>
            </div>
          </div>
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

