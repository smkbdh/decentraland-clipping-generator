import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img } from "remotion";`nimport { Video } from "@remotion/media";`nimport { imgSiteBencarCars, imgSiteBencarHome } from "./imageAssets";
import { BackgroundGrid } from "./BackgroundGrid";

export const BenCarRentScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND B-ROLL & REAL WEBSITE SCREENSHOTS */}
      
      {/* 0 - 38s: Real Website Screenshot benphuketcarrent.com */}
      <Sequence from={0} durationInFrames={Math.round(38 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={imgSiteBencarCars}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.28,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame, [0, 38 * fps], [1.0, 1.07], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 38 - 78s: Real Home Page Screenshot & Bot UTM Notification */}
      <Sequence from={Math.round(38 * fps)} durationInFrames={Math.round(40 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={imgSiteBencarHome}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.25,
              filter: "blur(4px)",
              transform: `scale(${interpolate(frame - 38 * fps, [0, 40 * fps], [1.04, 1.0], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 78s+: Phuket Road & Cars B-Roll */}
      <Sequence from={Math.round(78 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src="kino:18f8d087-6194-4ad8-a028-c2769ece206e" loop muted
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

      <BackgroundGrid accentColor="#10b981" />

      {/* PHASE 1 (0 - 38s): System Intro & Live UTM Chat */}
      {sec < 38 && (
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
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            РљР›РР•РќРўРЎРљРР™ РљР•Р™РЎ 01 В· РђР Р•РќР”Рђ РђР’РўРћ РќРђ РџРҐРЈРљР•РўР•
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
            BENPHUKETCARRENT.COM: Р–РР’Р«Р• Р—РђРЇР’РљР РР— CHATGPT
          </h2>

          <div
            style={{
              display: "flex",
              gap: 30,
              maxWidth: 1200,
              width: "100%",
            }}
          >
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: 20,
                padding: "30px",
              }}
            >
              <div style={{ fontSize: 16, color: "#94a3b8", fontWeight: 700, marginBottom: 8 }}>
                Р§РўРћ РњР« РџРћРЎРўР РћРР›Р Р”Р›РЇ РљР›РР•РќРўРђ
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                РРЅР¶РµРЅРµСЂРЅР°СЏ Р°СЂС…РёС‚РµРєС‚СѓСЂР° РїРѕРґ РїРѕРёСЃРє
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                РЎС‚СЂР°РЅРёС†С‹ РїРѕРґ РєР°Р¶РґСѓСЋ РјРѕРґРµР»СЊ, РїСЂРѕР·СЂР°С‡РЅС‹Рµ СѓСЃР»РѕРІРёСЏ РґРµРїРѕР·РёС‚РѕРІ, СЃС‚СЂР°С…РѕРІРєР°, Р»РѕРєР°Р»СЊРЅС‹Рµ РіРёРґС‹ Рё СЃРєРІРѕР·РЅР°СЏ UTM-Р°С‚СЂРёР±СѓС†РёСЏ.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #10b981",
                borderRadius: 20,
                padding: "30px",
                boxShadow: "0 0 30px rgba(16, 185, 129, 0.25)",
              }}
            >
              <div style={{ fontSize: 16, color: "#34d399", fontWeight: 700, marginBottom: 8 }}>
                РЈР’Р•Р”РћРњР›Р•РќРР• Р’ Р‘РћРў РљРћРњРђРќР”Р«
              </div>
              <div style={{ fontSize: 26, fontWeight: 900, color: "#10b981", marginBottom: 12 }}>
                РСЃС‚РѕС‡РЅРёРє: AI: ChatGPT
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                Р—Р°РїСЂРѕСЃ РјРіРЅРѕРІРµРЅРЅРѕ РїР°РґР°РµС‚ РјРµРЅРµРґР¶РµСЂР°Рј СЃ РјРµС‚РєРѕР№ <code style={{ color: "#38bdf8" }}>utm_source=chatgpt.com</code> Рё РїСЂСЏРјРѕР№ СЃСЃС‹Р»РєРѕР№ РЅР° РІС‹Р±СЂР°РЅРЅСѓСЋ РјР°С€РёРЅСѓ.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2 (38 - 78s): 38 WhatsApp + 6 Direct Bookings */}
      {sec >= 38 && sec < 78 && (
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
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
              color: "#34d399",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            Р¤РђРљРўРР§Р•РЎРљРР• Р”РђРќРќР«Р• Р—Рђ 2 РњР•РЎРЇР¦Рђ
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
            РўРћР§РќР«Р• РЎР›Р•Р”Р« РР— РќР•Р™Р РћРЎР•РўР Р’ РЎРРЎРўР•РњР•
          </h2>

          <div style={{ display: "flex", gap: 40, maxWidth: 1100, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid #22c55e",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 0 40px rgba(34, 197, 94, 0.25)",
              }}
            >
              <div style={{ fontSize: 18, color: "#86efac", fontWeight: 800, marginBottom: 10 }}>
                РџР•Р Р•РҐРћР”Р« Р’ WHATSAPP
              </div>
              <div style={{ fontSize: 96, fontWeight: 900, color: "#22c55e", letterSpacing: -2 }}>
                38
              </div>
              <div style={{ fontSize: 20, color: "#f8fafc", fontWeight: 600 }}>
                РљР»РёРµРЅС‚С‹ СЃ РјРµС‚РєРѕР№ ChatGPT
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.95)",
                border: "2px solid #38bdf8",
                borderRadius: 24,
                padding: "36px",
                textAlign: "center",
                boxShadow: "0 0 40px rgba(56, 189, 248, 0.25)",
              }}
            >
              <div style={{ fontSize: 18, color: "#7dd3fc", fontWeight: 800, marginBottom: 10 }}>
                РџР РЇРњР«Р• Р—РђРџР РћРЎР« РќРђ Р‘Р РћРќР¬
              </div>
              <div style={{ fontSize: 96, fontWeight: 900, color: "#38bdf8", letterSpacing: -2 }}>
                6
              </div>
              <div style={{ fontSize: 20, color: "#f8fafc", fontWeight: 600 }}>
                Р—Р°РїРѕР»РЅРµРЅРЅС‹Рµ С„РѕСЂРјС‹ СЃ РґР°С‚Р°РјРё
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PHASE 3 (78s+): 100% Fleet Booked */}
      {sec >= 78 && (
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
              backgroundColor: "rgba(234, 179, 8, 0.15)",
              border: "1px solid rgba(234, 179, 8, 0.4)",
              color: "#facc15",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            Р‘РР—РќР•РЎ-Р Р•Р—РЈР›Р¬РўРђРў Р’ Р”Р•РќР¬Р“РђРҐ
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
            Р’Р•РЎР¬ РђР’РўРћРџРђР Рљ РљР›РР•РќРўРђ РЎР”РђРќ РќРђ РќР•Р”Р•Р›Р Р’РџР•Р РЃР”
          </h2>

          <div
            style={{
              backgroundColor: "rgba(15, 23, 42, 0.92)",
              border: "1.5px solid #facc15",
              borderRadius: 24,
              padding: "36px 50px",
              maxWidth: 1100,
              textAlign: "center",
              boxShadow: "0 0 35px rgba(250, 204, 21, 0.25)",
            }}
          >
            <div style={{ fontSize: 28, color: "#f8fafc", fontWeight: 800, lineHeight: 1.35, marginBottom: 16 }}>
              РЎРїСЂРѕСЃ РїСЂРµРІС‹СЃРёР» С„РёР·РёС‡РµСЃРєСѓСЋ С‘РјРєРѕСЃС‚СЊ РїР°СЂРєР°. РќРѕРІС‹Рµ Р·Р°СЏРІРєРё РєР»РёРµРЅС‚ РїРµСЂРµРґР°С‘С‚ РїР°СЂС‚РЅС‘СЂСЃРєРёРј Р°РіРµРЅС‚СЃС‚РІР°Рј Р·Р° РєРѕРјРёСЃСЃРёСЋ.
            </div>
            <div style={{ fontSize: 22, color: "#38bdf8", fontWeight: 700 }}>
              вћ” Р Р°Р·РЅРёС†Р° РјРµР¶РґСѓ В«РЅР°СЃ РїСЂРѕСЃРєР°РЅРёСЂРѕРІР°Р» Р±РѕС‚В» Рё РїРѕР»РЅРѕСЃС‚СЊСЋ Р·Р°Р±РёС‚РѕР№ СЃРµС‚РєРѕР№ Р±СЂРѕРЅРµР№
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


