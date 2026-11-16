---
name: sound-beat-sync
description: >-
  Профессиональная звукорежиссура, ритмический монтаж и разделение спикеров: librosa (сетка долей музыки и BPM),
  opus-sound-layer (CC0 саунд-дизайн и сведение), pyannote-audio & mlx-audio (разметка спикеров и диаризация).
---

# Sound Design, Beat-Sync & Audio Intelligence

Этот скилл содержит стандарты работы со звуком: автоматический расчет ритмической сетки для монтажа в такт музыки, сведение саунд-дизайна без звукового спама и разметка нескольких говорящих людей.

---

## 1. Ритмическая сетка музыки: `librosa`

**Репозиторий:** https://github.com/librosa/librosa  
**Назначение:** Анализирует темп (BPM) и точные таймкоды музыкальных долей (beats) и сильных акцентов (downbeats). Позволяет скрипту делать склейки футажей строго в момент удара бочки/снейра.

### Рабочий Python-скрипт расчета монтажных меток:
```python
import librosa
import json

audio_path = "projects/geo_documentary_episode_02/public/neon_dreams.mp3"
y, sr = librosa.load(audio_path)

# Определяем темп и временные метки долей
tempo, beat_frames = librosa.beat.beat_track(y=y, sr=sr)
beat_times = librosa.frames_to_time(beat_frames, sr=sr)

fps = 30
beat_video_frames = [int(round(t * fps)) for t in beat_times]

# Сохраняем в JSON для таймлайна Remotion:
with open("projects/geo_documentary_episode_02/src/beat_grid.json", "w") as f:
    json.dump({
        "tempo": float(tempo),
        "beat_times": [round(float(t), 3) for t in beat_times],
        "beat_frames": beat_video_frames
    }, f, indent=2)

print(f"Готово! BPM: {tempo:.1f}, Найдено долей: {len(beat_frames)}")
```

### Монтаж в такт в Remotion:
```tsx
import beatGrid from "./beat_grid.json";

// Переход между планами или вспышка света ровно на сильную долю
const isBeatFrame = beatGrid.beat_frames.includes(frame);
```

---

## 2. Саунд-дизайн и слои: `opus-sound-layer`

**Репозиторий:** https://github.com/Bodila51/opus-sound-layer  
**Назначение:** Организация чистой библиотеки звуковых эффектов CC0 (whooshes, risers, sub-drops, digital clicks) и интеллектуальное авто-сведение (Audio Ducking).

### Золотые правила сведения для документалок:
1. **Ducking музыки под голос:**
   - Когда звучит речь диктора: громкость фоновой музыки автоматически опускается до `0.06 – 0.08`.
   - В паузах между предложениями (длительностью > 1.2с): громкость музыки плавно поднимается до `0.18 – 0.22`.
2. **SFX на переходах (Sub-bass drop):**
   - Громкость басового удара на переходе глав: `volume: 0.12 – 0.15` (не должна оглушать зрителя в наушниках).
3. **Исключение звукового спама:**
   - Никаких звуков на появление каждого отдельного слова субтитров или мелкой иконки. Звуки ставятся только на ключевые смысловые события (смена главы, появление главного графика).

---

## 3. Разметка спикеров: `pyannote-audio` & `mlx-audio`

**Репозитории:** https://github.com/pyannote/pyannote-audio | https://github.com/Blaizzy/mlx-audio  
**Назначение:** Автоматическое разделение дорожки на отрезки «кто именно сейчас говорит» (Speaker Diarization).

### Применение в монтаже:
- Автоматическое переключение планов: когда говорит Спикер 1 — камера на нем, когда вступает Спикер 2 — автоматический переход на вторую камеру.
- Автоматическая расстановка бейджей с именами и должностями в нижний титр при первой реплике нового спикера.
