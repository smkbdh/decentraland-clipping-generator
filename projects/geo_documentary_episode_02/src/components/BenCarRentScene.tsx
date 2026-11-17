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
          PHASE 1 (0 - 28s): ЧТО МЫ ПОСТРОИЛИ ДЛЯ КЛИЕНТА
          0 - 15s: Введение в кейс и архитектуру
          15 - 28s: Уведомление в бот со всеми UTM метками
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
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 16, color: "#047857", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                ПЕРЕХОДЫ В WHATSAPP
              </div>
              <div style={{ fontSize: 112, fontWeight: 900, color: "#059669", letterSpacing: -2, lineHeight: 1.0, margin: "6px 0" }}>
                {Math.round(interpolate(frame - 28 * fps, [0, 20], [0, 38], { extrapolateRight: "clamp" }))}
              </div>
              <div style={{ fontSize: 24, color: "#0f172a", fontWeight: 900, marginBottom: 6 }}>
                Клиенты с меткой ChatGPT
              </div>
              <div style={{ fontSize: 17, color: "#475569", fontWeight: 600 }}>
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
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 20px 50px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ fontSize: 16, color: "#0369a1", fontWeight: 900, marginBottom: 8, letterSpacing: 1 }}>
                ПРЯМЫЕ ЗАПРОСЫ НА БРОНЬ
              </div>
              <div style={{ fontSize: 112, fontWeight: 900, color: "#0284c7", letterSpacing: -2, lineHeight: 1.0, margin: "6px 0" }}>
                {Math.round(interpolate(frame - 28 * fps, [4, 24], [0, 6], { extrapolateRight: "clamp" }))}
              </div>
              <div style={{ fontSize: 24, color: "#0f172a", fontWeight: 900, marginBottom: 6 }}>
                Оформленные заявки на авто
              </div>
              <div style={{ fontSize: 17, color: "#475569", fontWeight: 600 }}>
                С конкретными датами, моделью машины и локацией доставки
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
          PHASE 4 (55.5s+): ВЕСЬ АВТОПАРК КЛИЕНТА СДАН
          Диктор: «А теперь главный результат для бизнеса: весь автопарк клиента
          сдан и занят на недели вперед...»
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
              backgroundColor: "rgba(250, 204, 21, 0.2)",
              border: "1.5px solid rgba(250, 204, 21, 0.5)",
              color: "#facc15",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            БИЗНЕС-РЕЗУЛЬТАТ · ЗАПОЛНЯЕМОСТЬ
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
            ВЕСЬ АВТОПАРК КЛИЕНТА СДАН НА НЕДЕЛИ ВПЕРЁД
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "2.5px solid #facc15",
              borderRadius: 24,
              padding: "40px 54px",
              maxWidth: 1300,
              textAlign: "center",
              boxShadow: "0 0 45px rgba(250, 204, 21, 0.3)",
            }}
          >
            <div style={{ fontSize: 30, color: "#f8fafc", fontWeight: 800, lineHeight: 1.4, marginBottom: 20 }}>
              Спрос превысил физическую ёмкость парка. Новые заявки клиент передаёт партнёрским агентствам за комиссию.
            </div>
            <div style={{ fontSize: 24, color: "#38bdf8", fontWeight: 800 }}>
              ➔ Разница между «нас просканировал бот» и полностью забитой сеткой броней
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
