// AI Будда — универсальный вертикальный рилс с говорящим 3D-ведущим.
// Всё содержание приходит из props (reel.json → assemble_reel.py), компонент не меняется между рилсами.
import React from "react";
import {
  AbsoluteFill,
  Audio,
  Composition,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  registerRoot,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Word = { word: string; start: number; end: number };
type Broll = { src: string; start: number; end: number; from?: number; label?: string };
type Card =
  | { type: "title"; start: number; end: number; kicker?: string; text: string; sub?: string }
  | { type: "counter"; start: number; end: number; countAt: number; to: number; prefix?: string; label: string }
  | { type: "chips"; start: number; end: number; items: { text: string; at: number; tone?: string }[] }
  | { type: "logos"; start: number; end: number; items: { src: string; name: string; at: number }[] }
  | { type: "badge"; start: number; end: number; text: string; tone?: string };
type Sfx = { src: string; at: number; volume?: number };

export type ReelProps = {
  fps: number;
  durationInFrames: number;
  frameCount: number;
  voice: string;
  music?: { src: string; volume: number; duckTo: number };
  category: string;
  handle: string;
  character: { scale: number; y: number };
  captions: Word[];
  broll: Broll[];
  cards: Card[];
  sfx: Sfx[];
  // screen tracks from the episode build (character frame pixels): hands per frame, feet shadow per frame
  tracks?: { width: number; height: number; hands: number[][][]; shadow: number[][] };
};

const C = {
  saffron: "#FF7A00",
  gold: "#FFD166",
  teal: "#00C6D7",
  ink: "#0B0D12",
  paper: "#F8FAFC",
  red: "#EF4444",
  green: "#22C55E",
};
const tone = (t?: string) => (t === "red" ? C.red : t === "green" ? C.green : t === "teal" ? C.teal : C.gold);
const FONT = "Bahnschrift, 'Segoe UI', -apple-system, sans-serif";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// ---------- фон: B-roll ----------
const BrollLayer: React.FC<{ items: Broll[] }> = ({ items }) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {items.map((b, i) => {
        const from = Math.round(b.start * fps);
        const dur = Math.max(1, Math.round((b.end - b.start) * fps));
        return (
          <Sequence key={i} from={from} durationInFrames={dur} layout="none">
            <BrollClip b={b} dur={dur} />
          </Sequence>
        );
      })}
    </>
  );
};
const BrollClip: React.FC<{ b: Broll; dur: number }> = ({ b, dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = interpolate(f, [0, dur], [1.08, 1.18], clamp);
  const fade = interpolate(f, [0, 6], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ opacity: fade, overflow: "hidden" }}>
      <OffthreadVideo
        src={staticFile(b.src)}
        startFrom={Math.round((b.from ?? 0) * fps)}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${scale})`,
          filter: "brightness(0.42) saturate(1.1) contrast(1.05)" }}
      />
      {b.label && (
        <div style={{ position: "absolute", top: 650, left: 60, padding: "8px 16px", borderRadius: 10,
          background: "rgba(11,13,18,0.78)", border: "1px solid rgba(255,255,255,0.18)", color: C.paper,
          fontFamily: FONT, fontSize: 20, fontWeight: 800, letterSpacing: "0.06em" }}>
          <span style={{ color: C.red }}>● </span>{b.label}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ---------- ведущий ----------
const Host: React.FC<{ frameCount: number; scale: number; y: number; shadow?: number[][] }> = ({ frameCount, scale, y, shadow }) => {
  const f = useCurrentFrame();
  const n = String(Math.min(frameCount, f + 1)).padStart(4, "0");
  const sh = shadow?.[Math.min(frameCount - 1, f)];
  const enter = spring({ frame: f, fps: 30, config: { damping: 18, stiffness: 120 } });
  return (
    <AbsoluteFill style={{ transform: `translateY(${y + (1 - enter) * 220}px) scale(${scale})`, transformOrigin: "50% 100%" }}>
      <div style={{ position: "absolute", left: "50%", top: "52%", width: 900, height: 900, marginLeft: -450, marginTop: -450,
        borderRadius: "50%", background: `radial-gradient(circle, ${C.saffron}55 0%, ${C.saffron}18 40%, transparent 70%)` }} />
      {sh && sh[1] < 1950 && (
        // soft contact shadow under the feet so the character stands on the ground
        <div style={{ position: "absolute", left: sh[0] - sh[2], top: sh[1] - Math.max(sh[3], sh[2] * .18), width: sh[2] * 2, height: Math.max(sh[3], sh[2] * .18) * 2,
          borderRadius: "50%", background: "radial-gradient(closest-side, rgba(0,0,0,0.55), rgba(0,0,0,0.25) 60%, transparent)" }} />
      )}
      <Img src={staticFile(`frames/frame_${n}.png`)} style={{ width: "100%", height: "100%",
        filter: "drop-shadow(0 30px 40px rgba(0,0,0,0.65))" }} />
    </AbsoluteFill>
  );
};

// ---------- субтитры: короткие фразы, текущее слово золотом ----------
function chunk(words: Word[]) {
  const out: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    const prev = words[i - 1];
    const gap = prev ? w.start - prev.end : 0;
    if (cur.length && (cur.length >= 3 || gap > 0.3 || /[.,?!]$/.test(prev.word))) {
      out.push(cur);
      cur = [];
    }
    cur.push(w);
  });
  if (cur.length) out.push(cur);
  return out;
}
// Caption bands (top y of the line, composition px). The default sits under the chest; when the hands are in
// that band during a phrase, the phrase moves to a band the hands are not in (decided once per phrase).
const BANDS = [1600, 1420, 1740];
const BAND_H = 110;
function bandFor(c: Word[], fps: number, hands?: number[][][], character?: { scale: number; y: number }) {
  if (!hands || !character) return BANDS[0];
  const f0 = Math.max(0, Math.floor((c[0].start - 0.1) * fps));
  const f1 = Math.min(hands.length - 1, Math.ceil((c[c.length - 1].end + 0.3) * fps));
  const ys: number[] = [];
  for (let f = f0; f <= f1; f += 2) {
    for (const [x, y] of hands[f] ?? []) {
      const X = 540 + (x - 540) * character.scale;
      if (X < 40 || X > 1040) continue;
      ys.push(1920 - (1920 - y) * character.scale + character.y);
    }
  }
  return BANDS.find((b) => !ys.some((y) => y > b - 40 && y < b + BAND_H + 20)) ?? BANDS[0];
}
const Captions: React.FC<{ words: Word[]; hands?: number[][][]; character?: { scale: number; y: number } }> = ({ words, hands, character }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const chunks = React.useMemo(() => chunk(words), [words]);
  const bands = React.useMemo(() => chunks.map((c) => bandFor(c, fps, hands, character)), [chunks, fps, hands, character]);
  const idx = chunks.findIndex((c, i) => t >= c[0].start - 0.05 && t < (chunks[i + 1]?.[0].start ?? c[c.length - 1].end + 0.4));
  const active = idx >= 0 ? chunks[idx] : undefined;
  if (!active) return null;
  const pop = spring({ frame: f - Math.round(active[0].start * fps), fps, config: { damping: 14, stiffness: 220 } });
  return (
    <div style={{ position: "absolute", top: bands[idx], left: 50, right: 50, display: "flex", justifyContent: "center",
      flexWrap: "wrap", gap: "0 18px", transform: `scale(${0.85 + pop * 0.15})`, zIndex: 50 }}>
      {active.map((w, i) => {
        const on = t >= w.start && t < w.end + 0.05;
        return (
          <span key={i} style={{ fontFamily: FONT, fontSize: 74, fontWeight: 900, lineHeight: 1.05, textTransform: "uppercase",
            color: on ? C.gold : C.paper, WebkitTextStroke: "3px #000", paintOrder: "stroke fill",
            textShadow: on ? `0 0 28px ${C.gold}99, 0 6px 0 #000` : "0 6px 0 #000" }}>
            {w.word.replace(/[.,]$/, "")}
          </span>
        );
      })}
    </div>
  );
};

// ---------- карточки ----------
const Panel: React.FC<{ children: React.ReactNode; accent?: string }> = ({ children, accent = C.saffron }) => (
  <div style={{ background: "rgba(11,13,18,0.86)", border: "1px solid rgba(255,255,255,0.14)", borderTop: `5px solid ${accent}`,
    borderRadius: 26, padding: "26px 34px", boxShadow: "0 24px 60px rgba(0,0,0,0.6)", fontFamily: FONT, color: C.paper }}>
    {children}
  </div>
);
const CardView: React.FC<{ card: Card }> = ({ card }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = card.start + f / fps;
  const life = (card.end - card.start) * fps;
  const inS = spring({ frame: f, fps, config: { damping: 15, stiffness: 160 } });
  const out = interpolate(f, [life - 8, life], [1, 0], clamp);
  const wrap: React.CSSProperties = { position: "absolute", top: 400, left: 60, right: 60, opacity: out,
    transform: `translateY(${(1 - inS) * -60}px)`, zIndex: 40 };
  if (card.type === "title")
    return (
      <div style={wrap}><Panel>
        {card.kicker && <div style={{ color: C.teal, fontSize: 24, fontWeight: 800, letterSpacing: "0.12em" }}>{card.kicker}</div>}
        <div style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.05, marginTop: 8 }}>{card.text}</div>
        {card.sub && <div style={{ fontSize: 30, color: "#CBD5E1", marginTop: 12, fontWeight: 600 }}>{card.sub}</div>}
      </Panel></div>
    );
  if (card.type === "counter") {
    const p = interpolate(t, [card.countAt - 0.6, card.countAt + 0.3], [0, 1], { ...clamp, easing: (x) => 1 - Math.pow(1 - x, 3) });
    const v = Math.round(card.to * p).toLocaleString("en-US");
    const hit = interpolate(t, [card.countAt + 0.3, card.countAt + 0.5, card.countAt + 0.8], [1, 1.08, 1], clamp);
    return (
      <div style={wrap}><Panel accent={C.green}>
        <div style={{ fontSize: 26, color: "#CBD5E1", fontWeight: 700, letterSpacing: "0.06em" }}>{card.label}</div>
        <div style={{ fontSize: 112, fontWeight: 900, color: C.green, fontVariantNumeric: "tabular-nums", transform: `scale(${hit})`,
          opacity: interpolate(t, [card.countAt - 0.7, card.countAt - 0.5], [0.12, 1], clamp),
          transformOrigin: "left center", textShadow: `0 0 30px ${C.green}66` }}>{card.prefix ?? ""}{v}</div>
      </Panel></div>
    );
  }
  if (card.type === "chips")
    return (
      <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: 18 }}>
        {card.items.map((c, i) => {
          const s = spring({ frame: Math.round((t - c.at) * fps), fps, config: { damping: 13, stiffness: 200 } });
          return (
            <div key={i} style={{ alignSelf: "flex-start", transform: `scale(${s})`, transformOrigin: "left center",
              background: "rgba(11,13,18,0.88)", border: `2px solid ${tone(c.tone)}`, borderRadius: 18, padding: "14px 26px",
              fontFamily: FONT, fontSize: 52, fontWeight: 900, color: tone(c.tone) }}>{c.text}</div>
          );
        })}
      </div>
    );
  if (card.type === "logos")
    return (
      <div style={{ ...wrap, display: "flex", gap: 30, justifyContent: "center" }}>
        {card.items.map((l, i) => {
          const s = spring({ frame: Math.round((t - l.at) * fps), fps, config: { damping: 12, stiffness: 200 } });
          return (
            <div key={i} style={{ transform: `scale(${s})`, display: "flex", alignItems: "center", gap: 18, background: "rgba(11,13,18,0.9)",
              border: "2px solid rgba(255,255,255,0.22)", borderRadius: 24, padding: "18px 30px", boxShadow: "0 20px 50px rgba(0,0,0,0.6)" }}>
              <div style={{ background: C.paper, borderRadius: 14, padding: 8, display: "flex" }}>
                <Img src={staticFile(l.src)} style={{ height: 58 }} />
              </div>
              <span style={{ fontFamily: FONT, fontSize: 50, fontWeight: 900, color: C.paper }}>{l.name}</span>
            </div>
          );
        })}
      </div>
    );
  return (
    <div style={{ ...wrap, display: "flex", justifyContent: "center" }}>
      <div style={{ background: tone(card.tone), color: C.ink, fontFamily: FONT, fontSize: 46, fontWeight: 900,
        padding: "14px 30px", borderRadius: 16, transform: "rotate(-2deg)", letterSpacing: "0.03em" }}>{card.text}</div>
    </div>
  );
};

// ---------- шапка ----------
const Header: React.FC<{ category: string; handle: string; total: number }> = ({ category, handle, total }) => {
  const f = useCurrentFrame();
  return (
    <>
      <div style={{ position: "absolute", top: 290, left: 60, right: 60, display: "flex", justifyContent: "space-between",
        fontFamily: FONT, zIndex: 45 }}>
        <div style={{ background: "rgba(11,13,18,0.85)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999,
          padding: "8px 20px", color: C.paper, fontSize: 22, fontWeight: 800, letterSpacing: "0.08em" }}>
          <span style={{ color: C.saffron }}>● </span>{category}
        </div>
        <div style={{ background: "rgba(11,13,18,0.85)", borderRadius: 999, padding: "8px 20px", color: C.gold,
          fontSize: 22, fontWeight: 800 }}>{handle}</div>
      </div>
      <div style={{ position: "absolute", top: 352, left: 60, right: 60, height: 4, background: "rgba(255,255,255,0.12)",
        borderRadius: 2, zIndex: 45 }}>
        <div style={{ height: "100%", width: `${(f / total) * 100}%`, background: `linear-gradient(90deg, ${C.saffron}, ${C.gold})` }} />
      </div>
    </>
  );
};

// ---------- сборка ----------
const Reel: React.FC<ReelProps> = (p) => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, overflow: "hidden" }}>
      <BrollLayer items={p.broll} />
      <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(11,13,18,0.85) 0%, rgba(11,13,18,0.1) 30%, rgba(11,13,18,0.1) 70%, rgba(11,13,18,0.9) 100%)" }} />
      <Host frameCount={p.frameCount} scale={p.character.scale} y={p.character.y} shadow={p.tracks?.shadow} />
      {p.cards.map((c, i) => (
        <Sequence key={i} from={Math.round(c.start * fps)} durationInFrames={Math.max(1, Math.round((c.end - c.start) * fps))} layout="none">
          <CardView card={c} />
        </Sequence>
      ))}
      <Captions words={p.captions} hands={p.tracks?.hands} character={p.character} />
      <Header category={p.category} handle={p.handle} total={p.durationInFrames} />
      <Audio src={staticFile(p.voice)} />
      {p.music && <Audio src={staticFile(p.music.src)} loop
        volume={(fr) => { const t = fr / fps; const on = p.captions.some((w) => t >= w.start - 0.15 && t <= w.end + 0.3);
          const fade = interpolate(fr, [0, 15, p.durationInFrames - 20, p.durationInFrames], [0, 1, 1, 0], clamp);
          return (on ? p.music!.duckTo : p.music!.volume) * fade; }} />}
      {p.sfx.map((s, i) => (
        <Sequence key={i} from={Math.max(0, Math.round(s.at * fps))} layout="none">
          <Audio src={staticFile(s.src)} volume={s.volume ?? 0.35} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

const Root = () => (
  <Composition id="BuddahReel" component={Reel as unknown as React.FC<Record<string, unknown>>}
    width={1080} height={1920} fps={30} durationInFrames={30}
    defaultProps={{ fps: 30, durationInFrames: 30, frameCount: 1, voice: "voice.wav", category: "", handle: "@BUDDAH_AI",
      character: { scale: 0.8, y: 300 }, captions: [], broll: [], cards: [], sfx: [] } as Record<string, unknown>}
    calculateMetadata={({ props }) => ({ durationInFrames: (props as unknown as ReelProps).durationInFrames,
      fps: (props as unknown as ReelProps).fps })}
  />
);
registerRoot(Root);
