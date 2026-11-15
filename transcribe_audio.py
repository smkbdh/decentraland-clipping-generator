import json
import time
from faster_whisper import WhisperModel

audio_path = r"D:\Buddah\ai boom.mp3"
output_path = r"D:\Buddah\ai_boom_assets\transcript.json"

print("Loading Whisper model...")
model = WhisperModel("base", device="cpu", compute_type="int8")

print(f"Transcribing {audio_path}...")
start_time = time.time()
segments, info = model.transcribe(audio_path, language="ru", word_timestamps=True)

results = []
for segment in segments:
    words = []
    if segment.words:
        for w in segment.words:
            words.append({
                "word": w.word,
                "start": round(w.start, 2),
                "end": round(w.end, 2),
                "prob": round(w.probability, 2)
            })
    results.append({
        "id": segment.id,
        "start": round(segment.start, 2),
        "end": round(segment.end, 2),
        "text": segment.text.strip(),
        "words": words
    })
    print(f"[{round(segment.start, 1)}s -> {round(segment.end, 1)}s]: {segment.text.strip()[:60]}")

with open(output_path, "w", encoding="utf-8") as f:
    json.dump({"language": info.language, "duration": info.duration, "segments": results}, f, ensure_ascii=False, indent=2)

print(f"Done in {round(time.time() - start_time, 1)}s. Saved to {output_path}")
