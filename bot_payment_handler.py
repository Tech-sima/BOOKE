"""
Простой бот для обработки платежей Telegram Stars
Токен: 8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU

Этот бот обрабатывает:
1. pre_checkout_query - подтверждение платежа
2. successful_payment - успешная оплата и отправка данных в Mini App
"""

import logging
from telegram import Update
from telegram.ext import Application, MessageHandler, PreCheckoutQueryHandler, filters, ContextTypes

logging.basicConfig(
    format='%(asctime)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

BOT_TOKEN = "8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU"

# Цены кейсов
CASE_PRICES = {0: 1, 1: 1, 2: 1}
CASE_NAMES = {0: "Diamond case", 1: "Money case", 2: "Legendary case"}


async def precheckout_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработка pre_checkout_query - подтверждение платежа"""
    query = update.pre_checkout_query
    
    # Всегда подтверждаем запрос
    # Можно добавить дополнительную проверку здесь
    await query.answer(ok=True)
    logger.info(f"Pre-checkout подтвержден для пользователя {query.from_user.id}")


async def successful_payment_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработка successful_payment - успешная оплата"""
    payment = update.message.successful_payment
    payload = payment.invoice_payload
    
    # Извлекаем данные из payload (формат: case_index_timestamp)
    try:
        parts = payload.split('_')
        if len(parts) >= 2:
            case_index = int(parts[1])
            case_name = CASE_NAMES.get(case_index, "Кейс")
            
            user_id = update.effective_user.id
            
            logger.info(f"Пользователь {user_id} купил {case_name} (индекс: {case_index})")
            
            # Сохраняем telegram_payment_charge_id для возможного возврата
            charge_id = payment.telegram_payment_charge_id
            logger.info(f"Payment charge ID: {charge_id}")
            
            # Отправляем данные в Mini App через webApp.sendData()
            # К сожалению, напрямую отправить данные в Mini App нельзя
            # Нужно использовать другой механизм (webhook, polling и т.д.)
            
            # Вместо этого отправляем сообщение пользователю
            await update.message.reply_text(
                f"✅ Платеж успешен!\n\n"
                f"Вы купили: {case_name}\n"
                f"Кейс будет открыт в игре автоматически."
            )
            
            # TODO: Здесь нужно отправить данные в Mini App
            # Это можно сделать через:
            # 1. Webhook на ваш сервер, который отправит данные в Mini App
            # 2. Polling механизм в Mini App, который будет проверять статус
            # 3. Использование Telegram Bot API для отправки данных
            
    except Exception as e:
        logger.error(f"Ошибка при обработке платежа: {e}")
        await update.message.reply_text("Произошла ошибка при обработке платежа.")


def main() -> None:
    """Запуск бота"""
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Регистрируем обработчики
    application.add_handler(PreCheckoutQueryHandler(precheckout_callback))
    application.add_handler(MessageHandler(filters.SUCCESSFUL_PAYMENT, successful_payment_callback))
    
    logger.info("Бот запущен и готов обрабатывать платежи...")
    application.run_polling(allowed_updates=Update.ALL_TYPES)


if __name__ == '__main__':
    main()


