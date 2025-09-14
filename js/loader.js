// Lightweight loader overlay controller
// Shows dark screen with animated rays, "BOOKE" title, tagline, percent, and Start button

(function(){
    const overlay = document.getElementById('loading-overlay');
    if (!overlay) return;
    const percentEl = document.getElementById('loading-percent');
    const startBtn = document.getElementById('start-button');
    const canvas = document.getElementById('veil-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;

    // Public API exposed to window for main.js to hook
    // window.GameLoader.show(); window.GameLoader.hide(); window.GameLoader.setProgress(p)
    const GameLoader = {
        show: function(){ overlay.style.display = 'flex'; },
        hide: function(){ overlay.style.display = 'none'; },
        setProgress: function(p){
            const clamped = Math.max(0, Math.min(100, Math.floor(p)));
            if (percentEl) percentEl.textContent = clamped + '%';
            if (clamped >= 100) {
                if (startBtn) {
                    // Show but reveal smoothly; keep percent updating live during the animation
                    if (startBtn.style.display !== 'inline-block') {
                        startBtn.style.display = 'inline-block';
                        requestAnimationFrame(() => {
                            startBtn.classList.add('revealed');
                        });
                    }
                }
            }
        },
        onStart: null
    };

    // Simple preloader: preload key images and GLTF files via fetch HEAD
    async function preloadAssets() {
        const assets = [
            'assets/png/main-menu-bg.png',
            'assets/svg/shop-icon.svg',
            'assets/svg/ref-icon.svg',
            'models/BOOKE_map.gltf',
            'models/BOOKE_map.bin'
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
            GameLoader.setProgress((loaded / total) * 100);
        }
    }

    // Wire start button
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            if (typeof GameLoader.onStart === 'function') {
                GameLoader.hide();
                GameLoader.onStart();
            } else {
                GameLoader.hide();
            }
        });
    }

    // Animated purple veil using layered noise-like sine fields
    let rafId = 0, t = 0;
    function resizeCanvas(){
        if(!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.max(1, Math.floor(rect.width * dpr));
        canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    }
    function lerp(a,b,x){return a + (b-a)*x}
    function drawVeil(){
        if(!ctx || !canvas) return;
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0,0,w,h);
        // base soft dark
        const baseGrad = ctx.createLinearGradient(0,0,w,h);
        baseGrad.addColorStop(0, 'rgba(20,0,30,0.6)');
        baseGrad.addColorStop(1, 'rgba(10,0,20,0.6)');
        ctx.fillStyle = baseGrad;
        ctx.fillRect(0,0,w,h);

        // shimmering bands
        const layers = 4;
        for(let i=0;i<layers;i++){
            const phase = t*0.0006 + i*0.9;
            const amp = lerp(0.08, 0.18, i/layers) * h;
            const yMid = h*(0.25 + i*0.18) + Math.sin(phase*2.0 + i)*amp*0.25;
            const grad = ctx.createLinearGradient(0, yMid-amp, w, yMid+amp);
            const hueShift = 260 + i*10; // purple spectrum
            grad.addColorStop(0.0, `hsla(${hueShift},100%,60%,0.00)`);
            grad.addColorStop(0.35, `hsla(${hueShift},100%,55%,0.22)`);
            grad.addColorStop(0.5, `hsla(${hueShift+10},100%,65%,0.35)`);
            grad.addColorStop(0.65, `hsla(${hueShift},100%,55%,0.22)`);
            grad.addColorStop(1.0, `hsla(${hueShift},100%,60%,0.00)`);
            ctx.fillStyle = grad;
            ctx.globalCompositeOperation = 'screen';
            ctx.fillRect(0, yMid-amp*1.2, w, amp*2.4);
        }

        // subtle moving highlight
        const x = (Math.sin(t*0.0004)+1)/2 * w;
        const hl = ctx.createRadialGradient(x, h*0.2, 10, x, h*0.2, w*0.6);
        hl.addColorStop(0, 'rgba(255,255,255,0.10)');
        hl.addColorStop(1, 'rgba(255,255,255,0.00)');
        ctx.fillStyle = hl;
        ctx.fillRect(0,0,w,h);

        t += 16;
        rafId = requestAnimationFrame(drawVeil);
    }

    if (canvas) {
        const onResize = () => { resizeCanvas(); };
        window.addEventListener('resize', onResize);
        resizeCanvas();
        rafId = requestAnimationFrame(drawVeil);
    }

    // Kick off preload after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preloadAssets);
    } else {
        preloadAssets();
    }

    window.GameLoader = GameLoader;
})();


