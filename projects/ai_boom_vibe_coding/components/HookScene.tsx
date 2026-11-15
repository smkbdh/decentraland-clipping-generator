import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. STOCK VIDEO: Developer typing code on laptop (0 - 750f) */}
      {frame < 750 && (
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
              transform: `scale(${interpolate(frame, [0, 750], [1.0, 1.08])})`,
            }}
          />
        </div>
      )}

      {/* 2. STOCK VIDEO: Tech startup office / deal (750 - 1500f) */}
      {frame >= 750 && frame < 1500 && (
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
              transform: `scale(${interpolate(frame - 750, [0, 750], [1.0, 1.08])})`,
            }}
          />
        </div>
      )}

      {/* 3. STOCK VIDEO: Hacker cyber security breach (1500 - 2385f) */}
      {frame >= 1500 && (
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
              transform: `scale(${interpolate(frame - 1500, [0, 885], [1.0, 1.08])})`,
            }}
          />
        </div>
      )}

      {/* Ambient Grid overlay */}
      <BackgroundGrid accentColor={frame > 1500 ? "#ef4444" : "#6366f1"} />

      {/* FOREGROUND CARDS (zIndex: 10) */}

      {/* PHASE 1: The YouTube Myth (0 - 384f) */}
      {frame < 400 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [0, 15, 360, 390], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
              background: "rgba(15, 23, 42, 0.88)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: 24,
              padding: 40,
              boxShadow: "0 30px 60px rgba(0, 0, 0, 0.8)",
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

      {/* PHASE 2: Maor Shlomo Base44 $80M Wix Deal (384 - 1032f) */}
      {frame >= 370 && frame < 1050 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [370, 395, 1000, 1030], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div style={{ display: "flex", gap: 60, alignItems: "center", maxWidth: 1400 }}>
            {/* Left: Article Card */}
            <div
              style={{
                width: 650,
                borderRadius: 24,
                overflow: "hidden",
                border: "2px solid rgba(99, 102, 241, 0.4)",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.6)",
                transform: `scale(${spring({ frame: frame - 380, fps, config: { damping: 15 } })})`,
              }}
            >
              <Img
                src="kino:032ee74a-5964-48fc-97ff-fc048bf37df6"
                style={{ width: "100%", height: 380, objectFit: "cover" }}
              />
              <div style={{ padding: 24, background: "#0f172a" }}>
                <div style={{ color: "#38bdf8", fontSize: 18, fontWeight: 700, textTransform: "uppercase" }}>
                  ОФИЦИАЛЬНАЯ СДЕЛКА • ЛЕТО 2025
                </div>
                <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8, color: "#ffffff" }}>
                  Base44 продан Wix за $80,000,000 наличными
                </div>
                <div style={{ color: "#94a3b8", fontSize: 18, marginTop: 10 }}>
                  Основатель Маор Шломо • 6 месяцев от идеи до продажи
                </div>
              </div>
            </div>

            {/* Right: Key Facts & Stack */}
            <div style={{ width: 600, transform: `translateY(${Math.sin(frame / 20) * 5}px)` }}>
              <div
                style={{
                  fontSize: 76,
                  fontWeight: 900,
                  color: "#10b981",
                  textShadow: "0 0 40px rgba(16, 185, 129, 0.4)",
                  letterSpacing: "-0.02em",
                  marginBottom: 16,
                  fontFamily: "monospace",
                }}
              >
                ${Math.round(interpolate(frame - 380, [0, 40], [0, 80], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))},000,000
              </div>
              <div style={{ fontSize: 26, color: "#cbd5e1", lineHeight: 1.5, marginBottom: 36 }}>
                3 месяца Маор вообще не писал фронтенд руками: <br />
                <span style={{ color: "#60a5fa", fontWeight: 700 }}>всё генерировали Cursor и Claude.</span>
              </div>

              <div style={{ display: "flex", gap: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(30, 41, 59, 0.8)", padding: "14px 24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Img src="kino:6d96c273-7432-48ed-87ab-5e28ce3f9b08" style={{ width: 36, height: 36 }} />
                  <span style={{ fontSize: 22, fontWeight: 700 }}>Cursor</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(30, 41, 59, 0.8)", padding: "14px 24px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Img src="kino:cf5af11f-455c-415b-95d8-8f46e607c67e" style={{ width: 36, height: 36 }} />
                  <span style={{ fontSize: 22, fontWeight: 700 }}>Claude</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: Leo Acevedo & Enrichlead Hack (1032 - 1962f) */}
      {frame >= 1020 && frame < 1980 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1020, 1045, 1930, 1960], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: frame > 1300 ? "rgba(239, 68, 68, 0.3)" : "rgba(56, 189, 248, 0.25)",
              border: `1.5px solid ${frame > 1300 ? "rgba(239, 68, 68, 0.8)" : "rgba(56, 189, 248, 0.6)"}`,
              color: frame > 1300 ? "#fca5a5" : "#38bdf8",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            {frame > 1300 ? "⚠️ КАТАСТРОФА: 48 ЧАСОВ СПУСТЯ" : "КЕЙС: ENRICHLEAD (ЛЕО АСЕВЕДО)"}
          </div>

          <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
            {/* Tweet 1: Triumph */}
            <div
              style={{
                width: 580,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 36,
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                opacity: frame > 1350 ? 0.35 : 1,
                transform: frame > 1350 ? "scale(0.95)" : "scale(1)",
                transition: "all 0.5s ease",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>
                  LA
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>Leo Acevedo</div>
                  <div style={{ fontSize: 16, color: "#64748b" }}>@leojr94_ • День 1</div>
                </div>
              </div>
              <div style={{ fontSize: 26, color: "#f8fafc", lineHeight: 1.5 }}>
                «Ноль строк ручного кода. Всё собрано в Cursor. И люди уже платят! 🚀»
              </div>
              <div style={{ marginTop: 24, padding: "10px 18px", borderRadius: 12, background: "rgba(16, 185, 129, 0.15)", color: "#34d399", fontSize: 18, fontWeight: 700, display: "inline-block" }}>
                ✓ Первые платящие юзеры
              </div>
            </div>

            {/* Tweet 2: Collapse (appears at frame 1300 / ~43s) */}
            {frame >= 1300 && (
              <div
                style={{
                  width: 620,
                  background: "rgba(30, 10, 15, 0.95)",
                  border: "2px solid #ef4444",
                  borderRadius: 24,
                  padding: 36,
                  boxShadow: "0 0 60px rgba(239, 68, 68, 0.4)",
                  transform: `scale(${spring({ frame: frame - 1300, fps, config: { damping: 12 } })})`,
                  backdropFilter: "blur(20px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700 }}>
                    ⚠️
                  </div>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: "#fca5a5" }}>Leo Acevedo</div>
                    <div style={{ fontSize: 16, color: "#f87171" }}>@leojr94_ • Через 48 часов</div>
                  </div>
                </div>
                <div style={{ fontSize: 24, color: "#ffffff", lineHeight: 1.5 }}>
                  «Ребята, меня взломали. Ключи API сожжены в ноль, люди обходят оплату и пишут мусор в базу. Я не технарь, не знаю, что делать...»
                </div>
                <div style={{ marginTop: 24, padding: "10px 18px", borderRadius: 12, background: "rgba(239, 68, 68, 0.3)", color: "#fca5a5", fontSize: 18, fontWeight: 800, display: "inline-block" }}>
                  ❌ ПРОЕКТ ЗАКРЫТ НАВСЕГДА
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PHASE 4: Climax & Call to Action (1962 - 2385f) */}
      {frame >= 1950 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            opacity: interpolate(frame, [1950, 1975, 2350, 2385], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "10px 30px",
              borderRadius: 30,
              background: "rgba(168, 85, 247, 0.2)",
              border: "1px solid rgba(168, 85, 247, 0.5)",
              color: "#c084fc",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 28,
            }}
          >
            БЕЗ ИНФОШУМА • ТВЕРДЫЕ ИСТОЧНИКИ
          </div>
          <h2 style={{ fontSize: 64, fontWeight: 900, color: "#ffffff", maxWidth: 1100, lineHeight: 1.2, margin: "0 0 24px 0" }}>
            Почему 9 из 10 проектов погибают, и как строить ИИ, который приносит деньги?
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              background: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
              color: "#ffffff",
              padding: "16px 36px",
              borderRadius: 50,
              fontSize: 28,
              fontWeight: 800,
              boxShadow: "0 10px 30px rgba(239, 68, 68, 0.4)",
              marginTop: 16,
            }}
          >
            <span>ПОДПИШИТЕСЬ НА КАНАЛ АВАНСОМ</span>
            <span>🔔</span>
          </div>
        </div>
      )}
    </div>
  );
};
