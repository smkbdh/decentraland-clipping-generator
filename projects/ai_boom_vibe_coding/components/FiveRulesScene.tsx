import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const FiveRulesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 4 Phases:
  // Phase 1: 0 - 1660f (0 - 55.33s) - 5 Rules of Agentic Engineering
  // Phase 2: 1660 - 2394f (55.33 - 79.8s) - GEO Teaser (145M sessions, 4.5x Google conversion)
  // Phase 3: 2394 - 2744f (79.8 - 91.46s) - Outro & Comments & Telegram CTA

  const rules = [
    { num: "01", title: "Агентная среда / IDE", desc: "Cursor, Claude Code, агентные инструменты ускоряют разработку" },
    { num: "02", title: "Контекст через MCP", desc: "Актуальная документация предотвращает галлюцинации" },
    { num: "03", title: "Свои БД и бэкапы", desc: "Хранение на своих серверах, бэкапы на GitHub, разграничение прав" },
    { num: "04", title: "Серверная безопасность", desc: "API-ключи и проверка оплаты ТОЛЬКО на бэкенде" },
    { num: "05", title: "Монетизация и токены", desc: "Юнит-экономика токенов заложена в тарифы с первого дня" },
  ];

  // Dynamic Ken Burns Zoom for each video
  const zoom1 = interpolate(frame, [0, 1660], [1.0, 1.08], { extrapolateRight: "clamp" });
  const zoom2 = interpolate(frame, [1660, 2394], [1.0, 1.08], { extrapolateRight: "clamp" });
  const zoom3 = interpolate(frame, [2394, 2744], [1.0, 1.08], { extrapolateRight: "clamp" });

  // GEO Counters (Phase 2)
  const geoSessions = Math.floor(
    interpolate(frame - 1660, [15, 60], [10000000, 145000000], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  ).toLocaleString("en-US");

  const geoMultiplier = interpolate(frame - 1660, [20, 65], [1.0, 4.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }).toFixed(1);

  // QR Laser Scan in Outro
  const outroLocal = Math.max(0, frame - 2394);
  const laserY = (outroLocal * 3.5) % 190;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. STOCK VIDEO: 5 Rules of Agentic Engineering Workspace (0 - 1660f) */}
      {frame < 1660 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:3a285b55-704f-429d-af3a-cc1bc481fe6b"
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
              transform: `scale(${zoom1})`,
            }}
          />
        </div>
      )}

      {/* 2. STOCK VIDEO: GEO Teaser & Global AI Network Globe (1660 - 2394f) */}
      {frame >= 1660 && frame < 2394 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:5737223f-d1f7-4e69-997b-25a0374f177c"
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
              transform: `scale(${zoom2})`,
            }}
          />
        </div>
      )}

      {/* 3. STOCK VIDEO: Channel Outro Futuristic Tech Ambiance (2394+ f) */}
      {frame >= 2394 && (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:853aaa13-462a-4b06-8bed-6caa836da86c"
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
              transform: `scale(${zoom3})`,
            }}
          />
        </div>
      )}

      <BackgroundGrid accentColor={frame > 2394 ? "#06b6d4" : frame > 1660 ? "#a855f7" : "#6366f1"} />

      {/* PHASE 1: 5 Rules of Agentic Engineering (0 - 1670f) */}
      {frame < 1675 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [0, 20, 1640, 1670], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(99, 102, 241, 0.22)",
              border: "1px solid rgba(99, 102, 241, 0.55)",
              color: "#818cf8",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 24,
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 32px rgba(99, 102, 241, 0.25)",
            }}
          >
            ЭПОХА АГЕНТНОЙ ИНЖЕНЕРИИ • 5 ПРАВИЛ
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 1120 }}>
            {rules.map((rule, idx) => {
              const ruleStartFrame = idx * 280;
              const isVisible = frame >= ruleStartFrame;
              const isActive = frame >= ruleStartFrame && frame < (idx + 1) * 280 + 100;

              const spr = spring({
                frame: Math.max(0, frame - ruleStartFrame),
                fps,
                config: { damping: 14, stiffness: 120 },
              });

              return (
                <div
                  key={rule.num}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    background: isActive ? "rgba(99, 102, 241, 0.28)" : "rgba(15, 23, 42, 0.88)",
                    border: `1px solid ${isActive ? "#818cf8" : "rgba(255, 255, 255, 0.12)"}`,
                    borderRadius: 18,
                    padding: "16px 28px",
                    boxShadow: isActive ? "0 0 32px rgba(99, 102, 241, 0.45)" : "none",
                    opacity: isVisible ? 1 : 0.4,
                    transform: isVisible ? `scale(${interpolate(spr, [0, 1], [0.95, 1])})` : "scale(0.95)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: isActive ? "#38bdf8" : "#64748b",
                      width: 50,
                      fontVariantNumeric: "tabular-nums",
                    }}
                  >
                    {rule.num}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>
                      {rule.title}
                    </div>
                    <div style={{ fontSize: 18, color: "#94a3b8", marginTop: 4 }}>
                      {rule.desc}
                    </div>
                  </div>
                  {isActive && <span style={{ fontSize: 26, filter: "drop-shadow(0 0 8px #38bdf8)" }}>⚡</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PHASE 2: GEO Teaser 145M Sessions (1660 - 2400f) */}
      {frame >= 1660 && frame < 2400 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1660, 1685, 2365, 2395], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(168, 85, 247, 0.22)",
              border: "1px solid rgba(168, 85, 247, 0.55)",
              color: "#c084fc",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 36,
              backdropFilter: "blur(14px)",
              boxShadow: "0 8px 32px rgba(168, 85, 247, 0.25)",
            }}
          >
            ТИЗЕР СЛЕДУЮЩЕГО ВЫПУСКА • GEO
          </div>

          <div style={{ display: "flex", gap: 54, alignItems: "center" }}>
            {/* Image card */}
            <div
              style={{
                width: 580,
                borderRadius: 24,
                overflow: "hidden",
                border: "2px solid rgba(168, 85, 247, 0.45)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.75)",
                background: "rgba(15, 23, 42, 0.9)",
              }}
            >
              <Img
                src="kino:babf7448-40a1-4fcd-8e2e-bb90c7e40801"
                style={{ width: "100%", height: 320, objectFit: "cover" }}
              />
              <div style={{ padding: 24, background: "#0f172a" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff", fontVariantNumeric: "tabular-nums" }}>
                  Исследование {geoSessions} сессий
                </div>
                <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 8 }}>
                  Search Engine Journal • Реальные цифры ИИ-трафика
                </div>
              </div>
            </div>

            {/* Conversion 4.5x */}
            <div style={{ width: 500 }}>
              <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 700, letterSpacing: 1 }}>
                ГЛАВНЫЙ СЕКРЕТ 2026:
              </div>
              <div
                style={{
                  fontSize: 78,
                  fontWeight: 900,
                  color: "#10b981",
                  margin: "14px 0",
                  fontVariantNumeric: "tabular-nums",
                  textShadow: "0 0 35px rgba(16, 185, 129, 0.4)",
                }}
              >
                {geoMultiplier}x
              </div>
              <div style={{ fontSize: 25, fontWeight: 800, color: "#ffffff", lineHeight: 1.3 }}>
                Конверсия в продажи выше, чем из Google!
              </div>
              <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.5, marginTop: 14 }}>
                Как настроить GEO-оптимизацию и получать платежи напрямую из ответов ChatGPT и Perplexity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: Outro & Call to Action & Telegram QR (2394 - 2744f) */}
      {frame >= 2390 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 100px",
            gap: 60,
            opacity: interpolate(frame, [2390, 2415, 2710, 2740], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {/* Left: Text CTA */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div
              style={{
                padding: "8px 24px",
                borderRadius: 30,
                background: "rgba(56, 189, 248, 0.2)",
                border: "1px solid rgba(56, 189, 248, 0.5)",
                color: "#38bdf8",
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: 2,
                marginBottom: 20,
                backdropFilter: "blur(12px)",
              }}
            >
              СПАСИБО ЗА ПРОСМОТР!
            </div>
            <h2
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 1.25,
                margin: "0 0 20px 0",
                textShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
              }}
            >
              Какую задачу вы уже доверили нейросетям? Напишите в комментариях!
            </h2>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                color: "#ffffff",
                padding: "16px 30px",
                borderRadius: 18,
                fontSize: 22,
                fontWeight: 800,
                boxShadow: "0 12px 30px rgba(37, 99, 235, 0.45)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <span>Промпты безопасности в закрепе Telegram 🚀</span>
            </div>
          </div>

          {/* Right: Prominent Telegram QR Code Card */}
          <div
            style={{
              width: 320,
              padding: "24px",
              borderRadius: 24,
              background: "rgba(15, 23, 42, 0.85)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(56, 189, 248, 0.2)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transform: `translateY(${Math.sin(outroLocal * 0.08) * 6}px)`,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 200,
                height: 200,
                borderRadius: 16,
                overflow: "hidden",
                border: "2px solid rgba(56, 189, 248, 0.6)",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
                backgroundColor: "#ffffff",
              }}
            >
              <Img
                src="kino:e895e6ff-ffb9-4517-b7f2-f557228f34de"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {/* Laser Scan line */}
              <div
                style={{
                  position: "absolute",
                  top: laserY,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: "#00f0ff",
                  boxShadow: "0 0 12px #00f0ff, 0 0 20px #00f0ff",
                }}
              />
            </div>
            <div style={{ marginTop: 16, textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: "#ffffff", letterSpacing: 0.5 }}>
                Сканируйте QR
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#38bdf8", marginTop: 4 }}>
                @BUDDAH_AI
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
