/**
 * Конфигурация PostHog
 * Заполните этот файл ключами вашего проекта PostHog
 * Для разных окружений можно переопределять window.BOOKE_POSTHOG_CONFIG до подключения этого скрипта.
 */
window.BOOKE_POSTHOG_CONFIG = window.BOOKE_POSTHOG_CONFIG || {
    apiKey: 'phc_2C5lRJv3ArPoLVyArwMB4AqdOc4gfh90hP8IIpKs8mV', // Замените на ваш API ключ из PostHog
    host: 'https://us.posthog.com', // Или ваш собственный хост PostHog
    autocapture: true, // Автоматическое отслеживание кликов
    capture_pageview: true, // Отслеживание просмотров страниц
    capture_pageleave: true, // Отслеживание ухода со страницы
    loaded: function(posthog) {
        // Callback после загрузки PostHog
        console.log('[PostHog] Initialized successfully');
        console.log('[PostHog] PostHog instance:', posthog);
        
        // Принудительно отправляем событие сразу после загрузки
        setTimeout(function() {
            try {
                posthog.capture('$pageview', {
                    installation_check: true
                });
                console.log('[PostHog] $pageview sent from config');
            } catch (e) {
                console.error('[PostHog] Error sending $pageview:', e);
            }
        }, 200);
    }
};

