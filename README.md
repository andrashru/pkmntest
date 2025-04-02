# Pokemon Block для Gutenberg

Полное руководство по установке, настройке и использованию кастомного блока Pokemon для WordPress.

## Установка

### Требования
- WordPress 5.8+
- PHP 7.4+
- Node.js 16+
- npm 8+

### Шаги установки
1. Скачайте архив плагина
2. В админ-панели WordPress:
   - Перейдите в "Плагины → Добавить новый"
   - Загрузите ZIP-архив
   - Активируйте плагин

Или через командную строку:
```bash
cd wp-content/plugins
git clone git@github.com:andrashru/pkmntest.git
cd wp-pokemon-block
npm install
npm start
npm run build
