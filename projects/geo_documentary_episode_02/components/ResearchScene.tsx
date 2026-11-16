import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img } from "remotion";`nimport { imgSiteMarieHaynes } from "./imageAssets";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const ResearchScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* BACKGROUND FOOTAGE & REAL SCREENCAST */}

      {/* 0 - 29s: Real Marie Haynes Article Screenshot in Motion */}
      <Sequence from={0} durationInFrames={Math.round(29 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={imgSiteMarieHaynes}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame, [0, 29 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 29 - 58s: High-tech Financial & Analytics Growth Video */}
      <Sequence from={Math.round(29 * fps)} durationInFrames={Math.round(29 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:acc1c6d8-d4bb-485f-9fc0-7675b51f9951"
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
              transform: `scale(${interpolate(frame - 29 * fps, [0, 29 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 58s+: Data Center Servers */}
      <Sequence from={Math.round(58 * fps)} layout="none">
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
              opacity: 0.35,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#f59e0b" />

      {/* PHASE 1 (0 - 29s): Marie Haynes 145M Sessions */}
      {sec < 29 && (
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
              marginBottom: 20,
            }}
          >
            РРЎРЎР›Р•Р”РћР’РђРќРР• MARIE HAYNES В· 12 РњР•РЎРЇР¦Р•Р’
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
            Р Р•РђР›Р¬РќР«Р™ РћР‘РЄРЃРњ РўР РђР¤РРљРђ: РњРђРЎРЁРўРђР‘ GOOGLE
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                CHATGPT / GOOGLE ORGANIC
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#f59e0b", letterSpacing: -1 }}>
                0.62%
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1" }}>
                Р”РѕР»СЏ РїРµСЂРµС…РѕРґРѕРІ РѕС‚ РѕР±С‰РµРіРѕ РїРѕРёСЃРєРѕРІРѕРіРѕ РѕР±СЉРµРјР°
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                Р’РЎР• РќР•Р™Р РћРЎР•РўР Р’РњР•РЎРўР•
              </div>
              <div style={{ fontSize: 80, fontWeight: 900, color: "#38bdf8", letterSpacing: -1 }}>
                0.73%
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1" }}>
                ChatGPT + Perplexity + Claude + Copilot
              </div>
            </div>
          </div>

          <div style={{ marginTop: 28, fontSize: 17, color: "#64748b", fontWeight: 600 }}>
            Р’С‹Р±РѕСЂРєР°: 100 РєРѕРјРјРµСЂС‡РµСЃРєРёС… СЃР°Р№С‚РѕРІ В· 145 000 000+ РїРѕР»СЊР·РѕРІР°С‚РµР»СЊСЃРєРёС… СЃРµСЃСЃРёР№
          </div>
        </div>
      )}

      {/* PHASE 2 (29 - 58s): The Conversion Paradox */}
      {sec >= 29 && sec < 58 && (
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
            РџРђР РђР”РћРљРЎ РљРћРќР’Р•Р РЎРР (55 РЎРђР™РўРћР’ РЎ РўР Р•РљРРќР“РћРњ)
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
            РљРћРќР’Р•Р РЎРРЇ Р’ 4.5 Р РђР—Рђ Р’Р«РЁР• Р§Р•Рњ Р’ РџРћРРЎРљР•
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "2px solid #22c55e",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
                boxShadow: "0 0 35px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 18, color: "#86efac", fontWeight: 800, marginBottom: 8 }}>
                CHATGPT CONVERSION RATE
              </div>
              <div style={{ fontSize: 88, fontWeight: 900, color: "#22c55e", letterSpacing: -1 }}>
                13.8%
              </div>
              <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 600 }}>
                РЎРІРµСЂС…РІС‹СЃРѕРєР°СЏ РјРѕС‚РёРІР°С†РёСЏ Рё РіРѕС‚РѕРІРЅРѕСЃС‚СЊ Рє СЃРґРµР»РєРµ
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 24,
                padding: "32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 800, marginBottom: 8 }}>
                GOOGLE ORGANIC RATE
              </div>
              <div style={{ fontSize: 88, fontWeight: 900, color: "#94a3b8", letterSpacing: -1 }}>
                3.02%
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 600 }}>
                РљР»Р°СЃСЃРёС‡РµСЃРєРёР№ РїРѕРёСЃРєРѕРІС‹Р№ С‚СЂР°С„РёРє
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3 (58s+): Analytics Trap */}
      {sec >= 58 && (
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
              backgroundColor: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              color: "#ef4444",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            Р“Р›РђР’РќРђРЇ Р›РћР’РЈРЁРљРђ РђРќРђР›РРўРРљР
          </div>

          <h2
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 30px",
            }}
          >
            45 РР— 100 РЎРђР™РўРћР’ РќР• РќРђРЎРўР РћРР›Р KEY EVENTS
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: 24,
              padding: "36px 50px",
              maxWidth: 1000,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, color: "#f8fafc", fontWeight: 700, lineHeight: 1.4, marginBottom: 20 }}>
              РљСЂР°СЃРёРІС‹Рµ РіСЂР°С„РёРєРё РІРёР·РёС‚РѕРІ РЅРёС‡РµРіРѕ РЅРµ РіРѕРІРѕСЂСЏС‚ Рѕ РґРµРЅСЊРіР°С…. Р‘РµР· СЃРѕР±С‹С‚РёР№РЅРѕР№ Р°РЅР°Р»РёС‚РёРєРё Р±РёР·РЅРµСЃ РЅРµ Р·РЅР°РµС‚, РєС‚Рѕ РїСЂРёС€С‘Р»: Р±РѕС‚ РёР»Рё РїРѕРєСѓРїР°С‚РµР»СЊ.
            </div>
            <div style={{ fontSize: 20, color: "#38bdf8", fontWeight: 800 }}>
              вћ” РњС‹ РѕС‚СЃР»РµР¶РёРІР°РµРј С†РµРїРѕС‡РєСѓ РґРѕ СѓРІРµРґРѕРјР»РµРЅРёСЏ Р±РѕС‚Р°, WhatsApp Рё РґРѕРіРѕРІРѕСЂР°
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

