// Система инвестиций - управление зданиями
const INVESTMENTS_CONFIG = {
    buildings: [
        // Дома
        { id: 'bloomie-house', name: 'Дом Блуми', icon: "assets/svg/construction/Bloomie's-house.svg" },
        { id: 'cafe', name: 'Уютное кафе', icon: 'assets/svg/construction/cafe.svg' },
        { id: 'forest-house', name: 'Лесной дом', icon: 'assets/svg/construction/forest-house.svg' },
        { id: 'mansion', name: 'Особняк основателя', icon: 'assets/svg/construction/mansion.svg' },
        { id: 'museum', name: 'Музей коллекционера', icon: 'assets/svg/construction/museum.svg' },
        { id: 'biologist-house', name: 'Дом биолога', icon: "assets/svg/construction/The biologist's house.svg" },
        { id: 'blumi-estate', name: 'Поместье Блуми', icon: "assets/svg/construction/The blumi Estate.svg" },
        { id: 'fisherman-estate', name: 'Поместье рыбака', icon: "assets/svg/construction/The Fisherman's Estate.svg" },
        { id: 'house-of-traitors', name: 'Дом представителей', icon: "assets/svg/construction/The House of Traitors.svg" },
        { id: 'mountain-house', name: 'Горный дом', icon: 'assets/svg/construction/Mountain House.svg' },
        { id: 'high-tech-office', name: 'Технологичный офис', icon: 'assets/svg/construction/High-tech office.svg' },
        { id: 'skyscraper-finance', name: 'Небоскреб финансов', icon: 'assets/svg/construction/Skyscraper of Finance.svg' },
        { id: 'conqueror-castle', name: 'Замок завоевателя', icon: "assets/svg/construction/The Conqueror's Castle.svg" },
        { id: 'town-hall', name: 'Городская ратуша', icon: 'assets/svg/construction/The Town Hall.svg' },
        // Деревни
        { id: 'forest-village', name: 'Лесная деревня', icon: 'assets/svg/construction/Forest Village.svg' },
        { id: 'mountain-village', name: 'Горная деревня', icon: 'assets/svg/construction/Mountain-Village.svg' },
        { id: 'village-grinny', name: 'Деревня Гринни', icon: "assets/svg/construction/The village of Grinny.svg" },
        { id: 'village-technology', name: 'Деревня технологий', icon: 'assets/svg/construction/The Village of Technology.svg' },
        { id: 'village-technology-2', name: 'Деревня технологий 2', icon: 'assets/svg/construction/The-Village-of-Technology.svg' },
        // Города
        { id: 'high-tech-city', name: 'Город технологий', icon: 'assets/svg/construction/A-high-tech-city.svg' },
        { id: 'kingdom', name: 'Книжное королевство', icon: 'assets/svg/construction/Kingdom.svg' }
    ],
    basePurchaseCost: 150, // Первое здание
    purchaseCostIncrement: 100, // Увеличение стоимости каждого следующего
    baseUpgradeCost: 50, // Базовая стоимость улучшения
    upgradeCostIncrement: 20, // Увеличение стоимости улучшения за уровень
    maxLevel: 100,
    unlockLevel: 5, // Уровень для разблокировки следующего здания
    baseIncome: 1, // Доход на 1 уровне
    incomeInterval: 5000 // Интервал начисления дохода (5 секунд)
};

// Инициализация данных инвестиций
function initInvestments() {
    const saved = localStorage.getItem('investments');
    if (!saved) {
        const defaultData = {};
        INVESTMENTS_CONFIG.buildings.forEach((building, index) => {
            defaultData[building.id] = {
                purchased: false,
                level: 0,
                lastIncomeTime: Date.now()
            };
        });
        localStorage.setItem('investments', JSON.stringify(defaultData));
        return defaultData;
    }
    return JSON.parse(saved);
}

// Получить данные инвестиций
function getInvestmentsData() {
    return JSON.parse(localStorage.getItem('investments') || '{}');
}

// Сохранить данные инвестиций
function saveInvestmentsData(data) {
    localStorage.setItem('investments', JSON.stringify(data));
}

// Получить стоимость покупки здания
function getBuildingPurchaseCost(buildingIndex) {
    return INVESTMENTS_CONFIG.basePurchaseCost + (buildingIndex * INVESTMENTS_CONFIG.purchaseCostIncrement);
}

// Получить стоимость улучшения здания
function getBuildingUpgradeCost(level) {
    if (level >= INVESTMENTS_CONFIG.maxLevel) return Infinity;
    return INVESTMENTS_CONFIG.baseUpgradeCost + (level * INVESTMENTS_CONFIG.upgradeCostIncrement);
}

// Получить доход здания за интервал
function getBuildingIncome(level) {
    if (level === 0) return 0;
    return INVESTMENTS_CONFIG.baseIncome + (level - 1);
}

// Проверить, доступно ли здание для покупки
function isBuildingAvailable(buildingIndex) {
    if (buildingIndex === 0) return true; // Первое здание всегда доступно
    
    const data = getInvestmentsData();
    const prevBuilding = INVESTMENTS_CONFIG.buildings[buildingIndex - 1];
    const prevData = data[prevBuilding.id];
    
    if (!prevData || !prevData.purchased) return false;
    return prevData.level >= INVESTMENTS_CONFIG.unlockLevel;
}

// Получить название предыдущего здания для недоступных
function getRequiredBuildingName(buildingIndex) {
    if (buildingIndex === 0) return null;
    return INVESTMENTS_CONFIG.buildings[buildingIndex - 1].name;
}

// Покупка здания
function purchaseBuilding(buildingId) {
    const data = getInvestmentsData();
    const buildingIndex = INVESTMENTS_CONFIG.buildings.findIndex(b => b.id === buildingId);
    
    if (buildingIndex === -1) return false;
    
    const buildingData = data[buildingId] || { purchased: false, level: 0, lastIncomeTime: Date.now() };
    
    if (buildingData.purchased) return false; // Уже куплено
    
    if (!isBuildingAvailable(buildingIndex)) {
        alert(`Необходимо прокачать "${getRequiredBuildingName(buildingIndex)}" до ${INVESTMENTS_CONFIG.unlockLevel} уровня`);
        return false;
    }
    
    const cost = getBuildingPurchaseCost(buildingIndex);
    const currentRBC = typeof getCredits === 'function' ? getCredits() : parseInt(localStorage.getItem('credits') || '0');
    
    if (currentRBC < cost) {
        alert('Недостаточно RBC');
        return false;
    }
    
    // Списываем RBC
    if (typeof setCredits === 'function') {
        setCredits(currentRBC - cost);
    } else {
        localStorage.setItem('credits', (currentRBC - cost).toString());
        const rbcValue = document.getElementById('rbc-value');
        if (rbcValue) rbcValue.textContent = (currentRBC - cost).toString();
    }
    
    // Покупаем здание
    buildingData.purchased = true;
    buildingData.level = 1;
    buildingData.lastIncomeTime = Date.now();
    data[buildingId] = buildingData;
    saveInvestmentsData(data);
    
    updateInvestmentsUI();
    return true;
}

// Улучшение здания
function upgradeBuilding(buildingId) {
    const data = getInvestmentsData();
    const buildingData = data[buildingId];
    
    if (!buildingData || !buildingData.purchased) return false;
    if (buildingData.level >= INVESTMENTS_CONFIG.maxLevel) return false;
    
    const cost = getBuildingUpgradeCost(buildingData.level);
    const currentRBC = typeof getCredits === 'function' ? getCredits() : parseInt(localStorage.getItem('credits') || '0');
    
    if (currentRBC < cost) {
        alert('Недостаточно RBC');
        return false;
    }
    
    // Списываем RBC
    if (typeof setCredits === 'function') {
        setCredits(currentRBC - cost);
    } else {
        localStorage.setItem('credits', (currentRBC - cost).toString());
        const rbcValue = document.getElementById('rbc-value');
        if (rbcValue) rbcValue.textContent = (currentRBC - cost).toString();
    }
    
    // Улучшаем здание
    buildingData.level++;
    data[buildingId] = buildingData;
    saveInvestmentsData(data);
    
    updateInvestmentsUI();
    return true;
}

// Начисление дохода от всех зданий
function processInvestmentsIncome() {
    const data = getInvestmentsData();
    const currentTime = Date.now();
    let totalIncome = 0;
    
    INVESTMENTS_CONFIG.buildings.forEach(building => {
        const buildingData = data[building.id];
        if (!buildingData || !buildingData.purchased || buildingData.level === 0) return;
        
        const incomePerInterval = getBuildingIncome(buildingData.level);
        const timePassed = currentTime - (buildingData.lastIncomeTime || currentTime);
        const intervalsPassed = Math.floor(timePassed / INVESTMENTS_CONFIG.incomeInterval);
        
        if (intervalsPassed > 0) {
            const income = incomePerInterval * intervalsPassed;
            totalIncome += income;
            buildingData.lastIncomeTime = currentTime - (timePassed % INVESTMENTS_CONFIG.incomeInterval);
            data[building.id] = buildingData;
        }
    });
    
    if (totalIncome > 0) {
        saveInvestmentsData(data);
        
        // Добавляем доход к балансу
        if (typeof getBalance === 'function' && typeof setBalance === 'function') {
            const currentBalance = getBalance();
            setBalance(currentBalance + totalIncome);
        } else {
            const currentBalance = parseFloat(localStorage.getItem('balance') || '10000');
            const newBalance = currentBalance + totalIncome;
            localStorage.setItem('balance', newBalance);
            const moneyAmount = document.getElementById('money-amount');
            if (moneyAmount) {
                moneyAmount.textContent = typeof formatNumber === 'function' ? formatNumber(newBalance) : newBalance.toLocaleString();
            }
        }
    }
}

// Обновление UI панели инвестиций
function updateInvestmentsUI() {
    const panel = document.getElementById('bottom-banner-panel');
    if (!panel) return;
    
    // Обновляем только панель "Постройки"
    const buildingsContent = panel.querySelector('.banner-panel-content[data-tab-content="buildings"]');
    if (!buildingsContent || buildingsContent.style.display === 'none') return;
    
    const data = getInvestmentsData();
    
    INVESTMENTS_CONFIG.buildings.forEach((building, index) => {
        const buildingData = data[building.id] || { purchased: false, level: 0, lastIncomeTime: Date.now() };
        const item = buildingsContent.querySelector(`.banner-item[data-building-id="${building.id}"]`);
        if (!item) return;
        
        const icon = item.querySelector('.banner-item-icon');
        const levelValue = item.querySelector('.banner-stat-cell:first-child .banner-stat-value');
        const incomeValue = item.querySelector('.banner-stat-cell:last-child .banner-stat-value');
        const button = item.querySelector('.banner-buy-btn');
        const title = item.querySelector('.banner-item-title');
        
        // Обновляем стиль иконки
        if (icon) {
            if (!buildingData.purchased) {
                // Некупленное здание - ярко-серый
                icon.style.filter = 'brightness(0.5) grayscale(1)';
            } else if (!isBuildingAvailable(index)) {
                // Купленное, но недоступное (не должно быть такого случая)
                icon.style.filter = 'brightness(0.5) grayscale(1)';
            } else {
                // Купленное и доступное - нормальный цвет
                icon.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.6))';
            }
        }
        
        // Обновляем уровень
        if (levelValue) {
            levelValue.textContent = buildingData.purchased ? buildingData.level : '0';
        }
        
        // Обновляем доходность
        if (incomeValue) {
            const income = getBuildingIncome(buildingData.level);
            if (income > 0) {
                incomeValue.innerHTML = `${income}/5с <img src="assets/svg/money-icon.svg" style="width:11px;height:11px;vertical-align:middle;margin-left:2px;">`;
            } else {
                incomeValue.textContent = '0/5с';
            }
        }
        
        // Обновляем кнопку
        if (button) {
            if (!buildingData.purchased) {
                // Кнопка покупки
                const cost = getBuildingPurchaseCost(index);
                const currentRBC = typeof getCredits === 'function' ? getCredits() : parseInt(localStorage.getItem('credits') || '0');
                const canAfford = currentRBC >= cost;
                const isAvailable = isBuildingAvailable(index);
                
                if (!isAvailable) {
                    const requiredBuilding = getRequiredBuildingName(index);
                    button.textContent = `Необходимо "${requiredBuilding}" ${INVESTMENTS_CONFIG.unlockLevel} уровня`;
                    button.disabled = true;
                    button.style.opacity = '0.5';
                    button.style.cursor = 'not-allowed';
                } else {
                    button.innerHTML = `Купить ${cost} <img src="assets/svg/rbc-icon.svg" style="width:13px;height:13px;vertical-align:middle;margin-left:3px;">`;
                    button.disabled = !canAfford;
                    button.style.opacity = canAfford ? '1' : '0.5';
                    button.style.cursor = canAfford ? 'pointer' : 'not-allowed';
                }
            } else {
                // Кнопка улучшения
                if (buildingData.level >= INVESTMENTS_CONFIG.maxLevel) {
                    button.textContent = 'Макс. уровень';
                    button.disabled = true;
                    button.style.opacity = '0.5';
                    button.style.cursor = 'not-allowed';
                } else {
                    const cost = getBuildingUpgradeCost(buildingData.level);
                    const currentRBC = typeof getCredits === 'function' ? getCredits() : parseInt(localStorage.getItem('credits') || '0');
                    const canAfford = currentRBC >= cost;
                    
                    button.innerHTML = `Улучшить ${cost} <img src="assets/svg/rbc-icon.svg" style="width:13px;height:13px;vertical-align:middle;margin-left:3px;">`;
                    button.disabled = !canAfford;
                    button.style.opacity = canAfford ? '1' : '0.5';
                    button.style.cursor = canAfford ? 'pointer' : 'not-allowed';
                }
            }
        }
    });
}

// Инициализация обработчиков событий
function initInvestmentsEvents() {
    const panel = document.getElementById('bottom-banner-panel');
    if (!panel) return;
    
    // Получаем контейнер с постройками
    const buildingsContent = panel.querySelector('.banner-panel-content[data-tab-content="buildings"]');
    if (!buildingsContent) return;
    
    // Обработчики для кнопок зданий
    INVESTMENTS_CONFIG.buildings.forEach(building => {
        const item = buildingsContent.querySelector(`.banner-item[data-building-id="${building.id}"]`);
        if (!item) return;
        
        const button = item.querySelector('.banner-buy-btn');
        if (!button) return;
        
        button.addEventListener('click', () => {
            const data = getInvestmentsData();
            const buildingData = data[building.id] || { purchased: false, level: 0 };
            
            if (!buildingData.purchased) {
                purchaseBuilding(building.id);
            } else {
                upgradeBuilding(building.id);
            }
        });
    });
    
    // Обработчики для кнопок переключения вкладок
    const tabButtons = panel.querySelectorAll('.banner-tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.getAttribute('data-tab');
            switchInvestmentsTab(tab);
        });
    });
}

// Переключение вкладок
function switchInvestmentsTab(tabName) {
    const panel = document.getElementById('bottom-banner-panel');
    if (!panel) return;
    
    // Обновляем активную кнопку
    const tabButtons = panel.querySelectorAll('.banner-tab-btn');
    tabButtons.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Скрываем все панели контента
    const allContents = panel.querySelectorAll('.banner-panel-content');
    allContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // Показываем выбранную панель
    const selectedContent = panel.querySelector(`.banner-panel-content[data-tab-content="${tabName}"]`);
    if (selectedContent) {
        selectedContent.style.display = 'flex';
    }
    
    // Обновляем UI только для вкладки "Постройки"
    if (tabName === 'buildings') {
        updateInvestmentsUI();
    }
}

// Автоматическое обновление дохода
let investmentsIncomeInterval = null;

function startInvestmentsIncome() {
    if (investmentsIncomeInterval) return;
    
    investmentsIncomeInterval = setInterval(() => {
        processInvestmentsIncome();
    }, INVESTMENTS_CONFIG.incomeInterval);
}

function stopInvestmentsIncome() {
    if (investmentsIncomeInterval) {
        clearInterval(investmentsIncomeInterval);
        investmentsIncomeInterval = null;
    }
}

// Перехватываем setCredits для обновления UI
function setupCreditsInterceptor() {
    if (typeof window.setCredits === 'function' && !window.setCredits._investmentsWrapped) {
        const originalSetCredits = window.setCredits;
        window.setCredits = function(v) {
            originalSetCredits(v);
            // Обновляем UI инвестиций если панель открыта
            const panel = document.getElementById('bottom-banner-panel');
            if (panel && panel.style.display !== 'none') {
                updateInvestmentsUI();
            }
        };
        window.setCredits._investmentsWrapped = true;
    }
}

// Функция закрытия панели инвестиций
function closeInvestmentsPanel() {
    const panel = document.getElementById('bottom-banner-panel');
    if (!panel) return;
    
    // Используем существующую функцию hidePanelWithAnimation если доступна
    if (typeof hidePanelWithAnimation === 'function') {
        hidePanelWithAnimation('bottom-banner-panel');
    } else {
        panel.style.display = 'none';
    }
    
    // Скрываем кнопку "назад" в Telegram Mini App
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
        window.Telegram.WebApp.BackButton.hide();
    }
}

// Инициализация системы инвестиций
function setupInvestments() {
    initInvestments();
    initInvestmentsEvents();
    setupCreditsInterceptor();
    updateInvestmentsUI();
    startInvestmentsIncome();
    
    // Повторно пытаемся перехватить setCredits после загрузки всех скриптов
    setTimeout(setupCreditsInterceptor, 500);
    
    // Обновляем UI каждую секунду для актуальных данных
    setInterval(() => {
        const panel = document.getElementById('bottom-banner-panel');
        if (panel && panel.style.display !== 'none') {
            updateInvestmentsUI();
        }
    }, 1000);
    
    // Обновляем UI при открытии панели и настраиваем Telegram BackButton
    const panel = document.getElementById('bottom-banner-panel');
    if (panel) {
        const observer = new MutationObserver(() => {
            const isOpen = panel.style.display !== 'none';
            if (isOpen) {
                updateInvestmentsUI();
                
                // Показываем кнопку "назад" в Telegram Mini App
                if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
                    window.Telegram.WebApp.BackButton.show();
                    // Удаляем предыдущие обработчики и добавляем новый
                    window.Telegram.WebApp.BackButton.offClick(closeInvestmentsPanel);
                    window.Telegram.WebApp.BackButton.onClick(closeInvestmentsPanel);
                }
            } else {
                // Скрываем кнопку "назад" в Telegram Mini App
                if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
                    window.Telegram.WebApp.BackButton.hide();
                }
            }
        });
        observer.observe(panel, { attributes: true, attributeFilter: ['style'] });
        
        // Также обновляем при клике на кнопку открытия панели
        const bottomBanner = document.getElementById('bottom-banner');
        if (bottomBanner) {
            bottomBanner.addEventListener('click', () => {
                setTimeout(() => {
                    updateInvestmentsUI();
                    // Показываем кнопку "назад" в Telegram Mini App
                    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.BackButton) {
                        window.Telegram.WebApp.BackButton.show();
                        window.Telegram.WebApp.BackButton.offClick(closeInvestmentsPanel);
                        window.Telegram.WebApp.BackButton.onClick(closeInvestmentsPanel);
                    }
                }, 100);
            });
        }
    }
}

// Экспорт функций для глобального доступа
if (typeof window !== 'undefined') {
    window.investments = {
        purchaseBuilding,
        upgradeBuilding,
        updateInvestmentsUI,
        processInvestmentsIncome,
        getInvestmentsData,
        setupInvestments
    };
}

