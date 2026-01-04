/**
 * Конфигурация PostHog
 * Заполните этот файл ключами вашего проекта PostHog
 * Для разных окружений можно переопределять window.BOOKE_POSTHOG_CONFIG до подключения этого скрипта.
 */
window.BOOKE_POSTHOG_CONFIG = window.BOOKE_POSTHOG_CONFIG || {
    apiKey: 'phc_M15uyvefmcd2DkAeM9PLGKt11yMBdfcuERQNnCnDyZF', // Замените на ваш API ключ из PostHog
    host: 'https://app.posthog.com', // Или ваш собственный хост PostHog
    autocapture: true, // Автоматическое отслеживание кликов
    capture_pageview: true, // Отслеживание просмотров страниц
    capture_pageleave: true, // Отслеживание ухода со страницы
    loaded: function(posthog) {
        // Callback после загрузки PostHog
        console.log('[PostHog] Initialized successfully');
    }
};

