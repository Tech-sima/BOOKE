// Система инвестиций - управление зданиями
const INVESTMENTS_CONFIG = {
    buildings: [
        // Дома
        { id: 'bloomie-house', name: "Bloomie's House", icon: "assets/svg/construction/Bloomie's-house.svg" },
        { id: 'cafe', name: 'Cozy Cafe', icon: 'assets/svg/construction/cafe.svg' },
        { id: 'forest-house', name: 'Forest House', icon: 'assets/svg/construction/forest-house.svg' },
        { id: 'mansion', name: "Founder's Mansion", icon: 'assets/svg/construction/mansion.svg' },
        { id: 'museum', name: 'Museum of Wonders', icon: 'assets/svg/construction/museum.svg' },
        { id: 'biologist-house', name: "Biologist's House", icon: "assets/svg/construction/The biologist's house.svg" },
        { id: 'blumi-estate', name: "Bloomie's Estate", icon: "assets/svg/construction/The blumi Estate.svg" },
        { id: 'fisherman-estate', name: "Fisherman's Estate", icon: "assets/svg/construction/The Fisherman's Estate.svg" },
        { id: 'house-of-traitors', name: "Founders' House", icon: "assets/svg/construction/The House of Traitors.svg" },
        { id: 'mountain-house', name: 'Mountain House', icon: 'assets/svg/construction/Mountain House.svg' },
        { id: 'high-tech-office', name: 'Tech Office', icon: 'assets/svg/construction/High-tech office.svg' },
        { id: 'skyscraper-finance', name: 'Finance Skyscraper', icon: 'assets/svg/construction/Skyscraper of Finance.svg' },
        { id: 'conqueror-castle', name: "Conqueror's Castle", icon: "assets/svg/construction/The Conqueror's Castle.svg" },
        { id: 'town-hall', name: 'Town Hall', icon: 'assets/svg/construction/The Town Hall.svg' },
        // Деревни
        { id: 'forest-village', name: 'Forest Village', icon: 'assets/svg/construction/Forest Village.svg' },
        { id: 'mountain-village', name: 'Mountain Village', icon: 'assets/svg/construction/Mountain-Village.svg' },
        { id: 'village-grinny', name: 'Grinny Village', icon: "assets/svg/construction/The village of Grinny.svg" },
        { id: 'village-technology', name: 'Technology Village', icon: 'assets/svg/construction/The Village of Technology.svg' },
        { id: 'village-technology-2', name: 'Tech Park', icon: 'assets/svg/construction/The-Village-of-Technology.svg' },
        // Города
        { id: 'high-tech-city', name: 'Technology City', icon: 'assets/svg/construction/A-high-tech-city.svg' },
        { id: 'kingdom', name: 'Kingdom of Books', icon: 'assets/svg/construction/Kingdom.svg' }
    ],
    transport: [
        { id: 'bmw-m8', name: 'BMW M8', icon: 'assets/svg/transport/BMW M8.svg' },
        { id: 'bugatti-tourbillon', name: 'Bugatti Tourbillon', icon: 'assets/svg/transport/Bugatti Tourbillon.svg' },
        { id: 'lamborghini-aventador', name: 'Lambo-Avent', icon: 'assets/svg/transport/Lamborghini Aventador.svg' },
        { id: 'mercedes-g-class', name: 'MB G-Class', icon: 'assets/svg/transport/Mercedes-Benz G-Class.svg' },
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
    jewelry: [
        { id: 'black-prince', name: 'Black Prince', icon: 'assets/svg/Jewelry/Black Prince.svg' },
        { id: 'the-secret-of-the-dragon', name: 'Oriental secrets', icon: 'assets/svg/Jewelry/The Secret of the Dragon.svg' },
        { id: 'golden-truth', name: 'Golden Truth', icon: 'assets/svg/Jewelry/Golden Truth.svg' },
        { id: 'bohemia-of-goodness', name: 'Bohemia of Goodness', icon: 'assets/svg/Jewelry/Bohemia of Goodness.svg' },
        { id: 'dark-elite', name: 'Dark Elite', icon: 'assets/svg/Jewelry/Dark Elite.svg' },
        { id: 'the-golden-ring', name: 'The golden ring', icon: 'assets/svg/Jewelry/The golden ring.svg' },
        { id: 'the-precious-ring', name: 'The precious Ring', icon: 'assets/svg/Jewelry/The precious Ring.svg' },
        { id: 'the-dragons-ring', name: "The Dragon's Ring", icon: "assets/svg/Jewelry/The Dragon's Ring.svg" },
        { id: 'the-cartier-ring', name: 'The Cartier Ring', icon: 'assets/svg/Jewelry/The Cartier Ring.svg' },
        { id: 'cartier-ultima', name: 'Cartier Ultima', icon: 'assets/svg/Jewelry/Cartier Ultima.svg' },
        { id: 'classic-watches', name: 'Classic watches', icon: 'assets/svg/Jewelry/Classic watches.svg' },
        { id: 'sapphire-watches', name: 'Sapphire Watches', icon: 'assets/svg/Jewelry/Sapphire Watches.svg' },
        { id: 'gold-watch', name: 'Gold Watch', icon: 'assets/svg/Jewelry/Gold Watch.svg' },
        { id: 'cartier-watches', name: 'Cartier watches', icon: 'assets/svg/Jewelry/Cartier watches.svg' },
        { id: 'breguet-grande', name: 'Breguet Grande', icon: 'assets/svg/Jewelry/Breguet Grande.svg' },
        { id: 'mona-lisa', name: 'Mona Lisa', icon: 'assets/svg/Jewelry/Mona Lisa.svg' },
        { id: 'athena', name: 'Athena', icon: 'assets/svg/Jewelry/Athena.svg' },
        { id: 'great-zeus', name: 'Great Zeus', icon: 'assets/svg/Jewelry/Great Zeus.svg' },
        { id: 'julius-caesar', name: 'Julius Caesar', icon: 'assets/svg/Jewelry/Julius Caesar.svg' },
        { id: 'heartbreaker', name: 'Heartbreaker', icon: 'assets/svg/Jewelry/Heartbreaker.svg' }
    ],
    // Конфигурация для транспорта
    transportBasePurchaseCost: 500, // Первый транспорт
    transportPurchaseCostIncrement: 250, // Увеличение стоимости каждого следующего
    transportBaseUpgradeCost: 400, // Базовая стоимость улучшения транспорта
    transportUpgradeCostIncrement: 150, // Увеличение стоимости улучшения за уровень
    transportBaseIncome: 1, // Доход на 1 уровне (алмазы)
    transportIncomeInterval: 60000, // Интервал начисления дохода (1 минута)
    // Конфигурация для драгоценностей (аналогично транспорту)
    jewelryBasePurchaseCost: 500, // Первая драгоценность
    jewelryPurchaseCostIncrement: 250, // Увеличение стоимости каждой следующей
    jewelryBaseUpgradeCost: 400, // Базовая стоимость улучшения драгоценностей
    jewelryUpgradeCostIncrement: 150, // Увеличение стоимости улучшения за уровень
    jewelryBaseIncome: 1, // Доход на 1 уровне (алмазы)
    jewelryIncomeInterval: 60000, // Интервал начисления дохода (1 минута)
    // Конфигурация для построек (аналогично транспорту и драгоценностям)
    buildingsBasePurchaseCost: 500, // Первое здание
    buildingsPurchaseCostIncrement: 250, // Увеличение стоимости каждого следующего
    buildingsBaseUpgradeCost: 400, // Базовая стоимость улучшения зданий
    buildingsUpgradeCostIncrement: 150, // Увеличение стоимости улучшения за уровень
    buildingsBaseIncome: 1, // Доход на 1 уровне (алмазы)
    buildingsIncomeInterval: 60000, // Интервал начисления дохода (1 минута)
    maxLevel: 100,
    unlockLevel: 5 // Уровень для разблокировки следующего здания
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
        INVESTMENTS_CONFIG.jewelry.forEach((item, index) => {
            defaultData[item.id] = {
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
    return INVESTMENTS_CONFIG.buildingsBasePurchaseCost + (buildingIndex * INVESTMENTS_CONFIG.buildingsPurchaseCostIncrement);
}

// Получить стоимость улучшения здания
function getBuildingUpgradeCost(level) {
    if (level >= INVESTMENTS_CONFIG.maxLevel) return Infinity;
    return INVESTMENTS_CONFIG.buildingsBaseUpgradeCost + (level * INVESTMENTS_CONFIG.buildingsUpgradeCostIncrement);
}

// Получить доход здания за интервал (алмазы)
function getBuildingIncome(level) {
    if (level === 0) return 0;
    return INVESTMENTS_CONFIG.buildingsBaseIncome + (level - 1);
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

// Получить стоимость покупки драгоценности
function getJewelryPurchaseCost(itemIndex) {
    return INVESTMENTS_CONFIG.jewelryBasePurchaseCost + (itemIndex * INVESTMENTS_CONFIG.jewelryPurchaseCostIncrement);
}

// Получить стоимость улучшения драгоценности
function getJewelryUpgradeCost(level) {
    if (level >= INVESTMENTS_CONFIG.maxLevel) return Infinity;
    return INVESTMENTS_CONFIG.jewelryBaseUpgradeCost + (level * INVESTMENTS_CONFIG.jewelryUpgradeCostIncrement);
}

// Получить доход драгоценности за интервал (алмазы)
function getJewelryIncome(level) {
    if (level === 0) return 0;
    return INVESTMENTS_CONFIG.jewelryBaseIncome + (level - 1);
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

// Проверить, доступна ли драгоценность для покупки
function isJewelryAvailable(itemIndex) {
    if (itemIndex === 0) return true; // Первая драгоценность всегда доступна
    
    const data = getInvestmentsData();
    const prevItem = INVESTMENTS_CONFIG.jewelry[itemIndex - 1];
    const prevData = data[prevItem.id];
    
    if (!prevData || !prevData.purchased) return false;
    return prevData.level >= INVESTMENTS_CONFIG.unlockLevel;
}

// Получить название предыдущей драгоценности для недоступных
function getRequiredJewelryName(itemIndex) {
    if (itemIndex === 0) return null;
    return INVESTMENTS_CONFIG.jewelry[itemIndex - 1].name;
}

// Покупка драгоценности
function purchaseJewelry(itemId) {
    const data = getInvestmentsData();
    const itemIndex = INVESTMENTS_CONFIG.jewelry.findIndex(j => j.id === itemId);
    
    if (itemIndex === -1) return false;
    
    const itemData = data[itemId] || { purchased: false, level: 0, lastIncomeTime: Date.now() };
    
    if (itemData.purchased) return false; // Уже куплено
    
    if (!isJewelryAvailable(itemIndex)) {
        alert(`Необходимо прокачать "${getRequiredJewelryName(itemIndex)}" до ${INVESTMENTS_CONFIG.unlockLevel} уровня`);
        return false;
    }
    
    const cost = getJewelryPurchaseCost(itemIndex);
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
    
    // Покупаем драгоценность
    itemData.purchased = true;
    itemData.level = 1;
    itemData.lastIncomeTime = Date.now();
    data[itemId] = itemData;
    saveInvestmentsData(data);
    
    updateInvestmentsUI();
    return true;
}

// Улучшение драгоценности
function upgradeJewelry(itemId) {
    const data = getInvestmentsData();
    const itemData = data[itemId];
    
    if (!itemData || !itemData.purchased) return false;
    if (itemData.level >= INVESTMENTS_CONFIG.maxLevel) return false;
    
    const cost = getJewelryUpgradeCost(itemData.level);
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
    
    // Улучшаем драгоценность
    itemData.level++;
    data[itemId] = itemData;
    saveInvestmentsData(data);
    
    updateInvestmentsUI();
    return true;
}

// Начисление дохода от всех зданий
function processInvestmentsIncome() {
    const data = getInvestmentsData();
    const currentTime = Date.now();
    
    // Обрабатываем доход от построек (алмазы)
    let totalDiamonds = 0;
    INVESTMENTS_CONFIG.buildings.forEach(building => {
        const buildingData = data[building.id];
        if (!buildingData || !buildingData.purchased || buildingData.level === 0) return;
        
        const incomePerInterval = getBuildingIncome(buildingData.level);
        const timePassed = currentTime - (buildingData.lastIncomeTime || currentTime);
        const intervalsPassed = Math.floor(timePassed / INVESTMENTS_CONFIG.buildingsIncomeInterval);
        
        if (intervalsPassed > 0) {
            const income = incomePerInterval * intervalsPassed;
            totalDiamonds += income;
            buildingData.lastIncomeTime = currentTime - (timePassed % INVESTMENTS_CONFIG.buildingsIncomeInterval);
            data[building.id] = buildingData;
        }
    });
    
    // Обрабатываем доход от транспорта (алмазы)
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
    
    // Обрабатываем доход от драгоценностей (алмазы)
    INVESTMENTS_CONFIG.jewelry.forEach(item => {
        const itemData = data[item.id];
        if (!itemData || !itemData.purchased || itemData.level === 0) return;
        
        const incomePerInterval = getJewelryIncome(itemData.level);
        const timePassed = currentTime - (itemData.lastIncomeTime || currentTime);
        const intervalsPassed = Math.floor(timePassed / INVESTMENTS_CONFIG.jewelryIncomeInterval);
        
        if (intervalsPassed > 0) {
            const income = incomePerInterval * intervalsPassed;
            totalDiamonds += income;
            itemData.lastIncomeTime = currentTime - (timePassed % INVESTMENTS_CONFIG.jewelryIncomeInterval);
            data[item.id] = itemData;
        }
    });
    
    if (totalDiamonds > 0) {
        saveInvestmentsData(data);
        
        // Добавляем алмазы от построек, транспорта и драгоценностей
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

// Обновление UI панели инвестиций
function updateInvestmentsUI() {
    const panel = document.getElementById('bottom-banner-panel');
    if (!panel) return;
    
    const data = getInvestmentsData();
    
    // Обновляем панель "Постройки"
    const buildingsContent = panel.querySelector('.banner-panel-content[data-tab-content="buildings"]');
    if (buildingsContent && buildingsContent.style.display !== 'none') {
    
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
                // Некупленное здание - светло-серый (ближе к белому)
                icon.style.filter = 'brightness(0.85) grayscale(1)';
            } else if (!isBuildingAvailable(index)) {
                // Купленное, но недоступное (не должно быть такого случая)
                icon.style.filter = 'brightness(0.85) grayscale(1)';
            } else {
                // Купленное и доступное - нормальный цвет
                icon.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.6))';
            }
        }
        
        // Обновляем уровень
        if (levelValue) {
            levelValue.textContent = buildingData.purchased ? buildingData.level : '0';
        }
        
        // Обновляем доходность (алмазы/1м)
        if (incomeValue) {
            const income = getBuildingIncome(buildingData.level);
            if (income > 0) {
                incomeValue.textContent = `${income}/1м`;
            } else {
                incomeValue.textContent = '0/1м';
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
                    icon.style.filter = 'brightness(0.85) grayscale(1)';
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
    
    // Обновляем панель "Предметы" (Драгоценности)
    const itemsContent = panel.querySelector('.banner-panel-content[data-tab-content="items"]');
    if (itemsContent && itemsContent.style.display !== 'none') {
        INVESTMENTS_CONFIG.jewelry.forEach((item, index) => {
            const itemData = data[item.id] || { purchased: false, level: 0, lastIncomeTime: Date.now() };
            const itemElement = itemsContent.querySelector(`.banner-item[data-jewelry-id="${item.id}"]`);
            if (!itemElement) return;
            
            const icon = itemElement.querySelector('.banner-item-icon');
            const levelValue = itemElement.querySelector('.banner-stat-cell:first-child .banner-stat-value');
            const incomeValue = itemElement.querySelector('.banner-stat-cell:last-child .banner-stat-value');
            const button = itemElement.querySelector('.banner-buy-btn');
            
            // Обновляем стиль иконки
            if (icon) {
                if (!itemData.purchased) {
                    icon.style.filter = 'brightness(0.85) grayscale(1)';
                } else {
                    icon.style.filter = 'drop-shadow(0 0 8px rgba(255,255,255,0.6))';
                }
            }
            
            // Обновляем уровень
            if (levelValue) {
                levelValue.textContent = itemData.purchased ? itemData.level : '0';
            }
            
            // Обновляем доходность (алмазы/1м)
            if (incomeValue) {
                const income = getJewelryIncome(itemData.level);
                if (income > 0) {
                    incomeValue.textContent = `${income}/1м`;
                } else {
                    incomeValue.textContent = '0/1м';
                }
            }
            
            // Обновляем кнопку
            if (button) {
                if (!itemData.purchased) {
                    // Кнопка покупки
                    const cost = getJewelryPurchaseCost(index);
                    const currentRBC = typeof getCredits === 'function' ? getCredits() : parseInt(localStorage.getItem('credits') || '0');
                    const canAfford = currentRBC >= cost;
                    const isAvailable = isJewelryAvailable(index);
                    
                    if (!isAvailable) {
                        const requiredItem = getRequiredJewelryName(index);
                        button.textContent = `Необходимо "${requiredItem}" ${INVESTMENTS_CONFIG.unlockLevel} уровня`;
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
                    if (itemData.level >= INVESTMENTS_CONFIG.maxLevel) {
                        button.textContent = 'Макс. уровень';
                        button.disabled = true;
                        button.style.opacity = '0.5';
                        button.style.cursor = 'not-allowed';
                    } else {
                        const cost = getJewelryUpgradeCost(itemData.level);
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
    
    // Получаем контейнер с драгоценностями
    const itemsContent = panel.querySelector('.banner-panel-content[data-tab-content="items"]');
    if (itemsContent) {
        // Обработчики для кнопок драгоценностей
        INVESTMENTS_CONFIG.jewelry.forEach(item => {
            const itemElement = itemsContent.querySelector(`.banner-item[data-jewelry-id="${item.id}"]`);
            if (!itemElement) return;
            
            const button = itemElement.querySelector('.banner-buy-btn');
            if (!button) return;
            
            button.addEventListener('click', () => {
                const data = getInvestmentsData();
                const itemData = data[item.id] || { purchased: false, level: 0 };
                
                if (!itemData.purchased) {
                    purchaseJewelry(item.id);
                } else {
                    upgradeJewelry(item.id);
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
    
    // Обновляем заголовок в зависимости от выбранной секции
    const titleElement = panel.querySelector('.banner-panel-title');
    if (titleElement) {
        if (tabName === 'buildings') {
            titleElement.textContent = 'REAL ESTATE INVESTMENTS';
        } else if (tabName === 'transport') {
            titleElement.textContent = 'TRANSPORT RENTAL';
        } else if (tabName === 'items') {
            titleElement.textContent = 'INVESTING IN JEWELRY';
        } else {
            titleElement.textContent = 'СТРАТЕГИЯ ПРИБЫЛИ';
        }
    }
    
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
    if (tabName === 'buildings' || tabName === 'transport' || tabName === 'items') {
        updateInvestmentsUI();
    }
}

// Автоматическое обновление дохода
let investmentsIncomeInterval = null;

function startInvestmentsIncome() {
    if (investmentsIncomeInterval) return;
    
    investmentsIncomeInterval = setInterval(() => {
        processInvestmentsIncome();
    }, INVESTMENTS_CONFIG.buildingsIncomeInterval);
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
    if (typeof hidePanelWithAnimation === 'function') {
        hidePanelWithAnimation('bottom-banner-panel');
    } else {
        const panel = document.getElementById('bottom-banner-panel');
        if (panel) {
            panel.style.display = 'none';
        }
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
        // Используем MutationObserver для отслеживания открытия/закрытия панели
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
        
        // Обновляем при клике на кнопку открытия панели
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

