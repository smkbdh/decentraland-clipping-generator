# 🛠️ Полная карта системы автопостинга и подключенных аккаунтов

> Данный документ предназначен для разработчиков и AI-агентов. Содержит пути к скриптам, профилям браузеров, учетным записям и командам запуска для **YouTube, Instagram, TikTok и Content Rewards**.

---

## 📁 Базовая информация о системе

* **Рабочая директория:** `D:\APP BOTS WEBSITES DEVELOPMENT\test antigravity`
* **Python интерпретатор:** `C:\Users\humun\AppData\Local\Python\pythoncore-3.14-64\python.exe`
* **Git репозиторий:** `https://github.com/smkbdh/decentraland-clipping-generator.git` (ветка `master`)
* **Папка с готовыми роликами AI Будды (10 штук):** `D:\Buddah\reels_episode_01\`
* **Файл с хуками, описаниями и тегами:** `D:\Buddah\reels_episode_01\REELS_PUBLISHING_GUIDE.md`
* **Полный выпуск (длинное видео):** `D:\Buddah\AI_Boom_Vibe_Coding_Vypusk_1.mp4`

---

## 1. 🔴 YouTube Shorts (Облачный API через Supabase Edge Functions)

Работает полностью в фоне без запуска графического браузера через официальный API.

* **Основной скрипт публикации:** [`auto_pipeline.py`](file:///d:/APP%20BOTS%20WEBSITES%20DEVELOPMENT/test%20antigravity/auto_pipeline.py)
* **Пакетный оркестратор:** [`youtube_batch_orchestrator.py`](file:///d:/APP%20BOTS%20WEBSITES%20DEVELOPMENT/test%20antigravity/youtube_batch_orchestrator.py)
* **Подключенный канал:** **AI Buddah | заработок на нейросетях с 0 |от А до Я** (`UCddDPV32r3iTlqGxgyTv3vA`)
* **Бэкенд:** Supabase `https://gsdgbuscghdygyptxthg.supabase.co` (проект ScatterSpark)
* **Как запустить одиночную выгрузку:**
  ```powershell
  & "C:\Users\humun\AppData\Local\Python\pythoncore-3.14-64\python.exe" auto_pipeline.py "D:\Buddah\reels_episode_01\Reel_01_reel_01_80m_myth.mp4" "Название #shorts" "Описание с тегами"
  ```
* **Принцип работы:** Скрипт загружает MP4 в бакет `videos` Supabase Storage и триггерит Edge Function `youtube-upload`, которая публикует Shorts и возвращает готовую ссылку `https://youtube.com/shorts/...`.

---

## 2. 📸 Instagram Reels (Браузерная автоматизация Playwright)

* **Скрипт загрузчика:** [`instagram_uploader.py`](file:///d:/APP%20BOTS%20WEBSITES%20DEVELOPMENT/test%20antigravity/instagram_uploader.py)
* **Скрипт проверки сессии:** [`verify_instagram_ai_session.py`](file:///d:/APP%20BOTS%20WEBSITES%20DEVELOPMENT/test%20antigravity/verify_instagram_ai_session.py)
* **Батник для ручного входа в профиль:** `Войти_в_Instagram.bat` (находится на Рабочем столе и в корне проекта)

### Профили аккаунтов (хранятся локально в проекте):
1. **`instagram_browser_profile_ai/`**  
   * **Аккаунт:** **`@om_ai_digital`** (*ИИ от А до Я | уроки и гайды*)  
   * **Назначение:** Целевой профиль под AI-продукты, уроки, вайбкодинг.
2. **`instagram_browser_profile/`** и **`instagram_browser_profile_kiraa/`**  
   * **Аккаунт:** **`@kira.gyal`**  
   * **Назначение:** Музыка, лайфстайл, Call of Duty.

* **Принцип работы:** Запускает Playwright с постоянным контекстом (`user_data_dir`), переходит на `instagram.com`, нажимает «Создать» -> выбирает файл -> задает соотношение 9:16 -> вставляет описание -> публикует Reel и сохраняет ссылку.

---

## 3. 🎵 TikTok (Браузерная автоматизация Playwright)

* **Основной скрипт публикации:** [`tiktok_uploader.py`](file:///d:/APP%20BOTS%20WEBSITES%20DEVELOPMENT/test%20antigravity/tiktok_uploader.py)
* **Пайплайн выгрузки:** [`pipeline_ring_drone.py`](file:///d:/APP%20BOTS%20WEBSITES%20DEVELOPMENT/test%20antigravity/pipeline_ring_drone.py)
* **Профиль браузера:** **`tiktok_browser_profile/`**
* **Подключенный аккаунт:** **`@buddah_ai`**
* **Принцип работы:** Заходит в `tiktok.com/tiktokstudio/upload`, загружает видео, проставляет утвержденный текст и хэштеги, жмет публикацию и вытягивает ID ролика со страницы контента.

---

## 4. 💰 Content Rewards (Авто-сабмиттер ссылок на модерацию)

* **Скрипт сабмита:** [`content_rewards_submitter.py`](file:///d:/APP%20BOTS%20WEBSITES%20DEVELOPMENT/test%20antigravity/content_rewards_submitter.py)
* **Скрипт проверки статусов:** [`check_content_rewards_submissions.py`](file:///d:/APP%20BOTS%20WEBSITES%20DEVELOPMENT/test%20antigravity/check_content_rewards_submissions.py)
* **Профиль браузера:** **`rewards_browser_profile/`**
* **Аккаунт:** **`digitalbuddah`**
* **Принцип работы:** После выгрузки ролика в TikTok/Shorts скрипт сразу заходит на страницу кампании в `contentrewards.com`, открывает модальное окно «Submit clip», вставляет ссылку, подтверждает чекбокс требований и отправляет на проверку.

---

## 5. 🔍 Быстрая диагностика всех сессий

Для проверки доступности всех аккаунтов одной командой:
```powershell
& "C:\Users\humun\AppData\Local\Python\pythoncore-3.14-64\python.exe" check_all_connected_accounts.py
```
Скрипт проверяет в headless-режиме TikTok, Instagram, Content Rewards и выводит статус каждого профиля.
