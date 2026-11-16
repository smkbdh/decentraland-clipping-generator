---
name: motion-graphics-3d
description: >-
  Продвинутая графика, анимация и 3D для тех-документалок: GSAP (таймлайны и титры), three.js (3D, партиклы, ASCII-кино),
  Anatomy (изометрические схемы архитектуры), ManimGX (математические и нейросетевые графы кодом).
---

# Advanced Motion Graphics, 3D & Technical Visualizations

Этот скилл содержит стандарты создания сложной векторной графики, 3D-сцен, изометрических архитектурных схем и моушен-дизайна телевизионного уровня для Remotion.

---

## 1. Физическая анимация и субтитры: `GSAP`

**Репозиторий:** https://github.com/greensock/GSAP  
**Назначение:** Гладкие интерполяции физических пружин (springs), каскадные появления списков (stagger), анимация появления букв и сложных плашек.

### Детерминированный рендеринг в Remotion:
В Remotion время дискретно (`frame`). GSAP таймлайн ставится на паузу и синхронизируется с текущим кадром видео:

```tsx
import React, { useEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import gsap from "gsap";

export const GsapTechCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });
    tl.current
      .fromTo(cardRef.current, 
        { opacity: 0, y: 50, scale: 0.94 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      )
      .fromTo(textRef.current, 
        { letterSpacing: "12px", opacity: 0 }, 
        { letterSpacing: "2px", opacity: 1, duration: 0.5, ease: "expo.out" }, 
        "-=0.3"
      );
  }, []);

  useEffect(() => {
    if (tl.current) {
      tl.current.seek(frame / fps);
    }
  }, [frame, fps]);

  return (
    <div ref={cardRef} style={{ padding: 40, background: "rgba(15,23,42,0.9)", borderRadius: 20 }}>
      <h2 ref={textRef} style={{ color: "#38bdf8", fontSize: 44, fontWeight: 900 }}>
        АРХИТЕКТУРА GEO & RAG
      </h2>
    </div>
  );
};
```

---

## 2. 3D-графика и ASCII-кинематограф: `three.js`

**Репозиторий:** https://github.com/mrdoob/three.js  
**Назначение:** Кибер-эстетика для тем ИИ, нейросетей, токенов и микрочипов. Процедурные облака точек (point clouds), вращающиеся 3D-графы знаний и стилизация через ASCII/шейдерные эффекты.

### Правила внедрения в Remotion:
1. **Детерминированный рендер:** Никогда не использовать `requestAnimationFrame` внутри Remotion! Вместо этого вызывать `renderer.render(scene, camera)` строго на изменение `frame`.
2. **ASCII Effect для кибер-расследований:**
   Превращение 3D-модели в моноширинную матрицу символов (`ASCIIEffect`) подчеркивает хакерскую/исследовательскую тему видео.
3. **Оптимизация:** Использовать инстансинг (`InstancedMesh`) при отображении тысяч серверных нод или векторных эмбеддингов.

---

## 3. Изометрические архитектурные схемы: `Anatomy`

**Репозиторий:** https://github.com/wheresryan22/anatomy  
**Назначение:** Построение понятных изометрических 3D/2.5D схем «как устроена система» (System Architecture, LLM Pipeline, Vector DB, Reverse Proxy, Bot Crawlers).

### Стандарты для документалок AI Будды:
1. **Слоистая архитектура (Stacking):**
   - Нижний слой: Инфраструктура (Серверы, Nginx, robots.txt)
   - Средний слой: Векторные БД и эмбеддинги (Chroma, Pinecone, RAG)
   - Верхний слой: Пользовательский интерфейс и каналы лидогенерации (ChatGPT, WhatsApp, Web)
2. **Анимированные световые импульсы:** Передача данных между блоками обозначается светящимися точками/импульсами, бегущими по шинам связей.

---

## 4. Схемы и математические графики кодом: `ManimGX`

**Репозиторий:** https://github.com/academa-labs/manimgx  
**Назначение:** Быстрый рендеринг векторных математических формул, координатных осей, кривых затухания, нейросетевых матриц в стиле видеороликов 3Blue1Brown.

### Экспорт для оверлея в видео:
```bash
# Рендер сцены с прозрачным альфа-каналом (WebM или PNG-секвенция):
manimgx -pqh --format=webm --transparent scene_vector_space.py VectorSearchScene
```
Полученный оверлей накладывается вторым слоем поверх живого фона в Remotion через `<Video src={staticFile("manim_vector.webm")} />`.
