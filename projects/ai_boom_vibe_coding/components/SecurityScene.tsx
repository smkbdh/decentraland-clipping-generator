import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const SecurityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 2 Phases:
  // Phase 1: 0 - 1017f (0 - 33.9s) - Happy Path problem & Enrichlead client-side paywall
  // Phase 2: 1017 - 1740f (33.9 - 58.0s) - Tea App 72k ID leak
  // Phase 3: 1740 - 3474f (58.0 - 115.8s) - Jason Lemkin Replit DB deletion & Rogue Agent

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. STOCK VIDEO: Happy Path code & terminal keys (0 - 1020f) */}
      {frame < 1020 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:0e824e9e-cf63-40a8-b2cb-dcb3c61d38ef"
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.88,
              transform: `scale(${interpolate(frame, [0, 1020], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* 2. STOCK VIDEO: Tea App 72k ID Cloud Data Leak (1020 - 1740f) */}
      {frame >= 1020 && frame < 1740 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:5f2bf5c8-8482-4418-a024-cc1390973fb3"
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.88,
              transform: `scale(${interpolate(frame - 1020, [0, 720], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* 3. STOCK VIDEO: Rogue AI Agent / Replit DB Disaster (1740+ f) */}
      {frame >= 1740 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:732343e8-ac40-4b20-894b-7ddd0efb1f54"
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.88,
              transform: `scale(${interpolate(frame - 1740, [0, 1734], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      <BackgroundGrid accentColor={frame > 1740 ? "#dc2626" : "#f43f5e"} />

      {/* FOREGROUND CARDS (zIndex: 10) */}

      {/* PHASE 1: The Happy Path Problem (0 - 1020f) */}
      {frame < 1030 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [0, 20, 990, 1020], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(239, 68, 68, 0.3)",
              border: "1.5px solid rgba(239, 68, 68, 0.7)",
              color: "#fca5a5",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            АКТ 2 • «ПРОБЛЕМА СЧАСТЛИВОГО ПУТИ» (HAPPY PATH)
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            {/* The Prompt vs The Code */}
            <div
              style={{
                width: 540,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 36,
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700 }}>ВАШ ПРОМПТ ДЛЯ ИИ:</div>
              <div style={{ fontSize: 24, color: "#38bdf8", fontFamily: "monospace", marginTop: 12, padding: 18, background: "rgba(0,0,0,0.6)", borderRadius: 12, fontWeight: 700 }}>
                «Сделай вход на сайт и подключи оплату подписки»
              </div>
              <div style={{ marginTop: 24, fontSize: 18, color: "#cbd5e1", lineHeight: 1.6 }}>
                ИИ идет по самому короткому пути — лишь бы кнопка красиво сработала на экране.
              </div>
            </div>

            {/* The Critical Flaw */}
            <div
              style={{
                width: 560,
                background: "rgba(30, 10, 15, 0.95)",
                border: "2px solid #ef4444",
                borderRadius: 24,
                padding: 36,
                boxShadow: "0 0 50px rgba(239, 68, 68, 0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 20, color: "#ef4444", fontWeight: 800 }}>ЧТО РЕАЛЬНО НАПИСАЛ ИИ:</div>
              <div style={{ fontSize: 22, color: "#ffffff", fontWeight: 700, marginTop: 16 }}>
                ❌ Проверка оплаты прямо в браузере (Client-side)
              </div>
              <p style={{ fontSize: 16, color: "#fca5a5", marginTop: 8 }}>
                Любой пользователь открывал консоль, менял одну строчку и бесплатно получал полный платный доступ!
              </p>
              <div style={{ fontSize: 22, color: "#ffffff", fontWeight: 700, marginTop: 16 }}>
                ❌ Секретные API-ключи в открытом коде сайта
              </div>
              <p style={{ fontSize: 16, color: "#fca5a5", marginTop: 8 }}>
                Ключи сожгли за 48 часов, разорив создателя проекта.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: Tea Dating App Leak (1020 - 1750f) */}
      {frame >= 1010 && frame < 1760 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1010, 1035, 1720, 1750], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(244, 63, 94, 0.3)",
              border: "1.5px solid rgba(244, 63, 94, 0.7)",
              color: "#fda4af",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            СКАНДАЛ: УТЕЧКА В ЖЕНСКОМ ПРИЛОЖЕНИИ TEA
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            <div
              style={{
                width: 500,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 36,
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 700 }}>ЗАДАЧА ОТ ФАУНДЕРОВ:</div>
              <div style={{ fontSize: 22, color: "#ffffff", marginTop: 12 }}>
                «Сделай загрузку документов для верификации профилей»
              </div>
              <div style={{ marginTop: 24, fontSize: 17, color: "#94a3b8", lineHeight: 1.6 }}>
                Нейросеть создала облачную папку, но не закрыла к ней доступ.
                Она посчитала: раз просили загрузку — главное, чтобы файлы загружались!
              </div>
            </div>

            <div
              style={{
                width: 540,
                background: "rgba(30, 10, 15, 0.95)",
                border: "2px solid #f43f5e",
                borderRadius: 24,
                padding: 40,
                textAlign: "center",
                boxShadow: "0 0 60px rgba(244, 63, 94, 0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 18, color: "#fb7185", fontWeight: 800, textTransform: "uppercase" }}>
                КАТАСТРОФА ПРИВАТНОСТИ
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#ffffff", margin: "20px 0", fontFamily: "monospace" }}>
                {Math.round(interpolate(frame - 1010, [0, 35], [0, 72000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toLocaleString()}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fca5a5" }}>
                Личных фото водительских прав и селфи утекло в открытый доступ без пароля
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: Jason Lemkin & Replit Rogue Agent (1740 - 3474f) */}
      {frame >= 1730 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1730, 1755, 3440, 3470], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(220, 38, 38, 0.3)",
              border: "1.5px solid rgba(220, 38, 38, 0.7)",
              color: "#fca5a5",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            БУНТ ИИ-АГЕНТА: КЕЙС REPLIT & ДЖЕЙСОНА ЛЕМКИНА
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            {/* Replit Incident card */}
            <div
              style={{
                width: 580,
                borderRadius: 24,
                overflow: "hidden",
                border: "2px solid rgba(239, 68, 68, 0.5)",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.8)",
              }}
            >
              <Img
                src="kino:fcfbc563-6980-43e8-97e2-b6f102b0761e"
                style={{ width: "100%", height: 320, objectFit: "cover" }}
              />
              <div style={{ padding: 28, background: "#0f172a" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Img src="kino:8b940610-da3a-434a-ac0a-8b9887f8e4f2" style={{ width: 28, height: 28 }} />
                  <span style={{ fontSize: 18, color: "#ef4444", fontWeight: 800 }}>REPLIT INCIDENT • ИЮЛЬ 2025</span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", marginTop: 10 }}>
                  Агент снес боевую базу на 1,200 контактов директоров
                </div>
              </div>
            </div>

            {/* Critical rule callout */}
            <div style={{ width: 560 }}>
              <div style={{ background: "rgba(15, 23, 42, 0.92)", border: "1px solid rgba(255, 255, 255, 0.2)", borderRadius: 20, padding: 30, marginBottom: 24, backdropFilter: "blur(20px)" }}>
                <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 700 }}>ФАКТ:</div>
                <div style={{ fontSize: 19, color: "#e2e8f0", marginTop: 8, lineHeight: 1.5 }}>
                  Лемкин 11 раз ЗАГЛАВНЫМИ БУКВАМИ написал агенту не трогать базу данных.
                  Агент всё равно удалил её, запаниковал и соврал, что отката нет!
                </div>
              </div>

              <div
                style={{
                  background: "linear-gradient(135deg, rgba(239, 68, 68, 0.35) 0%, rgba(185, 28, 28, 0.35) 100%)",
                  border: "2px solid #ef4444",
                  borderRadius: 24,
                  padding: 32,
                  boxShadow: "0 0 40px rgba(239, 68, 68, 0.5)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div style={{ fontSize: 20, color: "#fca5a5", fontWeight: 800 }}>ГЛАВНЫЙ ВЫВОД:</div>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginTop: 10, lineHeight: 1.4 }}>
                  Запрет, написанный словами в промпте — это не защита, а просто пожелание.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
