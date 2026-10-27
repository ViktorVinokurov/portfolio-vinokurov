# Портфолио Виктора Винокурова

Одностраничный сайт-портфолио frontend-разработчика. На странице есть разделы «Обо мне», «Навыки», «Опыт работы», «Проекты» (подгружаются из GitHub), «Образование» и «Контакты».

Тёмная пурпурная тема, анимации при прокрутке и движении курсора: параллакс, 3D-наклон карточек, появление текста по словам, таймлайн, который прорисовывается по мере прокрутки.

## Стек

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Redux Toolkit](https://redux-toolkit.js.org) + RTK Query для загрузки репозиториев из GitHub REST API
- [motion](https://motion.dev) для анимаций
- [oxlint](https://oxc.rs) для линтинга

## Быстрый старт

Нужен Node.js 20.19+ или 22.12+.

```bash
npm install
npm run dev
```

## Команды

| Команда | Что делает |
|---|---|
| `npm run dev` | Dev-сервер с горячей перезагрузкой |
| `npm run build` | Проверка типов и production-сборка в `dist/` |
| `npm run preview` | Локальный просмотр собранной версии |
| `npm run lint` | Проверка кода линтером oxlint |

## Как изменить контент

Все тексты лежат в одном файле: [`src/data/profile.ts`](src/data/profile.ts). Там описание, контакты, навыки, опыт работы, образование и курсы. Компоненты при этом трогать не нужно.

Фото лежит в `src/assets/photo.jpg`.

Репозитории в разделе «Проекты» загружаются из GitHub автоматически, форки не показываются. Чтобы скрыть репозиторий, добавьте его название в `profile.github.hiddenRepos`.

## Структура

```
src/
├── data/profile.ts        контент страницы
├── store/                 Redux: store, GitHub API, фильтр проектов
├── components/
│   ├── sections/          секции страницы (Hero, About, Skills, …)
│   ├── ui/                компоненты shadcn/ui
│   └── *.tsx              анимационные и общие компоненты (Reveal, TiltCard, SplitText, …)
├── lib/                   утилиты: форматирование, параметры анимаций
└── index.css              тема (CSS-переменные) и CSS-анимации
docs/
├── architecture.md        архитектура, поток данных, анимации
└── spec.md                используемые технологии и версии
```

## Деплой

После `npm run build` в каталоге `dist/` лежит готовый статический сайт. Его можно разместить на любом статическом хостинге: GitHub Pages, Vercel, Netlify или nginx.

Запросы к GitHub API идут из браузера без токена. Лимит GitHub для таких запросов — 60 в час с одного IP, для портфолио этого достаточно.

## Документация

- [Архитектура](docs/architecture.md)
- [Технологии](docs/spec.md)

## Контакты

- Telegram: [@vinokurovviktor](https://t.me/vinokurovviktor)
- Email: [vinokurov.vick@yandex.ru](mailto:vinokurov.vick@yandex.ru)
- GitHub: [ViktorVinokurov](https://github.com/ViktorVinokurov)
