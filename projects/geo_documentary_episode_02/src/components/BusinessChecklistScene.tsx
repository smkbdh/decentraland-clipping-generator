import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const BusinessChecklistScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* BACKGROUND B-ROLL */}
      <Sequence from={0} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("15_act4_agentic_engineering.mp4")}
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
              transform: `scale(${interpolate(frame, [0, 114 * fps], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#06b6d4" />

      {/* PHASE 1 (0 - 55s): Rules 1 & 2 */}
      {sec < 55 && (
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
              backgroundColor: "rgba(6, 182, 212, 0.15)",
              border: "1px solid rgba(6, 182, 212, 0.4)",
              color: "#22d3ee",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            АЛГОРИТМ ДЕЙСТВИЙ · ШАГИ 1 И 2
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
            ЧТО ДЕЛАТЬ ВЛАДЕЛЬЦАМ САЙТОВ ПРЯМО СЕЙЧАС?
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1250, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #22d3ee",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(6, 182, 212, 0.15)",
              }}
            >
              <div style={{ fontSize: 18, color: "#22d3ee", fontWeight: 800, marginBottom: 8 }}>
                1. КОНТЕНТ ПОД ВОПРОСЫ
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                Цены, условия, ограничения
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Не шаблонное «мы лидеры рынка», а детальные ответы: сколько стоит, какой депозит, условия страховки, расписание и честные FAQ.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #a855f7",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.15)",
              }}
            >
              <div style={{ fontSize: 18, color: "#c084fc", fontWeight: 800, marginBottom: 8 }}>
                2. ТЕХНИЧЕСКАЯ ДОСТУПНОСТЬ
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                Чистый HTML и OAI-SearchBot
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Проверьте robots.txt, sitemap, индексацию страниц и доступ поискового краулера ChatGPT. Не надейтесь на «волшебный llms.txt».
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2 (55s+): Rules 3 & 4 */}
      {sec >= 55 && (
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
              color: "#34d399",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            АЛГОРИТМ ДЕЙСТВИЙ · ШАГИ 3 И 4
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
            ИЗМЕРЕНИЕ ВОРОНКИ И СКОРОСТЬ СДЕЛКИ
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1250, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #f59e0b",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.15)",
              }}
            >
              <div style={{ fontSize: 18, color: "#fbbf24", fontWeight: 800, marginBottom: 8 }}>
                3. СКВОЗНОЙ ТРЕКИНГ
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                UTM, First-touch & Last-touch
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Разделяйте визиты, клики, квалифицированные диалоги и оплаты. Не считайте сырой трафик краулеров за деньги.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #22c55e",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(34, 197, 94, 0.15)",
              }}
            >
              <div style={{ fontSize: 18, color: "#4ade80", fontWeight: 800, marginBottom: 8 }}>
                4. СКОРОСТЬ ОБРАБОТКИ
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", marginBottom: 14 }}>
                Ответ за 5–10 минут
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Если лид пришел из нейросети — он уже прогрет. Отвечайте быстро, предлагайте брошюру или бронь. Иначе бюджет сгорит впустую.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
