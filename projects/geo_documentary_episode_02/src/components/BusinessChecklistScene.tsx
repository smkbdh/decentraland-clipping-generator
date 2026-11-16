import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";
import { TechGlossaryFootnote } from "./TechGlossaryFootnote";

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
      {/* BACKGROUND B-ROLL DYNAMIC SEQUENCES */}

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
              opacity: 0.32,
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
              opacity: 0.32,
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
              opacity: 0.32,
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
              opacity: 0.32,
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
              opacity: 0.32,
              transform: `scale(${interpolate(frame - 110.0 * fps, [0, 30.0 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor={currentAccent} />

      {/* =========================================================================
          PHASE 1 (0 - 29.1s): RULE 1 CONTENT UNDER REAL QUESTIONS
          ========================================================================= */}
      {sec < 29.1 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "85px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(6, 182, 212, 0.2)",
              border: "1.5px solid rgba(6, 182, 212, 0.5)",
              color: "#22d3ee",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ШАГ 01 ИЗ 04 · ФУНДАМЕНТ
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 28px",
            }}
          >
            КОНТЕНТ ПОД РЕАЛЬНЫЕ ВОПРОСЫ КЛИЕНТОВ
          </h2>

          <div
            style={{
              maxWidth: 1350,
              width: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2.5px solid #22d3ee",
              borderRadius: 24,
              padding: "32px 42px",
              boxShadow: "0 0 45px rgba(6, 182, 212, 0.25)",
            }}
          >
            <div style={{ fontSize: 22, color: "#22d3ee", fontWeight: 900, marginBottom: 10 }}>
              1. ЦЕНЫ, УСЛОВИЯ, СРОКИ, ОГРАНИЧЕНИЯ И СРАВНЕНИЯ
            </div>
            <div style={{ fontSize: 26, color: "#f8fafc", fontWeight: 700, lineHeight: 1.35, marginBottom: 24 }}>
              Не пишите шаблонные тексты «мы лидеры рынка». Нейросети ищут конкретные сущности для ответа человеку:
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.85)", padding: "20px 22px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ color: "#38bdf8", fontWeight: 900, fontSize: 22, marginBottom: 6 }}>🚗 Аренда авто</div>
                <div style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.35 }}>Точные депозиты, условия страховки, доставка в аэропорт.</div>
              </div>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.85)", padding: "20px 22px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ color: "#f472b6", fontWeight: 900, fontSize: 22, marginBottom: 6 }}>🏢 Недвижимость</div>
                <div style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.35 }}>Договор, районы, коммунальные платежи, реальные фото.</div>
              </div>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.85)", padding: "20px 22px", borderRadius: 18, border: "1px solid rgba(255,255,255,0.15)" }}>
                <div style={{ color: "#4ade80", fontWeight: 900, fontSize: 22, marginBottom: 6 }}>🎓 Школа</div>
                <div style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.35 }}>Программа, уровни, точное расписание и пробный урок.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 2 (29.1s - 58.6s): RULE 2 TECHNICAL ACCESSIBILITY (ROBOTS.TXT MOCKUP)
          ========================================================================= */}
      {sec >= 29.1 && sec < 58.6 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "85px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(168, 85, 247, 0.2)",
              border: "1.5px solid rgba(168, 85, 247, 0.5)",
              color: "#c084fc",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ШАГ 02 ИЗ 04 · ТЕХНИЧЕСКИЙ БАЗИС
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 28px",
            }}
          >
            ТЕХНИЧЕСКАЯ ДОСТУПНОСТЬ ДЛЯ КРАУЛЕРОВ
          </h2>

          <div style={{ display: "flex", gap: 32, maxWidth: 1380, width: "100%" }}>
            {/* Left: Code Editor Mockup for robots.txt */}
            <div
              style={{
                flex: 1.15,
                backgroundColor: "rgba(15, 23, 42, 0.96)",
                border: "2.5px solid #a855f7",
                borderRadius: 24,
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 45px rgba(168, 85, 247, 0.3)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 18, color: "#c084fc", fontWeight: 900, letterSpacing: 1 }}>
                  КОНФИГУРАЦИЯ ROBOTS.TXT
                </span>
                <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 800, backgroundColor: "rgba(34,197,94,0.15)", padding: "4px 10px", borderRadius: 8 }}>
                  ОТКРЫТ ДЛЯ ИИ
                </span>
              </div>

              {/* Code Snippet Box */}
              <div
                style={{
                  backgroundColor: "#030712",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  fontFamily: "monospace",
                  fontSize: 17,
                  color: "#e2e8f0",
                  lineHeight: 1.6,
                  marginBottom: 14,
                }}
              >
                <div><span style={{ color: "#94a3b8" }}># Разрешаем поисковому роботу ChatGPT:</span></div>
                <div><span style={{ color: "#38bdf8" }}>User-agent:</span> <span style={{ color: "#facc15" }}>OAI-SearchBot</span></div>
                <div><span style={{ color: "#22c55e" }}>Allow:</span> /</div>
                <div style={{ marginTop: 6 }}><span style={{ color: "#94a3b8" }}># Разрешаем AI Overviews Google:</span></div>
                <div><span style={{ color: "#38bdf8" }}>User-agent:</span> <span style={{ color: "#facc15" }}>Google-Extended</span></div>
                <div><span style={{ color: "#22c55e" }}>Allow:</span> /</div>
              </div>

              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.35, fontWeight: 600 }}>
                Если краулер заблокирован в robots.txt или закрыт Cloudflare JS-челленджем — сайт не попадет в рекомендации.
              </div>
            </div>

            {/* Right: The LLMS.TXT Myth */}
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid rgba(239, 68, 68, 0.6)",
                borderRadius: 24,
                padding: "26px 30px",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 0 35px rgba(239, 68, 68, 0.2)",
              }}
            >
              <div style={{ fontSize: 18, color: "#ef4444", fontWeight: 900, marginBottom: 12 }}>
                НЕ ВЕРЬТЕ В ВОЛШЕБНЫЙ LLMS.TXT
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Файл не гарантирует продажи
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.4, marginBottom: 16 }}>
                Ни Google, ни OpenAI не дают приоритетных позиций за наличие <code style={{ color: "#f59e0b", fontWeight: 800 }}>llms.txt</code>.
              </div>
              <div style={{ marginTop: "auto", backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "12px 16px", fontSize: 16, color: "#fca5a5", fontWeight: 700 }}>
                ⚠️ Не превращайте техническую гипотезу в замену работающего продукта и нормального сайта.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 3 (58.6s - 87.0s): RULE 3 END-TO-END FUNNEL TRACKING
          ========================================================================= */}
      {sec >= 58.6 && sec < 87.0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "85px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              border: "1.5px solid rgba(245, 158, 11, 0.5)",
              color: "#fbbf24",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ШАГ 03 ИЗ 04 · АНАЛИТИКА
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 28px",
            }}
          >
            ИЗМЕРЯЙТЕ ВСЮ ЦЕПОЧКУ ДО СДЕЛКИ
          </h2>

          <div style={{ display: "flex", gap: 32, maxWidth: 1380, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2.5px solid #f59e0b",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 40px rgba(245, 158, 11, 0.25)",
              }}
            >
              <div style={{ fontSize: 18, color: "#fbbf24", fontWeight: 900, marginBottom: 8 }}>
                СОХРАНЯЙТЕ ИСХОДНУЮ UTM-МЕТКУ
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Первая и последняя точка контакта
              </div>
              <div style={{ fontSize: 21, color: "#cbd5e1", lineHeight: 1.45 }}>
                Разделяйте сырые клики, отправленные формы, подтвержденные диалоги и дошедшие до кассы оплаты.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid rgba(56, 189, 248, 0.6)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 35px rgba(56, 189, 248, 0.2)",
              }}
            >
              <div style={{ fontSize: 18, color: "#38bdf8", fontWeight: 900, marginBottom: 8 }}>
                КЛИЕНТЫ ≠ КРАУЛЕРЫ
              </div>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Технические метки могут расходиться
              </div>
              <div style={{ fontSize: 21, color: "#cbd5e1", lineHeight: 1.45 }}>
                Бот обучающей модели и реальный покупатель из поиска — это разные сущности. Отслеживайте их раздельно в CRM.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 4 (87.0s - 110.0s): RULE 4 SPEED OF PROCESSING AFTER CLICK
          ========================================================================= */}
      {sec >= 87.0 && sec < 110.0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "85px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              border: "1.5px solid rgba(34, 197, 94, 0.5)",
              color: "#4ade80",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ШАГ 04 ИЗ 04 · ОБРАБОТКА
          </div>

          <h2
            style={{
              fontSize: 58,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 28px",
            }}
          >
            УЛУЧШАЙТЕ ТО, ЧТО ПРОИСХОДИТ ПОСЛЕ КЛИКА
          </h2>

          <div
            style={{
              maxWidth: 1350,
              width: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2.5px solid #22c55e",
              borderRadius: 24,
              padding: "32px 42px",
              boxShadow: "0 0 45px rgba(34, 197, 94, 0.3)",
            }}
          >
            <div style={{ fontSize: 26, color: "#ffffff", fontWeight: 800, lineHeight: 1.35, marginBottom: 22 }}>
              Можно выиграть цитирование в нейросети, но проиграть деньги на плохой обработке заявки:
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.85)", padding: "20px 22px", borderRadius: 18 }}>
                <div style={{ color: "#4ade80", fontWeight: 900, fontSize: 21, marginBottom: 6 }}>🚗 Машины закончились?</div>
                <div style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.35 }}>Отвечайте за 5 минут и сразу предлагайте живую альтернативу.</div>
              </div>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.85)", padding: "20px 22px", borderRadius: 18 }}>
                <div style={{ color: "#38bdf8", fontWeight: 900, fontSize: 21, marginBottom: 6 }}>🏢 Человек ищет жилье?</div>
                <div style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.35 }}>Не шлите 100 ссылок — уточните бюджет, район и пришлите 3 лучших.</div>
              </div>
              <div style={{ flex: 1, backgroundColor: "rgba(30, 41, 59, 0.85)", padding: "20px 22px", borderRadius: 18 }}>
                <div style={{ color: "#fbbf24", fontWeight: 900, fontSize: 21, marginBottom: 6 }}>🎓 Записался на урок?</div>
                <div style={{ color: "#cbd5e1", fontSize: 18, lineHeight: 1.35 }}>Свяжитесь, подтвердите время и доведите до реального тестирования.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          PHASE 5 (110.0s+): FINAL SYNTHESIS BEFORE OUTRO
          ========================================================================= */}
      {sec >= 110.0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "85px 70px 110px",
            zIndex: 10,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              padding: "8px 24px",
              borderRadius: 30,
              backgroundColor: "rgba(163, 230, 53, 0.2)",
              border: "1.5px solid rgba(163, 230, 53, 0.5)",
              color: "#a3e635",
              fontSize: 18,
              fontWeight: 900,
              letterSpacing: 2,
              marginBottom: 14,
            }}
          >
            ИТОГ РАЗДЕЛА · РАБОЧАЯ СТРАТЕГИЯ
          </div>

          <h2
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 28px",
            }}
          >
            НЕ КУЛЬТ НОВОГО ФАЙЛА, А ПОЛЕЗНЫЙ САЙТ
          </h2>

          <div
            style={{
              maxWidth: 1300,
              width: "100%",
              backgroundColor: "rgba(15, 23, 42, 0.95)",
              border: "2.5px solid #a3e635",
              borderRadius: 24,
              padding: "36px 48px",
              boxShadow: "0 0 50px rgba(163, 230, 53, 0.3)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 28, color: "#ffffff", fontWeight: 800, lineHeight: 1.45, marginBottom: 20 }}>
              Рабочая стратегия — не похороны SEO и не беготня за хайпом. <br />
              Это понятный сайт, открытый поиску, точная атрибуция и нормальная работа с каждым лидом.
            </div>
            <div style={{ fontSize: 24, color: "#a3e635", fontWeight: 900 }}>
              ➔ Считайте сделки и деньги в кассе, а не пустые краулеры в логах
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          DYNAMIC TECH GLOSSARY FOOTNOTE (TIMED TO VOICE-OVER)
          ========================================================================= */}
      {sec < 29.1 && (
        <TechGlossaryFootnote
          term="Schema.org"
          englishTitle="Семантическая микроразметка"
          russianExplanation="Специальный формат разметки данных в HTML (Product, FAQPage), позволяющий поисковым роботам безошибочно вытаскивать цены, скидки и условия."
          accentColor="#06b6d4"
        />
      )}

      {sec >= 29.1 && sec < 58.6 && (
        <TechGlossaryFootnote
          term="robots.txt vs llms.txt"
          englishTitle="Файлы инструкций для ботов"
          russianExplanation="robots.txt регулирует доступ краулеров к страницам сайта. llms.txt — полезная экспериментальная сводка для ИИ, но без гарантий попадания в выдачу."
          accentColor="#c084fc"
        />
      )}

      {sec >= 58.6 && sec < 87.0 && (
        <TechGlossaryFootnote
          term="UTM & Атрибуция"
          englishTitle="Отслеживание источников лидов"
          russianExplanation="Технология фиксации первого и последнего клика пользователя. Позволяет точно знать, пришел клиент из ChatGPT Search, Google или Telegram."
          accentColor="#fbbf24"
        />
      )}

      {sec >= 87.0 && (
        <TechGlossaryFootnote
          term="Response Time"
          englishTitle="Скорость реакции на лид"
          russianExplanation="Время первого ответа менеджеру в WhatsApp. Ответ в течение первых 5 минут увеличивает конверсию в оплаченную бронь почти в 4 раза."
          accentColor="#22c55e"
        />
      )}
    </div>
  );
};
