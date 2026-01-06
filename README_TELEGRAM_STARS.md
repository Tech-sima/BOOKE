# 🎮 Интеграция Telegram Stars - Краткая инструкция

## ✅ Что уже сделано

1. **Обновлены цены кейсов:**
   - Diamond case: **50 звезд** ⭐
   - Money case: **80 звезд** ⭐
   - Legendary case: **100 звезд** ⭐

2. **Интегрирован Telegram Stars API:**
   - Функция `buyCases()` обновлена для работы с Telegram Stars
   - Добавлена обработка успешных и неуспешных платежей
   - UI магазина показывает цены в звездах

3. **Созданы примеры кода бота:**
   - `bot_example.py` - пример на Python
   - `bot_example.js` - пример на Node.js

## ⚠️ Что нужно сделать СЕЙЧАС

### 1. Обновить username бота в коде (ОБЯЗАТЕЛЬНО!)

Откройте файл `js/main.js` и найдите строку:
```javascript
const botUsername = 'your_bot_username'; // ЗАМЕНИТЕ на username вашего бота
```

Замените `'your_bot_username'` на реальный username вашего бота (без символа @).

**Пример:** Если ваш бот `@my_game_bot`, то должно быть:
```javascript
const botUsername = 'my_game_bot';
```

### 2. Настроить бота в Telegram

1. Откройте [@BotFather](https://t.me/BotFather)
2. Отправьте `/mybots` → выберите вашего бота
3. Включите "Payments" (Платежи)
4. Настройте Menu Button с URL вашей игры

### 3. Запустить бота

Выберите один из вариантов:

**Вариант A: Python**
```bash
pip install python-telegram-bot
python bot_example.py
```

**Вариант B: Node.js**
```bash
npm install node-telegram-bot-api
node bot_example.js
```

### 4. Протестировать

1. Откройте бота в Telegram
2. Запустите Mini App через Menu Button
3. Перейдите в магазин
4. Попробуйте купить кейс

## 📋 Полная документация

Подробные инструкции смотрите в файле **`TELEGRAM_STARS_SETUP.md`**

## 🔧 Технические детали

- **Токен бота:** `8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU`
- **Валюта:** XTR (Telegram Stars)
- **API:** Telegram Bot API + Telegram Mini App API

## ❓ Проблемы?

1. Проверьте, что username бота правильный в `js/main.js`
2. Убедитесь, что бот запущен и работает
3. Проверьте, что платежи включены в настройках бота
4. Убедитесь, что игра доступна по HTTPS

## 📞 Поддержка

Если что-то не работает:
- Проверьте логи бота
- Проверьте консоль браузера (F12)
- Убедитесь, что все файлы обновлены

