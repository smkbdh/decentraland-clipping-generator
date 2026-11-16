---
name: video-assembly-automation
description: >-
  Автоматизация подготовки исходников, резки пауз и захвата видео: auto-editor (умная резка тишины),
  yt-dlp (скачивание точных отрезков видео и аудио), OpenScreen (скринкасты с автозумом), Puppeteer (покадровый захват веб-анимаций).
---

# Video Assembly & Source Automation Standard

Этот скилл содержит стандарты и рецепты для быстрой автоматической подготовки сырых материалов: вырезание пауз в длинных речевых дорожках, мгновенное скачивание фрагментов подкастов/стримов без загрузки гигабайтных видео, создание премиальных скринкастов и покадровый рендеринг веб-анимаций.

---

## 1. Резка пауз в речи: `auto-editor`

**Репозиторий:** https://github.com/WyattBlue/auto-editor  
**Назначение:** Анализирует аудиодорожку диктора, находит моменты заминок, вдохов и тишины, и вырезает их с кинематографичными допусками (margins), сокращая хронометраж на 15–30% без искажения естественности речи.

### Рабочий рецепт (CLI):
```bash
# Базовая резка тишины с запасом 0.2 секунды до и после слов:
& "C:\Users\humun\AppData\Local\Python\pythoncore-3.14-64\Scripts\auto-editor.exe" input_raw.mp4 --margin 0.2s --edit audio:threshold=4% -o output_clean.mp4

# Экспорт таймкодов в JSON для построения шкалы Sequence в Remotion:
& "C:\Users\humun\AppData\Local\Python\pythoncore-3.14-64\Scripts\auto-editor.exe" voiceover_raw.wav --export json -o cuts.json

# Умная резка с сохранением пауз на смысловых акцентах (сглаживание дыхания):
& "C:\Users\humun\AppData\Local\Python\pythoncore-3.14-64\Scripts\auto-editor.exe" talk.mp4 --margin 0.25s,0.15s --audio-speed 1.0 --silent-speed 99999
```

### Интеграция с Remotion:
Используйте полученный `cuts.json` для автоматической нарезки клипов через массив `<Sequence>`:
```tsx
import cutsData from "./cuts.json";

// cutsData содержит интервалы звучащей речи
{cutsData.chunks.map((chunk, i) => (
  <Sequence key={i} from={chunk.startFrame} durationInFrames={chunk.duration}>
    <Video src={staticFile("interview.mp4")} startFrom={chunk.sourceStartFrame} />
  </Sequence>
))}
```

---

## 2. Скачивание точных отрезков: `yt-dlp`

**Репозиторий:** https://github.com/yt-dlp/yt-dlp  
**Назначение:** Скачивание только нужной цитаты, фрагмента выступления Карпатого, Альтмана или подкаста без загрузки часового исходника.

### Рабочий рецепт (CLI):
```bash
# Скачать отрезок с 01:23:45 по 01:24:15 в максимальном качестве MP4:
& "C:\Users\humun\AppData\Local\Python\pythoncore-3.14-64\Scripts\yt-dlp.exe" \
  --download-sections "*01:23:45-01:24:15" \
  --force-keyframes-at-cuts \
  -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]" \
  -o "footage_quote_%(id)s.%(ext)s" \
  "https://www.youtube.com/watch?v=VIDEO_ID"

# Извлечь только аудиодорожку для транскрибации или анализа:
& "C:\Users\humun\AppData\Local\Python\pythoncore-3.14-64\Scripts\yt-dlp.exe" \
  --download-sections "*00:15:00-00:18:30" \
  -x --audio-format mp3 \
  -o "podcast_snippet.mp3" \
  "URL"
```

---

## 3. Скринкасты с автозумом: `OpenScreen`

**Репозиторий:** https://github.com/getopenscreen/openscreen  
**Назначение:** Запись интерфейсов программ, кода в IDE, терминалов и браузеров с динамическим зумом на курсор мыши, кинематографичным размытием фона и скруглениями углов окна.

### Правила для технологичных YouTube-роликов:
1. **Фокус на действии:** При демонстрации ввода промпта, клика по кнопке API или диффа в Git камера плавно наезжает (`scale: 1.3 – 1.6`) на фокусную зону.
2. **Скругление и тень:** Записанный скринкаст оборачивается в окно с `borderRadius: 16px`, `border: 1px solid rgba(255,255,255,0.15)` и глубокой тенью `boxShadow: 0 25px 60px rgba(0,0,0,0.7)`.
3. **Плавная траектория курсора:** Исключать резкие дергания мыши, применять интерполяцию координат (Spring physics / Bezier curve).

---

## 4. Покадровый рендеринг веб-анимаций: `Puppeteer`

**Репозиторий:** https://github.com/puppeteer/puppeteer  
**Назначение:** Запись сложных WebGL, Canvas, SVG или интерактивных веб-дашбордов кадр за кадром (frame-by-frame) без просадок FPS, дропов кадров или лагов экрана.

### Архитектурный паттерн захвата:
```javascript
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 });
await page.goto('http://localhost:5173/interactive-diagram');

// Покадровый захват с фиксированным шагом 30 кадров/сек:
for (let frame = 0; frame < 300; frame++) {
  // Продвигаем виртуальные часы в браузере
  await page.evaluate((f) => window.advanceAnimationToFrame(f), frame);
  await page.screenshot({ path: `frames/frame_${String(frame).padStart(4, '0')}.png` });
}
await browser.close();
```
Полученная секвенция кадров сшивается через `ffmpeg` в ProRes или h.264 с прозрачностью и подключается в Remotion.
