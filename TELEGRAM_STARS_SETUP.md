# Инструкция по настройке Telegram Stars для продажи кейсов

## Что уже сделано в игре

✅ Интегрирована система покупки кейсов через Telegram Stars
✅ Обновлены цены кейсов:
   - Первый набор (Diamond case): **50 звезд**
   - Второй набор (Money case): **80 звезд**
   - Третий набор (Legendary case): **100 звезд**
✅ UI магазина обновлен для отображения цен в звездах
✅ Добавлена обработка успешных и неуспешных платежей

## Что нужно сделать для запуска

### ⚠️ ВАЖНО: Обновите username бота в коде

В файле `js/main.js` найдите строку:
```javascript
const botUsername = 'your_bot_username'; // ЗАМЕНИТЕ на username вашего бота
```

Замените `'your_bot_username'` на реальный username вашего бота (без @).

### 1. Настройка Telegram бота

#### Шаг 1: Создание бота (если еще не создан)
1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и создайте бота
4. Сохраните токен бота: `8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU`

#### Шаг 2: Настройка Mini App
1. В [@BotFather](https://t.me/BotFather) отправьте `/mybots`
2. Выберите вашего бота
3. Выберите "Bot Settings" → "Menu Button"
4. Установите Menu Button с URL вашей игры (где размещен index.html)

#### Шаг 3: Включение платежей (Telegram Stars)
1. В [@BotFather](https://t.me/BotFather) отправьте `/mybots`
2. Выберите вашего бота
3. Выберите "Bot Settings" → "Payments"
4. Включите поддержку платежей
5. Настройте валюту (если требуется)

### 2. Разработка бота для обработки платежей

Вам нужно создать бота на Python/Node.js/PHP, который будет обрабатывать покупки.

**Готовые примеры кода:**
- `bot_example.py` - пример на Python
- `bot_example.js` - пример на Node.js

Вам нужно создать бота, который будет:

#### 2.1. Обрабатывать запросы на покупку кейсов

Когда игрок нажимает кнопку покупки в игре, игра открывает ссылку на бота с параметрами:

```
https://t.me/your_bot_username?start=purchase_{encoded_data}
```

Где `encoded_data` - это JSON с данными о покупке:
```json
{
  "type": "purchase_case",
  "caseIndex": 0,
  "caseName": "Diamond case",
  "starsPrice": 50,
  "timestamp": 1234567890
}
```

#### 2.2. Создавать invoice для Telegram Stars

Бот должен создать invoice через Telegram Bot API при получении команды `/start` с параметром `purchase_*`:

**Пример на Python (python-telegram-bot):**

```python
from telegram import LabeledPrice, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application

async def handle_purchase_request(update, context):
    # Получаем данные от Mini App
    data = update.callback_query.data if update.callback_query else None
    
    # Определяем кейс и цену
    case_prices = {
        0: 50,   # Diamond case
        1: 80,   # Money case
        2: 100   # Legendary case
    }
    
    case_index = int(data.split('_')[1]) if data else 0
    stars_price = case_prices.get(case_index, 50)
    
    # Создаем invoice
    prices = [LabeledPrice("Кейс", stars_price)]
    
    # Отправляем invoice пользователю
    await context.bot.send_invoice(
        chat_id=update.effective_chat.id,
        title=f"Покупка кейса",
        description=f"Кейс #{case_index + 1} за {stars_price} звезд",
        payload=f"case_{case_index}_{stars_price}",
        provider_token="",  # Для Telegram Stars оставляем пустым
        currency="XTR",     # XTR - валюта Telegram Stars
        prices=prices,
        start_parameter=f"case_{case_index}"
    )

# Обработка успешного платежа
async def handle_successful_payment(update, context):
    payment = update.message.successful_payment
    payload = payment.invoice_payload
    
    # Извлекаем данные из payload
    case_index = int(payload.split('_')[1])
    
    # Отправляем подтверждение в Mini App
    # Здесь нужно использовать webApp.sendData() обратно в игру
    # Это можно сделать через callback_query или другой механизм
    
    await update.message.reply_text("✅ Платеж успешен! Кейс открыт в игре.")
```

**Пример на Node.js (node-telegram-bot-api):**

```javascript
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU', {polling: true});

const casePrices = {
    0: 50,   // Diamond case
    1: 80,   // Money case
    2: 100   // Legendary case
};

// Обработка запроса на покупку от Mini App
bot.on('callback_query', async (query) => {
    const data = JSON.parse(query.data);
    
    if (data.type === 'purchase_case') {
        const caseIndex = data.caseIndex;
        const starsPrice = casePrices[caseIndex] || 50;
        
        // Создаем invoice
        await bot.sendInvoice(query.from.id, {
            title: `Покупка кейса`,
            description: `Кейс #${caseIndex + 1} за ${starsPrice} звезд`,
            payload: JSON.stringify({
                type: 'case_purchase',
                caseIndex: caseIndex,
                starsPrice: starsPrice
            }),
            provider_token: '', // Для Telegram Stars оставляем пустым
            currency: 'XTR',    // XTR - валюта Telegram Stars
            prices: [{
                label: 'Кейс',
                amount: starsPrice
            }]
        });
    }
});

// Обработка успешного платежа
bot.on('successful_payment', async (msg) => {
    const payment = msg.successful_payment;
    const payload = JSON.parse(payment.invoice_payload);
    
    // Здесь можно сохранить информацию о покупке в БД
    // и отправить подтверждение в Mini App
    
    await bot.sendMessage(msg.chat.id, '✅ Платеж успешен! Кейс открыт в игре.');
});
```

### 3. Настройка веб-сервера

Убедитесь, что ваша игра доступна по HTTPS (обязательно для Telegram Mini App):
- Используйте SSL-сертификат (Let's Encrypt бесплатный)
- Или используйте хостинг с поддержкой HTTPS (GitHub Pages, Netlify, Vercel и т.д.)

### 4. Тестирование

1. Откройте бота в Telegram
2. Запустите Mini App через Menu Button
3. Перейдите в магазин
4. Попробуйте купить кейс
5. Проверьте, что платеж проходит корректно

### 5. Важные моменты

⚠️ **Telegram Stars API:**
- Валюта для Telegram Stars: `XTR`
- `provider_token` должен быть пустой строкой для Telegram Stars
- Сумма указывается в звездах (целое число)

⚠️ **Безопасность:**
- Всегда проверяйте данные от пользователя на сервере
- Не доверяйте данным, приходящим от клиента
- Используйте `initData` от Telegram для проверки подлинности пользователя

⚠️ **Обработка платежей:**
- Сохраняйте информацию о покупках в базе данных
- Логируйте все транзакции
- Обрабатывайте случаи неуспешных платежей

## Структура данных

### Запрос от игры к боту:
```json
{
  "type": "purchase_case",
  "caseIndex": 0,
  "caseName": "Diamond case",
  "starsPrice": 50,
  "timestamp": 1234567890
}
```

### Invoice payload (от бота):
```json
{
  "type": "case_purchase",
  "caseIndex": 0,
  "starsPrice": 50
}
```

## Полезные ссылки

- [Telegram Bot API Documentation](https://core.telegram.org/bots/api)
- [Telegram Mini App Documentation](https://core.telegram.org/bots/webapps)
- [Telegram Stars API](https://core.telegram.org/bots/payments#telegram-stars)

## Поддержка

Если возникнут проблемы:
1. Проверьте логи бота
2. Убедитесь, что токен бота правильный
3. Проверьте, что Mini App доступен по HTTPS
4. Убедитесь, что платежи включены в настройках бота

