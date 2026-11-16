import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img } from "remotion";`nimport { imgSiteOpenAiBots } from "./imageAssets";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL VIDEO SEQUENCES (VOX / NETFLIX STANDARD) */}
      
      {/* 0 - 24s: Developer Coding / Tech office */}
      <Sequence from={0} durationInFrames={Math.round(24 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:ba2a1911-33c4-42cc-ae01-9b485a066c3e"
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
            src={imgSiteOpenAiBots}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.25,
              filter: "blur(4px)",
              transform: `scale(${interpolate(frame - 48 * fps, [0, 26 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 74 - 100.8s: Server Token Cost Rack */}
      <Sequence from={Math.round(74 * fps)} durationInFrames={Math.round(26.8 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:06688666-3065-4f88-b018-fc86374f4f8b"
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
            Р”РћРљРЈРњР•РќРўРђР›Р¬РќРћР• Р РђРЎРЎР›Р•Р”РћР’РђРќРР•
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
            GEO Р РўР РђР¤РРљ РР— РќР•Р™Р РћРЎР•РўР•Р™: <br />
            <span style={{ color: "#38bdf8" }}>РќРћР’РђРЇ Р—РћР›РћРўРђРЇ Р–РР›Рђ</span> РР›Р Р‘РћРўР«?
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
                Р§РўРћ РџРћРљРђР—Р«Р’РђР®Рў Р’ РџР Р•Р—Р•РќРўРђР¦РРЇРҐ
              </div>
              <div style={{ fontSize: 36, color: "#ef4444", fontWeight: 900 }}>
                РўР РђР¤РРљ РљР РђРЈР›Р•Р РћР’
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
                Р§РўРћ РќРЈР–РќРћ Р‘РР—РќР•РЎРЈ
              </div>
              <div style={{ fontSize: 36, color: "#22c55e", fontWeight: 900 }}>
                Р Р•РђР›Р¬РќР«Р• РљР›РР•РќРўР« Р Р”Р•РќР¬Р“Р
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
            Р¤РЈРќР”РђРњР•РќРўРђР›Р¬РќРђРЇ Р РђР—РќРР¦Рђ
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
            РњРђРЎРЎРћР’Р«Р™ РўР РђР¤РРљ VS Р“РћРўРћР’Р«Р™ РљР›РР•РќРў
          </h2>

          <div style={{ display: "flex", gap: 40, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#38bdf8", fontWeight: 800, marginBottom: 10 }}>
                GOOGLE SEARCH (SEO)
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                РћРіСЂРѕРјРЅС‹Р№ РѕР±СЉС‘Рј
              </div>
              <div style={{ fontSize: 20, color: "#94a3b8", lineHeight: 1.4 }}>
                РњРёР»Р»РёРѕРЅС‹ Р·Р°РїСЂРѕСЃРѕРІ, СЃСЂР°РІРЅРµРЅРёРµ РІР°СЂРёР°РЅС‚РѕРІ, РґР»РёС‚РµР»СЊРЅС‹Р№ СЃРµСЂС„РёРЅРі РїРѕ СЃСЃС‹Р»РєР°Рј.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.88)",
                border: "1px solid rgba(168, 85, 247, 0.4)",
                borderRadius: 24,
                padding: "32px",
                boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)",
              }}
            >
              <div style={{ fontSize: 18, color: "#c084fc", fontWeight: 800, marginBottom: 10 }}>
                CHATGPT & AI (GEO)
              </div>
              <div style={{ fontSize: 40, fontWeight: 900, color: "#c084fc", marginBottom: 12 }}>
                Р’С‹СЃРѕРєР°СЏ РєРѕРЅРІРµСЂСЃРёСЏ
              </div>
              <div style={{ fontSize: 20, color: "#cbd5e1", lineHeight: 1.4 }}>
                РўРѕС‡РµС‡РЅС‹Рµ РїРѕР»СЊР·РѕРІР°С‚РµР»Рё СЃ РїСЂСЏРјС‹Рј РЅР°РјРµСЂРµРЅРёРµРј Р±СЂРѕРЅРёСЂРѕРІР°РЅРёСЏ Рё РїРѕРєСѓРїРєРё.
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
              padding: "4px 16px",
              borderRadius: 20,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#94a3b8",
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: 1.5,
              marginBottom: 16,
            }}
          >
            Р Р•РђР›Р¬РќРђРЇ Р’РћР РћРќРљРђ Р—РђРџР РћРЎРћР’
          </div>

          <h2
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              margin: "0 0 45px",
            }}
          >
            Р“Р›РђР’РќР«Р™ РўР Р®Рљ Р’ РћРўР§РЃРўРђРҐ: 3 Р РђР—РќР«РҐ Р­РўРђРџРђ
          </h2>

          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(239, 68, 68, 0.5)",
                borderRadius: 20,
                padding: "26px 36px",
                textAlign: "center",
                width: 320,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>рџ¤–</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#ef4444", marginBottom: 8 }}>
                1. РљР РђРЈР›Р•Р 
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.35 }}>
                РЎРєР°РЅРёСЂСѓРµС‚ СЃС‚СЂР°РЅРёС†Сѓ РґР»СЏ РёРЅРґРµРєСЃР° Рё РѕР±СѓС‡РµРЅРёСЏ РјРѕРґРµР»РµР№
              </div>
            </div>

            <div style={{ fontSize: 36, color: "#64748b", fontWeight: 900 }}>вћ”</div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(245, 158, 11, 0.5)",
                borderRadius: 20,
                padding: "26px 36px",
                textAlign: "center",
                width: 320,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>рџ‘†</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#f59e0b", marginBottom: 8 }}>
                2. РџР•Р Р•РҐРћР”
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.35 }}>
                Р§РµР»РѕРІРµРє РїРµСЂРµС…РѕРґРёС‚ РїРѕ СЃСЃС‹Р»РєРµ-СЂРµРєРѕРјРµРЅРґР°С†РёРё РЅРµР№СЂРѕСЃРµС‚Рё
              </div>
            </div>

            <div style={{ fontSize: 36, color: "#64748b", fontWeight: 900 }}>вћ”</div>

            <div
              style={{
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid rgba(34, 197, 94, 0.6)",
                borderRadius: 20,
                padding: "26px 36px",
                textAlign: "center",
                width: 320,
                boxShadow: "0 0 35px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 8 }}>рџ’°</div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#22c55e", marginBottom: 8 }}>
                3. РљР›РР•РќРў
              </div>
              <div style={{ fontSize: 16, color: "#f8fafc", lineHeight: 1.35 }}>
                РџРёС€РµС‚ РІ WhatsApp, РѕСЃС‚Р°РІР»СЏРµС‚ Р±СЂРѕРЅСЊ, РїРѕРєСѓРїР°РµС‚
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
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#f8fafc",
              fontSize: 15,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            РЎРџР•Р¦РР¤РРљРђР¦РРЇ OPENAI CRAWLERS
          </div>

          <h2
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              margin: "0 0 36px",
            }}
          >
            Р‘РћРўР« Р‘Р«Р’РђР®Рў Р РђР—РќР«РњР: РљРўРћ Р•РЎРўР¬ РљРўРћ?
          </h2>

          <div style={{ display: "flex", gap: 30, maxWidth: 1300, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1px solid rgba(148, 163, 184, 0.25)",
                borderRadius: 20,
                padding: "26px",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 900, color: "#94a3b8", marginBottom: 8 }}>
                GPTBot
              </div>
              <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 700, marginBottom: 8 }}>
                РћР±СѓС‡РµРЅРёРµ РјРѕРґРµР»РµР№
              </div>
              <div style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.4 }}>
                РћР±С…РѕРґРёС‚ РјРёР»Р»РёРѕРЅС‹ СЃС‚СЂР°РЅРёС† РґР»СЏ РґР°С‚Р°СЃРµС‚РѕРІ LLM. Р­С‚Рѕ С‡РёСЃС‚С‹Рµ СЃРµСЂРІРµСЂРЅС‹Рµ Р·Р°РїСЂРѕСЃС‹, РЅРµ РєР»РёРµРЅС‚С‹.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1.5px solid rgba(56, 189, 248, 0.5)",
                borderRadius: 20,
                padding: "26px",
                boxShadow: "0 0 25px rgba(56, 189, 248, 0.2)",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 900, color: "#38bdf8", marginBottom: 8 }}>
                OAI-SearchBot
              </div>
              <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 700, marginBottom: 8 }}>
                РџРѕРёСЃРє РІ ChatGPT Search
              </div>
              <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.4 }}>
                РРЅРґРµРєСЃРёСЂСѓРµС‚ СЃРІРµР¶РёР№ РєРѕРЅС‚РµРЅС‚ СЃРїРµС†РёР°Р»СЊРЅРѕ РґР»СЏ РіРµРЅРµСЂР°С‚РёРІРЅС‹С… РѕС‚РІРµС‚РѕРІ СЃ РёСЃС‚РѕС‡РЅРёРєР°РјРё.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                border: "1.5px solid rgba(34, 197, 94, 0.5)",
                borderRadius: 20,
                padding: "26px",
                boxShadow: "0 0 25px rgba(34, 197, 94, 0.2)",
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 22, fontWeight: 900, color: "#22c55e", marginBottom: 8 }}>
                ChatGPT-User
              </div>
              <div style={{ fontSize: 18, color: "#f8fafc", fontWeight: 700, marginBottom: 8 }}>
                Р”РµР№СЃС‚РІРёРµ РїРѕР»СЊР·РѕРІР°С‚РµР»СЏ
              </div>
              <div style={{ fontSize: 15, color: "#cbd5e1", lineHeight: 1.4 }}>
                РћС‚РєСЂС‹РІР°РµС‚ СЃС‚СЂР°РЅРёС†Сѓ РІ СЂРµР°Р»СЊРЅРѕРј РІСЂРµРјРµРЅРё, РєРѕРіРґР° РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ РїСЂРѕСЃРёС‚ РїСЂРѕС‡РёС‚Р°С‚СЊ СЃСЃС‹Р»РєСѓ.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

