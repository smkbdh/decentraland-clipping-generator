---
name: speech-qa-verification
description: >-
  Автоматическое распознавание речи и мультимодальный контроль качества: mlx-whisper, parakeet-mlx & faster-whisper
  (пословные тайминги и транскрипты), claude-video (AI-контроль видеоряда, проверка соответствия футажей сценарию).
---

# Speech Recognition & Multimodal Video QA

Этот скилл содержит стандарты сверхточного пословного распознавания речи для идеальной синхронизации видеоряда с диктором, а также мультимодальную верификацию готовых выпусков нейросетью.

---

## 1. Пословные таймкоды: `mlx-whisper` / `parakeet-mlx` / `faster-whisper`

**Репозитории:**  
- Mac (Apple Silicon): https://github.com/ml-explore/mlx-examples (mlx-whisper), https://github.com/senstella/parakeet-mlx  
- Windows / Linux (CUDA/CPU): `faster-whisper`

**Назначение:** Получение матрицы слов с абсолютными миллисекундными таймкодами начала и конца каждого слова (`start`, `end`, `word`).

### Пайплайн генерации таймингов:
```python
from faster_whisper import WhisperModel
import json

# Быстрая инференс-модель на CPU/GPU
model = WhisperModel("medium", device="auto", compute_type="int8")
segments, info = model.transcribe("voiceover.mp3", word_timestamps=True, language="ru")

words_data = []
for segment in segments:
    for word in segment.words:
        words_data.append({
            "word": word.word.strip(),
            "start": round(word.start, 3),
            "end": round(word.end, 3),
            "probability": round(word.probability, 2)
        })

with open("word_timestamps.json", "w", encoding="utf-8") as f:
    json.dump(words_data, f, ensure_ascii=False, indent=2)

print(f"Распознано слов: {len(words_data)}")
```

### Использование в Remotion:
С этими данными любая плашка, ключевая цифра или график появляются **ровно в миллисекунду произнесения слова диктором**.

---

## 2. Мультимодальный аудит видео: `claude-video`

**Репозиторий:** https://github.com/bradautomates/claude-video  
**Назначение:** Автоматический контроль качества видеоряда мультимодальной моделью перед публикацией на YouTube.

### Чеклист проверок AI-ассистента:
1. **Проверка на черный экран:** Скрипт рендерит контрольные кадры каждые 5–10 секунд и проверяет среднюю яркость (отсутствие пустых секвенций).
2. **Семантическое соответствие:** Если диктор произносит *«мы отследили лид на 4 миллиона бат»*, нейросеть сверяет, отобразился ли в этот момент скриншот переписки с клиентом Дарио, а не абстрактное видео сервера.
3. **Отсутствие наложений (Occlusion check):** Проверка, что информационные плашки не перекрывают лицо говорящего человека или важные цифры оригинального графика.
4. **Контроль читаемости (Anti-slop check):** Проверка контраста шрифтов, отсутствия кислотных градиентов и корректности русских букв (отсутствие моджибейка).
