/**
 * Сервис для работы с PostHog
 * Предоставляет удобные методы для отслеживания событий и пользователей
 */
(function() {
    'use strict';

    const config = window.BOOKE_POSTHOG_CONFIG || null;
    let posthog = null;
    let isInitialized = false;

    // Инициализация PostHog
    function initPostHog() {
        if (isInitialized || typeof window.posthog === 'undefined') {
            return;
        }

        if (!config || !config.apiKey) {
            console.warn('[PostHog] API key not configured. Please set window.BOOKE_POSTHOG_CONFIG.apiKey');
            return;
        }

        try {
            posthog = window.posthog;
            
            // Инициализируем PostHog с конфигурацией
            posthog.init(config.apiKey, {
                api_host: config.host || 'https://app.posthog.com',
                autocapture: config.autocapture !== false,
                capture_pageview: config.capture_pageview !== false,
                capture_pageleave: config.capture_pageleave !== false,
                loaded: function(ph) {
                    isInitialized = true;
                    console.log('[PostHog] Service initialized');
                    
                    // Идентифицируем пользователя при загрузке
                    identifyUser();
                    
                    // Устанавливаем свойства пользователя
                    setUserProperties();
                    
                    if (config.loaded && typeof config.loaded === 'function') {
                        config.loaded(ph);
                    }
                }
            });
        } catch (error) {
            console.error('[PostHog] Initialization failed:', error);
        }
    }

    // Получение данных пользователя
    function getUserData() {
        const telegramUser = typeof window.getTelegramUser === 'function' ? window.getTelegramUser() : null;
        const username = localStorage.getItem('profile.username') || null;
        const userId = localStorage.getItem('uniqueUserId') || null;
        const balance = typeof window.getBalance === 'function' ? window.getBalance() : parseFloat(localStorage.getItem('balance') || '0');
        const credits = typeof window.getCredits === 'function' ? window.getCredits() : parseInt(localStorage.getItem('credits') || '0');
        
        // Получаем данные о зданиях
        const buildingsData = JSON.parse(localStorage.getItem('buildingsData') || '{}');
        const buildingsOwned = Object.values(buildingsData).filter(b => b && b.isOwned).length;
        
        return {
            telegramId: telegramUser ? telegramUser.id : null,
            telegramUsername: telegramUser ? telegramUser.username : null,
            telegramFirstName: telegramUser ? telegramUser.first_name : null,
            telegramLastName: telegramUser ? telegramUser.last_name : null,
            username: username,
            userId: userId,
            balance: balance,
            credits: credits,
            buildingsOwned: buildingsOwned,
            platform: window.isTelegramApp ? 'telegram' : 'web'
        };
    }

    // Идентификация пользователя
    function identifyUser() {
        if (!posthog || !isInitialized) return;
        
        const userData = getUserData();
        const distinctId = userData.telegramId || userData.userId || `web_${Date.now()}`;
        
        try {
            posthog.identify(distinctId, {
                username: userData.username,
                telegram_id: userData.telegramId,
                telegram_username: userData.telegramUsername,
                platform: userData.platform
            });
        } catch (error) {
            console.error('[PostHog] Failed to identify user:', error);
        }
    }

    // Установка свойств пользователя
    function setUserProperties() {
        if (!posthog || !isInitialized) return;
        
        const userData = getUserData();
        
        try {
            posthog.setPersonProperties({
                balance: userData.balance,
                credits: userData.credits,
                buildings_owned: userData.buildingsOwned,
                platform: userData.platform,
                username: userData.username
            });
        } catch (error) {
            console.error('[PostHog] Failed to set user properties:', error);
        }
    }

    // Отслеживание события
    function trackEvent(eventName, properties = {}) {
        if (!posthog || !isInitialized) {
            console.warn('[PostHog] Not initialized, event not tracked:', eventName);
            return;
        }

        try {
            // Добавляем общие свойства
            const enrichedProperties = {
                ...properties,
                timestamp: new Date().toISOString(),
                platform: window.isTelegramApp ? 'telegram' : 'web'
            };

            // Добавляем данные о балансе и кредитах
            const userData = getUserData();
            enrichedProperties.balance = userData.balance;
            enrichedProperties.credits = userData.credits;
            enrichedProperties.buildings_owned = userData.buildingsOwned;

            posthog.capture(eventName, enrichedProperties);
        } catch (error) {
            console.error('[PostHog] Failed to track event:', error);
        }
    }

    // Отслеживание покупки
    function trackPurchase(itemType, itemName, cost, currency = 'money', additionalProperties = {}) {
        trackEvent('purchase', {
            item_type: itemType,
            item_name: itemName,
            cost: cost,
            currency: currency,
            ...additionalProperties
        });
    }

    // Отслеживание получения денег/кредитов
    function trackEarned(amount, currency = 'money', source = 'unknown', additionalProperties = {}) {
        trackEvent('earned', {
            amount: amount,
            currency: currency,
            source: source,
            ...additionalProperties
        });
    }

    // Отслеживание трат
    function trackSpent(amount, currency = 'money', reason = 'unknown', additionalProperties = {}) {
        trackEvent('spent', {
            amount: amount,
            currency: currency,
            reason: reason,
            ...additionalProperties
        });
    }

    // Отслеживание постройки здания
    function trackBuildingBuilt(buildingName, buildingKey, cost, level = 1) {
        trackEvent('building_built', {
            building_name: buildingName,
            building_key: buildingKey,
            cost: cost,
            level: level
        });
        setUserProperties(); // Обновляем свойства пользователя
    }

    // Отслеживание улучшения здания
    function trackBuildingUpgraded(buildingName, buildingKey, cost, newLevel) {
        trackEvent('building_upgraded', {
            building_name: buildingName,
            building_key: buildingKey,
            cost: cost,
            new_level: newLevel
        });
        setUserProperties();
    }

    // Отслеживание выполнения задания
    function trackTaskCompleted(taskId, taskName, reward = {}) {
        trackEvent('task_completed', {
            task_id: taskId,
            task_name: taskName,
            reward_money: reward.money || 0,
            reward_credits: reward.credits || 0,
            reward_xp: reward.xp || 0
        });
    }

    // Отслеживание открытия панели
    function trackPanelOpened(panelName) {
        trackEvent('panel_opened', {
            panel_name: panelName
        });
    }

    // Отслеживание открытия подарка/сейфа
    function trackRewardOpened(rewardType, rewards = {}) {
        trackEvent('reward_opened', {
            reward_type: rewardType,
            reward_money: rewards.money || 0,
            reward_credits: rewards.credits || 0,
            reward_xp: rewards.xp || 0,
            reward_character: rewards.character || null
        });
    }

    // Инициализация при загрузке DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPostHog);
    } else {
        // DOM уже загружен
        setTimeout(initPostHog, 100);
    }

    // Экспорт API
    window.posthogService = {
        track: trackEvent,
        trackPurchase: trackPurchase,
        trackEarned: trackEarned,
        trackSpent: trackSpent,
        trackBuildingBuilt: trackBuildingBuilt,
        trackBuildingUpgraded: trackBuildingUpgraded,
        trackTaskCompleted: trackTaskCompleted,
        trackPanelOpened: trackPanelOpened,
        trackRewardOpened: trackRewardOpened,
        identify: identifyUser,
        setUserProperties: setUserProperties,
        isReady: function() {
            return isInitialized && posthog !== null;
        }
    };

    // Автоматическое обновление свойств пользователя при изменении баланса
    let lastBalance = null;
    let lastCredits = null;
    
    setInterval(function() {
        if (!isInitialized) return;
        
        const currentBalance = typeof window.getBalance === 'function' ? window.getBalance() : parseFloat(localStorage.getItem('balance') || '0');
        const currentCredits = typeof window.getCredits === 'function' ? window.getCredits() : parseInt(localStorage.getItem('credits') || '0');
        
        if (currentBalance !== lastBalance || currentCredits !== lastCredits) {
            setUserProperties();
            lastBalance = currentBalance;
            lastCredits = currentCredits;
        }
    }, 5000); // Проверяем каждые 5 секунд
})();

