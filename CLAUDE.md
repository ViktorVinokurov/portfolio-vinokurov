# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## О проекте

Лендинг-портфолио frontend-разработчика Виктора Винокурова: одностраничный сайт с разделами «обо мне», навыки, опыт, проекты, образование и контакты. Проекты подгружаются из GitHub API (пользователь `ViktorVinokurov`), остальной контент статический. Тёмная пурпурная тема, анимации при скролле. Тексты интерфейса на русском.

Подробности: [docs/architecture.md](docs/architecture.md) (архитектура и поток данных), [docs/spec.md](docs/spec.md) (технологии и версии). Исходники контента: резюме (PDF) и фото в `docs/`.

## Команды

- `npm run dev` — dev-сервер
- `npm run build` — проверка типов (`tsc -b`) и сборка в `dist/`
- `npm run preview` — просмотр сборки
- `npm run lint` — oxlint (не ESLint). Предупреждения `only-export-components` в `src/components/ui/` пришли из генерации shadcn, это нормально
- `npx shadcn@latest add <name>` — добавить компонент shadcn/ui

Тестов в проекте нет.

Если `npm install` падает с EACCES на `~/.npm` (кэш принадлежит root), задайте временный кэш через `npm_config_cache=<dir>`.

## Архитектура

- Стек: Vite 8, React 19, TypeScript 7, Tailwind CSS v4, shadcn/ui (стиль `radix-nova`), Redux Toolkit + RTK Query.
- **Контент** лежит в `src/data/profile.ts`. Тексты, опыт и навыки правятся там, а не в компонентах. Логин GitHub хранится только в `profile.github`.
- **Redux:** `src/store/githubApi.ts` (RTK Query; загружает репозитории, отбрасывает форки и репозитории из `profile.github.hiddenRepos`) и `src/store/projectsSlice.ts` (фильтр по языку). Хуки `useAppSelector`/`useAppDispatch` из `@/store`. Серверные данные описывать эндпоинтами RTK Query.
- **Секции** находятся в `src/components/sections/` и оборачиваются в `Section` (якорь `id`, заголовок). Якоря навигации перечислены в `navItems` в `Header.tsx`.
- **Анимации** сделаны на библиотеке `motion` (`motion/react`). Перед тем как писать новую анимацию, проверьте готовые компоненты в `src/components/`: `Reveal` (появление при скролле, пропы `from`/`delay`), `SplitText`, `ScrollHighlight`, `TiltCard`, `CountUp`, `Marquee`. Бесконечные циклы делать через CSS-keyframes и `@utility` в `index.css`. Каскад задавать через `delayChildren: stagger()`, потому что `staggerChildren` устарел. Кривая `easeOutExpo` лежит в `@/lib/motion`. В `App.tsx` стоит `MotionConfig reducedMotion="user"`, для CSS-анимаций добавлять `motion-reduce:animate-none`. Полный список эффектов в docs/architecture.md.
- **Секции** получают `number` и `eyebrow` отдельно, потому что номер нужен для параллакс-цифры на фоне.
- **Тема:** сайт всегда тёмный (`class="dark"` на `<html>` в `index.html`). Пурпурная палитра задана CSS-переменными в блоке `.dark` в `src/index.css`. Блок `:root` остался от shadcn и не используется. Цвета брать из токенов (`primary`, `muted-foreground`, …), а не задавать hex-кодами.
- `cn` импортируется из npm-пакета `cn` (новый shadcn), а не из `clsx`/`tailwind-merge`.
- Алиас `@/` → `src/` задан в `vite.config.ts` и обоих `tsconfig`.

## Деплой

`.github/workflows/deploy.yml` срабатывает на пуш в `main`: `npm ci`, затем lint и build, затем rsync `dist/` по SSH на `31.31.196.54` (хостинг REG.RU, dropbear). Ключи хоста зашиты в workflow (`SSH_KNOWN_HOSTS`). Настройки репозитория: secret `SSH_PRIVATE_KEY`, variables `SSH_USER` и `DEPLOY_PATH`. rsync запускается с `--delete`, поэтому проверка `DEPLOY_PATH` в workflow обязательна, её нельзя ослаблять.

## Работа с GitHub API

- Без токена лимит GitHub API — 60 запросов в час с одного IP. Токен в SPA-бандл не встраивать, потому что он попадёт в публичный JS.
- Если лимита не хватит, загрузку нужно перенести на этап сборки (JSON в `public/`), заменив только `githubApi`. UI менять не придётся.

# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
