import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TweetCard, DealProofCard } from "./AuthenticVisuals";

export const HookScene: React.FC = () => {
  const timelineFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Align the existing shot/card sequence to the recorded narration's topic changes.
  const frame = interpolate(
    timelineFrame,
    [0, 12.8, 22.4, 27.4, 34.4, 38.5, 53.3, 62.2, 79.5].map((s) => s * fps),
    [0, 450, 780, 1080, 1380, 1560, 1860, 2160, 2385],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Act 0 Duration: 0 - 2385 frames (0 - 79.5s)
  // Dynamic Cut Timings:
  // Cut 1: 0 - 210f (0 - 7.0s) -> 01_hook_coding.mp4
  // Cut 2: 210 - 450f (7.0 - 15.0s) -> 19_cursor_claude_ai.mp4
  // Cut 3: 450 - 780f (15.0 - 26.0s) -> 02_hook_startup_deal.mp4
  // Cut 4: 780 - 1080f (26.0 - 36.0s) -> 18_money_counting.mp4
  // Cut 5: 1080 - 1380f (36.0 - 46.0s) -> 19_cursor_claude_ai.mp4
  // Cut 6: 1380 - 1560f (46.0 - 52.0s) -> 20_red_alarm_alert.mp4
  // Cut 7: 1560 - 1860f (52.0 - 62.0s) -> 02_hook_startup_deal.mp4
  // Cut 8: 1860 - 2160f (62.0 - 72.0s) -> 03_hook_hacker_breach.mp4
  // Cut 9: 2160 - 2385f (72.0 - 79.5s) -> 21_system_error_glitch.mp4

  // Kinetic Counter for $80M
  const base44Val = Math.floor(
    interpolate(frame - 780, [10, 60], [0, 80000000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  ).toLocaleString("en-US");

  // Spring animations for cards
  const sprMyth = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const sprDeal = spring({ frame: Math.max(0, frame - 450), fps, config: { damping: 13, stiffness: 110 } });
  const sprMoney = spring({ frame: Math.max(0, frame - 780), fps, config: { damping: 12, stiffness: 100 } });
  const sprTweet1 = spring({ frame: Math.max(0, frame - 1560), fps, config: { damping: 13, stiffness: 110 } });
  const sprTweet2 = spring({ frame: Math.max(0, frame - 1860), fps, config: { damping: 12, stiffness: 120 } });
  const sprDead = spring({ frame: Math.max(0, frame - 2160), fps, config: { damping: 14, stiffness: 130 } });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* === BACKGROUND VIDEO CUTS (Cuts every 6-10s for ADHD Retention) === */}

      {/* Cut 1: Coding in dark (0 - 210f) */}
      {frame < 210 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:5ed06774-ca93-4da1-95b8-c9eae24ea395"
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
              transform: `scale(${interpolate(frame, [0, 210], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* Cut 2: Cursor & Claude AI generation (210 - 450f) */}
      {frame >= 210 && frame < 450 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:ddeadb81-5f52-4e53-8605-51596542b969"
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
              transform: `scale(${interpolate(frame - 210, [0, 240], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* Cut 3: Modern Tech Startup Office (450 - 780f) */}
      {frame >= 450 && frame < 780 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:be3479bf-b082-4f45-9b24-cceaf9de8a69"
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
              transform: `scale(${interpolate(frame - 450, [0, 330], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* Cut 4: Real Interview - Maor Shlomo ($80M Base44 exit to Wix) (780 - 1080f) */}
      {frame >= 780 && frame < 1080 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:2236f9b8-78f8-4fb7-a36a-e414e77389ec"
            loop
            muted
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.92,
              transform: `scale(${interpolate(frame - 780, [0, 300], [1.0, 1.06])})`,
            }}
          />
        </div>
      )}

      {/* Cut 5: Claude & Cursor Code Architecture (1080 - 1380f) */}
      {frame >= 1080 && frame < 1380 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:ddeadb81-5f52-4e53-8605-51596542b969"
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
              transform: `scale(${interpolate(frame - 1080, [0, 300], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* Cut 6: Red Warning Alarm (1380 - 1560f) */}
      {frame >= 1380 && frame < 1560 && (
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
              opacity: 0.88,
              transform: `scale(${interpolate(frame - 1380, [0, 180], [1.0, 1.08])})`,
            }}
          />
        </div>
      )}

      {/* Cut 7: Leo Acevedo Launch (1560 - 1860f) */}
      {frame >= 1560 && frame < 1860 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:be3479bf-b082-4f45-9b24-cceaf9de8a69"
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
              transform: `scale(${interpolate(frame - 1560, [0, 300], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* Cut 8: Hacker Breach (1860 - 2160f) */}
      {frame >= 1860 && frame < 2160 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:c4d4f55d-3f6a-452a-9c46-9dca94c42485"
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
              transform: `scale(${interpolate(frame - 1860, [0, 300], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* Cut 9: Digital Glitch & System Failure (2160 - 2385f) */}
      {frame >= 2160 && timelineFrame < 65.4 * fps && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:de38286f-c11b-46ff-9911-9f051670b212"
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
              transform: `scale(${interpolate(frame - 2160, [0, 225], [1.0, 1.08])})`,
            }}
          />
        </div>
      )}
      {timelineFrame >= 65.4 * fps && (
        <div style={{ position: "absolute", inset: 0, zIndex: 20, background: "rgba(7, 9, 14, 0.93)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, textAlign: "center" }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#38bdf8", letterSpacing: 4 }}>AI БУДДА</div>
          <div style={{ fontSize: 82, fontWeight: 900, color: "#ffffff", maxWidth: 1400, lineHeight: 1.12 }}>Как строить AI-системы, которые работают?</div>
          <div style={{ fontSize: 38, color: "#cbd5e1" }}>Экономика токенов · безопасность · агентная инженерия</div>
        </div>
      )}

      {/* Ambient Grid overlay */}
      <BackgroundGrid accentColor={frame > 1380 ? "#ef4444" : "#6366f1"} />

      {/* === FOREGROUND CARDS & AUTHENTIC ARTIFACTS === */}

      {/* 1. Myth Card & Prompt Console (0 - 440f) */}
      {frame < 450 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [0, 15, 420, 445], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(sprMyth, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(99, 102, 241, 0.35)",
              border: "1.5px solid rgba(99, 102, 241, 0.7)",
              color: "#a5b4fc",
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 32,
              backdropFilter: "blur(16px)",
              boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
            }}
          >
            МИФ: «ПРОГРАММИСТЫ БОЛЬШЕ НЕ НУЖНЫ»
          </div>

          <div
            style={{
              width: 950,
              background: "rgba(15, 23, 42, 0.92)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 24,
              padding: 40,
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ef4444" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#f59e0b" }} />
              <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#10b981" }} />
              <span style={{ marginLeft: 16, color: "#94a3b8", fontSize: 18, fontFamily: "monospace", fontWeight: 700 }}>
                cursor-agent-prompt.tsx
              </span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 28, color: "#38bdf8", lineHeight: 1.6, fontWeight: 700 }}>
              <span style={{ color: "#94a3b8" }}>&gt;</span> "Собери мне сервис за вечер через нейросеть"
            </div>
            <div style={{ marginTop: 24, padding: 20, background: "rgba(0,0,0,0.5)", borderRadius: 14, fontFamily: "monospace", fontSize: 22, color: "#a7f3d0" }}>
              ✓ Генерация архитектуры: 100%<br />
              ✓ Подключение базы данных: OK<br />
              ✓ Готово к миллионной выручке? <span style={{ color: "#f87171", fontWeight: 800 }}>[РЕАЛЬНОСТЬ ДРУГАЯ]</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Latka Deal Proof: Wix buys Base44 for $80M (450 - 780f) */}
      {frame >= 450 && frame < 780 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [450, 470, 750, 775], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <DealProofCard scale={interpolate(sprDeal, [0, 1], [0.92, 1])} />
        </div>
      )}

      {/* 3. Massive $80,000,000 Cash Counter (780 - 1080f) */}
      {frame >= 780 && frame < 1080 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [780, 800, 1050, 1075], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(sprMoney, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              background: "rgba(16, 185, 129, 0.25)",
              border: "1.5px solid rgba(16, 185, 129, 0.6)",
              color: "#34d399",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
              backdropFilter: "blur(12px)",
            }}
          >
            СДЕЛКА ГОДА • ПОЛНАЯ ВЫПЛАТА НАЛИЧНЫМИ
          </div>
          <div
            style={{
              fontSize: 92,
              fontWeight: 900,
              color: "#10b981",
              fontVariantNumeric: "tabular-nums",
              textShadow: "0 0 50px rgba(16, 185, 129, 0.5), 0 0 100px rgba(16, 185, 129, 0.2)",
              marginBottom: 16,
            }}
          >
            ${base44Val}
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#f8fafc", textAlign: "center", maxWidth: 900, lineHeight: 1.4 }}>
            Маор Шломо запустил сервис за полгода до продажи • Без инвесторов и платной рекламы
          </div>
        </div>
      )}

      {/* 4. Claude 3.5 Sonnet & Cursor Zero-Code Stat (1080 - 1380f) */}
      {frame >= 1080 && frame < 1380 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1080, 1100, 1350, 1375], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              background: "rgba(15, 23, 42, 0.94)",
              border: "1.5px solid rgba(56, 189, 248, 0.5)",
              borderRadius: 24,
              padding: "60px 72px",
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(20px)",
              width: 1160,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, color: "#38bdf8", fontWeight: 800, letterSpacing: 3 }}>ТРИ МЕСЯЦА РАБОТЫ</div>
            <div style={{ fontSize: 88, fontWeight: 900, color: "#ffffff", marginTop: 20, lineHeight: 1.05 }}>Cursor + Claude</div>
            <div style={{ fontSize: 42, color: "#e2e8f0", marginTop: 28, lineHeight: 1.2 }}>Фронтенд-код генерировал AI</div>
          </div>
        </div>
      )}

      {/* 5. Dramatic Reality Pause (1380 - 1560f) */}
      {frame >= 1380 && frame < 1560 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1380, 1400, 1530, 1555], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              background: "rgba(239, 68, 68, 0.3)",
              border: "1.5px solid rgba(239, 68, 68, 0.8)",
              color: "#f87171",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 24,
              backdropFilter: "blur(14px)",
              boxShadow: "0 0 25px rgba(239, 68, 68, 0.4)",
            }}
          >
            О ЧЕМ МОЛЧАТ ПРОДАВЦЫ КУРСОВ
          </div>
          <h2 style={{ fontSize: 62, fontWeight: 900, color: "#ffffff", textAlign: "center", maxWidth: 1100, lineHeight: 1.25, margin: 0 }}>
            9 из 10 таких проектов обречены на крах в первые дни
          </h2>
        </div>
      )}

      {/* 6. Authentic Tweet 1: Leo Acevedo Launch (1560 - 1860f) */}
      {frame >= 1560 && frame < 1860 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1560, 1580, 1830, 1855], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <TweetCard
            name="Leo Acevedo"
            handle="@leojr94_"
            avatarInitials="LA"
            avatarColor="#3b82f6"
            date="14 июн. 2025"
            content={`Собрал сервис Enrichlead в редакторе Cursor.\n\nНоль строк ручного кода. И люди уже платят! Вайбкодинг — это будущее, пока все спорят 🚀`}
            metrics={{ views: "840K", likes: "4.2K", retweets: "612" }}
            scale={interpolate(sprTweet1, [0, 1], [0.92, 1])}
          />
        </div>
      )}

      {/* 7. Authentic Tweet 2: Leo Acevedo Got Hacked (1860 - 2160f) */}
      {frame >= 1860 && frame < 2160 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1860, 1880, 2130, 2155], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <TweetCard
            name="Leo Acevedo"
            handle="@leojr94_"
            avatarInitials="LA"
            avatarColor="#ef4444"
            date="48 ЧАСОВ СПУСТЯ"
            isAlert
            alertBadge="🚨 ВЗЛОМ СИСТЕМЫ"
            content={`Ребята, меня взломали. Ключи API сожжены в ноль, люди обходят оплату прямо в консоли и пишут мусор в базу.\n\nЯ не технарь, не знаю что делать... ПОМОГИТЕ`}
            metrics={{ views: "2.1M", likes: "14.8K", retweets: "3.4K" }}
            scale={interpolate(sprTweet2, [0, 1], [0.92, 1])}
          />
        </div>
      )}

      {/* 8. Service Terminated Forever Card (2160 - 2385f) */}
      {frame >= 2160 && timelineFrame < 65.4 * fps && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [2160, 2180, 2360, 2385], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(sprDead, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              background: "rgba(239, 68, 68, 0.35)",
              border: "1.5px solid #ef4444",
              color: "#fca5a5",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
              backdropFilter: "blur(14px)",
            }}
          >
            ФИНАЛ: ПРОЕКТ ЗАКРЫТ НАВСЕГДА
          </div>
          <div
            style={{
              width: 1120,
              background: "rgba(15, 23, 42, 0.94)",
              border: "1.5px solid rgba(239, 68, 68, 0.6)",
              borderRadius: 24,
              padding: "36px 40px",
              textAlign: "center",
              boxShadow: "0 30px 70px rgba(0, 0, 0, 0.9), 0 0 40px rgba(239, 68, 68, 0.3)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div style={{ fontSize: 66, fontWeight: 900, color: "#ffffff", marginBottom: 20, lineHeight: 1.1 }}>
              От запуска до закрытия — 72 часа
            </div>
            <p style={{ fontSize: 34, color: "#e2e8f0", lineHeight: 1.3, margin: 0 }}>
              Уязвимости в оплате и доступе остановили сервис.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
