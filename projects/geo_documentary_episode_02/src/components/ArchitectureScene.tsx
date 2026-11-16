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
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              color: "#c084fc",
              fontSize: 16,
              fontWeight: 800,
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

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 800, marginBottom: 10 }}>
                КЛАССИЧЕСКОЕ SEO
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Борьба за позицию
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.4 }}>
                Пользователь вбивает ключевик, видит список сайтов и кликает по очереди.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: "1.5px solid rgba(139, 92, 246, 0.5)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
              }}
            >
              <div style={{ fontSize: 18, color: "#c084fc", fontWeight: 800, marginBottom: 10 }}>
                GENERATIVE ENGINE (GEO)
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#c084fc", marginBottom: 12 }}>
                Борьба за цитирование
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
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
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: "1px solid rgba(56, 189, 248, 0.4)",
              color: "#38bdf8",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            МЕХАНИКА RAG & QUERY FAN-OUT
          </div>

          <h2
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 40px",
            }}
          >
            ТОЧНЫЙ ОТВЕТ ПОБЕЖДАЕТ СЕО-ШУМ
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 20, maxWidth: 1350, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: sec < 48 ? "2px solid #38bdf8" : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
                boxShadow: sec < 48 ? "0 0 35px rgba(56, 189, 248, 0.35)" : "none",
                transform: sec < 48 ? "scale(1.02)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>🔍</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#38bdf8", marginBottom: 8 }}>
                Query Fan-Out
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.4 }}>
                Google делит вопрос пользователя на 3–5 связанных подзапросов в фоновом режиме.
              </div>
            </div>

            <div style={{ fontSize: 32, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: (sec >= 48 && sec < 62) ? "2px solid #a855f7" : "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
                boxShadow: (sec >= 48 && sec < 62) ? "0 0 35px rgba(168, 85, 247, 0.35)" : "none",
                transform: (sec >= 48 && sec < 62) ? "scale(1.02)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>⚡</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#a855f7", marginBottom: 8 }}>
                RAG Векторный Поиск
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.4 }}>
                В контекст попадают фрагменты страниц с четкими сущностями: цены, даты, адреса.
              </div>
            </div>

            <div style={{ fontSize: 32, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: sec >= 62 ? "2px solid #22c55e" : "1.5px solid rgba(34, 197, 94, 0.3)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
                boxShadow: sec >= 62 ? "0 0 35px rgba(34, 197, 94, 0.35)" : "0 0 15px rgba(34, 197, 94, 0.1)",
                transform: sec >= 62 ? "scale(1.02)" : "scale(1)",
                transition: "all 0.3s ease",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎯</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e", marginBottom: 8 }}>
                Готовый Источник
              </div>
              <div style={{ fontSize: 16, color: "#cbd5e1", lineHeight: 1.4 }}>
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
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(34, 197, 94, 0.15)",
              border: "1px solid rgba(34, 197, 94, 0.4)",
              color: "#22c55e",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ОФИЦИАЛЬНАЯ ПОЗИЦИЯ GOOGLE
          </div>

          <h2
            style={{
              fontSize: 64,
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
              gap: 30,
              maxWidth: 1100,
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #38bdf8",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 900, color: "#38bdf8", marginBottom: 10 }}>
                ДОСТУПЕН
              </div>
              <div style={{ fontSize: 17, color: "#cbd5e1" }}>
                Индексация, чистый robots.txt, открытый OAI-SearchBot
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #a855f7",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 900, color: "#a855f7", marginBottom: 10 }}>
                ПОНЯТЕН
              </div>
              <div style={{ fontSize: 17, color: "#cbd5e1" }}>
                Логичная иерархия, микроразметка Schema.org, семантика
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #22c55e",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                ПОЛЕЗЕН
              </div>
              <div style={{ fontSize: 17, color: "#cbd5e1" }}>
                Точные условия, реальные фото, цены и регламенты
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

