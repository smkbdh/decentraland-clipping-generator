from faster_whisper import WhisperModel
import json

model = WhisperModel("base", device="cpu", compute_type="int8")
audio_path = r"C:\Users\humun\.gemini\antigravity\brain\347c6e35-8b2f-4423-aab7-8e37cef363f8\.user_uploaded\uploaded_media_1793686138443.mp3"

segments, info = model.transcribe(audio_path, language="ru", word_timestamps=True)
results = []
for seg in segments:
    words = [{"word": w.word, "start": round(w.start, 2), "end": round(w.end, 2)} for w in (seg.words or [])]
    results.append({
        "start": round(seg.start, 2),
        "end": round(seg.end, 2),
        "text": seg.text.strip(),
        "words": words
    })

print(f"Detected {len(results)} segments.")
out_json = r"d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\mastered_releases\track_05\timestamps.json"
with open(out_json, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

for r in results:
    print(f"[{r['start']}s - {r['end']}s]: {r['text']}")
