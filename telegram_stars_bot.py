"""
Основной бот для BOOKE - Telegram Mini App игры
Токен: 8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU

Этот бот является основным ботом, через который запускается Mini App игры.
Он полностью отвечает за:
1. Обработку команды /start (приветствие и запуск Mini App)
2. Создание invoice для покупки кейсов через Telegram Stars
3. Обработку pre_checkout_query (подтверждение платежа)
4. Обработку successful_payment (успешная оплата)
5. Логирование всех транзакций

Запуск через консоль: python telegram_stars_bot.py
"""

import logging
import json
import urllib.parse
from datetime import datetime
from telegram import Update, LabeledPrice
from telegram.ext import (
    Application,
    CommandHandler,
    PreCheckoutQueryHandler,
    MessageHandler,
    filters,
    ContextTypes
)

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Токен бота
BOT_TOKEN = "8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU"

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


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    Обработчик команды /start
    
    Поддерживает параметры:
    - /start - обычное приветствие
    - /start purchase_{json_data} - покупка кейса через Mini App
    """
    if not context.args:
        # Обычное приветствие
        await update.message.reply_text(
            "Добро пожаловать в BOOKE!\n\n"
            "Отправьтесь в захватывающее путешествие, полное инвестиций, роста и открытий. "
            "Постройте свою империю, расширьте свой кругозор и станьте настоящим магнатом."
        )
        logger.info(f"Пользователь {update.effective_user.id} использовал команду /start")
        return
    
    # Обработка параметров команды /start
    start_param = context.args[0]
    
    if start_param.startswith('purchase_'):
        try:
            # Декодируем данные покупки
            callback_data = urllib.parse.unquote(start_param.replace('purchase_', ''))
            purchase_data = json.loads(callback_data)
            
            # Извлекаем данные о кейсе
            case_index = purchase_data.get('caseIndex', 0)
            stars_price = CASE_PRICES.get(case_index, 1)
            case_name = CASE_NAMES.get(case_index, "Кейс")
            
            logger.info(
                f"Запрос на покупку: пользователь {update.effective_user.id}, "
                f"кейс {case_name} (индекс {case_index}), цена {stars_price} звезд"
            )
            
            # Отправляем invoice
            await send_invoice(update, context, case_index, stars_price, case_name)
            
        except json.JSONDecodeError as e:
            logger.error(f"Ошибка декодирования JSON в /start: {e}")
            await update.message.reply_text(
                "❌ Ошибка при обработке запроса на покупку. Попробуйте еще раз."
            )
        except Exception as e:
            logger.error(f"Ошибка при обработке /start с параметрами: {e}")
            await update.message.reply_text(
                "❌ Произошла ошибка. Попробуйте еще раз."
            )
    else:
        # Неизвестный параметр - показываем приветствие
        await update.message.reply_text(
            "Добро пожаловать в BOOKE!\n\n"
            "Отправьтесь в захватывающее путешествие, полное инвестиций, роста и открытий. "
            "Постройте свою империю, расширьте свой кругозор и станьте настоящим магнатом."
        )


async def send_invoice(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
    case_index: int,
    stars_price: int,
    case_name: str
) -> None:
    """
    Отправка invoice для покупки кейса
    
    Args:
        update: Объект Update от Telegram
        context: Контекст бота
        case_index: Индекс кейса (0, 1, 2)
        stars_price: Цена в звездах Telegram
        case_name: Название кейса
    """
    chat_id = update.effective_chat.id
    
    # Создаем payload для invoice
    # Формат: case_{index}_{price}_{timestamp}
    timestamp = int(datetime.now().timestamp())
    payload = f"case_{case_index}_{stars_price}_{timestamp}"
    
    # Создаем prices для invoice
    prices = [LabeledPrice(f"{case_name}", stars_price)]
    
    try:
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
        
        logger.info(
            f"Invoice отправлен: пользователь {chat_id}, "
            f"кейс {case_name}, цена {stars_price} звезд"
        )
        
    except Exception as e:
        logger.error(f"Ошибка при отправке invoice: {e}")
        await update.message.reply_text(
            "❌ Ошибка при создании платежа. Попробуйте еще раз."
        )


async def precheckout_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    Обработка pre_checkout_query - подтверждение платежа перед оплатой
    
    Здесь можно добавить дополнительную проверку данных платежа
    """
    query = update.pre_checkout_query
    
    try:
        # Проверяем payload
        payload = query.invoice_payload
        
        # Извлекаем данные из payload
        parts = payload.split('_')
        if len(parts) >= 3:
            case_index = int(parts[1])
            stars_price = int(parts[2])
            
            # Проверяем, что кейс существует
            if case_index not in CASE_PRICES:
                await query.answer(
                    ok=False,
                    error_message="Неизвестный кейс. Пожалуйста, попробуйте еще раз."
                )
                logger.warning(f"Попытка покупки неизвестного кейса: {case_index}")
                return
            
            # Проверяем цену
            if stars_price != CASE_PRICES.get(case_index):
                await query.answer(
                    ok=False,
                    error_message="Неверная цена. Пожалуйста, попробуйте еще раз."
                )
                logger.warning(
                    f"Неверная цена для кейса {case_index}: "
                    f"ожидалось {CASE_PRICES.get(case_index)}, получено {stars_price}"
                )
                return
        
        # Подтверждаем запрос
        await query.answer(ok=True)
        logger.info(
            f"Pre-checkout подтвержден: пользователь {query.from_user.id}, "
            f"payload: {payload}"
        )
        
    except Exception as e:
        logger.error(f"Ошибка при обработке pre-checkout: {e}")
        await query.answer(
            ok=False,
            error_message="Ошибка при обработке платежа. Попробуйте еще раз."
        )


async def successful_payment_callback(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE
) -> None:
    """
    Обработка successful_payment - успешная оплата
    
    Здесь обрабатывается успешный платеж и логируется транзакция
    """
    payment = update.message.successful_payment
    payload = payment.invoice_payload
    
    try:
        # Извлекаем данные из payload
        # Формат: case_{index}_{price}_{timestamp}
        parts = payload.split('_')
        
        if len(parts) >= 3:
            case_index = int(parts[1])
            stars_price = int(parts[2])
            case_name = CASE_NAMES.get(case_index, "Кейс")
            user_id = update.effective_user.id
            
            # Получаем charge_id для возможного возврата
            charge_id = payment.telegram_payment_charge_id
            
            # Логируем успешную транзакцию
            logger.info(
                f"✅ Платеж успешен: пользователь {user_id}, "
                f"кейс {case_name} (индекс {case_index}), "
                f"цена {stars_price} звезд, "
                f"charge_id: {charge_id}"
            )
            
            # Отправляем подтверждение пользователю
            await update.message.reply_text(
                f"✅ **Платеж успешен!**\n\n"
                f"🎁 Вы купили: **{case_name}**\n"
                f"⭐ Стоимость: **{stars_price}** звезд\n\n"
                f"Кейс будет открыт в игре автоматически."
            )
            
        else:
            logger.warning(f"Неверный формат payload: {payload}")
            await update.message.reply_text(
                "✅ Платеж успешен, но произошла ошибка при обработке. "
                "Обратитесь в поддержку."
            )
            
    except Exception as e:
        logger.error(f"Ошибка при обработке успешного платежа: {e}")
        await update.message.reply_text(
            "✅ Платеж успешен, но произошла ошибка при обработке. "
            "Обратитесь в поддержку."
        )


def main() -> None:
    """
    Главная функция для запуска бота
    
    Запуск через консоль: python telegram_stars_bot.py
    """
    logger.info("=" * 50)
    logger.info("Запуск основного бота BOOKE (Telegram Mini App)")
    logger.info("Обработка Telegram Stars платежей включена")
    logger.info("=" * 50)
    
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Регистрируем обработчики
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(PreCheckoutQueryHandler(precheckout_callback))
    application.add_handler(
        MessageHandler(filters.SUCCESSFUL_PAYMENT, successful_payment_callback)
    )
    
    # Запускаем бота
    logger.info("Бот запущен и готов обрабатывать платежи...")
    logger.info("Используйте Ctrl+C для остановки")
    
    try:
        application.run_polling(
            allowed_updates=Update.ALL_TYPES,
            drop_pending_updates=True
        )
    except KeyboardInterrupt:
        logger.info("Получен сигнал остановки. Завершение работы...")
    except Exception as e:
        logger.error(f"Критическая ошибка: {e}")
        raise


if __name__ == '__main__':
    main()

