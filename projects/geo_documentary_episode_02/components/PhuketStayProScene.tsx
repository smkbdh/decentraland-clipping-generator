import React from "react";
import { useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import { BackgroundGrid } from "./BackgroundGrid";

export const PhuketStayProScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      <BackgroundGrid accentColor="#ec4899" />

      {/* PHASE 1 (0 - 45s / 425.0s - 470.0s): Live ChatGPT Lead Dario (4M THB) */}
      {sec < 45 && (
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
              fontSize: 54,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 25px",
            }}
          >
            КЛИЕНТ ИЗ СИНГАПУРА С БЮДЖЕТОМ 4 МЛН БАТ (ИЗ CHATGPT)
          </h2>

          <div style={{ display: "flex", gap: 32, alignItems: "center", maxWidth: 1400 }}>
            {/* Screenshot 1: Telegram Bot Lead */}
            <div
              style={{
                width: 480,
                height: 520,
                borderRadius: 20,
                overflow: "hidden",
                border: "2px solid rgba(56, 189, 248, 0.5)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.2)",
                position: "relative",
                backgroundColor: "#111827",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  zIndex: 5,
                  padding: "4px 12px",
                  borderRadius: 12,
                  backgroundColor: "rgba(0,0,0,0.75)",
                  color: "#38bdf8",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                ЖИВОЙ СКРИНШОТ БОТА
              </div>
              <Img
                src={staticFile("telegram_lead_dario_chatgpt_anonymized.png")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            {/* Middle arrow / flow summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 340 }}>
              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(236, 72, 153, 0.3)",
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
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
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
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 13, color: "#38bdf8", fontWeight: 800 }}>РЕАКЦИЯ КОМАНДЫ</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#ffffff" }}>Диалог за 6 минут</div>
                <div style={{ fontSize: 14, color: "#94a3b8" }}>Отправка PDF брошюры в WhatsApp</div>
              </div>
            </div>

            {/* Screenshot 2: WhatsApp Chat */}
            <div
              style={{
                width: 480,
                height: 520,
                borderRadius: 20,
                overflow: "hidden",
                border: "2px solid rgba(34, 197, 94, 0.5)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(34, 197, 94, 0.2)",
                position: "relative",
                backgroundColor: "#111827",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  zIndex: 5,
                  padding: "4px 12px",
                  borderRadius: 12,
                  backgroundColor: "rgba(0,0,0,0.75)",
                  color: "#22c55e",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                РЕАЛЬНЫЙ ДИАЛОГ WHATSAPP
              </div>
              <Img
                src={staticFile("whatsapp_chat_dario_singapore_anonymized.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2 (45s+ / 470.0s - 516.5s): Kamala Flat & Chatterbox Case */}
      {sec >= 45 && (
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
            СИСТЕМНЫЙ ЭФФЕКТ: НЕДВИЖИМОСТЬ И ШКОЛА CHATTERBOX
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
            ОБЪЕКТЫ В УПРАВЛЕНИИ И ЗАЯВКИ С КАРТ
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1.5px solid #38bdf8",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#38bdf8", fontWeight: 800, marginBottom: 10 }}>
                PHUKETSTAYPRO: ОБЪЕКТ
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Квартира на Камале
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.4 }}>
                Собственник пришел через поисковую систему сайта и отдал объект в управление команде. Это реальная работа и прибыль.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1.5px solid #f59e0b",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#f59e0b", fontWeight: 800, marginBottom: 10 }}>
                ЯЗЫКОВАЯ ШКОЛА CHATTERBOX
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Поток лидов с карт и SEO
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.4 }}>
                Яндекс, 2ГИС и Google приводят учеников на бесплатный пробный урок и тестирование. SEO кормит всю эту экосистему.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
