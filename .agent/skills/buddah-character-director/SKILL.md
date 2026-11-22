---
name: buddah-character-director
description: Подключать постоянного AI Будду к выпускам Blender, строить речевые ключи и режиссёрские планы из озвучки, проверять мимику и собирать монтажный слой.
---

# Ведущий AI Будда

Единый мастер находится в `D:\Buddah\AI_BUDDAH_MASTER.blend`. Выпуск использует связанную коллекцию `AI_BUDDAH_CHARACTER` и Library Override. Для изменений мастера сначала делайте проверенную резервную копию и сравнивайте нейтральный кадр. Скрипты character_build.py и character_rig.py относятся к старому blockout.

## Запуск выпуска

Из корня репозитория вызовите в PowerShell:

```powershell
& D:\Buddah\tools\speech-env\Scripts\python.exe ai-buddah-character\animate_from_audio.py "D:\Buddah\voice.m4a" --project "D:\Buddah\episodes\episode-001\host.blend" --aspect 9:16 --context "D:\Buddah\scene.json" --preview
```

Путь проекта должен находиться в новой папке выпуска. WAV, MP3 и M4A декодирует FFmpeg. Параметр preview ограничивает проверку 15 секундами при масштабе 25%. Без флага создаётся проект без рендера. Модель Whisper и Rhubarb запускаются локально. Пословные метки Whisper отделены от акустических интервалов рта Rhubarb phonetic. Это приближённый акустический липсинк. Для точного русского выравнивания фонем с текстом требуется отдельный forced aligner.

## Решения агента

Прочитайте весь transcript.json, прослушайте фразу и проверьте паузы, контраст громкости и диапазон высоты тона. Определите адресата, утверждение, оговорку и объект показа. При неоднозначности оставляйте neutral. В context задаются objects (имя в мировые координаты XYZ), default_camera и необязательный массив events. События любого агента используют start/end в секундах, emotion, gesture, look_target, camera, intensity. Координаты SCREEN_MAIN обозначают цель для взгляда и блокинга. Материал самого экрана входит в монтаж.

Доступные эмоции neutral, skeptic, surprise. Жесты neutral, explain, nod, point_left, point_right. Для независимой проверки плана используйте buddah_character_director.py с аргументами --audio voice.wav --transcript transcript.json --context scene.json --output NEW_DIRECTORY. Собранный выпуск разделяет речь, эмоции, взгляд, голову, руки и idle в NLA. Частые повторы жестов подавляются. Портрет имитирует движение взгляда деформацией области радужки.

## Монтаж и QA

Для кадров с альфа-каналом используйте выход Blender rgba/frame_ или preview/frame_. В аппарате монтажа уже есть Remotion-композиция BuddahHost. После рендера кадров:

```powershell
py -3.13 ai-buddah-character\assemble_episode.py "D:\Buddah\episodes\episode-001\host.blend" --frames preview --output "D:\Buddah\episodes\episode-001\review.mp4"
```

Проверьте смыкание губ на М/Б/П, паузы, контакт зубов и языка, плечо и кисть в экстремумах, движение взгляда и совпадение финального звука с исходной записью. Проверьте число кадров, частоту, альфа-канал и положение героя в вертикальном и горизонтальном кадре. Указывайте отдельно, использовался ли оригинальный голос или синтетическая проверка. Длительный финальный рендер выполняется после подтверждения.
