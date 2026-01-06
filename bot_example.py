"""
Пример бота для обработки покупок кейсов через Telegram Stars
Токен бота: 8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU
"""

import logging
from telegram import Update, LabeledPrice, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, PreCheckoutQueryHandler, MessageHandler, filters, ContextTypes

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Токен бота
BOT_TOKEN = "8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU"

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


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    if context.args:
        # Если есть параметры (например, от Mini App)
        start_param = context.args[0]
        
        if start_param.startswith('purchase_'):
            # Извлекаем данные о покупке
            import json
            import urllib.parse
            
            try:
                callback_data = urllib.parse.unquote(start_param.replace('purchase_', ''))
                purchase_data = json.loads(callback_data)
                
                case_index = purchase_data.get('caseIndex', 0)
                stars_price = CASE_PRICES.get(case_index, 50)
                case_name = CASE_NAMES.get(case_index, "Кейс")
                
                # Создаем invoice
                await send_invoice(update, context, case_index, stars_price, case_name)
                return
            except Exception as e:
                logger.error(f"Ошибка при обработке purchase: {e}")
    
    # Обычное приветствие
    await update.message.reply_text(
        "Привет! Я бот для покупки кейсов в игре.\n"
        "Используйте Mini App для покупки кейсов."
    )


async def send_invoice(update: Update, context: ContextTypes.DEFAULT_TYPE, 
                      case_index: int, stars_price: int, case_name: str) -> None:
    """Отправка invoice для покупки кейса"""
    chat_id = update.effective_chat.id
    
    # Создаем payload для invoice
    payload = f"case_{case_index}_{stars_price}"
    
    # Создаем invoice
    prices = [LabeledPrice(f"{case_name}", stars_price)]
    
    await context.bot.send_invoice(
        chat_id=chat_id,
        title=f"Покупка {case_name}",
        description=f"{case_name} за {stars_price} звезд Telegram",
        payload=payload,
        provider_token="",  # Для Telegram Stars оставляем пустым
        currency="XTR",     # XTR - валюта Telegram Stars
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
    
    # Проверяем данные платежа
    payload = query.invoice_payload
    
    # Всегда подтверждаем запрос (можно добавить дополнительную проверку)
    await query.answer(ok=True)


async def successful_payment_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработка успешного платежа"""
    payment = update.message.successful_payment
    payload = payment.invoice_payload
    
    # Извлекаем данные из payload
    # Формат: case_{index}_{price}
    parts = payload.split('_')
    if len(parts) >= 2:
        case_index = int(parts[1])
        case_name = CASE_NAMES.get(case_index, "Кейс")
        
        # Сохраняем информацию о покупке (можно в БД)
        user_id = update.effective_user.id
        logger.info(f"Пользователь {user_id} купил {case_name} (индекс: {case_index})")
        
        # Отправляем подтверждение
        await update.message.reply_text(
            f"✅ Платеж успешен!\n\n"
            f"Вы купили: {case_name}\n"
            f"Кейс будет открыт в игре автоматически."
        )
        
        # Здесь можно отправить данные обратно в Mini App через webhook
        # или использовать другой механизм для уведомления игры


async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик callback_query (для кнопок)"""
    query = update.callback_query
    await query.answer()
    
    # Если пришли данные от Mini App через callback
    if query.data:
        try:
            import json
            data = json.loads(query.data)
            
            if data.get('type') == 'purchase_case':
                case_index = data.get('caseIndex', 0)
                stars_price = CASE_PRICES.get(case_index, 50)
                case_name = CASE_NAMES.get(case_index, "Кейс")
                
                await send_invoice(update, context, case_index, stars_price, case_name)
        except:
            pass


def main() -> None:
    """Запуск бота"""
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CallbackQueryHandler(button_callback))
    application.add_handler(PreCheckoutQueryHandler(precheckout_callback))
    application.add_handler(MessageHandler(filters.SUCCESSFUL_PAYMENT, successful_payment_callback))
    
    # Запускаем бота
    logger.info("Бот запущен...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()

