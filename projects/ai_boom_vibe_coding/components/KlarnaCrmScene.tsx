import React from "react";
import { Sequence, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const KlarnaCrmScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 3 Phases:
  // Phase 1: 0 - 1000f (0 - 33.3s) - Klarna 700 agents replacement & Bloomberg reality check
  // Phase 2: 1000 - 1690f (33.3 - 56.3s) - Attio vs Salesforce & 70% cold spam fail
  // Phase 3: 1690 - 2235f (56.3 - 74.5s) - Real estate 8h vs 2min response time (+40% conversion)

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. Real Source Video: Klarna AI Assistant 700 Jobs Metrics (0 - 1000f) */}
      <Sequence from={0} durationInFrames={1000} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:18f8d087-6194-4ad8-a028-c2769ece206e"
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
              transform: `scale(${interpolate(frame, [0, 1000], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 2. STOCK VIDEO: Sales CRM Dashboard / Business Analytics (1000 - 1690f) */}
      <Sequence from={1000} durationInFrames={690} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:285f8fc5-0d0f-44d5-8136-fa6f36166ac5"
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
              transform: `scale(${interpolate(frame - 1000, [0, 690], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 3. STOCK VIDEO: Real Estate Luxury Skyscraper City (1690+ f) */}
      <Sequence from={1690} durationInFrames={545} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:7b6b4470-6fdc-4762-8d82-ccf8a0f04757"
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
              transform: `scale(${interpolate(frame - 1690, [0, 545], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor={frame > 1695 ? "#10b981" : "#06b6d4"} />

      {/* FOREGROUND CARDS (zIndex: 10) */}

      {/* PHASE 1: Klarna Case (0 - 1000f) - Lower-Third Dock preserving video's native 700 FTE infographic */}
      {frame < 1000 && (
        <div
          style={{
            position: "absolute",
            bottom: 55,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            width: 1260,
            background: "rgba(10, 16, 28, 0.92)",
            border: frame < Math.round(15.96 * fps) ? "1.5px solid rgba(6, 182, 212, 0.6)" : "1.5px solid rgba(245, 158, 11, 0.6)",
            borderRadius: 24,
            padding: "24px 44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.85)",
            opacity: interpolate(frame, [0, 20, 970, 995], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          {frame < Math.round(15.96 * fps) ? (
            <>
              <div>
                <div style={{ fontSize: 18, color: "#67e8f9", fontWeight: 800, letterSpacing: 2 }}>
                  ОФИЦИАЛЬНЫЙ КЕЙС KLARNA • ШВЕЦИЯ
                </div>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
                  ИИ заменил 700 операторов поддержки
                </div>
                <div style={{ fontSize: 18, color: "#94a3b8", marginTop: 4 }}>
                  Эквивалент объёма работы ИИ-ассистента, взявшего 2/3 всех обращений
                </div>
              </div>
              <div style={{ textAlign: "right", borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 36 }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#10b981", fontVariantNumeric: "tabular-nums" }}>
                  $40 000 000
                </div>
                <div style={{ fontSize: 18, color: "#cbd5e1", marginTop: 4 }}>
                  Прогноз годовой экономии
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div style={{ fontSize: 18, color: "#fbbf24", fontWeight: 800, letterSpacing: 2 }}>
                  РЕАЛЬНОСТЬ СПУСТЯ 6 МЕСЯЦЕВ
                </div>
                <div style={{ fontSize: 34, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>
                  Качество сложных ответов упало на 30%
                </div>
                <div style={{ fontSize: 18, color: "#fca5a5", marginTop: 4 }}>
                  Пользователи требовали живых операторов в спорных финансовых вопросах
                </div>
              </div>
              <div style={{ textAlign: "right", borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: 36 }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: "#38bdf8" }}>
                  ГИБРИДНАЯ МОДЕЛЬ
                </div>
                <div style={{ fontSize: 18, color: "#cbd5e1", marginTop: 4 }}>
                  ИИ на рутину · Человек на сложные кейсы
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* PHASE 2: Attio vs Salesforce & Cold Spam (1010 - 1700f) */}
      {frame >= 1000 && frame < 1710 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1000, 1025, 1670, 1700], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              padding: "10px 28px",
              borderRadius: 30,
              background: "rgba(168, 85, 247, 0.3)",
              border: "1.5px solid rgba(168, 85, 247, 0.7)",
              color: "#d8b4fe",
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            ЭВОЛЮЦИЯ CRM И ПРОДАЖ
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
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>
                Смена тяжелых систем
              </div>
              <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.6, marginTop: 14 }}>
                Внедрение систем вроде Salesforce стоит десятки тысяч долларов.
                Компании переходят на гибкие кастомные решения (например Attio), которые собираются под задачу за считанные дни.
              </p>
            </div>

            <div
              style={{
                width: 540,
                background: "rgba(30, 10, 15, 0.95)",
                border: "2px solid #ef4444",
                borderRadius: 24,
                padding: 36,
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 20, color: "#f87171", fontWeight: 800, textTransform: "uppercase" }}>
                ПРОВАЛ СЛЕПОГО СПАМА
              </div>
              <div style={{ fontSize: 68, fontWeight: 900, color: "#ef4444", margin: "16px 0" }}>
                70%
              </div>
              <div style={{ fontSize: 20, color: "#ffffff", fontWeight: 700 }}>
                Компаний отключают ИИ-ботов для спама в первый же год
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: Inbound Leads & Real Estate 8h vs 2min (1695 - 2235f) */}
      {frame >= 1690 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1690, 1715, 2200, 2230], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
            ГДЕ НА САМОМ ДЕЛЕ ДЕНЬГИ: ВХОДЯЩИЙ ПОТОК
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            {/* Human response */}
            <div
              style={{
                width: 480,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 36,
                textAlign: "center",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 20, color: "#94a3b8", fontWeight: 700 }}>ОБЫЧНЫЙ МЕНЕДЖЕР:</div>
              <div style={{ fontSize: 72, fontWeight: 900, color: "#f87171", margin: "20px 0" }}>
                8 часов
              </div>
              <div style={{ fontSize: 18, color: "#fca5a5" }}>
                Среднее время ответа на заявку. Теряется почти 50% клиентов!
              </div>
            </div>

            {/* AI Agent response */}
            <div
              style={{
                width: 540,
                background: "rgba(15, 30, 25, 0.95)",
                border: "2px solid #10b981",
                borderRadius: 24,
                padding: 36,
                textAlign: "center",
                boxShadow: "0 0 50px rgba(16, 185, 129, 0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 20, color: "#34d399", fontWeight: 700 }}>ИИ-АГЕНТ НА ВХОДЯЩИХ:</div>
              <div style={{ fontSize: 72, fontWeight: 900, color: "#10b981", margin: "20px 0" }}>
                2 минуты
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#ffffff" }}>
                +40% Конверсия в сделку
              </div>
              <div style={{ fontSize: 16, color: "#a7f3d0", marginTop: 8 }}>
                Мгновенный разогрев и передача теплого лида человеку
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
