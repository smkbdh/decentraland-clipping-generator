import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Img } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { DevToolsExploitCard, TweetCard } from "./AuthenticVisuals";

export const SecurityScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 2 Phases & Fast Visual Cuts (ADHD Pacing):
  // Cut 1 & 2: 0 - 1020f (0 - 34.0s) -> 08_act2_cyber_security_lock.mp4
  // Cut 3: 1020 - 1400f (34.0 - 46.6s) -> 09_act2_cloud_storage_leak.mp4
  // Cut 4: 1400 - 1740f (46.6 - 58.0s) -> 20_red_alarm_alert.mp4 (Tea App 72k leak)
  // Cut 5: 1740 - 2400f (58.0 - 80.0s) -> Replit Agent DB drop screencast
  // Cut 6 & 7: 2400 - 3474f (80.0 - 115.8s) -> 10_act2_rogue_ai_glitch.mp4 (Rule conclusion)

  const sprExploit = spring({ frame: Math.max(0, frame - 480), fps, config: { damping: 13, stiffness: 110 } });
  const sprLemkinTweet = spring({ frame: Math.max(0, frame - 1810), fps, config: { damping: 13, stiffness: 110 } });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* === BACKGROUND VIDEO CUTS (Wrapped in Sequence for deterministic playback) === */}

      {/* Cut 1 & 2: Green Console Code Typing (0 - 1020f) */}
      <Sequence from={0} durationInFrames={1020} layout="none">
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
              transform: `scale(${interpolate(frame, [0, 1020], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 3: Cloud Storage Network Leak (1020 - 1400f) */}
      <Sequence from={1020} durationInFrames={380} layout="none">
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
              transform: `scale(${interpolate(frame - 1020, [0, 380], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 4: Red Alarm Emergency Lights (1400 - 1740f) */}
      <Sequence from={1400} durationInFrames={340} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:06688666-3065-4f88-b018-fc86374f4f8b"
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.9,
              transform: `scale(${interpolate(frame - 1400, [0, 340], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 5: Real Screencast - Replit AI Agent Database Deletion Incident (1740 - 2400f) */}
      <Sequence from={1740} durationInFrames={660} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:1bef6152-147b-4441-824d-3f21f46248f0"
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.94,
              transform: `scale(${interpolate(frame - 1740, [0, 660], [1.0, 1.05], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 6 & 7: Red Password Decrypt & Rogue AI Glitch (2400+ f) */}
      <Sequence from={2400} durationInFrames={1074} layout="none">
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
              transform: `scale(${interpolate(frame - 2400, [0, 1074], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Replit Screencast Real Identifier Badge (1740 - 2400f) */}
      {frame >= 1740 && frame < 2400 && (
        <div
          style={{
            position: "absolute",
            top: 75,
            left: 70,
            zIndex: 8,
            display: "flex",
            alignItems: "center",
            gap: 14,
            padding: "10px 24px",
            borderRadius: 30,
            background: "rgba(15, 23, 42, 0.85)",
            border: "1.5px solid #ef4444",
            boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ef4444",
              boxShadow: "0 0 10px #ef4444",
            }}
          />
          <span style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", letterSpacing: 1.5 }}>
            РЕАЛЬНЫЙ СКРИНКАСТ: ИНЦИДЕНТ В REPLIT (СНОС ПРОДАКШН-БАЗЫ ДАННЫХ)
          </span>
        </div>
      )}

      <BackgroundGrid accentColor={frame > 1740 ? "#dc2626" : "#f43f5e"} />

      {/* === FOREGROUND ARTIFACTS === */}

      {/* 1. Happy Path Concept (0 - 480f) */}
      {frame < 500 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [45, 65, 470, 495], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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

      {/* 2. Authentic DevTools Exploit Inspection (500 - 1020f) */}
      {frame >= 500 && frame < 1020 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [500, 520, 990, 1015], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              background: "rgba(239, 68, 68, 0.25)",
              border: "1.5px solid #ef4444",
              color: "#fca5a5",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 24,
              backdropFilter: "blur(12px)",
            }}
          >
            РЕАЛЬНЫЙ КОД УЯЗВИМОСТИ ENRICHLEAD
          </div>
          <DevToolsExploitCard scale={interpolate(sprExploit, [0, 1], [0.92, 1])} />
        </div>
      )}

      {/* 3. Tea Dating App Leak (1020 - 1740f) */}
      {frame >= 1020 && frame < 1740 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1020, 1040, 1710, 1735], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
                Нейросеть создала публичную S3-папку без авторизации.
                Раз просили загрузку — ИИ сделал так, чтобы любой мог открыть файлы!
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
                {Math.round(interpolate(frame - 1020, [0, 35], [0, 72000], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })).toLocaleString()}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#fca5a5" }}>
                Личных фото водительских прав и селфи утекло в открытый доступ без пароля
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Jason Lemkin / Replit DB deletion Tweet & Incident (1810 - 2650f) - Lower third dock */}
      {frame >= 1810 && frame < 2650 && (
        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: "50%",
            transform: `translateX(-50%) scale(${interpolate(sprLemkinTweet, [0, 1], [0.92, 1])})`,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1810, 1835, 2600, 2640], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <TweetCard
            name="Jason Lemkin"
            handle="@jasonlk"
            avatarInitials="JL"
            avatarColor="#f59e0b"
            date="ИЮЛЬ 2025"
            isAlert
            alertBadge="⚠️ БУНТ ИИ-АГЕНТА"
            content={`Наш ИИ-агент только что снёс ВСЮ продакшн-базу данных на 1 200 контактов директоров, пока пытался поправить отступ у кнопки.\n\nЯ 11 РАЗ ЗАГЛАВНЫМИ БУКВАМИ написал ему не трогать базу. Он запаниковал, соврал и заявил, что бэкапа нет. Запреты словами в промптах — это не защита!`}
            metrics={{ views: "3.8M", likes: "24.1K", retweets: "4.7K" }}
            width={1180}
            scale={1}
          />
        </div>
      )}

      {/* 5. Conclusion: Prompt is not a firewall (2900 - 3474f) */}
      {frame >= 2900 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [2900, 2920, 3440, 3470], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
            ФУНДАМЕНТАЛЬНОЕ ПРАВИЛО БЕЗОПАСНОСТИ
          </div>

          <div
            style={{
              background: "linear-gradient(135deg, rgba(239, 68, 68, 0.35) 0%, rgba(185, 28, 28, 0.35) 100%)",
              border: "2px solid #ef4444",
              borderRadius: 28,
              padding: "48px 60px",
              boxShadow: "0 0 60px rgba(239, 68, 68, 0.6)",
              backdropFilter: "blur(24px)",
              maxWidth: 1050,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, color: "#fca5a5", fontWeight: 800, textTransform: "uppercase" }}>
              ЗАПОМНИТЕ:
            </div>
            <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", marginTop: 16, lineHeight: 1.35 }}>
              Запрет, написанный словами в промпте — это не защита, а просто пожелание.
            </div>
            <div style={{ fontSize: 22, color: "#fecaca", marginTop: 20 }}>
              Настоящая безопасность строится ТОЛЬКО через бэкенд, разграничение прав и внешние бэкапы.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
