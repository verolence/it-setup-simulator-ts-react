## Основные файлы frontend-части проекта

📌 src/index.tsx → входная точка React-приложения, здесь React «монтирует» приложение в div#root внутри public/index.html
Как это работает:
index.html → даёт пустой контейнер.
index.tsx → монтирует туда компонент <App />.
App.tsx → главный «сборщик» всех компонентов.
Все новые компоненты добавляются именно внутри App.tsx (или в компонентах, которые App вызывает).

📌 src/App.tsx → главный компонент — грузит бюджет и показывает на странице

📌 public/index.html шаблон HTML, в который React монтирует всё приложение

Шаблон для frontend создан с помощью npx create-react-app frontend --template typescript

## Запуск frontend изолировано от backend:
```
cd frontend
npm start
```