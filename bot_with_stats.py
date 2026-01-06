"""
Бот с функцией статистики по Telegram Stars
Токен бота: 8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU
"""

import logging
import sqlite3
from datetime import datetime
from telegram import Update, LabeledPrice
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, PreCheckoutQueryHandler, MessageHandler, filters, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Токен бота
BOT_TOKEN = "8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU"

# ID администратора (ЗАМЕНИТЕ на ваш Telegram ID)
ADMIN_ID = 123456789  # TODO: Замените на ваш Telegram ID (можно узнать через @userinfobot)

# Цены кейсов в звездах
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


# ========== БАЗА ДАННЫХ ==========

def init_stats_db():
    """Инициализация базы данных для статистики"""
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
    logger.info("База данных инициализирована")


def save_stars_transaction(user_id, case_index, stars_amount, case_name):
    """Сохранение транзакции в базу данных"""
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('''INSERT INTO stars_earnings 
                 (user_id, case_index, stars_amount, case_name, timestamp)
                 VALUES (?, ?, ?, ?, ?)''',
              (user_id, case_index, stars_amount, case_name, datetime.now()))
    conn.commit()
    conn.close()
    logger.info(f"Сохранена транзакция: {user_id} купил {case_name} за {stars_amount} звезд")


def get_total_earnings():
    """Получение общего количества заработанных звезд"""
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('SELECT SUM(stars_amount) FROM stars_earnings')
    result = c.fetchone()
    total = result[0] if result[0] else 0
    conn.close()
    return total


def get_daily_stats(days=7):
    """Получение статистики по дням"""
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('''SELECT DATE(timestamp) as date, 
                        SUM(stars_amount) as total,
                        COUNT(*) as transactions
                 FROM stars_earnings
                 GROUP BY DATE(timestamp)
                 ORDER BY date DESC
                 LIMIT ?''', (days,))
    stats = c.fetchall()
    conn.close()
    return stats


def get_case_stats():
    """Статистика по типам кейсов"""
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('''SELECT 
                    case_name,
                    COUNT(*) as purchases,
                    SUM(stars_amount) as total_stars
                 FROM stars_earnings
                 GROUP BY case_name
                 ORDER BY total_stars DESC''')
    stats = c.fetchall()
    conn.close()
    return stats


def get_total_transactions():
    """Общее количество транзакций"""
    conn = sqlite3.connect('stars_stats.db')
    c = conn.cursor()
    c.execute('SELECT COUNT(*) FROM stars_earnings')
    count = c.fetchone()[0]
    conn.close()
    return count


# ========== ОБРАБОТЧИКИ КОМАНД ==========

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    if context.args:
        start_param = context.args[0]
        
        if start_param.startswith('purchase_'):
            import json
            import urllib.parse
            
            try:
                callback_data = urllib.parse.unquote(start_param.replace('purchase_', ''))
                purchase_data = json.loads(callback_data)
                
                case_index = purchase_data.get('caseIndex', 0)
                stars_price = CASE_PRICES.get(case_index, 1)
                case_name = CASE_NAMES.get(case_index, "Кейс")
                
                await send_invoice(update, context, case_index, stars_price, case_name)
                return
            except Exception as e:
                logger.error(f"Ошибка при обработке purchase: {e}")
    
    await update.message.reply_text(
        "Привет! Я бот для покупки кейсов в игре.\n"
        "Используйте Mini App для покупки кейсов."
    )


async def stats_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Команда /stats - показывает статистику по заработку звезд"""
    user_id = update.effective_user.id
    
    # Проверяем, что это администратор
    if user_id != ADMIN_ID:
        await update.message.reply_text("❌ Доступ запрещен. Эта команда только для разработчика.")
        return
    
    try:
        total_earnings = get_total_earnings()
        total_transactions = get_total_transactions()
        daily_stats = get_daily_stats(7)
        case_stats = get_case_stats()
        
        message = "📊 **СТАТИСТИКА ПО TELEGRAM STARS**\n\n"
        message += f"💰 Всего заработано: **{total_earnings}** ⭐\n"
        message += f"📦 Всего транзакций: **{total_transactions}**\n\n"
        
        if daily_stats:
            message += "📅 **Статистика за последние 7 дней:**\n"
            for date, total, transactions in daily_stats:
                message += f"• {date}: {total} ⭐ ({transactions} покупок)\n"
            message += "\n"
        
        if case_stats:
            message += "🎁 **Статистика по кейсам:**\n"
            for case_name, purchases, total_stars in case_stats:
                message += f"• {case_name}: {total_stars} ⭐ ({purchases} покупок)\n"
        
        await update.message.reply_text(message, parse_mode='Markdown')
        
    except Exception as e:
        logger.error(f"Ошибка при получении статистики: {e}")
        await update.message.reply_text("❌ Ошибка при получении статистики.")


async def send_invoice(update: Update, context: ContextTypes.DEFAULT_TYPE, 
                      case_index: int, stars_price: int, case_name: str) -> None:
    """Отправка invoice для покупки кейса"""
    chat_id = update.effective_chat.id
    
    payload = f"case_{case_index}_{stars_price}"
    prices = [LabeledPrice(f"{case_name}", stars_price)]
    
    await context.bot.send_invoice(
        chat_id=chat_id,
        title=f"Покупка {case_name}",
        description=f"{case_name} за {stars_price} звезд Telegram",
        payload=payload,
        provider_token="",
        currency="XTR",
        prices=prices,
        start_parameter=f"case_{case_index}",
        need_name=False,
        need_phone_number=False,
        need_email=False,
        need_shipping_address=False,
        is_flexible=False
    )


async def precheckout_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработка pre-checkout запроса"""
    query = update.pre_checkout_query
    await query.answer(ok=True)


async def successful_payment_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработка успешного платежа"""
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
        
        logger.info(f"Пользователь {user_id} купил {case_name} за {stars_amount} звезд")
        
        await update.message.reply_text(
            f"✅ Платеж успешен!\n\n"
            f"Вы купили: {case_name}\n"
            f"Кейс будет открыт в игре автоматически."
        )


async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик callback_query"""
    query = update.callback_query
    await query.answer()
    
    if query.data:
        try:
            import json
            data = json.loads(query.data)
            
            if data.get('type') == 'purchase_case':
                case_index = data.get('caseIndex', 0)
                stars_price = CASE_PRICES.get(case_index, 1)
                case_name = CASE_NAMES.get(case_index, "Кейс")
                
                await send_invoice(update, context, case_index, stars_price, case_name)
        except:
            pass


def main() -> None:
    """Запуск бота"""
    # Инициализируем базу данных
    init_stats_db()
    
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("stats", stats_command))
    application.add_handler(CallbackQueryHandler(button_callback))
    application.add_handler(PreCheckoutQueryHandler(precheckout_callback))
    application.add_handler(MessageHandler(filters.SUCCESSFUL_PAYMENT, successful_payment_callback))
    
    # Запускаем бота
    logger.info("Бот запущен...")
    logger.info(f"Для просмотра статистики отправьте команду /stats (только для администратора ID: {ADMIN_ID})")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()

