import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { BackgroundGrid } from "./BackgroundGrid";

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      <BackgroundGrid accentColor="#8b5cf6" />

      {/* SUB-PHASE 1 (0 - 35s / 184.5s - 220s): Search vs Generative Answer */}
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
              fontSize: 68,
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
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 20, color: "#94a3b8", fontWeight: 800, marginBottom: 12 }}>
                КЛАССИЧЕСКОЕ SEO
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                Борьба за позицию
              </div>
              <div style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.4 }}>
                Пользователь вбивает ключевик, видит список сайтов и кликает по очереди.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(139, 92, 246, 0.4)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.15)",
              }}
            >
              <div style={{ fontSize: 20, color: "#c084fc", fontWeight: 800, marginBottom: 12 }}>
                GENERATIVE ENGINE (GEO)
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#c084fc", marginBottom: 14 }}>
                Борьба за цитирование
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.4 }}>
                Нейросеть агрегирует факты из лучших источников и сразу рекомендует решение.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 2 (35 - 75s / 220s - 260s): RAG & Query Fan-Out */}
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

          <div style={{ display: "flex", gap: 30, maxWidth: 1300, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
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

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
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

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
                boxShadow: "0 0 25px rgba(34, 197, 94, 0.15)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>🎯</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e", marginBottom: 8 }}>
                Готовый Источник
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.4 }}>
                Нейросеть цитирует именно тот сайт, где есть конкретный и честный ответ.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 3 (75s+ / 260s - 304.5s): Google Standard */}
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
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1.5px solid #38bdf8",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 900, color: "#38bdf8", marginBottom: 10 }}>
                ДОСТУПЕН
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8" }}>
                Индексация, чистый robots.txt, открытый OAI-SearchBot
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1.5px solid #a855f7",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 900, color: "#a855f7", marginBottom: 10 }}>
                ПОНЯТЕН
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8" }}>
                Логичная иерархия, микроразметка Schema.org, семантика
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1.5px solid #22c55e",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 32, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                ПОЛЕЗЕН
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8" }}>
                Точные условия, реальные фото, цены и регламенты
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
