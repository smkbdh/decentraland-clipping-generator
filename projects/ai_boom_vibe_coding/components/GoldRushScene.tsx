import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TweetCard, TokenInvoiceCard } from "./AuthenticVisuals";

export const GoldRushScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 1 Phases & Dynamic Video Cuts:
  // Cut 1: 0 - 320f (0 - 10.6s) -> 22_silicon_valley_keynote.mp4 (Karpathy Keynote)
  // Cut 2: 320 - 870f (10.6 - 29.0s) -> 04_act1_ai_network.mp4 (AI Synapse)
  // Cut 3: 870 - 1250f (29.0 - 41.6s) -> 23_amazon_warehouse_logistics.mp4 (Amazon / Launch Fast)
  // Cut 4: 1250 - 1620f (41.6 - 54.0s) -> 05_act1_analytics_growth.mp4 (Growth)
  // Cut 5: 1620 - 2000f (54.0 - 66.6s) -> 24_credit_card_burn.mp4 (Credit card / Token Burn)
  // Cut 6: 2000 - 2870f (66.6 - 95.6s) -> 06_act1_server_token_cost.mp4 (Server Racks)
  // Cut 7: 2870 - 3350f (95.6 - 111.6s) -> 07_act1_microchip_gpu.mp4 (Microchip CPU)
  // Cut 8: 3350 - 3837f (111.6 - 127.9s) -> 05_act1_analytics_growth.mp4 (Wix -$76M Loss)

  const sprTweetKarpathy = spring({ frame: Math.max(0, frame - 50), fps, config: { damping: 13, stiffness: 110 } });
  const sprStats = spring({ frame: Math.max(0, frame - 340), fps, config: { damping: 13, stiffness: 110 } });
  const sprInvoice = spring({ frame: Math.max(0, frame - 2000), fps, config: { damping: 12, stiffness: 100 } });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* === BACKGROUND VIDEO CUTS (Wrapped in Sequence for reliable playback) === */}

      {/* Cut 1: Real Talk - Andrej Karpathy on Vibe Coding (0 - 320f) */}
      <Sequence from={0} durationInFrames={320} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:ba2a1911-33c4-42cc-ae01-9b485a066c3e"
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
              transform: `scale(${interpolate(frame, [0, 320], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 2: AI Neural Network Synapses (320 - 870f) */}
      <Sequence from={320} durationInFrames={550} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:8b6955c5-e85a-4b85-a46a-237ad825379d"
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
              transform: `scale(${interpolate(frame - 320, [0, 550], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 3: Amazon Automated Logistics (870 - 1250f) */}
      <Sequence from={870} durationInFrames={380} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:acc1c6d8-d4bb-485f-9fc0-7675b51f9951"
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
              transform: `scale(${interpolate(frame - 870, [0, 380], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 4: Revenue & Growth Analytics (1250 - 1620f) */}
      <Sequence from={1250} durationInFrames={370} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:9ce31523-3176-4e9a-adc4-0c1da47cd205"
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
              transform: `scale(${interpolate(frame - 1250, [0, 370], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 5: Burning Money & Digital Card Payment (1620 - 2000f) */}
      <Sequence from={1620} durationInFrames={380} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:3a6e45a8-acd0-4eed-904b-113bdf770d48"
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
              transform: `scale(${interpolate(frame - 1620, [0, 380], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 6: Server Room Hardware & Fiber Lights (2000 - 2870f) */}
      <Sequence from={2000} durationInFrames={870} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:9c721104-c22d-43fb-86af-fb5d37bf181b"
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
              transform: `scale(${interpolate(frame - 2000, [0, 870], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 7: Microchip Processor & GPU Scale (2870 - 3350f) */}
      <Sequence from={2870} durationInFrames={480} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:1464ee73-c2a4-4904-b1cf-3c765330d068"
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
              transform: `scale(${interpolate(frame - 2870, [0, 480], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Cut 8: Wix Crash & Financial Report (3350 - 3837f) */}
      <Sequence from={3350} durationInFrames={487} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:9ce31523-3176-4e9a-adc4-0c1da47cd205"
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
              transform: `scale(${interpolate(frame - 3350, [0, 487], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* Live Stage Presenter Badge for Karpathy (0 - 320f) */}
      {frame < 320 && (
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
            border: "1.5px solid #10b981",
            boxShadow: "0 0 30px rgba(16, 185, 129, 0.35)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#10b981",
              boxShadow: "0 0 10px #10b981",
            }}
          />
          <span style={{ fontSize: 20, fontWeight: 900, color: "#ffffff", letterSpacing: 1.5 }}>
            ЖИВОЕ ВЫСТУПЛЕНИЕ: АНДРЕЙ КАРПАТЫ (EX-OPENAI & TESLA)
          </span>
        </div>
      )}

      <BackgroundGrid accentColor={frame > 1620 ? "#f59e0b" : "#3b82f6"} />

      {/* === FOREGROUND ARTIFACTS === */}

      {/* 1. Andrej Karpathy Tweet (45 - 320f) */}
      {frame >= 45 && frame < 330 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [45, 65, 305, 325], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <TweetCard
            name="Andrej Karpathy"
            handle="@karpathy"
            avatarInitials="AK"
            avatarColor="#10a37f"
            date="15 февр. 2025"
            content={`Появился новый способ разработки, который я называю «вайб-кодинг» — когда ты полностью отдаёшься вайбу и позволяешь ИИ писать весь код.\n\nЯ просто смотрю, говорю в чат, копирую и запускаю — и это в основном работает.`}
            metrics={{ views: "14.2M", likes: "68.4K", retweets: "9.2K" }}
            scale={interpolate(sprTweetKarpathy, [0, 1], [0.86, 0.92])}
          />
        </div>
      )}

      {/* 2. Market Stats $4.7B & 63% Non-Coders (320 - 870f) */}
      {frame >= 320 && frame < 870 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [320, 340, 840, 865], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            transform: `scale(${interpolate(sprStats, [0, 1], [0.92, 1])})`,
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(59, 130, 246, 0.35)",
              border: "1.5px solid rgba(59, 130, 246, 0.7)",
              color: "#93c5fd",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            ИССЛЕДОВАНИЕ TASKADE • РЫНОК 2026
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            <div
              style={{
                width: 480,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 40,
                textAlign: "center",
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                Объем рынка
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#38bdf8", margin: "16px 0", fontFamily: "monospace" }}>
                $4.7B
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1" }}>
                Создание программ простыми словами в чате
              </div>
            </div>

            <div
              style={{
                width: 480,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(168, 85, 247, 0.5)",
                borderRadius: 24,
                padding: 40,
                textAlign: "center",
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>
                Доля не-программистов
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#a855f7", margin: "16px 0", fontFamily: "monospace" }}>
                63%
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1" }}>
                Предприниматели, маркетологи, продакты
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Launch Fast ($22k) & Sabrina Matos ($38k) (870 - 1620f) */}
      {frame >= 870 && frame < 1620 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [870, 890, 1590, 1615], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(16, 185, 129, 0.3)",
              border: "1.5px solid rgba(16, 185, 129, 0.7)",
              color: "#6ee7b7",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            РЕАЛЬНЫЕ УСПЕШНЫЕ КЕЙСЫ (БЕЗ НАЙМА КОДЕРОВ)
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            <div
              style={{
                width: 520,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 36,
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>Launch Fast</span>
                <span style={{ fontSize: 16, background: "rgba(56, 189, 248, 0.25)", color: "#38bdf8", padding: "6px 14px", borderRadius: 12, fontWeight: 700 }}>Cursor AI</span>
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", marginTop: 8 }}>
                Аналитика для продавцов Amazon за 3 месяца
              </div>
              <div style={{ fontSize: 64, fontWeight: 900, color: "#10b981", margin: "24px 0 12px 0", fontFamily: "monospace" }}>
                ${Math.round(interpolate(frame - 870, [0, 30], [0, 22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))},000<span style={{ fontSize: 24, color: "#94a3b8" }}>/мес</span>
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>
                Собрано соло-фаундером без команды разработки
              </div>
            </div>

            <div
              style={{
                width: 520,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 36,
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>Сабрина Матос</span>
                <span style={{ fontSize: 16, background: "rgba(168, 85, 247, 0.25)", color: "#c084fc", padding: "6px 14px", borderRadius: 12, fontWeight: 700 }}>Lovable + n8n</span>
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", marginTop: 8 }}>
                Приложение женской безопасности
              </div>
              <div style={{ fontSize: 64, fontWeight: 900, color: "#a855f7", margin: "24px 0 12px 0", fontFamily: "monospace" }}>
                ${Math.round(interpolate(frame - 870, [0, 30], [0, 38], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))},000<span style={{ fontSize: 24, color: "#94a3b8" }}>/мес</span>
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>
                Связка no-code конструктора и автоматизаций
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Token Trap & Astra AI Invoice Card (1620 - 2870f) */}
      {frame >= 1620 && frame < 2870 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1620, 1640, 2840, 2865], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(245, 158, 11, 0.3)",
              border: "1.5px solid rgba(245, 158, 11, 0.7)",
              color: "#fde68a",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 30,
              backdropFilter: "blur(16px)",
            }}
          >
            ⚠️ «ЛОВУШКА ВАЙБ-ВЫРУЧКИ»: ПОЧЕМУ 70% ТОНУТ В УБЫТКАХ
          </div>

          {frame < Math.round(80.46 * fps) ? (
            <div style={{ width: 1160, padding: "54px 70px", borderRadius: 24, background: "rgba(10, 15, 30, 0.94)", border: "1px solid rgba(245, 158, 11, 0.55)", textAlign: "center" }}>
              <div style={{ fontSize: 74, fontWeight: 900, color: "#ffffff", lineHeight: 1.12 }}>Подписка фиксированная.</div>
              <div style={{ fontSize: 74, fontWeight: 900, color: "#fbbf24", lineHeight: 1.12, marginTop: 18 }}>Расход на AI — нет.</div>
              <div style={{ fontSize: 34, color: "#e2e8f0", marginTop: 34 }}>Каждый запрос клиента расходует токены и деньги.</div>
            </div>
          ) : (
            <TokenInvoiceCard scale={interpolate(sprInvoice, [0, 1], [0.92, 1])} />
          )}
        </div>
      )}

      {/* 5. Maor 90% GPU Costs & Wix -$76M Loss (2870 - 3837f) */}
      {frame >= 2870 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [2870, 2890, 3800, 3830], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
            ЦЕНА МАСШТАБА: ВЫЧИСЛЕНИЯ
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            <div
              style={{
                width: 520,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 36,
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 700 }}>
                BASE44 (МАОР ШЛОМО)
              </div>
              <div style={{ fontSize: 64, fontWeight: 900, color: "#f59e0b", margin: "16px 0" }}>
                90%
              </div>
              <div style={{ fontSize: 20, color: "#ffffff", fontWeight: 700 }}>
                Всех расходов компании уходило на нейросети
              </div>
              <p style={{ fontSize: 16, color: "#94a3b8", marginTop: 12 }}>
                Выжил только потому, что имел опыт CTO и построил систему авто-переключения между провайдерами моделей.
              </p>
            </div>

            <div
              style={{
                width: 520,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(239, 68, 68, 0.6)",
                borderRadius: 24,
                padding: 36,
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 20, color: "#f87171", fontWeight: 700 }}>
                КОРПОРАЦИЯ WIX (ПОСЛЕ ПОКУПКИ)
              </div>
              <div style={{ fontSize: 64, fontWeight: 900, color: "#ef4444", margin: "16px 0", fontFamily: "monospace" }}>
                -${Math.round(interpolate(frame - 2870, [0, 35], [0, 76], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}M
              </div>
              <div style={{ fontSize: 20, color: "#ffffff", fontWeight: 700 }}>
                Квартальный убыток при масштабировании
              </div>
              <p style={{ fontSize: 16, color: "#94a3b8", marginTop: 12 }}>
                Гигантские траты на ИИ-вычисления и привлечение трафика привели саму корпорацию к убыткам.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
