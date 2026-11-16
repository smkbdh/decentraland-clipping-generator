import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL & SCREENCAST */}
      
      {/* 0 - 35s: Cyber Neon AI Data Search Stream */}
      <Sequence from={0} durationInFrames={Math.round(35 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("b_roll_ai_data_search.mp4")}
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
              transform: `scale(${interpolate(frame, [0, 35 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 35 - 75s: AI Data Search flow */}
      <Sequence from={Math.round(35 * fps)} durationInFrames={Math.round(40 * fps)} layout="none">
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
              opacity: 0.35,
              transform: `scale(${interpolate(frame - 35 * fps, [0, 40 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 75s+: Real Google Search Central Screenshot */}
      <Sequence from={Math.round(75 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("site_google_ai_features.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame - 75 * fps, [0, 45 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#8b5cf6" />

      {/* SUB-PHASE 1 (0 - 35s): Search vs Generative Answer */}
      {sec < 35 && (
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
              backgroundColor: "rgba(139, 92, 246, 0.2)",
              border: "1.5px solid rgba(139, 92, 246, 0.5)",
              color: "#c084fc",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ЭВОЛЮЦИЯ ПОИСКОВОГО ИНТЕРФЕЙСА
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
            10 СИНИХ ССЫЛОК VS ПРЯМОЙ ОТВЕТ С ИСТОЧНИКАМИ
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1250, width: "100%" }}>
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
                КЛАССИЧЕСКОЕ SEO
              </div>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                Борьба за позицию
              </div>
              <div style={{ fontSize: 24, color: "#94a3b8", lineHeight: 1.45 }}>
                Пользователь вбивает ключевик, видит список сайтов и кликает по очереди.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2.5px solid rgba(139, 92, 246, 0.6)",
                borderRadius: 24,
                padding: "36px",
                boxShadow: "0 0 40px rgba(139, 92, 246, 0.3)",
              }}
            >
              <div style={{ fontSize: 20, color: "#c084fc", fontWeight: 800, marginBottom: 10 }}>
                GENERATIVE ENGINE (GEO)
              </div>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#c084fc", marginBottom: 14 }}>
                Борьба за цитирование
              </div>
              <div style={{ fontSize: 24, color: "#cbd5e1", lineHeight: 1.45 }}>
                Нейросеть агрегирует факты из лучших источников и сразу рекомендует решение.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 2 (35 - 75s): RAG & Query Fan-Out */}
      {sec >= 35 && sec < 75 && (
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
              backgroundColor: "rgba(56, 189, 248, 0.2)",
              border: "1.5px solid rgba(56, 189, 248, 0.5)",
              color: "#38bdf8",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            МЕХАНИКА RAG & QUERY FAN-OUT
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
            ТОЧНЫЙ ОТВЕТ ПОБЕЖДАЕТ СЕО-ШУМ
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 24, maxWidth: 1400, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: sec < 48 ? "2.5px solid #38bdf8" : "1.5px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: sec < 48 ? "0 0 40px rgba(56, 189, 248, 0.4)" : "none",
                transform: sec < 48 ? "scale(1.03)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 34, marginBottom: 10 }}>🔍</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#38bdf8", marginBottom: 10 }}>
                Query Fan-Out
              </div>
              <div style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.45 }}>
                Google делит вопрос пользователя на 3–5 связанных подзапросов в фоновом режиме.
              </div>
            </div>

            <div style={{ fontSize: 36, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: (sec >= 48 && sec < 62) ? "2.5px solid #a855f7" : "1.5px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: (sec >= 48 && sec < 62) ? "0 0 40px rgba(168, 85, 247, 0.4)" : "none",
                transform: (sec >= 48 && sec < 62) ? "scale(1.03)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 34, marginBottom: 10 }}>⚡</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#a855f7", marginBottom: 10 }}>
                RAG Поиск
              </div>
              <div style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.45 }}>
                В контекст попадают фрагменты страниц с четкими сущностями: цены, даты, адреса.
              </div>
            </div>

            <div style={{ fontSize: 36, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: sec >= 62 ? "2.5px solid #22c55e" : "1.5px solid rgba(34, 197, 94, 0.4)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: sec >= 62 ? "0 0 40px rgba(34, 197, 94, 0.4)" : "0 0 20px rgba(34, 197, 94, 0.15)",
                transform: sec >= 62 ? "scale(1.03)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 34, marginBottom: 10 }}>🎯</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                Источник
              </div>
              <div style={{ fontSize: 22, color: "#cbd5e1", lineHeight: 1.45 }}>
                Нейросеть цитирует именно тот сайт, где есть конкретный и честный ответ.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 3 (75s+): Google Standard */}
      {sec >= 75 && (
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
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              border: "1.5px solid rgba(34, 197, 94, 0.5)",
              color: "#22c55e",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ОФИЦИАЛЬНАЯ ПОЗИЦИЯ GOOGLE
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
            СПЕЦИАЛЬНЫХ GEO-ТЕГОВ НЕ СУЩЕСТВУЕТ
          </h2>

          <div
            style={{
              display: "flex",
              gap: 36,
              maxWidth: 1250,
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid #38bdf8",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.2)",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 900, color: "#38bdf8", marginBottom: 12 }}>
                ДОСТУПЕН
              </div>
              <div style={{ fontSize: 22, color: "#cbd5e1", lineHeight: 1.4 }}>
                Индексация, чистый robots.txt, открытый OAI-SearchBot
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid #a855f7",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 900, color: "#a855f7", marginBottom: 12 }}>
                ПОНЯТЕН
              </div>
              <div style={{ fontSize: 22, color: "#cbd5e1", lineHeight: 1.4 }}>
                Логичная иерархия, микроразметка Schema.org, семантика
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid #22c55e",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 900, color: "#22c55e", marginBottom: 12 }}>
                ПОЛЕЗЕН
              </div>
              <div style={{ fontSize: 22, color: "#cbd5e1", lineHeight: 1.4 }}>
                Точные условия, реальные фото, цены и регламенты
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

