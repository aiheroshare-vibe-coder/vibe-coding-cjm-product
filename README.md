# vibe-coding-cjm-product
Vadik's vibe coding challenge

## О проекте

**CJM Capture Assistant** — лендинг для Chrome-расширения, которое помогает PO, консультантам и продуктовым командам фиксировать наблюдения о пользовательском пути прямо в браузере и превращать их в черновик CJM с помощью AI.

### Для кого

| Сегмент | Проблема | Результат |
|---|---|---|
| PO и product-консультанты | Хаотичные заметки, долгое структурирование, нет контекста URL | Быстрее synthesis и подготовка черновика CJM |
| Корпоративные команды | Дорогой ручной R&D, разрозненный конкурентный анализ | Снижение cost на исследование, ускорение решений |

### Что умеет MVP

- Быстрое сохранение шага/заметки в popup прямо в браузере
- Сохранение URL + title + комментария к каждому наблюдению
- Группировка заметок по сессиям исследования
- Экспорт в JSON / Markdown
- AI-кнопка: собрать черновик CJM на основе заметок

### Стек

React 18 + TypeScript · Vite 5 · Tailwind CSS · shadcn/ui · Framer Motion · React Router v6 · Zod · Vitest · Netlify

### Структура репозитория

```
vibe-coding-cjm-product/
├── CLAUDE.md                  ← инструкции для AI-ассистента
├── netlify.toml               ← конфиг деплоя
└── Vibe Coding/
    └── lovable-project-.../   ← исходный код (React-приложение)
        ├── src/
        │   ├── components/landing/   ← секции лендинга
        │   ├── components/ui/        ← shadcn/ui компоненты
        │   ├── pages/                ← Index, NotFound
        │   └── hooks/, lib/
        └── vite.config.ts, tailwind.config.ts, ...
```

### Запуск локально

```bash
cd "Vibe Coding/lovable-project-891ecaff-45ad-4e00-980d-b9de14ca8cd0-2026-03-10"
npm install
npm run dev        # http://localhost:8080
npm run build      # продакшн-сборка в dist/
npm run test       # Vitest
```

### Деплой

Проект деплоится на **Netlify**. Команда сборки и папка `dist/` заданы в `netlify.toml`. SPA-режим обеспечен redirect-правилом `/* → /index.html`.
