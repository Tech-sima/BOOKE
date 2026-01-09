# 🤖 Основной бот BOOKE - Telegram Mini App

## Описание

`telegram_bot.py` - основной бот для игры BOOKE, через который запускается Telegram Mini App.
Этот бот полностью отвечает за:
- Запуск Mini App игры
- Обработку покупок через Telegram Stars

## Функционал

- ✅ Обработка команды `/start` (с параметрами и без)
- ✅ Создание invoice для покупки кейсов
- ✅ Обработка pre_checkout_query (подтверждение платежа)
- ✅ Обработка successful_payment (успешная оплата)
- ✅ Логирование всех транзакций
- ✅ Валидация данных платежа

## Установка

1. Убедитесь, что установлена библиотека `python-telegram-bot`:

```bash
pip install python-telegram-bot
```

2. Проверьте, что токен бота указан в файле `telegram_stars_bot.py`:

```python
BOT_TOKEN = "8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU"
```

## Запуск

### Через консоль (для тестирования и разработки):

```bash
python telegram_bot.py
```

### На сервере (рекомендуется использовать systemd или supervisor):

```bash
# Пример для systemd
sudo systemctl start telegram-stars-bot
```

## Структура

### Команды бота

- `/start` - приветствие "Добро пожаловать в BOOKE!" и запуск Mini App
- `/start purchase_{json_data}` - покупка кейса через Telegram Stars

### Обработчики

1. **start_command** - обработка команды `/start`
2. **send_invoice** - отправка invoice для покупки
3. **precheckout_callback** - подтверждение платежа перед оплатой
4. **successful_payment_callback** - обработка успешного платежа

### Конфигурация

```python
# Цены кейсов в звездах Telegram
CASE_PRICES = {
    0: 1,   # Diamond case
    1: 1,   # Money case
    2: 1    # Legendary case
}

# Названия кейсов
CASE_NAMES = {
    0: "Diamond case",
    1: "Money case",
    2: "Legendary case"
}
```

## Логирование

Все события логируются в консоль с уровнем INFO:
- Запросы на покупку
- Отправка invoice
- Подтверждение pre-checkout
- Успешные платежи
- Ошибки

## Формат данных

### Payload invoice

Формат: `case_{index}_{price}_{timestamp}`

Пример: `case_0_1_1704067200`

### Параметры команды /start

Формат: `/start purchase_{json_data}`

Пример JSON:
```json
{
    "caseIndex": 0,
    "starsPrice": 1
}
```

## Тестирование

1. Запустите бота через консоль:
```bash
python telegram_bot.py
```

2. Откройте бота в Telegram и отправьте `/start`

3. Проверьте логи в консоли

4. Для тестирования покупки используйте Mini App в игре

## Важные моменты

⚠️ **Telegram Stars API:**
- Валюта: `XTR`
- `provider_token` должен быть пустой строкой
- Сумма указывается в звездах (целое число)

⚠️ **Безопасность:**
- Всегда проверяйте данные от пользователя
- Валидируйте payload перед обработкой
- Логируйте все транзакции

⚠️ **Обработка ошибок:**
- Все ошибки логируются
- Пользователю отправляются понятные сообщения об ошибках
- Критические ошибки не прерывают работу бота

## Удаленные файлы

Следующие файлы были удалены, так как их функционал перенесен в `telegram_stars_bot.py`:
- `bot_payment_handler.py`
- `bot_example.py`
- `bot_with_stats.py`

## Поддержка

При возникновении проблем проверьте:
1. Правильность токена бота
2. Установлена ли библиотека `python-telegram-bot`
3. Логи в консоли на наличие ошибок

