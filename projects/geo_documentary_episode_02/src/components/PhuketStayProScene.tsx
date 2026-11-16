import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

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
            padding: "0 60px 90px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(236, 72, 153, 0.15)",
              border: "1px solid rgba(236, 72, 153, 0.4)",
              color: "#f472b6",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            КЕЙС 02 · PHUKETSTAYPRO · СВЕЖИЙ ЛИД СЕГОДНЯ
          </div>

          <h2
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 24px",
            }}
          >
            КЛИЕНТ ИЗ СИНГАПУРА С БЮДЖЕТОМ 4 МЛН БАТ (ИЗ CHATGPT)
          </h2>

          <div style={{ display: "flex", gap: 28, alignItems: "center", maxWidth: 1600, width: "100%", justifyContent: "center" }}>
            {/* Screenshot 1: Telegram Bot Lead */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "4px 12px",
                  borderRadius: 10,
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.4)",
                  color: "#38bdf8",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                }}
              >
                ЖИВОЙ СКРИНШОТ БОТА
              </div>
              <div
                style={{
                  width: 420,
                  height: 520,
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "2px solid rgba(56, 189, 248, 0.5)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.2)",
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
                  }}
                />
              </div>
            </div>

            {/* Middle flow summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 320 }}>
              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.92)",
                  border: "1px solid rgba(236, 72, 153, 0.35)",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 13, color: "#f472b6", fontWeight: 800 }}>ОБЪЕКТ И БЮДЖЕТ</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>The Title ViVi Bang Tao</div>
                <div style={{ fontSize: 16, color: "#cbd5e1" }}>4 000 000 THB (~$115 000)</div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.92)",
                  border: "1.5px solid #22c55e",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 13, color: "#86efac", fontWeight: 800 }}>ИСТОЧНИК ПЕРЕХОДА</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#22c55e" }}>ai_referral · chatgpt.com</div>
                <div style={{ fontSize: 14, color: "#94a3b8" }}>Рекомендация в ответе ChatGPT</div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.92)",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 13, color: "#38bdf8", fontWeight: 800 }}>РЕАКЦИЯ КОМАНДЫ</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#ffffff" }}>Диалог за 6 минут</div>
                <div style={{ fontSize: 14, color: "#cbd5e1" }}>Отправка PDF брошюры в WhatsApp</div>
              </div>
            </div>

            {/* Screenshot 2: WhatsApp Chat */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div
                style={{
                  alignSelf: "flex-start",
                  padding: "4px 12px",
                  borderRadius: 10,
                  backgroundColor: "rgba(34, 197, 94, 0.15)",
                  border: "1px solid rgba(34, 197, 94, 0.4)",
                  color: "#22c55e",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                }}
              >
                РЕАЛЬНЫЙ ДИАЛОГ WHATSAPP
              </div>
              <div
                style={{
                  width: 760,
                  height: 520,
                  borderRadius: 20,
                  overflow: "hidden",
                  border: "2px solid rgba(34, 197, 94, 0.5)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(34, 197, 94, 0.2)",
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
                  }}
                />
              </div>
            </div>
          </div>
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
              maxWidth: 1200,
              zIndex: 20,
            }}
          >
            <div style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "center" }}>
              <div
                style={{
                  padding: "6px 18px",
                  borderRadius: 20,
                  backgroundColor: "rgba(16, 185, 129, 0.92)",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: 1,
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.5)",
                }}
              >
                📍 РЕАЛЬНЫЙ ОБЪЕКТ В УПРАВЛЕНИИ · КАМАЛА
              </div>
              <div
                style={{
                  padding: "6px 18px",
                  borderRadius: 20,
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(56, 189, 248, 0.6)",
                  color: "#38bdf8",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                phuketstaypro.com/en/property/oceana-kamala-a76
              </div>
            </div>
            <h2 style={{ fontSize: 56, fontWeight: 900, color: "#ffffff", margin: "0 0 10px", lineHeight: 1.1 }}>
              OCEANA RESIDENCE KAMALA · A76
            </h2>
            <div style={{ fontSize: 22, color: "#cbd5e1", fontWeight: 600, lineHeight: 1.4 }}>
              Собственник нашел сайт в поиске и отдал квартиру в доверительное управление команде. <br />
              <span style={{ color: "#34d399", fontWeight: 800 }}>➔ Реальный объект и прибыль, а не просто клики или краулеры в логах.</span>
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
              maxWidth: 1200,
              zIndex: 20,
            }}
          >
            <div style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "center" }}>
              <div
                style={{
                  padding: "6px 18px",
                  borderRadius: 20,
                  backgroundColor: "rgba(245, 158, 11, 0.92)",
                  color: "#ffffff",
                  fontSize: 14,
                  fontWeight: 800,
                  letterSpacing: 1,
                  boxShadow: "0 0 25px rgba(245, 158, 11, 0.5)",
                }}
              >
                💎 ДОГОВОР ДОВЕРИТЕЛЬНОГО УПРАВЛЕНИЯ
              </div>
            </div>
            <h2 style={{ fontSize: 52, fontWeight: 900, color: "#ffffff", margin: "0 0 10px", lineHeight: 1.1 }}>
              РЕЗУЛЬТАТ, КОТОРЫЙ ВАЖНЕЕ ЛЮБЫХ ГРАФИКОВ
            </h2>
            <div style={{ fontSize: 22, color: "#cbd5e1", fontWeight: 600, lineHeight: 1.4 }}>
              Это собственник, объект и новая работа для команды. <br />
              <span style={{ color: "#38bdf8", fontWeight: 800 }}>➔ Сайты строятся не ради красивой SEO-таблички, а ради сделок, которые меняют бизнес.</span>
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
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              color: "#38bdf8",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            КЕЙС 03 · ЯЗЫКОВАЯ ШКОЛА CHATTERBOX
          </div>

          <h2
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 35px",
            }}
          >
            КЛАССИЧЕСКИЙ ПОИСК И КАРТЫ: ФУНДАМЕНТ ДЛЯ ЗАЯВОК
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #38bdf8",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#38bdf8", fontWeight: 800, marginBottom: 10 }}>
                ИСТОЧНИКИ ТРАФИКА
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Яндекс, 2ГИС, Google
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Люди ищут школу в своем районе, записываются на бесплатный пробный урок и тестирование.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #22c55e",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#22c55e", fontWeight: 800, marginBottom: 10 }}>
                ГЛАВНЫЙ ВЫВОД
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                SEO не умерло — оно кормит
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Отвечать на вопросы людей, быть видимым там, где они ищут, и быстро доводить заявку до следующего шага.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

