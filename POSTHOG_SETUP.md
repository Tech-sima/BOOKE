# Настройка PostHog для отслеживания данных пользователей

## Шаг 1: Получение API ключа PostHog

1. Зарегистрируйтесь на [PostHog](https://posthog.com) или войдите в свой аккаунт
2. Создайте новый проект или выберите существующий
3. Перейдите в **Settings** → **Project API Key**
4. Скопируйте ваш **Project API Key**

## Шаг 2: Настройка конфигурации

Откройте файл `js/posthog-config.js` и замените `YOUR_POSTHOG_API_KEY` на ваш реальный API ключ:

```javascript
window.BOOKE_POSTHOG_CONFIG = window.BOOKE_POSTHOG_CONFIG || {
    apiKey: 'phc_YOUR_ACTUAL_API_KEY_HERE', // ← Вставьте сюда ваш ключ
    host: 'https://app.posthog.com', // Или ваш собственный хост PostHog
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    loaded: function(posthog) {
        console.log('[PostHog] Initialized successfully');
    }
};
```

## Шаг 3: Проверка работы

1. Откройте ваше приложение в браузере
2. Откройте консоль разработчика (F12)
3. Вы должны увидеть сообщение: `[PostHog] Initialized successfully`
4. Выполните какое-либо действие в игре (покупка, постройка здания и т.д.)
5. Перейдите в PostHog Dashboard → **Events** и проверьте, что события появляются

## Отслеживаемые события

Система автоматически отслеживает следующие события:

### Покупки
- `purchase` - покупка сундуков, сейфов, персонажей
- `earned` - получение денег/кредитов
- `spent` - трата денег/кредитов

### Здания
- `building_built` - постройка здания
- `building_upgraded` - улучшение здания
- `storage_upgraded` - улучшение хранилища

### Задания
- `task_completed` - выполнение задания
- `reward_opened` - открытие награды

### Интерфейс
- `panel_opened` - открытие панели (магазин, профиль, город и т.д.)

## Свойства пользователя

Система автоматически отслеживает и обновляет следующие свойства пользователя:
- `balance` - текущий баланс денег
- `credits` - текущее количество кредитов (RBC)
- `buildings_owned` - количество построенных зданий
- `platform` - платформа (telegram/web)
- `username` - имя пользователя
- `telegram_id` - ID пользователя в Telegram (если доступен)

## Ручное отслеживание событий

Вы также можете вручную отслеживать события в коде:

```javascript
// Простое событие
window.posthogService.track('custom_event', {
    property1: 'value1',
    property2: 'value2'
});

// Покупка
window.posthogService.trackPurchase('item_type', 'Item Name', 100, 'money', {
    additional_property: 'value'
});

// Получение награды
window.posthogService.trackEarned(500, 'money', 'source_name');
```

## Дополнительная информация

- Все события автоматически включают информацию о балансе, кредитах и количестве зданий
- Пользователи автоматически идентифицируются по Telegram ID или локальному ID
- Свойства пользователя обновляются каждые 5 секунд
- PostHog автоматически отслеживает клики и просмотры страниц (если включено)

## Поддержка

Если у вас возникли проблемы:
1. Проверьте консоль браузера на наличие ошибок
2. Убедитесь, что API ключ правильный
3. Проверьте, что скрипты PostHog загружаются (в Network вкладке DevTools)
4. Убедитесь, что `window.posthogService.isReady()` возвращает `true`






