import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, Sequence, Img , staticFile } from "remotion";
import { Video } from "@remotion/media";
import { BackgroundGrid } from "./BackgroundGrid";

export const PhuketStayProScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", backgroundColor: "#07090e" }}>
      {/* 1. BACKGROUND REAL ESTATE & VILLA FOOTAGE */}
      
      {/* 0 - 45s: Luxury Phuket Villa & Pool B-Roll */}
      <Sequence from={0} durationInFrames={Math.round(45 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Img
            src={staticFile("site_phuketstaypro_vivi.png")}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.22,
              filter: "blur(3px)",
              transform: `scale(${interpolate(frame, [0, 45 * fps], [1.0, 1.06], { extrapolateRight: "clamp" })})`,
            }}
          />
        </div>
      </Sequence>

      {/* 45s+: Real Estate City & Offplan Catalog */}
      <Sequence from={Math.round(45 * fps)} layout="none">
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
          <Video
            src={staticFile("b_roll_phuket_villa.mp4")}
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

      <BackgroundGrid accentColor="#ec4899" />

      {/* PHASE 1 (0 - 45s): Live ChatGPT Lead Dario (4M THB) */}
      {sec < 45 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 60px 90px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              padding: "6px 20px",
              borderRadius: 30,
              backgroundColor: "rgba(236, 72, 153, 0.15)",
              border: "1px solid rgba(236, 72, 153, 0.4)",
              color: "#f472b6",
              fontSize: 16,
              fontWeight: 800,
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            РљР•Р™РЎ 02 В· PHUKETSTAYPRO В· РЎР’Р•Р–РР™ Р›РР” РЎР•Р“РћР”РќРЇ
          </div>

          <h2
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 24px",
            }}
          >
            РљР›РР•РќРў РР— РЎРРќР“РђРџРЈР Рђ РЎ Р‘Р®Р”Р–Р•РўРћРњ 4 РњР›Рќ Р‘РђРў (РР— CHATGPT)
          </h2>

          <div style={{ display: "flex", gap: 32, alignItems: "center", maxWidth: 1400 }}>
            {/* Screenshot 1: Telegram Bot Lead */}
            <div
              style={{
                width: 480,
                height: 520,
                borderRadius: 20,
                overflow: "hidden",
                border: "2px solid rgba(56, 189, 248, 0.5)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(56, 189, 248, 0.2)",
                position: "relative",
                backgroundColor: "#111827",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  zIndex: 5,
                  padding: "4px 12px",
                  borderRadius: 12,
                  backgroundColor: "rgba(0,0,0,0.75)",
                  color: "#38bdf8",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                Р–РР’РћР™ РЎРљР РРќРЁРћРў Р‘РћРўРђ
              </div>
              
            </div>

            {/* Middle flow summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 340 }}>
              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.92)",
                  border: "1px solid rgba(236, 72, 153, 0.35)",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 13, color: "#f472b6", fontWeight: 800 }}>РћР‘РЄР•РљРў Р Р‘Р®Р”Р–Р•Рў</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>The Title ViVi Bang Tao</div>
                <div style={{ fontSize: 16, color: "#cbd5e1" }}>4 000 000 THB (~$115 000)</div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.92)",
                  border: "1.5px solid #22c55e",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 13, color: "#86efac", fontWeight: 800 }}>РРЎРўРћР§РќРРљ РџР•Р Р•РҐРћР”Рђ</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#22c55e" }}>ai_referral В· chatgpt.com</div>
                <div style={{ fontSize: 14, color: "#94a3b8" }}>Р РµРєРѕРјРµРЅРґР°С†РёСЏ РІ РѕС‚РІРµС‚Рµ ChatGPT</div>
              </div>

              <div
                style={{
                  backgroundColor: "rgba(15, 23, 42, 0.92)",
                  border: "1px solid rgba(56, 189, 248, 0.35)",
                  borderRadius: 16,
                  padding: "16px 20px",
                }}
              >
                <div style={{ fontSize: 13, color: "#38bdf8", fontWeight: 800 }}>Р Р•РђРљР¦РРЇ РљРћРњРђРќР”Р«</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: "#ffffff" }}>Р”РёР°Р»РѕРі Р·Р° 6 РјРёРЅСѓС‚</div>
                <div style={{ fontSize: 14, color: "#cbd5e1" }}>РћС‚РїСЂР°РІРєР° PDF Р±СЂРѕС€СЋСЂС‹ РІ WhatsApp</div>
              </div>
            </div>

            {/* Screenshot 2: WhatsApp Chat */}
            <div
              style={{
                width: 480,
                height: 520,
                borderRadius: 20,
                overflow: "hidden",
                border: "2px solid rgba(34, 197, 94, 0.5)",
                boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(34, 197, 94, 0.2)",
                position: "relative",
                backgroundColor: "#111827",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  zIndex: 5,
                  padding: "4px 12px",
                  borderRadius: 12,
                  backgroundColor: "rgba(0,0,0,0.75)",
                  color: "#22c55e",
                  fontSize: 12,
                  fontWeight: 800,
                }}
              >
                Р Р•РђР›Р¬РќР«Р™ Р”РРђР›РћР“ WHATSAPP
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* PHASE 2 (45s+): Kamala Flat & Chatterbox Case */}
      {sec >= 45 && (
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
            РЎРРЎРўР•РњРќР«Р™ Р­Р¤Р¤Р•РљРў: РќР•Р”Р’РР–РРњРћРЎРўР¬ Р РЁРљРћР›Рђ CHATTERBOX
          </div>

          <h2
            style={{
              fontSize: 62,
              fontWeight: 900,
              color: "#f8fafc",
              textAlign: "center",
              lineHeight: 1.1,
              margin: "0 0 35px",
            }}
          >
            РћР‘РЄР•РљРўР« Р’ РЈРџР РђР’Р›Р•РќРР Р Р—РђРЇР’РљР РЎ РљРђР Рў
          </h2>

          <div style={{ display: "flex", gap: 36, maxWidth: 1200, width: "100%" }}>
            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #38bdf8",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#38bdf8", fontWeight: 800, marginBottom: 10 }}>
                PHUKETSTAYPRO: РћР‘РЄР•РљРў
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                РљРІР°СЂС‚РёСЂР° РЅР° РљР°РјР°Р»Рµ
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                РЎРѕР±СЃС‚РІРµРЅРЅРёРє РїСЂРёС€РµР» С‡РµСЂРµР· РїРѕРёСЃРєРѕРІСѓСЋ СЃРёСЃС‚РµРјСѓ СЃР°Р№С‚Р° Рё РѕС‚РґР°Р» РѕР±СЉРµРєС‚ РІ СѓРїСЂР°РІР»РµРЅРёРµ РєРѕРјР°РЅРґРµ. Р­С‚Рѕ СЂРµР°Р»СЊРЅР°СЏ СЂР°Р±РѕС‚Р° Рё РїСЂРёР±С‹Р»СЊ.
              </div>
            </div>

            <div
              style={{
                flex: 1,
                backgroundColor: "rgba(15, 23, 42, 0.92)",
                border: "1.5px solid #f59e0b",
                borderRadius: 24,
                padding: "32px",
              }}
            >
              <div style={{ fontSize: 18, color: "#f59e0b", fontWeight: 800, marginBottom: 10 }}>
                РЇР—Р«РљРћР’РђРЇ РЁРљРћР›Рђ CHATTERBOX
              </div>
              <div style={{ fontSize: 32, fontWeight: 900, color: "#ffffff", marginBottom: 12 }}>
                РџРѕС‚РѕРє Р»РёРґРѕРІ СЃ РєР°СЂС‚ Рё SEO
              </div>
              <div style={{ fontSize: 18, color: "#cbd5e1", lineHeight: 1.4 }}>
                РЇРЅРґРµРєСЃ, 2Р“РРЎ Рё Google РїСЂРёРІРѕРґСЏС‚ СѓС‡РµРЅРёРєРѕРІ РЅР° Р±РµСЃРїР»Р°С‚РЅС‹Р№ РїСЂРѕР±РЅС‹Р№ СѓСЂРѕРє Рё С‚РµСЃС‚РёСЂРѕРІР°РЅРёРµ. SEO РєРѕСЂРјРёС‚ РІСЃСЋ СЌС‚Сѓ СЌРєРѕСЃРёСЃС‚РµРјСѓ.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

