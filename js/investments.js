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
    transport: [
        { id: 'bmw-m8', name: 'BMW M8', icon: 'assets/svg/transport/BMW M8.svg' },
        { id: 'bugatti-tourbillon', name: 'Bugatti Tourbillon', icon: 'assets/svg/transport/Bugatti Tourbillon.svg' },
        { id: 'lamborghini-aventador', name: 'Lamborghini Aventador', icon: 'assets/svg/transport/Lamborghini Aventador.svg' },
        { id: 'mercedes-g-class', name: 'Mercedes-Benz G-Class', icon: 'assets/svg/transport/Mercedes-Benz G-Class.svg' },
        { id: 'rolls-royce-cullinan', name: 'Rolls-Royce Cullinan', icon: 'assets/svg/transport/Rolls-Royce Cullinan.svg' },
        { id: 'bentley-continental', name: 'Bentley Continental', icon: 'assets/svg/transport/Bentley Continental.svg' },
        { id: 'koenigsegg-gemera', name: 'Koenigsegg Gemera', icon: 'assets/svg/transport/Koenigsegg Gemera.svg' },
        { id: 'mercedes-maybach', name: 'Mercedes-Maybach', icon: 'assets/svg/transport/Mercedes-Maybach.svg' },
        { id: 'rolls-royce-phantom', name: 'Rolls-Royce Phantom', icon: 'assets/svg/transport/Rolls-Royce Phantom.svg' },
        { id: 'formula-one', name: 'Formula 1', icon: 'assets/svg/transport/Formula One car.svg' },
        { id: 'buldog', name: 'Buldog', icon: 'assets/svg/transport/Buldog.svg' },
        { id: 'ah-64', name: 'AH-64', icon: 'assets/svg/transport/AH-64.svg' },
        { id: 'bell-206b-jet-ranger', name: 'Bell 206B Jet Ranger', icon: 'assets/svg/transport/Bell 206B Jet Ranger.svg' },
        { id: 'airbus', name: 'Airbus', icon: 'assets/svg/transport/Airbus.svg' },
        { id: 'cheny', name: 'Cheny', icon: 'assets/svg/transport/Cheny.svg' },
        { id: 'embraer-legacy', name: 'Embraer Legacy', icon: 'assets/svg/transport/Embraer Legacy.svg' },
        { id: 'go-fast-boat', name: 'Go-fast-boat', icon: 'assets/svg/transport/Go-fast-boat.svg' },
        { id: 'star-flyer', name: 'Star Flyer', icon: 'assets/svg/transport/Star Flyer.svg' },
        { id: 'ocean-victory', name: 'Ocean Victory', icon: 'assets/svg/transport/Ocean Victory.svg' },
        { id: 'harmony-of-the-seas', name: 'Harmony of the Seas', icon: 'assets/svg/transport/Harmony of the Seas.svg' }
    ],
    // Конфигурация для транспорта
    transportBasePurchaseCost: 500, // Первый транспорт
    transportPurchaseCostIncrement: 250, // Увеличение стоимости каждого следующего
    transportBaseUpgradeCost: 400, // Базовая стоимость улучшения транспорта
    transportUpgradeCostIncrement: 150, // Увеличение стоимости улучшения за уровень
    transportBaseIncome: 1, // Доход на 1 уровне (алмазы)
    transportIncomeInterval: 60000, // Интервал начисления дохода (1 минута)
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
        INVESTMENTS_CONFIG.transport.forEach((vehicle, index) => {
            defaultData[vehicle.id] = {
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

// Получить стоимость покупки транспорта
function getTransportPurchaseCost(vehicleIndex) {
    return INVESTMENTS_CONFIG.transportBasePurchaseCost + (vehicleIndex * INVESTMENTS_CONFIG.transportPurchaseCostIncrement);
}

// Получить стоимость улучшения транспорта
function getTransportUpgradeCost(level) {
    if (level >= INVESTMENTS_CONFIG.maxLevel) return Infinity;
    return INVESTMENTS_CONFIG.transportBaseUpgradeCost + (level * INVESTMENTS_CONFIG.transportUpgradeCostIncrement);
}

// Получить доход транспорта за интервал (алмазы)
function getTransportIncome(level) {
    if (level === 0) return 0;
    return INVESTMENTS_CONFIG.transportBaseIncome + (level - 1);
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

// Проверить, доступен ли транспорт для покупки
function isTransportAvailable(vehicleIndex) {
    if (vehicleIndex === 0) return true; // Первый транспорт всегда доступен
    
    const data = getInvestmentsData();
    const prevVehicle = INVESTMENTS_CONFIG.transport[vehicleIndex - 1];
    const prevData = data[prevVehicle.id];
    
    if (!prevData || !prevData.purchased) return false;
    return prevData.level >= INVESTMENTS_CONFIG.unlockLevel;
}

// Получить название предыдущего транспорта для недоступных
function getRequiredTransportName(vehicleIndex) {
    if (vehicleIndex === 0) return null;
    return INVESTMENTS_CONFIG.transport[vehicleIndex - 1].name;
}

// Покупка транспорта
function purchaseTransport(vehicleId) {
    const data = getInvestmentsData();
    const vehicleIndex = INVESTMENTS_CONFIG.transport.findIndex(v => v.id === vehicleId);
    
    if (vehicleIndex === -1) return false;
    
    const vehicleData = data[vehicleId] || { purchased: false, level: 0, lastIncomeTime: Date.now() };
    
    if (vehicleData.purchased) return false; // Уже куплено
    
    if (!isTransportAvailable(vehicleIndex)) {
        alert(`Необходимо прокачать "${getRequiredTransportName(vehicleIndex)}" до ${INVESTMENTS_CONFIG.unlockLevel} уровня`);
        return false;
    }
    
    const cost = getTransportPurchaseCost(vehicleIndex);
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
    
    // Покупаем транспорт
    vehicleData.purchased = true;
    vehicleData.level = 1;
    vehicleData.lastIncomeTime = Date.now();
    data[vehicleId] = vehicleData;
    saveInvestmentsData(data);
    
    updateInvestmentsUI();
    return true;
}

// Улучшение транспорта
function upgradeTransport(vehicleId) {
    const data = getInvestmentsData();
    const vehicleData = data[vehicleId];
    
    if (!vehicleData || !vehicleData.purchased) return false;
    if (vehicleData.level >= INVESTMENTS_CONFIG.maxLevel) return false;
    
    const cost = getTransportUpgradeCost(vehicleData.level);
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
    
    // Улучшаем транспорт
    vehicleData.level++;
    data[vehicleId] = vehicleData;
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
    
    // Обрабатываем доход от транспорта (алмазы)
    let totalDiamonds = 0;
    INVESTMENTS_CONFIG.transport.forEach(vehicle => {
        const vehicleData = data[vehicle.id];
        if (!vehicleData || !vehicleData.purchased || vehicleData.level === 0) return;
        
        const incomePerInterval = getTransportIncome(vehicleData.level);
        const timePassed = currentTime - (vehicleData.lastIncomeTime || currentTime);
        const intervalsPassed = Math.floor(timePassed / INVESTMENTS_CONFIG.transportIncomeInterval);
        
        if (intervalsPassed > 0) {
            const income = incomePerInterval * intervalsPassed;
            totalDiamonds += income;
            vehicleData.lastIncomeTime = currentTime - (timePassed % INVESTMENTS_CONFIG.transportIncomeInterval);
            data[vehicle.id] = vehicleData;
        }
    });
    
    if (totalIncome > 0) {
        saveInvestmentsData(data);
        
        // Добавляем доход к балансу (деньги от зданий)
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
    
    if (totalDiamonds > 0) {
        saveInvestmentsData(data);
        
        // Добавляем алмазы от транспорта
        if (typeof getCredits === 'function' && typeof setCredits === 'function') {
            const currentCredits = getCredits();
            setCredits(currentCredits + totalDiamonds);
        } else {
            const currentCredits = parseInt(localStorage.getItem('credits') || '0');
            const newCredits = currentCredits + totalDiamonds;
            localStorage.setItem('credits', newCredits.toString());
            const creditsAmount = document.getElementById('credits-amount');
            if (creditsAmount) {
                creditsAmount.textContent = typeof formatNumber === 'function' ? formatNumber(newCredits) : newCredits.toLocaleString();
            }
        }
    }
}

// Получить общую прибыль от всех построек
function getTotalBuildingsProfit() {
    const data = getInvestmentsData();
    let totalProfit = 0;
    
    INVESTMENTS_CONFIG.buildings.forEach(building => {
        const buildingData = data[building.id] || { purchased: false, level: 0 };
        if (buildingData.purchased && buildingData.level > 0) {
            totalProfit += getBuildingIncome(buildingData.level);
        }
    });
    
    return totalProfit;
}

// Получить общую прибыль от всего транспорта (алмазы)
function getTotalTransportProfit() {
    const data = getInvestmentsData();
    let totalProfit = 0;
    
    INVESTMENTS_CONFIG.transport.forEach(vehicle => {
        const vehicleData = data[vehicle.id] || { purchased: false, level: 0 };
        if (vehicleData.purchased && vehicleData.level > 0) {
            totalProfit += getTransportIncome(vehicleData.level);
        }
    });
    
    return totalProfit;
}

// Обновление UI панели инвестиций
function updateInvestmentsUI() {
    const panel = document.getElementById('bottom-banner-panel');
    if (!panel) return;
    
    const data = getInvestmentsData();
    
    // Обновляем панель "Постройки"
    const buildingsContent = panel.querySelector('.banner-panel-content[data-tab-content="buildings"]');
    if (buildingsContent && buildingsContent.style.display !== 'none') {
    
    // Обновляем овальную ячейку с общей прибылью
    const totalProfitCell = buildingsContent.querySelector('.banner-total-profit-cell');
    if (totalProfitCell) {
        const totalProfitValue = totalProfitCell.querySelector('.banner-total-profit-value');
        if (totalProfitValue) {
            const totalProfit = getTotalBuildingsProfit();
            totalProfitValue.textContent = `${totalProfit}/5с`;
        }
    }
    
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
                incomeValue.textContent = `${income}/5с`;
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
    
    // Обновляем панель "Транспорт"
    const transportContent = panel.querySelector('.banner-panel-content[data-tab-content="transport"]');
    if (transportContent && transportContent.style.display !== 'none') {
        // Обновляем овальную ячейку с общей прибылью транспорта
        const totalProfitCell = transportContent.querySelector('.banner-total-profit-cell');
        if (totalProfitCell) {
            const totalProfitValue = totalProfitCell.querySelector('.banner-total-profit-value');
            if (totalProfitValue) {
                const totalProfit = getTotalTransportProfit();
                totalProfitValue.textContent = `${totalProfit}/1м`;
            }
        }
        
        INVESTMENTS_CONFIG.transport.forEach((vehicle, index) => {
            const vehicleData = data[vehicle.id] || { purchased: false, level: 0, lastIncomeTime: Date.now() };
            const item = transportContent.querySelector(`.banner-item[data-vehicle-id="${vehicle.id}"]`);
            if (!item) return;
            
            const icon = item.querySelector('.banner-item-icon');
            const levelValue = item.querySelector('.banner-stat-cell:first-child .banner-stat-value');
            const incomeValue = item.querySelector('.banner-stat-cell:last-child .banner-stat-value');
            const button = item.querySelector('.banner-buy-btn');
            
            // Обновляем стиль иконки
            if (icon) {
                if (!vehicleData.purchased) {
                    icon.style.filter = 'brightness(0.5) grayscale(1)';
                } else {
                    icon.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.6))';
                }
            }
            
            // Обновляем уровень
            if (levelValue) {
                levelValue.textContent = vehicleData.purchased ? vehicleData.level : '0';
            }
            
            // Обновляем доходность (алмазы/1м)
            if (incomeValue) {
                const income = getTransportIncome(vehicleData.level);
                if (income > 0) {
                    incomeValue.textContent = `${income}/1м`;
                } else {
                    incomeValue.textContent = '0/1м';
                }
            }
            
            // Обновляем кнопку
            if (button) {
                if (!vehicleData.purchased) {
                    // Кнопка покупки
                    const cost = getTransportPurchaseCost(index);
                    const currentRBC = typeof getCredits === 'function' ? getCredits() : parseInt(localStorage.getItem('credits') || '0');
                    const canAfford = currentRBC >= cost;
                    const isAvailable = isTransportAvailable(index);
                    
                    if (!isAvailable) {
                        const requiredVehicle = getRequiredTransportName(index);
                        button.textContent = `Необходимо "${requiredVehicle}" ${INVESTMENTS_CONFIG.unlockLevel} уровня`;
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
                    if (vehicleData.level >= INVESTMENTS_CONFIG.maxLevel) {
                        button.textContent = 'Макс. уровень';
                        button.disabled = true;
                        button.style.opacity = '0.5';
                        button.style.cursor = 'not-allowed';
                    } else {
                        const cost = getTransportUpgradeCost(vehicleData.level);
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
    
    // Получаем контейнер с транспортом
    const transportContent = panel.querySelector('.banner-panel-content[data-tab-content="transport"]');
    if (transportContent) {
        // Обработчики для кнопок транспорта
        INVESTMENTS_CONFIG.transport.forEach(vehicle => {
            const item = transportContent.querySelector(`.banner-item[data-vehicle-id="${vehicle.id}"]`);
            if (!item) return;
            
            const button = item.querySelector('.banner-buy-btn');
            if (!button) return;
            
            button.addEventListener('click', () => {
                const data = getInvestmentsData();
                const vehicleData = data[vehicle.id] || { purchased: false, level: 0 };
                
                if (!vehicleData.purchased) {
                    purchaseTransport(vehicle.id);
                } else {
                    upgradeTransport(vehicle.id);
                }
            });
        });
    }
    
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
    
    // Обновляем UI для активной вкладки
    if (tabName === 'buildings' || tabName === 'transport') {
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

