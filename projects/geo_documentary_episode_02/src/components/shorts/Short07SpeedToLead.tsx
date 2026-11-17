import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShortLayout } from "./ShortLayout";

export const Short07SpeedToLead: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 520 frames / ~0-17s): Speed to lead comparison: 78% vs <8%
  // Phase 2 (520 - 1050 frames / ~17-35s): 3 post-click rules (авто, виллы, услуги)
  // Phase 3 (1050 - 1575 frames / ~35-52.5s): Final Master Strategy: Useful site + Attribution + Fast Response

  const phase = frame < 520 ? 1 : frame < 1050 ? 2 : 3;

  // Phase 1
  const p1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const cardFast = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 110 } });
  const cardSlow = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 110 } });

  // Phase 2
  const f2 = frame - 520;
  const p2Spring = spring({ frame: f2, fps, config: { damping: 14, stiffness: 100 } });

  // Phase 3
  const f3 = frame - 1050;
  const p3Spring = spring({ frame: f3, fps, config: { damping: 14, stiffness: 100 } });
  const stampScale = interpolate(f3, [20, 35], [2.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <ShortLayout
      shortKey="short07"
      categoryTitle="SPEED TO LEAD И ПРОДАЖИ"
      shortNumber="07 / 07"
      bgVideoSrc="13_act3_sales_crm_office.mp4"
      voiceoverStartSec={577.5}
      durationFrames={1575}
    >
      {phase === 1 && (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            transform: `scale(${p1Spring})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Header */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "30px 36px 24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderTop: "6px solid #22c55e",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(34, 197, 94, 0.14)",
                color: "#15803d",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              ШАГ 4 ИЗ 4: ОБРАБОТКА ЛИДА
            </div>
            <h1
              style={{
                fontSize: 38,
                lineHeight: "46px",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
              }}
            >
              УЛУЧШАЙТЕ ТО, ЧТО <br />
              <span style={{ color: "#16a34a" }}>ПРОИСХОДИТ ПОСЛЕ КЛИКА!</span>
            </h1>
          </div>

          {/* Speed to Lead Comparison Cards */}
          <div style={{ width: "100%", display: "flex", gap: 16 }}>
            {/* Fast Card */}
            <div
              style={{
                flex: 1.15,
                transform: `scale(${cardFast})`,
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
                border: "2.5px solid #22c55e",
                borderRadius: 24,
                padding: "24px 20px",
                textAlign: "center",
                boxShadow: "0 15px 35px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: "#86efac", textTransform: "uppercase" }}>
                ⚡ ОТВЕТ ДО 15 МИНУТ
              </div>
              <div style={{ fontSize: 72, fontWeight: 900, color: "#ffffff", margin: "10px 0" }}>
                78%
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#4ade80" }}>
                Конверсия в оплату
              </div>
              <div style={{ fontSize: 14, color: "#bbf7d0", marginTop: 6 }}>
                Клиент держит телефон в руках и готов платить
              </div>
            </div>

            {/* Slow Card */}
            <div
              style={{
                flex: 1,
                transform: `scale(${cardSlow})`,
                background: "rgba(30, 41, 59, 0.92)",
                border: "1.5px solid rgba(239, 68, 68, 0.4)",
                borderRadius: 24,
                padding: "24px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: "#fca5a5", textTransform: "uppercase" }}>
                ⏳ ОТВЕТ &gt; 2 ЧАСОВ
              </div>
              <div style={{ fontSize: 62, fontWeight: 900, color: "#ef4444", margin: "12px 0" }}>
                &lt; 8%
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fca5a5" }}>
                Слив клиента
              </div>
              <div style={{ fontSize: 14, color: "#94a3b8", marginTop: 6 }}>
                Клиент уже ушёл к следующему контакту из ChatGPT
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 2 && (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            transform: `scale(${p2Spring})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 18,
          }}
        >
          {/* Header */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "28px 36px 22px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderTop: "6px solid #f59e0b",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(245, 158, 11, 0.14)",
                color: "#b45309",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              ПРАВИЛА ОБРАБОТКИ ЛИДОВ
            </div>
            <h1
              style={{
                fontSize: 38,
                lineHeight: "46px",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
              }}
            >
              КАК НЕ СЛИТЬ AI-ТРАФИК
            </h1>
          </div>

          {/* 3 Advice Cards */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 26 }}>🚗</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#f8fafc" }}>
                  Автопрокат: авто занято?
                </div>
                <div style={{ fontSize: 15, color: "#94a3b8" }}>
                  Сразу предлагайте 2 альтернативы в том же бюджете.
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 26 }}>🏖️</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#f8fafc" }}>
                  Недвижимость: не шлите спам
                </div>
                <div style={{ fontSize: 15, color: "#94a3b8" }}>
                  Не скидывайте каталог из 100 вилл, уточните район, бюджет и срок.
                </div>
              </div>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 26 }}>🎓</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#f8fafc" }}>
                  Школы и услуги: ведите за руку
                </div>
                <div style={{ fontSize: 15, color: "#94a3b8" }}>
                  Записался на тест? Мгновенно дайте ссылку на следующий шаг.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {phase === 3 && (
        <div
          style={{
            width: "100%",
            maxWidth: 920,
            transform: `scale(${p3Spring})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Header */}
          <div
            style={{
              width: "100%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(241,245,249,0.98) 100%)",
              borderRadius: 28,
              padding: "30px 36px 24px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              borderTop: "6px solid #22c55e",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(34, 197, 94, 0.14)",
                color: "#15803d",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              ИТОГОВЫЙ СТАНДАРТ ДЛЯ БИЗНЕСА
            </div>
            <h1
              style={{
                fontSize: 38,
                lineHeight: "46px",
                fontWeight: 900,
                color: "#0f172a",
                margin: 0,
              }}
            >
              РАБОЧАЯ СТРАТЕГИЯ В ЭПОХУ ИИ: <br />
              <span style={{ color: "#16a34a" }}>БЕЗ ПАНИКИ И КУЛЬТА ХАЙПА</span>
            </h1>
          </div>

          {/* 3 Pillars */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 22, color: "#38bdf8", fontWeight: 900 }}>1</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>
                Полезный сайт с точными фактами и условиями
              </span>
            </div>

            <div
              style={{
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 22, color: "#f59e0b", fontWeight: 900 }}>2</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#f8fafc" }}>
                Сквозная аналитика UTM и Key Events
              </span>
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "2px solid #22c55e",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 22, color: "#4ade80", fontWeight: 900 }}>3</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: "#86efac" }}>
                Быстрая и человечная работа с каждым лидом
              </span>
            </div>
          </div>

          {/* Stamp */}
          <div
            style={{
              transform: `scale(${stampScale})`,
              padding: "14px 32px",
              borderRadius: 14,
              background: "#22c55e",
              color: "#052e16",
              fontSize: 20,
              fontWeight: 900,
              boxShadow: "0 12px 30px rgba(34, 197, 94, 0.4)",
            }}
          >
            ДЕНЬГИ В КАССЕ, А НЕ ХАЙП ВОКРУГ GEO
          </div>
        </div>
      )}
    </ShortLayout>
  );
};
