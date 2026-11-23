# MASTER ONBOARDING & CONTEXT GUIDE ДЛЯ АГЕНТА (CODEX / GPT / CLAUDE)
**Медиа-фабрика и продакшн канала «AI Будда»**  
**Назначение проекта:** Автоматизированное создание высококлассных **YouTube-эксплейнеров / тех-документалок** (16:9) и вирусных **Reels / Shorts / TikTok** (9:16).

---

## 1. СУТЬ И ГЛАВНАЯ ЦЕЛЬ ПРОЕКТА

Мы строим **автономный конвейер видеопроизводства**, где AI-агенты могут:
1. Брать сценарий и начитку спикера.
2. Автоматически нарезать паузы и расставлять пословные субтитры (Whisper).
3. Генерировать кинематографичные 3D-сцены, моушн-графику и переходы в Blender и Remotion/GSAP.
4. Управлять постоянным цифровым 3D-ведущим (**AI Будда v1.0**), синхронизируя его речь (липсинк), эмоции, позы и взгляд на камеру/слайды.
5. Сводить звук по сетке долей (BPM, саунд-дизайн, дакинг под голос).
6. Рендерить готовые видеоролики в Full HD (1080×1920 для Reels и 1920×1080 / 4K для YouTube).

---

## 2. ПОСТОЯННЫЙ 3D-ВЕДУЩИЙ: «AI БУДДА v1.0»

Персонаж создан на основе официального арт-листа: `D:\Buddah\AI Будда v1.0 Character Sheet.png`.
- **Пропорции:** Чиби / стилизованный дизайнерский персонаж, высота $\approx 2.8$ головы (~1.4 м).
- **Цветовая PBR-палитра:**
  - Одеяние монаха Касая: `#FF7A00` (шафрановый оранжевый) с золотой каймой.
  - Худи и брюки: `#1F1F23` (матовый тёмный графит).
  - Чётки (Mala) и акценты: `#00C6D7` (глянцевая бирюза с SSS).
  - Золотые элементы (Нимб, Ом, Бинди, линии волос, серьга): `#FFD166` (Metallic 0.92 + эмиссия).
  - Кожа: `#F5E8DB` (тёплый Subsurface Scattering).
  - Волосы: `#2B2B2B` с 5 золотыми геометрическими линиями пробора.
- **Ключевые детали:**
  - Большие аниме-глаза с двойными белыми бликами (Primary + Secondary).
  - Золотой ромбовидный камень Третьего глаза на лбу.
  - Золотая серьга-кольцо в левом ухе.
  - Чётки из 24 бирюзовых бусин с круглым золотым медальоном Ом (`ॐ`).
  - Капюшон на спине и светящийся 8-лепестковый цветок лотоса на спине худи.
  - Парящий золотой нимб-аура за головой.
  - Спутник AI Cat-Bot есть только на арт-листе — в 3D-мастере его пока нет.
- **Как устроена готовая модель:** портрет из `D:\Buddah\character-portrait-detail-v2\` (формы по силуэтам арт-листа, текстуры спроецированы с него). Отлично держит фронт и 3/4; в чистом профиле видны растяжки текстур — облёт камерой на 360° не делать.
- **Риг (`Armature_Buddah`, 52 кости):** Root, Pelvis, Spine, Chest, Neck, Head, Clavicle/UpperArm/Forearm/Hand ×2, Thigh/Shin/Foot ×2, пальцы `Thumb1..3_*`, `Index1..3_*`, `Middle1..3_*`, `Ring1..3_*`, `Pinky1..3_*` ×2, `SleeveEnd_*` (сужает раструб рукава при поднятой руке).
  Все лицевые контролы — кастомные свойства кости `Root`, драйверы переводят их в shape keys:
  - **Визмы:** `viseme_aa`, `viseme_oh`, `viseme_ee`, `viseme_ch`, `viseme_mbp`, `viseme_fv`, `viseme_th_l` (+ `viseme_sil` = нейтральный закрытый рот, своего shape key нет).
  - **Эмоции:** только `emotion_skeptic` и `emotion_surprise`. Smile / serious в портрете не вылеплены.
  - **Веки:** `blink_L`, `blink_R` (раздельно). Объекты `Eyelid.L/R` построены по реальному контуру глаз скриптом `ai-buddah-character/build_eyelids.py` (веко цвета кожи + линия ресниц по нижнему контуру; при 0 схлопнуто и невидимо). Перезапускать его после любых изменений текстуры или формы головы.
  - **Кисти (v3, 2026-11-23):** `Hand.L/R` — игрушечные чиби-кисти со скелетом пальцев (модификатор Armature). Генерирует `ai-buddah-character/build_hands.py`: ладонь + 5 пальцев отдельными гладкими частями (суставы — сферы, сгиб не рвётся), текстура нарисована в координатах самих пальцев (светлая спинка, тёплые тени по бокам, розовая ладонь, кончики, складки), поэтому при FLAT-рендере жест читается в любой позе. Перезапуск скрипта пересобирает кисти, кости пальцев и веса рукавов (идемпотентно).
  - **Жесты:** `ai-buddah-character/hand_gestures.py` — формы кисти `SHAPES` (fist, point, peace, ok, rock, call_me, pinch, pinched, finger_heart, crossed, vulcan, thumbs_up, open, spread, flat, cupped, heart_half, middle) и жесты `GESTURES` = форма + положение руки (руки решаются IK-решателем к цели кисти). Жест можно указать эмодзи: ☝👆🫵👈👉👍✌🤘🤙👌🤌🤏🫰🤞🖖🖕✋🖐👋🫸🫴🫳🫱🤷👐🙌🙏👏🫶🤲✊ (таблица `EMOJI`), плюс `explain`, `think`, `double_thumbs`, `point_across_*`. `👋`/`👏` при удержании качаются (`HOLD_MOTION`), остальные жесты слегка «живут» (`HOLD_DRIFT`). IK держит локоть вниз и предплечье по линии кисти, запястье ограничено (`_clamp_wrist`); переходы идут через IK-промежуточный ключ (`transition_values`) с перелётом и дотяжкой. Корпус и плечи участвуют в жесте — отдельный аддитивный NLA-слой `Body` (таблица `BODY`). Раструб поднятой руки провисает (`_sag`). Тест-листы всех жестов (3 ракурса + середина перехода), раскадровка движения и вид по кругу: `D:\Buddah\master-qa\gestures-v4\`. Проверять жесты листами, а не рендером ролика.
  - **Одежда:** рукава перерисованы `paint_sleeves.py` (2K toon-текстура, подкладка Solidify), размытые бока мантии и робы чистит `paint_mantle.py` (Cycles-бейк в новую UV, фронт/спина из арта сохраняются). Оба идемпотентны.
  - **Низ тела:** халат скиннен (`build_robe_rig.py`: кость `Skirt` от талии, веса Chest→Spine→Pelvis→Skirt). В эпизоде слой `Weight` — перенос веса (таз сдвигается и наклоняется, свободное колено сгибается, бёдра решаются так, что стопы не скользят), слой `Skirt` — подол как маятник с инерцией и лёгким покачиванием. Слои эпизода: Speech, Idle, Expression, Eye tracking, Head aim, Gesture, Body (ADD), Beats (ADD), Cloth (ADD), Eye life (ADD), Weight, Skirt. Сборка пишет `tracks.json` (руки/стопы на экране): ролик рисует тень под ногами и уводит субтитры от рук.
  - **Рот:** `jaw_open` — простое открытие (зубы + язык).
  - **Взгляд:** `gaze_x`, `gaze_z` (−1..1). Костей `Eye_Target_*` и DAMPED_TRACK нет.
- **Программный API (`BuddahController`):** файл `ai-buddah-character\character_control.py`, проверен на мастере.
  ```python
  from character_control import BuddahController
  b = BuddahController()
  b.set_viseme("aa", 0.85)           # липсинк; остаток веса уходит в viseme_sil
  b.set_visemes({"aa": .6, "oh": .4}) # коартикуляция
  b.set_emotion("skeptic")            # neutral | skeptic | surprise
  b.blink("BOTH")                     # 'L' | 'R' | 'BOTH'
  b.open_jaw(0.5)
  b.look_at((0.4, -3.0, 2.3))         # взгляд + поворот головы
  b.turn_head(yaw=0.3, nod=-0.1)
  b.set_gesture("👍")                  # любой жест из hand_gestures.GESTURES или эмодзи
  b.set_hand("R", "peace")            # только пальцы одной кисти
  b.key(frame=12)                     # ключи на все контролы, руки и пальцы
  ```
- **Файлы персонажа:**
  - `D:\Buddah\AI_BUDDAH_MASTER.blend` — единственный мастер: коллекция `AI_BUDDAH_CHARACTER` → `AI_BUDDAH_PORTRAIT` (+ `HALO`). Подключается в ролики через `Collection Linking` / Library Override. Перед правками — копия в `D:\Buddah\master-backups\`.
  - `D:\Buddah\character-portrait-detail-v2\` — исходник портрета (`build.py`, `AI_BUDDAH_PORTRAIT.blend`, контрольные рендеры). Без рига.
  - `ai-buddah-character\` (в репо) — `character_control.py`, пайплайн эпизодов: `animate_from_audio.py` → `buddah_character_director.py` → `build_linked_episode.py` → `assemble_episode.py`.
- **Конвейер рилса с говорящим ведущим (проверен 2026-11-22, пример: `D:\Buddah\reel_02_buddah_80m\`):**
  1. Голос → `animate_from_audio.py <voice> --project <reel>\character\episode.blend --aspect 9:16` (запускать `D:\Buddah\tools\speech-env\Scripts\python.exe`; faster-whisper заблокирован политикой Windows, срабатывает фолбэк на `whisper` CLI).
  2. Режиссура: агент пишет `direction.json` (`events`: камера/эмоция/жест/взгляд на каждую фразу; `gesture` — имя или эмодзи, жест держится на всю фразу, вход/выход по 0.4 с; для жестов у пояса не ставить CLOSE_UP — кисти у лица видны и в нём; пример `D:\Buddah\reel_02_buddah_80m\direction_v4.json`) → `buddah_character_director.direct` → пересборка `build_linked_episode.py`. Для 9:16 камеры уже кадрируют ведущего в нижние ~60% кадра.
  3. Кадры: `blender -b episode.blend -a` → `rgba/frame_####.png` (прозрачный фон).
  4. `reel.json` (правки субтитров, B-roll, карточки title/badge/counter/chips/logos, SFX, музыка с дакингом) → `assemble_reel.py reel.json [--still 12.5]` → Remotion-композиция `projects/geo_documentary_episode_02/src/reels/BuddahReel.tsx`. Шаблон: `ai-buddah-character/examples/reel_80m.json`.
  - Старый процедурный greybox (`character_build.py`, `character_rig.py`, `ai_buddah_v1.blend`) удалён — не восстанавливать и не ссылаться.

---

## 3. ГОТОВЫЙ 3D-РЕЙЛ ДЛЯ REELS / SHORTS (9:16)

Отрендеренное мастер-видео: [`D:\Buddah\AI_BUDDAH_MASTER_ANIMATION.mp4`](file:///D:/Buddah/AI_BUDDAH_MASTER_ANIMATION.mp4) (копия в корне репо: `AI_BUDDAH_MASTER_ANIMATION.mp4`).
- **Спецификации:** 1080×1920 Full HD, 9.0 секунд (270 кадров @ 30 FPS), H.264 High Profile, EEVEE Next.
- **Сюжет:**
  1. *Акт 1 (0–1.8 с):* Полёт лайнера над золотыми закатными облаками.
  2. *Акт 2 (1.8–4.5 с):* Влёт сквозь иллюминатор в салон бизнес-класса.
  3. *Акт 3 (4.5–6.5 с):* Толчок турбулентности (Dutch tilt), взрыв переборки на неоновые воксели и пролёт через зеркальный геометрический туннель.
  4. *Акт 4 (6.5–9.0 с):* Мета-выход в 3D Viewport Blender с оранжевой wireframe-моделью, осями Gizmo и парящими шейдерными нодами.

---

## 4. MCP-СЕРВЕРЫ И ПОДКЛЮЧЕНИЯ (КАК УПРАВЛЯТЬ СИСТЕМОЙ)

### 1. Blender MCP Server
- **Версия:** Blender 5.3.0 (64-bit Windows).
- **Как работает:** В запущенном Blender работает аддон `Blender MCP`, слушающий локальный TCP сокет по адресу `127.0.0.1:9876`.
- **MCP-инструменты агента:**
  - `blender.execute_blender_code` — выполнить любой Python-код внутри Blender (`bpy`, `bmesh`, `mathutils`).
  - `blender.get_scene_info` — инспекция активной сцены, камеры, объектов.
  - `blender.get_addon_status` — статус библиотек (Poly Haven, Sketchfab, Tripo, Meshy).
- **Связь через Node.js / Python сокет:**
  Можно отправлять JSON напрямую:
  ```json
  {"type": "execute_code", "params": {"code": "import bpy; print('Hello from Agent')"}}
  ```
- **CLI-рендер без GUI:**
  `& "C:\Program Files\Blender Foundation\Blender 5.3\blender.exe" -b "D:\Buddah\AI_BUDDAH_MASTER.blend" -S "Scene" -s 1 -e 270 -a`

### 2. Remotion в браузере (монтаж выпусков)
- Kino Desktop **больше не используется** (MCP отключён, `kino_bridge.py` удалён). Не подключать Kino и не использовать ссылки `kino:<uuid>`.
- Монтаж: проект Remotion, превью в браузерном Remotion Studio (`npx remotion studio`), проверка кадров `npx remotion still`, финал `npx remotion render`.
- Медиа — в `public/` проекта через `staticFile(...)`. Старые проекты в `projects\` ещё содержат `kino:`-ссылки: перед рендером их надо заменить на `staticFile`.

### 3. FFmpeg CLI
- Установлен и доступен глобально: `ffmpeg.exe`. Используется для сборки секвенций кадров в MP4 и обработки аудио.

---

## 5. ПОЛНАЯ КАРТА СКИЛЛОВ (SKILLS)

Скиллы — это специализированные алгоритмические инструкции и кодовые модули для агентов.

### Локальные скиллы канала «AI Будда» (`.agent\skills\`):
1. **`buddah-video-production`**:
   - Главная конституция и стандарт качества видеоканала AI Будда.
   - Стек: Remotion (React), GSAP, Blender 3D, саунд-дизайн, AI-контроль.
   - Правила вёрстки плашек, шрифтов, темпоритма монтажа.
2. **`buddah-character-director`**:
   - Режиссура персонажа AI Будда в Blender: построение планов (крупный, средний, общий), переключение эмоций, речевые ключи из аудиозаписи.
3. **`motion-graphics-3d`**:
   - Продвинутая графика для тех-документалок: GSAP таймлайны и титры, Three.js (партиклы, ASCII-кино), Anatomy (изометрические схемы архитектуры систем), ManimGX (математические и нейросетевые графы кодом).
4. **`sound-beat-sync`**:
   - Профессиональная звукорежиссура и ритмический монтаж: `librosa` (сетка долей музыки, BPM), `opus-sound-layer` (библиотека CC0 звуков, саунд-дизайн, свиши, импакты, дакинг музыки под голос).
5. **`speech-qa-verification`**:
   - Автоматическое распознавание речи и контроль качества: `faster-whisper` / `mlx-whisper` (пословные тайминги для субтитров), мультимодальный AI-контроль соответствия видеоряда сценарию.
6. **`video-assembly-automation`**:
   - Автоматизация сборки исходников: `auto-editor` (умная резка тишины в начитке), `yt-dlp` (скачивание точных фрагментов видео/аудио), `OpenScreen` (скринкасты с автозумом), `Puppeteer` (покадровый рендер веб-анимаций).
7. **`pixelfx`**:
   - 244 готовых процедурных пиксельных эффекта и спрайтов кодом (взрывы, магия, UI-эффекты, геймификация).
8. **`impeccable`**:
   - Стандарт дизайна интерфейсов, типографики, отступов и анимации (для демонстраций кода и сервисов).
9. **`rea-video`**:
   - Реверс-инжиниринг референсных вирусных видео (раскадровка, определение 3D/AI/Real footage, рецепты повторения).
10. **`unslop`**:
    - Очистка визуалов от шаблонного "нейросетевого мусора" (vibecoding tells) в сторону строгого стильного дизайна.

### Глобальные скиллы монтажа и рендера:
- `.gemini\skills\remotion-youtube-production\SKILL.md`: Гайдлайн YouTube-выпусков на Remotion (бывший `kino-youtube-production`).
- `.claude\skills\remotion-official` / `.claude\skills\remotion`: Продакшн Remotion-композиций в React.
- `.gemini\skills\hyperframes\SKILL.md` (и `.claude\skills\hyperframes*`): HyperFrames движок компоузинга.
- `.claude\skills\hyperframes-audio`, `media-use`: сведение звука, цветокоррекция/LUT, медиа-ассеты.
- Скиллы в `AppData\Roaming\Kino\skills\` — наследие Kino, не использовать.

---

## 6. КАРТА ФАЙЛОВ И ДИСКОВ

| Объект | Путь на диске | Описание |
| :--- | :--- | :--- |
| **Git Workspace** | `d:\APP BOTS WEBSITES DEVELOPMENT\test antigravity\` | Кодовая база, скрипты, конфиги |
| **Media & Asset Drive** | `D:\Buddah\` | Все тяжёлые ассеты, рендеры, аудио, blend-файлы |
| **Character Sheet** | `D:\Buddah\AI Будда v1.0 Character Sheet.png` | Главный дизайн-документ персонажа |
| **Character Master Blend** | `D:\Buddah\AI_BUDDAH_MASTER.blend` | Чистый персонаж для линковки в ролики |
| **Character Code** | `ai-buddah-character\` | `character_control.py` + скрипты пайплайна эпизодов |
| **Master Animation Video** | `D:\Buddah\AI_BUDDAH_MASTER_ANIMATION.mp4` | 9-секундный вертикальный 9:16 Reel (Full HD) |
| **Render Scripts** | `scripts\` | `build_hybrid_jet_reel.js`, `render_and_encode_video.ps1` |
| **Audio & SFX** | `D:\Buddah\ai boom.mp3`, `ai boom.flp` | Озвучка, музыкальные проекты |

---

## 7. ЖЕЛЕЗНЫЕ ПРАВИЛА (RULES OF ENGAGEMENT)

1. **Всегда делать Git Push:** После внесения любых изменений выполнять `git add`, `git commit` и `git push origin master`.
2. **Никакого обмана в 3D:** Процедурный блок-аут из примитивов называть архитектурным каркасом/greybox. Для финальной органики использовать скульптинг или Image-to-3D нейросети.
3. **Модульность сцен:** Не ломать существующие сцены. Персонаж живёт в изолированной коллекции `AI_BUDDAH_CHARACTER` и подключается в ролики через `Collection Linking`.
4. **Формат контента:** Чётко различать требования:
   - **Reels / Shorts:** 9:16 (1080×1920), динамичный хук в первые 1.5 секунды, крупная типографика, плотный темп.
   - **YouTube Long-form:** 16:9 (1920×1080 / 4K), многослойный нарратив, схемы архитектуры, код, демонстрация сервисов.
