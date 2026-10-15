# Лабораторная работа №6 — вариант 11

Тема: прогноз погоды на несколько дней.

## Запуск

1. Установить Node.js.
2. Выполнить `npm install`.
3. Выполнить `npm start`.
4. Открыть `http://localhost:3000`.

## Маршруты

- `GET /` — главная страница.
- `GET /about` — страница «О себе».
- `GET /api/status` — статус сервера в JSON.
- `GET /api/forecast/:city?days=3` — фиктивный прогноз на 1–7 дней.

Поддерживаемые города: `paris`, `london`, `tokyo`, `moscow`, `newyork`.

Примеры:

- `/api/forecast/paris`
- `/api/forecast/tokyo?days=5`
- `/api/status`
