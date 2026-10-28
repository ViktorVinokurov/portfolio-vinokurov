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

Сайт выкладывается автоматически через GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)). При каждом пуше в `main` запускаются линтер и сборка, затем каталог `dist/` копируется на хостинг `31.31.196.54` по SSH через rsync. Деплой можно запустить и вручную: Actions → Deploy → Run workflow.

Настройки в Settings → Secrets and variables → Actions:

| Тип | Имя | Значение |
|---|---|---|
| Secret | `SSH_PRIVATE_KEY` | Приватный SSH-ключ для деплоя. Его публичная часть должна быть добавлена на хостинг |
| Variable | `SSH_USER` | Логин SSH на хостинге |
| Variable | `DEPLOY_PATH` | Каталог сайта на сервере, например `www/example.ru` |

rsync удаляет на сервере файлы, которых нет в новой сборке. Не трогает он только `.htaccess` и `.well-known/`.

Запросы к GitHub API идут из браузера без токена. Лимит GitHub для таких запросов — 60 в час с одного IP, для портфолио этого достаточно.

## Документация

- [Архитектура](docs/architecture.md)
- [Технологии](docs/spec.md)

## Контакты

- Telegram: [@vinokurovviktor](https://t.me/vinokurovviktor)
- Email: [vinokurov.vick@yandex.ru](mailto:vinokurov.vick@yandex.ru)
- GitHub: [ViktorVinokurov](https://github.com/ViktorVinokurov)
