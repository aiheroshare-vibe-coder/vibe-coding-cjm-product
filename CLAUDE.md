# CJM Capture Assistant — Landing Page

Лендинг для Chrome-расширения, которое помогает PO, консультантам и продуктовым командам фиксировать наблюдения о пользовательском пути прямо в браузере и превращать их в черновик CJM с помощью AI.

---

## Tech Stack

| Слой | Технология |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 5 (SWC) |
| Стили | Tailwind CSS 3 + tailwindcss-animate |
| UI-компоненты | shadcn/ui (Radix UI primitives) |
| Анимации | Framer Motion |
| Роутинг | React Router DOM v6 |
| Состояние/запросы | TanStack React Query v5 |
| Формы | React Hook Form + Zod |
| Иконки | Lucide React |
| Тесты | Vitest + Testing Library |
| E2E тесты | Playwright |
| Деплой | Netlify (SPA с redirect-правилом `/* → /index.html`) |
| Node | 20 (задан в `netlify.toml`) |
| Происхождение | Создан через [Lovable](https://lovable.dev) (lovable-tagger в devDeps) |

---

## Project Structure

```
vibe-coding-cjm-product/               ← корень репозитория
├── CLAUDE.md
├── README.md
├── netlify.toml                        ← конфиг деплоя: build-команда, redirect SPA, NODE_VERSION
├── .gitignore
└── Vibe Coding/                        ← папка с именем через пробел (внимание при cd и скриптах!)
    └── lovable-project-<uuid>-2026-03-10/   ← реальный проект
        ├── src/
        │   ├── main.tsx                ← точка входа
        │   ├── App.tsx                 ← роутер + провайдеры (QueryClient, Toaster, Tooltip)
        │   ├── index.css               ← CSS-переменные, кастомные утилиты Tailwind
        │   ├── components/
        │   │   ├── landing/            ← секции лендинга (по одной на файл)
        │   │   │   ├── SiteHeader.tsx
        │   │   │   ├── HeroSection.tsx
        │   │   │   ├── SegmentsSection.tsx
        │   │   │   ├── HowItWorksSection.tsx
        │   │   │   ├── FeaturesSection.tsx
        │   │   │   ├── UseCasesSection.tsx
        │   │   │   ├── RoadmapSection.tsx
        │   │   │   ├── WaitlistSection.tsx  ← форма подписки (сейчас API замокан!)
        │   │   │   ├── SiteFooter.tsx
        │   │   │   └── MockupBrowser.tsx
        │   │   ├── ui/                 ← shadcn/ui компоненты (НЕ редактировать вручную)
        │   │   └── NavLink.tsx
        │   ├── hooks/
        │   │   ├── use-mobile.tsx
        │   │   └── use-toast.ts
        │   ├── lib/
        │   │   └── utils.ts            ← утилита cn() для merging классов
        │   ├── pages/
        │   │   ├── Index.tsx           ← главная страница: собирает все секции лендинга
        │   │   └── NotFound.tsx
        │   └── test/
        │       ├── setup.ts
        │       └── example.test.ts
        ├── public/
        ├── vite.config.ts
        ├── tailwind.config.ts
        ├── tsconfig.json
        ├── playwright.config.ts
        └── vitest.config.ts
```

---

## Conventions

### Коммиты
Явного соглашения в проекте нет. Рекомендуемый формат — [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: добавить секцию с отзывами
fix: исправить валидацию email в WaitlistSection
chore: обновить зависимости
```
Язык коммитов: [заполни сам — русский или английский, выбери и зафикси стандарт]

### Ветки
Текущая рабочая ветка: `claude/init-session-9pHyG`
Формат: `claude/<описание>` или [заполни сам — опиши свой формат веток, например `feature/<name>`, `fix/<name>`]

### Именование файлов
- React-компоненты: `PascalCase.tsx` (например `HeroSection.tsx`)
- Хуки: `use-kebab-case.tsx` / `use-kebab-case.ts`
- Утилиты: `camelCase.ts`
- CSS-классы: Tailwind utility-first; кастомные утилиты — в `index.css`

### Импорты
Алиас `@/` указывает на `./src/`. Всегда использовать его вместо относительных путей вида `../../`.

---

## Environment

Переменные окружения (файл `.env` в корне проекта внутри `Vibe Coding/lovable-project-.../`):

```env
# API для формы waitlist (сейчас замокан через setTimeout в WaitlistSection.tsx)
VITE_WAITLIST_API_URL=

# [заполни сам] — если будет подключён сторонний сервис (например Resend, Loops, Airtable)
VITE_WAITLIST_API_KEY=

# [заполни сам] — если появится аналитика
VITE_ANALYTICS_ID=
```

> Все переменные для Vite должны иметь префикс `VITE_`, иначе они недоступны в браузере.
> В Netlify переменные задаются в UI: Site settings → Environment variables.

---

## What Claude Should Know

### Продукт
- Это **лендинг** для Chrome-расширения CJM Capture Assistant. Самого расширения в репозитории нет.
- Целевые сегменты: (1) частные PO и product-консультанты, (2) корпоративные продуктовые команды.
- Основной язык интерфейса и контента — **русский**.

### Форма waitlist
- Файл `WaitlistSection.tsx` — ключевой бизнес-компонент. Собирает: имя, email, тип (individual / corporate), название компании.
- `onSubmit` сейчас **замокан**: `await new Promise(resolve => setTimeout(resolve, 900))` + `console.info`. Это заглушка. Реальный бэкенд ещё не подключён.
- Валидация через Zod-схему. При изменении полей — обновляй схему вместе с TypeScript-типом.

### Анимации
- Все анимации — через Framer Motion. Паттерн: `useInView` с `once: true` для появления при скролле.
- Единый стиль `fadeUp` с кастомным `delay` через `custom` prop.

### shadcn/ui
- Компоненты в `src/components/ui/` — **автогенерированные** из shadcn. Не редактировать вручную.
- Добавлять новые компоненты через CLI: `npx shadcn@latest add <component>`

### Деплой
- Netlify следит за веткой [заполни сам — укажи production-ветку, например `main`].
- Build-директория задана в Netlify UI, в `netlify.toml` только команда и `publish = "dist"`.
- SPA-режим обеспечивается redirect-правилом в `netlify.toml` — без него 404 на прямых URL.

### Структурная особенность репозитория
- Рабочий код находится в `Vibe Coding/lovable-project-.../` — папка с пробелом и длинным UUID в имени.
- При запуске команд `npm run dev` и т.д. нужно предварительно делать `cd "Vibe Coding/lovable-project-891ecaff-45ad-4e00-980d-b9de14ca8cd0-2026-03-10"`.

---

## Don't

1. **Не редактировать файлы в `src/components/ui/`** — это shadcn/ui компоненты. Изменения перетрутся при следующем `shadcn add`. Если нужно переопределить стиль — делай через Tailwind-классы в месте использования или через CSS-переменные в `index.css`.

2. **Не переводить контент на английский** — весь текст лендинга (заголовки, описания, лейблы форм) написан на русском языке намеренно, под русскоязычную аудиторию. Не менять язык без явного указания.

3. **Не пушить напрямую в `main`** — все изменения через ветки с PR. Ветка деплоя подключена к Netlify и изменение `main` может сломать прод.

4. **Не подключать реальный API waitlist без обновления переменных окружения** — сейчас `onSubmit` в `WaitlistSection.tsx` симулирует запрос. Если подключаешь реальный эндпоинт, обязательно вынести URL/ключ в `VITE_*` переменные, не хардкодить в коде.

5. **Не удалять redirect-правило из `netlify.toml`** — без `/* → /index.html` с кодом 200 прямые URL и обновление страницы на Netlify вернут 404 (React Router рендерит SPA).
