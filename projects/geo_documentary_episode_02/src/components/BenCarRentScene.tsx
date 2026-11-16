import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const BenCarRentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL & REAL WEBSITE SCREENSHOTS */}
      
      {/* 0 - 38s: Real Website Screenshot benphuketcarrent.com */}
      <Sequence from={0} durationInFrames={Math.round(38 * fps)} layout="none">
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
              opacity: 0.28,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame, [0, 38 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 38 - 78s: Real Home Page Screenshot & Bot UTM Notification */}
      <Sequence from={Math.round(38 * fps)} durationInFrames={Math.round(40 * fps)} layout="none">
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
              transform: `scale(${interpolate(frame - 38 * fps, [0, 40 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 78s+: Phuket Road & Cars B-Roll */}
      <Sequence from={Math.round(78 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("b_roll_phuket_car.mp4")} loop muted
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

      {/* PHASE 1 (0 - 38s): System Intro & Live UTM Chat */}
      {sec < 38 && (
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
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1.5px solid rgba(16, 185, 129, 0.5)",
              color: "#34d399",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            КЛИЕНТСКИЙ КЕЙС 01 · АРЕНДА АВТО НА ПХУКЕТЕ
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
            BENPHUKETCARRENT.COM: ЖИВЫЕ ЗАЯВКИ ИЗ CHATGPT
          </h2>

          <div
            style={{
              display: "flex",
              gap: 36,
              maxWidth: 1300,
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: "36px",
                boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 20, color: "#94a3b8", fontWeight: 800, marginBottom: 10 }}>
                ЧТО МЫ ПОСТРОИЛИ ДЛЯ КЛИЕНТА
              </div>
              <div style={{ fontSize: 34, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                Инженерная архитектура под поиск
              </div>
              <div style={{ fontSize: 24, color: "#cbd5e1", lineHeight: 1.45 }}>
                Страницы под каждую модель, прозрачные условия депозитов, страховка, локальные гиды и сквозная UTM-атрибуция.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2.5px solid #10b981",
                borderRadius: 24,
                padding: "36px",
                boxShadow: "0 0 40px rgba(16, 185, 129, 0.3)",
              }}
            >
              <div style={{ fontSize: 20, color: "#34d399", fontWeight: 800, marginBottom: 10 }}>
                УВЕДОМЛЕНИЕ В БОТ КОМАНДЫ
              </div>
              <div style={{ fontSize: 34, fontWeight: 900, color: "#10b981", marginBottom: 14 }}>
                Источник: AI · ChatGPT
              </div>
              <div style={{ fontSize: 24, color: "#cbd5e1", lineHeight: 1.45 }}>
                Запрос мгновенно падает менеджерам с меткой <code style={{ color: "#38bdf8", fontWeight: 900 }}>utm_source=chatgpt.com</code> и ссылкой на машину.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2 (38 - 78s): 38 WhatsApp + 6 Direct Bookings */}
      {sec >= 38 && sec < 78 && (
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
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              border: "1.5px solid rgba(16, 185, 129, 0.5)",
              color: "#34d399",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ФАКТИЧЕСКИЕ ДАННЫЕ ЗА 2 МЕСЯЦА
          </div>

          <h2
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 40px",
            }}
          >
            ТОЧНЫЕ СЛЕДЫ ИЗ НЕЙРОСЕТИ В СИСТЕМЕ
          </h2>

          <div style={{ display: "flex", gap: 40, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2.5px solid #22c55e",
                borderRadius: 24,
                padding: "40px",
                textAlign: "center",
                boxShadow: "0 0 45px rgba(34, 197, 94, 0.3)",
              }}
            >
              <div style={{ fontSize: 20, color: "#86efac", fontWeight: 900, marginBottom: 12 }}>
                ПЕРЕХОДЫ В WHATSAPP
              </div>
              <div style={{ fontSize: 112, fontWeight: 900, color: "#22c55e", letterSpacing: -2, lineHeight: 1.0, margin: "10px 0" }}>
                {Math.round(interpolate(frame - 38 * fps, [0, 24], [0, 38], { extrapolateRight: "clamp" }))}
              </div>
              <div style={{ fontSize: 24, color: "#f8fafc", fontWeight: 700 }}>
                Клиенты с меткой ChatGPT
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2.5px solid #38bdf8",
                borderRadius: 24,
                padding: "40px",
                textAlign: "center",
                boxShadow: "0 0 45px rgba(56, 189, 248, 0.3)",
              }}
            >
              <div style={{ fontSize: 20, color: "#7dd3fc", fontWeight: 900, marginBottom: 12 }}>
                ПРЯМЫЕ ЗАПРОСЫ НА БРОНЬ
              </div>
              <div style={{ fontSize: 112, fontWeight: 900, color: "#38bdf8", letterSpacing: -2, lineHeight: 1.0, margin: "10px 0" }}>
                {Math.round(interpolate(frame - 38 * fps, [8, 28], [0, 6], { extrapolateRight: "clamp" }))}
              </div>
              <div style={{ fontSize: 24, color: "#f8fafc", fontWeight: 700 }}>
                Заполненные формы с датами
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3 (78s+): 100% Fleet Booked */}
      {sec >= 78 && (
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
              backgroundColor: "rgba(234, 179, 8, 0.2)",
              border: "1.5px solid rgba(234, 179, 8, 0.5)",
              color: "#facc15",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            БИЗНЕС-РЕЗУЛЬТАТ В ДЕНЬГАХ
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
            ВЕСЬ АВТОПАРК КЛИЕНТА СДАН НА НЕДЕЛИ ВПЕРЁД
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "2px solid #facc15",
              borderRadius: 24,
              padding: "44px 60px",
              maxWidth: 1200,
              textAlign: "center",
              boxShadow: "0 0 45px rgba(250, 204, 21, 0.3)",
            }}
          >
            <div style={{ fontSize: 34, color: "#f8fafc", fontWeight: 800, lineHeight: 1.4, marginBottom: 20 }}>
              Спрос превысил физическую ёмкость парка. Новые заявки клиент передаёт партнёрским агентствам за комиссию.
            </div>
            <div style={{ fontSize: 26, color: "#38bdf8", fontWeight: 800 }}>
              ➔ Разница между «нас просканировал бот» и полностью забитой сеткой броней
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


