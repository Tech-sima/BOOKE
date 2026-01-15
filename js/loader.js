// Lightweight loader overlay controller
// Shows dark screen with animated rays, "BOOKE" title, tagline, percent, and Start button

(function(){
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    const progressText = document.getElementById('progress-text');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    // Canvas removed - using SVG loading screen instead

    // Public API exposed to window for main.js to hook
    // window.GameLoader.show(); window.GameLoader.hide(); window.GameLoader.setProgress(p)
    let hasStarted = false;      // игра уже была запущена
    let isReadyToStart = false;  // овал в состоянии "ИГРАТЬ"
    let displayProgress = 0;     // то, что видит пользователь
    let targetProgress = 0;      // целевое значение, которое выставляет логика загрузки

    const GameLoader = {
        show: function(){ overlay.style.display = 'flex'; },
        hide: function(){ overlay.style.display = 'none'; },
        setProgress: function(p){
            // Обновляем только целевое значение, визуалка догоняет его плавно
            const clamped = Math.max(0, Math.min(100, p));
            targetProgress = Math.max(targetProgress, clamped);
        },
        onStart: null
    };

    // Плавное обновление визуального прогресса (0 → 100, по 1)
    function animateProgress() {
        if (!isReadyToStart && targetProgress > displayProgress) {
            // Скорость: до 60% в секунду, но шагуем по 1%
            const step = 0.8;
            displayProgress = Math.min(targetProgress, displayProgress + step);
            const shown = Math.floor(displayProgress);

            // Пока не достигли 100% — показываем проценты
            if (progressText && shown < 100) {
                progressText.textContent = shown + '%';
            }
            if (progressBar) {
                progressBar.style.setProperty('--progress', (displayProgress / 100).toString());
            }
        }

        // Когда визуально дошли до 100% — переводим овал в режим кнопки "ИГРАТЬ"
        if (!isReadyToStart && displayProgress >= 100) {
            isReadyToStart = true;
            displayProgress = 100;
            targetProgress = 100;

            if (progressBar) {
                progressBar.style.setProperty('--progress', '1');
                progressBar.classList.add('ready');
            }
            if (progressText) {
                progressText.textContent = 'ИГРАТЬ';
                progressText.classList.add('play-appear');
            }
        }

        requestAnimationFrame(animateProgress);
    }

    // Клик по овалу запускает игру, только когда он в состоянии "ИГРАТЬ"
    if (progressBar) {
        progressBar.addEventListener('click', () => {
            if (isReadyToStart && !hasStarted) {
                hasStarted = true;

                if (progressContainer) {
                    progressContainer.style.opacity = '0';
                    progressContainer.style.transform = 'translateY(8px)';
                    progressContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                }

                setTimeout(() => {
                    if (typeof GameLoader.onStart === 'function') {
                        GameLoader.onStart();
                    }
                    GameLoader.hide();
                }, 400);
            }
        });
    }

    // Simple preloader: preload key images and GLTF files via fetch HEAD
    async function preloadAssets() {
        const MIN_LOADING_TIME = 5000; // ms – специальная минимальная длительность загрузки
        const startTime = performance.now();

        const assets = [
            'assets/svg/shop-icon.svg',
            'assets/svg/ref-icon.svg'
        ];
        let loaded = 0;
        const total = assets.length;

        GameLoader.show();
        GameLoader.setProgress(1);

        for (const url of assets) {
            try {
                if (url.endsWith('.png') || url.endsWith('.svg')) {
                    await new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = resolve;
                        img.onerror = resolve; // don't block on failures
                        img.src = url;
                    });
                } else {
                    // Fetch with HEAD to warm cache
                    await fetch(url, { method: 'GET', cache: 'reload' }).catch(()=>{});
                }
            } catch (e) {
                // Ignore errors; continue progress
            }
            loaded += 1;
            // Во время реальной загрузки поднимаем прогресс максимум до 90%,
            // чтобы финальный рывок до 100% занял оставшееся время
            const realProgress = (loaded / total) * 90;
            GameLoader.setProgress(realProgress);
        }

        // Гарантируем, что общая загрузка занимает минимум MIN_LOADING_TIME
        const elapsed = performance.now() - startTime;
        const remaining = Math.max(0, MIN_LOADING_TIME - elapsed);

        setTimeout(() => {
            GameLoader.setProgress(100);
        }, remaining);
    }

    // Canvas animation removed - using SVG loading screen instead

    // Kick off preload and animation after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            animateProgress();
            preloadAssets();
        });
    } else {
        animateProgress();
        preloadAssets();
    }

    window.GameLoader = GameLoader;
})();


