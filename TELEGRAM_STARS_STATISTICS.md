# 📊 Где посмотреть статистику по Telegram Stars (для разработчика)

## 🎯 Основные способы просмотра статистики

### 1. **Telegram Ads Platform (Основной способ)**

**Где найти:**
- Перейдите на: https://ads.telegram.org/
- Войдите с аккаунтом, который связан с вашим ботом
- В разделе **"Revenue"** или **"Earnings"** вы найдете статистику по Telegram Stars

**Что можно увидеть:**
- Общее количество заработанных звезд
- Статистика по дням/неделям/месяцам
- Количество транзакций
- Графики доходов

### 2. **Через Telegram Bot API**

Вы можете получать статистику программно через API:

**Метод:** `getMyShortDescription` или специальные методы для статистики

**Пример запроса:**
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getMyShortDescription"
```

### 3. **Ведение собственной статистики (РЕКОМЕНДУЕТСЯ)**

**Создайте систему учета в вашем боте:**

#### Вариант A: Логирование в базу данных

Добавьте в ваш бот (например, в `bot_example.py`):

```python
import sqlite3
from datetime import datetime

# Создание таблицы для статистики
def init_stats_db():
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS stars_earnings
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                  user_id INTEGER,
                  case_index INTEGER,
                  stars_amount INTEGER,
                  case_name TEXT,
                  timestamp DATETIME)''')
    conn.commit()
    conn.close()

# Сохранение транзакции
def save_stars_transaction(user_id, case_index, stars_amount, case_name):
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('''INSERT INTO stars_earnings 
                 (user_id, case_index, stars_amount, case_name, timestamp)
                 VALUES (?, ?, ?, ?, ?)''',
              (user_id, case_index, stars_amount, case_name, datetime.now()))
    conn.commit()
    conn.close()

# Получение статистики
def get_total_earnings():
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('SELECT SUM(stars_amount) FROM stars_earnings')
    total = c.fetchone()[0] or 0
    conn.close()
    return total

# Получение статистики по дням
def get_daily_stats():
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('''SELECT DATE(timestamp) as date, 
                        SUM(stars_amount) as total,
                        COUNT(*) as transactions
                 FROM stars_earnings
                 GROUP BY DATE(timestamp)
                 ORDER BY date DESC''')
    stats = c.fetchall()
    conn.close()
    return stats
```

**Обновите функцию обработки успешного платежа:**

```python
async def successful_payment_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    payment = update.message.successful_payment
    payload = payment.invoice_payload
    
    parts = payload.split('_')
    if len(parts) >= 2:
        case_index = int(parts[1])
        case_name = CASE_NAMES.get(case_index, "Кейс")
        stars_amount = CASE_PRICES.get(case_index, 1)
        user_id = update.effective_user.id
        
        # Сохраняем транзакцию в БД
        save_stars_transaction(user_id, case_index, stars_amount, case_name)
        
        # Логируем
        logger.info(f"Пользователь {user_id} купил {case_name} за {stars_amount} звезд")
        
        await update.message.reply_text(
            f"✅ Платеж успешен!\n\n"
            f"Вы купили: {case_name}\n"
            f"Кейс будет открыт в игре автоматически."
        )
```

#### Вариант B: Команда для просмотра статистики в боте

Добавьте команду `/stats` в бот:

```python
async def stats_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Показывает статистику по заработку звезд"""
    user_id = update.effective_user.id
    
    # Проверяем, что это администратор/разработчик
    # (добавьте проверку на ваш admin_id)
    ADMIN_ID = 123456789  # Ваш Telegram ID
    
    if user_id != ADMIN_ID:
        await update.message.reply_text("Доступ запрещен")
        return
    
    total_earnings = get_total_earnings()
    daily_stats = get_daily_stats()
    
    message = f"📊 **Статистика по Telegram Stars**\n\n"
    message += f"💰 Всего заработано: **{total_earnings}** ⭐\n\n"
    message += f"📅 Статистика по дням:\n"
    
    for date, total, transactions in daily_stats[:7]:  # Последние 7 дней
        message += f"• {date}: {total} ⭐ ({transactions} транзакций)\n"
    
    await update.message.reply_text(message, parse_mode='Markdown')

# Добавьте в main():
application.add_handler(CommandHandler("stats", stats_command))
```

### 4. **Telegram Business (если подключен)**

Если у вас подключен Telegram Business:
- Откройте настройки бота
- Раздел "Business" → "Revenue" или "Earnings"
- Там должна быть статистика по звездам

### 5. **Через вебхуки платежей**

Telegram может отправлять уведомления о платежах на ваш сервер через webhook. Настройте endpoint для получения уведомлений о всех транзакциях.

## 📈 Рекомендации

1. **Ведите свою статистику** - это самый надежный способ
2. **Логируйте все транзакции** в базу данных
3. **Создайте админ-панель** или команду в боте для просмотра статистики
4. **Регулярно проверяйте** статистику в Telegram Ads Platform

## 🔍 Быстрый доступ

- **Telegram Ads Platform:** https://ads.telegram.org/
- **Telegram Bot API Docs:** https://core.telegram.org/bots/api
- **Telegram Stars Docs:** https://core.telegram.org/bots/payments#telegram-stars

## ⚠️ Важно помнить

- Telegram берет комиссию (обычно 5-30% в зависимости от платформы)
- Комиссии App Store/Google Play могут достигать 40% при покупке звезд через мобильные приложения
- Фактический доход = Заработанные звезды - Комиссии

## 💡 Пример SQL запросов для анализа

```sql
-- Общая статистика
SELECT 
    SUM(stars_amount) as total_stars,
    COUNT(*) as total_transactions,
    AVG(stars_amount) as avg_per_transaction
FROM stars_earnings;

-- Статистика по типам кейсов
SELECT 
    case_name,
    COUNT(*) as purchases,
    SUM(stars_amount) as total_stars
FROM stars_earnings
GROUP BY case_name
ORDER BY total_stars DESC;

-- Топ пользователей
SELECT 
    user_id,
    COUNT(*) as purchases,
    SUM(stars_amount) as total_spent
FROM stars_earnings
GROUP BY user_id
ORDER BY total_spent DESC
LIMIT 10;
```

