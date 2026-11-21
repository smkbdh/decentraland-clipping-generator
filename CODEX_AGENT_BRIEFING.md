# БРИФИНГ И АРХИТЕКТУРА ПРОЕКТА ДЛЯ АГЕНТА CODEX / GPT
**Проект:** YouTube-канал и медиа-фабрика «AI Будда» (тех-документалки, эксплейнеры, AI-автоматизация, Reels/Shorts).  
**Цель:** Полностью автоматизированный пайплайн видеопроизводства (Blender 3D + Remotion + GSAP + AI Voice & Lipsync).

---

## 1. НАД ЧЕМ РАБОТАЕМ СЕЙЧАС

1. **3D-Ведущий «AI Будда v1.0» (Постоянный цифровой спикер):**
   - **Референс:** `D:\Buddah\AI Будда v1.0 Character Sheet.png`.
   - **Стиль:** Чиби / Стилизованный дизайнерский персонаж, пропорции $\approx 2.8$ головы (высота ~1.4 м).
   - **Палитра:** Одеяние монаха Касая (`#FF7A00`), худи и штаны (`#1F1F23`), чётки и цифровые акценты (`#00C6D7`), золото/нимб/Бинди (`#FFD166`), кожа (`#F5E8DB`), волосы (`#2B2B2B`).
   - **Атрибуты:** Аниме-глаза с двойными бликами, золотой ромбовидный символ Третьего глаза на лбу, золотое кольцо в левом ухе, 5 золотых линий в причёске, чётки с золотым медальоном Ом (`ॐ`), худи с капюшоном на спине и светящимся цветком лотоса на спине, золотой нимб-аура, парящий спутник AI Cat-Bot.
   - **Риг и мимика (`Armature_Buddah`):** Полный гуманоидный скелет, интеллектуальный трекинг взгляда (`DAMPED_TRACK` на таргет), **8 базовых визем для липсинка** (`viseme_sil`, `viseme_aa`, `viseme_oh`, `viseme_ee`, `viseme_ch`, `viseme_mbp`, `viseme_fv`, `viseme_th_l`), эмоции (`smile`, `surprise`, `skeptic`, `serious`, `blinks`), выведенные через драйверы на кость `Root`.
   - **Python API автоматизации (`character_control.py`):** Программный класс `BuddahController` для управления речью, эмоциями и позами из кода.

2. **Закатный 3D-Reel «Переход: Реальность ➔ Цифровой мир ➔ Blender Viewport»:**
   - Вертикальный формат 9:16 (1080×1920), 270 кадров (9 сек), EEVEE Next, AgX.
   - **Акт 1 (к. 1–55):** Самолёт летит над закатными облаками в золотом свете.
   - **Акт 2 (к. 56–135):** Камера проникает в аккуратный салон бизнес-лайнера (navy-кресла, LED-линии).
   - **Акт 3 (к. 136–195):** Толчок турбулентности (Dutch tilt), взрыв перегородки на неоновые воксели и пролёт через зеркальный октагональный туннель.
   - **Акт 4 (к. 196–270):** Выход на бесконечную сетку 3D Viewport Blender, манипулятор 3D Gizmo, 3D Cursor, оранжевая wireframe-модель лайнера (`#FF7500`) и парящие окна шейдерных нод.

---

## 2. ГДЕ ЧТО ЛЕЖИТ (КАРТА ПУТЕЙ И ДИРЕКТОРИЙ)

### Рабочая директория (Git Workspace)
- `d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\`
- **Репозиторий:** `https://github.com/smkbdh/decentraland-clipping-generator.git` (ветка `master`).
- **Глобальное правило:** все изменения всегда коммитятся и пушатся в GitHub (`git push origin master`).

### Директория ассетов и медиа-диск продакшна
- `D:\Buddah\` — главный накопитель всех материалов канала:
  - `D:\Buddah\AI Будда v1.0 Character Sheet.png` — официальный чарт-лист персонажа со всеми ракурсами, эмоциями и палитрой.
  - `D:\Buddah\AI_BUDDAH_MASTER.blend` — автономный мастер-файл персонажа для линковки в любые видеопроекты (`Collection Linking`).
  - `D:\Buddah\ai_jet_reel.blend` — основной проект Blender (содержит сцену самолёта и сцену студии персонажа).
  - `D:\Buddah\backup_hybrid_jet_reel.blend` — бэкап проекта перед интеграцией персонажа.
  - `D:\Buddah\ai-buddah-character\renders\` — 4 тестовых рендера персонажа (front, three_quarter, side, back).
  - `D:\Buddah\hybrid_reel_*.png` — превью-кадры рила с самолётом.
  - `D:\Buddah\ai boom.mp3`, `ai boom.flp` и др. — исходники аудио/музыки для роликов.

### Исходники персонажа AI Будда
- `d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\ai-buddah-character\`
  - `ai_buddah_v1.blend` — локальный .blend файл персонажа.
  - `character_build.py` — полный скрипт сборки геометрии, шейдеров, материалов и лицевых shape keys.
  - `character_rig.py` — построение арматуры, констрейнтов трекинга глаз, привязка костей и драйверов мимики.
  - `character_control.py` — Python API класс `BuddahController` для анимации и липсинка.
  - `renders/` — готовые рендеры персонажа (`front.png`, `three_quarter.png`, `side.png`, `back.png`).

### Скрипты рила с самолётом
- `d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\scripts\`
  - `build_hybrid_jet_reel.js` — генерация мастер-сцены самолёта и перехода.
  - `render_hybrid_preview.js` — рендер контрольных кадров рила.
  - `render_character_turnaround.js` — студийный рендер 4 ракурсов персонажа.

---

## 3. СКИЛЛЫ (SKILLS) — ГДЕ ЛЕЖАТ И ЗА ЧТО ОТВЕЧАЮТ

### 1. Локальные продакшн-скиллы проекта:
Путь: `d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\.agent\skills\`
- `buddah-video-production\SKILL.md` — **Главный стандарт качества канала AI Будда** (пайплайн Remotion, GSAP, 3D, звук, AI-контроль).
- `motion-graphics-3d\SKILL.md` — Скрипты графики: GSAP таймлайны, Three.js (партиклы, ASCII-кино), ManimGX (нейросетевые графы).
- `sound-beat-sync\SKILL.md` — Аудио-инженерия: librosa (сетка долей BPM), opus-sound-layer (сведение SFX/саунд-дизайн), диаризация спикеров.
- `speech-qa-verification\SKILL.md` — Whisper (пословные тайминги), мультимодальный AI-контроль соответствия видео сценарию.
- `video-assembly-automation\SKILL.md` — Сборка исходников: auto-editor (умная резка тишины), yt-dlp, захват анимаций через Puppeteer.
- `pixelfx\SKILL.md` — 244 процедурных пиксельных VFX-эффекта кодом.
- `impeccable\SKILL.md` — UI/UX стандарты, верстка интерфейсов.
- `rea-video\SKILL.md` — Реверс-инжиниринг чужих видео (раскадровка, определение AI/3D/real footage).
- `unslop\SKILL.md` — Очистка интерфейсов от шаблонного «нейросетевого» вида.

### 2. Глобальные скиллы видео и монтажа:
- `C:\Users\humun\AppData\Roaming\Kino\skills\remotion\SKILL.md` — Best practices для Remotion в React.
- `C:\Users\humun\.gemini\skills\kino-youtube-production\SKILL.md` — Спецификация YouTube-эксплейнеров для канала.
- `C:\Users\humun\.gemini\skills\hyperframes\SKILL.md` — HyperFrames видео-движок.
- `C:\Users\humun\AppData\Roaming\Kino\skills\color-grading\SKILL.md` — Цветокоррекция и LUT.
- `C:\Users\humun\AppData\Roaming\Kino\skills\audio-mixing\SKILL.md` — Сведение многоканального звука.

---

## 4. BLENDER И MCP-ИНСТРУМЕНТЫ

- **Версия Blender:** `Blender 5.3.0` (64-bit, Windows).
- **Статус:** Blender запущен и работает в интерактивном режиме.
- **Интерфейс связи:**
  - Аддон `Blender MCP` (порт сокета по умолчанию `9876`).
  - Инструмент MCP `blender.execute_blender_code` — выполнение произвольного Python-кода внутри живого процесса Blender через `bpy`.
  - Инструмент MCP `blender.get_scene_info` — инспекция объектов сцены, активной камеры и вьюлееров.
  - Инструмент MCP `blender.get_addon_status` — проверка библиотек и генераторов.
- **Архитектура сцен в `ai_jet_reel.blend`:**
  - Сцена `Scene` — рендер самолёта (коллекция персонажа скрыта/исключена).
  - Сцена `Scene_Buddah_Studio` — выделенная студия AI Будды с камерами `Cam_Front`, `Cam_ThreeQuarter`, `Cam_Side`, `Cam_Back`, студийным светом и коллекцией `AI_BUDDAH_CHARACTER`.
