import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { BackgroundGrid } from "./BackgroundGrid";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      <BackgroundGrid accentColor="#38bdf8" />

      {/* SUB-PHASE 1 (0 - 24s): Gold Rush vs Reality */}
      {sec < 24 && (
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
              marginBottom: 24,
            }}
          >
            ДОКУМЕНТАЛЬНОЕ РАССЛЕДОВАНИЕ
          </div>

          <h1
            style={{
              fontSize: 78,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.08,
              margin: "0 0 30px",
              maxWidth: 1400,
              letterSpacing: -1,
            }}
          >
            GEO И ТРАФИК ИЗ НЕЙРОСЕТЕЙ: <br />
            <span style={{ color: "#38bdf8" }}>НОВАЯ ЗОЛОТАЯ ЖИЛА</span> ИЛИ БОТЫ?
          </h1>

          <div style={{ display: "flex", gap: 30, marginTop: 20 }}>
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: 20,
                padding: "24px 36px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                ЧТО ПОКАЗЫВАЮТ В ПРЕЗЕНТАЦИЯХ
              </div>
              <div style={{ fontSize: 38, color: "#ef4444", fontWeight: 900 }}>
                ТРАФИК КРАУЛЕРОВ
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                borderRadius: 20,
                padding: "24px 36px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                ЧТО НУЖНО БИЗНЕСУ
              </div>
              <div style={{ fontSize: 38, color: "#22c55e", fontWeight: 900 }}>
                РЕАЛЬНЫЕ КЛИЕНТЫ И ДЕНЬГИ
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 2 (24 - 48s): Traffic vs Motivated Clients */}
      {sec >= 24 && sec < 48 && (
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
              backgroundColor: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#f59e0b",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 24,
            }}
          >
            ФУНДАМЕНТАЛЬНАЯ РАЗНИЦА
          </div>

          <h2
            style={{
              fontSize: 68,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 40px",
              letterSpacing: -0.5,
            }}
          >
            МАССОВЫЙ ТРАФИК VS ГОТОВЫЙ КЛИЕНТ
          </h2>

          <div style={{ display: "flex", gap: 40, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 800, marginBottom: 12 }}>
                GOOGLE SEARCH (SEO)
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Огромный объём
              </div>
              <div style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.4 }}>
                Миллионы запросов, сравнение вариантов, серфинг по ссылкам.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(168, 85, 247, 0.4)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.15)",
              }}
            >
              <div style={{ fontSize: 20, color: "#c084fc", fontWeight: 800, marginBottom: 12 }}>
                CHATGPT & AI (GEO)
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#c084fc", marginBottom: 12 }}>
                Высокая конверсия
              </div>
              <div style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.4 }}>
                Точечные пользователи с прямым намерением бронирования и покупки.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 3 (48 - 74s): 3 Stages Funnel */}
      {sec >= 48 && sec < 74 && (
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
          <h2
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              margin: "0 0 50px",
            }}
          >
            ГЛАВНЫЙ ТРЮК В ОТЧЁТАХ: 3 РАЗНЫХ ЭТАПА
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: 20,
                padding: "30px 40px",
                textAlign: "center",
                width: 320,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>🤖</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ef4444", marginBottom: 8 }}>
                1. КРАУЛЕР
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8" }}>
                Сканирует страницу для индекса и обучения моделей
              </div>
            </div>

            <div style={{ fontSize: 36, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                borderRadius: 20,
                padding: "30px 40px",
                textAlign: "center",
                width: 320,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>👆</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f59e0b", marginBottom: 8 }}>
                2. ПЕРЕХОД
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8" }}>
                Человек переходит по ссылке-рекомендации нейросети
              </div>
            </div>

            <div style={{ fontSize: 36, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(34, 197, 94, 0.5)",
                borderRadius: 20,
                padding: "30px 40px",
                textAlign: "center",
                width: 320,
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>💰</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#22c55e", marginBottom: 8 }}>
                3. КЛИЕНТ
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8" }}>
                Пишет в WhatsApp, оставляет бронь, покупает
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 4 (74 - 100.8s): OpenAI Crawlers Table */}
      {sec >= 74 && (
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
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#f8fafc",
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            СПЕЦИФИКАЦИЯ OPENAI CRAWLERS
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              margin: "0 0 40px",
            }}
          >
            БОТЫ БЫВАЮТ РАЗНЫМИ: КТО ЕСТЬ КТО?
          </h2>

          <div style={{ display: "flex", gap: 30, maxWidth: 1300, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(148, 163, 184, 0.2)",
                borderRadius: 20,
                padding: "28px",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 900, color: "#94a3b8", marginBottom: 10 }}>
                GPTBot
              </div>
              <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 700, marginBottom: 8 }}>
                Обучение моделей
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.4 }}>
                Обходит миллионы сайтов для датасетов LLM. Это чистые серверные запросы, не клиенты.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                borderRadius: 20,
                padding: "28px",
                boxShadow: "0 0 25px rgba(56, 189, 248, 0.15)",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 900, color: "#38bdf8", marginBottom: 10 }}>
                OAI-SearchBot
              </div>
              <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 700, marginBottom: 8 }}>
                Поиск в ChatGPT Search
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.4 }}>
                Индексирует свежий контент специально для генеративных ответов с источниками.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                borderRadius: 20,
                padding: "28px",
                boxShadow: "0 0 25px rgba(34, 197, 94, 0.15)",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                ChatGPT-User
              </div>
              <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 700, marginBottom: 8 }}>
                Действие пользователя
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.4 }}>
                Открывает страницу в реальном времени, когда пользователь просит прочитать ссылку.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
