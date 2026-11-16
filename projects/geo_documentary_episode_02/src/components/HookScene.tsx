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
                    backgroundColor: "rgba(15, 23, 42, 0.92)",
                    border: "2px solid rgba(239, 68, 68, 0.5)",
                    borderRadius: 20,
                    padding: "24px 32px",
                    textAlign: "center",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#f87171", fontWeight: 800, marginBottom: 6 }}>
                    ЧТО ПОКАЗЫВАЮТ В ХАЙП-ПРЕЗЕНТАЦИЯХ
                  </div>
                  <div style={{ fontSize: 34, color: "#ef4444", fontWeight: 900 }}>
                    🤖 Трафик краулеров в логах
                  </div>
                </div>

                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.92)",
                    border: "2px solid rgba(34, 197, 94, 0.5)",
                    borderRadius: 20,
                    padding: "24px 32px",
                    textAlign: "center",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#4ade80", fontWeight: 800, marginBottom: 6 }}>
                    ЧТО НА САМОМ ДЕЛЕ НУЖНО БИЗНЕСУ
                  </div>
                  <div style={{ fontSize: 34, color: "#22c55e", fontWeight: 900 }}>
                    💰 Реальные клиенты и сделки
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

              {/* 3 Real Cases Teaser Cards */}
              <div style={{ display: "flex", gap: 24, width: "100%", maxWidth: 1350 }}>
                {/* Case 1: BenPhuketCarRent */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.94)",
                    border: "2px solid #22c55e",
                    borderRadius: 22,
                    padding: "26px 22px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(34, 197, 94, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, color: "#4ade80", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                      КЕЙС 01 · АРЕНДА АВТО (ПХУКЕТ)
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", lineHeight: 1.25, marginBottom: 12 }}>
                      38 WhatsApp-лидов из ChatGPT
                    </div>
                    <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                      Сквозные UTM-метки <code style={{ color: "#4ade80" }}>utm=chatgpt.com</code> и прямые брони автопарка.
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      padding: "8px 14px",
                      borderRadius: 12,
                      backgroundColor: "rgba(34, 197, 94, 0.15)",
                      color: "#4ade80",
                      fontSize: 16,
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  >
                    100% занятость автопарка
                  </div>
                </div>

                {/* Case 2: PhuketStayPro */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.94)",
                    border: "2px solid #ec4899",
                    borderRadius: 22,
                    padding: "26px 22px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(236, 72, 153, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, color: "#f472b6", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                      КЕЙС 02 · НЕДВИЖИМОСТЬ
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", lineHeight: 1.25, marginBottom: 12 }}>
                      Сделка на 4 000 000 THB
                    </div>
                    <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                      Инвестор из Сингапура через ChatGPT Search нашел виллу и объект Oceana Kamala в управление.
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      padding: "8px 14px",
                      borderRadius: 12,
                      backgroundColor: "rgba(236, 72, 153, 0.15)",
                      color: "#f472b6",
                      fontSize: 16,
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  >
                    Договор управления объектом
                  </div>
                </div>

                {/* Case 3: Chatterbox School */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.94)",
                    border: "2px solid #38bdf8",
                    borderRadius: 22,
                    padding: "26px 22px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.6), 0 0 25px rgba(56, 189, 248, 0.2)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 15, color: "#38bdf8", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                      КЕЙС 03 · ЯЗЫКОВАЯ ШКОЛА
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", lineHeight: 1.25, marginBottom: 12 }}>
                      Карты + Сайт-Агрегатор
                    </div>
                    <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                      2ГИС, Яндекс Карты и сайт: стабильный поток учеников на бесплатное тестирование и в группы.
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 18,
                      padding: "8px 14px",
                      borderRadius: 12,
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      color: "#38bdf8",
                      fontSize: 16,
                      fontWeight: 800,
                      textAlign: "center",
                    }}
                  >
                    Единый центр захвата заявок
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

              {/* Media Breaking Banner Style */}
              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "2.5px solid #ef4444",
                  borderRadius: 24,
                  padding: "30px 48px",
                  textAlign: "center",
                  maxWidth: 1250,
                  boxShadow: "0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(239, 68, 68, 0.3)",
                }}
              >
                <div style={{ fontSize: 44, fontWeight: 900, color: "#f8fafc", lineHeight: 1.2, marginBottom: 16 }}>
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
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      border: "1px solid #38bdf8",
                      color: "#38bdf8",
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    Google: 99.27% трафика
                  </div>
                  <div style={{ fontSize: 26, color: "#64748b" }}>vs</div>
                  <div
                    style={{
                      padding: "8px 20px",
                      borderRadius: 14,
                      backgroundColor: "rgba(239, 68, 68, 0.2)",
                      border: "1px solid #ef4444",
                      color: "#f87171",
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
                {/* Google Box */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.94)",
                    border: "2px solid rgba(56, 189, 248, 0.5)",
                    borderRadius: 24,
                    padding: "32px 36px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.6)",
                  }}
                >
                  <div style={{ fontSize: 18, color: "#38bdf8", fontWeight: 900, marginBottom: 8 }}>
                    GOOGLE ПОИСК (99.27%)
                  </div>
                  <div style={{ fontSize: 34, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                    Огромный шум и серфинг
                  </div>
                  <div style={{ fontSize: 22, color: "#cbd5e1", lineHeight: 1.45 }}>
                    Миллионы людей кликают по синим ссылкам, читают общие статьи, собирают рефераты и закрывают вкладки без покупок.
                  </div>
                </div>

                {/* ChatGPT Box */}
                <div
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(15, 23, 42, 0.94)",
                    border: "2.5px solid #22c55e",
                    borderRadius: 24,
                    padding: "32px 36px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.6), 0 0 30px rgba(34, 197, 94, 0.25)",
                  }}
                >
                  <div style={{ fontSize: 18, color: "#4ade80", fontWeight: 900, marginBottom: 8 }}>
                    CHATGPT & GEO (0.73%)
                  </div>
                  <div style={{ fontSize: 34, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                    Сформированная потребность
                  </div>
                  <div style={{ fontSize: 22, color: "#cbd5e1", lineHeight: 1.45 }}>
                    Микро-поток, но каждый перешедший уже уточнил параметры, выбрал авто или квартиру и готов сразу писать в WhatsApp.
                  </div>
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
                    backgroundColor: "rgba(15, 23, 42, 0.94)",
                    border: "1.5px solid rgba(239, 68, 68, 0.4)",
                    borderRadius: 24,
                    padding: "30px 32px",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#f87171", fontWeight: 800, marginBottom: 8 }}>
                    ОБЫЧНЫЙ ПОИСКОВЫЙ ЗАПРОС (ПУСТОЙ ТРАФИК)
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(0,0,0,0.4)",
                      borderRadius: 14,
                      padding: "16px 20px",
                      fontSize: 22,
                      color: "#94a3b8",
                      fontStyle: "italic",
                      marginBottom: 14,
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    «какие машины в аренду на пхукете отзывы туристов форум»
                  </div>
                  <div style={{ fontSize: 18, color: "#64748b" }}>
                    ➔ Читает 20 сайтов, сравнивает воду, покупка откладывается на месяцы.
                  </div>
                </div>

                {/* AI High-Intent Query */}
                <div
                  style={{
                    flex: 1.15,
                    backgroundColor: "rgba(15, 23, 42, 0.96)",
                    border: "2.5px solid #10b981",
                    borderRadius: 24,
                    padding: "30px 32px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.6), 0 0 35px rgba(16, 185, 129, 0.25)",
                  }}
                >
                  <div style={{ fontSize: 16, color: "#34d399", fontWeight: 900, marginBottom: 8 }}>
                    ЦЕЛЕВОЙ ДИАЛОГ В CHATGPT (ПРЯМАЯ СДЕЛКА)
                  </div>
                  <div
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.12)",
                      borderRadius: 14,
                      padding: "16px 20px",
                      fontSize: 22,
                      color: "#ffffff",
                      fontWeight: 700,
                      marginBottom: 14,
                      border: "1px solid rgba(16, 185, 129, 0.4)",
                    }}
                  >
                    «Найди Toyota Yaris на Патонге с 16 по 20 ноября с доставкой в отель до 1000฿/день»
                  </div>
                  <div style={{ fontSize: 19, color: "#34d399", fontWeight: 800 }}>
                    ➔ Прямой переход по ссылке в WhatsApp и мгновенная оплата брони.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-PHASE 3 (45 - 74s): 3 Stages Funnel with Real Bot Documentation */}
      {sec >= 45.0 && sec < 74 && (
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
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid rgba(239, 68, 68, 0.6)",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>🤖</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ef4444", marginBottom: 10 }}>
                1. КРАУЛЕР
              </div>
              <div style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.4 }}>
                Сканирует страницу для индекса и обучения моделей
              </div>
            </div>

            <div style={{ fontSize: 40, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid rgba(245, 158, 11, 0.6)",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>👆</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#f59e0b", marginBottom: 10 }}>
                2. ПЕРЕХОД
              </div>
              <div style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.4 }}>
                Человек переходит по ссылке-рекомендации нейросети
              </div>
            </div>

            <div style={{ fontSize: 40, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid rgba(34, 197, 94, 0.6)",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 0 40px rgba(34, 197, 94, 0.3)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>💰</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                3. КЛИЕНТ
              </div>
              <div style={{ fontSize: 22, color: "#f8fafc", lineHeight: 1.4, fontWeight: 600 }}>
                Пишет в WhatsApp, оставляет бронь, покупает
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 4 (74 - 100.8s): OpenAI Crawlers Table */}
      {sec >= 74 && (
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
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#f8fafc",
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
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "1.5px solid rgba(148, 163, 184, 0.35)",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#94a3b8", marginBottom: 10 }}>
                GPTBot
              </div>
              <div style={{ fontSize: 22, color: "#f8fafc", fontWeight: 800, marginBottom: 10 }}>
                Обучение моделей
              </div>
              <div style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.45 }}>
                Обходит миллионы страниц для датасетов LLM. Это чистые серверные запросы, не клиенты.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid rgba(56, 189, 248, 0.6)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 35px rgba(56, 189, 248, 0.25)",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#38bdf8", marginBottom: 10 }}>
                OAI-SearchBot
              </div>
              <div style={{ fontSize: 22, color: "#f8fafc", fontWeight: 800, marginBottom: 10 }}>
                Поиск в ChatGPT Search
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.45 }}>
                Индексирует свежий контент специально для генеративных ответов с источниками.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid rgba(34, 197, 94, 0.6)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 35px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                ChatGPT-User
              </div>
              <div style={{ fontSize: 22, color: "#f8fafc", fontWeight: 800, marginBottom: 10 }}>
                Действие пользователя
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.45 }}>
                Открывает страницу в реальном времени, когда пользователь просит прочитать ссылку.
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

