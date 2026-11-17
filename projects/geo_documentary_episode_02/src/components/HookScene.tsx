import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TechGlossaryFootnote } from "./TechGlossaryFootnote";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL VIDEO SEQUENCES (VOX / NETFLIX STANDARD) */}
      
      {/* 0 - 24s: Business Deal & Startup Pitch B-Roll */}
      <Sequence from={0} durationInFrames={Math.round(24 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("02_hook_startup_deal.mp4")}
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
              transform: `scale(${interpolate(frame, [0, 24 * fps], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 24 - 48s: Global AI Network */}
      <Sequence from={Math.round(24 * fps)} durationInFrames={Math.round(24 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("04_act1_ai_network.mp4")}
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
              transform: `scale(${interpolate(frame - 24 * fps, [0, 24 * fps], [1.05, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 48 - 74s: Real OpenAI Crawlers Docs Screenshot Background */}
      <Sequence from={Math.round(48 * fps)} durationInFrames={Math.round(26 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("site_openai_bots.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
              transform: `scale(${interpolate(frame - 48 * fps, [0, 26 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 74s+: Server Token Cost Rack */}
      <Sequence from={Math.round(74 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("06_act1_server_token_cost.mp4")}
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
              transform: `scale(${interpolate(frame - 74 * fps, [0, 27 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#38bdf8" />

      {/* SUB-PHASE 1 (0 - 21.6s): Provocative Question Hook & 3-Case Micro-Teaser */}
      {sec < 21.6 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 70px 90px",
            zIndex: 10,
          }}
        >
          {/* Sub-phase 1A (0 - 7.2s): Provocative Hook Question */}
          {sec < 7.2 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 1450,
                width: "100%",
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
                🔥 РАССЛЕДОВАНИЕ НА 145 МИЛЛИОНОВ СЕССИЙ
              </div>

              <h1
                style={{
                  fontSize: 68,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.12,
                  margin: "0 0 32px",
                  maxWidth: 1400,
                  letterSpacing: -1,
                }}
              >
                УБИВАЕТ ЛИ CHATGPT КЛАССИЧЕСКОЕ SEO, <br />
                <span style={{ color: "#ef4444" }}>ИЛИ БИЗНЕС ТЕРЯЕТ ДЕНЬГИ</span> НА ПУСТЫХ ЛОГАХ БОТОВ?
              </h1>

              <div style={{ display: "flex", gap: 32, width: "100%", maxWidth: 1100 }}>
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #dc2626",
                    borderRadius: 24,
                    padding: "26px 32px",
                    textAlign: "center",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 15, color: "#dc2626", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                    ЧТО ПОКАЗЫВАЮТ В ХАЙП-ПРЕЗЕНТАЦИЯХ
                  </div>
                  <div style={{ fontSize: 32, color: "#0f172a", fontWeight: 900, marginBottom: 6 }}>
                    🤖 Трафик краулеров в логах
                  </div>
                  <div style={{ fontSize: 16, color: "#64748b", fontWeight: 600 }}>
                    Миллионы серверных хитов ботов без единой заявки
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #059669",
                    borderRadius: 24,
                    padding: "26px 32px",
                    textAlign: "center",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 15, color: "#047857", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                    ЧТО НА САМОМ ДЕЛЕ НУЖНО БИЗНЕСУ
                  </div>
                  <div style={{ fontSize: 32, color: "#059669", fontWeight: 900, marginBottom: 6 }}>
                    💰 Реальные клиенты и сделки
                  </div>
                  <div style={{ fontSize: 16, color: "#334155", fontWeight: 600 }}>
                    Живые брони, переходы в WhatsApp и оплаты в кассе
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Sub-phase 1B (7.2s - 21.6s): 3 Real Client Cases Micro-Teaser */
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 1450,
                width: "100%",
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
                РЕАЛЬНЫЕ КЛИЕНТСКИЕ ПРОЕКТЫ ВМЕСТО ТЕОРИИ
              </div>

              <h2
                style={{
                  fontSize: 56,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.1,
                  margin: "0 0 28px",
                  letterSpacing: -0.5,
                }}
              >
                РАЗБИРАЕМ, ГДЕ В GEO ХАЙП, А ГДЕ РЕАЛЬНЫЕ ДЕНЬГИ
              </h2>

              {/* 3 Real Cases Teaser Cards (Editorial Dossier) */}
              <div style={{ display: "flex", gap: 24, width: "100%", maxWidth: 1380 }}>
                {/* Case 1: BenPhuketCarRent */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #059669",
                    borderRadius: 22,
                    padding: "26px 22px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, color: "#047857", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                      КЕЙС 01 · АРЕНДА АВТО (ПХУКЕТ)
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", lineHeight: 1.25, marginBottom: 12 }}>
                      38 WhatsApp-лидов из ChatGPT
                    </div>
                    <div style={{ fontSize: 16, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                      Сквозные UTM-метки <code style={{ color: "#047857", backgroundColor: "#dcfce7", padding: "2px 6px", borderRadius: 6, fontWeight: 800 }}>utm=chatgpt.com</code> и прямые брони автопарка.
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      padding: "8px 14px",
                      borderRadius: 12,
                      backgroundColor: "#dcfce7",
                      border: "1px solid #bbf7d0",
                      color: "#047857",
                      fontSize: 15,
                      fontWeight: 900,
                      textAlign: "center",
                    }}
                  >
                    ● 100% занятость автопарка
                  </div>
                </div>

                {/* Case 2: PhuketStayPro */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #db2777",
                    borderRadius: 22,
                    padding: "26px 22px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, color: "#be185d", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                      КЕЙС 02 · НЕДВИЖИМОСТЬ
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", lineHeight: 1.25, marginBottom: 12 }}>
                      Сделка на 4 000 000 THB
                    </div>
                    <div style={{ fontSize: 16, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                      Инвестор из Сингапура через ChatGPT Search нашел виллу и объект Oceana Kamala в управление.
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      padding: "8px 14px",
                      borderRadius: 12,
                      backgroundColor: "#fce7f3",
                      border: "1px solid #fbcfe8",
                      color: "#be185d",
                      fontSize: 15,
                      fontWeight: 900,
                      textAlign: "center",
                    }}
                  >
                    ● Договор управления объектом
                  </div>
                </div>

                {/* Case 3: Chatterbox School */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #0284c7",
                    borderRadius: 22,
                    padding: "26px 22px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 14, color: "#0369a1", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                      КЕЙС 03 · ЯЗЫКОВАЯ ШКОЛА
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", lineHeight: 1.25, marginBottom: 12 }}>
                      Карты + Сайт-Агрегатор
                    </div>
                    <div style={{ fontSize: 16, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                      2ГИС, Яндекс Карты и сайт: стабильный поток учеников на бесплатное тестирование и в группы.
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      padding: "8px 14px",
                      borderRadius: 12,
                      backgroundColor: "#e0f2fe",
                      border: "1px solid #bae6fd",
                      color: "#0369a1",
                      fontSize: 15,
                      fontWeight: 900,
                      textAlign: "center",
                    }}
                  >
                    ● Единый центр захвата заявок
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-PHASE 2 (21.6s - 45.0s): Loud Headline 145M Sessions & Real High-Intent Customers */}
      {sec >= 21.6 && sec < 45.0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 70px 90px",
            zIndex: 10,
          }}
        >
          {/* 2A (21.6s - 25.5s): Breaking Media Headline - 145,000,000 Sessions */}
          {sec < 25.5 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 1450,
                width: "100%",
                animation: "fadeIn 0.3s ease-out",
              }}
            >
              <div
                style={{
                  padding: "8px 24px",
                  borderRadius: 30,
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  border: "1.5px solid rgba(239, 68, 68, 0.6)",
                  color: "#f87171",
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 2,
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span>⚡</span> ГРОМКИЙ ЗАГОЛОВОК ИССЛЕДОВАНИЯ · ХАЙП В СМИ
              </div>

              {/* Giant 145,000,000 Headline Callout */}
              <div
                style={{
                  fontSize: 92,
                  fontWeight: 900,
                  letterSpacing: -2,
                  color: "#ffffff",
                  lineHeight: 1,
                  margin: "0 0 16px",
                  textShadow: "0 0 40px rgba(239, 68, 68, 0.4)",
                }}
              >
                145 000 000 <span style={{ color: "#ef4444" }}>СЕССИЙ</span>
              </div>

              {/* Media Breaking Banner Style (Editorial Dossier) */}
              <div
                style={{
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: "4px solid #dc2626",
                  borderRadius: 24,
                  padding: "30px 48px",
                  textAlign: "center",
                  maxWidth: 1250,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.7), 0 4px 12px rgba(0,0,0,0.3)",
                }}
              >
                <div style={{ fontSize: 44, fontWeight: 900, color: "#0f172a", lineHeight: 1.2, marginBottom: 16 }}>
                  «ИЗ CHATGPT ПРИХОДИТ МЕНЕЕ 1% ТРАФИКА: GEO БЕСПОЛЕЗНО?»
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 30,
                    alignItems: "center",
                    marginTop: 18,
                  }}
                >
                  <div
                    style={{
                      padding: "8px 20px",
                      borderRadius: 14,
                      backgroundColor: "#e0f2fe",
                      border: "1px solid #bae6fd",
                      color: "#0369a1",
                      fontSize: 22,
                      fontWeight: 900,
                    }}
                  >
                    Google: 99.27% трафика
                  </div>
                  <div style={{ fontSize: 26, color: "#94a3b8", fontWeight: 800 }}>vs</div>
                  <div
                    style={{
                      padding: "8px 20px",
                      borderRadius: 14,
                      backgroundColor: "#fee2e2",
                      border: "1px solid #fecaca",
                      color: "#b91c1c",
                      fontSize: 22,
                      fontWeight: 900,
                    }}
                  >
                    AI-поиск: 0.73% трафика
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2B (25.5s - 32.2s): Reality of Conversions vs Illusion of Traffic */}
          {sec >= 25.5 && sec < 32.2 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 1450,
                width: "100%",
              }}
            >
              <div
                style={{
                  padding: "8px 24px",
                  borderRadius: 30,
                  backgroundColor: "rgba(245, 158, 11, 0.2)",
                  border: "1.5px solid rgba(245, 158, 11, 0.6)",
                  color: "#fbbf24",
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 2,
                  marginBottom: 16,
                }}
              >
                РЕАЛЬНОСТЬ КОНВЕРСИЙ VS ИЛЛЮЗИЯ ТРАФИКА
              </div>

              <h2
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.12,
                  margin: "0 0 26px",
                }}
              >
                ОШИБКА АНАЛИТИКОВ: СМОТРЕТЬ НА ОБЪЕМ КЛИКОВ, А НЕ НА СДЕЛКИ
              </h2>

              <div style={{ display: "flex", gap: 36, width: "100%", maxWidth: 1300 }}>
                {/* Google Box (Editorial Dossier) */}
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
                    GOOGLE ПОИСК (99.27%)
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>
                    Огромный шум и серфинг
                  </div>
                  <div style={{ fontSize: 20, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                    Миллионы людей кликают по синим ссылкам, читают общие статьи, собирают рефераты и закрывают вкладки без покупок.
                  </div>
                </div>

                {/* ChatGPT Box (Editorial Dossier) */}
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
                    CHATGPT & GEO (0.73%)
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: "#0f172a", marginBottom: 12 }}>
                    Сформированная потребность
                  </div>
                  <div style={{ fontSize: 20, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                    Микро-поток, но каждый перешедший уже уточнил параметры, выбрал авто или квартиру и готов сразу писать в WhatsApp.
                  </div>
                </div>
              </div>

              {/* Below 2 cards: Bottom Strategic Takeaway Strip (Zero Dead Space) */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 1300,
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: "3.5px solid #059669",
                  borderRadius: 18,
                  padding: "16px 26px",
                  marginTop: 20,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>⚡</span>
                  <div style={{ fontSize: 17, fontWeight: 900, color: "#0f172a" }}>
                    КЛЮЧЕВОЙ ПАРАДОКС GEO: 1 целевой клиент из диалога с ИИ конвертируется быстрее и дороже, чем 100 случайных кликов в поисковике
                  </div>
                </div>
                <div style={{ padding: "6px 14px", borderRadius: 10, backgroundColor: "#dcfce7", color: "#047857", fontSize: 13, fontWeight: 900, whiteSpace: "nowrap" }}>
                  x4.5 ВЫШЕ КОНВЕРСИЯ
                </div>
              </div>
            </div>
          )}

          {/* 2C (32.2s - 45.0s): High-Intent Customers Showcase */}
          {sec >= 32.2 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: 1450,
                width: "100%",
              }}
            >
              <div
                style={{
                  padding: "8px 24px",
                  borderRadius: 30,
                  backgroundColor: "rgba(56, 189, 248, 0.2)",
                  border: "1.5px solid rgba(56, 189, 248, 0.6)",
                  color: "#38bdf8",
                  fontSize: 18,
                  fontWeight: 900,
                  letterSpacing: 2,
                  marginBottom: 16,
                }}
              >
                🎯 HIGH-INTENT: ВЫСОКОТОЧНЫЙ СПРОС
              </div>

              <h2
                style={{
                  fontSize: 54,
                  fontWeight: 900,
                  color: "#f8fafc",
                  textAlign: "center",
                  lineHeight: 1.12,
                  margin: "0 0 26px",
                }}
              >
                МАЛЕНЬКИЙ ПОТОК ПРИВОДИТ САМЫХ ПЛАТЕЖЕСПОСОБНЫХ КЛИЕНТОВ
              </h2>

              <div style={{ display: "flex", gap: 36, width: "100%", maxWidth: 1300 }}>
                {/* Generic Query */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #dc2626",
                    borderRadius: 24,
                    padding: "30px 32px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ fontSize: 15, color: "#dc2626", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                    ОБЫЧНЫЙ ПОИСКОВЫЙ ЗАПРОС (ПУСТОЙ ТРАФИК)
                  </div>
                  <div
                    style={{
                      backgroundColor: "#f1f5f9",
                      borderRadius: 14,
                      padding: "16px 20px",
                      fontSize: 21,
                      color: "#475569",
                      fontStyle: "italic",
                      marginBottom: 14,
                      border: "1px solid #cbd5e1",
                    }}
                  >
                    «какие машины в аренду на пхукете отзывы туристов форум»
                  </div>
                  <div style={{ fontSize: 18, color: "#64748b", fontWeight: 600 }}>
                    ➔ Читает 20 сайтов, сравнивает воду, покупка откладывается на месяцы.
                  </div>
                </div>

                {/* AI High-Intent Query */}
                <div
                  style={{
                    flex: 1.15,
                    backgroundColor: "rgba(248, 250, 252, 0.98)",
                    border: "1px solid rgba(226, 232, 240, 0.9)",
                    borderTop: "4px solid #059669",
                    borderRadius: 24,
                    padding: "30px 32px",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 0 30px rgba(5, 150, 105, 0.25)",
                  }}
                >
                  <div style={{ fontSize: 15, color: "#047857", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                    ЦЕЛЕВОЙ ДИАЛОГ В CHATGPT (ПРЯМАЯ СДЕЛКА)
                  </div>
                  <div
                    style={{
                      backgroundColor: "#dcfce7",
                      borderRadius: 14,
                      padding: "16px 20px",
                      fontSize: 21,
                      color: "#065f46",
                      fontWeight: 800,
                      marginBottom: 14,
                      border: "1.5px solid #86efac",
                    }}
                  >
                    «Найди Toyota Yaris на Патонге с 16 по 20 ноября с доставкой в отель до 1000฿/день»
                  </div>
                  <div style={{ fontSize: 19, color: "#047857", fontWeight: 900 }}>
                    ➔ Прямой переход по ссылке в WhatsApp и мгновенная оплата брони.
                  </div>
                </div>
              </div>

              {/* Below 2 query cards: Bottom Action Strip (Zero Dead Space) */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 1300,
                  backgroundColor: "rgba(248, 250, 252, 0.98)",
                  border: "1px solid rgba(226, 232, 240, 0.9)",
                  borderTop: "3.5px solid #059669",
                  borderRadius: 18,
                  padding: "16px 26px",
                  marginTop: 20,
                  boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>🎯</span>
                  <div style={{ fontSize: 17, fontWeight: 900, color: "#0f172a" }}>
                    ВЫСОКОТОЧНЫЙ СПРОС: Пользователь приходит в WhatsApp не «узнать подробности», а оплатить бронь на согласованных с ИИ условиях
                  </div>
                </div>
                <div style={{ padding: "6px 14px", borderRadius: 10, backgroundColor: "#dcfce7", color: "#047857", fontSize: 13, fontWeight: 900, whiteSpace: "nowrap" }}>
                  ⚡ СДЕЛКА ЗА 3 МИНУТЫ
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-PHASE 3 (45 - 69.2s): 3 Stages Funnel with Real Bot Documentation */}
      {sec >= 45.0 && sec < 69.2 && (
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
              borderRadius: 24,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#94a3b8",
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 1.5,
              marginBottom: 16,
            }}
          >
            РЕАЛЬНАЯ ВОРОНКА ЗАПРОСОВ
          </div>

          <h2
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              margin: "0 0 45px",
            }}
          >
            ГЛАВНЫЙ ТРЮК В ОТЧЁТАХ: 3 РАЗНЫХ ЭТАПА
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div
              style={{
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #dc2626",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>🤖</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#dc2626", marginBottom: 10 }}>
                1. КРАУЛЕР
              </div>
              <div style={{ fontSize: 20, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                Сканирует страницу для индекса и обучения моделей
              </div>
            </div>

            <div style={{ fontSize: 40, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #d97706",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>👆</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#d97706", marginBottom: 10 }}>
                2. ПЕРЕХОД
              </div>
              <div style={{ fontSize: 20, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                Человек переходит по ссылке-рекомендации нейросети
              </div>
            </div>

            <div style={{ fontSize: 40, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: "4px solid #059669",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 0 40px rgba(5, 150, 105, 0.3)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>💰</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#059669", marginBottom: 10 }}>
                3. КЛИЕНТ
              </div>
              <div style={{ fontSize: 20, color: "#0f172a", lineHeight: 1.45, fontWeight: 700 }}>
                Пишет в WhatsApp, оставляет бронь, покупает
              </div>
            </div>
          </div>

          {/* Below 3 cards: Strategic Takeaway Strip (Zero Dead Space) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1200,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #059669",
              borderRadius: 22,
              padding: "18px 30px",
              marginTop: 26,
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
                  СТРАТЕГИЧЕСКИЙ ВЫВОД: ПОЧЕМУ МЕТРИКИ ВВОДЯТ В ЗАБЛУЖДЕНИЕ
                </div>
                <div style={{ fontSize: 15, color: "#334155", fontWeight: 600 }}>
                  Боты сканируют сайт сотнями тысяч запросов, но реальную выручку бизнесу приносят только целевые клиенты.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#fee2e2", border: "1px solid #fecaca", color: "#b91c1c", fontSize: 14, fontWeight: 900 }}>
                ❌ Краулеры = 0 ₽
              </div>
              <div style={{ padding: "8px 16px", borderRadius: 12, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", color: "#15803d", fontSize: 14, fontWeight: 900 }}>
                ✅ Клиенты = Выручка
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 4 (69.2 - 95.5s): OpenAI Crawlers Table (Starts precisely at 1:10 voiceover) */}
      {sec >= 69.2 && (
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
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            СПЕЦИФИКАЦИЯ OPENAI CRAWLERS
          </div>

          <h2
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              margin: "0 0 36px",
            }}
          >
            БОТЫ БЫВАЮТ РАЗНЫМИ: КТО ЕСТЬ КТО?
          </h2>

          <div style={{ display: "flex", gap: 32, maxWidth: 1350, width: "100%" }}>
            {/* Card 1: GPTBot */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: sec < 73.5 ? "5px solid #64748b" : "4px solid #94a3b8",
                borderRadius: 24,
                padding: "32px",
                boxShadow: sec < 73.5 ? "0 25px 60px rgba(0,0,0,0.7), 0 0 30px rgba(100, 116, 139, 0.4)" : "0 20px 50px rgba(0,0,0,0.65)",
                transform: sec < 73.5 ? "scale(1.03)" : "scale(1.0)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#334155" }}>
                  GPTBot
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#64748b", backgroundColor: "#f1f5f9", padding: "4px 10px", borderRadius: 8 }}>
                  CRAWLER
                </span>
              </div>
              <div style={{ fontSize: 22, color: "#0f172a", fontWeight: 800, marginBottom: 10 }}>
                Обучение моделей
              </div>
              <div style={{ fontSize: 18, color: "#475569", lineHeight: 1.45, fontWeight: 600 }}>
                Обходит миллионы страниц для датасетов LLM. Это чистые серверные запросы, не клиенты.
              </div>
            </div>

            {/* Card 2: OAI-SearchBot */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: sec >= 73.5 && sec < 78.0 ? "5px solid #0284c7" : "4px solid #0284c7",
                borderRadius: 24,
                padding: "32px",
                boxShadow: sec >= 73.5 && sec < 78.0 ? "0 25px 60px rgba(0,0,0,0.7), 0 0 35px rgba(2, 132, 199, 0.4)" : "0 20px 50px rgba(0,0,0,0.65)",
                transform: sec >= 73.5 && sec < 78.0 ? "scale(1.03)" : "scale(1.0)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#0284c7" }}>
                  OAI-SearchBot
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#0369a1", backgroundColor: "#e0f2fe", padding: "4px 10px", borderRadius: 8 }}>
                  SEARCH
                </span>
              </div>
              <div style={{ fontSize: 22, color: "#0f172a", fontWeight: 800, marginBottom: 10 }}>
                Поиск в ChatGPT Search
              </div>
              <div style={{ fontSize: 18, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                Индексирует свежий контент специально для генеративных ответов с источниками.
              </div>
            </div>

            {/* Card 3: ChatGPT-User */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(248, 250, 252, 0.98)",
                border: "1px solid rgba(226, 232, 240, 0.9)",
                borderTop: sec >= 78.0 ? "5px solid #059669" : "4px solid #059669",
                borderRadius: 24,
                padding: "32px",
                boxShadow: sec >= 78.0 ? "0 25px 60px rgba(0,0,0,0.7), 0 0 35px rgba(5, 150, 105, 0.4)" : "0 20px 50px rgba(0,0,0,0.65)",
                transform: sec >= 78.0 ? "scale(1.03)" : "scale(1.0)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#059669" }}>
                  ChatGPT-User
                </span>
                <span style={{ fontSize: 12, fontWeight: 900, color: "#047857", backgroundColor: "#dcfce7", padding: "4px 10px", borderRadius: 8 }}>
                  USER ACTION
                </span>
              </div>
              <div style={{ fontSize: 22, color: "#0f172a", fontWeight: 800, marginBottom: 10 }}>
                Действие пользователя
              </div>
              <div style={{ fontSize: 18, color: "#334155", lineHeight: 1.45, fontWeight: 600 }}>
                Открывает страницу в реальном времени, когда пользователь просит прочитать ссылку.
              </div>
            </div>
          </div>

          {/* Below 3 cards: OpenAI Crawlers Telemetry Strip (Zero Dead Space) */}
          <div
            style={{
              width: "100%",
              maxWidth: 1350,
              backgroundColor: "rgba(248, 250, 252, 0.98)",
              border: "1px solid rgba(226, 232, 240, 0.9)",
              borderTop: "4px solid #0284c7",
              borderRadius: 22,
              padding: "18px 30px",
              marginTop: 24,
              boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontSize: 26 }}>🤖</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#0f172a" }}>
                  РАЗНИЦА ДЛЯ БИЗНЕСА: КТО РЕАЛЬНО ПРИНОСИТ ДЕНЬГИ В КАССУ
                </div>
                <div style={{ fontSize: 15, color: "#334155", fontWeight: 600 }}>
                  GPTBot обучает базовые модели, OAI-SearchBot находит вас в поиске, а ChatGPT-User — это готовый покупатель.
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ padding: "8px 14px", borderRadius: 12, backgroundColor: "#f1f5f9", border: "1px solid #cbd5e1", color: "#475569", fontSize: 14, fontWeight: 900 }}>
                🤖 GPTBot = Индекс
              </div>
              <div style={{ padding: "8px 14px", borderRadius: 12, backgroundColor: "#e0f2fe", border: "1px solid #bae6fd", color: "#0369a1", fontSize: 14, fontWeight: 900 }}>
                🔍 SearchBot = Выдача
              </div>
              <div style={{ padding: "8px 14px", borderRadius: 12, backgroundColor: "#dcfce7", border: "1px solid #bbf7d0", color: "#15803d", fontSize: 14, fontWeight: 900 }}>
                ⚡ ChatGPT-User = Клиент
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DYNAMIC TECH GLOSSARY FOOTNOTE (TIMED TO VOICE-OVER)
          ========================================================================= */}
      {sec < 48 && (
        <TechGlossaryFootnote
          term="GEO"
          englishTitle="Generative Engine Optimization"
          russianExplanation="Новый стандарт продвижения: оптимизация контента сайта для прямого цитирования в ответах ИИ (ChatGPT, Perplexity, Claude), а не просто кликов в Google."
          accentColor="#38bdf8"
        />
      )}

      {sec >= 48 && (
        <TechGlossaryFootnote
          term="AI Crawlers"
          englishTitle="Роботы OpenAI и поисковых нейросетей"
          russianExplanation="Боты (GPTBot, OAI-SearchBot), которые в фоновом режиме читают ваш сайт, собирают факты и проверяют актуальность цен для формирования ответов пользователю."
          accentColor="#22c55e"
        />
      )}
    </div>
  );
};

