import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TechGlossaryFootnote } from "./TechGlossaryFootnote";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL VIDEO SEQUENCES (VOX / NETFLIX STANDARD) */}
      
      {/* 0 - 24s: Business Deal & Startup Pitch B-Roll */}
      <Sequence from={0} durationInFrames={Math.round(24 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("02_hook_startup_deal.mp4")}
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
              transform: `scale(${interpolate(frame, [0, 24 * fps], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 24 - 48s: Global AI Network */}
      <Sequence from={Math.round(24 * fps)} durationInFrames={Math.round(24 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("04_act1_ai_network.mp4")}
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
              transform: `scale(${interpolate(frame - 24 * fps, [0, 24 * fps], [1.05, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 48 - 74s: Real OpenAI Crawlers Docs Screenshot Background */}
      <Sequence from={Math.round(48 * fps)} durationInFrames={Math.round(26 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("site_openai_bots.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
              transform: `scale(${interpolate(frame - 48 * fps, [0, 26 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 74s+: Server Token Cost Rack */}
      <Sequence from={Math.round(74 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("06_act1_server_token_cost.mp4")}
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
              transform: `scale(${interpolate(frame - 74 * fps, [0, 27 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

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
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(239, 68, 68, 0.4)",
                borderRadius: 20,
                padding: "24px 36px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 16, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                ЧТО ПОКАЗЫВАЮТ В ПРЕЗЕНТАЦИЯХ
              </div>
              <div style={{ fontSize: 36, color: "#ef4444", fontWeight: 900 }}>
                ТРАФИК КРАУЛЕРОВ
              </div>
            </div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.85)",
                border: "1px solid rgba(34, 197, 94, 0.4)",
                borderRadius: 20,
                padding: "24px 36px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 16, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                ЧТО НУЖНО БИЗНЕСУ
              </div>
              <div style={{ fontSize: 36, color: "#22c55e", fontWeight: 900 }}>
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
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 24,
                padding: "36px",
              }}
            >
              <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 800, marginBottom: 10 }}>
                GOOGLE SEARCH (SEO)
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Огромный объём
              </div>
              <div style={{ fontSize: 24, color: "#94a3b8", lineHeight: 1.45 }}>
                Миллионы запросов, сравнение вариантов, длительный серфинг по ссылкам.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "2px solid rgba(168, 85, 247, 0.5)",
                borderRadius: 24,
                padding: "36px",
                boxShadow: "0 0 35px rgba(168, 85, 247, 0.25)",
              }}
            >
              <div style={{ fontSize: 20, color: "#c084fc", fontWeight: 800, marginBottom: 10 }}>
                CHATGPT & AI (GEO)
              </div>
              <div style={{ fontSize: 44, fontWeight: 900, color: "#c084fc", marginBottom: 12 }}>
                Высокая конверсия
              </div>
              <div style={{ fontSize: 24, color: "#cbd5e1", lineHeight: 1.45 }}>
                Точечные пользователи с прямым намерением бронирования и покупки.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 3 (48 - 74s): 3 Stages Funnel with Real Bot Documentation */}
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
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 24,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#94a3b8",
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: 1.5,
              marginBottom: 16,
            }}
          >
            РЕАЛЬНАЯ ВОРОНКА ЗАПРОСОВ
          </div>

          <h2
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              margin: "0 0 45px",
            }}
          >
            ГЛАВНЫЙ ТРЮК В ОТЧЁТАХ: 3 РАЗНЫХ ЭТАПА
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid rgba(239, 68, 68, 0.6)",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>🤖</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ef4444", marginBottom: 10 }}>
                1. КРАУЛЕР
              </div>
              <div style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.4 }}>
                Сканирует страницу для индекса и обучения моделей
              </div>
            </div>

            <div style={{ fontSize: 40, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid rgba(245, 158, 11, 0.6)",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>👆</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#f59e0b", marginBottom: 10 }}>
                2. ПЕРЕХОД
              </div>
              <div style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.4 }}>
                Человек переходит по ссылке-рекомендации нейросети
              </div>
            </div>

            <div style={{ fontSize: 40, color: "#64748b", fontWeight: 900 }}>➔</div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid rgba(34, 197, 94, 0.6)",
                borderRadius: 24,
                padding: "32px 36px",
                textAlign: "center",
                width: 360,
                boxShadow: "0 0 40px rgba(34, 197, 94, 0.3)",
              }}
            >
              <div style={{ fontSize: 38, marginBottom: 10 }}>💰</div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                3. КЛИЕНТ
              </div>
              <div style={{ fontSize: 22, color: "#f8fafc", lineHeight: 1.4, fontWeight: 600 }}>
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
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#f8fafc",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            СПЕЦИФИКАЦИЯ OPENAI CRAWLERS
          </div>

          <h2
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              margin: "0 0 36px",
            }}
          >
            БОТЫ БЫВАЮТ РАЗНЫМИ: КТО ЕСТЬ КТО?
          </h2>

          <div style={{ display: "flex", gap: 32, maxWidth: 1350, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "1.5px solid rgba(148, 163, 184, 0.35)",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#94a3b8", marginBottom: 10 }}>
                GPTBot
              </div>
              <div style={{ fontSize: 22, color: "#f8fafc", fontWeight: 800, marginBottom: 10 }}>
                Обучение моделей
              </div>
              <div style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.45 }}>
                Обходит миллионы страниц для датасетов LLM. Это чистые серверные запросы, не клиенты.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid rgba(56, 189, 248, 0.6)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 35px rgba(56, 189, 248, 0.25)",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#38bdf8", marginBottom: 10 }}>
                OAI-SearchBot
              </div>
              <div style={{ fontSize: 22, color: "#f8fafc", fontWeight: 800, marginBottom: 10 }}>
                Поиск в ChatGPT Search
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.45 }}>
                Индексирует свежий контент специально для генеративных ответов с источниками.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid rgba(34, 197, 94, 0.6)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 35px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                ChatGPT-User
              </div>
              <div style={{ fontSize: 22, color: "#f8fafc", fontWeight: 800, marginBottom: 10 }}>
                Действие пользователя
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.45 }}>
                Открывает страницу в реальном времени, когда пользователь просит прочитать ссылку.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DYNAMIC TECH GLOSSARY FOOTNOTE (TIMED TO VOICE-OVER)
          ========================================================================= */}
      {sec < 48 && (
        <TechGlossaryFootnote
          term="GEO"
          englishTitle="Generative Engine Optimization"
          russianExplanation="Новый стандарт продвижения: оптимизация контента сайта для прямого цитирования в ответах ИИ (ChatGPT, Perplexity, Claude), а не просто кликов в Google."
          accentColor="#38bdf8"
        />
      )}

      {sec >= 48 && (
        <TechGlossaryFootnote
          term="AI Crawlers"
          englishTitle="Роботы OpenAI и поисковых нейросетей"
          russianExplanation="Боты (GPTBot, OAI-SearchBot), которые в фоновом режиме читают ваш сайт, собирают факты и проверяют актуальность цен для формирования ответов пользователю."
          accentColor="#22c55e"
        />
      )}
    </div>
  );
};

