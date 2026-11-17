import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { ShortLayout } from "./ShortLayout";

export const Short04BenCarRent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 (0 - 520 frames / ~0-17s): 4-step journey (ChatGPT -> Quote -> WhatsApp -> Booking)
  // Phase 2 (520 - 1100 frames / ~17-37s): Proof in logs: 38 WhatsApp leads + 6 Bookings with chatgpt utm
  // Phase 3 (1100 - 1665 frames / ~37-55.5s): 100% Occupancy & 0 budget

  const phase = frame < 520 ? 1 : frame < 1100 ? 2 : 3;

  // Phase 1
  const p1Spring = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const s1 = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: "clamp" });
  const s2 = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: "clamp" });
  const s3 = interpolate(frame, [75, 90], [0, 1], { extrapolateRight: "clamp" });
  const s4 = interpolate(frame, [105, 120], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2
  const f2 = frame - 520;
  const p2Spring = spring({ frame: f2, fps, config: { damping: 14, stiffness: 100 } });
  const count38 = Math.round(interpolate(f2, [20, 60], [0, 38], { extrapolateRight: "clamp" }));
  const count6 = Math.round(interpolate(f2, [35, 75], [0, 6], { extrapolateRight: "clamp" }));

  // Phase 3
  const f3 = frame - 1100;
  const p3Spring = spring({ frame: f3, fps, config: { damping: 14, stiffness: 100 } });
  const meterWidth = interpolate(f3, [15, 50], [0, 100], { extrapolateRight: "clamp" });

  return (
    <ShortLayout
      shortKey="short04"
      categoryTitle="КЕЙС: АРЕНДА АВТО НА ПХУКЕТЕ"
      shortNumber="04 / 07"
      bgVideoSrc="b_roll_phuket_car.mp4"
      voiceoverStartSec={286.5}
      durationFrames={1665}
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
            gap: 18,
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
              КЛИЕНТСКИЙ КЕЙС BENPHUKETCARRENT
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
              ПУТЬ КЛИЕНТА В GEO: <br />
              <span style={{ color: "#16a34a" }}>ОТ CHATGPT ДО БРОНИ АВТО</span>
            </h1>
          </div>

          {/* 4 Steps */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                opacity: s1,
                transform: `translateX(${(1 - s1) * -25}px)`,
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: "#38bdf8" }}>1</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#f8fafc" }}>Запрос в ChatGPT</div>
                <div style={{ fontSize: 15, color: "#94a3b8" }}>«Аренда авто на Пхукете без залога паспорта»</div>
              </div>
            </div>

            <div
              style={{
                opacity: s2,
                transform: `translateX(${(1 - s2) * -25}px)`,
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: "#a855f7" }}>2</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#f8fafc" }}>Цитата нейросети</div>
                <div style={{ fontSize: 15, color: "#94a3b8" }}>ChatGPT рекомендует сайт за прозрачные условия</div>
              </div>
            </div>

            <div
              style={{
                opacity: s3,
                transform: `translateX(${(1 - s3) * -25}px)`,
                background: "rgba(30, 41, 59, 0.94)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: "#38bdf8" }}>3</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#f8fafc" }}>Клик в WhatsApp со ссылкой</div>
                <div style={{ fontSize: 15, color: "#bae6fd" }}>Сквозная UTM-метка `utm_source=chatgpt.com`</div>
              </div>
            </div>

            <div
              style={{
                opacity: s4,
                transform: `translateX(${(1 - s4) * -25}px)`,
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.22) 0%, rgba(15, 23, 42, 0.95) 100%)",
                borderRadius: 18,
                padding: "16px 22px",
                border: "2px solid #22c55e",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 900, color: "#4ade80" }}>4</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#86efac" }}>Сделка и предоплата</div>
                <div style={{ fontSize: 15, color: "#bbf7d0" }}>Бронь даты, модели и локации доставки</div>
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
              borderTop: "6px solid #38bdf8",
              textAlign: "center",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 999,
                background: "rgba(56, 189, 248, 0.14)",
                color: "#0369a1",
                fontSize: 18,
                fontWeight: 900,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              ФАКТИЧЕСКИЕ ДАННЫЕ ЗА 2 МЕСЯЦА
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
              РЕАЛЬНЫЕ СЛЕДЫ ИЗ НЕЙРОСЕТИ
            </h1>
          </div>

          {/* Numbers Grid */}
          <div style={{ width: "100%", display: "flex", gap: 16 }}>
            <div
              style={{
                flex: 1,
                background: "rgba(30, 41, 59, 0.94)",
                border: "2px solid #38bdf8",
                borderRadius: 24,
                padding: "24px 20px",
                textAlign: "center",
                boxShadow: "0 10px 30px rgba(56, 189, 248, 0.2)",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: "#38bdf8", textTransform: "uppercase" }}>
                ПЕРЕХОДЫ В WHATSAPP
              </div>
              <div style={{ fontSize: 72, fontWeight: 900, color: "#ffffff", margin: "10px 0" }}>
                {count38}
              </div>
              <div style={{ fontSize: 16, color: "#cbd5e1" }}>
                Клиенты с меткой ChatGPT
              </div>
            </div>

            <div
              style={{
                flex: 1,
                background: "linear-gradient(135deg, rgba(34, 197, 94, 0.25) 0%, rgba(15, 23, 42, 0.95) 100%)",
                border: "2.5px solid #22c55e",
                borderRadius: 24,
                padding: "24px 20px",
                textAlign: "center",
                boxShadow: "0 12px 30px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 900, color: "#86efac", textTransform: "uppercase" }}>
                ПРЯМЫЕ БРОНИРОВАНИЯ
              </div>
              <div style={{ fontSize: 72, fontWeight: 900, color: "#4ade80", margin: "10px 0" }}>
                {count6}
              </div>
              <div style={{ fontSize: 16, color: "#bbf7d0" }}>
                Оформленные заявки на авто
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div
            style={{
              width: "100%",
              background: "rgba(15, 23, 42, 0.92)",
              borderRadius: 18,
              padding: "16px 24px",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: "#e2e8f0" }}>
              📍 Точные даты, модели авто и сквозной UTM-трекинг
            </span>
            <span style={{ fontSize: 16, fontWeight: 900, color: "#22c55e" }}>
              ПРОВЕРЕНО
            </span>
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
              padding: "32px 36px 24px",
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
              РЕЗУЛЬТАТ ДЛЯ БИЗНЕСА
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
              100% ЗАНЯТОСТЬ АВТОПАРКА <br />
              <span style={{ color: "#16a34a" }}>БЕЗ ЗАТРАТ НА РЕКЛАМУ</span>
            </h1>
          </div>

          {/* Occupancy Meter */}
          <div
            style={{
              width: "100%",
              background: "rgba(30, 41, 59, 0.92)",
              borderRadius: 22,
              padding: "24px 28px",
              border: "1.5px solid rgba(255,255,255,0.12)",
              boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#f8fafc" }}>
                Загрузка 26 автомобилей
              </span>
              <span style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>
                100% ЗАБРОНИРОВАНО
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: 20,
                borderRadius: 10,
                background: "rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${meterWidth}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #22c55e 0%, #16a34a 100%)",
                }}
              />
            </div>
          </div>

          {/* Highlights */}
          <div style={{ width: "100%", display: "flex", gap: 14 }}>
            <div
              style={{
                flex: 1,
                background: "rgba(15, 23, 42, 0.9)",
                borderRadius: 18,
                padding: "18px 20px",
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, color: "#22c55e" }}>0 ₽</div>
              <div style={{ fontSize: 15, color: "#94a3b8", marginTop: 4 }}>
                Бюджет на платную рекламу
              </div>
            </div>
            <div
              style={{
                flex: 1,
                background: "rgba(15, 23, 42, 0.9)",
                borderRadius: 18,
                padding: "18px 20px",
                border: "1px solid rgba(255,255,255,0.1)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, color: "#38bdf8" }}>3 мин</div>
              <div style={{ fontSize: 15, color: "#94a3b8", marginTop: 4 }}>
                Среднее время закрытия сделки
              </div>
            </div>
          </div>
        </div>
      )}
    </ShortLayout>
  );
};
