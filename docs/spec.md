# Спецификация технологий

Используемые технологии, версии и роль каждой в проекте. Точные версии зафиксированы в `package-lock.json`.

## Сборка и язык

| Технология | Версия | Роль |
|---|---|---|
| Vite | 8.x | Dev-сервер с HMR и production-сборка в `dist/` |
| @vitejs/plugin-react | 6.x | Поддержка React (JSX, Fast Refresh) в Vite |
| TypeScript | 7.x | Статическая типизация. `tsc -b` запускается перед сборкой и проверяет типы |
| oxlint | 1.x | Линтер (правила `react`, `typescript`, `oxc`), конфиг в `.oxlintrc.json` |

Алиас `@/*` → `src/*` задан в `tsconfig.json`, `tsconfig.app.json` (для TypeScript) и `vite.config.ts` (для сборщика).

## UI

| Технология | Версия | Роль |
|---|---|---|
| React | 19.x | UI-библиотека |
| Tailwind CSS | 4.x | Utility-first стили. Подключён через `@tailwindcss/vite`, конфигурация в `src/index.css` (`@theme`, `@utility`) |
| shadcn/ui | CLI 4.x, стиль `radix-nova` | Компоненты (`Button`, `Card`, `Badge`, `Skeleton`), скопированные в `src/components/ui/`. Настройки в `components.json` |
| radix-ui | 1.x | Примитивы, на которых построены компоненты shadcn (`Slot` для `asChild`) |
| class-variance-authority | 0.7.x | Варианты компонентов (`variant`, `size`) |
| cn | 0.5.x | Склейка классов с разрешением конфликтов Tailwind (замена `clsx` + `tailwind-merge` от shadcn) |
| tw-animate-css | — | Набор CSS-анимаций, который подключает shadcn |
| motion | 14.x | Анимации (`motion/react`): появление при скролле, параллакс, 3D-наклон, пружины, анимации раскладки (`layout`, `layoutId`), `AnimatePresence`. Подробнее в разделе «Анимации» в `architecture.md` |
| lucide-react | 1.x | Иконки. Брендовых иконок в нём нет, поэтому GitHub нарисован отдельным SVG в `GithubIcon.tsx` |
| @fontsource-variable/geist | 5.x | Шрифт Geist (вариативный, с кириллицей), поставляется вместе с бандлом |

## Состояние и данные

| Технология | Версия | Роль |
|---|---|---|
| Redux Toolkit | 2.x | Store (`configureStore`), slice фильтра проектов (`createSlice`) |
| RTK Query | входит в Redux Toolkit | Загрузка и кэширование репозиториев из GitHub API (`createApi`, `fetchBaseQuery`) |
| react-redux | 9.x | `Provider` и типизированные хуки `useAppSelector` / `useAppDispatch` |
| GitHub REST API | v3 | Источник списка проектов: `GET /users/{username}/repos`, без авторизации |

## Браузерные API

| API | Где используется |
|---|---|
| IntersectionObserver | Подсветка активного раздела в шапке (`useActiveSection`) |
| `matchMedia('(pointer: fine)')` | `CursorGlow` включается только на устройствах с мышью |
| `prefers-reduced-motion` | Отключение анимаций |
| `Intl.DateTimeFormat('ru-RU')` | Даты обновления репозиториев |

## Команды

| Команда | Действие |
|---|---|
| `npm install` | Установка зависимостей |
| `npm run dev` | Dev-сервер |
| `npm run build` | Проверка типов + сборка в `dist/` |
| `npm run preview` | Просмотр собранной версии |
| `npm run lint` | oxlint |
| `npx shadcn@latest add <name>` | Добавить компонент shadcn/ui |
