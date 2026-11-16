import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const BusinessChecklistScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  const currentAccent =
    sec < 29.1
      ? "#06b6d4"
      : sec < 58.6
      ? "#a855f7"
      : sec < 87.0
      ? "#f59e0b"
      : sec < 110.0
      ? "#22c55e"
      : "#a3e635";

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* BACKGROUND B-ROLL DYNAMIC SEQUENCES (VOX / NETFLIX STANDARD) */}

      {/* 0 - 29.1s (Rule 1): Real Estate City & Modern Skyscraper Architecture */}
      <Sequence from={0} durationInFrames={Math.round(29.1 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("14_act3_real_estate_city.mp4")}
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
              transform: `scale(${interpolate(frame, [0, 29.1 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 29.1s - 58.6s (Rule 2): Microchips, GPU Compute & Technical Infrastructure */}
      <Sequence from={Math.round(29.1 * fps)} durationInFrames={Math.round((58.6 - 29.1) * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("07_act1_microchip_gpu.mp4")}
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
              transform: `scale(${interpolate(frame - 29.1 * fps, [0, 29.5 * fps], [1.05, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 58.6s - 87.0s (Rule 3): Corporate Office Sales CRM & Analytics Team */}
      <Sequence from={Math.round(58.6 * fps)} durationInFrames={Math.round((87.0 - 58.6) * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("13_act3_sales_crm_office.mp4")}
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
              transform: `scale(${interpolate(frame - 58.6 * fps, [0, 28.4 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 87.0s - 110.0s (Rule 4): Customer Support & Call Center Instant Response */}
      <Sequence from={Math.round(87.0 * fps)} durationInFrames={Math.round((110.0 - 87.0) * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("12_act3_call_center_support.mp4")}
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
              transform: `scale(${interpolate(frame - 87.0 * fps, [0, 23.0 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 110.0s+ (Synthesis): Counting Cash Money, Profit & Revenue */}
      <Sequence from={Math.round(110.0 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("18_money_counting.mp4")}
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
              transform: `scale(${interpolate(frame - 110.0 * fps, [0, 30.0 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor={currentAccent} />

      {/* PHASE 1 (0 - 29.1s): Rule 1 Content under Real Questions */}
      {sec < 29.1 && (
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
            ШАГ 01 ИЗ 04 · ФУНДАМЕНТ
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
            КОНТЕНТ ПОД РЕАЛЬНЫЕ ВОПРОСЫ КЛИЕНТОВ
          </h2>

          <div
            style={{
              maxWidth: 1100,
              width: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "2px solid #22d3ee",
              borderRadius: 24,
              padding: "36px 44px",
              boxShadow: "0 0 40px rgba(6, 182, 212, 0.2)",
            }}
          >
            <div style={{ fontSize: 20, color: "#22d3ee", fontWeight: 800, marginBottom: 12 }}>
              1. ЦЕНЫ, УСЛОВИЯ, СРОКИ, ОГРАНИЧЕНИЯ И СРАВНЕНИЯ
            </div>
            <div style={{ fontSize: 24, color: "#f8fafc", fontWeight: 700, lineHeight: 1.4, marginBottom: 24 }}>
              Не пишите шаблонные тексты «мы лучшие на рынке». Нейросети ищут конкретные сущности для ответа человеку:
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.8)", padding: "18px 22px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 16, marginBottom: 6 }}>🚗 Аренда авто</div>
                <div style={{ color: "#cbd5e1", fontSize: 15 }}>Точные депозиты, условия страховки, доставка в аэропорт.</div>
              </div>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.8)", padding: "18px 22px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ color: "#f472b6", fontWeight: 800, fontSize: 16, marginBottom: 6 }}>🏢 Недвижимость</div>
                <div style={{ color: "#cbd5e1", fontSize: 15 }}>Договор, районы, коммунальные платежи, реальные фото.</div>
              </div>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.8)", padding: "18px 22px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ color: "#4ade80", fontWeight: 800, fontSize: 16, marginBottom: 6 }}>🎓 Школа</div>
                <div style={{ color: "#cbd5e1", fontSize: 15 }}>Программа, уровни, точное расписание и пробный урок.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2 (29.1s - 58.6s): Rule 2 Technical Accessibility */}
      {sec >= 29.1 && sec < 58.6 && (
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
              backgroundColor: "rgba(168, 85, 247, 0.15)",
              border: "1px solid rgba(168, 85, 247, 0.4)",
              color: "#c084fc",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ШАГ 02 ИЗ 04 · ТЕХНИЧЕСКИЙ БАЗИС
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
            ТЕХНИЧЕСКАЯ ДОСТУПНОСТЬ ДЛЯ КРАУЛЕРОВ
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1250, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid #a855f7",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 35px rgba(168, 85, 247, 0.2)",
              }}
            >
              <div style={{ fontSize: 18, color: "#c084fc", fontWeight: 800, marginBottom: 10 }}>
                ЧИСТЫЙ HTML И ИНДЕКСАЦИЯ
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                robots.txt, sitemap & канонические адреса
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Убедитесь, что краулер поиска ChatGPT (<code style={{ color: "#38bdf8" }}>OAI-SearchBot</code>) не заблокирован правилами. Если бот не видит страницу — вас нет в выдаче.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "1.5px solid rgba(239, 68, 68, 0.5)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(239, 68, 68, 0.15)",
              }}
            >
              <div style={{ fontSize: 18, color: "#ef4444", fontWeight: 800, marginBottom: 10 }}>
                НЕ ВЕРЬТЕ В ВОЛШЕБНЫЙ LLMS.TXT
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Файл не гарантирует продажи
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Ни Google, ни OpenAI не обещают приоритетных рекомендаций за <code style={{ color: "#f59e0b" }}>llms.txt</code>. Не превращайте техническую гипотезу в гарантию успеха.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3 (58.6s - 87.0s): Rule 3 End-to-end Funnel Tracking */}
      {sec >= 58.6 && sec < 87.0 && (
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
              color: "#fbbf24",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ШАГ 03 ИЗ 04 · АНАЛИТИКА
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
            ИЗМЕРЯЙТЕ ВСЮ ЦЕПОЧКУ ДО СДЕЛКИ
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1250, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "2px solid #f59e0b",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 35px rgba(245, 158, 11, 0.2)",
              }}
            >
              <div style={{ fontSize: 18, color: "#fbbf24", fontWeight: 800, marginBottom: 10 }}>
                СОХРАНЯЙТЕ ИСХОДНУЮ UTM-МЕТКУ
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Первая и последняя точка контакта
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Разделяйте сырые клики, отправленные формы, подтвержденные диалоги и дошедшие до кассы оплаты.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.94)",
                border: "1.5px solid rgba(56, 189, 248, 0.5)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(56, 189, 248, 0.15)",
              }}
            >
              <div style={{ fontSize: 18, color: "#38bdf8", fontWeight: 800, marginBottom: 10 }}>
                КЛИЕНТЫ ≠ КРАУЛЕРЫ
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Технические метки могут расходиться
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Бот обучающей модели и реальный покупатель из поиска — это разные сущности. Отслеживайте их раздельно в CRM.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 4 (87.0s - 110.0s): Rule 4 Speed of Processing after click */}
      {sec >= 87.0 && sec < 110.0 && (
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
              color: "#4ade80",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ШАГ 04 ИЗ 04 · ОБРАБОТКА
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
            УЛУЧШАЙТЕ ТО, ЧТО ПРОИСХОДИТ ПОСЛЕ КЛИКА
          </h2>

          <div
            style={{
              maxWidth: 1150,
              width: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "2px solid #22c55e",
              borderRadius: 24,
              padding: "36px 44px",
              boxShadow: "0 0 40px rgba(34, 197, 94, 0.25)",
            }}
          >
            <div style={{ fontSize: 24, color: "#ffffff", fontWeight: 700, lineHeight: 1.4, marginBottom: 24 }}>
              Можно выиграть цитирование в нейросети, но проиграть деньги на плохой обработке заявки:
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.8)", padding: "20px", borderRadius: 16 }}>
                <div style={{ color: "#4ade80", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>🚗 Машины закончились?</div>
                <div style={{ color: "#cbd5e1", fontSize: 15 }}>Отвечайте за 5 минут и сразу предлагайте живую альтернативу.</div>
              </div>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.8)", padding: "20px", borderRadius: 16 }}>
                <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>🏢 Человек ищет жилье?</div>
                <div style={{ color: "#cbd5e1", fontSize: 15 }}>Не шлите 100 ссылок — уточните бюджет, район и пришлите 3 лучших.</div>
              </div>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.8)", padding: "20px", borderRadius: 16 }}>
                <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: 17, marginBottom: 6 }}>🎓 Записался на урок?</div>
                <div style={{ color: "#cbd5e1", fontSize: 15 }}>Свяжитесь, подтвердите время и доведите до реального тестирования.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 5 (110.0s+): Final Synthesis before Outro */}
      {sec >= 110.0 && (
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
              backgroundColor: "rgba(163, 230, 53, 0.15)",
              border: "1px solid rgba(163, 230, 53, 0.4)",
              color: "#a3e635",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            ИТОГ РАЗДЕЛА · РАБОЧАЯ СТРАТЕГИЯ
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
            НЕ КУЛЬТ НОВОГО ФАЙЛА, А ПОЛЕЗНЫЙ САЙТ
          </h2>

          <div
            style={{
              maxWidth: 1050,
              width: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.94)",
              border: "2px solid #a3e635",
              borderRadius: 24,
              padding: "40px 50px",
              boxShadow: "0 0 45px rgba(163, 230, 53, 0.25)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 26, color: "#ffffff", fontWeight: 700, lineHeight: 1.45, marginBottom: 20 }}>
              Рабочая стратегия — не похороны SEO и не беготня за хайпом. <br />
              Это понятный сайт, открытый поиску, точная атрибуция и нормальная работа с каждым лидом.
            </div>
            <div style={{ fontSize: 20, color: "#a3e635", fontWeight: 800 }}>
              ➔ Считайте сделки и деньги в кассе, а не пустые краулеры в логах
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
