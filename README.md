# snekko-v1

Первый прототип лендинга Snekko для подбора и запуска оборудования малых пищевых производств.

## Локальный запуск

```bash
npm ci
npm run dev
```

Откройте `http://localhost:3000`.

## Проверка

```bash
npm run lint
npm run build
node --test tests/rendered-html.test.mjs
```

## Публикация

Статическая сборка публикуется из выделенной ветки `gh-pages` на
`https://gorilladevq.github.io/snekko-v1/`.

Исследование и план следующих итераций находятся в `docs/landing-research-plan.md`.
