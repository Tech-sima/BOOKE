// === TELEGRAM MINI APP INTEGRATION ===
let telegramUser = null;
let isTelegramApp = false;

// Проверяем, запущено ли приложение в Telegram
function checkTelegramApp() {
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            isTelegramApp = true;
            return true;
        }
    } catch (e) {
    }
    return false;
}

// Получаем данные пользователя из Telegram
function getTelegramUser() {
    if (!isTelegramApp) return null;
    
    try {
        const webApp = window.Telegram.WebApp;
        if (webApp.initDataUnsafe && webApp.initDataUnsafe.user) {
            telegramUser = webApp.initDataUnsafe.user;
            return telegramUser;
        }
    } catch (e) {
        console.error('Error getting Telegram user data:', e);
    }
    return null;
}

// Адаптируем UI под Telegram Mini App
function adaptUIForTelegram() {
    if (!isTelegramApp) return;
    
    
    // Добавляем класс для CSS стилей
    document.body.classList.add('telegram-mini-app');
    
    // Получаем размеры экрана
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Определяем отступы для Telegram Mini App в зависимости от размера экрана
    let telegramTopOffset = 0;
    
    if (screenWidth <= 360) {
        // Очень маленькие экраны (старые телефоны)
        telegramTopOffset = 75; // Увеличен с 60 до 75
    } else if (screenWidth <= 480) {
        // Маленькие экраны
        telegramTopOffset = 85; // Увеличен с 70 до 85
    } else if (screenWidth <= 768) {
        // Планшеты в портретной ориентации
        telegramTopOffset = 95; // Увеличен с 80 до 95
    } else {
        // Десктоп или планшет в альбомной ориентации
        telegramTopOffset = 0;
    }
    
    // Применяем стили к панелям (как fallback, если CSS не сработает)
    const infoPanel = document.getElementById('info-panel');
    const sideBar = document.querySelector('.side-bar');
    const newsCorner = document.querySelector('.news-corner');
    const appHeader = document.querySelector('.app-header');
    const addMoneyBtn = document.getElementById('add-money-test');
    
    if (infoPanel) {
        infoPanel.style.top = `${5 + telegramTopOffset}px`;
    }
    
    if (sideBar) {
        sideBar.style.marginTop = `${80 + telegramTopOffset}px`;
        // Для Telegram Mini App позиционируем правую панель по центру справа
        sideBar.style.right = '8px';
        sideBar.style.left = 'auto';
    }
    
    if (newsCorner) {
        newsCorner.style.top = `${10 + telegramTopOffset}px`;
    }
    
    if (appHeader) {
        appHeader.style.height = `${96 + telegramTopOffset}px`;
        appHeader.style.paddingTop = `${12 + telegramTopOffset}px`;
    }
    
    if (addMoneyBtn) {
        addMoneyBtn.style.top = `${35 + telegramTopOffset}px`;

    }
    
    // Обновляем CSS переменную для header
    document.documentElement.style.setProperty('--header-h', `${96 + telegramTopOffset}px`);
    
    // Обновляем margin для canvas
    const canvas = document.getElementById('three-canvas');
    if (canvas) {
        canvas.style.marginTop = `${96 + telegramTopOffset}px`;
    }
    
    // Обновляем адаптивные стили для правой панели
    updateResponsiveStyles(telegramTopOffset);
    
    // Обновляем панель здания для Telegram Mini App
    updateBuildingPanelForTelegram(telegramTopOffset);
    
    // Обновляем динамические панели зданий для Telegram Mini App
    updateDynamicBuildingPanelsForTelegram(telegramTopOffset);
    
    // Включаем глубокую прокрутку для Telegram Mini App
    enableDeepScrollForTelegram();
    
    // Исправляем позиционирование индикаторов зданий для Telegram Mini App
    fixBuildingIndicatorsForTelegram(telegramTopOffset);
    

}

// Обновляем адаптивные стили для правой панели
function updateResponsiveStyles(telegramOffset) {
    const sideBar = document.querySelector('.side-bar');
    if (!sideBar) return;
    
    const screenWidth = window.innerWidth;
    let baseMargin = 80;
    
    if (screenWidth <= 360) {
        baseMargin = 60;
    } else if (screenWidth <= 480) {
        baseMargin = 70;
    } else if (screenWidth <= 768) {
        baseMargin = 80;
    }
    
    sideBar.style.marginTop = `${baseMargin + telegramOffset}px`;
    // Для Telegram Mini App позиционируем правую панель по центру справа
    sideBar.style.right = '8px';
    sideBar.style.left = 'auto';
}

// Обновляем панель здания для Telegram Mini App
function updateBuildingPanelForTelegram(telegramOffset) {
    const buildingPanel = document.getElementById('building-info-panel');
    if (!buildingPanel) return;
    
    const screenWidth = window.innerWidth;
    let baseBottom = 60; // Базовый отступ снизу
    
    if (screenWidth <= 360) {
        baseBottom = 40;
    } else if (screenWidth <= 480) {
        baseBottom = 45;
    } else if (screenWidth <= 768) {
        baseBottom = 60;
    }
    
    // Добавляем отступ для Telegram Mini App
    const newBottom = baseBottom + telegramOffset;
    buildingPanel.style.bottom = `${newBottom}px`;
    

}

// Обновляем динамические панели зданий для Telegram Mini App
function updateDynamicBuildingPanelsForTelegram(telegramOffset) {
    const screenWidth = window.innerWidth;
    let maxHeight = '75vh'; // Базовая высота
    
    if (screenWidth <= 360) {
        maxHeight = '45vh'; // Еще больше уменьшаем для маленьких экранов в Telegram
    } else if (screenWidth <= 480) {
        maxHeight = '50vh';
    } else if (screenWidth <= 768) {
        maxHeight = '55vh';
    } else {
        maxHeight = '60vh';
    }
    
    // Обновляем все динамические панели зданий
    const buildingPanelContainers = document.querySelectorAll('.building-panel-container');
    buildingPanelContainers.forEach(container => {
        container.style.maxHeight = maxHeight;
        // Минимальный padding снизу для прокрутки без лишнего пустого пространства
        container.style.paddingBottom = '20px';

    });
}

// Функция для глубокой прокрутки в Telegram Mini App
function enableDeepScrollForTelegram() {
    if (!isTelegramApp) return;
    

    
    // Добавляем стили для лучшей прокрутки
    const style = document.createElement('style');
    style.textContent = `
        .telegram-mini-app .building-panel-container {
            scroll-behavior: smooth !important;
            -webkit-overflow-scrolling: touch !important;
            overscroll-behavior: contain !important;
        }
        
        .telegram-mini-app .building-panel-container::-webkit-scrollbar {
            width: 12px !important;
        }
        
        .telegram-mini-app .building-panel-container::-webkit-scrollbar-track {
            background: rgba(255,255,255,0.1) !important;
            border-radius: 6px !important;
        }
        
        .telegram-mini-app .building-panel-container::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.4) !important;
            border-radius: 6px !important;
            border: 2px solid rgba(0,0,0,0.1) !important;
        }
        
        .telegram-mini-app .building-panel-container::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.6) !important;
        }
        
        /* Минимальный отступ снизу для контента */
        .telegram-mini-app .building-panel-container > div {
            padding-bottom: 30px !important;
        }
    `;
    document.head.appendChild(style);
    
    // Принудительно обновляем все панели
    setTimeout(() => {
        updateDynamicBuildingPanelsForTelegram(70);
    }, 100);
}

// Исправляем позиционирование индикаторов зданий для Telegram Mini App
function fixBuildingIndicatorsForTelegram(telegramOffset) {
    if (!isTelegramApp) return;
    

    
    // Получаем все индикаторы прибыли
    const indicators = document.querySelectorAll('.profit-indicator');
    
    indicators.forEach(indicator => {
        // Принудительно устанавливаем position: fixed
        indicator.style.position = 'fixed';
        
        // Получаем текущие координаты
        const rect = indicator.getBoundingClientRect();
        
        // Корректируем позицию с учетом Telegram offset
        const currentTop = rect.top;
        const currentLeft = rect.left;
        
        // Применяем корректировку только если индикатор находится в верхней части экрана
        if (currentTop < 100) { // Если индикатор в верхней части
            indicator.style.top = `${currentTop + telegramOffset}px`;

        }
    });
}

// Обновляем профиль с данными из Telegram
function updateProfileWithTelegram() {
    if (!telegramUser) return;
    
    // Обновляем аватарку
    const avatarImg = document.getElementById('profile-avatar-img');
    const avatarFallback = document.getElementById('profile-avatar-fallback');
    
    if (avatarImg && telegramUser.photo_url) {
        avatarImg.src = telegramUser.photo_url;
        avatarImg.style.display = 'block';
        avatarFallback.style.display = 'none';
    }
    
    // Обновляем ник
    const nickname = document.getElementById('profile-nickname');
    let profileName = '';
    if (telegramUser.username) {
        profileName = `@${telegramUser.username}`;
    } else if (telegramUser.first_name) {
        profileName = telegramUser.first_name;
        if (telegramUser.last_name) {
            profileName += ` ${telegramUser.last_name}`;
        }
    }
    if (nickname && profileName) {
        nickname.textContent = profileName;
    }
    if (profileName) {
        const storedName = localStorage.getItem('profile.username');
        if (storedName !== profileName) {
            localStorage.setItem('profile.username', profileName);
        }
    }
}

// Обработчик ошибки загрузки аватарки
function handleAvatarError() {
    const avatarImg = document.getElementById('profile-avatar-img');
    const avatarFallback = document.getElementById('profile-avatar-fallback');
    
    if (avatarImg && avatarFallback) {
        avatarImg.style.display = 'none';
        avatarFallback.style.display = 'flex';
    }
}

// Основные переменные
let scene, camera, renderer;
let raycaster, pointer = new THREE.Vector2();

// Функция для простого всплывающего уведомления
function showToast(message, duration = 2000) {
    // Создаем элемент уведомления
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #4caf50;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    toast.textContent = message;
    
    // Добавляем в DOM
    document.body.appendChild(toast);
    
    // Показываем
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 10);
    
    // Скрываем через duration
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

// Данные для заданий
const socialTasks = [
    {
        title: 'Исследовать TG miniAP',
        description: 'Изучите возможности Telegram Mini App',
        reward: '10k',
        progress: 1,
        target: 1
    },
    {
        title: 'Присоединиться к Pismakov Path',
        description: 'Станьте частью сообщества разработчиков',
        reward: '100k',
        progress: 0,
        target: 1
    },
    {
        title: 'Присоединиться к BOOKE Path',
        description: 'Присоединитесь к официальному пути BOOKE',
        reward: '100k',
        progress: 0,
        target: 1
    }
];

const bookeTasks = [
    {
        title: 'Подписаться на BOOKE',
        description: 'Подпишитесь на официальный канал BOOKE',
        reward: '50k',
        progress: 0,
        target: 1
    },
    {
        title: 'Поделиться достижением',
        description: 'Поделитесь своим прогрессом в социальных сетях',
        reward: '25k',
        progress: 0,
        target: 1
    }
];

// placeholders to избежать ReferenceError до их создания позже
let factoryProgressDiv, factoryBankDiv;

// === ПЕРЕМЕННЫЕ ПЛАТФОРМ УДАЛЕНЫ ===
// Переменные платформ больше не нужны, так как используется новое главное меню с PNG

// GLOBAL ORDERS ARRAY (delivery)
let orders=[];

// Данные инвентаря удалены - панель инвентаря больше не используется

// Функция renderInventoryItems удалена - панель инвентаря больше не используется

// Функция setActiveInventoryTab удалена - панель инвентаря больше не используется

// Функции openInventory и closeInventory удалены - панель инвентаря больше не используется



// Инициализация сцены
// Флаг для отслеживания инициализации сцены
let sceneInitialized = false;

function init() {
    // Предотвращаем повторную инициализацию сцены
    if (sceneInitialized) {

        return;
    }
    // Создаем сцену
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xd0d0d0);

    // Настраиваем камеру
    const aspect = window.innerWidth / window.innerHeight;
    const orthoSize = 8; // увеличиваем для лучшего обзора
    camera = new THREE.OrthographicCamera(
        -orthoSize * aspect,
        orthoSize * aspect,
        orthoSize,
        -orthoSize,
        0.1,
        1000
    );
    // Камера под углом 45 градусов к плоскости платформ
    camera.position.set(10, 10, 0);
    camera.lookAt(0, 0, 0); // смотрим в центр

    // Создаем рендерер
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.domElement.style.zIndex = '5'; // Canvas под сеткой, но над другими элементами
    document.body.appendChild(renderer.domElement);

    // Отключаем управление камерой для фиксированного вида
    // cameraControllerInit();
    
    // Добавляем освещение
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(10, 20, 10);
    scene.add(dir);

    // === ПЛАТФОРМЫ КАРТЫ УДАЛЕНЫ ===
    // Платформы больше не создаются, так как используется новое главное меню с PNG

    // === ФУНКЦИИ АНИМАЦИИ ПЛАТФОРМ УДАЛЕНЫ ===
    // Анимации платформ больше не нужны, так как используется новое главное меню с PNG

    // расширяем фрустум под карту
    function adjustFrustum(){
        const a = window.innerWidth / window.innerHeight;
        const view=12; // увеличиваем для лучшего обзора
        camera.top = view;
        camera.bottom = -view;
        camera.left = -view * a;
        camera.right = view * a;
        camera.updateProjectionMatrix();
    }
    adjustFrustum();

    // === ФУНКЦИИ РАБОТЫ С ПЛАТФОРМАМИ УДАЛЕНЫ ===
    // Функции highlightPlatform и showAllPlatforms больше не нужны
    
    // === RAYCASTER И ОБРАБОТЧИК КЛИКОВ УДАЛЕНЫ ===
    // Raycaster больше не нужен, так как используется новое главное меню с PNG

    // Обработчик изменения размера окна
    window.addEventListener('resize', onWindowResize, false);

    // После добавления объектов – центрируем камеру
    // fitCameraToScene();
    
    // Инициализируем Telegram Mini App
    checkTelegramApp();
    if (isTelegramApp) {
        getTelegramUser();
        updateProfileWithTelegram();
        adaptUIForTelegram();
        initTelegramBotHandler();
    }
    
    sceneInitialized = true;

}

// === CAMERA CONTROLLER (drag + zoom) ===
let isDragging = false, lastPos = { x: 0, y: 0 };
let zoom = 5, minZoom = 1, maxZoom = 5;

function cameraControllerInit() {
    // Отключаем управление камерой для фиксированного вида как на макете
    // window.addEventListener('pointerdown', (e) => { isDragging = true; lastPos.x = e.clientX; lastPos.y = e.clientY; });
    // window.addEventListener('pointermove', (e) => {
    //     if (!isDragging) return;
    //     const dx = (e.clientX - lastPos.x) * 0.08; // чувствительность *5
    //     const dy = (e.clientY - lastPos.y) * 0.1;
    //     lastPos.x = e.clientX;
    //     lastPos.y = e.clientY;

    //     // направления камеры в мировой системе
    //     const right = new THREE.Vector3(1,0,0).applyQuaternion(camera.quaternion).setY(0).normalize();
    //     const forward = new THREE.Vector3(0,0,-1).applyQuaternion(camera.quaternion).setY(0).normalize();

    //     camera.position.addScaledVector(right, -dx);
    //     camera.position.addScaledVector(forward, dy);
    //     camera.updateMatrixWorld();
    //     clampCamera();
    // });
    // window.addEventListener('pointerup', () => { isDragging = false; });

    // window.addEventListener('wheel', (e) => {
    //     zoom += e.deltaY * 0.001;
    //     zoom = THREE.MathUtils.clamp(zoom, minZoom, maxZoom);
    //     camera.zoom = 5 / zoom;
    //     camera.updateProjectionMatrix();
    // }, { passive: true });
}

function clampCamera() { /* ограничения временно отключены */ }

// === CLICK HANDLING ===
function isAnyPanelOpen() {
    const panels = [
        'shop-panel',
        'characters-panel', 
        'city-panel',
        'tasks-panel',
        'profile-panel',
        'friends-panel',
        'bottom-banner-panel',

        'game-tasks-panel',
        'statistics-panel',
        'settings-panel',
        'building-panel'
    ];
    
    return panels.some(panelId => {
        const panel = document.getElementById(panelId);
        return panel && panel.style.display !== 'none';
    });
}

// === ОБРАБОТЧИК КЛИКОВ ПО ПЛАТФОРМАМ УДАЛЕН ===
// Клики по платформам больше не обрабатываются, так как используется новое главное меню с PNG

// === PANEL LOGIC ===
const panel = document.getElementById('upgrade-panel');
const closeBtn = document.getElementById('panel-close');
closeBtn.addEventListener('click', () => {
    panel.style.display = 'none';
    // Анимация платформ больше не нужна
});

// позиционируем панель по центру через CSS
panel.style.left = '50%';
panel.style.top = '50%';
panel.style.transform = 'translate(-50%, -50%)';

function openUpgradePanel() {
    panel.style.display = 'block';
}

// Обработчик изменения размера окна
// Флаг для отслеживания изменения размера окна
let resizeInProgress = false;

function onWindowResize() {
    // Предотвращаем множественные вызовы изменения размера
    if (resizeInProgress) {
        return;
    }
    resizeInProgress = true;
    const aspect = window.innerWidth / window.innerHeight;
    const orthoSize = 1;
    camera.left = -orthoSize * aspect;
    camera.right = orthoSize * aspect;
    camera.top = orthoSize;
    camera.bottom = -orthoSize;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    adjustFrustum(); // обновляем фрустум при ресайзе
    
    // Адаптируем UI для Telegram при изменении размера
    if (isTelegramApp) {
        adaptUIForTelegram();
    }
    
    // Позиционируем круги после изменения размера окна
    setTimeout(initializeCirclePositions, 100);
    
    // Сбрасываем флаг изменения размера
    setTimeout(() => {
        resizeInProgress = false;
    }, 100);
}

// === INCOME & UPGRADE LOGIC ===
let upgradesCount = parseInt(localStorage.getItem('upCnt')||'0');
let intermediateBalance = parseFloat(localStorage.getItem('interBal')||'0');
const costBase = 100;
const rateGrowth = 1.15;
const productionBase = 19.87;

// HTML элементы для круга
const incomeProgress = document.createElement('div');
incomeProgress.id = 'income-progress';
incomeProgress.style.cssText = 'position:absolute;width:70px;height:70px;border-radius:50%;background:conic-gradient(#4caf50 0deg, transparent 0deg);pointer-events:none;z-index:1;visibility:hidden;';
document.body.appendChild(incomeProgress);

// внутренний круг, чтобы оставалась только обводка
const incomeInner=document.createElement('div');
incomeInner.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:50%;background:#2b2b2b;pointer-events:none;';
incomeProgress.appendChild(incomeInner);

const incomeBank = document.createElement('div');
incomeBank.id = 'income-bank';
incomeBank.style.cssText = 'position:absolute;width:70px;height:70px;border-radius:50%;background:#8d0000;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;z-index:1;cursor:pointer;';
document.body.appendChild(incomeBank);

// Функция для начального позиционирования кругов
function initializeCirclePositions() {
    // Проверяем, открыта ли панель bottom-banner
    const isBottomBannerOpen = (document.getElementById('bottom-banner-panel') && document.getElementById('bottom-banner-panel').style.display !== 'none');
    
    // Позиционируем кружки над библиотекой (только если панель не открыта)
    if (!isBottomBannerOpen) {
        const cube = scene.getObjectByName('library');
        if(cube){
            // позиция вершины куба (верхний центр)
            const topWorld = cube.position.clone();
            const halfH = (cube.geometry.parameters.height * cube.scale.y) / 2;
            topWorld.y += halfH;
            topWorld.project(camera);
            const sx = ( topWorld.x * 0.5 + 0.5) * window.innerWidth;
            const sy = ( -topWorld.y * 0.5 + 0.5) * window.innerHeight;
            if (incomeProgress) {
                incomeProgress.style.left = (sx-35)+'px'; // ширина 70 => радиус 35
                incomeProgress.style.top  = (sy-85)+'px'; // подняли на 50px выше
            }
            if (incomeBank) {
                incomeBank.style.left = (sx-35)+'px';
                incomeBank.style.top  = (sy-160)+'px'; // ещё выше над прогрессом
            }
        }
    } else {
        // Скрываем круги когда панель открыта
        if (incomeProgress) incomeProgress.style.visibility = 'hidden';
        if (incomeBank) incomeBank.style.visibility = 'hidden';
    }

    // Позиционируем кружки над заводом (только если не на главной карте и панель не открыта)
    if (!isBottomBannerOpen) {
        const mapContainer = document.getElementById('map-container');
        const isOnMainMenu = mapContainer && mapContainer.style.display !== 'none';
        
        if (!isOnMainMenu) {
            const factoryObjRef = scene.getObjectByName('factory');
            if(factoryObjRef && factoryProgressDiv && factoryBankDiv){
                const top2=factoryObjRef.position.clone();
                const halfH2=(factoryObjRef.geometry.parameters.height*factoryObjRef.scale.y)/2;
                top2.y+=halfH2;
                top2.project(camera);
                let sx2=(top2.x*0.5+0.5)*window.innerWidth;
                let sy2=(-top2.y*0.5+0.5)*window.innerHeight;

                factoryProgressDiv.style.left=(sx2-35)+'px';
                factoryProgressDiv.style.top =(sy2-85)+'px';
                factoryBankDiv.style.left=(sx2-35)+'px';
                factoryBankDiv.style.top =(sy2-160)+'px';
            }
        } else {
            // На главной карте скрываем 3D круги завода
            if(factoryProgressDiv && factoryBankDiv){
                factoryProgressDiv.style.display='none';
                factoryBankDiv.style.display='none';
            }
        }
    } else {
        // Скрываем круги завода когда панель открыта
        if (factoryProgressDiv) factoryProgressDiv.style.visibility = 'hidden';
        if (factoryBankDiv) factoryBankDiv.style.visibility = 'hidden';
    }

    // Позиционируем кружок над хранилищем
    const storObj = scene.getObjectByName('storage');
    if(storObj && storageProgressDiv && storageProgressDiv.style.display!=='none'){
        const top3=storObj.position.clone();
        const halfH3=(storObj.geometry.parameters.height*storObj.scale.y)/2;
        top3.y+=halfH3;
        top3.project(camera);
        const sx3=(top3.x*0.5+0.5)*window.innerWidth;
        const sy3=(-top3.y*0.5+0.5)*window.innerHeight;
        storageProgressDiv.style.left=(sx3-35)+'px';
        storageProgressDiv.style.top =(sy3-85)+'px';
    }
}

// === STORAGE SALE PROGRESS CIRCLE ===
const storageProgressDiv=document.createElement('div');
storageProgressDiv.id='storage-sale-progress';
storageProgressDiv.style.cssText='position:absolute;width:70px;height:70px;border-radius:50%;background:conic-gradient(#4caf50 0deg, transparent 0deg);display:none;pointer-events:none;z-index:1;visibility:hidden;';
document.body.appendChild(storageProgressDiv);
const storageInner=document.createElement('div');
storageInner.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:50%;background:#2b2b2b;pointer-events:none;';
storageProgressDiv.appendChild(storageInner);

incomeBank.addEventListener('click', () => {
    const newBal = getBalance()+intermediateBalance;
    setBalance(newBal);
    intermediateBalance = 0;
    window.intermediateBalance = 0; // обновляем глобальную переменную
    incomeBank.textContent = formatNumber(intermediateBalance);
    refreshUpgradeCost();
});

function formatNumber(value){
    const units=['','K','M','B','T'];
    const alphabetStart='a'.charCodeAt(0);
    if(value<0) return '-'+formatNumber(Math.abs(value));
    if(value<1) return value.toFixed(2);
    if(value<1000) return Math.floor(value).toString();

    const n=Math.floor(Math.log(value)/Math.log(1000));
    const m=value/Math.pow(1000,n);

    let unit='';
    if(n<units.length){
        unit=units[n];
    }else{
        const unitInt=n-units.length;
        const first=Math.floor(unitInt/26);
        const second=unitInt%26;
        unit=String.fromCharCode(alphabetStart+first)+String.fromCharCode(alphabetStart+second);
    }
    return (Math.floor(m*100)/100).toFixed(2).replace(/\.00$/,'').replace(/(\.\d)0$/,'$1')+unit;
}

function getIncomePerSecond(){
    if(upgradesCount===0) return 0;
    return productionBase * Math.pow(1.05, upgradesCount);
}

function getNextUpgradeCost(){
    return costBase * Math.pow(rateGrowth, upgradesCount);
}

// Прогресс анимация
let progress = 0;
setInterval(()=>{
    progress += 1;
    if(progress>=60){
        progress = 0;
        // начисляем доход
        const inc = getIncomePerSecond();
        intermediateBalance += inc;
        window.intermediateBalance = intermediateBalance; // обновляем глобальную переменную
        incomeBank.textContent = formatNumber(intermediateBalance);
    }
},1000/60);

function updateProgressVisual(){
    // всегда показываем; при 0-уровне просто не заполняем ободок
    incomeProgress.style.visibility='visible';
    const deg = upgradesCount===0 ? 0 : progress * 6; // 60fps => 360deg
    incomeProgress.style.background = `conic-gradient(#4caf50 ${deg}deg, transparent ${deg}deg)`;
}

// BALANCE helpers + persistence
function getBalance(){return parseFloat(localStorage.getItem('balance')||'10000');}
function setBalance(v){
    const oldBalance = getBalance();
    localStorage.setItem('balance',v);
    const moneyAmount = document.getElementById('money-amount');
    const bcValue = document.getElementById('bc-value');
    
    // Отслеживание изменений баланса в PostHog
    if (window.posthogService && window.posthogService.isReady()) {
        const diff = v - oldBalance;
        if (diff > 0) {
            window.posthogService.trackEarned(diff, 'money', 'game_action');
        } else if (diff < 0) {
            window.posthogService.trackSpent(Math.abs(diff), 'money', 'game_action');
        }
    }
    if(moneyAmount) {
        moneyAmount.textContent=formatNumber(v);
        moneyAmount.dataset.val=v;
    }
    if(bcValue) {
        bcValue.textContent=formatNumber(v);
    }

    // Обновляем статистику если панель открыта
    if(window.refreshStatistics) {
        window.refreshStatistics();
    }
    
    // Проверяем выполнение заданий связанных с деньгами
    if(window.onMoneyEarned) {
        window.onMoneyEarned(v);
    }
}

// init balance from storage
setBalance(getBalance());

// Switch x1 / MAX
const switchWrapper = document.createElement('div');
switchWrapper.style.cssText='display:flex;gap:2px;margin-top:6px;';
panel.querySelector('#panel-content').appendChild(switchWrapper);

const btnX1 = document.createElement('button');
btnX1.textContent='x1';
btnX1.style.cssText='flex:1;background:#1976d2;border:none;color:#fff;border-radius:6px 0 0 6px;height:32px;cursor:pointer;font-weight:bold;';
const btnMax = document.createElement('button');
btnMax.textContent='MAX';
btnMax.style.cssText='flex:1;background:#000;border:none;color:#fff;border-radius:0 16px 16px 0;height:32px;cursor:pointer;font-weight:bold;';
switchWrapper.append(btnX1,btnMax);

let isMaxMode=false;
function updateSwitch(){
    if(isMaxMode){
        btnX1.style.background='#000';
        btnX1.style.opacity=0.4;
        btnMax.style.background='#1976d2';
        btnMax.style.opacity=1;
    }else{
        btnX1.style.background='#1976d2';
        btnX1.style.opacity=1;
        btnMax.style.background='#000';
        btnMax.style.opacity=0.4;
    }
}
btnX1.onclick=()=>{isMaxMode=false;updateSwitch();refreshUpgradeCost();};
btnMax.onclick=()=>{isMaxMode=true;updateSwitch();refreshUpgradeCost();};
updateSwitch();

// Upgrade button logic
const upgradeBtn = document.getElementById('upgrade-btn');
const levelLabel=document.getElementById('building-level');
const incomeLabel=document.getElementById('building-income');

function updateLevelAndIncome(){
    levelLabel.textContent=upgradesCount;
    incomeLabel.textContent=formatNumber(getIncomePerSecond());
}
updateLevelAndIncome();

function calcMaxAffordableCost(){
    let balance=getBalance();
    let tempUp=upgradesCount;
    let total=0;
    while(true){
        const c= costBase*Math.pow(rateGrowth,tempUp);
        if(balance>=c){total+=c;balance-=c;tempUp++;}
        else break;
    }
    return total>0?total:getNextUpgradeCost();
}

function refreshUpgradeCost(){
    const cost=isMaxMode?calcMaxAffordableCost():getNextUpgradeCost();
    upgradeBtn.querySelector('#upgrade-cost').textContent=formatNumber(cost);
    const afford=getBalance()>=cost;
    upgradeBtn.disabled=!afford;
    upgradeBtn.style.opacity=afford?1:0.5;
}

upgradeBtn.addEventListener('click',()=>{
    const startLvl=upgradesCount;
    let balance=getBalance();
    if(isMaxMode){
        while(balance>=getNextUpgradeCost()){
            const c=getNextUpgradeCost();
            balance-=c;
            upgradesCount++;
        }
    }else{
        const cost=getNextUpgradeCost();
        if(balance>=cost){
            balance-=cost;
            upgradesCount++;
        }
    }
    if(upgradesCount>startLvl){
        setBalance(balance);
        refreshUpgradeCost();
        updateLevelAndIncome();
        // XP суммой от (startLvl+1) до upgradesCount
        const n=upgradesCount-startLvl;
        const sumXP=(startLvl+1+upgradesCount)*n/2;
        addXP(sumXP);
        
        // Обновляем статистику если панель открыта
        if(window.refreshStatistics) {
            window.refreshStatistics();
        }
    }
});

// LOAD saved upgradesCount
refreshUpgradeCost();
updateLevelAndIncome();

// save on change
function saveProgress(){localStorage.setItem('upCnt',upgradesCount);localStorage.setItem('interBal',intermediateBalance);}

setInterval(saveProgress,1000);

// === ANIMATE ===
// Флаг для отслеживания состояния анимации
let animationRunning = false;

function animate() {
    // Предотвращаем повторный запуск анимации
    if (animationRunning) {
        return;
    }
    animationRunning = true;
    
    requestAnimationFrame(animate);
    updateProgressVisual();

    // Проверяем, открыты ли панели магазина, персонажей, города, заданий, профиля, друзей, настроек, статистики или телефона (используем глобальные переменные или DOM)
    const isShopOpen = window.isShopPanelOpen || (document.getElementById('shop-panel') && document.getElementById('shop-panel').style.display !== 'none');
    const isCharactersOpen = window.isCharactersPanelOpen || (document.getElementById('characters-panel') && document.getElementById('characters-panel').style.display !== 'none');
    const isCityOpen = window.isCityPanelOpen || (document.getElementById('city-panel') && document.getElementById('city-panel').style.display !== 'none');
    const isTasksOpen = (document.getElementById('tasks-panel') && document.getElementById('tasks-panel').style.display !== 'none');
    const isGameTasksOpen = (document.getElementById('game-tasks-panel') && document.getElementById('game-tasks-panel').style.display !== 'none');
    const isProfileOpen = window.isProfilePanelOpen || (document.getElementById('profile-panel') && document.getElementById('profile-panel').style.display !== 'none');
    const isFriendsOpen = window.isFriendsPanelOpen || (document.getElementById('friends-panel') && document.getElementById('friends-panel').style.display !== 'none');
    const isSettingsOpen = window.isSettingsPanelOpen || (document.getElementById('settings-panel') && document.getElementById('settings-panel').style.display !== 'none');
    const isStatisticsOpen = window.isStatisticsPanelOpen || (document.getElementById('statistics-panel') && document.getElementById('statistics-panel').style.display !== 'none');
    const isPhoneOpen = window.isPhonePanelOpen || (document.getElementById('phone-panel') && document.getElementById('phone-panel').style.display !== 'none');
    const isBottomBannerOpen = (document.getElementById('bottom-banner-panel') && document.getElementById('bottom-banner-panel').style.display !== 'none');
    
    // Если любая из панелей открыта, скрываем индикаторы прибыли
    if ((isShopOpen || isCharactersOpen || isCityOpen || isTasksOpen || isGameTasksOpen || isProfileOpen || isFriendsOpen || isSettingsOpen || isStatisticsOpen || isPhoneOpen) && window.hideProfitIndicators) {
        window.hideProfitIndicators();
        // Принудительно очищаем все индикаторы прибыли
        if (window.clearAllProfitIndicators) {
            window.clearAllProfitIndicators();
        }
    }

    // позиционируем кружки над кубом (только если панель bottom-banner не открыта)
    if (!isBottomBannerOpen) {
        const cube = scene.getObjectByName('library');
        if(cube){
            // позиция вершины куба (верхний центр)
            const topWorld = cube.position.clone();
            const halfH = (cube.geometry.parameters.height * cube.scale.y) / 2;
            topWorld.y += halfH;
            topWorld.project(camera);
            const sx = ( topWorld.x * 0.5 + 0.5) * window.innerWidth;
            const sy = ( -topWorld.y * 0.5 + 0.5) * window.innerHeight;
            if (incomeProgress) {
                incomeProgress.style.left = (sx-35)+'px'; // ширина 70 => радиус 35
                incomeProgress.style.top  = (sy-85)+'px'; // подняли на 50px выше
                incomeProgress.style.visibility = incomeProgress.style.visibility === 'hidden' ? '' : incomeProgress.style.visibility;
            }
            if (incomeBank) {
                incomeBank.style.left = (sx-35)+'px';
                incomeBank.style.top  = (sy-160)+'px'; // ещё выше над прогрессом
                incomeBank.style.visibility = incomeBank.style.visibility === 'hidden' ? '' : incomeBank.style.visibility;
            }
        }
    } else {
        // Скрываем круги когда панель открыта
        if (incomeProgress) incomeProgress.style.visibility = 'hidden';
        if (incomeBank) incomeBank.style.visibility = 'hidden';
    }

    // позиционируем кружки над заводом (только если не на главной карте и панель не открыта)
    if (!isBottomBannerOpen) {
        const mapContainer = document.getElementById('map-container');
        const isOnMainMenu = mapContainer && mapContainer.style.display !== 'none';
        
        if (!isOnMainMenu) {
            const factoryObjRef = scene.getObjectByName('factory');
            if(factoryObjRef && factoryProgressDiv && factoryBankDiv){
                const top2=factoryObjRef.position.clone();
                const halfH2=(factoryObjRef.geometry.parameters.height*factoryObjRef.scale.y)/2;
                top2.y+=halfH2;
                top2.project(camera);
                let sx2=(top2.x*0.5+0.5)*window.innerWidth;
                let sy2=(-top2.y*0.5+0.5)*window.innerHeight;

                factoryProgressDiv.style.left=(sx2-35)+'px';
                factoryProgressDiv.style.top =(sy2-85)+'px';
                factoryBankDiv.style.left=(sx2-35)+'px';
                factoryBankDiv.style.top =(sy2-160)+'px';
                // Показываем круги если они были скрыты
                factoryProgressDiv.style.visibility = factoryProgressDiv.style.visibility === 'hidden' ? '' : factoryProgressDiv.style.visibility;
                factoryBankDiv.style.visibility = factoryBankDiv.style.visibility === 'hidden' ? '' : factoryBankDiv.style.visibility;
            }
        } else {
            // На главной карте скрываем 3D круги завода
            if(factoryProgressDiv && factoryBankDiv){
                factoryProgressDiv.style.display='none';
                factoryBankDiv.style.display='none';
            }
        }
    } else {
        // Скрываем круги завода когда панель открыта
        if (factoryProgressDiv) factoryProgressDiv.style.visibility = 'hidden';
        if (factoryBankDiv) factoryBankDiv.style.visibility = 'hidden';
    }

    // позиционируем кружок над хранилищем
    const storObj = scene.getObjectByName('storage');
    if(storObj && storageProgressDiv && storageProgressDiv.style.display!=='none'){
        const top3=storObj.position.clone();
        const halfH3=(storObj.geometry.parameters.height*storObj.scale.y)/2;
        top3.y+=halfH3;
        top3.project(camera);
        const sx3=(top3.x*0.5+0.5)*window.innerWidth;
        const sy3=(-top3.y*0.5+0.5)*window.innerHeight;
        storageProgressDiv.style.left=(sx3-35)+'px';
        storageProgressDiv.style.top =(sy3-85)+'px';
        if(selling){
            const elapsed=Date.now()-saleStartTime;
            let deg=0;
            if(saleDelayMs>0){deg=Math.min(360,(elapsed/saleDelayMs)*360);} 
            storageProgressDiv.style.background=`conic-gradient(#4caf50 ${deg}deg, transparent ${deg}deg)`;
        }
    }

    renderer.render(scene, camera);
    
    // Сбрасываем флаг анимации для следующего кадра
    animationRunning = false;
}

// Центрирует ортографическую камеру так, чтобы вся сцена влезла в кадр
function fitCameraToScene() {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Ставим камеру по диагонали сверху (45°) и чуть выше
    const offset = maxDim * 1.2;
    // заменяем авто-подгон: фиксированная камера сверху
    camera.position.set(0,20,0);
    camera.lookAt(0,0,0);

    // Автоподбор zoom для ортокамеры
    const aspect = window.innerWidth / window.innerHeight;
    const frustumHeight = maxDim * 1.5;
    const frustumWidth = frustumHeight * aspect;

    camera.top = frustumHeight / 2;
    camera.bottom = -frustumHeight / 2;
    camera.left = -frustumWidth / 2;
    camera.right = frustumWidth / 2;
    camera.updateProjectionMatrix();
}

// === PLACEHOLDER UI FOR FACTORY CIRCLES (needed before animate starts)
factoryProgressDiv=document.createElement('div');
factoryProgressDiv.id='factory-income-progress';
factoryProgressDiv.style.cssText='position:absolute;width:70px;height:70px;border-radius:50%;background:conic-gradient(#2196f3 0deg, transparent 0deg);display:none;pointer-events:none;z-index:1;visibility:hidden;';
document.body.appendChild(factoryProgressDiv);
factoryBankDiv=document.createElement('div');
factoryBankDiv.id='factory-income-bank';
factoryBankDiv.style.cssText='position:absolute;width:70px;height:70px;border-radius:50%;background:#004ba0;display:none;align-items:center;justify-content:center;color:#fff;font-weight:bold;z-index:1;cursor:pointer;';
document.body.appendChild(factoryBankDiv);
// Запуск игры откладываем до нажатия "Начать"
function startGame(){
    try{
        init();
        if(!animationRunning){
            animate();
        }
        // Позиционируем круги сразу после запуска игры
        setTimeout(initializeCirclePositions, 200);
        
        // Предзагружаем изображения панели города при запуске игры
        try {
            preloadCharacterImages();
        } catch (error) {
            console.error('Error during city panel images preloading:', error);
        }
        
        // Предзагружаем изображения магазина при запуске игры
        try {
            preloadShopImages();
        } catch (error) {
            console.error('Error during shop images preloading:', error);
        }
    }catch(e){
        console.error('Error starting game:', e);
    }
}

if (window.GameLoader && typeof window.GameLoader === 'object') {
    window.GameLoader.onStart = () => startGame();
} else {
    // Fallback: если лоадера нет, запускаем сразу
    startGame();
}

// ������������� ������� ��� �������� ����
renderTasks();
// credits plus click demo
safeAddEventListener('credits-plus', 'click', () => {
    alert('Открыть магазин кредитов');
}); 


// Удаляем старый обработчик кнопки магазина (дублирует новый)
safeAddEventListener('shop-close', 'click', () => {
    hidePanelWithAnimation('shop-panel', () => {
        // Сбрасываем активное состояние в главном меню
        if (window.mainMenu && typeof window.mainMenu.resetActiveSection === 'function') {
            window.mainMenu.resetActiveSection();
        }
    });
}); 

// credits helpers
function getCredits(){return parseInt(localStorage.getItem('credits')||'0');}
function setCredits(v){
    const oldCredits = getCredits();
    localStorage.setItem('credits',v);
    const creditsAmount = document.getElementById('credits-amount');
    const rbcValue = document.getElementById('rbc-value');
    
    // Отслеживание изменений кредитов в PostHog
    if (window.posthogService && window.posthogService.isReady()) {
        const diff = v - oldCredits;
        if (diff > 0) {
            window.posthogService.trackEarned(diff, 'credits', 'game_action');
        } else if (diff < 0) {
            window.posthogService.trackSpent(Math.abs(diff), 'credits', 'game_action');
        }
    }
    if(creditsAmount) {
        creditsAmount.textContent=formatNumber(v);
    }
    if(rbcValue) {
        rbcValue.textContent=formatNumber(v);
    }
}

// init credits display
setCredits(getCredits());

// === CRATES LOGIC ===
const crates={
    free :{cost:0,   lvlReq:4, money:[50,120],  credits:[0,0]},
    gold :{cost:30,  lvlReq:0, money:[400,800], credits:[2,5]},
    mystic:{cost:150,lvlReq:0, money:[1500,3000],credits:[8,15]},
    legendary:{cost:500,lvlReq:0, money:[5000,10000],credits:[25,50]},
    divine:{cost:1000,lvlReq:0, money:[15000,30000],credits:[75,150]}
};

function randRange(arr){const [min,max]=arr;return Math.floor(Math.random()*(max-min+1))+min;}

function openCrate(type){
    const cfg=crates[type];
    if(!cfg) return;
    if(cfg.lvlReq>0 && upgradesCount<cfg.lvlReq){alert(`Требуется уровень ${cfg.lvlReq}`);return;}
    if(cfg.cost>0 && getCredits()<cfg.cost){alert('Недостаточно RBC');return;}

    // списываем стоимость
    if(cfg.cost>0){setCredits(getCredits()-cfg.cost);}

    const moneyReward=randRange(cfg.money);
    const creditReward=randRange(cfg.credits);

    setBalance(getBalance()+moneyReward);
    if(creditReward>0) setCredits(getCredits()+creditReward);
    // award XP
    addXP(10);

    // Показываем новую панель наград
    showRewardPanel('safes', {
        money: moneyReward,
        credits: creditReward,
        xp: 10
    });
}

function showPurchaseNotification(title, rewards, itemType = 'safes') {
    const overlay = document.getElementById('crate-overlay');
    
    // Определяем иконку в зависимости от типа товара
    let iconSrc = 'assets/svg/money-icon.svg';
    let bgColor = '#2d6a4f';
    let borderColor = '#1b4332';
    
    switch(itemType) {
        case 'safes':
            iconSrc = 'assets/svg/safes/safe-common.svg';
            bgColor = '#424242';
            borderColor = '#2d2d2d';
            break;
        case 'coins':
            iconSrc = 'assets/svg/chests/chest-1.svg';
            bgColor = '#b8860b';
            borderColor = '#8b6914';
            break;
        case 'sets':
            iconSrc = 'assets/svg/characters/character-1.svg';
            bgColor = '#8e24aa';
            borderColor = '#6a1b9a';
            break;
        default:
            iconSrc = 'assets/svg/money-icon.svg';
            bgColor = '#2d6a4f';
            borderColor = '#1b4332';
    }
    
    // Создаем HTML для наград
    let rewardsHTML = '';
    if (rewards.money) {
        rewardsHTML += `<div style="display:flex;align-items:center;gap:8px;margin:8px 0;padding:8px 12px;background:rgba(255,255,255,0.1);border-radius:8px;border:1px solid rgba(255,255,255,0.2);">
            <div style="width:24px;height:24px;background:#ccc;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666;">PNG</div>
            <span style="font-size:18px;font-weight:600;color:#fff;">+${formatNumber(rewards.money)}$</span>
        </div>`;
    }
    if (rewards.credits) {
        rewardsHTML += `<div style="display:flex;align-items:center;gap:8px;margin:8px 0;padding:8px 12px;background:rgba(255,255,255,0.1);border-radius:8px;border:1px solid rgba(255,255,255,0.2);">
            <div style="width:24px;height:24px;background:#ccc;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666;">PNG</div>
            <span style="font-size:18px;font-weight:600;color:#fff;">+${rewards.credits}</span>
        </div>`;
    }
    if (rewards.xp) {
        rewardsHTML += `<div style="display:flex;align-items:center;gap:8px;margin:8px 0;padding:8px 12px;background:rgba(255,255,255,0.1);border-radius:8px;border:1px solid rgba(255,255,255,0.2);">
            <div style="width:24px;height:24px;background:#ccc;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666;">PNG</div>
            <span style="font-size:18px;font-weight:600;color:#fff;">+${rewards.xp} XP</span>
        </div>`;
    }
    
    overlay.innerHTML = `
        <div style="
            background: linear-gradient(135deg, ${bgColor} 0%, ${borderColor} 100%);
            padding: 24px 28px;
            border-radius: 16px;
            text-align: center;
            animation: purchasePop 0.5s ease-out;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            border: 2px solid rgba(255,255,255,0.1);
            max-width: 320px;
            width: 90%;
            position: relative;
            overflow: hidden;
        ">
            <!-- Декоративные элементы -->
            <div style="position:absolute;top:-20px;right:-20px;width:60px;height:60px;background:rgba(255,255,255,0.1);border-radius:50%;"></div>
            <div style="position:absolute;bottom:-30px;left:-30px;width:80px;height:80px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
            
            <!-- Иконка -->
            <div style="width:64px;height:64px;background:#ccc;border-radius:12px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
                PNG-image
            </div>
            
            <!-- Заголовок -->
            <h3 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,0.3);">
                ${title}
            </h3>
            
            <!-- Награды -->
            <div style="margin-bottom:24px;">
                ${rewardsHTML}
            </div>
            
            <!-- Кнопка -->
            <button id="purchase-ok" style="
                background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
                border: none;
                border-radius: 12px;
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                padding: 12px 32px;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 4px 12px rgba(76,175,80,0.3);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 16px rgba(76,175,80,0.4)'" 
               onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(76,175,80,0.3)'">
                Отлично!
            </button>
        </div>
    `;
    
    overlay.style.display = 'flex';
    overlay.querySelector('#purchase-ok').onclick = () => {
        overlay.style.display = 'none';
    };
}

// Обновляем функцию showCrateOverlay для использования новой системы (обратная совместимость)
function showCrateOverlay(money, credits) {
    showPurchaseNotification('Сейф открыт!', {
        money: money,
        credits: credits,
        xp: 10
    }, 'safes');
}

// Добавляем CSS анимацию для нового уведомления
const stylePurchasePop = document.createElement('style');
stylePurchasePop.textContent = `
@keyframes purchasePop {
    0% {
        transform: scale(0.3) rotate(-10deg);
        opacity: 0;
    }
    50% {
        transform: scale(1.05) rotate(2deg);
    }
    100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
}
`;
document.head.appendChild(stylePurchasePop);

// Удаляем старый обработчик кнопки города (дублирует новый)
safeAddEventListener('city-close', 'click', () => {
    hidePanelWithAnimation('city-panel', () => {
    setActiveNavButton(0); // сбрасываем активное состояние
    });
});

// Удаляем старый обработчик кнопки персонажей (дублирует новый)
safeAddEventListener('chars-close', 'click', () => {
    hidePanelWithAnimation('characters-panel', () => {
    setActiveNavButton(0); // сбрасываем активное состояние
    });
});

function updateCityButtons(){
    const factoryBuilt=localStorage.getItem('factoryBuilt')==='1';
    const factoryBtn = document.getElementById('btn-build-factory');
    if(factoryBtn) {
        factoryBtn.disabled=factoryBuilt;
        factoryBtn.textContent=factoryBuilt?'Построено':'Построить -35k';
    }
    
    const libraryBuilt=localStorage.getItem('libraryBuilt')==='1';
    const libraryBtn = document.getElementById('btn-build-library');
    if(libraryBtn) {
        libraryBtn.disabled=libraryBuilt;
        libraryBtn.textContent=libraryBuilt?'Построено':'Построить -135k';
    }
    
    const statueBuilt=localStorage.getItem('statueBuilt')==='1';
    const statueBtn = document.getElementById('btn-build-statue');
    if(statueBtn) {
        statueBtn.disabled=statueBuilt;
        statueBtn.textContent=statueBuilt?'Построено':'Построить -500k';
    }
}

// Функция рендеринга панели города
function renderCity() {
    let container = document.querySelector('.city-content-container');
    if (!container) {
        console.error('City content container not found');
        // Попробуем найти через альтернативный селектор
        container = document.getElementById('city-content')?.querySelector('.city-content-container');
        if (!container) {
            console.error('City content container not found (alternative search)');
            return;
        }
    }
    
    container.innerHTML = '';
    
    // Устанавливаем стиль для контейнера с карточками в вертикальном формате
    container.style.cssText = 'width:95%;display:flex;flex-direction:column;gap:12px;margin-right:auto;margin-top:-8px;';
    
    // Функция для форматирования чисел
    const formatNumber = window.formatNumber || ((num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return Math.round(num).toString();
    });
    
    // Функция для отображения звезд
    const starsHTML = (r) => {
        let s = '';
        for(let i = 1; i <= 5; i++) {
            s += i <= r ? '★' : '☆';
        }
        return `<span style="color:#ffeb3b;font-size:9px;">${s}</span>`;
    };
    
    // Получаем данные зданий из localStorage
    const buildingsData = JSON.parse(localStorage.getItem('buildingsData') || '{}');
    
    // Список зданий для панели города (только 4 основных здания)
    const buildings = [
        {
            name: 'Завод',
            image: 'assets/svg/city-panel/factory.svg',
            key: 'factory',
            defaultCost: 20000,
            defaultIncomePerHour: 3000,
            defaultStars: 3
        },
        {
            name: 'Библиотека',
            image: 'assets/svg/city-panel/library.svg',
            key: 'library',
            defaultCost: 0,
            defaultIncomePerHour: 2000,
            defaultStars: 2
        },
        {
            name: 'Почта',
            image: 'assets/svg/city-panel/mail.svg',
            key: 'storage',
            defaultCost: 15000,
            defaultIncomePerHour: 3000,
            defaultStars: 3
        },
        {
            name: 'Типография',
            image: 'assets/svg/city-panel/print.svg',
            key: 'print',
            defaultCost: 25000,
            defaultIncomePerHour: 5000,
            defaultStars: 4
        }
    ];
    
    buildings.forEach(building => {
        // Получаем данные здания из localStorage или используем значения по умолчанию
        const buildingData = buildingsData[building.key] || {};
        
        // Проверяем, построено ли здание (новая и старая система для совместимости)
        let isOwned = buildingData.isOwned;
        
        // Библиотека построена изначально - всегда доступна
        if (building.key === 'library') {
            isOwned = true;
        } else {
            // Проверка старой системы для совместимости
            if (!isOwned && building.key === 'factory') {
                isOwned = localStorage.getItem('factoryBuilt') === '1';
            } else if (!isOwned && building.key === 'storage') {
                isOwned = localStorage.getItem('statueBuilt') === '1';
            }
        }
        
        const cost = buildingData.purchaseCost || building.defaultCost;
        const incomePerHour = buildingData.income || building.defaultIncomePerHour;
        const incomePerMin = Math.round(incomePerHour / 60);
        
        // Синхронизируем звезды с уровнем здания (level от 1 до 5)
        const buildingLevel = buildingData.level || 1;
        const stars = buildingLevel; // rarity = level
        
        const card = document.createElement('div');
        card.className = 'building-card';
        card.setAttribute('data-building', building.name.toLowerCase());
        card.style.cssText = 'background:rgba(255,255,255,0.05);border-radius:12px;padding:8px;display:flex;flex-direction:column;gap:8px;border:1px solid rgba(255,255,255,0.1);width:100%;';
        
        // Проверяем баланс игрока
        const currentBalance = getBalance();
        const hasEnoughMoney = currentBalance >= cost;
        
        // Определяем текст кнопки и стиль
        const buttonText = isOwned ? 'Построено' : 'Построить';
        const buttonDisabled = isOwned;
        
        // Цвет кнопки зависит от состояния: построено, недостаточно денег, или можно строить
        let buttonBackground;
        if (isOwned) {
            buttonBackground = 'rgba(0,0,0,0.3)';
        } else if (!hasEnoughMoney) {
            buttonBackground = 'rgba(100,100,100,0.6)'; // Серый при недостатке денег
        } else {
            buttonBackground = 'rgba(0,0,0,0.8)';
        }
        
        const buttonCursor = (isOwned || !hasEnoughMoney) ? 'not-allowed' : 'pointer';
        const buttonOpacity = (isOwned || !hasEnoughMoney) ? 0.6 : 1;
        
        card.innerHTML = `
            <div style="display:flex;align-items:flex-start;gap:16px;">
                <img src="${building.image}" alt="${building.name}" style="width:95px;height:95px;object-fit:contain;flex-shrink:0;margin-top:20px;" onerror="this.style.display='none';">
                <div style="flex:1;display:flex;flex-direction:column;gap:6px;">
                    <div style="font-size:14px;color:#fff;font-weight:700;margin-bottom:2px;">${building.name}</div>
                    <div style="display:flex;flex-direction:column;gap:0;">
                        <!-- Стоимость -->
                        <div style="display:flex;align-items:center;gap:4px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                            <span style="font-size:10px;color:rgba(255,255,255,0.6);min-width:55px;">Стоимость:</span>
                            <img src="assets/svg/money-icon.svg" alt="Cost" style="width:10px;height:10px;">
                            <span style="font-size:10px;color:rgba(255,255,255,0.8);">${formatNumber(cost)}</span>
                        </div>
                        <!-- Прибыль в минуту -->
                        <div style="display:flex;align-items:center;gap:4px;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
                            <span style="font-size:10px;color:rgba(255,255,255,0.6);min-width:55px;">Прибыль:</span>
                            <img src="assets/svg/clock-icon.svg" alt="Income" style="width:10px;height:10px;">
                            <span style="font-size:10px;color:rgba(255,255,255,0.8);">${formatNumber(incomePerMin)}/мин</span>
                        </div>
                        <!-- Улучшение (звезды) -->
                        <div style="display:flex;align-items:center;gap:4px;padding:4px 0;">
                            <span style="font-size:10px;color:rgba(255,255,255,0.6);min-width:55px;">Улучшение:</span>
                            ${starsHTML(stars)}
                        </div>
                    </div>
                    <!-- Кнопка построить/построено - смещена левее, шире и более круглая -->
                    <button 
                        class="city-building-button" 
                        data-building-key="${building.key}"
                        style="align-self:flex-start;margin-left:20px;background:${buttonBackground};border:none;border-radius:20px;padding:5px 14px;color:#fff;font-size:11px;font-weight:600;cursor:${buttonCursor};transition:all 0.2s ease;opacity:${buttonOpacity};display:inline-flex;align-items:center;justify-content:center;gap:3px;white-space:nowrap;min-width:160px;max-width:calc(100% - 0px);"
                        ${(buttonDisabled || !hasEnoughMoney) ? 'disabled' : ''}
                        onclick="purchaseBuildingFromCity('${building.key}', '${building.name}', ${cost})"
                    >
                        ${isOwned ? '✓ Построено' : 'Построить'}
                        ${!isOwned ? `<img src="assets/svg/money-icon.svg" alt="Cost" style="width:12px;height:12px;display:inline-block;vertical-align:middle;"> ${formatNumber(cost)}` : ''}
                    </button>
                </div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Делаем функцию глобально доступной
window.renderCity = renderCity;

// Функция покупки здания из панели города
window.purchaseBuildingFromCity = function(buildingKey, buildingName, cost) {
    // Проверяем баланс
    const currentBalance = getBalance();
    if (currentBalance < cost) {
        alert('Недостаточно денег');
        return;
    }
    
    // Получаем данные зданий
    const buildingsData = JSON.parse(localStorage.getItem('buildingsData') || '{}');
    const buildingData = buildingsData[buildingKey] || {};
    
    // Библиотека построена изначально - нельзя покупать
    if (buildingKey === 'library') {
        alert('Библиотека уже построена!');
        return;
    }
    
    // Проверяем, не построено ли уже
    let isOwned = buildingData.isOwned;
    
    // Проверка старой системы для совместимости
    if (!isOwned && buildingKey === 'factory') {
        isOwned = localStorage.getItem('factoryBuilt') === '1';
    } else if (!isOwned && buildingKey === 'storage') {
        isOwned = localStorage.getItem('statueBuilt') === '1';
    }
    
    if (isOwned) {
        alert('Здание уже построено');
        return;
    }
    
    let purchaseHandledByMainMenuAnimation = false;
    
    // Вызываем соответствующие функции покупки из main-menu.js
    if (buildingKey === 'factory' && window.buyFactory) {
        purchaseHandledByMainMenuAnimation = true;
        window.buyFactory();
    } else if (buildingKey === 'print' && window.buyPrint) {
        purchaseHandledByMainMenuAnimation = true;
        window.buyPrint();
    } else if (buildingKey === 'storage' && window.buyStorage) {
        purchaseHandledByMainMenuAnimation = true;
        window.buyStorage();
    } else {
        // Общая логика покупки для других зданий
        setBalance(currentBalance - cost);
        
        // Обновляем buildingsData
        if (!buildingsData[buildingKey]) {
            buildingsData[buildingKey] = {};
        }
        buildingsData[buildingKey].isOwned = true;
        buildingsData[buildingKey].purchaseCost = cost;
        buildingsData[buildingKey].lastCollectTime = Date.now();
        buildingsData[buildingKey].accumulatedProfit = 0;
        localStorage.setItem('buildingsData', JSON.stringify(buildingsData));
        
        // Отслеживание постройки здания в PostHog
        if (window.posthogService && window.posthogService.isReady()) {
            window.posthogService.trackBuildingBuilt(buildingName, buildingKey, cost, 1);
        }
        
        // Обновляем старую систему для совместимости
        if (buildingKey === 'factory') {
            localStorage.setItem('factoryBuilt', '1');
            if (typeof createFactory === 'function') {
                createFactory();
            }
        } else if (buildingKey === 'storage') {
            localStorage.setItem('statueBuilt', '1');
        }
        
        alert(`${buildingName} построено!`);
    }
    
    // Обновляем панель города
    if (typeof renderCity === 'function') {
        renderCity();
    }
    
    // Обновляем кнопки города (старая система)
    if (typeof updateCityButtons === 'function') {
        updateCityButtons();
    }
    
    // Синхронизируем с интерактивной картой
    if (typeof window.updateBuildingZones === 'function') {
        window.updateBuildingZones();
    }
    if (!purchaseHandledByMainMenuAnimation && typeof window.notifyMapBuildingPurchased === 'function') {
        window.notifyMapBuildingPurchased(buildingKey);
    }
    
    // Закрываем панель города после покупки
    if (typeof window.hidePanelWithAnimation === 'function') {
        window.hidePanelWithAnimation('city-panel');
    }
};

// Функция для безопасного добавления обработчиков событий
function safeAddEventListener(elementId, event, handler) {
    const element = document.getElementById(elementId);
    if (element) {
        // Проверяем, не добавлен ли уже обработчик
        if (!element.hasAttribute('data-handler-added')) {
            element.addEventListener(event, handler);
            element.setAttribute('data-handler-added', 'true');

        } else {

        }
    } else {
        console.warn(`❌ Element ${elementId} not found for event handler`);
    }
}

// build factory
safeAddEventListener('btn-build-factory', 'click', () => {
    if(localStorage.getItem('factoryBuilt')==='1')return;
    const cost=35000;
    if(getBalance()<cost){alert('Недостаточно денег');return;}
    setBalance(getBalance()-cost);
    localStorage.setItem('factoryBuilt','1');
    createFactory();
    updateCityButtons();
});

// build library
safeAddEventListener('btn-build-library', 'click', () => {
    if(localStorage.getItem('libraryBuilt')==='1')return;
    const cost=135000;
    if(getBalance()<cost){alert('Недостаточно денег');return;}
    setBalance(getBalance()-cost);
    localStorage.setItem('libraryBuilt','1');
    alert('Библиотека построена!');
    updateCityButtons();
});

// build statue (звезды)
const STAR_KEY='stars';
function getStars(){return parseInt(localStorage.getItem(STAR_KEY)||'0');}
function setStars(v){localStorage.setItem(STAR_KEY,v);} // пока без UI
safeAddEventListener('btn-build-statue', 'click', () => {
    const cost=500000;
    if(localStorage.getItem('statueBuilt')==='1')return;
    if(getBalance()<cost){alert('Недостаточно денег');return;}
    setBalance(getBalance()-cost);
    localStorage.setItem('statueBuilt','1');
    alert('Статуя построена!');
    updateCityButtons();
});

// === FACTORY BUILDING ===
let factoryObj=null;
let factoryProgress=0;
factoryProgressDiv=document.createElement('div');
factoryProgressDiv.id='factory-income-progress';
factoryProgressDiv.style.cssText='position:absolute;width:70px;height:70px;border-radius:50%;background:conic-gradient(#2196f3 0deg, transparent 0deg);display:none;pointer-events:none;z-index:1;visibility:hidden;';
document.body.appendChild(factoryProgressDiv);
factoryBankDiv=document.createElement('div');
factoryBankDiv.id='factory-income-bank';
factoryBankDiv.style.cssText='position:absolute;width:70px;height:70px;border-radius:50%;background:#004ba0;display:none;align-items:center;justify-content:center;color:#fff;font-weight:bold;z-index:1;cursor:pointer;';
document.body.appendChild(factoryBankDiv);

let factoryIntermediate=0;
let factoryUpgrades=0; // future
const factoryProductionBase=19.87; // то же
const factoryCostBase=100;
const factoryRateGrowth=1.15;

// storage load
factoryUpgrades=parseInt(localStorage.getItem('f_upCnt')||'0');
factoryIntermediate=parseFloat(localStorage.getItem('f_interBal')||'0');
factoryBankDiv.textContent=formatNumber(factoryIntermediate);

function getFactoryIncomePerSecond(){
    if(factoryUpgrades===0) return 0;
    return factoryProductionBase * Math.pow(1.05, factoryUpgrades);
}

function factoryGetNextUpgradeCost(){return factoryCostBase*Math.pow(factoryRateGrowth,factoryUpgrades);}

// PANEL logic
const fPanel=document.getElementById('factory-upgrade-panel');
const fClose=document.getElementById('factory-panel-close');
if(fClose && fPanel) {
    fClose.onclick=()=>fPanel.style.display='none';
}

const fUpgradeBtn=document.getElementById('factory-upgrade-btn');
const fLevelLbl=document.getElementById('factory-level');
const fIncomeLbl=document.getElementById('factory-income');

function fUpdateLevelIncome(){fLevelLbl.textContent=factoryUpgrades;fIncomeLbl.textContent=formatNumber(getFactoryIncomePerSecond());}

// добавляем переключатель x1 / MAX
const fSwitchWrapper=document.createElement('div');
fSwitchWrapper.style.cssText='display:flex;gap:2px;margin-top:6px;';
const factoryPanelContent = document.getElementById('factory-panel-content');
if(factoryPanelContent) {
    factoryPanelContent.appendChild(fSwitchWrapper);
}

const fBtnX1=document.createElement('button');
fBtnX1.textContent='x1';
fBtnX1.style.cssText='flex:1;background:#1976d2;border:none;color:#fff;border-radius:6px 0 0 6px;height:32px;cursor:pointer;font-weight:bold;';
const fBtnMax=document.createElement('button');
fBtnMax.textContent='MAX';
fBtnMax.style.cssText='flex:1;background:#000;border:none;color:#fff;border-radius:0 16px 16px 0;height:32px;cursor:pointer;font-weight:bold;';
fSwitchWrapper.append(fBtnX1,fBtnMax);

let fIsMaxMode=false;
function fUpdateSwitch(){
    if(fIsMaxMode){
        fBtnX1.style.background='#000';
        fBtnX1.style.opacity=0.4;
        fBtnMax.style.background='#1976d2';
        fBtnMax.style.opacity=1;
    }else{
        fBtnX1.style.background='#1976d2';
        fBtnX1.style.opacity=1;
        fBtnMax.style.background='#000';
        fBtnMax.style.opacity=0.4;
    }
}
fBtnX1.onclick=()=>{fIsMaxMode=false;fUpdateSwitch();fRefreshCost();};
fBtnMax.onclick=()=>{fIsMaxMode=true;fUpdateSwitch();fRefreshCost();};
fUpdateSwitch();

// функция для рассчёта стоимости при MAX
function fCalcMaxAffordableCost(){
    let balance=getBalance();
    let temp=factoryUpgrades;
    let total=0;
    while(true){
        const c=factoryCostBase*Math.pow(factoryRateGrowth,temp);
        if(balance>=c){total+=c;balance-=c;temp++;}
        else break;
    }
    return total>0?total:factoryGetNextUpgradeCost();
}

function fRefreshCost(){const c=fIsMaxMode?fCalcMaxAffordableCost():factoryGetNextUpgradeCost();fUpgradeBtn.querySelector('span').textContent=formatNumber(c);const afford=getBalance()>=c;fUpgradeBtn.disabled=!afford;fUpgradeBtn.style.opacity=afford?1:0.5;}
fUpdateLevelIncome();fRefreshCost();

fUpgradeBtn.onclick=()=>{
    const start=factoryUpgrades;
    let bal=getBalance();
    if(fIsMaxMode){
        while(bal>=factoryGetNextUpgradeCost()){
            const c=factoryGetNextUpgradeCost();
            bal-=c;
            factoryUpgrades++;
        }
    }else{
        const cost=factoryGetNextUpgradeCost();
        if(bal>=cost){bal-=cost;factoryUpgrades++;}
    }
    if(factoryUpgrades>start){
        setBalance(bal);
        fUpdateLevelIncome();
        fRefreshCost();
        saveFactory();
        const n=factoryUpgrades-start;
        const sumXP=(start+1+factoryUpgrades)*n/2;
        addXP(sumXP);
        
        // Обновляем статистику если панель открыта
        if(window.refreshStatistics) {
            window.refreshStatistics();
        }
    }
};

function saveFactory(){localStorage.setItem('f_upCnt',factoryUpgrades);localStorage.setItem('f_interBal',factoryIntermediate);} // called periodically

function createFactory(){
    if(factoryObj) return;
    const geo=new THREE.BoxGeometry(2,2,2);
    const mat=new THREE.MeshLambertMaterial({color:0xffdd55});
    factoryObj=new THREE.Mesh(geo,mat);
    factoryObj.name='factory';
    factoryObj.scale.set(3,3,3);
    factoryObj.position.set(18,3,0); // поднят на половину высоты
    scene.add(factoryObj);

    // show DOM elements
    factoryProgressDiv.style.display='flex';
    factoryBankDiv.style.display='flex';

    // click handler
    window.addEventListener('pointerdown',(e)=>{
        // Блокируем клики если открыта любая панель
        if (isAnyPanelOpen()) return;
        
        pointer.x=(e.clientX/window.innerWidth)*2-1;
        pointer.y=-(e.clientY/window.innerHeight)*2+1;
        raycaster.setFromCamera(pointer,camera);
        const ints=raycaster.intersectObjects([factoryObj],true);
        if(ints.length>0){fPanel.style.display='block';fRefreshCost();fUpdateLevelIncome();}
    });

    // после appendChild(factoryProgressDiv)
    const factoryInner=document.createElement('div');
    factoryInner.style.cssText='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:60px;height:60px;border-radius:50%;background:#2b2b2b;pointer-events:none;';
    factoryProgressDiv.appendChild(factoryInner);
    
    // Позиционируем круги после создания завода
    setTimeout(initializeCirclePositions, 100);
}

// recreate if built earlier
if(localStorage.getItem('factoryBuilt')==='1'){
    createFactory();
    // Позиционируем круги после создания завода
    setTimeout(initializeCirclePositions, 100);
}

// income loop extension
setInterval(()=>{
    // factory progress (3s cycle => 180 steps)
    if(factoryObj){
        factoryProgress+=1;
        if(factoryProgress>=180){
            factoryProgress=0;
            const inc=getFactoryIncomePerSecond()*3;
            factoryIntermediate+=inc;
            window.factoryIntermediate = factoryIntermediate; // обновляем глобальную переменную
            factoryBankDiv.textContent=formatNumber(factoryIntermediate);
        }
        // update circle deg
        const deg = factoryUpgrades===0 ? 0 : (factoryProgress/180)*360;
        factoryProgressDiv.style.visibility='visible';
        factoryProgressDiv.style.background=circleBG('factory',deg,EMP_COLORS.default);
    }
},1000/60);

// collect factory money
factoryBankDiv.onclick=()=>{if(factoryIntermediate>0){setBalance(getBalance()+factoryIntermediate);factoryIntermediate=0;window.factoryIntermediate=0;factoryBankDiv.textContent='0';fRefreshCost();}};

// === OFFLINE INCOME — удалено ===

// save factory progress periodically
setInterval(saveFactory,1000); 

// referrals helpers
function getRefs(){return parseInt(localStorage.getItem('refs')||'0');}
function setRefs(v){
    localStorage.setItem('refs',v);
    // Примечание: ref-value теперь показывает количество персонажей, а не рефералов
}

// Функция для подсчета персонажей на аккаунте игрока
function getCharactersCount(){
    // Базовые персонажи всегда доступны: blumy, redjy, grinni, purpe (4 персонажа)
    let count = 4;
    
    // Проверяем, есть ли robo-blumy и pinky в списке доступных персонажей
    const availableCharacters = JSON.parse(localStorage.getItem('availableCharacters') || '[]');
    if(availableCharacters.includes('robo-blumy')){
        count++;
    }
    if(availableCharacters.includes('pinky')){
        count++;
    }
    
    return count;
}

// Функция для обновления отображения количества персонажей в левой панели
function updateCharactersCount(){
    const refValue = document.getElementById('ref-value');
    if(refValue) {
        const count = getCharactersCount();
        refValue.textContent = count + '/6';
    }
}

// init stat values
const bcValue = document.getElementById('bc-value');
const rbcValue = document.getElementById('rbc-value');
const refValue = document.getElementById('ref-value');

if(bcValue) bcValue.textContent=formatNumber(getBalance());
if(rbcValue) rbcValue.textContent=formatNumber(getCredits());
updateCharactersCount();

// === PHONE PANEL ===
const phonePanel=document.getElementById('phone-panel');
if(phonePanel){
    const phoneHome=document.getElementById('phone-home');
    // открытие/закрытие телефона
    function toggleCircles(show){
        const list=[incomeProgress,incomeBank,factoryProgressDiv,factoryBankDiv,storageProgressDiv];
        list.forEach(el=>{el.style.visibility=show?'visible':'hidden';});
    }

    function closePhonePanel(){
        hidePanelWithAnimation('phone-panel', () => {
            toggleCircles(true);
            clearActiveSideButton();
            if (window.updateProfitIndicators) {
                setTimeout(() => {
                    window.updateProfitIndicators();
                }, 100);
            }
        });
    }

    safeAddEventListener('btn-phone', 'click', () => {
        showPanelWithAnimation('phone-panel');
        if (phoneHome) phoneHome.style.display='flex';
        toggleCircles(false);
        setActiveSideButton('btn-phone');
    });
    safeAddEventListener('phone-close', 'click', closePhonePanel);
    const phoneGestureBar=document.getElementById('phone-gesture-bar');
    if(phoneGestureBar){
        let startY=null;
        const SWIPE_THRESHOLD=40;
        phoneGestureBar.addEventListener('touchstart',e=>{
            if(e.touches.length>0){
                startY=e.touches[0].clientY;
            }
        },{passive:true});
        phoneGestureBar.addEventListener('touchmove',e=>{
            if(startY===null) return;
            const currentY=e.touches[0].clientY;
            if(startY-currentY>SWIPE_THRESHOLD){
                startY=null;
                closePhonePanel();
            }
        },{passive:true});
        phoneGestureBar.addEventListener('touchend',e=>{
            if(startY===null) return;
            const endY=e.changedTouches[0].clientY;
            if(startY-endY>SWIPE_THRESHOLD){
                closePhonePanel();
            }
            startY=null;
        });
        phoneGestureBar.addEventListener('click',closePhonePanel);
    }
    document.querySelectorAll('.phone-back').forEach(btn=>btn.addEventListener('click',()=>{}));
} 

// Отключенная система уведомлений/сообщений
function pushNotification(){/* no-op */} 

// === PLAYER LEVEL SYSTEM ===
const XP_BASE=20;
let playerLevel=parseInt(localStorage.getItem('playerLevel')||'1');
let playerXP=parseInt(localStorage.getItem('playerXP')||'0');
function xpForLevel(lvl){
    if(lvl<=1) return 0;
    if(lvl===2) return XP_BASE;
    const mult=Math.pow(1.25,lvl-2);
    return Math.round(XP_BASE*mult);
}
function saveXP(){localStorage.setItem('playerLevel',playerLevel);localStorage.setItem('playerXP',playerXP);} 
function updateProfileUI(){
    // Используем единую функцию синхронизации
    syncLevelAndXP();
    
    // Обновляем статистику если панель открыта
    if(window.refreshStatistics) {
        window.refreshStatistics();
    }
}

// Функция для синхронизации уровня и ХП между профилем и статистикой
function syncLevelAndXP() {
    // Получаем данные игрока
    const currentPlayerLevel = parseInt(localStorage.getItem('playerLevel') || '1');
    const currentPlayerXP = parseInt(localStorage.getItem('playerXP') || '0');
    
    // Функция для расчета XP для следующего уровня
    const XP_BASE = 20;
    function xpForLevel(lvl) {
        if (lvl <= 1) return 0;
        if (lvl === 2) return XP_BASE;
        const mult = Math.pow(1.25, lvl - 2);
        return Math.round(XP_BASE * mult);
    }
    
    // Рассчитываем XP для текущего и следующего уровня
    const currentLevelXP = xpForLevel(currentPlayerLevel);
    const nextLevelXP = xpForLevel(currentPlayerLevel + 1);
    const xpInCurrentLevel = currentPlayerXP - currentLevelXP;
    const xpToNextLevel = nextLevelXP - currentPlayerXP;
    
    // Рассчитываем прогресс (процент заполнения текущего уровня)
    const progressPercent = nextLevelXP > currentLevelXP ? 
        ((currentPlayerXP - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 0;
    
    // === ОБНОВЛЕНИЕ ПРОФИЛЯ ===
    // Обновляем номер уровня в круге профиля
    const profileLevelNumber = document.querySelector('.profile-level-number');
    if (profileLevelNumber) {
        profileLevelNumber.textContent = currentPlayerLevel;
    }
    
    // Обновляем текст уровня в профиле
    const profileLevelText = document.querySelector('.profile-level-text');
    if (profileLevelText) {
        profileLevelText.textContent = `Уровень ${currentPlayerLevel}`;
    }
    
    // Обновляем прогресс-бар XP в профиле
    const profileXpProgressBar = document.querySelector('.profile-xp-progress-bar');
    if (profileXpProgressBar) {
        profileXpProgressBar.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    }
    
    // Обновляем текст XP в прогресс баре
    const profileXpText = document.querySelector('.profile-xp-text');
    if (profileXpText) {
        profileXpText.textContent = `${currentPlayerXP} XP`;
    }
    
    // Обновляем информацию об XP в профиле
    const profileCurrentXp = document.querySelector('.profile-current-xp');
    if (profileCurrentXp) {
        profileCurrentXp.textContent = xpInCurrentLevel;
    }
    
    const profileNextLevelXp = document.querySelector('.profile-next-level-xp');
    if (profileNextLevelXp) {
        profileNextLevelXp.textContent = nextLevelXP - currentLevelXP;
    }
    
    const profileXpToNext = document.querySelector('.profile-xp-to-next');
    if (profileXpToNext) {
        profileXpToNext.textContent = xpToNextLevel;
    }
    
    const profileXpToNextBottom = document.querySelector('.profile-xp-to-next-bottom');
    if (profileXpToNextBottom) {
        profileXpToNextBottom.textContent = xpToNextLevel;
    }
    
    // === ОБНОВЛЕНИЕ СТАТИСТИКИ ===
    // Обновляем отображение уровня в статистике
    const statsLevelProgress = document.querySelector('#statistics-panel .level-progress');
    if (statsLevelProgress) {
        const statsLevelNumber = statsLevelProgress.querySelector('.level-number');
        if (statsLevelNumber) {
            statsLevelNumber.textContent = currentPlayerLevel;
        }
    }
    
    const statsLevelText = document.querySelector('#statistics-panel .level-text');
    if (statsLevelText) {
        statsLevelText.textContent = `Уровень ${currentPlayerLevel}`;
    }
    
    // Обновляем прогресс-бар XP в статистике
    const statsXpProgressBar = document.querySelector('#statistics-panel .xp-progress-bar');
    if (statsXpProgressBar) {
        statsXpProgressBar.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
    }
    
    // Обновляем информацию об XP в статистике
    const statsCurrentXp = document.querySelector('#statistics-panel .current-xp');
    if (statsCurrentXp) {
        statsCurrentXp.textContent = xpInCurrentLevel;
    }
    
    const statsNextLevelXp = document.querySelector('#statistics-panel .next-level-xp');
    if (statsNextLevelXp) {
        statsNextLevelXp.textContent = nextLevelXP - currentLevelXP;
    }
    
    const statsXpToNext = document.querySelector('#statistics-panel .xp-to-next');
    if (statsXpToNext) {
        statsXpToNext.textContent = xpToNextLevel;
    }
}

function addXP(amount){
    let gained=0;
    playerXP+=amount;
    const startLvl=playerLevel;
    while(playerXP>=xpForLevel(playerLevel+1)){
        playerXP-=xpForLevel(playerLevel+1);
        playerLevel++;gained++;
    }
    saveXP();
    syncLevelAndXP(); // Используем единую функцию синхронизации
    if(gained>0) enqueueLevelAnimations(startLvl,gained);
    
    // Обновляем статистику если панель открыта
    if(window.refreshStatistics) {
        window.refreshStatistics();
    }
}

// Удаляем старый обработчик кнопки профиля (дублирует новый)
const profileClose=document.getElementById('profile-close');
if(profileClose){profileClose.addEventListener('click',()=>{hidePanelWithAnimation('profile-panel');});}
// === award XP on upgrades ===
// library upgrade: in upgradeBtn click after each upgrade increment
// modify inside existing handler
// ... existing code ... 

const overlay=document.getElementById('levelup-overlay');
const badge=document.getElementById('levelup-badge');
let levelQueue=[];let levelPlaying=false;
function enqueueLevelAnimations(startLevel,gained){
    for(let i=1;i<=gained;i++) levelQueue.push(startLevel+i);
    if(!levelPlaying) playNext();
}

function playNext(){
    if(levelQueue.length===0){levelPlaying=false;overlay.style.display='none';return;}
    levelPlaying=true;
    const lvl=levelQueue.shift();
    badge.textContent=lvl-1; // показываем текущий
    overlay.style.display='flex';
    badge.className='lvl-slide-in';
}

badge.addEventListener('animationend',e=>{
    if(e.animationName==='slideIn'){
        // смена текста и shake
        badge.textContent=parseInt(badge.textContent)+1;
        badge.className='lvl-shake';
    }else if(e.animationName==='shake'){
        badge.className='lvl-slide-out';
    }else if(e.animationName==='slideOut'){
        playNext();
    }
});

// inject css
const st=document.createElement('style');st.textContent=`
#levelup-overlay{background:rgba(0,0,0,.6);} 
.lvl-slide-in{animation:slideIn .8s forwards;}
.lvl-shake{animation:shake .3s forwards;}
.lvl-slide-out{animation:slideOut .8s forwards;}
@keyframes slideIn{0%{transform:translateX(-150%) scale(1);}100%{transform:translateX(0) scale(1);} }
@keyframes shake{0%,100%{transform:translateX(0);}20%{transform:translateX(-4px);}40%{transform:translateX(4px);}60%{transform:translateX(-3px);}80%{transform:translateX(3px);} }
@keyframes slideOut{0%{transform:translateX(0);}100%{transform:translateX(150%);} }
`;document.head.appendChild(st); 

// === STORAGE SYSTEM ===
const STORAGE_BASE_CAP=1000;
let storageUpgrades=parseInt(localStorage.getItem('stor_up')||'0');
let storageCapacity=STORAGE_BASE_CAP+storageUpgrades*500; // +500 за ап
let storedBooks=parseInt(localStorage.getItem('stor_books')||'0');
let storedMags =parseInt(localStorage.getItem('stor_mags') ||'0');

// Делаем переменные хранилища доступными глобально для новой системы доставки
window.storedBooks = storedBooks;
window.storedMags = storedMags;
function saveStorage(){
    localStorage.setItem('stor_up',storageUpgrades);
    localStorage.setItem('stor_books',storedBooks);
    localStorage.setItem('stor_mags',storedMags);
    // Убираем сохранение saleQueue - теперь используется новая система доставки
    // localStorage.setItem('stor_queue',JSON.stringify(saleQueue));
}

// Делаем функцию saveStorage доступной глобально
window.saveStorage = saveStorage; 
function updateStorageUI(rootElement = document){
    const total=storedBooks+storedMags;
    const pct=Math.min(100,total/storageCapacity*100);
    
    // Эти элементы для старой панели, которые могут не быть в rootElement
    // Предполагаем, что они всегда глобальные или обрабатываются отдельно если существуют
    const globalBar=document.getElementById('storage-progress-bar');
    const globalTxt=document.getElementById('storage-progress-text');
    const globalAmt=document.getElementById('storage-amount');
    
    if(globalBar){
        globalBar.style.width=pct+'%';
        const hue=120-(pct*1.2);
        globalBar.style.background=`hsl(${hue},80%,45%)`;
    }
    if(globalTxt){
        const hue=120-(pct*1.2);
        globalTxt.textContent=Math.round(pct)+'%';
        globalTxt.style.color=`hsl(${hue},80%,55%)`;
    }
    if(globalAmt){
        globalAmt.textContent=`${total}/${storageCapacity}`;
    }
    
    // Эти элементы в карточке хранилища, которые могут быть в основном документе или в конкретной панели
    const cardPct=rootElement.querySelector('#storage-card-percent'); // Используем querySelector на rootElement
    const cardAmt=rootElement.querySelector('#storage-card-amt'); // Используем querySelector на rootElement
    
    if(cardPct){
        cardPct.textContent=Math.round(pct)+'%';
    }
    if(cardAmt){
        cardAmt.textContent=`${total} / ${storageCapacity}`;
    }
}

// Делаем функцию updateStorageUI доступной глобально
window.updateStorageUI = updateStorageUI; 
function canStore(q){return storedBooks+storedMags+q<=storageCapacity;} 

// === СТАРАЯ СИСТЕМА ПРОДАЖИ ОТКЛЮЧЕНА ===
// let saleQueue=JSON.parse(localStorage.getItem('stor_queue')||'[]');let selling=false;let saleTimer=null;
// let saleStartTime=0, saleDelayMs=0; // для круга прогресса
// function scheduleSale(){if(selling||saleQueue.length===0) return; selling=true; const delay=500+Math.random()*1500; saleStartTime=Date.now(); saleDelayMs=delay; storageProgressDiv.style.visibility='visible'; saleTimer=setTimeout(processSale,delay);} 
// function processSale(){if(saleQueue.length===0){selling=false;storageProgressDiv.style.visibility='hidden';return;} const order=saleQueue[0]; order.qty--; const defective=Math.random()<0.1; const priceMultiplier=defective?(0.5+Math.random()*0.5):2; const revenue=order.unitCost*priceMultiplier; setBalance(getBalance()+revenue); order.revenue+=revenue; if(defective) order.defective++; if(order.type==='books') storedBooks--; else storedMags--; updateStorageUI(); if(order.qty===0){ // order complete
//     pushNotification('STORAGE',`${order.type==='books'?'Книги':'Журналы'} партия (${order.originalQty}) продана за ${formatNumber(Math.round(order.revenue))}$, брак: ${order.defective}`,'assets/icons/delivery.svg');
//     saleQueue.shift();
//  }
//  saveStorage(); selling=false; if(saleQueue.length>0){scheduleSale();}else{storageProgressDiv.style.visibility='hidden';}}

function addToStorage(type,qty,unitCost){
    if(!canStore(qty)) return false; 
    if(type==='books') {
        storedBooks+=qty; 
        // Обновляем глобальную переменную
        window.storedBooks = storedBooks;
        // Проверяем, была ли напечатана первая книга
        if (storedBooks === qty && window.onBookPrinted) {
            window.onBookPrinted();
        }
    } else {
        storedMags+=qty; 
        // Обновляем глобальную переменную
        window.storedMags = storedMags;
    }
    // Убираем добавление в saleQueue - теперь используется новая система доставки
    // saleQueue.push({type,qty,originalQty:qty,unitCost,revenue:0,defective:0}); 
    saveStorage();
    updateStorageUI(); 
    // Убираем автоматический запуск продажи
    // scheduleSale(); 
    return true;
}

// Делаем функцию addToStorage доступной глобально
window.addToStorage = addToStorage;

// открытие/закрытие панели хранилища
const storagePanel=document.getElementById('storage-upgrade-panel');
if(storagePanel){document.getElementById('storage-panel-close').onclick=()=>storagePanel.style.display='none';}
// город строит хранилище
const btnStorageBuild=document.getElementById('btn-build-storage');
if(btnStorageBuild){btnStorageBuild.addEventListener('click',()=>{if(localStorage.getItem('storageBuilt')==='1')return;const cost=1000;if(getBalance()<cost){alert('Недостаточно денег');return;}setBalance(getBalance()-cost);localStorage.setItem('storageBuilt','1');btnStorageBuild.disabled=true;btnStorageBuild.textContent='Построено';createStorage();});}
function createStorage(){
    if(scene.getObjectByName('storage')) return;
    const geo=new THREE.BoxGeometry(2,2,2);
    const mat=new THREE.MeshLambertMaterial({color:0x9c27b0});
    const stor=new THREE.Mesh(geo,mat);
    stor.name='storage';
    stor.scale.set(3,3,3);
    stor.position.set(-18,3,0);
    scene.add(stor);

    // show storage progress circle
    storageProgressDiv.style.display='flex';
    storageProgressDiv.style.visibility='visible';

    // click handler open panel
    window.addEventListener('pointerdown',(e)=>{
        // Блокируем клики если открыта любая панель
        if (isAnyPanelOpen()) return;
        
        pointer.x=(e.clientX/window.innerWidth)*2-1;
        pointer.y=-(e.clientY/window.innerHeight)*2+1;
        raycaster.setFromCamera(pointer,camera);
        const ints=raycaster.intersectObjects([stor],true);
        if(ints.length>0){storagePanel.style.display='block';updateStorageUI();updateStorageUpgradeCost();}
    });
    
    // Позиционируем круги после создания хранилища
    setTimeout(initializeCirclePositions, 100);
}
// recreate storage if built earlier
if(localStorage.getItem('storageBuilt')==='1') {
    createStorage();
    // Позиционируем круги после создания хранилища
    setTimeout(initializeCirclePositions, 100);
}

// DELIVERY UI modifications
const collectSelBtn=document.getElementById('btn-collect-selected');if(collectSelBtn){collectSelBtn.addEventListener('click',collectSelected);} 
function refreshDeliveryList(){const cont=document.getElementById('orders-container');if(!cont) return;cont.innerHTML='';if(orders.length===0){cont.innerHTML='<p style="text-align:center;width:100%;opacity:.6">Нет заказов</p>';return;}orders.forEach((o,idx)=>{const div=document.createElement('div');div.className='order-item';div.innerHTML=`<span>${o.type==='books'?'Книги':'Журналы'} ×${o.qty}</span><span>${formatNumber(o.cost)}$</span>`;cont.appendChild(div);});}
function collectSelected(){const checkboxes=[...document.querySelectorAll('#orders-container input[type=checkbox]')];const selIdxs=checkboxes.filter(ch=>ch.checked).map(ch=>parseInt(ch.dataset.idx));if(selIdxs.length===0){alert('Ничего не выбрано');return;} let totalQty=0;selIdxs.forEach(i=>{totalQty+=orders[i].qty;});if(!canStore(totalQty)){alert('Недостаточно места в хранилище');return;} // добавить партии
const newOrders=[];orders.forEach((o,i)=>{if(selIdxs.includes(i)){const unit=o.cost/o.qty;addToStorage(o.type,o.qty,unit);}else newOrders.push(o);});orders=newOrders;saveOrders();refreshDeliveryList();}
// переопределяем collect-all
const collectAllBtn=document.getElementById('btn-collect-all');if(collectAllBtn){collectAllBtn.onclick=()=>{let total=0;orders.forEach(o=>total+=o.qty);if(!canStore(total)){alert('Недостаточно места в хранилище');return;}orders.forEach(o=>{const unit=o.cost/o.qty;addToStorage(o.type,o.qty,unit);});orders=[];saveOrders();refreshDeliveryList();};} 

const STORAGE_BASE_COST=1000;const STORAGE_RATE=1.25;const STORAGE_INC=500;
function storageNextCost(){return Math.round(STORAGE_BASE_COST*Math.pow(STORAGE_RATE,storageUpgrades));}
function updateStorageUpgradeCost(){
    const c=storageNextCost();
    const costElement = document.getElementById('storage-upgrade-cost');
    const btnElement = document.getElementById('storage-upgrade-btn');
    
    if(costElement) {
        costElement.textContent=formatNumber(c);
    }
    
    const afford=getBalance()>=c;
    if(btnElement) {
        btnElement.disabled=!afford;
        btnElement.style.opacity=afford?1:0.5;
    }
}
function upgradeStorage(){const cost=storageNextCost();if(getBalance()<cost){alert('Недостаточно денег');return;}setBalance(getBalance()-cost);storageUpgrades++;storageCapacity=STORAGE_BASE_CAP+storageUpgrades*STORAGE_INC;saveStorage();updateStorageUI();updateStorageUpgradeCost();addXP(storageUpgrades);
    
    // Отслеживание улучшения хранилища в PostHog
    if (window.posthogService && window.posthogService.isReady()) {
        window.posthogService.track('storage_upgraded', {
            cost: cost,
            new_level: storageUpgrades,
            new_capacity: storageCapacity
        });
    }

    // Обновляем статистику если панель открыта
    if(window.refreshStatistics) {
        window.refreshStatistics();
    }
}
// attach btn
const storUpBtn=document.getElementById('storage-upgrade-btn');if(storUpBtn){storUpBtn.onclick=upgradeStorage;updateStorageUpgradeCost();}
// open panel when item clicked
const cityItemStorage=document.getElementById('item-storage');if(cityItemStorage){cityItemStorage.addEventListener('click',()=>{if(localStorage.getItem('storageBuilt')==='1'){storagePanel.style.display='block';updateStorageUI();updateStorageUpgradeCost();}});} 

// === СТАРАЯ СИСТЕМА ПРОДАЖИ ОТКЛЮЧЕНА ===
// watchdog: каждые 2 секунды проверяем, запущена ли продажа
// setInterval(()=>{if(!selling && saleQueue.length>0) scheduleSale();},2000); 

// === ОФФЛАЙН-ПРОДАЖА ХРАНИЛИЩА ОТКЛЮЧЕНА ===
// function simulateOfflineStorageSales(ms){
//    let remaining=ms;
//    while(remaining>0 && saleQueue.length>0){
//        const delay=500+Math.random()*1500;
//        if(remaining<delay) break;
//        remaining-=delay;
//        const order=saleQueue[0];
//        order.qty--; 
//        const defective=Math.random()<0.1;
//        const priceMultiplier=defective?(0.5+Math.random()*0.5):2;
//        const revenue=order.unitCost*priceMultiplier;
//        setBalance(getBalance()+revenue);
//        order.revenue+=revenue;
//        if(defective) order.defective++;
//        if(order.type==='books') storedBooks--; else storedMags--;
//        if(order.qty===0){
//            pushNotification('STORAGE',`${order.type==='books'?'Книги':'Журналы'} партия (${order.originalQty}) продана за ${formatNumber(Math.round(order.revenue))}$, брак: ${order.defective}`,'assets/icons/delivery.svg');
//            saleQueue.shift();
//        }
//    }
//    saveStorage();
//    updateStorageUI();
// }
// function handleOfflineStorageSales(){
//    const saved=localStorage.getItem(LAST_ONLINE_KEY);
//    if(!saved) return;
//    const last=parseInt(saved);
//    if(isNaN(last)) return;
//    const diffMs=Date.now()-last;
//    if(diffMs<500) return;
//    simulateOfflineStorageSales(diffMs);
//    if(saleQueue.length>0) scheduleSale();
// }
// handleOfflineStorageSales(); 

// === CHARACTERS DATA ===
const employees=[
 {name:'Блуми',  level:parseInt(localStorage.getItem('employee_bloomi_level')||'1'), skill:'Бегущая почта',     rarity:1, img:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkY5ODAwIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+QjwvdGV4dD4KPC9zdmc+'},
 {name:'Реджи', level:parseInt(localStorage.getItem('employee_reggi_level')||'1'), skill:'Калькулятор',       rarity:1, img:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UjwvdGV4dD4KPC9zdmc+'},
 {name:'Спайки', level:parseInt(localStorage.getItem('employee_spikes_level')||'1'), skill:'Логистика',        rarity:3, img:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRkY1NzIyIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UzwvdGV4dD4KPC9zdmc+'},
 {name:'Гринни',  level:parseInt(localStorage.getItem('employee_grinni_level')||'1'), skill:'Лояльность',        rarity:3, img:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjNENBRjUwIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RzwvdGV4dD4KPC9zdmc+'},
 {name:'Перпи',  level:parseInt(localStorage.getItem('employee_perpi_level')||'1'), skill:'Мастер-фломастер',  rarity:5, img:'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjOUMyN0IwIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzNSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UDwvdGV4dD4KPC9zdmc+'},
];

// Цвета для сотрудников
const EMP_COLORS = {
    default: '#4caf50',
    assigned: '#2196f3',
    unassigned: '#9e9e9e'
};

// Назначения сотрудников
let assignments = JSON.parse(localStorage.getItem('emp_map') || '{}');

// Функция для создания фона круга
function circleBG(building, deg, color) {
    return `conic-gradient(${color} 0deg, ${color} ${deg}deg, transparent ${deg}deg)`;
}

// Функция для открытия панели назначения сотрудников
function openAssignOverlay(building) {
    const overlay = document.getElementById('assign-overlay');
    const grid = document.getElementById('assign-grid');
    grid.innerHTML = '';
    
    // Добавляем кнопку закрытия
    const closeButton = document.createElement('button');
    closeButton.style.cssText = 'position:absolute;top:8px;right:8px;background:none;border:none;color:#fff;font-size:24px;cursor:pointer;z-index:10;';
    closeButton.innerHTML = '&times;';
    closeButton.onclick = () => {
        overlay.style.display = 'none';
    };
    grid.appendChild(closeButton);
    
    // Проверяем, есть ли уже назначенный сотрудник
    const currentEmployee = assignments[building];
    
    // Добавляем кнопку "Снять работника" если есть назначенный сотрудник
    if (currentEmployee) {
        const removeButton = document.createElement('button');
        removeButton.style.cssText = 'grid-column:1/-1;background:#f44336;border:none;border-radius:8px;color:#fff;padding:10px;font-size:14px;font-weight:bold;cursor:pointer;margin-bottom:8px;';
        removeButton.textContent = 'Снять работника';
        removeButton.onclick = () => {
            delete assignments[building];
            localStorage.setItem('emp_map', JSON.stringify(assignments));
            overlay.style.display = 'none';
            if (window.updateInfoPanel) {
                window.updateInfoPanel(building);
            }
        };
        grid.appendChild(removeButton);
    }
    
    // Создаем сетку 2x2 для сотрудников
    employees.forEach(emp => {
        const isAssigned = assignments[building] === emp.name;
        const div = document.createElement('div');
        div.style.cssText = 'background:#2b2b2b;border-radius:8px;padding:12px;display:flex;flex-direction:column;align-items:center;gap:8px;position:relative;';
        
        // Создаем иконку с первой буквой имени
        const iconDiv = document.createElement('div');
        iconDiv.style.cssText = 'width:50px;height:50px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:bold;color:#fff;';
        
        // Цвета для разных сотрудников
        const colors = {
            'Блуми': '#ff9800', // оранжевый
            'Перпи': '#9c27b0', // фиолетовый
            'Реджи': '#f44336', // красный
            'Гринни': '#4caf50',  // зеленый
            'Спайки': '#2196f3'  // синий
        };
        
        iconDiv.style.background = colors[emp.name] || '#666';
        iconDiv.textContent = emp.name.charAt(0);
        
        // Добавляем тег "УСТАНОВЛЕН" если сотрудник назначен
        if (isAssigned) {
            const assignedTag = document.createElement('div');
            assignedTag.style.cssText = 'position:absolute;top:4px;right:4px;background:#4caf50;color:#fff;font-size:10px;font-weight:bold;padding:2px 6px;border-radius:4px;transform:rotate(15deg);';
            assignedTag.textContent = 'УСТАНОВЛЕН';
            div.appendChild(assignedTag);
        }
        
        // Имя сотрудника
        const nameDiv = document.createElement('div');
        nameDiv.style.cssText = 'color:#fff;font-size:14px;font-weight:bold;text-align:center;';
        nameDiv.textContent = emp.name;
        
        // Добавляем элементы в карточку
        div.appendChild(iconDiv);
        div.appendChild(nameDiv);
        
        // Делаем карточку кликабельной только если сотрудник не назначен
        if (!isAssigned) {
            div.style.cursor = 'pointer';
            div.onclick = () => {
                assignments[building] = emp.name;
                localStorage.setItem('emp_map', JSON.stringify(assignments));
                overlay.style.display = 'none';
                if (window.updateInfoPanel) {
                    window.updateInfoPanel(building);
                }
            };
        } else {
            // Если сотрудник назначен, делаем карточку полупрозрачной
            div.style.opacity = '0.6';
        }
        
        grid.appendChild(div);
    });
    
    overlay.style.display = 'flex';
}

// Функция для назначения сотрудника
function assignEmployee(building, empName) {
    if (assignments[building] === empName) {
        // Снимаем сотрудника
        delete assignments[building];
    } else {
        // Назначаем сотрудника
        assignments[building] = empName;
        
    }
    
    // Сохраняем в localStorage
    localStorage.setItem('emp_map', JSON.stringify(assignments));
    
    // Закрываем панель
    document.getElementById('assign-overlay').style.display = 'none';
    
    // Обновляем панель здания
    if (window.updateInfoPanel) {
        window.updateInfoPanel(building);
    }
}

// Функция для получения сотрудника по зданию
function getEmpByBuilding(building) {
    const empName = assignments[building];
    return employees.find(emp => emp.name === empName);
}

// Функция для сохранения назначений
function saveAssignments() {
    localStorage.setItem('emp_map', JSON.stringify(assignments));
}

// Делаем функции глобально доступными
window.openAssignOverlay = openAssignOverlay;
window.assignEmployee = assignEmployee;
window.getEmpByBuilding = getEmpByBuilding;
window.saveAssignments = saveAssignments;
window.getNextUpgradeCost = getNextUpgradeCost;
window.factoryGetNextUpgradeCost = factoryGetNextUpgradeCost;
window.getIncomePerSecond = getIncomePerSecond;
window.getFactoryIncomePerSecond = getFactoryIncomePerSecond;
window.formatNumber = formatNumber;

// Функции обновления панелей
window.updatePanelIncomeDisplay = function() {
    const building = document.getElementById('building-info-panel').dataset.building;
    if (building && window.updateHourlyIncomeInPanel) {
        window.updateHourlyIncomeInPanel();
    }
};

window.updateCollectButtonAmounts = function() {
    const building = document.getElementById('building-info-panel').dataset.building;
    if (building) {
        let bank = 0;
        if (building === 'library') {
            bank = intermediateBalance;
        } else if (building === 'factory') {
            bank = factoryIntermediate;
        }
        
        const btn = document.querySelector('#btn-collect-hour span:last-child');
        if (btn) {
            btn.textContent = window.formatNumber(bank);
        }
    }
};

window.updatePanelProgressBars = function() {
    const building = document.getElementById('building-info-panel').dataset.building;
    if (building) {
        let bank = 0, perSec = 0;
        if (building === 'library') {
            bank = intermediateBalance;
            perSec = window.getIncomePerSecond ? window.getIncomePerSecond() : 0;
        } else if (building === 'factory') {
            bank = factoryIntermediate;
            perSec = window.getFactoryIncomePerSecond ? window.getFactoryIncomePerSecond() : 0;
        }
        
        const percent = perSec > 0 ? Math.min(100, (bank / (perSec * 3600)) * 100) : 0;
        const progressBar = document.querySelector('.progress-bar .fill');
        if (progressBar) {
            progressBar.style.width = percent + '%';
        }
    }
};

window.updateHourlyIncomeInPanel = function() {
    const building = document.getElementById('building-info-panel').dataset.building;
    if (building) {
        let perSec = 0;
        if (building === 'library') {
            perSec = window.getIncomePerSecond ? window.getIncomePerSecond() : 0;
        } else if (building === 'factory') {
            perSec = window.getFactoryIncomePerSecond ? window.getFactoryIncomePerSecond() : 0;
        }
        
        const hourlyIncome = perSec * 3600;
        const display = document.getElementById('hourly-income-display');
        if (display) {
            display.textContent = `Доход в час: ${window.formatNumber(hourlyIncome)}`;
        }
    }
};

window.updateUpgradeCostInPanel = function() {
    const building = document.getElementById('building-info-panel').dataset.building;
    if (building) {
        let cost = 0;
        if (building === 'library') {
            cost = window.getNextUpgradeCost ? window.getNextUpgradeCost() : 0;
        } else if (building === 'factory') {
            cost = window.factoryGetNextUpgradeCost ? window.factoryGetNextUpgradeCost() : 0;
        }
        
        const costDisplay = document.getElementById('upgrade-cost-display');
        if (costDisplay) {
            costDisplay.textContent = window.formatNumber(cost);
        }
    }
};

window.updateLevelInPanel = function() {
    const building = document.getElementById('building-info-panel').dataset.building;
    if (building) {
        let level = 0;
        if (building === 'library') {
            level = upgradesCount;
        } else if (building === 'factory') {
            level = factoryUpgrades;
        }
        
        const levelDisplay = document.getElementById('info-level');
        if (levelDisplay) {
            levelDisplay.textContent = level;
        }
    }
};

// Функции для прямого сбора денег и улучшения
window.collectLibraryMoney = function() {
    if (intermediateBalance > 0) {
        setBalance(getBalance() + intermediateBalance);
        intermediateBalance = 0;
        window.intermediateBalance = 0; // обновляем глобальную переменную
        incomeBank.textContent = formatNumber(intermediateBalance);
        refreshUpgradeCost();
        return true;
    }
    return false;
};

window.collectFactoryMoney = function() {
    if (factoryIntermediate > 0) {
        setBalance(getBalance() + factoryIntermediate);
        factoryIntermediate = 0;
        factoryBankDiv.textContent = formatNumber(factoryIntermediate);
        return true;
    }
    return false;
};

window.upgradeLibraryDirectly = function() {
    const cost = getNextUpgradeCost();
    if (getBalance() >= cost) {
        setBalance(getBalance() - cost);
        upgradesCount++;
        saveProgress();
        
        // Отслеживание улучшения библиотеки в PostHog
        if (window.posthogService && window.posthogService.isReady()) {
            window.posthogService.trackBuildingUpgraded('Библиотека', 'library', cost, upgradesCount);
        }
        
        return true;
    }
    return false;
};

window.upgradeFactoryDirectly = function() {
    const cost = factoryGetNextUpgradeCost();
    if (getBalance() >= cost) {
        setBalance(getBalance() - cost);
        factoryUpgrades++;
        saveFactory();
        
        // Отслеживание улучшения завода в PostHog
        if (window.posthogService && window.posthogService.isReady()) {
            window.posthogService.trackBuildingUpgraded('Завод', 'factory', cost, factoryUpgrades);
        }
        
        return true;
    }
    return false;
};

window.upgradeStorageDirectly = function() {
    const cost = storageNextCost();
    if (getBalance() >= cost) {
        setBalance(getBalance() - cost);
        storageUpgrades++;
        storageCapacity = STORAGE_BASE_CAP + storageUpgrades * STORAGE_INC;
        saveStorage();
        updateStorageUI();
        updateStorageUpgradeCost();
        addXP(storageUpgrades);
        return true;
    }
    return false;
};

function starsHTML(r){let s='';for(let i=1;i<=5;i++){s+=i<=r?'★':'☆';}return `<span style="color:#ffeb3b;font-size:12px">${s}</span>`;}

function renderCharacters(filter = 'all'){
    const container = document.getElementById('characters-content');
    if (!container) {
        console.error('Characters content container not found');
        return;
    }
    
    // Находим или создаем контейнер для содержимого
    let contentContainer = container.querySelector('.characters-content-container');
    if (!contentContainer) {
        contentContainer = document.createElement('div');
        contentContainer.className = 'characters-content-container';
        contentContainer.style.cssText = 'width:100%;';
        container.appendChild(contentContainer);
    }
    
    contentContainer.innerHTML = '';
    
    // Получаем данные о нанятых персонажах
    const hiredEmployees = JSON.parse(localStorage.getItem('hiredEmployees')) || {};
    
    // Данные персонажей (4 основных + robo-blumy и pinky если получены)
    // ID должны соответствовать ключам в hiredEmployees: 'grinni', 'purpe', 'redjy', 'blumy', 'robo-blumy', 'pinky'
    const baseCharacters = [
        {
            id: 'blumy',
            name: 'Блуми',
            image: 'assets/svg/characters-panel/blumy.svg',
            level: 1,
            skill: 'Бегущая почта',
            rarity: 1
        },
        {
            id: 'redjy',
            name: 'Реджи',
            image: 'assets/svg/characters-panel/redjy.svg',
            level: 1,
            skill: 'Калькулятор',
            rarity: 1
        },
        {
            id: 'grinni',
            name: 'Гринни',
            image: 'assets/svg/characters-panel/grinny.svg', // Файл называется grinny.svg, но ID - grinni
            level: 1,
            skill: 'Лояльность',
            rarity: 3
        },
        {
            id: 'purpe',
            name: 'Пёрпи',
            image: 'assets/svg/characters-panel/purpe.svg',
            level: 1,
            skill: 'Менеджер',
            rarity: 4
        }
    ];
    
    // Проверяем, получен ли robo-blumy из ультра подарка и pinky из Rare кейса
    const availableCharacters = JSON.parse(localStorage.getItem('availableCharacters') || '[]');
    const charactersData = [...baseCharacters];
    
    if(availableCharacters.includes('robo-blumy')){
        charactersData.push({
            id: 'robo-blumy',
            name: 'Робо-Блуми',
            image: 'assets/svg/characters-panel/robo-blumy.svg',
            level: 1,
            skill: 'Программист',
            rarity: 5
        });
    }
    
    if(availableCharacters.includes('pinky')){
        charactersData.push({
            id: 'pinky',
            name: 'Пинки',
            image: 'assets/svg/characters-panel/pinky.svg',
            level: 1,
            skill: 'Обаяние',
            rarity: 4
        });
    }
    
    // Фильтруем персонажей
    let charactersToShow = charactersData;
    if (filter === 'available') {
        // Показываем только не нанятых персонажей
        // hiredEmployees структура: { 'grinni': 'library', 'blumy': 'factory', ... }
        charactersToShow = charactersData.filter(char => {
            // Проверяем, не нанят ли персонаж (если его ID есть в ключах hiredEmployees)
            return !hiredEmployees.hasOwnProperty(char.id);
        });
    }
    
    // Создаем карточки персонажей
    charactersToShow.forEach(char => {
        const isRoboBlumy = char.id === 'robo-blumy';
        const isPinky = char.id === 'pinky';
        
        // Стили карточки
        let cardStyle = 'background:rgba(60,60,60,0.95);border-radius:12px;padding:12px;margin-bottom:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(0,0,0,0.3);border:1px solid rgba(255,255,255,0.1);';
        if(isRoboBlumy){
            cardStyle = 'background:linear-gradient(135deg, rgba(255,215,0,0.2) 0%, rgba(255,193,7,0.2) 100%);border-radius:12px;padding:12px;margin-bottom:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(255,215,0,0.3);border:2px solid rgba(255,215,0,0.5);';
        } else if(isPinky){
            cardStyle = 'background:linear-gradient(135deg, rgba(138,43,226,0.2) 0%, rgba(75,0,130,0.2) 100%);border-radius:12px;padding:12px;margin-bottom:12px;display:flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(138,43,226,0.3);border:2px solid rgba(138,43,226,0.5);';
        }
        
        const card = document.createElement('div');
        card.style.cssText = cardStyle;
        
        // Изображение персонажа
        const imageDiv = document.createElement('div');
        if(isRoboBlumy || isPinky){
            imageDiv.style.cssText = 'flex-shrink:0;width:80px;height:80px;border-radius:8px;overflow:visible;display:flex;align-items:center;justify-content:center;';
        } else {
            imageDiv.style.cssText = 'flex-shrink:0;width:80px;height:80px;border-radius:8px;overflow:hidden;';
        }
        const img = document.createElement('img');
        img.src = char.image;
        img.alt = char.name;
        if(isRoboBlumy){
            img.style.cssText = 'width:120%;height:120%;object-fit:contain;transform:scale(1.2);';
        } else if(isPinky){
            img.style.cssText = 'width:100%;height:100%;object-fit:contain;';
        } else {
            img.style.cssText = 'width:100%;height:100%;object-fit:contain;';
        }
        img.onerror = function() { this.style.display='none'; };
        imageDiv.appendChild(img);
        
        // Информация о персонаже
        const infoDiv = document.createElement('div');
        infoDiv.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:4px;';
        
        // Имя
        const nameDiv = document.createElement('div');
        nameDiv.style.cssText = 'font-size:16px;font-weight:700;color:#fff;margin-bottom:2px;';
        nameDiv.textContent = char.name;
        
        // Уровень
        const levelDiv = document.createElement('div');
        levelDiv.style.cssText = 'font-size:11px;color:rgba(255,255,255,0.8);display:flex;justify-content:space-between;';
        levelDiv.innerHTML = '<span>Уровень</span><span style="color:#fff;font-weight:600;">' + char.level + '</span>';
        
        // Навык
        const skillDiv = document.createElement('div');
        skillDiv.style.cssText = 'font-size:11px;color:rgba(255,255,255,0.8);display:flex;justify-content:space-between;';
        skillDiv.innerHTML = '<span>Навык</span><span style="color:#fff;font-weight:600;">' + char.skill + '</span>';
        
        // Редкость
        const rarityDiv = document.createElement('div');
        rarityDiv.style.cssText = 'font-size:11px;color:rgba(255,255,255,0.8);display:flex;justify-content:space-between;align-items:center;';
        const rarityLabel = document.createElement('span');
        rarityLabel.textContent = 'Редкость';
        const rarityText = document.createElement('span');
        if(isRoboBlumy){
            rarityText.textContent = 'Уникальный';
            rarityText.style.cssText = 'color:#fff;font-size:11px;font-weight:700;';
        } else if(isPinky){
            rarityText.textContent = 'Epic';
            rarityText.style.cssText = 'color:#fff;font-size:11px;font-weight:700;';
        } else {
            rarityText.textContent = 'Базовая';
            rarityText.style.cssText = 'color:#fff;font-size:11px;';
        }
        rarityDiv.appendChild(rarityLabel);
        rarityDiv.appendChild(rarityText);
        
        // Бонус для robo-blumy и pinky
        if(isRoboBlumy){
            const bonusDiv = document.createElement('div');
            bonusDiv.style.cssText = 'font-size:11px;color:rgba(255,215,0,0.9);display:flex;justify-content:space-between;align-items:center;margin-top:4px;';
            const bonusLabel = document.createElement('span');
            bonusLabel.textContent = 'Бонус';
            const bonusText = document.createElement('span');
            bonusText.textContent = 'x15 к прибыли';
            bonusText.style.cssText = 'color:#ffd700;font-size:11px;font-weight:700;text-shadow:0 0 4px rgba(255,215,0,0.5);';
            bonusDiv.appendChild(bonusLabel);
            bonusDiv.appendChild(bonusText);
            infoDiv.appendChild(bonusDiv);
        } else if(isPinky){
            const bonusDiv = document.createElement('div');
            bonusDiv.style.cssText = 'font-size:11px;color:rgba(138,43,226,0.9);display:flex;justify-content:space-between;align-items:center;margin-top:4px;';
            const bonusLabel = document.createElement('span');
            bonusLabel.textContent = 'Бонус';
            const bonusText = document.createElement('span');
            bonusText.textContent = 'x5 к прибыли';
            bonusText.style.cssText = 'color:#8a2be2;font-size:11px;font-weight:700;text-shadow:0 0 4px rgba(138,43,226,0.5);';
            bonusDiv.appendChild(bonusLabel);
            bonusDiv.appendChild(bonusText);
            infoDiv.appendChild(bonusDiv);
        }
        
        infoDiv.appendChild(nameDiv);
        infoDiv.appendChild(levelDiv);
        infoDiv.appendChild(skillDiv);
        infoDiv.appendChild(rarityDiv);
        
        card.appendChild(imageDiv);
        card.appendChild(infoDiv);
        
        contentContainer.appendChild(card);
    });
    
    // Если нет персонажей для отображения
    if (charactersToShow.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.style.cssText = 'text-align:center;padding:40px 20px;color:rgba(255,255,255,0.6);font-size:14px;';
        emptyDiv.textContent = filter === 'available' ? 'Все персонажи наняты' : 'Нет персонажей';
        contentContainer.appendChild(emptyDiv);
    }
}

// Tab switching for characters
function switchCharacterTab(filter) {
    // Убираем активный класс со всех кнопок
    document.querySelectorAll('.char-filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = 'rgba(255,255,255,0.1)';
        btn.style.color = 'rgba(255,255,255,0.7)';
        btn.style.boxShadow = 'none';
        btn.style.border = '1px solid rgba(255,255,255,0.2)';
    });
    
    // Активируем нужную кнопку
    if (filter === 'available') {
        const availableBtn = document.getElementById('char-tab-available');
        if (availableBtn) {
            availableBtn.classList.add('active');
            availableBtn.style.background = 'linear-gradient(135deg, #2196f3, #1976d2)';
            availableBtn.style.color = 'white';
            availableBtn.style.boxShadow = '0 2px 8px rgba(33,150,243,0.3)';
            availableBtn.style.border = 'none';
        }
    } else if (filter === 'all') {
        const allBtn = document.getElementById('char-tab-all');
        if (allBtn) {
            allBtn.classList.add('active');
            allBtn.style.background = 'linear-gradient(135deg, #2196f3, #1976d2)';
            allBtn.style.color = 'white';
            allBtn.style.boxShadow = '0 2px 8px rgba(33,150,243,0.3)';
            allBtn.style.border = 'none';
        }
    }
    
    // Показываем персонажей мгновенно
    renderCharacters(filter);
}

// Делаем функцию глобально доступной
window.switchCharacterTab = switchCharacterTab;

// Делаем функцию обновления счетчика персонажей глобально доступной
window.updateCharactersCount = updateCharactersCount;
window.getCharactersCount = getCharactersCount;

// Делаем переменные глобально доступными
window.upgradesCount = upgradesCount;
window.factoryUpgrades = factoryUpgrades;
window.intermediateBalance = intermediateBalance;
window.factoryIntermediate = factoryIntermediate;

// Удаляем старый обработчик кнопки заданий (дублирует новый)
safeAddEventListener('tasks-back', 'click', () => {
    hidePanelWithAnimation('tasks-panel', () => {
    setActiveNavButton(0); // сбрасываем активное состояние
    });
});

// Tab switching
safeAddEventListener('tab-social', 'click', () => {
    document.querySelectorAll('.task-tab').forEach(tab=>{
        tab.style.background='none';
        tab.classList.remove('active');
    });
    const tabSocial = document.getElementById('tab-social');
    if(tabSocial) {
        tabSocial.style.background='#2d2d2d';
        tabSocial.classList.add('active');
    }
    renderTasks('social');
});

safeAddEventListener('tab-booke', 'click', () => {
    document.querySelectorAll('.task-tab').forEach(tab=>{
        tab.style.background='none';
        tab.classList.remove('active');
    });
    const tabBooke = document.getElementById('tab-booke');
    if(tabBooke) {
        tabBooke.style.background='#2d2d2d';
        tabBooke.classList.add('active');
    }
    renderTasks('booke');
});

function renderTasks(category='social'){
    const container = document.getElementById('tasks-list');
    container.innerHTML = '';
    
    const tasks = category === 'social' ? socialTasks : bookeTasks;
    
    tasks.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.style.cssText = 'background:#5a5a5a;border-radius:16px;padding:16px;margin-bottom:8px;color:#fff;';
        
        taskDiv.innerHTML = `
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <h4 style="margin:0;font-size:16px;font-weight:700;color:#fff;">${task.title}</h4>
                <span style="background:#2d2d2d;color:#fff;padding:4px 8px;border-radius:6px;font-size:12px;font-weight:600;">${task.reward}</span>
            </div>
            <p style="margin:0 0 12px;font-size:14px;color:#ccc;line-height:1.4;">${task.description}</p>
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:12px;color:#ccc;">Прогресс: ${task.progress}/${task.target}</span>
                <button style="background:#2d2d2d;border:none;color:#fff;padding:8px 16px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;${task.progress >= task.target ? '' : 'opacity:0.5;cursor:not-allowed;'}">${task.progress >= task.target ? 'Получить' : 'В процессе'}</button>
            </div>
        `;
        
        container.appendChild(taskDiv);
    });
}

// // Create task button handler
// document.getElementById('create-task-btn').addEventListener('click',()=>{
//     alert('Функция создания заданий пока не реализована');
// }

// === NAVIGATION ACTIVE STATE MANAGEMENT ===
function setActiveNavButton(buttonIndex) {
    // Убираем активное состояние со всех кнопок
    document.querySelectorAll('#bottom-nav button').forEach((btn, index) => {
        btn.classList.remove('active');
        btn.style.color = '#666'; // серый цвет для неактивных
    });
    
    // Устанавливаем активное состояние для выбранной кнопки
    const activeButton = document.querySelector(`#bottom-nav button:nth-child(${buttonIndex})`);
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.style.color = '#fff'; // белый цвет для активной
    }
}

// === SIDE PANEL ACTIVE STATE MANAGEMENT ===
function setActiveSideButton(buttonId) {
    // Убираем активное состояние со всех кнопок боковой панели
    document.querySelectorAll('.side-btn').forEach((btn) => {
        btn.classList.remove('panel-active');
    });
    
    // Устанавливаем активное состояние для выбранной кнопки
    const activeButton = document.getElementById(buttonId);
    if (activeButton) {
        activeButton.classList.add('panel-active');
    }
}

function clearActiveSideButton() {
    // Убираем активное состояние со всех кнопок боковой панели
    document.querySelectorAll('.side-btn').forEach((btn) => {
        btn.classList.remove('panel-active');
    });
}

// === BOTTOM NAVIGATION HANDLERS ===
// Магазин (1-я кнопка)
document.querySelector('#bottom-nav button:nth-child(1)').addEventListener('click',()=>{
    if (isAnyPanelOpen()) return; // Блокируем если открыта любая панель
    setActiveNavButton(1);
    showPanelWithAnimation('shop-panel');
});

// Персонажи (2-я кнопка)
document.querySelector('#bottom-nav button:nth-child(2)').addEventListener('click',()=>{
    if (isAnyPanelOpen()) return; // Блокируем если открыта любая панель
    setActiveNavButton(2);
    // Обновляем содержимое сразу при открытии
    renderCharacters('all');
    showPanelWithAnimation('characters-panel');
});

// Город (3-я кнопка)
document.querySelector('#bottom-nav button:nth-child(3)').addEventListener('click',()=>{
    if (isAnyPanelOpen()) return; // Блокируем если открыта любая панель
    setActiveNavButton(3);
    updateCityButtons();
    renderCity();
    showPanelWithAnimation('city-panel');
});

// Задания (4-я кнопка) - обработчик перенесен в tasks-swap.js
// document.querySelector('#bottom-nav button:nth-child(4)').addEventListener('click',()=>{
//     if (isAnyPanelOpen()) return; // Блокируем если открыта любая панель
//     setActiveNavButton(4);
//     renderTasks();
//     showPanelWithAnimation('tasks-panel');
// });

// Профиль (5-я кнопка)
document.querySelector('#bottom-nav button:nth-child(5)').addEventListener('click',()=>{
    if (isAnyPanelOpen()) return; // Блокируем если открыта любая панель
    setActiveNavButton(5);
    showPanelWithAnimation('profile-panel');
});

// Удаляем дублирующий обработчик для кнопки профиля

// === BOTTOM BANNER HANDLER ===
// Обработчик клика на bottom-banner
const bottomBanner = document.getElementById('bottom-banner');
if (bottomBanner) {
    bottomBanner.addEventListener('click', () => {
        if (isAnyPanelOpen()) return; // Блокируем если открыта любая панель
        showPanelWithAnimation('bottom-banner-panel');
    });
}

// === PANEL CLOSE HANDLERS ===
// Закрытие панелей сбрасывает активное состояние
safeAddEventListener('shop-close', 'click', () => {
    hidePanelWithAnimation('shop-panel', () => {
    setActiveNavButton(0); // сбрасываем активное состояние
    });
});

safeAddEventListener('chars-close', 'click', () => {
    hidePanelWithAnimation('characters-panel', () => {
    setActiveNavButton(0); // сбрасываем активное состояние
    });
});

safeAddEventListener('city-close', 'click', () => {
    hidePanelWithAnimation('city-panel', () => {
    setActiveNavButton(0); // сбрасываем активное состояние
    });
});

safeAddEventListener('tasks-back', 'click', () => {
    hidePanelWithAnimation('tasks-panel', () => {
    setActiveNavButton(0); // сбрасываем активное состояние
    });
});

safeAddEventListener('profile-close', 'click', () => {
    hidePanelWithAnimation('profile-panel', () => {
    setActiveNavButton(0); // сбрасываем активное состояние
    });
});

safeAddEventListener('bottom-banner-close', 'click', () => {
    hidePanelWithAnimation('bottom-banner-panel');
});

// === INVENTORY SYSTEM REMOVED ===
// Все функции инвентаря были удалены, так как панель инвентаря больше не используется

// === NAVIGATION ACTIVE STATE MANAGEMENT ===

// === SHOP PANEL ===
// Система переключения денег в первой ячейке
let currentMoneyIndex = 0;
const moneyItems = [
    { name: 'Some money', image: 'assets/svg/shop/Some money.svg', amount: 20000, cost: 150, discount: 20 },
    { name: 'Lots of money', image: 'assets/svg/shop/Lots of money.svg', amount: 40000, cost: 300, discount: 25 },
    { name: 'Money Mountain', image: 'assets/svg/shop/Money Mountain.svg', amount: 80000, cost: 450, discount: 30 }
];

// Система переключения алмазов во второй ячейке
let currentDiamondsIndex = 0;
const diamondsItems = [
    { name: 'A few diamonds', image: 'assets/svg/shop/A few diamonds.svg', amount: 100, cost: 60000, discount: 15 },
    { name: 'Lots of diamonds', image: 'assets/svg/shop/Lots of diamonds.svg', amount: 250, cost: 120000, discount: 22 },
    { name: 'Mountain of diamonds', image: 'assets/svg/shop/Mountain of diamonds.svg', amount: 500, cost: 195000, discount: 30 }
];

// Система переключения кейсов в третьей ячейке
let currentCasesIndex = 0;
let isLegendCaseFromCell6 = false; // Флаг для определения Legend case из ячейки 6
let isUltimaCaseFromCell7 = false; // Флаг для определения Ultima case из ячейки 7
let isRareCaseFromCell4 = false; // Флаг для определения Rare case из ячейки 4
let isEpicCaseFromCell5 = false; // Флаг для определения Epic case из ячейки 5
let currentCaseItem = null; // Текущий открываемый кейс (для Rare, Epic, Legend, Ultima cases)
const casesItems = [
    { name: 'Money case', image: 'assets/svg/shop/Money case.svg', amount: 1, cost: 200, starsPrice: 20, discount: 15 },
    { name: 'Diamond case', image: 'assets/svg/shop/Diamond case.svg', amount: 1, cost: 100, starsPrice: 39, discount: 10 },
    { name: 'Legendary case', image: 'assets/svg/shop/legendary case.svg', amount: 1, cost: 500, starsPrice: 69, discount: 20 }
];

function initializeShop() {
    // Инициализация системы переключения денег
    const leftArrow = document.getElementById('shop-money-left-arrow');
    const rightArrow = document.getElementById('shop-money-right-arrow');
    const buyBtn = document.getElementById('shop-buy-btn');
    
    if (leftArrow) {
        leftArrow.addEventListener('click', () => switchMoney('prev'));
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', () => switchMoney('next'));
    }
    
    if (buyBtn) {
        buyBtn.addEventListener('click', buyMoney);
    }
    
    // Инициализация системы переключения алмазов
    const diamondsLeftArrow = document.getElementById('shop-diamonds-left-arrow');
    const diamondsRightArrow = document.getElementById('shop-diamonds-right-arrow');
    const buyDiamondsBtn = document.getElementById('shop-buy-diamonds-btn');
    
    if (diamondsLeftArrow) {
        diamondsLeftArrow.addEventListener('click', () => switchDiamonds('prev'));
    }
    
    if (diamondsRightArrow) {
        diamondsRightArrow.addEventListener('click', () => switchDiamonds('next'));
    }
    
    if (buyDiamondsBtn) {
        buyDiamondsBtn.addEventListener('click', buyDiamonds);
    }
    
    // Инициализация системы переключения кейсов
    const casesLeftArrow = document.getElementById('shop-cases-left-arrow');
    const casesRightArrow = document.getElementById('shop-cases-right-arrow');
    const buyCasesBtn = document.getElementById('shop-buy-cases-btn');
    
    if (casesLeftArrow) {
        casesLeftArrow.addEventListener('click', () => switchCases('prev'));
    }
    
    if (casesRightArrow) {
        casesRightArrow.addEventListener('click', () => switchCases('next'));
    }
    
    if (buyCasesBtn) {
        buyCasesBtn.addEventListener('click', buyCases);
    }
    
    // Инициализация кнопки покупки Rare кейса
    const buyRareCaseBtn = document.getElementById('shop-buy-rare-case-btn');
    if (buyRareCaseBtn) {
        buyRareCaseBtn.addEventListener('click', () => {
            // Rare case пока бесплатный
            handleRareCasePurchase();
        });
    }
    
    // Обработчик кнопки покупки Epic case
    const buyEpicCaseBtn = document.getElementById('shop-buy-epic-case-btn');
    if (buyEpicCaseBtn) {
        buyEpicCaseBtn.addEventListener('click', () => {
            // Epic case пока бесплатный (как Rare case)
            handleEpicCasePurchase();
        });
    }
    
    // Инициализация кнопки покупки Legend case
    const buyLegendCaseBtn = document.getElementById('shop-buy-legend-case-btn');
    if (buyLegendCaseBtn) {
        buyLegendCaseBtn.addEventListener('click', () => {
            // Legend case пока бесплатный
            handleLegendCasePurchase();
        });
    }
    
    // Инициализация кнопки покупки Ultima case
    const buyUltimaCaseBtn = document.getElementById('shop-buy-ultima-case-btn');
    if (buyUltimaCaseBtn) {
        buyUltimaCaseBtn.addEventListener('click', () => {
            // Ultima case пока бесплатный
            handleUltimaCasePurchase();
        });
    }
    
    // Инициализация кнопки шансов
    const oddsBtn = document.getElementById('shop-cases-odds-btn');
    if (oddsBtn) {
        oddsBtn.addEventListener('click', showCaseOdds);
    }
    
    // Инициализация кнопки шансов для Rare case
    const rareCaseOddsBtn = document.getElementById('shop-rare-case-odds-btn');
    if (rareCaseOddsBtn) {
        rareCaseOddsBtn.addEventListener('click', () => {
            // Устанавливаем флаг, что это Rare case из ячейки 4
            isRareCaseFromCell4 = true;
            // Устанавливаем индекс на Diamond case (используем любой существующий элемент для инициализации)
            currentCasesIndex = 1; // Diamond case
            showCaseOdds();
        });
    }
    
    // Инициализация кнопки шансов для Epic case
    const epicCaseOddsBtn = document.getElementById('shop-epic-case-odds-btn');
    if (epicCaseOddsBtn) {
        epicCaseOddsBtn.addEventListener('click', () => {
            // Устанавливаем флаг, что это Epic case из ячейки 5
            isEpicCaseFromCell5 = true;
            // Устанавливаем индекс на Diamond case (используем любой существующий элемент для инициализации)
            currentCasesIndex = 1; // Diamond case
            showCaseOdds();
        });
    }
    
    // Инициализация кнопки шансов для Legend case
    const legendCaseOddsBtn = document.getElementById('shop-legend-case-odds-btn');
    if (legendCaseOddsBtn) {
        legendCaseOddsBtn.addEventListener('click', () => {
            // Устанавливаем флаг, что это Legend case из ячейки 6
            isLegendCaseFromCell6 = true;
            // Устанавливаем индекс на Legendary case
            const legendCaseIndex = casesItems.findIndex(item => item.name === 'Legendary case');
            if (legendCaseIndex !== -1) {
                currentCasesIndex = legendCaseIndex;
                showCaseOdds();
            }
        });
    }
    
    // Инициализация кнопки шансов для Ultima case
    const ultimaCaseOddsBtn = document.getElementById('shop-ultima-case-odds-btn');
    if (ultimaCaseOddsBtn) {
        ultimaCaseOddsBtn.addEventListener('click', () => {
            // Устанавливаем флаг, что это Ultima case из ячейки 7
            isUltimaCaseFromCell7 = true;
            // Устанавливаем индекс на Legendary case (используем тот же элемент)
            const ultimaCaseIndex = casesItems.findIndex(item => item.name === 'Legendary case');
            if (ultimaCaseIndex !== -1) {
                currentCasesIndex = ultimaCaseIndex;
                showCaseOdds();
            }
        });
    }
    
    // Инициализация закрытия панели шансов
    const oddsCloseBtn = document.getElementById('case-odds-close');
    const oddsPanel = document.getElementById('case-odds-panel');
    if (oddsCloseBtn) {
        oddsCloseBtn.addEventListener('click', () => {
            if (oddsPanel) {
                oddsPanel.style.display = 'none';
            }
        });
    }
    // Закрытие при клике на фон
    if (oddsPanel) {
        oddsPanel.addEventListener('click', (e) => {
            if (e.target === oddsPanel) {
                oddsPanel.style.display = 'none';
            }
        });
    }
    
    // Устанавливаем начальные изображения
    updateMoneyDisplay();
    updateDiamondsDisplay();
    updateCasesDisplay();
    
    // Добавляем XTR иконки в кнопки rare/epic/legend/ultima case
    addXtrIconsToSpecialCases();
}

// Функция для добавления XTR иконок в кнопки special cases
function addXtrIconsToSpecialCases() {
    const cases = [
        { priceId: 'shop-rare-case-price', name: 'Rare case', price: 25 },
        { priceId: 'shop-epic-case-price', name: 'Epic case', price: 60 },
        { priceId: 'shop-legend-case-price', name: 'Legend case', price: 149 },
        { priceId: 'shop-ultima-case-price', name: 'Ultima case', price: 199 }
    ];
    
    cases.forEach(caseInfo => {
        const priceElement = document.getElementById(caseInfo.priceId);
        if (priceElement) {
            // Устанавливаем цену
            priceElement.textContent = caseInfo.price;
            
            // Удаляем старую иконку XTR, если есть
            const oldIcon = priceElement.querySelector('.xtr-icon');
            if (oldIcon) {
                oldIcon.remove();
            }
            
            // Добавляем иконку XTR
            const xtrIcon = document.createElement('img');
            xtrIcon.src = 'assets/svg/XTR.svg';
            xtrIcon.style.width = '18px';
            xtrIcon.style.height = '18px';
            priceElement.appendChild(xtrIcon);
        }
    });
}

function switchMoney(direction) {
    if (direction === 'next') {
        currentMoneyIndex = (currentMoneyIndex + 1) % moneyItems.length;
    } else {
        currentMoneyIndex = (currentMoneyIndex - 1 + moneyItems.length) % moneyItems.length;
    }
    
    updateMoneyDisplay();
}

function updateMoneyDisplay() {
    const moneyImage = document.getElementById('shop-money-image');
    const moneyTitle = document.getElementById('shop-money-title');
    
    if (moneyImage && moneyItems[currentMoneyIndex]) {
        moneyImage.style.opacity = '0';
        
        setTimeout(() => {
            const item = moneyItems[currentMoneyIndex];
            
            moneyImage.src = item.image;
            moneyImage.alt = item.name;
            
            // Увеличиваем подсветку SVG в 2 раза
            moneyImage.style.filter = 'drop-shadow(0 0 16px rgba(255,255,255,0.5))';
            
            // Обновляем заголовок
            if (moneyTitle) {
                moneyTitle.textContent = item.name;
            }
            
            // Обновляем цену на кнопке (стоимость в RBC с SVG)
            const buyPrice = document.getElementById('shop-buy-price');
            if (buyPrice && item.cost) {
                buyPrice.innerHTML = `${item.cost}<img src="assets/svg/rbc-icon.svg" alt="RBC" style="width:12px;height:12px;object-fit:contain;">`;
            }
            
            // Обновляем получаемую сумму (количество денег с SVG)
            const amountDisplay = document.getElementById('shop-money-amount-display');
            if (amountDisplay && item.amount) {
                amountDisplay.innerHTML = `${item.amount.toLocaleString('ru-RU')}<img src="assets/svg/bc-icon.svg" alt="Money" style="width:14px;height:14px;object-fit:contain;">`;
            }
            
            moneyImage.style.opacity = '1';
        }, 150);
    }
}

function buyMoney() {
    const item = moneyItems[currentMoneyIndex];
    if (!item) return;
    
    const currentCredits = getCredits();
    
    // Проверяем баланс RBC
    if (currentCredits < item.cost) {
            alert('Недостаточно RBC!');
            return;
        }
    
    // Списываем RBC
    setCredits(currentCredits - item.cost);
    
    // Закрываем панель
    hidePanelWithAnimation('shop-panel', () => {
        // Запускаем анимацию полета денег из центра экрана
        // Пополнение баланса произойдет после завершения анимации
        animateShopMoneyCollection(item.amount, () => {
            // Начисляем деньги после завершения анимации
            const currentBalance = getBalance();
            setBalance(currentBalance + item.amount);
        });
    });
}

// Функции для алмазов
function switchDiamonds(direction) {
    if (direction === 'next') {
        currentDiamondsIndex = (currentDiamondsIndex + 1) % diamondsItems.length;
    } else {
        currentDiamondsIndex = (currentDiamondsIndex - 1 + diamondsItems.length) % diamondsItems.length;
    }
    
    updateDiamondsDisplay();
}

function updateDiamondsDisplay() {
    const diamondsImage = document.getElementById('shop-diamonds-image');
    const diamondsTitle = document.getElementById('shop-diamonds-title');
    
    if (diamondsImage && diamondsItems[currentDiamondsIndex]) {
        diamondsImage.style.opacity = '0';
        
        setTimeout(() => {
            const item = diamondsItems[currentDiamondsIndex];
            
            diamondsImage.src = item.image;
            diamondsImage.alt = item.name;
            
            // Увеличиваем подсветку SVG в 2 раза
            diamondsImage.style.filter = 'drop-shadow(0 0 16px rgba(255,255,255,0.5))';
            
            // Обновляем заголовок
            if (diamondsTitle) {
                diamondsTitle.textContent = item.name;
            }
            
            // Обновляем цену на кнопке (стоимость в деньгах с SVG)
            const buyPrice = document.getElementById('shop-diamonds-price');
            if (buyPrice && item.cost) {
                buyPrice.innerHTML = `${item.cost.toLocaleString('ru-RU')}<img src="assets/svg/bc-icon.svg" alt="Money" style="width:12px;height:12px;object-fit:contain;">`;
            }
            
            // Обновляем получаемую сумму (количество RBC с SVG)
            const amountDisplay = document.getElementById('shop-diamonds-amount-display');
            if (amountDisplay && item.amount) {
                amountDisplay.innerHTML = `${formatNumber(item.amount)}<img src="assets/svg/rbc-icon.svg" alt="RBC" style="width:14px;height:14px;object-fit:contain;">`;
            }
            
            diamondsImage.style.opacity = '1';
        }, 150);
    }
}

function buyDiamonds() {
    const item = diamondsItems[currentDiamondsIndex];
    if (!item) return;
    
    const currentBalance = getBalance();
    
    // Проверяем баланс денег
    if (currentBalance < item.cost) {
        alert('Недостаточно денег!');
            return;
        }
    
    // Списываем деньги
    setBalance(currentBalance - item.cost);
    
    // Закрываем панель
    hidePanelWithAnimation('shop-panel', () => {
        // Запускаем анимацию полета RBC из центра экрана
        // Пополнение RBC произойдет после завершения анимации
        animateShopRBCCollection(item.amount, () => {
            // Начисляем RBC после завершения анимации
            const currentCredits = getCredits();
            setCredits(currentCredits + item.amount);
        });
    });
}

// Функции для кейсов
function switchCases(direction) {
    if (direction === 'next') {
        currentCasesIndex = (currentCasesIndex + 1) % casesItems.length;
    } else {
        currentCasesIndex = (currentCasesIndex - 1 + casesItems.length) % casesItems.length;
    }
    
    updateCasesDisplay();
}

function updateCasesDisplay() {
    const casesImage = document.getElementById('shop-cases-image');
    const casesTitle = document.getElementById('shop-cases-title');
    
    if (casesImage && casesItems[currentCasesIndex]) {
        casesImage.style.opacity = '0';
        
        setTimeout(() => {
            const item = casesItems[currentCasesIndex];
            
            casesImage.src = item.image;
            casesImage.alt = item.name;
            
            // Увеличиваем подсветку SVG в 2 раза
            casesImage.style.filter = 'drop-shadow(0 0 16px rgba(255,255,255,0.5))';
            
            // Обновляем заголовок
            if (casesTitle) {
                casesTitle.textContent = item.name;
            }
            
            // Обновляем процент выгоды
            const discountValue = document.getElementById('shop-cases-discount-value');
            if (discountValue) {
                if (item.name === 'Money case') {
                    discountValue.textContent = '40%';
                } else if (item.name === 'Diamond case') {
                    discountValue.textContent = '40%';
                } else if (item.name === 'Legendary case') {
                    discountValue.textContent = '60%';
                }
            }
            
            // Обновляем цену на кнопке (в звездах Telegram)
            const buyPrice = document.getElementById('shop-cases-price');
            const buyButton = document.getElementById('shop-buy-cases-btn');
            if (buyPrice && item.starsPrice) {
                buyPrice.textContent = item.starsPrice;
                // Удаляем старую иконку XTR, если есть
                const oldIcon = buyPrice.querySelector('.xtr-icon');
                if (oldIcon) {
                    oldIcon.remove();
                }
                // Добавляем иконку XTR внутрь span с ценой
                if (buyPrice) {
                    const xtrIcon = document.createElement('img');
                    xtrIcon.className = 'xtr-icon';
                    xtrIcon.src = 'assets/svg/XTR.svg';
                    xtrIcon.alt = 'XTR';
                    xtrIcon.style.width = '36px';
                    xtrIcon.style.height = '36px';
                    xtrIcon.style.objectFit = 'contain';
                    xtrIcon.style.pointerEvents = 'none';
                    buyPrice.appendChild(xtrIcon);
                }
            }
            
            casesImage.style.opacity = '1';
        }, 150);
    }
}

// Награды для кейсов (в порядке от меньшей к большей)
// Система весов: чем больше сумма, тем меньше вес (меньше шанс выпадения)
const caseRewards = [
    { amount: 1500, weight: 35 },      // Очень высокий шанс (35%)
    { amount: 4000, weight: 28 },       // Высокий шанс (28%)
    { amount: 7000, weight: 18 },       // Средний шанс (18%)
    { amount: 15000, weight: 10 },     // Средний шанс (10%)
    { amount: 20000, weight: 5 },       // Низкий шанс (5%)
    { amount: 35000, weight: 2.5 },     // Низкий шанс (2.5%)
    { amount: 50000, weight: 1 },       // Очень низкий шанс (1%)
    { amount: 75000, weight: 0.4 },     // Редкий шанс (0.4%)
    { amount: 100000, weight: 0.08 },   // Очень редкий шанс (0.08%)
    { amount: 250000, weight: 0.02 }    // Экстремально редкий шанс (0.02%)
];

// Награды для Money case (в порядке от меньшей к большей)
const moneyCaseRewards = [
    { amount: 400000, weight: 35 },      // Очень высокий шанс (35%)
    { amount: 900000, weight: 28 },      // Высокий шанс (28%)
    { amount: 1500000, weight: 18 },     // Средний шанс (18%)
    { amount: 2000000, weight: 10 },     // Средний шанс (10%)
    { amount: 3000000, weight: 5 },     // Низкий шанс (5%)
    { amount: 4500000, weight: 2.5 },    // Низкий шанс (2.5%)
    { amount: 6000000, weight: 1 },      // Очень низкий шанс (1%)
    { amount: 8000000, weight: 0.4 },    // Редкий шанс (0.4%)
    { amount: 10000000, weight: 0.08 },  // Очень редкий шанс (0.08%)
    { amount: 15000000, weight: 0.02 }   // Экстремально редкий шанс (0.02%)
];

// Награды для Legendary case (RBC и деньги смешаны)
const legendaryCaseRewards = [
    { amount: 150000, type: 'rbc', weight: 20 },      // Высокий шанс (20%)
    { amount: 300000, type: 'rbc', weight: 18 },      // Высокий шанс (18%)
    { amount: 450000, type: 'rbc', weight: 15 },      // Средний шанс (15%)
    { amount: 500000, type: 'rbc', weight: 12 },      // Средний шанс (12%)
    { amount: 750000, type: 'rbc', weight: 8 },       // Низкий шанс (8%)
    { amount: 10000000, type: 'money', weight: 10 },   // Средний шанс (10%)
    { amount: 15000000, type: 'money', weight: 7 },    // Низкий шанс (7%)
    { amount: 20000000, type: 'money', weight: 4 },   // Низкий шанс (4%)
    { amount: 30000000, type: 'money', weight: 3 },   // Очень низкий шанс (3%)
    { amount: 50000000, type: 'money', weight: 1 }    // Экстремально редкий шанс (1%)
];

// Награды для Rare case (бонусы х3/х5, деньги, RBC и персонаж PINKY)
const rareCaseRewards = [
    // Бонусы - средний шанс
    { type: 'bonus', multiplier: 3, weight: 20 },      // Средний шанс (20%)
    { type: 'bonus', multiplier: 5, weight: 20 },      // Средний шанс (20%)
    
    // Деньги - средний/низкий шанс
    { type: 'money', amount: 1000000, weight: 12 },    // Средний шанс (12%)
    { type: 'money', amount: 2000000, weight: 10 },     // Низкий шанс (10%)
    { type: 'money', amount: 4500000, weight: 8 },     // Низкий шанс (8%)
    
    // RBC - низкий шанс
    { type: 'rbc', amount: 15000, weight: 10 },        // Низкий шанс (10%)
    { type: 'rbc', amount: 20000, weight: 8 },         // Низкий шанс (8%)
    { type: 'rbc', amount: 30000, weight: 7 },          // Низкий шанс (7%)
    
    // Персонаж - самый маленький шанс
    { type: 'character', characterId: 'pinky', weight: 5 }  // Самый маленький шанс (5%)
];

// Награды для Epic case
const epicCaseRewards = [
    // Деньги (средние/высокие шансы)
    { type: 'money', amount: 7500000, weight: 16 },        // 7.5 млн (~16%)
    { type: 'money', amount: 9000000, weight: 13 },        // 9 млн (~13%)
    { type: 'money', amount: 15000000, weight: 10 },      // 15 млн (~10%)
    
    // RBC (маленькие проценты)
    { type: 'rbc', amount: 30000, weight: 5 },            // 30к RBC (5%)
    { type: 'rbc', amount: 50000, weight: 4 },            // 50к RBC (4%)
    { type: 'rbc', amount: 90000, weight: 3 },            // 90к RBC (3%)
    
    // Бонусы
    { type: 'bonus', multiplier: 5, weight: 22 },          // х5 (22% - средний шанс)
    { type: 'bonus', multiplier: 8, weight: 16 },          // х8 (16% - чуть ниже х5)
    
    // Персонажи (самые редкие)
    { type: 'character', characterId: 'pinky', weight: 6 },            // Пинки (6% - немного больше чем в Rare case)
    { type: 'character', characterId: 'robo-blumy', weight: 0.2 }    // Робо-Блуми (0.2% - предельно мал, меньше 0.5%)
];

// Награды для Legend case
const legendCaseRewards = [
    // Персонажи (самые редкие)
    { type: 'character', characterId: 'pinky', weight: 10 },          // Пинки (10% - самый маленький, но больше чем Робо-блуми)
    { type: 'character', characterId: 'robo-blumy', weight: 2 },     // Робо-блуми (2% - самый маленький)
    
    // Бонусы (средний шанс, х12 чуть меньше х8)
    { type: 'bonus', multiplier: 8, weight: 18 },                     // х8 (18% - средний шанс)
    { type: 'bonus', multiplier: 12, weight: 15 },                     // х12 (15% - чуть меньше х8)
    
    // Деньги (чем больше сумма - тем меньше процент)
    { type: 'money', amount: 10000000, weight: 12 },                   // 10млн (12%)
    { type: 'money', amount: 15000000, weight: 10 },                   // 15млн (10%)
    { type: 'money', amount: 25000000, weight: 8 },                    // 25млн (8%)
    
    // RBC (чем больше сумма - тем меньше процент)
    { type: 'rbc', amount: 55000, weight: 12 },                       // 55тыс RBC (12%)
    { type: 'rbc', amount: 70000, weight: 10 },                       // 70тыс RBC (10%)
    { type: 'rbc', amount: 90000, weight: 8 }                          // 90тыс RBC (8%)
];

// Награды для Ultima case
const ultimaCaseRewards = [
    // Персонажи (высокие шансы)
    { type: 'character', characterId: 'pinky', weight: 20 },          // Пинки (20%)
    { type: 'character', characterId: 'robo-blumy', weight: 15 },   // Робо-блуми (15%)
    
    // Бонусы (средние шансы, х15 чуть меньше х12)
    { type: 'bonus', multiplier: 12, weight: 18 },                    // х12 (18% - средний шанс)
    { type: 'bonus', multiplier: 15, weight: 15 },                    // х15 (15% - чуть меньше х12)
    
    // Деньги (маленькие шансы на большие суммы)
    { type: 'money', amount: 30000000, weight: 10 },                  // 30млн (10%)
    { type: 'money', amount: 45000000, weight: 6 },                   // 45млн (6% - маленький шанс)
    { type: 'money', amount: 60000000, weight: 4 },                   // 60млн (4% - маленький шанс)
    
    // RBC (маленькие шансы на 300к/500к)
    { type: 'rbc', amount: 100000, weight: 8 },                       // 100к RBC (8%)
    { type: 'rbc', amount: 300000, weight: 3 },                      // 300к RBC (3% - маленький шанс)
    { type: 'rbc', amount: 500000, weight: 1 }                       // 500к RBC (1% - маленький шанс)
];

// Функция взвешенного рандома
function getWeightedRandomReward(rewards) {
    const totalWeight = rewards.reduce((sum, reward) => sum + reward.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < rewards.length; i++) {
        random -= rewards[i].weight;
        if (random <= 0) {
            return i; // Возвращаем индекс награды
        }
    }
    
    return 0; // Fallback на первую награду
}

// Функция форматирования суммы для Money case
function formatMoneyAmount(amount) {
    if (amount >= 1000000) {
        const millions = amount / 1000000;
        return millions.toFixed(millions % 1 === 0 ? 0 : 1) + ' млн';
    }
    return amount.toLocaleString('ru-RU');
}

// Функция показа панели шансов
function showCaseOdds() {
    const oddsPanel = document.getElementById('case-odds-panel');
    const oddsList = document.getElementById('case-odds-list');
    const oddsTitle = document.getElementById('case-odds-title');
    
    if (!oddsPanel || !oddsList) return;
    
    // Выбираем соответствующие награды
    let rewards;
    let caseName;
    
    // Проверяем флаги для специальных кейсов (Rare, Epic, Legend, Ultima) в первую очередь
    if (isRareCaseFromCell4) {
        rewards = rareCaseRewards;
        caseName = 'Rare case';
        // Сбрасываем флаг после использования
        isRareCaseFromCell4 = false;
    } else if (isEpicCaseFromCell5) {
        rewards = epicCaseRewards;
        caseName = 'Epic case';
        // Сбрасываем флаг после использования
        isEpicCaseFromCell5 = false;
    } else if (isUltimaCaseFromCell7) {
        rewards = ultimaCaseRewards;
        caseName = 'Ultima case';
        // Сбрасываем флаг после использования
        isUltimaCaseFromCell7 = false;
    } else if (isLegendCaseFromCell6) {
        rewards = legendCaseRewards;
        caseName = 'Legend case';
        // Сбрасываем флаг после использования
        isLegendCaseFromCell6 = false;
    } else {
        // Определяем текущий кейс из массива
        const currentCase = casesItems[currentCasesIndex];
        if (!currentCase) return;
        
        if (currentCase.name === 'Money case') {
            rewards = moneyCaseRewards;
            caseName = 'Money case';
        } else if (currentCase.name === 'Legendary case') {
            rewards = legendaryCaseRewards;
            caseName = 'Legendary case';
        } else {
            rewards = caseRewards;
            caseName = 'Diamond case';
        }
    }
    
    // Обновляем заголовок
    if (oddsTitle) {
        oddsTitle.textContent = `Шансы наград - ${caseName}`;
    }
    
    // Вычисляем общий вес для расчета процентов
    const totalWeight = rewards.reduce((sum, reward) => sum + reward.weight, 0);
    
    // Очищаем список
    oddsList.innerHTML = '';
    
    // Создаем элементы списка
    rewards.forEach((reward) => {
        const percentage = ((reward.weight / totalWeight) * 100).toFixed(2);
        let rewardType = reward.type;
        if (!rewardType) {
            if (currentCase.name === 'Money case') {
                rewardType = 'money';
            } else if (currentCase.name === 'Rare case') {
                // Для Rare case тип определяется из самой награды
                rewardType = reward.type || 'bonus';
            } else if (currentCase.name === 'Epic case') {
                // Для Epic case тип определяется из самой награды
                rewardType = reward.type || 'character';
            } else {
                rewardType = 'rbc';
            }
        }
        
        let iconSrc, iconAlt, rewardText;
        if (rewardType === 'money') {
            iconSrc = 'assets/svg/bc-icon.svg';
            iconAlt = 'Money';
            rewardText = formatMoneyAmount(reward.amount);
        } else if (rewardType === 'bonus') {
            iconSrc = `assets/svg/widgets/x${reward.multiplier}.svg`;
            iconAlt = `x${reward.multiplier} Bonus`;
            rewardText = `x${reward.multiplier} к заработку`;
        } else if (rewardType === 'character') {
            if (reward.characterId === 'pinky') {
                iconSrc = 'assets/svg/characters-panel/pinky.svg';
                iconAlt = 'Пинки';
                rewardText = 'Пинки';
            } else if (reward.characterId === 'robo-blumy') {
                iconSrc = 'assets/svg/characters-panel/robo-blumy.svg';
                iconAlt = 'Робо-Блуми';
                rewardText = 'Робо-Блуми';
            } else {
                iconSrc = 'assets/svg/characters-panel/pinky.svg';
                iconAlt = 'Персонаж';
                rewardText = 'Персонаж';
            }
        } else {
            iconSrc = 'assets/svg/rbc-icon.svg';
            iconAlt = 'RBC';
            rewardText = reward.amount.toLocaleString('ru-RU');
        }
        
        const rewardItem = document.createElement('div');
        rewardItem.style.cssText = 'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px;display:flex;align-items:center;gap:12px;transition:all 0.2s ease;';
        rewardItem.onmouseover = function() {
            this.style.background = 'rgba(255,255,255,0.12)';
            this.style.borderColor = 'rgba(255,255,255,0.25)';
        };
        rewardItem.onmouseout = function() {
            this.style.background = 'rgba(255,255,255,0.08)';
            this.style.borderColor = 'rgba(255,255,255,0.15)';
        };
        
        // Иконка
        const icon = document.createElement('img');
        icon.src = iconSrc;
        icon.alt = iconAlt;
        icon.style.cssText = 'width:32px;height:32px;flex-shrink:0;filter:drop-shadow(0 0 8px rgba(255,255,255,0.3));';
        
        // Информация о награде
        const info = document.createElement('div');
        info.style.cssText = 'flex:1;display:flex;flex-direction:column;gap:4px;';
        
        const amount = document.createElement('div');
        amount.style.cssText = 'color:#fff;font-size:14px;font-weight:700;font-family:"Segoe UI",Arial,sans-serif;';
        amount.textContent = rewardText;
        
        const chance = document.createElement('div');
        chance.style.cssText = 'color:rgba(255,255,255,0.7);font-size:12px;font-weight:600;font-family:"Segoe UI",Arial,sans-serif;';
        chance.textContent = `Шанс: ${percentage}%`;
        
        info.appendChild(amount);
        info.appendChild(chance);
        
        rewardItem.appendChild(icon);
        rewardItem.appendChild(info);
        oddsList.appendChild(rewardItem);
    });
    
    // Показываем панель
    oddsPanel.style.display = 'flex';
}

// Функция открытия кейса с анимацией прокрутки наград
function openCase() {
    const panel = document.getElementById('case-opening-panel');
    const track = document.getElementById('case-rewards-track');
    const selectedReward = document.getElementById('case-selected-reward');
    const claimBtn = document.getElementById('case-claim-btn');
    
    if (!panel || !track) return;
    
    // Определяем тип кейса
    // Используем currentCaseItem если он установлен (для Rare, Epic, Legend, Ultima cases)
    // Иначе используем casesItems[currentCasesIndex]
    const currentCase = currentCaseItem || casesItems[currentCasesIndex];
    const isMoneyCase = currentCase && currentCase.name === 'Money case';
    const isLegendaryCase = currentCase && currentCase.name === 'Legendary case';
    const isRareCase = currentCase && currentCase.name === 'Rare case';
    const isEpicCase = currentCase && currentCase.name === 'Epic case';
    
    // Выбираем соответствующие награды
    let rewards;
    const isLegendCaseFromCell6Now = isLegendCaseFromCell6;
    const isUltimaCaseFromCell7Now = isUltimaCaseFromCell7;
    if (isMoneyCase) {
        rewards = moneyCaseRewards;
    } else if (isLegendaryCase && isUltimaCaseFromCell7Now) {
        // Ultima case (7-я ячейка)
        rewards = ultimaCaseRewards;
    } else if (isLegendaryCase && isLegendCaseFromCell6Now) {
        // Legend case (6-я ячейка)
        rewards = legendCaseRewards;
    } else if (isLegendaryCase) {
        // Старый Legendary case (3-я ячейка)
        rewards = legendaryCaseRewards;
    } else if (isRareCase) {
        rewards = rareCaseRewards;
    } else if (isEpicCase) {
        rewards = epicCaseRewards;
    } else {
        rewards = caseRewards;
    }
    
    // Сбрасываем флаги после использования
    if (isLegendCaseFromCell6Now) {
        isLegendCaseFromCell6 = false;
    }
    if (isUltimaCaseFromCell7Now) {
        isUltimaCaseFromCell7 = false;
    }
    // Сбрасываем currentCaseItem после использования
    currentCaseItem = null;
    
    const rewardIndex = getWeightedRandomReward(rewards);
    const selectedRewardData = rewards[rewardIndex];
    let selectedAmount = selectedRewardData.amount;
    let rewardType = selectedRewardData.type || (isMoneyCase ? 'money' : (isRareCase ? 'bonus' : (isEpicCase ? 'character' : 'rbc')));
    
    // Если выпал персонаж Пинки, но он уже есть, меняем на альтернативную награду
    if (rewardType === 'character' && selectedRewardData.characterId === 'pinky') {
        const availableCharacters = JSON.parse(localStorage.getItem('availableCharacters') || '[]');
        if (availableCharacters.includes('pinky')) {
            rewardType = 'money';
            selectedAmount = 5000000; // 5 млн денег
        }
    }
    
    // Если выпал персонаж Robo blumy, но он уже выпадал из кейсов, меняем на альтернативную награду
    if (rewardType === 'character' && selectedRewardData.characterId === 'robo-blumy') {
        // Проверяем, выпадал ли робо-блуми из кейсов ранее
        const roboBlumyDroppedFromCases = localStorage.getItem('roboBlumyDroppedFromCases') === 'true';
        if (roboBlumyDroppedFromCases) {
            rewardType = 'rbc';
            selectedAmount = 100000; // 100000 RBC
        }
    }
    
    // Для Rare case убеждаемся, что selectedAmount установлен для всех типов наград
    if (isRareCase && !selectedAmount && rewardType !== 'bonus' && rewardType !== 'character') {
        selectedAmount = selectedRewardData.amount || 0;
    }
    
    // Очищаем трек и сбрасываем стили
    track.innerHTML = '';
    track.style.transform = 'translateX(0)';
    track.style.transition = 'none';
    
    // Скрываем выбранную награду и кнопку
    selectedReward.style.display = 'none';
    claimBtn.style.display = 'none';
    claimBtn.style.opacity = '0';
    claimBtn.style.transform = 'translateY(10px)';
    
    // Скрываем панель шансов если открыта
    const oddsPanel = document.getElementById('case-odds-panel');
    if (oddsPanel) {
        oddsPanel.style.display = 'none';
    }
    
    // Показываем панель
    panel.style.display = 'flex';
    
    // Показываем контейнер с прокруткой (круги)
    const rewardsContainer = document.getElementById('case-rewards-container');
    if (rewardsContainer) {
        rewardsContainer.style.display = 'flex';
    }
    
    // Создаем ячейки с наградами
    const totalRewards = rewards.length;
    const copiesCount = 15; // Количество копий для бесшовной прокрутки
    
    // Создаем ячейки
    for (let copy = 0; copy < copiesCount; copy++) {
        rewards.forEach((reward, index) => {
            const rewardCell = document.createElement('div');
            rewardCell.className = 'case-reward-cell';
            rewardCell.dataset.rewardIndex = index;
            rewardCell.style.cssText = 'min-width:100px;width:100px;height:148px;background:rgba(255,255,255,0.06);border:2px solid rgba(255,255,255,0.12);border-radius:12px;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;flex-shrink:0;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:all 0.3s ease;';
            
            // Определяем тип награды и иконку
            const isLegendCaseFromCell6InOpen = isLegendCaseFromCell6;
            const isUltimaCaseFromCell7InOpen = isUltimaCaseFromCell7;
            const rewardTypeForCell = reward.type || (isMoneyCase ? 'money' : (isRareCase ? 'bonus' : (isEpicCase ? 'character' : (isUltimaCaseFromCell7InOpen ? 'bonus' : (isLegendCaseFromCell6InOpen ? 'bonus' : 'rbc')))));
            let iconSrc, iconAlt, displayText;
            
            if (rewardTypeForCell === 'money') {
                iconSrc = 'assets/svg/bc-icon.svg';
                iconAlt = 'Money';
                displayText = formatMoneyAmount(reward.amount);
            } else if (rewardTypeForCell === 'bonus') {
                iconSrc = `assets/svg/widgets/x${reward.multiplier}.svg`;
                iconAlt = `x${reward.multiplier} Bonus`;
                displayText = `x${reward.multiplier}`;
            } else if (rewardTypeForCell === 'character') {
                // Проверяем, какой персонаж
                if (reward.characterId === 'pinky') {
                    // Проверяем, есть ли уже Пинки
                    const availableCharacters = JSON.parse(localStorage.getItem('availableCharacters') || '[]');
                    if (availableCharacters.includes('pinky')) {
                        // Если Пинки уже есть, показываем альтернативную награду
                        iconSrc = 'assets/svg/bc-icon.svg';
                        iconAlt = 'Money';
                        displayText = '5 млн';
                    } else {
                        iconSrc = 'assets/svg/characters-panel/pinky.svg';
                        iconAlt = 'Пинки';
                        displayText = 'Пинки';
                    }
                } else if (reward.characterId === 'robo-blumy') {
                    // Проверяем, есть ли уже Robo blumy
                    const availableCharacters = JSON.parse(localStorage.getItem('availableCharacters') || '[]');
                    if (availableCharacters.includes('robo-blumy')) {
                        // Если Robo blumy уже есть, показываем альтернативную награду
                        iconSrc = 'assets/svg/rbc-icon.svg';
                        iconAlt = 'RBC';
                        displayText = '100k';
                    } else {
                        iconSrc = 'assets/svg/characters-panel/robo-blumy.svg';
                        iconAlt = 'Робо-Блуми';
                        displayText = 'Робо-Блуми';
                    }
                } else {
                    iconSrc = 'assets/svg/characters-panel/pinky.svg';
                    iconAlt = 'Персонаж';
                    displayText = 'Персонаж';
                }
            } else {
                iconSrc = 'assets/svg/rbc-icon.svg';
                iconAlt = 'RBC';
                displayText = reward.amount.toLocaleString('ru-RU');
            }
            
            const icon = document.createElement('img');
            icon.src = iconSrc;
            icon.alt = iconAlt;
            icon.style.cssText = 'width:88px;height:88px;margin-bottom:8px;filter:drop-shadow(0 0 12px rgba(255,255,255,0.3));';
            
            const amount = document.createElement('div');
            amount.textContent = displayText;
            amount.style.cssText = 'color:#fff;font-size:13px;font-weight:700;text-align:center;text-shadow:0 2px 4px rgba(0,0,0,0.5);font-family:"Segoe UI",Arial,sans-serif;line-height:1.2;';
            
            rewardCell.appendChild(icon);
            rewardCell.appendChild(amount);
            track.appendChild(rewardCell);
        });
    }
    
    // Ждем, пока элементы отрисуются
    setTimeout(() => {
        const container = track.parentElement;
        const containerWidth = container.offsetWidth;
        const containerCenter = containerWidth / 2;
        
        // Получаем размеры первой ячейки
        const firstCell = track.querySelector('.case-reward-cell');
        if (!firstCell) return;
        
        const cellRect = firstCell.getBoundingClientRect();
        const cellWidth = cellRect.width;
        const cellGap = 12; // gap из CSS
        const cellTotalWidth = cellWidth + cellGap;
        const cycleWidth = totalRewards * cellTotalWidth;
        
        // Вычисляем целевую позицию (в среднем цикле)
        const targetCycle = Math.floor(copiesCount / 2);
        const targetOffset = rewardIndex * cellTotalWidth;
        const targetPosition = -(targetCycle * cycleWidth + targetOffset - containerCenter + cellWidth / 2);
        
        // Вычисляем начальную позицию (далеко справа)
        const scrollCycles = 5 + Math.random() * 2; // 5-7 полных циклов
        const startPosition = targetPosition - (scrollCycles * cycleWidth);
        
        // Устанавливаем начальную позицию
        track.style.transform = `translateX(${startPosition}px)`;
        track.style.transition = 'none';
        
        // Принудительный reflow
        track.offsetHeight;
        
        // Запускаем анимацию
        setTimeout(() => {
            // Переключаемся на CSS transition для плавности
            track.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
            track.style.transform = `translateX(${targetPosition}px)`;
            
            // Ждем завершения анимации
            const handleTransitionEnd = () => {
                track.removeEventListener('transitionend', handleTransitionEnd);
                
                // Находим и подсвечиваем выбранную ячейку
                const cells = track.querySelectorAll('.case-reward-cell');
                let selectedCell = null;
                let minDistance = Infinity;
                
                cells.forEach((cell) => {
                    if (parseInt(cell.dataset.rewardIndex) === rewardIndex) {
                        const rect = cell.getBoundingClientRect();
                        const cellCenter = rect.left + rect.width / 2;
                        const containerRect = container.getBoundingClientRect();
                        const containerCenterX = containerRect.left + containerRect.width / 2;
                        const distance = Math.abs(cellCenter - containerCenterX);
                        
                        if (distance < minDistance) {
                            minDistance = distance;
                            selectedCell = cell;
                        }
                    }
                });
                
                // Подсвечиваем выбранную ячейку
                if (selectedCell) {
                    selectedCell.style.background = 'rgba(255,255,255,0.15)';
                    selectedCell.style.borderColor = 'rgba(255,255,255,0.6)';
                    selectedCell.style.transform = 'scale(1.05)';
                    selectedCell.style.boxShadow = '0 0 20px rgba(255,255,255,0.5)';
                }
                
                // Затемняем остальные
                cells.forEach((cell) => {
                    if (cell !== selectedCell) {
                        cell.style.opacity = '0.25';
                    }
                });
                
                // Показываем результат
                setTimeout(() => {
                    const rewardAmount = document.getElementById('case-reward-amount');
                    if (rewardAmount) {
                        if (rewardType === 'money') {
                            rewardAmount.textContent = formatMoneyAmount(selectedAmount);
                        } else if (rewardType === 'bonus') {
                            rewardAmount.textContent = `x${selectedRewardData.multiplier} к заработку`;
                        } else if (rewardType === 'character') {
                            // Проверяем, какой персонаж
                            const availableCharacters = JSON.parse(localStorage.getItem('availableCharacters') || '[]');
                            if (selectedRewardData.characterId === 'pinky') {
                                if (availableCharacters.includes('pinky')) {
                                    rewardAmount.textContent = '5 млн (альтернативная награда)';
                        } else {
                                    rewardAmount.textContent = 'Пинки';
                                }
                            } else if (selectedRewardData.characterId === 'robo-blumy') {
                                if (availableCharacters.includes('robo-blumy')) {
                                    rewardAmount.textContent = '100k RBC (альтернативная награда)';
                                } else {
                                    rewardAmount.textContent = 'Робо-Блуми';
                                }
                            } else {
                                rewardAmount.textContent = 'Персонаж';
                            }
                        } else if (rewardType === 'rbc') {
                            rewardAmount.textContent = selectedAmount.toLocaleString('ru-RU');
                        } else {
                            rewardAmount.textContent = selectedAmount ? selectedAmount.toLocaleString('ru-RU') : '0';
                        }
                    }
                    // Обновляем иконку в финальной панели
                    const rewardIcon = selectedReward.querySelector('img');
                    if (rewardIcon) {
                        if (rewardType === 'bonus') {
                            // Для бонусов скрываем SVG иконку
                            rewardIcon.style.display = 'none';
                        } else {
                            // Для остальных типов показываем иконку
                            rewardIcon.style.display = '';
                            let finalIconSrc, finalIconAlt;
                            if (rewardType === 'money') {
                                finalIconSrc = 'assets/svg/bc-icon.svg';
                                finalIconAlt = 'Money';
                            } else if (rewardType === 'character') {
                                // Проверяем, какой персонаж
                                const availableCharacters = JSON.parse(localStorage.getItem('availableCharacters') || '[]');
                                if (selectedRewardData.characterId === 'pinky') {
                                    if (availableCharacters.includes('pinky')) {
                                        // Если Пинки уже есть, показываем альтернативную награду
                                        finalIconSrc = 'assets/svg/bc-icon.svg';
                                        finalIconAlt = 'Money';
                                    } else {
                                        finalIconSrc = 'assets/svg/characters-panel/pinky.svg';
                                        finalIconAlt = 'Пинки';
                                    }
                                } else if (selectedRewardData.characterId === 'robo-blumy') {
                                    if (availableCharacters.includes('robo-blumy')) {
                                        // Если Robo blumy уже есть, показываем альтернативную награду
                                        finalIconSrc = 'assets/svg/rbc-icon.svg';
                                        finalIconAlt = 'RBC';
                                    } else {
                                        finalIconSrc = 'assets/svg/characters-panel/robo-blumy.svg';
                                        finalIconAlt = 'Робо-Блуми';
                                    }
                                } else {
                                    finalIconSrc = 'assets/svg/characters-panel/pinky.svg';
                                    finalIconAlt = 'Персонаж';
                                }
                            } else {
                                finalIconSrc = 'assets/svg/rbc-icon.svg';
                                finalIconAlt = 'RBC';
                            }
                        rewardIcon.src = finalIconSrc;
                        rewardIcon.alt = finalIconAlt;
                        }
                    }
                    selectedReward.style.display = 'flex';
                    claimBtn.style.display = 'block';
                    
                    setTimeout(() => {
                        claimBtn.style.opacity = '1';
                        claimBtn.style.transform = 'translateY(0)';
                    }, 200);
                }, 400);
            };
            
            track.addEventListener('transitionend', handleTransitionEnd);
        }, 100);
    }, 100);
    
    // Обработчик кнопки "Забрать"
    let claimHandler = null;
    claimHandler = () => {
        // Начисляем награду в зависимости от типа
        if (rewardType === 'money') {
            const currentBalance = getBalance();
            setBalance(currentBalance + selectedAmount);
        } else if (rewardType === 'bonus') {
            // Активируем бонус х3 или х5
            const multiplier = selectedRewardData.multiplier;
            activateEarningBonus(multiplier);
        } else if (rewardType === 'character') {
            // Добавляем персонажа или даем альтернативную награду
            const availableCharacters = JSON.parse(localStorage.getItem('availableCharacters') || '[]');
            
            if (selectedRewardData.characterId === 'pinky') {
                if (!availableCharacters.includes('pinky')) {
                    availableCharacters.push('pinky');
                    localStorage.setItem('availableCharacters', JSON.stringify(availableCharacters));
                    // Обновляем счетчик персонажей
                    if (window.updateCharactersCount) {
                        window.updateCharactersCount();
                    }
                    // Обновляем список доступных сотрудников
                    if (window.updateAvailableEmployees) {
                        window.updateAvailableEmployees();
                    }
                } else {
                    // Если Пинки уже есть, даем альтернативную награду - 5 млн денег
                    const currentBalance = getBalance();
                    setBalance(currentBalance + 5000000);
                }
            } else if (selectedRewardData.characterId === 'robo-blumy') {
                // Отмечаем, что робо-блуми выпал из кейса
                localStorage.setItem('roboBlumyDroppedFromCases', 'true');
                
                if (!availableCharacters.includes('robo-blumy')) {
                    availableCharacters.push('robo-blumy');
                    localStorage.setItem('availableCharacters', JSON.stringify(availableCharacters));
                    // Обновляем счетчик персонажей
                    if (window.updateCharactersCount) {
                        window.updateCharactersCount();
                    }
                    // Обновляем список доступных сотрудников
                    if (window.updateAvailableEmployees) {
                        window.updateAvailableEmployees();
                    }
                } else {
                    // Если Robo blumy уже есть, даем альтернативную награду - 100000 RBC
                    const currentCredits = getCredits();
                    setCredits(currentCredits + 100000);
                }
            }
        } else {
            const currentCredits = getCredits();
            setCredits(currentCredits + selectedAmount);
        }
        
        // Закрываем панель открытия кейса
        panel.style.display = 'none';
        if (claimHandler) {
            claimBtn.removeEventListener('click', claimHandler);
        }
        
        // Скрываем контейнер с прокруткой (круги)
        const rewardsContainer = document.getElementById('case-rewards-container');
        if (rewardsContainer) {
            rewardsContainer.style.display = 'none';
        }
        
        // Сбрасываем стили ячеек
        const cells = track.querySelectorAll('.case-reward-cell');
        cells.forEach((cell) => {
            cell.style.opacity = '1';
            cell.style.background = 'rgba(255,255,255,0.06)';
            cell.style.borderColor = 'rgba(255,255,255,0.12)';
            cell.style.transform = 'scale(1)';
            cell.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        });
        
        // Сбрасываем трек
        track.innerHTML = '';
        track.style.transform = 'translateX(0)';
        track.style.transition = 'none';
        
        // Показываем панель магазина обратно (она была скрыта только визуально)
        const shopPanel = document.getElementById('shop-panel');
        if (shopPanel) {
            shopPanel.style.opacity = '1';
            shopPanel.style.pointerEvents = 'auto';
            shopPanel.style.transition = 'opacity 0.3s ease';
        }
    };
    
    claimBtn.addEventListener('click', claimHandler);
}

// === СИСТЕМА БОНУСОВ К ЗАРАБОТКУ ===
let activeEarningBonus = null;
let bonusTimer = null;

// Функция активации бонуса к заработку
function activateEarningBonus(multiplier) {
    // Отменяем предыдущий бонус если есть
    if (bonusTimer) {
        clearInterval(bonusTimer);
    }
    
    // Устанавливаем новый бонус
    activeEarningBonus = {
        multiplier: multiplier,
        endTime: Date.now() + 3600000 // 1 час = 3600000 мс
    };
    
    // Сохраняем в localStorage
    localStorage.setItem('activeEarningBonus', JSON.stringify(activeEarningBonus));
    
    // Показываем визуальный индикатор бонуса
    showBonusIndicator(multiplier);
    
    // Запускаем таймер
    startBonusTimer();
}

// Функция получения текущего множителя бонуса
function getEarningBonusMultiplier() {
    if (!activeEarningBonus) {
        // Пытаемся восстановить из localStorage
        const saved = localStorage.getItem('activeEarningBonus');
        if (saved) {
            try {
                activeEarningBonus = JSON.parse(saved);
                // Проверяем, не истек ли бонус
                if (Date.now() >= activeEarningBonus.endTime) {
                    activeEarningBonus = null;
                    localStorage.removeItem('activeEarningBonus');
                    return 1;
                }
                // Восстанавливаем таймер
                startBonusTimer();
                showBonusIndicator(activeEarningBonus.multiplier);
            } catch (e) {
                activeEarningBonus = null;
                localStorage.removeItem('activeEarningBonus');
            }
        }
    }
    
    if (!activeEarningBonus) return 1;
    
    // Проверяем, не истек ли бонус
    if (Date.now() >= activeEarningBonus.endTime) {
        deactivateEarningBonus();
        return 1;
    }
    
    return activeEarningBonus.multiplier;
}

// Функция деактивации бонуса
function deactivateEarningBonus() {
    activeEarningBonus = null;
    localStorage.removeItem('activeEarningBonus');
    hideBonusIndicator();
    if (bonusTimer) {
        clearInterval(bonusTimer);
        bonusTimer = null;
    }
}

// Функция запуска таймера бонуса
function startBonusTimer() {
    if (bonusTimer) {
        clearInterval(bonusTimer);
    }
    
    bonusTimer = setInterval(() => {
        if (!activeEarningBonus) {
            clearInterval(bonusTimer);
            bonusTimer = null;
            return;
        }
        
        const remaining = activeEarningBonus.endTime - Date.now();
        if (remaining <= 0) {
            deactivateEarningBonus();
        } else {
            updateBonusTimer(remaining);
        }
    }, 100); // Обновляем каждые 100мс для плавности
}

// Функция показа индикатора бонуса
function showBonusIndicator(multiplier) {
    // Удаляем старый индикатор если есть
    const oldIndicator = document.getElementById('earning-bonus-indicator');
    if (oldIndicator) {
        oldIndicator.remove();
    }
    
    // Получаем координаты кнопки инвестиций для размещения бонуса под ней
    const investmentButton = document.getElementById('bottom-banner');
    let leftPosition = '50%'; // Значение по умолчанию
    let topPosition = 'calc(100vh - 100px)'; // Значение по умолчанию
    if (investmentButton) {
        const rect = investmentButton.getBoundingClientRect();
        // Размещаем по центру кнопки инвестиций по горизонтали, сдвигаем влево на 40px
        leftPosition = rect.left + (rect.width / 2) - 40;
        // Размещаем под кнопкой инвестиций, сдвигаем вверх на 15px и вниз на 8px
        topPosition = rect.bottom + 10 - 15 + 8; // 10px отступ снизу от кнопки минус 15px вверх плюс 8px вниз
    }
    
    // Создаем новый индикатор
    const indicator = document.createElement('div');
    indicator.id = 'earning-bonus-indicator';
    indicator.style.cssText = `position:fixed;top:${topPosition}px;left:${leftPosition}px;z-index:2000;display:flex;flex-direction:column;align-items:center;gap:2px;transform:translateX(-50%);`;
    
    // Контейнер для текста и SVG денег
    const textContainer = document.createElement('div');
    textContainer.style.cssText = 'display:flex;align-items:center;gap:2px;justify-content:center;';
    
    // Текст "x(размер)" в самом жирном белом шрифте с подсветкой по контуру
    const text = document.createElement('span');
    text.textContent = `x${multiplier}`;
    text.style.cssText = 'color:white;font-size:24px;font-weight:900;font-family:"Segoe UI",Arial,sans-serif;text-shadow:0 0 2px rgba(255,255,255,0.8),0 0 4px rgba(255,255,255,0.6),0 0 6px rgba(255,255,255,0.4),0 2px 4px rgba(0,0,0,0.5);line-height:1;';
    
    // SVG денег с подсветкой
    const moneyIcon = document.createElement('img');
    moneyIcon.src = 'assets/svg/money-icon.svg';
    moneyIcon.alt = 'Money';
    moneyIcon.style.cssText = 'width:24px;height:24px;object-fit:contain;filter:drop-shadow(0 0 2px rgba(255,255,255,0.8)) drop-shadow(0 0 4px rgba(255,255,255,0.6)) drop-shadow(0 0 6px rgba(255,255,255,0.4));';
    
    textContainer.appendChild(text);
    textContainer.appendChild(moneyIcon);
    
    // Таймер в овальной ячейке
    const timer = document.createElement('div');
    timer.id = 'bonus-timer';
    timer.style.cssText = 'background:rgba(0,0,0,0.6);border:1px solid rgba(255,255,255,0.3);border-radius:20px;padding:3px 12px;color:white;font-size:13px;font-weight:700;font-family:"Segoe UI",Arial,sans-serif;text-shadow:0 2px 4px rgba(0,0,0,0.5);line-height:1;display:flex;align-items:center;justify-content:center;';
    timer.textContent = '1:00';
    
    indicator.appendChild(textContainer);
    indicator.appendChild(timer);
    document.body.appendChild(indicator);
}

// Функция обновления таймера
function updateBonusTimer(remainingMs) {
    const timer = document.getElementById('bonus-timer');
    if (!timer) return;
    
    const totalSeconds = Math.ceil(remainingMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    
    // Форматируем время: часы:минуты:секунды
    if (hours > 0) {
        timer.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        timer.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

// Функция скрытия индикатора бонуса
function hideBonusIndicator() {
    const indicator = document.getElementById('earning-bonus-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Функция показа индикатора бонуса (если он активен)
function showBonusIndicatorIfActive() {
    if (activeEarningBonus && Date.now() < activeEarningBonus.endTime) {
        showBonusIndicator(activeEarningBonus.multiplier);
    }
}

// Экспортируем функцию для использования в других модулях
if (typeof window !== 'undefined') {
    window.getEarningBonusMultiplier = getEarningBonusMultiplier;
    
    window.addEventListener('load', () => {
        // Восстанавливаем бонус если он был активен
        getEarningBonusMultiplier();
    });
}

// Функция покупки кейсов через Telegram Stars (прямая покупка из игры)
async function buyCases() {
    const item = casesItems[currentCasesIndex];
    if (!item) return;
    
    // Проверяем, запущено ли приложение в Telegram
    if (!isTelegramApp || !window.Telegram || !window.Telegram.WebApp) {
        alert('Покупка доступна только в Telegram!');
        return;
    }
    
    const webApp = window.Telegram.WebApp;
    const userId = webApp.initDataUnsafe?.user?.id;
    
    if (!userId) {
        alert('Не удалось получить данные пользователя. Попробуйте перезапустить приложение.');
        return;
    }
    
    // Создаем invoice link и открываем его прямо в Mini App (без бота)
    try {
        // Сохраняем данные о текущей покупке для обработки после оплаты
        window.currentPurchase = {
            item: item,
            caseIndex: currentCasesIndex,
            timestamp: Date.now()
        };
        
        // Создаем invoice link через Bot API
        const invoiceUrl = await createInvoiceLinkForMiniApp(userId, item, currentCasesIndex);
        
        if (invoiceUrl && typeof invoiceUrl === 'string' && invoiceUrl.length > 0) {
            // Проверяем, что это валидный URL
            if (!invoiceUrl.startsWith('https://') && !invoiceUrl.startsWith('http://')) {
                alert('Ошибка: некорректный формат платежной ссылки');
                window.currentPurchase = null;
                return;
            }
            
            // Открываем invoice прямо в Mini App (не как сообщение от бота)
            if (webApp.openInvoice) {
                webApp.openInvoice(invoiceUrl, (status) => {
                    // Обрабатываем результат оплаты
                    if (status === 'paid') {
                        // Платеж успешен - открываем кейс
                        const purchaseData = window.currentPurchase;
                        if (purchaseData && purchaseData.item) {
                            handleSuccessfulCasePurchase(purchaseData.item);
                            window.currentPurchase = null;
                        } else {
                            // Fallback: используем текущий кейс
                            handleSuccessfulCasePurchase(item);
                        }
                    } else if (status === 'cancelled') {
                        window.currentPurchase = null;
                        // Платеж отменен - ничего не делаем
                    } else if (status === 'failed') {
                        window.currentPurchase = null;
                        alert('Ошибка при оплате. Попробуйте еще раз.');
                    }
                });
            } else {
                // Fallback: открываем через ссылку
                if (webApp.openLink) {
                    webApp.openLink(invoiceUrl);
                } else {
                    alert('Ваша версия Telegram не поддерживает прямую оплату. Обновите приложение.');
                    window.currentPurchase = null;
                }
            }
        } else {
            window.currentPurchase = null;
            alert('Ошибка при создании платежа. Попробуйте еще раз.');
        }
        
    } catch (error) {
        window.currentPurchase = null;
        alert('Ошибка при обработке платежа. Попробуйте еще раз.');
    }
}

// Функция создания invoice link для открытия в Mini App (без бота)
async function createInvoiceLinkForMiniApp(userId, item, caseIndex) {
    // Токен бота
    const BOT_TOKEN = '8523928444:AAGYolZ4G3fqmjj2YYhyXJpjuFvq8dw_LsU';
    
    // Получаем цену в звездах
    const starsPrice = parseInt(item.starsPrice, 10) || 1;
    
    // Создаем простой payload для invoice
    // Формат: case_{index}_{price}_{timestamp} или case_{type}_{price}_{timestamp} для special cases
    const payload = typeof caseIndex === 'string' 
        ? `case_${caseIndex}_${starsPrice}_${Date.now()}`
        : `case_${caseIndex}_${starsPrice}_${Date.now()}`;
    
    // Для createInvoiceLink prices должен быть JSON строкой
    const prices = JSON.stringify([{
        label: item.name,
        amount: starsPrice
    }]);
    
    // Данные для createInvoiceLink
    const invoiceData = {
        title: `Покупка ${item.name}`,
        description: `${item.name} за ${item.starsPrice || 1} звезд Telegram`,
        payload: payload,
        provider_token: '', // Для Telegram Stars оставляем пустым
        currency: 'XTR',    // XTR - валюта Telegram Stars
        prices: prices
    };
    
    try {
        // Создаем invoice link через Bot API
        const urlParams = new URLSearchParams();
        urlParams.append('title', invoiceData.title);
        urlParams.append('description', invoiceData.description);
        urlParams.append('payload', invoiceData.payload);
        urlParams.append('provider_token', invoiceData.provider_token || '');
        urlParams.append('currency', invoiceData.currency);
        urlParams.append('prices', invoiceData.prices);
        
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: urlParams.toString()
        });
        
        const result = await response.json();
        
        if (result.ok && result.result) {
            // Проверяем, что result.result - это строка (URL)
            const invoiceUrl = result.result;
            if (typeof invoiceUrl === 'string' && invoiceUrl.length > 0) {
                return invoiceUrl;
            } else {
                alert('Ошибка: некорректный формат платежной ссылки');
                return null;
            }
        } else {
            // Обработка ошибок
            let errorMessage = 'Неизвестная ошибка';
            
            if (result.description) {
                errorMessage = result.description;
            } else if (result.error_code) {
                errorMessage = `Ошибка ${result.error_code}`;
            }
            
            if (result.error_code === 401) {
                errorMessage = 'Ошибка авторизации бота. Проверьте токен.';
            } else if (result.error_code === 400) {
                errorMessage = 'Некорректные данные для создания платежа.';
            }
            
            alert('Ошибка при создании платежа: ' + errorMessage);
            return null;
        }
    } catch (error) {
        alert('Ошибка подключения. Проверьте интернет и попробуйте еще раз.');
        return null;
    }
}

// Обработка успешной покупки кейса (вызывается ботом через webApp.sendData)
function handleSuccessfulCasePurchase(item) {
    // Скрываем панель магазина только визуально (не закрываем полностью)
    // window.isShopPanelOpen остается true, чтобы круги не появлялись
    const shopPanel = document.getElementById('shop-panel');
    if (shopPanel) {
        shopPanel.style.opacity = '0';
        shopPanel.style.pointerEvents = 'none';
        shopPanel.style.transition = 'opacity 0.3s ease';
    }
    
    // Запускаем анимацию открытия кейса
    setTimeout(() => {
        openCase();
    }, 300);
    
    // Отслеживание покупки в аналитике (если есть)
    if (window.posthogService && window.posthogService.isReady()) {
        window.posthogService.track('case_purchased', {
            case_name: item.name,
            stars_price: item.starsPrice,
            case_index: currentCasesIndex
        });
    }
}

// Функция обработки покупки Rare case
async function handleRareCasePurchase() {
    // Проверяем, запущено ли приложение в Telegram
    if (!isTelegramApp || !window.Telegram || !window.Telegram.WebApp) {
        alert('Покупка доступна только в Telegram!');
        return;
    }
    
    const webApp = window.Telegram.WebApp;
    const userId = webApp.initDataUnsafe?.user?.id;
    
    if (!userId) {
        alert('Не удалось получить данные пользователя. Попробуйте перезапустить приложение.');
        return;
    }
    
    // Создаем объект для Rare case
    const rareCaseItem = {
        name: 'Rare case',
        image: 'assets/svg/shop/Rare-case.svg',
        amount: 1,
        cost: 0,
        starsPrice: 25,
        discount: 0
    };
    
    // Сохраняем текущий кейс для использования после оплаты
    window.currentPurchase = {
        item: rareCaseItem,
        caseType: 'rare'
    };
    
    // Создаем invoice link и открываем его
    try {
        const invoiceUrl = await createInvoiceLinkForMiniApp(userId, rareCaseItem, 'rare');
        
        if (invoiceUrl && typeof invoiceUrl === 'string' && invoiceUrl.length > 0) {
            if (!invoiceUrl.startsWith('https://') && !invoiceUrl.startsWith('http://')) {
                console.error('Invalid invoice URL:', invoiceUrl);
                window.currentPurchase = null;
                return;
            }
            
            if (webApp.openInvoice) {
                webApp.openInvoice(invoiceUrl, (status) => {
                    if (status === 'paid') {
                        const purchaseData = window.currentPurchase;
                        if (purchaseData && purchaseData.item) {
                            currentCaseItem = purchaseData.item;
                            handleSuccessfulCasePurchase(purchaseData.item);
                            window.currentPurchase = null;
                        }
                    } else if (status === 'cancelled') {
                        window.currentPurchase = null;
                    } else if (status === 'failed') {
                        window.currentPurchase = null;
                        alert('Ошибка при оплате. Попробуйте еще раз.');
                    }
                });
            } else {
                if (webApp.openLink) {
                    webApp.openLink(invoiceUrl);
                } else {
                    alert('Ваша версия Telegram не поддерживает прямую оплату. Обновите приложение.');
                    window.currentPurchase = null;
                }
            }
        } else {
            window.currentPurchase = null;
            alert('Ошибка при создании платежа. Попробуйте еще раз.');
        }
    } catch (error) {
        window.currentPurchase = null;
        alert('Ошибка при обработке платежа. Попробуйте еще раз.');
    }
}

async function handleEpicCasePurchase() {
    // Проверяем, запущено ли приложение в Telegram
    if (!isTelegramApp || !window.Telegram || !window.Telegram.WebApp) {
        alert('Покупка доступна только в Telegram!');
        return;
    }
    
    const webApp = window.Telegram.WebApp;
    const userId = webApp.initDataUnsafe?.user?.id;
    
    if (!userId) {
        alert('Не удалось получить данные пользователя. Попробуйте перезапустить приложение.');
        return;
    }
    
    // Создаем объект для Epic case
    const epicCaseItem = {
        name: 'Epic case',
        image: 'assets/svg/shop/Epic-case.svg',
        amount: 1,
        cost: 0,
        starsPrice: 60,
        discount: 0
    };
    
    // Сохраняем текущий кейс для использования после оплаты
    window.currentPurchase = {
        item: epicCaseItem,
        caseType: 'epic'
    };
    
    // Создаем invoice link и открываем его
    try {
        const invoiceUrl = await createInvoiceLinkForMiniApp(userId, epicCaseItem, 'epic');
        
        if (invoiceUrl && typeof invoiceUrl === 'string' && invoiceUrl.length > 0) {
            if (!invoiceUrl.startsWith('https://') && !invoiceUrl.startsWith('http://')) {
                console.error('Invalid invoice URL:', invoiceUrl);
                window.currentPurchase = null;
                return;
            }
            
            if (webApp.openInvoice) {
                webApp.openInvoice(invoiceUrl, (status) => {
                    if (status === 'paid') {
                        const purchaseData = window.currentPurchase;
                        if (purchaseData && purchaseData.item) {
                            currentCaseItem = purchaseData.item;
                            handleSuccessfulCasePurchase(purchaseData.item);
                            window.currentPurchase = null;
                        }
                    } else if (status === 'cancelled') {
                        window.currentPurchase = null;
                    } else if (status === 'failed') {
                        window.currentPurchase = null;
                        alert('Ошибка при оплате. Попробуйте еще раз.');
                    }
                });
            } else {
                if (webApp.openLink) {
                    webApp.openLink(invoiceUrl);
                } else {
                    alert('Ваша версия Telegram не поддерживает прямую оплату. Обновите приложение.');
                    window.currentPurchase = null;
                }
            }
        } else {
            window.currentPurchase = null;
            alert('Ошибка при создании платежа. Попробуйте еще раз.');
        }
    } catch (error) {
        window.currentPurchase = null;
        alert('Ошибка при обработке платежа. Попробуйте еще раз.');
    }
}

async function handleLegendCasePurchase() {
    // Проверяем, запущено ли приложение в Telegram
    if (!isTelegramApp || !window.Telegram || !window.Telegram.WebApp) {
        alert('Покупка доступна только в Telegram!');
        return;
    }
    
    const webApp = window.Telegram.WebApp;
    const userId = webApp.initDataUnsafe?.user?.id;
    
    if (!userId) {
        alert('Не удалось получить данные пользователя. Попробуйте перезапустить приложение.');
        return;
    }
    
    // Находим Legendary case в casesItems
    const legendCaseIndex = casesItems.findIndex(item => item.name === 'Legendary case');
    if (legendCaseIndex === -1) {
        console.error('Legendary case not found in casesItems');
        return;
    }
    
    // Устанавливаем флаг, что это Legend case из ячейки 6
    isLegendCaseFromCell6 = true;
    
    // Устанавливаем текущий индекс на Legendary case
    currentCasesIndex = legendCaseIndex;
    const legendCaseItem = {
        ...casesItems[legendCaseIndex],
        starsPrice: 149
    };
    
    // Сохраняем текущий кейс для использования после оплаты
    window.currentPurchase = {
        item: legendCaseItem,
        caseType: 'legend',
        caseIndex: legendCaseIndex
    };
    
    // Создаем invoice link и открываем его
    try {
        const invoiceUrl = await createInvoiceLinkForMiniApp(userId, legendCaseItem, legendCaseIndex);
        
        if (invoiceUrl && typeof invoiceUrl === 'string' && invoiceUrl.length > 0) {
            if (!invoiceUrl.startsWith('https://') && !invoiceUrl.startsWith('http://')) {
                console.error('Invalid invoice URL:', invoiceUrl);
                window.currentPurchase = null;
                return;
            }
            
            if (webApp.openInvoice) {
                webApp.openInvoice(invoiceUrl, (status) => {
                    if (status === 'paid') {
                        const purchaseData = window.currentPurchase;
                        if (purchaseData && purchaseData.item) {
                            currentCaseItem = purchaseData.item;
                            handleSuccessfulCasePurchase(purchaseData.item);
                            window.currentPurchase = null;
                        }
                    } else if (status === 'cancelled') {
                        window.currentPurchase = null;
                    } else if (status === 'failed') {
                        window.currentPurchase = null;
                        alert('Ошибка при оплате. Попробуйте еще раз.');
                    }
                });
            } else {
                if (webApp.openLink) {
                    webApp.openLink(invoiceUrl);
                } else {
                    alert('Ваша версия Telegram не поддерживает прямую оплату. Обновите приложение.');
                    window.currentPurchase = null;
                }
            }
        } else {
            window.currentPurchase = null;
            alert('Ошибка при создании платежа. Попробуйте еще раз.');
        }
    } catch (error) {
        window.currentPurchase = null;
        alert('Ошибка при обработке платежа. Попробуйте еще раз.');
    }
}

async function handleUltimaCasePurchase() {
    // Проверяем, запущено ли приложение в Telegram
    if (!isTelegramApp || !window.Telegram || !window.Telegram.WebApp) {
        alert('Покупка доступна только в Telegram!');
        return;
    }
    
    const webApp = window.Telegram.WebApp;
    const userId = webApp.initDataUnsafe?.user?.id;
    
    if (!userId) {
        alert('Не удалось получить данные пользователя. Попробуйте перезапустить приложение.');
        return;
    }
    
    // Находим Legendary case в casesItems (используем тот же элемент)
    const ultimaCaseIndex = casesItems.findIndex(item => item.name === 'Legendary case');
    if (ultimaCaseIndex === -1) {
        console.error('Legendary case not found in casesItems');
        return;
    }
    
    // Устанавливаем флаг, что это Ultima case из ячейки 7
    isUltimaCaseFromCell7 = true;
    
    // Устанавливаем текущий индекс на Legendary case
    currentCasesIndex = ultimaCaseIndex;
    const ultimaCaseItem = {
        ...casesItems[ultimaCaseIndex],
        starsPrice: 199
    };
    
    // Сохраняем текущий кейс для использования после оплаты
    window.currentPurchase = {
        item: ultimaCaseItem,
        caseType: 'ultima',
        caseIndex: ultimaCaseIndex
    };
    
    // Создаем invoice link и открываем его
    try {
        const invoiceUrl = await createInvoiceLinkForMiniApp(userId, ultimaCaseItem, ultimaCaseIndex);
        
        if (invoiceUrl && typeof invoiceUrl === 'string' && invoiceUrl.length > 0) {
            if (!invoiceUrl.startsWith('https://') && !invoiceUrl.startsWith('http://')) {
                console.error('Invalid invoice URL:', invoiceUrl);
                window.currentPurchase = null;
                return;
            }
            
            if (webApp.openInvoice) {
                webApp.openInvoice(invoiceUrl, (status) => {
                    if (status === 'paid') {
                        const purchaseData = window.currentPurchase;
                        if (purchaseData && purchaseData.item) {
                            currentCaseItem = purchaseData.item;
                            handleSuccessfulCasePurchase(purchaseData.item);
                            window.currentPurchase = null;
                        }
                    } else if (status === 'cancelled') {
                        window.currentPurchase = null;
                    } else if (status === 'failed') {
                        window.currentPurchase = null;
                        alert('Ошибка при оплате. Попробуйте еще раз.');
                    }
                });
            } else {
                if (webApp.openLink) {
                    webApp.openLink(invoiceUrl);
                } else {
                    alert('Ваша версия Telegram не поддерживает прямую оплату. Обновите приложение.');
                    window.currentPurchase = null;
                }
            }
        } else {
            window.currentPurchase = null;
            alert('Ошибка при создании платежа. Попробуйте еще раз.');
        }
    } catch (error) {
        window.currentPurchase = null;
        alert('Ошибка при обработке платежа. Попробуйте еще раз.');
    }
}

// Инициализация обработчика сообщений от бота
function initTelegramBotHandler() {
    if (!isTelegramApp || !window.Telegram || !window.Telegram.WebApp) {
        return;
    }
    
    const webApp = window.Telegram.WebApp;
    
    // Обработчик для получения данных от бота через MainButton или другие события
    // Бот может отправлять данные через webApp.sendData или через callback_query
    
    // Слушаем событие invoice_closed как дополнительный обработчик
    // (основная обработка происходит через callback openInvoice)
    if (webApp.onEvent) {
        webApp.onEvent('invoice_closed', (event) => {
            // Это событие может сработать, если callback openInvoice не сработал
            if (event && event.status === 'paid') {
                const purchaseData = window.currentPurchase;
                if (purchaseData && purchaseData.item) {
                    handleSuccessfulCasePurchase(purchaseData.item);
                    window.currentPurchase = null;
                } else {
                    // Fallback: используем текущий выбранный кейс
                    const item = casesItems[currentCasesIndex];
                    if (item) {
                        handleSuccessfulCasePurchase(item);
                    }
                }
            }
        });
    }
    
    // Обработчик для получения данных через sendData (если бот использует этот метод)
    // Это будет вызвано, когда бот отправит данные через webApp.sendData()
    if (webApp.onEvent) {
        webApp.onEvent('message', (data) => {
            try {
                const message = typeof data === 'string' ? JSON.parse(data) : data;
                
                if (message.type === 'invoice_url' && message.url) {
                    // Бот отправил URL invoice - открываем его
                    if (webApp.openInvoice) {
                        webApp.openInvoice(message.url, (status) => {
                            if (status === 'paid') {
                                const item = casesItems[message.caseIndex || currentCasesIndex];
                                if (item) {
                                    handleSuccessfulCasePurchase(item);
                                }
                            } else if (status === 'failed') {
                                alert('Ошибка при оплате. Попробуйте еще раз.');
                            }
                        });
                    } else if (webApp.openLink) {
                        webApp.openLink(message.url);
                    }
                } else if (message.type === 'purchase_success') {
                    const item = casesItems[message.caseIndex || currentCasesIndex];
                    if (item) {
                        handleSuccessfulCasePurchase(item);
                    }
                }
            } catch (error) {
                console.error('Ошибка при обработке сообщения от бота:', error);
            }
        });
    }
}

function animateShopRBCCollection(amount, callback) {
    // Центр экрана
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    
    // Получаем координаты SVG RBC в левой панели (аналогично логике для денег)
    function getRBCTargetPoint() {
        // Основной путь — info-panel
        const infoPanel = document.getElementById('info-panel');
        if (infoPanel) {
            // Ищем SVG-иконку RBC в указанном порядке приоритета
            let rbcIcon = null;
            
            // 1. img[src*="rbc-icon.svg"] — приоритет
            rbcIcon = infoPanel.querySelector('img[src*="rbc-icon.svg"]');
            
            // 2. .rbc-bg img.info-icon
            if (!rbcIcon) {
                rbcIcon = infoPanel.querySelector('.rbc-bg img.info-icon');
            }
            
            // 3. .rbc-bg img
            if (!rbcIcon) {
                rbcIcon = infoPanel.querySelector('.rbc-bg img');
            }
            
            // 4. img[src*="rbc"]
            if (!rbcIcon) {
                rbcIcon = infoPanel.querySelector('img[src*="rbc"]');
            }
            
            // 5. img.info-icon внутри rbc-cell
            if (!rbcIcon) {
                const rbcCell = document.getElementById('rbc-cell');
                if (rbcCell) {
                    rbcIcon = rbcCell.querySelector('img.info-icon');
                }
            }
            
            // Если иконка найдена и видима, используем центр её getBoundingClientRect()
            if (rbcIcon && rbcIcon.offsetParent !== null) {
                const iconRect = rbcIcon.getBoundingClientRect();
                if (iconRect.width > 0 && iconRect.height > 0) {
                    return {
                        x: iconRect.left + iconRect.width / 2 - 15, // Смещаем левее
                        y: iconRect.top + iconRect.height / 2
                    };
                }
            }
            
            // Fallback 2 — ячейка .rbc-bg
            const rbcBg = infoPanel.querySelector('.rbc-bg');
            if (rbcBg && rbcBg.offsetParent !== null) {
                const rbcRect = rbcBg.getBoundingClientRect();
                const isMobile = window.innerWidth <= 768;
                const iconSize = isMobile ? 24 : 24;
                return {
                    x: rbcRect.left + iconSize / 2 + (isMobile ? 8 : 10) - 15, // Смещаем левее
                    y: rbcRect.top + rbcRect.height / 2
                };
            }
            
            // Fallback 3 — rbc-cell напрямую
            const rbcCell = document.getElementById('rbc-cell');
            if (rbcCell && rbcCell.offsetParent !== null) {
                const cellRect = rbcCell.getBoundingClientRect();
                // Ищем иконку внутри ячейки
                const icon = rbcCell.querySelector('img[src*="rbc-icon.svg"]');
                if (icon) {
                    const iconRect = icon.getBoundingClientRect();
                    if (iconRect.width > 0 && iconRect.height > 0) {
                        return {
                            x: iconRect.left + iconRect.width / 2 - 15, // Смещаем левее
                            y: iconRect.top + iconRect.height / 2
                        };
                    }
                }
                // Если иконка не найдена, используем центр ячейки
                return {
                    x: cellRect.left + cellRect.width / 2 - 15, // Смещаем левее
                    y: cellRect.top + cellRect.height / 2
                };
            }
            
            // Fallback 4 — позиция панели
            const infoRect = infoPanel.getBoundingClientRect();
            const isMobile = window.innerWidth <= 768;
            return {
                x: infoRect.left + (isMobile ? 25 : 30) - 15, // Смещаем левее
                y: infoRect.top + 50
            };
        }
        
        // Последний fallback
        return { x: window.innerWidth - 100, y: 50 };
    }
    
    const targetPoint = getRBCTargetPoint();
    const endX = targetPoint.x;
    const endY = targetPoint.y;
    
    // Количество RBC иконок (как в анимации сбора дохода + 15)
    const rbcCount = Math.min(Math.max(Math.floor(amount / 500), 10), 25) + 15;
    const spreadDuration = 600;
    const pauseDuration = 300;
    const collectDuration = 1200;
    
    // Создаем контейнер для всех RBC
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    // Создаем центральный SVG алмазов с подсветкой и черным контуром
    const centerDiamonds = document.createElement('img');
    centerDiamonds.src = diamondsItems[currentDiamondsIndex].image;
    centerDiamonds.style.position = 'fixed';
    centerDiamonds.style.width = '100px';
    centerDiamonds.style.height = '100px';
    centerDiamonds.style.left = startX + 'px';
    centerDiamonds.style.top = startY + 'px';
    centerDiamonds.style.transform = 'translate(-50%, -50%)';
    centerDiamonds.style.objectFit = 'contain';
    centerDiamonds.style.opacity = '0';
    centerDiamonds.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    centerDiamonds.style.zIndex = '10000';
    centerDiamonds.style.filter = 'drop-shadow(0 0 30px rgba(255,255,255,0.8)) drop-shadow(0 0 4px rgba(0,0,0,1)) drop-shadow(0 0 0px rgba(0,0,0,0.9))';
    container.appendChild(centerDiamonds);
    
    // Показываем центральный SVG
    requestAnimationFrame(() => {
        centerDiamonds.style.opacity = '1';
        centerDiamonds.style.transform = 'translate(-50%, -50%) scale(1.2)';
    });
    
    let completedCount = 0;
    
    // Создаем RBC иконки (аналогично анимации сбора дохода)
    for (let i = 0; i < rbcCount; i++) {
        const rbcIcon = document.createElement('img');
        rbcIcon.src = 'assets/svg/rbc-icon.svg';
        rbcIcon.style.position = 'fixed';
        rbcIcon.style.width = '32px';
        rbcIcon.style.height = '32px';
        rbcIcon.style.left = startX + 'px';
        rbcIcon.style.top = startY + 'px';
        rbcIcon.style.transform = 'translate(-50%, -50%)';
        rbcIcon.style.opacity = '0';
        rbcIcon.style.transition = 'opacity 0.2s ease';
        rbcIcon.style.zIndex = '10000';
        container.appendChild(rbcIcon);
        
        // Показываем иконку
        requestAnimationFrame(() => {
            rbcIcon.style.opacity = '1';
        });
        
        // Угол разлёта для каждой иконки (равномерно по кругу с небольшим рандомом)
        const baseAngle = (Math.PI * 2 * i) / rbcCount;
        const spreadAngle = baseAngle + (Math.random() - 0.5) * 0.6;
        const spreadRadius = 60 + Math.random() * 40;
        
        // Конечная точка разлёта
        const spreadEndX = startX + Math.cos(spreadAngle) * spreadRadius;
        const spreadEndY = startY + Math.sin(spreadAngle) * spreadRadius;
        
        // Случайная задержка для асинхронности
        const delay = Math.random() * 300;
        
        const iconSpreadDuration = spreadDuration * (0.85 + Math.random() * 0.5);
        const iconPauseDuration = pauseDuration * (0.7 + Math.random() * 0.6);
        const iconCollectDuration = collectDuration * (0.85 + Math.random() * 0.5);
        const iconTotalDuration = iconSpreadDuration + iconPauseDuration + iconCollectDuration;
        
        setTimeout(() => {
            const startTime = performance.now();
            
            // Инициализируем целевую точку
            let targetPoint = getRBCTargetPoint();
            let endX = targetPoint.x;
            let endY = targetPoint.y;
            
            function animate(currentTime) {
                const elapsed = currentTime - startTime;
                const spreadProgress = Math.min(elapsed / iconSpreadDuration, 1);
                const pauseStart = iconSpreadDuration;
                const collectStart = iconSpreadDuration + iconPauseDuration;
                const totalProgress = Math.min(elapsed / iconTotalDuration, 1);
                
                // Пересчитываем позицию в начале анимации (когда progress < 0.1)
                if (spreadProgress < 0.1) {
                    targetPoint = getRBCTargetPoint();
                    endX = targetPoint.x;
                    endY = targetPoint.y;
                }
                
                if (spreadProgress < 1) {
                    // ФАЗА 1: Разлёт из центра
                    const easeSpread = 1 - Math.pow(1 - spreadProgress, 2); // Ease out
                    const currentX = startX + (spreadEndX - startX) * easeSpread;
                    const currentY = startY + (spreadEndY - startY) * easeSpread;
                    
                    rbcIcon.style.left = currentX + 'px';
                    rbcIcon.style.top = currentY + 'px';
                    
                    // Вращение при разлёте
                    const rotation = spreadProgress * 360;
                    rbcIcon.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                    
                    requestAnimationFrame(animate);
                } else if (elapsed < collectStart) {
                    // ПАУЗА: RBC остаются на месте разлёта
                    rbcIcon.style.left = spreadEndX + 'px';
                    rbcIcon.style.top = spreadEndY + 'px';
                    rbcIcon.style.transform = `translate(-50%, -50%) rotate(360deg)`;
                    
                    requestAnimationFrame(animate);
                } else if (totalProgress < 1) {
                    // ФАЗА 2: Полёт к панели RBC
                    const collectElapsed = elapsed - collectStart;
                    const collectProgress = Math.min(collectElapsed / iconCollectDuration, 1);
                    const easeCollect = 1 - Math.pow(1 - collectProgress, 3); // Ease out cubic
                    
                    // Текущая позиция (от точки разлёта к панели)
                    const currentX = spreadEndX + (endX - spreadEndX) * easeCollect;
                    const currentY = spreadEndY + (endY - spreadEndY) * easeCollect;
                    
                    rbcIcon.style.left = currentX + 'px';
                    rbcIcon.style.top = currentY + 'px';
                    
                    // Вращение и уменьшение при полёте
                    const rotation = 360 + collectProgress * 240;
                    const scale = 1.0 - collectProgress * 0.6;
                    rbcIcon.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
                    
                    requestAnimationFrame(animate);
        } else {
                    // Анимация исчезновения при достижении цели
                    rbcIcon.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
                    rbcIcon.style.opacity = '0';
                    rbcIcon.style.transform = `translate(-50%, -50%) scale(0.1)`;
                    
                    setTimeout(() => {
                        rbcIcon.remove();
                        completedCount++;
                        // Удаляем контейнер и вызываем callback, когда все иконки завершились
                        if (completedCount >= rbcCount) {
                            // Скрываем центральный SVG
                            centerDiamonds.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            centerDiamonds.style.opacity = '0';
                            centerDiamonds.style.transform = 'translate(-50%, -50%) scale(0.5)';
                            
                            setTimeout(() => {
                                if (container.parentNode) {
                                    container.remove();
                                }
                                if (callback) callback();
                            }, 300);
                        }
                    }, 100);
                }
            }
            
            requestAnimationFrame(animate);
        }, delay);
    }
    
    // Скрываем центральный SVG после задержки (когда частицы начинают собираться)
    setTimeout(() => {
        centerDiamonds.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        centerDiamonds.style.opacity = '0';
        centerDiamonds.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }, spreadDuration + pauseDuration + collectDuration * 0.3);
}

function animateShopMoneyCollection(amount, callback) {
    // Центр экрана
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;
    
    // Получаем правильные координаты панели денег (используем ту же логику, что и в анимации сбора прибыли)
    function getShopMoneyTargetPoint() {
        // Основной путь — info-panel
        const infoPanel = document.getElementById('info-panel');
        if (infoPanel) {
            // Ищем SVG-иконку денег в указанном порядке приоритета
            let moneyIcon = null;
            
            // 1. img[src*="bc-icon.svg"] — приоритет
            moneyIcon = infoPanel.querySelector('img[src*="bc-icon.svg"]');
            
            // 2. .bc-bg img.info-icon
            if (!moneyIcon) {
                moneyIcon = infoPanel.querySelector('.bc-bg img.info-icon');
            }
            
            // 3. .bc-bg img
            if (!moneyIcon) {
                moneyIcon = infoPanel.querySelector('.bc-bg img');
            }
            
            // 4. img[src*="money"]
            if (!moneyIcon) {
                moneyIcon = infoPanel.querySelector('img[src*="money"]');
            }
            
            // 5. img.info-icon
            if (!moneyIcon) {
                moneyIcon = infoPanel.querySelector('img.info-icon');
            }
            
            // Если иконка найдена и видима, используем центр её getBoundingClientRect()
            if (moneyIcon && moneyIcon.offsetParent !== null) {
                const iconRect = moneyIcon.getBoundingClientRect();
                if (iconRect.width > 0 && iconRect.height > 0) {
                    return {
                        x: iconRect.left + iconRect.width / 2,
                        y: iconRect.top + iconRect.height / 2
                    };
                }
            }
            
            // Fallback 2 — ячейка .bc-bg
            const bcBg = infoPanel.querySelector('.bc-bg');
            if (bcBg && bcBg.offsetParent !== null) {
                const bcRect = bcBg.getBoundingClientRect();
                const isMobile = window.innerWidth <= 768;
                const iconSize = isMobile ? 20 : 24;
                return {
                    x: bcRect.left + iconSize / 2 + (isMobile ? 8 : 10),
                    y: bcRect.top + bcRect.height / 2
                };
            }
            
            // Fallback 3 — позиция панели
            const infoRect = infoPanel.getBoundingClientRect();
            const isMobile = window.innerWidth <= 768;
            return {
                x: infoRect.left + (isMobile ? 25 : 30),
                y: infoRect.top + 70
            };
        }
        
        // Fallback — money-panel
        const moneyPanel = document.getElementById('money-panel');
        if (moneyPanel) {
            const rect = moneyPanel.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }
        
        // Последний fallback
        return {
            x: window.innerWidth - 100,
            y: 50
        };
    }
    
    const targetPoint = getShopMoneyTargetPoint();
    
    const endX = targetPoint.x;
    const endY = targetPoint.y;
    
    // Количество денежных иконок (как в анимации сбора прибыли)
    const moneyCount = Math.min(Math.max(Math.floor(amount / 500), 10), 25);
    const spreadDuration = 600; // Как в анимации сбора прибыли
    const pauseDuration = 300; // Как в анимации сбора прибыли
    const collectDuration = 1200; // Как в анимации сбора прибыли
    
    // Создаем контейнер для всех денег
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    
    // Создаем центральный SVG денег с подсветкой и черным контуром
    const centerMoney = document.createElement('img');
    centerMoney.src = moneyItems[currentMoneyIndex].image;
    centerMoney.style.position = 'fixed';
    centerMoney.style.width = '100px';
    centerMoney.style.height = '100px';
    centerMoney.style.left = startX + 'px';
    centerMoney.style.top = startY + 'px';
    centerMoney.style.transform = 'translate(-50%, -50%)';
    centerMoney.style.objectFit = 'contain';
    centerMoney.style.opacity = '0';
    centerMoney.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    centerMoney.style.zIndex = '10000';
    // Оптимизированная подсветка и черный контур по форме SVG (не квадрат)
    centerMoney.style.filter = 'drop-shadow(0 0 40px rgba(255,255,255,0.9)) drop-shadow(0 0 4px rgba(0,0,0,1)) drop-shadow(0 0 0px rgba(0,0,0,0.9))';
    container.appendChild(centerMoney);
    
    // Показываем центральный SVG
            requestAnimationFrame(() => {
        centerMoney.style.opacity = '1';
        centerMoney.style.transform = 'translate(-50%, -50%) scale(1.2)';
    });
    
    let completedCount = 0;
    
    // Создаем денежные иконки
    setTimeout(() => {
        for (let i = 0; i < moneyCount; i++) {
            const moneyIcon = document.createElement('img');
            moneyIcon.src = 'assets/svg/money-icon.svg';
            moneyIcon.style.position = 'fixed';
            moneyIcon.style.width = '24px';
            moneyIcon.style.height = '24px';
            moneyIcon.style.left = startX + 'px';
            moneyIcon.style.top = startY + 'px';
            moneyIcon.style.transform = 'translate(-50%, -50%)';
            moneyIcon.style.opacity = '0';
            moneyIcon.style.transition = 'opacity 0.2s ease';
            moneyIcon.style.zIndex = '10000';
            container.appendChild(moneyIcon);
            
            // Показываем иконку
            requestAnimationFrame(() => {
                moneyIcon.style.opacity = '1';
            });
            
            // Угол разлёта
            const baseAngle = (Math.PI * 2 * i) / moneyCount;
            const spreadAngle = baseAngle + (Math.random() - 0.5) * 0.6;
            const spreadRadius = 80 + Math.random() * 60;
            
            const spreadEndX = startX + Math.cos(spreadAngle) * spreadRadius;
            const spreadEndY = startY + Math.sin(spreadAngle) * spreadRadius;
            
            const delay = Math.random() * 200;
            const iconSpreadDuration = spreadDuration * (0.85 + Math.random() * 0.5);
            const iconPauseDuration = pauseDuration * (0.7 + Math.random() * 0.6);
            const iconCollectDuration = collectDuration * (0.85 + Math.random() * 0.5);
            const iconTotalDuration = iconSpreadDuration + iconPauseDuration + iconCollectDuration;
            
            setTimeout(() => {
                const startTime = performance.now();
                
                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const spreadProgress = Math.min(elapsed / iconSpreadDuration, 1);
                    const pauseStart = iconSpreadDuration;
                    const collectStart = iconSpreadDuration + iconPauseDuration;
                    const totalProgress = Math.min(elapsed / iconTotalDuration, 1);
                    
                    if (spreadProgress < 1) {
                        const easeSpread = 1 - Math.pow(1 - spreadProgress, 2);
                        const currentX = startX + (spreadEndX - startX) * easeSpread;
                        const currentY = startY + (spreadEndY - startY) * easeSpread;
                        
                        moneyIcon.style.left = currentX + 'px';
                        moneyIcon.style.top = currentY + 'px';
                        
                        const rotation = spreadProgress * 360;
                        moneyIcon.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
                        
                        requestAnimationFrame(animate);
                    } else if (elapsed < collectStart) {
                        moneyIcon.style.left = spreadEndX + 'px';
                        moneyIcon.style.top = spreadEndY + 'px';
                        moneyIcon.style.transform = `translate(-50%, -50%) rotate(360deg)`;
                        
                        requestAnimationFrame(animate);
                    } else if (totalProgress < 1) {
                        const collectElapsed = elapsed - collectStart;
                        const collectProgress = Math.min(collectElapsed / iconCollectDuration, 1);
                        const easeCollect = 1 - Math.pow(1 - collectProgress, 3);
                        
                        // Пересчитываем целевую точку во время полета (на случай, если панель переместилась)
                        const currentTarget = getShopMoneyTargetPoint();
                        const currentX = spreadEndX + (currentTarget.x - spreadEndX) * easeCollect;
                        const currentY = spreadEndY + (currentTarget.y - spreadEndY) * easeCollect;
                        
                        moneyIcon.style.left = currentX + 'px';
                        moneyIcon.style.top = currentY + 'px';
                        
                        const rotation = 360 + collectProgress * 240;
                        const scale = 1.0 - collectProgress * 0.6;
                        moneyIcon.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${scale})`;
                        
                        requestAnimationFrame(animate);
        } else {
                        moneyIcon.style.transition = 'opacity 0.1s ease, transform 0.1s ease';
                        moneyIcon.style.opacity = '0';
                        moneyIcon.style.transform = `translate(-50%, -50%) scale(0.1)`;
                        
                        setTimeout(() => {
                            moneyIcon.remove();
                            completedCount++;
                            
                            if (completedCount >= moneyCount) {
                                // Скрываем центральный SVG
                                centerMoney.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                                centerMoney.style.opacity = '0';
                                centerMoney.style.transform = 'translate(-50%, -50%) scale(0.5)';
                                
                                setTimeout(() => {
                                    if (container.parentNode) {
                                        container.remove();
                                    }
                                    // Вызываем callback после завершения анимации
                                    if (callback) callback();
                                }, 300);
                            }
                        }, 100);
                    }
                }
                
                requestAnimationFrame(animate);
            }, delay);
        }
        
        // Скрываем центральный SVG после задержки (когда деньги начинают лететь)
        setTimeout(() => {
            centerMoney.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            centerMoney.style.opacity = '0';
            centerMoney.style.transform = 'translate(-50%, -50%) scale(0.8)';
        }, spreadDuration + pauseDuration + 100);
    }, 300);
}

// Все функции магазина удалены

// Функция для обновления уровней сотрудников
function updateEmployeeLevels() {
    // Обновляем массив employees с актуальными уровнями
    employees.forEach(emp => {
        const employeeKey = emp.name.toLowerCase().replace('ё', 'е');
        const level = parseInt(localStorage.getItem(`employee_${employeeKey}_level`) || '1');
        emp.level = level;
    });
    
    // Обновляем отображение в панели статистики
    if (window.employeeLevels && window.employeeLevels.updateAll) {
        window.employeeLevels.updateAll();
    }
}

// Функция для увеличения уровня сотрудника
function increaseEmployeeLevel(employeeName, amount = 1) {
    const employeeKey = employeeName.toLowerCase().replace('ё', 'е');
    const currentLevel = parseInt(localStorage.getItem(`employee_${employeeKey}_level`) || '1');
    const newLevel = currentLevel + amount;
    
    localStorage.setItem(`employee_${employeeKey}_level`, newLevel.toString());
    
    // Обновляем массив employees
    const employee = employees.find(emp => emp.name.toLowerCase().replace('ё', 'е') === employeeKey);
    if (employee) {
        employee.level = newLevel;
    }
    
    // Обновляем отображение
    updateEmployeeLevels();
    
    return newLevel;
}

// Экспортируем функции для использования в других файлах
window.updateEmployeeLevels = updateEmployeeLevels;
window.increaseEmployeeLevel = increaseEmployeeLevel;

// === USER ID SYSTEM ===

// Функция для генерации уникального ID пользователя
function generateUniqueUserId() {
    // Проверяем, есть ли уже сохраненный ID в localStorage
    let userId = localStorage.getItem('uniqueUserId');
    
    if (!userId) {
        // Генерируем новый уникальный ID
        // Используем timestamp + случайное число для уникальности
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 10000);
        userId = timestamp + random;
        
        // Сохраняем в localStorage
        localStorage.setItem('uniqueUserId', userId);
    }
    
    return parseInt(userId);
}

let currentUserId = generateUniqueUserId(); // Уникальный ID пользователя





// === award XP on upgrades ===



// Функция копирования ID пользователя
function copyUserId() {
    (async () => {
        try {
            // Используем currentUserId напрямую
            await navigator.clipboard.writeText(currentUserId.toString());
            
            // Показываем простое всплывающее уведомление
            showToast('ID скопирован в буфер обмена!');
            
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            
            // Fallback для старых браузеров
            const textArea = document.createElement('textarea');
            textArea.value = currentUserId.toString();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            // Показываем простое всплывающее уведомление
            showToast('ID скопирован в буфер обмена!');
        }
    })();
}

// Флаг для отслеживания инициализации магазина
let shopInitialized = false;

// Делаем функции управления активным состоянием кнопок глобально доступными
window.setActiveSideButton = setActiveSideButton;
window.clearActiveSideButton = clearActiveSideButton;

// Делаем функции Telegram глобально доступными
window.handleAvatarError = handleAvatarError;

// === PANEL ANIMATION FUNCTIONS ===
function showPanelWithAnimation(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    
    // Скрываем индикаторы прибыли при открытии любой панели
    if (window.hideProfitIndicators) {
        window.hideProfitIndicators();
    }
    
    // Принудительно очищаем все индикаторы прибыли
    if (window.clearAllProfitIndicators) {
        window.clearAllProfitIndicators();
    }
    
    // Скрываем бонус при открытии панели
    hideBonusIndicator();
    
    // Устанавливаем глобальные переменные для отслеживания состояния панелей
    if (panelId === 'shop-panel') {
        window.isShopPanelOpen = true;
        // Инициализируем магазин при открытии панели
        if (!shopInitialized) {
            try {
                initializeShop();
                shopInitialized = true;
            } catch (error) {
                console.error('Error initializing shop:', error);
            }
        }
    }
    if (panelId === 'characters-panel') {
        window.isCharactersPanelOpen = true;
    }
    if (panelId === 'city-panel') {
        window.isCityPanelOpen = true;
        // Рендерим карточки зданий при открытии панели
        setTimeout(() => {
            renderCity();
        }, 100);
    }
    if (panelId === 'profile-panel') {
        window.isProfilePanelOpen = true;
        // Обновляем данные профиля при открытии
        setTimeout(() => {
            syncLevelAndXP();
            // Обновляем данные из Telegram если доступны
            if (isTelegramApp) {
                updateProfileWithTelegram();
            }
        }, 100);
    }
    if (panelId === 'friends-panel') {
        window.isFriendsPanelOpen = true;
    }
    if (panelId === 'phone-panel') {
        window.isPhonePanelOpen = true;
    }
    if (panelId === 'bottom-banner-panel') {
        window.isBottomBannerOpen = true;
        // Скрываем индикаторы прибыли сразу при открытии панели инвестиций
        if (window.hideProfitIndicators) {
            window.hideProfitIndicators({ suppress: true });
        }
        // Принудительно очищаем все индикаторы прибыли сразу
        if (window.clearAllProfitIndicators) {
            window.clearAllProfitIndicators();
        }
    }
    
    // Показываем панель
    panel.style.display = 'flex';
    
    // Отслеживание открытия панели в PostHog
    if (window.posthogService && window.posthogService.isReady()) {
        window.posthogService.trackPanelOpened(panelId);
    }
    
    // Добавляем классы для анимации
    panel.classList.add('slide-in');
    
    // Убираем классы анимации после завершения
    setTimeout(() => {
        panel.classList.remove('slide-in');
    }, 400);
}

function hidePanelWithAnimation(panelId, callback = null) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    
    // Добавляем класс для анимации закрытия
    panel.classList.add('slide-out');
    
    // Скрываем панель после завершения анимации
    setTimeout(() => {
        panel.style.display = 'none';
        panel.classList.remove('slide-out');
        
        // Сбрасываем глобальные переменные при закрытии панелей
        if (panelId === 'shop-panel') {
            window.isShopPanelOpen = false;
        }
        if (panelId === 'characters-panel') {
            window.isCharactersPanelOpen = false;
        }
        if (panelId === 'city-panel') {
            window.isCityPanelOpen = false;
        }
        if (panelId === 'profile-panel') {
            window.isProfilePanelOpen = false;
        }
        if (panelId === 'friends-panel') {
            window.isFriendsPanelOpen = false;
        }
        if (panelId === 'phone-panel') {
            window.isPhonePanelOpen = false;
        }
        if (panelId === 'bottom-banner-panel') {
            window.isBottomBannerOpen = false;
            // Показываем индикаторы прибыли после окончательного закрытия панели инвестиций (после анимации)
            if (window.showProfitIndicators) {
                window.showProfitIndicators({ force: true });
            }
            // Обновляем индикаторы прибыли после закрытия
            if (window.updateProfitIndicators) {
                window.updateProfitIndicators();
            }
        }
        
        // Показываем индикаторы прибыли после закрытия панели (только если это не панель инвестиций)
        if (panelId !== 'bottom-banner-panel' && window.updateProfitIndicators) {
            setTimeout(() => {
                window.updateProfitIndicators();
            }, 100);
        }
        
        // Показываем бонус после закрытия панели (если он активен)
        setTimeout(() => {
            showBonusIndicatorIfActive();
        }, 100);
        
        // Дополнительная проверка через 200ms для надежности (только если это не панель инвестиций)
        if (panelId !== 'bottom-banner-panel') {
            setTimeout(() => {
                if (window.updateProfitIndicators) {
                    window.updateProfitIndicators();
                }
            }, 200);
        }
        
        if (callback) callback();
    }, 300);
}

// Делаем функции анимации панелей глобально доступными
window.showPanelWithAnimation = showPanelWithAnimation;
window.hidePanelWithAnimation = hidePanelWithAnimation;

// === ЯЧЕЙКА RBC В ЛЕВОЙ ПАНЕЛИ ===
// Обработчик для ячейки RBC - открывает магазин
safeAddEventListener('rbc-cell', 'click', () => {
    if (isAnyPanelOpen()) return; // Блокируем если открыта любая панель
    setActiveNavButton(1); // Активируем кнопку магазина в нижней навигации
    showPanelWithAnimation('shop-panel');
});

// Удаляем дублирующий обработчик для кнопки инвентаря

// Удаляем обработчики делегирования событий, которые могут срабатывать случайно

// Делаем функции глобально доступными
    // Функции инвентаря удалены

// Функция для открытия панели профиля
function openProfilePanel() {

    if (isAnyPanelOpen()) return;
    setActiveNavButton(5);
    showPanelWithAnimation('profile-panel');
    // Обновляем данные профиля
    setTimeout(() => {
        syncLevelAndXP();
        // Обновляем данные из Telegram если доступны
        if (isTelegramApp) {
            updateProfileWithTelegram();
        }
    }, 200);
}

// Делаем функцию глобально доступной
window.openProfilePanel = openProfilePanel;

// Универсальная функция для показа уведомлений о наградах
function showRewardNotification(title, rewards) {
    const overlay = document.getElementById('crate-overlay');
    
    // Создаем HTML для наград
    let rewardsHTML = '';
    if (rewards.money) {
        rewardsHTML += `<div style="display:flex;align-items:center;gap:8px;margin:8px 0;padding:8px 12px;background:rgba(255,255,255,0.1);border-radius:8px;border:1px solid rgba(255,255,255,0.2);">
            <div style="width:24px;height:24px;background:#ccc;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666;">PNG</div>
            <span style="font-size:18px;font-weight:600;color:#fff;">+${formatNumber(rewards.money)}$</span>
        </div>`;
    }
    if (rewards.credits) {
        rewardsHTML += `<div style="display:flex;align-items:center;gap:8px;margin:8px 0;padding:8px 12px;background:rgba(255,255,255,0.1);border-radius:8px;border:1px solid rgba(255,255,255,0.2);">
            <div style="width:24px;height:24px;background:#ccc;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666;">PNG</div>
            <span style="font-size:18px;font-weight:600;color:#fff;">+${rewards.credits}</span>
        </div>`;
    }
    if (rewards.xp) {
        rewardsHTML += `<div style="display:flex;align-items:center;gap:8px;margin:8px 0;padding:8px 12px;background:rgba(255,255,255,0.1);border-radius:8px;border:1px solid rgba(255,255,255,0.2);">
            <div style="width:24px;height:24px;background:#ccc;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666;">PNG</div>
            <span style="font-size:18px;font-weight:600;color:#fff;">+${rewards.xp} XP</span>
        </div>`;
    }
    
    overlay.innerHTML = `
        <div style="
            background: linear-gradient(135deg, #2d6a4f 0%, #1b4332 100%);
            padding: 24px 28px;
            border-radius: 16px;
            text-align: center;
            animation: purchasePop 0.5s ease-out;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            border: 2px solid rgba(255,255,255,0.1);
            max-width: 320px;
            width: 90%;
            position: relative;
            overflow: hidden;
        ">
            <!-- Декоративные элементы -->
            <div style="position:absolute;top:-20px;right:-20px;width:60px;height:60px;background:rgba(255,255,255,0.1);border-radius:50%;"></div>
            <div style="position:absolute;bottom:-30px;left:-30px;width:80px;height:80px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
            
            <!-- Иконка -->
            <div style="width:64px;height:64px;background:#ccc;border-radius:12px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:10px;color:#666;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.3));">
                PNG-image
            </div>
            
            <!-- Заголовок -->
            <h3 style="margin:0 0 20px;font-size:24px;font-weight:700;color:#fff;text-shadow:0 2px 4px rgba(0,0,0,0.3);">
                ${title}
            </h3>
            
            <!-- Награды -->
            <div style="margin-bottom:24px;">
                ${rewardsHTML}
            </div>
            
            <!-- Кнопка -->
            <button id="reward-ok" style="
                background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
                border: none;
                border-radius: 12px;
                color: #fff;
                font-size: 16px;
                font-weight: 600;
                padding: 12px 32px;
                cursor: pointer;
                transition: all 0.2s ease;
                box-shadow: 0 4px 12px rgba(76,175,80,0.3);
                text-transform: uppercase;
                letter-spacing: 0.5px;
            " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 16px rgba(76,175,80,0.4)'" 
               onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 12px rgba(76,175,80,0.3)'">
                Отлично!
            </button>
        </div>
    `;
    
    overlay.style.display = 'flex';
    overlay.querySelector('#reward-ok').onclick = () => {
        overlay.style.display = 'none';
    };
}

// Делаем функцию глобально доступной
window.showRewardNotification = showRewardNotification;
window.showPurchaseNotification = showPurchaseNotification;

// Функция показа панели наград для сейфов и сундуков
function showRewardPanel(itemType, rewards) {
    const panel = document.getElementById('reward-panel');
    const rewardIcon = document.getElementById('reward-icon');
    const rewardQuantity = document.getElementById('reward-quantity');
    const okBtn = document.getElementById('reward-ok-btn');
    
    // Определяем тип награды и устанавливаем иконку и количество
    let rewardIconSrc = '';
    let quantityText = '';
    
    // Приоритет: money > credits > coins > xp
    if (rewards.money) {
        rewardIconSrc = 'assets/svg/money-icon.svg';
        quantityText = `+${formatNumber(rewards.money)}`;
    } else if (rewards.credits) {
        rewardIconSrc = 'assets/svg/rbc-icon.svg';
        quantityText = `+${rewards.credits}`;
    } else if (rewards.coins) {
        rewardIconSrc = 'assets/svg/money-icon.svg';
        quantityText = `+${rewards.coins}`;
    } else if (rewards.xp) {
        rewardIconSrc = 'assets/svg/clock-icon.svg';
        quantityText = `+${rewards.xp} XP`;
    }
    
    // Устанавливаем иконку и количество
    if (rewardIconSrc) {
        rewardIcon.src = rewardIconSrc;
        rewardQuantity.textContent = quantityText;
    }
    
    // Сбрасываем анимацию
    rewardIcon.style.opacity = '0';
    rewardIcon.style.transform = 'translateY(0)';
    rewardQuantity.style.opacity = '0';
    rewardQuantity.style.transform = 'translateY(0)';
    if (okBtn) {
        okBtn.style.opacity = '0';
        okBtn.style.transform = 'translateY(10px)';
    }
    
    // Показываем панель с анимацией
    panel.style.display = 'flex';
    
    // Запускаем анимацию появления панели
    setTimeout(() => {
        const panelContent = document.getElementById('reward-panel-content');
        if (panelContent) {
            panelContent.style.transform = 'scale(1)';
            panelContent.style.opacity = '1';
        }
    }, 10);
    
    // Запускаем анимацию появления награды (медленно)
    setTimeout(() => {
        // Анимация иконки награды
        rewardIcon.style.transition = 'all 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        rewardIcon.style.opacity = '1';
        rewardIcon.style.transform = 'translateY(0) scale(1)';
        
        // Анимация количества (с небольшой задержкой)
        setTimeout(() => {
            rewardQuantity.style.transition = 'all 1s ease-out';
            rewardQuantity.style.opacity = '1';
            rewardQuantity.style.transform = 'translateY(0)';
            
            // Анимация появления кнопки после окончания анимации награды
            setTimeout(() => {
                if (okBtn) {
                    okBtn.style.opacity = '1';
                    okBtn.style.transform = 'translateY(0)';
                }
            }, 500);
        }, 300);
    }, 500);
    
    // Добавляем обработчики событий
    const closePanel = () => {
        // Сбрасываем анимацию награды
        rewardIcon.style.transition = 'all 0.3s ease-in';
        rewardIcon.style.opacity = '0';
        rewardIcon.style.transform = 'translateY(0)';
        rewardQuantity.style.transition = 'all 0.3s ease-in';
        rewardQuantity.style.opacity = '0';
        rewardQuantity.style.transform = 'translateY(0)';
        if (okBtn) {
            okBtn.style.opacity = '0';
            okBtn.style.transform = 'translateY(10px)';
        }
        
        const panelContent = document.getElementById('reward-panel-content');
        if (panelContent) {
            panelContent.style.transform = 'scale(0.8)';
            panelContent.style.opacity = '0';
        }
        
        setTimeout(() => {
            panel.style.display = 'none';
        }, 400);
    };
    
    if (okBtn) {
        okBtn.onclick = closePanel;
    }
}

// Делаем функцию глобально доступной
window.showRewardPanel = showRewardPanel;

// Экспортируем функцию в глобальную область для использования в statistics.js
window.syncLevelAndXP = syncLevelAndXP;

// Функция для инициализации синхронизации
function initializeSync() {
    syncLevelAndXP();
    
    // Добавляем периодическое обновление каждые 2 секунды
    setInterval(() => {
        const statisticsPanel = document.getElementById('statistics-panel');
        if (statisticsPanel && statisticsPanel.style.display === 'flex') {
            syncLevelAndXP();
        }
    }, 2000);
}

// Функция предзагрузки изображений магазина удалена

// Предварительная загрузка всех SVG персонажей и сотрудников
function preloadCharacterImages() {
    const characterImages = [
        // Персонажи для панели персонажей
        'assets/svg/characters-panel/blumy.svg',
        'assets/svg/characters-panel/redjy.svg',
        'assets/svg/characters-panel/grinny.svg',
        'assets/svg/characters-panel/purpe.svg',
        // Сотрудники для зданий
        'assets/svg/employees/blumy-hired.svg',
        'assets/svg/employees/grinni-hired.svg',
        'assets/svg/employees/purpe-hired.svg',
        'assets/svg/employees/redjy-hired.svg',
        'assets/svg/employees/not-hired.svg',
        // SVG зданий для панели города - предзагрузка при запуске игры
        'assets/svg/city-panel/factory.svg',
        'assets/svg/city-panel/library.svg',
        'assets/svg/city-panel/mail.svg',
        'assets/svg/city-panel/print.svg'
    ];
    
    characterImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
        // Добавляем обработчик для отслеживания загрузки
        img.onload = () => {

        };
        img.onerror = () => {
            console.warn(`⚠️ Failed to load character/employee image: ${imagePath}`);
        };
    });
    

}


// Предварительная загрузка всех ресурсов магазина
function preloadShopImages() {
    const shopImages = [
        // SVG денег
        'assets/svg/shop/Some money.svg',
        'assets/svg/shop/Lots of money.svg',
        'assets/svg/shop/Money Mountain.svg',
        // SVG алмазов
        'assets/svg/shop/A few diamonds.svg',
        'assets/svg/shop/Lots of diamonds.svg',
        'assets/svg/shop/Mountain of diamonds.svg',
        // Иконки
        'assets/svg/rbc-icon.svg',
        'assets/svg/bc-icon.svg',
        'assets/svg/money-icon.svg'
    ];
    
    shopImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            // Изображение загружено
        };
        img.onerror = () => {
            console.warn(`⚠️ Failed to load shop image: ${imagePath}`);
        };
    });
}

// Предварительная загрузка всех ресурсов магазина
function preloadShopImages() {
    const shopImages = [
        // SVG денег
        'assets/svg/shop/Some money.svg',
        'assets/svg/shop/Lots of money.svg',
        'assets/svg/shop/Money Mountain.svg',
        // SVG алмазов
        'assets/svg/shop/A few diamonds.svg',
        'assets/svg/shop/Lots of diamonds.svg',
        'assets/svg/shop/Mountain of diamonds.svg',
        // Иконки
        'assets/svg/rbc-icon.svg',
        'assets/svg/bc-icon.svg',
        'assets/svg/money-icon.svg'
    ];
    
    shopImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            // Изображение загружено
        };
        img.onerror = () => {
            console.warn(`⚠️ Failed to load shop image: ${imagePath}`);
        };
    });
}



// Флаг для отслеживания инициализации игры
let gameInitialized = false;

// Единый обработчик DOMContentLoaded для всех инициализаций
document.addEventListener('DOMContentLoaded', () => {
    // Предотвращаем повторную инициализацию
    if (gameInitialized) {

        return;
    }
    

    
    try {
        // Инициализируем User ID в профиле и настройках
        const profileUserId = document.getElementById('profile-user-id');
        if (profileUserId) {
            profileUserId.textContent = `ID ${currentUserId}`;
        }
        
        const settingsUserId = document.getElementById('settings-userid');
        if (settingsUserId) {
            settingsUserId.textContent = currentUserId;
        }
        
        // Делаем currentUserId глобально доступным
        window.currentUserId = currentUserId;
        
        // Инициализируем системы в правильном порядке
        initializeSync();
        
        // Предварительно загружаем изображения персонажей и сотрудников
        try {
            preloadCharacterImages();
        } catch (error) {
            console.error('Error during character/employee images preloading:', error);
        }
        
        // Инициализация магазина удалена
        
        // Добавляем дополнительную защиту от повторной инициализации
        Object.defineProperty(window, 'gameInitialized', {
            value: true,
            writable: false,
            configurable: false
        });
        
        gameInitialized = true;

        
        // Адаптируем UI для Telegram после полной инициализации
        if (isTelegramApp) {
            setTimeout(() => {
                adaptUIForTelegram();
            }, 100);
        }
    } catch (error) {
        console.error('Error during game initialization:', error);
        // Не позволяем ошибке инициализации влиять на работу игры
    }
});
