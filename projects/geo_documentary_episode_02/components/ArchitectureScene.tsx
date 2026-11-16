import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img } from "remotion";`nimport { imgSiteGoogleAiFeatures } from "./imageAssets";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL & SCREENCAST */}
      
      {/* 0 - 35s: Global Network Traffic */}
      <Sequence from={0} durationInFrames={Math.round(35 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:babf7448-40a1-4fcd-8e2e-bb90c7e40801"
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
              transform: `scale(${interpolate(frame, [0, 35 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 35 - 75s: AI Data Search flow */}
      <Sequence from={Math.round(35 * fps)} durationInFrames={Math.round(40 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:3a285b55-704f-429d-af3a-cc1bc481fe6b"
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
              transform: `scale(${interpolate(frame - 35 * fps, [0, 40 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 75s+: Real Google Search Central Screenshot */}
      <Sequence from={Math.round(75 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={imgSiteGoogleAiFeatures}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame - 75 * fps, [0, 45 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      <BackgroundGrid accentColor="#8b5cf6" />

      {/* SUB-PHASE 1 (0 - 35s): Search vs Generative Answer */}
      {sec < 35 && (
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
              backgroundColor: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(139, 92, 246, 0.4)",
              color: "#c084fc",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            Р­Р’РћР›Р®Р¦РРЇ РџРћРРЎРљРћР’РћР“Рћ РРќРўР•Р Р¤Р•Р™РЎРђ
          </div>

          <h2
            style={{
              fontSize: 66,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 40px",
            }}
          >
            10 РЎРРќРРҐ РЎРЎР«Р›РћРљ VS РџР РЇРњРћР™ РћРўР’Р•Рў РЎ РРЎРўРћР§РќРРљРђРњР
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#94a3b8", fontWeight: 800, marginBottom: 10 }}>
                РљР›РђРЎРЎРР§Р•РЎРљРћР• SEO
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                Р‘РѕСЂСЊР±Р° Р·Р° РїРѕР·РёС†РёСЋ
              </div>
              <div style={{ fontSize: 18, color: "#94a3b8", lineHeight: 1.4 }}>
                РџРѕР»СЊР·РѕРІР°С‚РµР»СЊ РІР±РёРІР°РµС‚ РєР»СЋС‡РµРІРёРє, РІРёРґРёС‚ СЃРїРёСЃРѕРє СЃР°Р№С‚РѕРІ Рё РєР»РёРєР°РµС‚ РїРѕ РѕС‡РµСЂРµРґРё.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: "1.5px solid rgba(139, 92, 246, 0.5)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
              }}
            >
              <div style={{ fontSize: 18, color: "#c084fc", fontWeight: 800, marginBottom: 10 }}>
                GENERATIVE ENGINE (GEO)
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#c084fc", marginBottom: 12 }}>
                Р‘РѕСЂСЊР±Р° Р·Р° С†РёС‚РёСЂРѕРІР°РЅРёРµ
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                РќРµР№СЂРѕСЃРµС‚СЊ Р°РіСЂРµРіРёСЂСѓРµС‚ С„Р°РєС‚С‹ РёР· Р»СѓС‡С€РёС… РёСЃС‚РѕС‡РЅРёРєРѕРІ Рё СЃСЂР°Р·Сѓ СЂРµРєРѕРјРµРЅРґСѓРµС‚ СЂРµС€РµРЅРёРµ.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 2 (35 - 75s): RAG & Query Fan-Out */}
      {sec >= 35 && sec < 75 && (
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
              marginBottom: 20,
            }}
          >
            РњР•РҐРђРќРРљРђ RAG & QUERY FAN-OUT
          </div>

          <h2
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 40px",
            }}
          >
            РўРћР§РќР«Р™ РћРўР’Р•Рў РџРћР‘Р•Р–Р”РђР•Рў РЎР•Рћ-РЁРЈРњ
          </h2>

          <div style={{ display: "flex", gap: 30, maxWidth: 1300, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>рџ”Ќ</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#38bdf8", marginBottom: 8 }}>
                Query Fan-Out
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.4 }}>
                Google РґРµР»РёС‚ РІРѕРїСЂРѕСЃ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ РЅР° 3вЂ“5 СЃРІСЏР·Р°РЅРЅС‹С… РїРѕРґР·Р°РїСЂРѕСЃРѕРІ РІ С„РѕРЅРѕРІРѕРј СЂРµР¶РёРјРµ.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>вљЎ</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#a855f7", marginBottom: 8 }}>
                RAG Р’РµРєС‚РѕСЂРЅС‹Р№ РџРѕРёСЃРє
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.4 }}>
                Р’ РєРѕРЅС‚РµРєСЃС‚ РїРѕРїР°РґР°СЋС‚ С„СЂР°РіРјРµРЅС‚С‹ СЃС‚СЂР°РЅРёС† СЃ С‡РµС‚РєРёРјРё СЃСѓС‰РЅРѕСЃС‚СЏРјРё: С†РµРЅС‹, РґР°С‚С‹, Р°РґСЂРµСЃР°.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid rgba(34, 197, 94, 0.5)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
                boxShadow: "0 0 25px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>рџЋЇ</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e", marginBottom: 8 }}>
                Р“РѕС‚РѕРІС‹Р№ РСЃС‚РѕС‡РЅРёРє
              </div>
              <div style={{ fontSize: 16, color: "#cbd5e1", lineHeight: 1.4 }}>
                РќРµР№СЂРѕСЃРµС‚СЊ С†РёС‚РёСЂСѓРµС‚ РёРјРµРЅРЅРѕ С‚РѕС‚ СЃР°Р№С‚, РіРґРµ РµСЃС‚СЊ РєРѕРЅРєСЂРµС‚РЅС‹Р№ Рё С‡РµСЃС‚РЅС‹Р№ РѕС‚РІРµС‚.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-PHASE 3 (75s+): Google Standard */}
      {sec >= 75 && (
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
            РћР¤РР¦РРђР›Р¬РќРђРЇ РџРћР—РР¦РРЇ GOOGLE
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
            РЎРџР•Р¦РРђР›Р¬РќР«РҐ GEO-РўР•Р“РћР’ РќР• РЎРЈР©Р•РЎРўР’РЈР•Рў
          </h2>

          <div
            style={{
              display: "flex",
              gap: 30,
              maxWidth: 1100,
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #38bdf8",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 900, color: "#38bdf8", marginBottom: 10 }}>
                Р”РћРЎРўРЈРџР•Рќ
              </div>
              <div style={{ fontSize: 17, color: "#cbd5e1" }}>
                РРЅРґРµРєСЃР°С†РёСЏ, С‡РёСЃС‚С‹Р№ robots.txt, РѕС‚РєСЂС‹С‚С‹Р№ OAI-SearchBot
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #a855f7",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 900, color: "#a855f7", marginBottom: 10 }}>
                РџРћРќРЇРўР•Рќ
              </div>
              <div style={{ fontSize: 17, color: "#cbd5e1" }}>
                Р›РѕРіРёС‡РЅР°СЏ РёРµСЂР°СЂС…РёСЏ, РјРёРєСЂРѕСЂР°Р·РјРµС‚РєР° Schema.org, СЃРµРјР°РЅС‚РёРєР°
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #22c55e",
                borderRadius: 20,
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 30, fontWeight: 900, color: "#22c55e", marginBottom: 10 }}>
                РџРћР›Р•Р—Р•Рќ
              </div>
              <div style={{ fontSize: 17, color: "#cbd5e1" }}>
                РўРѕС‡РЅС‹Рµ СѓСЃР»РѕРІРёСЏ, СЂРµР°Р»СЊРЅС‹Рµ С„РѕС‚Рѕ, С†РµРЅС‹ Рё СЂРµРіР»Р°РјРµРЅС‚С‹
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

