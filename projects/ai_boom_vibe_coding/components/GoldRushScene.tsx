import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const GoldRushScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Act 1 Phases:
  // Phase 1: 0 - 867f (0 - 28.9s) - Andrey Karpathy & $4.7B / 63% non-devs
  // Phase 2: 867 - 1623f (28.9 - 54.1s) - Launch Fast ($22k) & Sabrina Matos ($38k)
  // Phase 3: 1623 - 2874f (54.1 - 95.8s) - Astra AI Token Trap ($250k/mo bill)
  // Phase 4: 2874 - 3837f (95.8 - 127.9s) - Base44 90% GPU costs & Wix $76M loss

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. STOCK VIDEO: AI neural network digital brain (0 - 870f) */}
      {frame < 870 && (
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
              transform: `scale(${interpolate(frame, [0, 870], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* 2. STOCK VIDEO: Financial revenue analytics growth (870 - 1620f) */}
      {frame >= 870 && frame < 1620 && (
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
              transform: `scale(${interpolate(frame - 870, [0, 750], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* 3. STOCK VIDEO: Server room data center hardware cost (1620 - 2870f) */}
      {frame >= 1620 && frame < 2870 && (
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
              transform: `scale(${interpolate(frame - 1620, [0, 1250], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      {/* 4. STOCK VIDEO: Microchip processor & computation scale (2870+ f) */}
      {frame >= 2870 && (
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
              transform: `scale(${interpolate(frame - 2870, [0, 967], [1.0, 1.07])})`,
            }}
          />
        </div>
      )}

      <BackgroundGrid accentColor={frame > 1623 ? "#f59e0b" : "#3b82f6"} />

      {/* FOREGROUND CARDS (zIndex: 10) */}

      {/* PHASE 1: Karpathy & Market Stats (0 - 870f) */}
      {frame < 890 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [0, 20, 840, 870], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
            }}
          >
            АКТ 1 • ЗОЛОТАЯ ЛИХОРАДКА ВАЙБ-КОДИНГА
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            {/* Stat Card 1: Market Size */}
            <div
              style={{
                width: 480,
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 40,
                textAlign: "center",
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Рынок вайб-кодинга 2026
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#38bdf8", margin: "16px 0", letterSpacing: "-0.03em", fontFamily: "monospace" }}>
                ${(interpolate(frame, [0, 30], [0, 4.7], { extrapolateRight: "clamp" })).toFixed(1)}B
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1" }}>
                Термин Андрея Карпатого: <br />
                <span style={{ color: "#93c5fd" }}>«Программы простыми словами в чате»</span>
              </div>
            </div>

            {/* Stat Card 2: 63% Non-Coders */}
            <div
              style={{
                width: 480,
                background: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(99, 102, 241, 0.5)",
                borderRadius: 24,
                padding: 40,
                textAlign: "center",
                boxShadow: "0 25px 50px rgba(0,0,0,0.7)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                Главная цифра индустрии
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#a855f7", margin: "16px 0", letterSpacing: "-0.03em", fontFamily: "monospace" }}>
                {Math.round(interpolate(frame, [0, 30], [0, 63], { extrapolateRight: "clamp" }))}%
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1" }}>
                Вообще не являются программистами: <br />
                <span style={{ color: "#c084fc" }}>предприниматели, маркетологи, менеджеры</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2: Launch Fast & Sabrina Matos (870 - 1630f) */}
      {frame >= 860 && frame < 1640 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [860, 885, 1590, 1620], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
            РЕАЛЬНЫЕ УСПЕШНЫЕ КЕЙСЫ (БЕЗ КОМАНДЫ РАЗРАБОТКИ)
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            {/* Case 1: Launch Fast */}
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
                ${Math.round(interpolate(frame - 860, [0, 30], [0, 22], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))},000<span style={{ fontSize: 24, color: "#94a3b8" }}>/мес</span>
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>
                Собрано соло-фаундером без найма программистов
              </div>
            </div>

            {/* Case 2: Sabrina Matos */}
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
                ${Math.round(interpolate(frame - 860, [0, 30], [0, 38], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))},000<span style={{ fontSize: 24, color: "#94a3b8" }}>/мес</span>
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>
                Связка no-code конструктора и автоматизаций
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3: The Token Trap & Astra AI (1620 - 2880f) */}
      {frame >= 1610 && frame < 2890 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [1610, 1635, 2840, 2870], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
              marginBottom: 36,
              backdropFilter: "blur(16px)",
            }}
          >
            ⚠️ «ЛОВУШКА ВАЙБ-ВЫРУЧКИ»: ПОЧЕМУ 70% ТОНУТ В УБЫТКАХ
          </div>

          <div style={{ display: "flex", gap: 50, alignItems: "center" }}>
            {/* The Trap concept */}
            <div
              style={{
                width: 500,
                background: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 24,
                padding: 36,
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 22, fontWeight: 800, color: "#f87171" }}>
                Подписка $15/мес vs Реальные затраты
              </div>
              <p style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.6, marginTop: 16 }}>
                Новичок делает обертку над нейросетью и радуется притоку пользователей.
                Но каждое нажатие кнопки сжигает реальные деньги на API-токенах!
              </p>
              <div style={{ marginTop: 24, padding: 18, background: "rgba(239, 68, 68, 0.2)", borderRadius: 16, border: "1px solid rgba(239, 68, 68, 0.5)" }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#f87171" }}>Парадокс:</div>
                <div style={{ fontSize: 17, color: "#cbd5e1", marginTop: 6 }}>
                  Чем больше клиентов приходит — тем быстрее растет чистый убыток проекта.
                </div>
              </div>
            </div>

            {/* Case: Astra AI */}
            <div
              style={{
                width: 560,
                background: "rgba(20, 10, 15, 0.95)",
                border: "2px solid #f59e0b",
                borderRadius: 24,
                padding: 36,
                boxShadow: "0 0 50px rgba(245, 158, 11, 0.4)",
                backdropFilter: "blur(20px)",
              }}
            >
              <div style={{ fontSize: 20, color: "#fbbf24", fontWeight: 800, textTransform: "uppercase" }}>
                КЕЙС: ASTRA AI
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", marginTop: 8 }}>
                170,000 пользователей
              </div>
              <div style={{ fontSize: 68, fontWeight: 900, color: "#ef4444", margin: "20px 0 10px 0", fontFamily: "monospace" }}>
                ${Math.round(interpolate(frame - 1620, [0, 35], [0, 250], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))},000<span style={{ fontSize: 24, color: "#94a3b8" }}>/мес</span>
              </div>
              <div style={{ fontSize: 20, color: "#fca5a5", fontWeight: 700 }}>
                Счет только за OpenAI API!
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 12 }}>
                Съедает львиную долю выручки еще до выплаты зарплат и закупки рекламы.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 4: Maor Shlomo 90% Costs & Wix $76M Loss (2870 - 3837f) */}
      {frame >= 2860 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: interpolate(frame, [2860, 2885, 3800, 3830], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
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
            {/* Maor 90% */}
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

            {/* Wix $76M */}
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
                -${Math.round(interpolate(frame - 2860, [0, 35], [0, 76], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}M
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
