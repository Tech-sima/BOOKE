/**
 * Пример бота для обработки покупок кейсов через Telegram Stars
 * Токен бота: 8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU
 * 
 * Установка: npm install node-telegram-bot-api
 */

const TelegramBot = require('node-telegram-bot-api');

// Токен бота
const BOT_TOKEN = '8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU';

// Создаем экземпляр бота
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Цены кейсов в звездах
const CASE_PRICES = {
    0: 1,   // Diamond case
    1: 1,   // Money case
    2: 1    // Legendary case
};

// Названия кейсов
const CASE_NAMES = {
    0: "Diamond case",
    1: "Money case",
    2: "Legendary case"
};

// Обработчик команды /start
bot.onText(/\/start(.+)?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const startParam = match[1] ? match[1].trim() : null;
    
    if (startParam && startParam.startsWith('purchase_')) {
        // Извлекаем данные о покупке
        try {
            const callbackData = decodeURIComponent(startParam.replace('purchase_', ''));
            const purchaseData = JSON.parse(callbackData);
            
            const caseIndex = purchaseData.caseIndex || 0;
            const starsPrice = CASE_PRICES[caseIndex] || 50;
            const caseName = CASE_NAMES[caseIndex] || "Кейс";
            
            // Создаем invoice
            await sendInvoice(chatId, caseIndex, starsPrice, caseName);
        } catch (error) {
            console.error('Ошибка при обработке purchase:', error);
            bot.sendMessage(chatId, 'Ошибка при обработке запроса на покупку.');
        }
    } else {
        // Обычное приветствие
        bot.sendMessage(chatId, 
            'Привет! Я бот для покупки кейсов в игре.\n' +
            'Используйте Mini App для покупки кейсов.'
        );
    }
});

// Функция отправки invoice
async function sendInvoice(chatId, caseIndex, starsPrice, caseName) {
    const payload = `case_${caseIndex}_${starsPrice}`;
    
    await bot.sendInvoice(chatId, {
        title: `Покупка ${caseName}`,
        description: `${caseName} за ${starsPrice} звезд Telegram`,
        payload: payload,
        provider_token: '', // Для Telegram Stars оставляем пустым
        currency: 'XTR',    // XTR - валюта Telegram Stars
        prices: [{
            label: caseName,
            amount: starsPrice
        }],
        start_parameter: `case_${caseIndex}`,
        need_name: false,
        need_phone_number: false,
        need_email: false,
        need_shipping_address: false,
        is_flexible: false
    });
}

// Обработчик pre-checkout запроса
bot.on('pre_checkout_query', async (query) => {
    // Всегда подтверждаем запрос (можно добавить дополнительную проверку)
    await bot.answerPreCheckoutQuery(query.id, true);
});

// Обработчик успешного платежа
bot.on('successful_payment', async (msg) => {
    const chatId = msg.chat.id;
    const payment = msg.successful_payment;
    const payload = payment.invoice_payload;
    
    // Извлекаем данные из payload
    // Формат: case_{index}_{price}
    const parts = payload.split('_');
    if (parts.length >= 2) {
        const caseIndex = parseInt(parts[1]);
        const caseName = CASE_NAMES[caseIndex] || "Кейс";
        
        // Сохраняем информацию о покупке (можно в БД)
        const userId = msg.from.id;
        console.log(`Пользователь ${userId} купил ${caseName} (индекс: ${caseIndex})`);
        
        // Отправляем подтверждение
        await bot.sendMessage(chatId,
            `✅ Платеж успешен!\n\n` +
            `Вы купили: ${caseName}\n` +
            `Кейс будет открыт в игре автоматически.`
        );
        
        // Здесь можно отправить данные обратно в Mini App через webhook
        // или использовать другой механизм для уведомления игры
    }
});

// Обработчик callback_query (для кнопок)
bot.on('callback_query', async (query) => {
    await bot.answerCallbackQuery(query.id);
    
    if (query.data) {
        try {
            const data = JSON.parse(query.data);
            
            if (data.type === 'purchase_case') {
                const caseIndex = data.caseIndex || 0;
                const starsPrice = CASE_PRICES[caseIndex] || 50;
                const caseName = CASE_NAMES[caseIndex] || "Кейс";
                
                await sendInvoice(query.message.chat.id, caseIndex, starsPrice, caseName);
            }
        } catch (error) {
            console.error('Ошибка при обработке callback:', error);
        }
    }
});

// Обработка ошибок
bot.on('polling_error', (error) => {
    console.error('Ошибка polling:', error);
});

console.log('Бот запущен...');

