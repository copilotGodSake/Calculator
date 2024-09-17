
1) Задача https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit#heading=h.5dt3hghpa22f
2) Запуск приложения: в терминале запускаем через npm start для сборки проекта используем npm run build, затем переходим в cd dist и запускаем с помощью http-server на предложенных портах.
3) Структура проекта
├── dist/
│   └── index.html
|   └── bundle.js
├── git/
|   └── hooks/
|       └── pre-commit
├── src/
│   ├── index.js
│   ├── index.html
│   ├── styles/
│   │   ├── default-theme.css
│   │   ├── dark-theme.css
│   │   └── light-theme.css
|── utils/
|── └── utils.js
├── eslintrc.json
├── prettierrc
├── webpack.config.js
├── package.json
└── package-lock.json

dist - хранит bundle.js и html
git/hooks - pre-commit hook
src - точка входа  index.js, html и стили css
utils - файл js
