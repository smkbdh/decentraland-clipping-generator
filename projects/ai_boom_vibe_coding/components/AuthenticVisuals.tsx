import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

// 1. TWEET CARD (Authentic X / Twitter interface)
interface TweetCardProps {
  name: string;
  handle: string;
  avatarColor?: string;
  avatarInitials: string;
  verified?: boolean;
  date: string;
  content: string;
  metrics?: { views?: string; likes?: string; retweets?: string };
  isAlert?: boolean;
  alertBadge?: string;
  scale?: number;
}

export const TweetCard: React.FC<TweetCardProps> = ({
  name,
  handle,
  avatarColor = "#1d9bf0",
  avatarInitials,
  verified = true,
  date,
  content,
  isAlert = false,
  alertBadge,
  scale = 1,
}) => {
  return (
    <div
      style={{
        width: 1080,
        background: isAlert ? "rgba(25, 10, 15, 0.94)" : "rgba(10, 15, 26, 0.92)",
        border: `1.5px solid ${isAlert ? "rgba(239, 68, 68, 0.8)" : "rgba(56, 189, 248, 0.35)"}`,
        borderRadius: 24,
        padding: "38px 44px",
        boxShadow: isAlert
          ? "0 25px 60px rgba(239, 68, 68, 0.35), 0 0 30px rgba(239, 68, 68, 0.2)"
          : "0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)",
        backdropFilter: "blur(24px)",
        transform: `scale(${scale})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top Banner if Alert */}
      {isAlert && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #ef4444 0%, #dc2626 100%)",
            boxShadow: "0 0 12px #ef4444",
          }}
        />
      )}

      {/* Header: Avatar, Name, Handle, Date, Badge */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* Avatar circle */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 22,
              fontWeight: 900,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
            }}
          >
            {avatarInitials}
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 32, fontWeight: 800, color: "#ffffff" }}>{name}</span>
              {false && verified && (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1d9bf0">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238.65 1.273 2.02 2.148 3.6 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.72 4.22l-3.54-3.54 1.41-1.41 2.13 2.12 6.36-6.36 1.41 1.41-7.77 7.78z" />
                </svg>
              )}
            </div>
            <div style={{ fontSize: 22, color: "#cbd5e1", fontWeight: 600 }}>
              {handle} · {date}
            </div>
          </div>
        </div>

        {alertBadge ? (
          <div
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.6)",
              color: "#f87171",
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {alertBadge}
          </div>
        ) : (
          <div style={{ color: "#64748b", fontSize: 24, fontWeight: 700 }}>𝕏</div>
        )}
      </div>

      {/* Body text */}
      <div
        style={{
          fontSize: 36,
          color: isAlert ? "#fecaca" : "#f1f5f9",
          lineHeight: 1.5,
          fontWeight: 600,
          whiteSpace: "pre-line",
          marginBottom: 20,
        }}
      >
        {content}
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.14)", paddingTop: 14, color: "#cbd5e1", fontSize: 22, fontWeight: 700 }}>
        РЕКОНСТРУКЦИЯ · НЕ СКРИНШОТ ПОСТА
      </div>
    </div>
  );
};

// 2. LATKA / TECHCRUNCH DEAL PROOF CARD
export const DealProofCard: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div
      style={{
        width: 1120,
        background: "rgba(10, 15, 30, 0.94)",
        border: "1.5px solid rgba(56, 189, 248, 0.4)",
        borderRadius: 24,
        padding: "32px 36px",
        boxShadow: "0 30px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(56, 189, 248, 0.2)",
        backdropFilter: "blur(24px)",
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              padding: "4px 12px",
              borderRadius: 8,
              background: "#3b82f6",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            M&A ОФИЦИАЛЬНО
          </div>
          <span style={{ color: "#cbd5e1", fontSize: 22, fontWeight: 700 }}>WIX · 18 ИЮНЯ 2025</span>
        </div>
        <div style={{ color: "#10b981", fontSize: 18, fontWeight: 800 }}>✓ СДЕЛКА ПОДТВЕРЖДЕНА</div>
      </div>

      <h3 style={{ fontSize: 50, fontWeight: 900, color: "#ffffff", lineHeight: 1.15, margin: "0 0 14px 0" }}>
        Wix покупает Base44: около $80 млн
      </h3>
      <p style={{ fontSize: 30, color: "#e2e8f0", lineHeight: 1.35, margin: "0 0 24px 0" }}>
        Первоначальная сумма сделки; дополнительные выплаты зависят от результатов до 2029 года.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "16px 20px", borderRadius: 16 }}>
          <div style={{ fontSize: 22, color: "#cbd5e1", fontWeight: 700 }}>ПЕРВОНАЧАЛЬНО</div>
          <div style={{ fontSize: 38, color: "#38bdf8", fontWeight: 900, marginTop: 4 }}>~$80 млн</div>
        </div>
        <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "16px 20px", borderRadius: 16 }}>
          <div style={{ fontSize: 22, color: "#cbd5e1", fontWeight: 700 }}>ДОПОЛНИТЕЛЬНО</div>
          <div style={{ fontSize: 38, color: "#a855f7", fontWeight: 900, marginTop: 4 }}>Earn-out</div>
        </div>
        <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "16px 20px", borderRadius: 16 }}>
          <div style={{ fontSize: 22, color: "#cbd5e1", fontWeight: 700 }}>ИСТОЧНИК</div>
          <div style={{ fontSize: 38, color: "#10b981", fontWeight: 900, marginTop: 4 }}>Wix Newsroom</div>
        </div>
      </div>
    </div>
  );
};

// 3. OPENAI BILLING / TOKEN TRAP INVOICE
export const TokenInvoiceCard: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div
      style={{
        width: 1120,
        background: "rgba(15, 23, 42, 0.95)",
        border: "1.5px solid rgba(239, 68, 68, 0.5)",
        borderRadius: 24,
        padding: "32px 36px",
        boxShadow: "0 30px 70px rgba(0, 0, 0, 0.85), 0 0 35px rgba(239, 68, 68, 0.25)",
        backdropFilter: "blur(24px)",
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "#10a37f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontWeight: 900,
              fontSize: 18,
            }}
          >
            ✦
          </div>
          <span style={{ fontSize: 30, fontWeight: 800, color: "#ffffff" }}>Astra AI · стоимость вычислений</span>
        </div>
        <div
          style={{
            padding: "6px 14px",
            borderRadius: 16,
            background: "rgba(239, 68, 68, 0.2)",
            color: "#f87171",
            fontSize: 23,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          ИЛЛЮСТРАЦИЯ · НЕ РЕАЛЬНЫЙ СЧЕТ
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 24, color: "#cbd5e1", fontWeight: 700 }}>РАСХОДЫ НА МОДЕЛИ ЗА МЕСЯЦ</div>
          <div style={{ fontSize: 90, fontWeight: 900, color: "#ef4444", marginTop: 4, fontVariantNumeric: "tabular-nums" }}>
            до $250 тыс.
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 24, color: "#cbd5e1", fontWeight: 700 }}>ПОЛЬЗОВАТЕЛЕЙ</div>
          <div style={{ fontSize: 46, fontWeight: 900, color: "#ffffff", marginTop: 4 }}>170 тыс.</div>
        </div>
      </div>

      <div style={{ background: "rgba(0, 0, 0, 0.4)", borderRadius: 16, padding: "16px 20px" }}>
        <div style={{ fontSize: 30, color: "#e2e8f0", fontWeight: 700 }}>
          Каждый запрос клиента увеличивает себестоимость сервиса.
        </div>
      </div>
    </div>
  );
};

// 4. SECURITY & EXPLOIT INSPECTOR CARD
export const DevToolsExploitCard: React.FC<{ scale?: number }> = ({ scale = 1 }) => {
  return (
    <div
      style={{
        width: 1120,
        background: "#090d16",
        border: "1.5px solid rgba(239, 68, 68, 0.6)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 30px 70px rgba(0, 0, 0, 0.9), 0 0 30px rgba(239, 68, 68, 0.3)",
        transform: `scale(${scale})`,
      }}
    >
      {/* DevTools window top bar */}
      <div
        style={{
          background: "#1e293b",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#10b981" }} />
          <span style={{ fontSize: 24, fontFamily: "monospace", color: "#cbd5e1", marginLeft: 10 }}>
            Схема уязвимости · реконструкция
          </span>
        </div>
        <div style={{ fontSize: 22, color: "#f87171", fontWeight: 800 }}>КРИТИЧЕСКАЯ УЯЗВИМОСТЬ</div>
      </div>

      <div style={{ padding: "30px 36px", fontFamily: "monospace", fontSize: 28, lineHeight: 1.55, overflowWrap: "anywhere" }}>
        <div style={{ color: "#94a3b8" }}>// Проблема «Счастливого пути»: ИИ оставил проверку в браузере</div>
        <div style={{ color: "#38bdf8", marginTop: 8 }}>
          &gt; window.localStorage.setItem('has_active_subscription', 'true');
        </div>
        <div style={{ color: "#4ade80" }}>&lt; undefined — [СТАТУС ПОДПИСКИ ПОДМЕНЕН НА PREMIUM]</div>

        <div style={{ color: "#f87171", marginTop: 14 }}>
          &gt; console.log(window.ENV.OPENAI_API_KEY);
        </div>
        <div style={{ color: "#fca5a5", background: "rgba(239, 68, 68, 0.15)", padding: "6px 12px", borderRadius: 8 }}>
          &lt; "sk-proj-49a8f...942" — [СЕКРЕТНЫЙ КЛЮЧ СЛИТ В ОТКРЫТЫЙ ДОСТУП]
        </div>

        <div style={{ marginTop: 18, color: "#fbbf24", fontSize: 25 }}>
          ⚠️ Злоумышленники подключили бота и за 3 часа сожгли баланс API до лимита в $10,000.
        </div>
      </div>
    </div>
  );
};
