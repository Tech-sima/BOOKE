(function(){
    // Isometric grid overlay for the map image
    const MAP_CONTAINER_ID = 'map-container';
    const MAP_IMAGE_ID = 'main-menu-image';
    const PAN_LAYER_ID = 'map-pan-layer';
    const CANVAS_ID = 'iso-grid-canvas';

    // Configuration (can be tweaked later)
    const CONFIG = {
        // Fixed tile width in pixels; height is half for isometric diamonds
        baseTileWidth: 90,
        minTileWidth: 60,
        maxTileWidth: 260,
        // Keep grid appearance identical across resolutions by using a fixed
        // number of tiles across the container width
        uniformAcrossResolutions: true,
        gridColsAcrossWidth: 12,
        strokeStyle: 'rgba(255,255,255,0.9)',
        lineWidth: 1.5,
        numberFillStyle: 'rgba(0,0,0,0.8)',
        numberFont: '12px Segoe UI, Arial, sans-serif',
        numberShadowColor: 'rgba(255,255,255,0.9)',
        numberShadowBlur: 2,
        maxGridRadius: 30 // radius in tile steps from center in both axes
    };
    
    // Default tiles to hide (removed) by number
    const DEFAULT_HIDDEN_NUMBERS = [
        118, 108, 129, 119, 109, 130, 120, 110,
        100, 99, 98, 87, 88, 89, 66, 67,
        76, 77, 78, 79,
        19, 20, 21, 22, 30, 31, 32, 33, 34, 23, 24, 40, 41, 42, 43, 44, 45, 50, 54, 55, 64, 65, 74, 75,
        12, 61, 62, 63, 71, 72, 73, 82, 83, 84, 85, 86
    ];

    let canvas = null;
    let ctx = null;
    let mapImage = null;
    let container = null;
    let panLayer = null;

    // Internal grid state
    const gridState = {
        tileWidth: CONFIG.baseTileWidth,
        tileHeight: Math.floor(CONFIG.baseTileWidth/2),
        centerX: 0,
        centerY: 0,
        tiles: new Map(),               // key: `${r}:${c}` -> { number, r, c, cx, cy }
        keyToNumber: new Map(),         // `${r}:${c}` -> number
        numberToKey: new Map(),         // number -> `${r}:${c}`
        hiddenNumbers: new Set(),       // numbers to hide (deleted)
        nextNumber: 1,
        mappingReady: false
    };

    function clamp(value, min, max){
        return Math.max(min, Math.min(max, value));
    }

    function ensureElements(){
        if (!container) container = document.getElementById(MAP_CONTAINER_ID);
        if (!container) return false;
        if (!mapImage) mapImage = document.getElementById(MAP_IMAGE_ID);
        if (!mapImage) return false;
        if (!panLayer) panLayer = document.getElementById(PAN_LAYER_ID);
        if (!canvas){
            canvas = document.getElementById(CANVAS_ID);
            if (!canvas){
                canvas = document.createElement('canvas');
                canvas.id = CANVAS_ID;
                canvas.style.position = 'absolute';
                canvas.style.left = '0';
                canvas.style.top = '0';
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                canvas.style.pointerEvents = 'none';
                canvas.style.zIndex = '2';
                canvas.style.transformOrigin = 'center center';
                canvas.style.transition = 'none';
                if (panLayer) {
                    panLayer.appendChild(canvas);
                } else {
                    container.appendChild(canvas);
                }
            }
            ctx = canvas.getContext('2d');
        }
        if (getComputedStyle(container).position === 'static'){
            container.style.position = 'relative';
        }
        if (getComputedStyle(container).overflow !== 'hidden'){
            container.style.overflow = 'hidden';
        }
        if (!panLayer) panLayer = document.getElementById(PAN_LAYER_ID);
        if (panLayer && canvas && canvas.parentElement !== panLayer){
            panLayer.appendChild(canvas);
        }
        return true;
    }

    function getReferenceRect(){
        const rect = container.getBoundingClientRect();
        return { width: Math.ceil(rect.width), height: Math.ceil(rect.height) };
    }

    function resizeCanvas(){
        const ok = ensureElements();
        if (!ok) return;
        const { width, height } = getReferenceRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.floor(width * dpr));
        canvas.height = Math.max(1, Math.floor(height * dpr));
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        gridState.centerX = Math.floor(width / 2);
        gridState.centerY = Math.floor(height / 2);
        // Scale tile size to keep the same number of tiles across width
        if (CONFIG.uniformAcrossResolutions && CONFIG.gridColsAcrossWidth > 0){
            const proposed = Math.floor(width / CONFIG.gridColsAcrossWidth);
            gridState.tileWidth = clamp(proposed, CONFIG.minTileWidth, CONFIG.maxTileWidth);
        } else {
            // Keep fixed tile size; do not auto-adapt on resize
            gridState.tileWidth = clamp(gridState.tileWidth, CONFIG.minTileWidth, CONFIG.maxTileWidth);
        }
        gridState.tileHeight = Math.floor(gridState.tileWidth / 2);
    }

    function syncCanvasTransform(){
        if (!mapImage || !canvas) return;
        const imgStyle = getComputedStyle(mapImage);
        canvas.style.transform = imgStyle.transform === 'none' ? 'none' : imgStyle.transform;
        canvas.style.transformOrigin = imgStyle.transformOrigin || 'center center';
        // Disable any animation on the grid overlay during image zooms
        canvas.style.transition = 'none';
    }

    function drawDiamond(cx, cy, w, h){
        ctx.beginPath();
        ctx.moveTo(cx, cy - h/2);
        ctx.lineTo(cx + w/2, cy);
        ctx.lineTo(cx, cy + h/2);
        ctx.lineTo(cx - w/2, cy);
        ctx.closePath();
        ctx.stroke();
    }

    function drawNumber(text, x, y){
        ctx.save();
        ctx.font = CONFIG.numberFont;
        ctx.fillStyle = CONFIG.numberFillStyle;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = CONFIG.numberShadowColor;
        ctx.shadowBlur = CONFIG.numberShadowBlur;
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    function getOrAssignNumberForKey(key){
        if (gridState.keyToNumber.has(key)) return gridState.keyToNumber.get(key);
        const num = gridState.nextNumber++;
        gridState.keyToNumber.set(key, num);
        gridState.numberToKey.set(num, key);
        return num;
    }

    function ensureNumberingAssigned(){
        if (gridState.mappingReady) return;
        const radius = CONFIG.maxGridRadius;
        for (let r = -radius; r <= radius; r++){
            for (let c = -radius; c <= radius; c++){
                const key = `${r}:${c}`;
                if (!gridState.keyToNumber.has(key)){
                    const num = gridState.nextNumber++;
                    gridState.keyToNumber.set(key, num);
                    gridState.numberToKey.set(num, key);
                }
            }
        }
        gridState.mappingReady = true;
    }

    function drawGrid(){
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = parseInt(canvas.style.width, 10) || 0;
        const height = parseInt(canvas.style.height, 10) || 0;
        if (!width || !height) return;

        const tileW = gridState.tileWidth;
        const tileH = gridState.tileHeight;
        const originX = gridState.centerX;
        const originY = gridState.centerY;

        ctx.lineWidth = CONFIG.lineWidth;
        ctx.strokeStyle = CONFIG.strokeStyle;

        gridState.tiles.clear();

        const radius = CONFIG.maxGridRadius;
        for (let r = -radius; r <= radius; r++){
            for (let c = -radius; c <= radius; c++){
                const cx = originX + (c - r) * (tileW / 2);
                const cy = originY + (c + r) * (tileH / 2);

                if (cx < -tileW || cx > width + tileW || cy < -tileH || cy > height + tileH){
                    continue;
                }

                const key = `${r}:${c}`;
                const number = gridState.keyToNumber.get(key) || getOrAssignNumberForKey(key);
                if (gridState.hiddenNumbers.has(number)) {
                    continue; // skip drawing hidden tiles
                }

                drawDiamond(cx, cy, tileW, tileH);
                gridState.tiles.set(key, { number, r, c, cx, cy });
            }
        }
    }

    function redraw(){
        resizeCanvas();
        syncCanvasTransform();
        drawGrid();
    }

    function observePanLayerCreation(){
        if (!container) return;
        const containerObserver = new MutationObserver(() => {
            const pl = document.getElementById(PAN_LAYER_ID);
            if (pl && canvas && canvas.parentElement !== pl){
                panLayer = pl;
                pl.appendChild(canvas);
                syncCanvasTransform();
            }
        });
        containerObserver.observe(container, { childList: true });
    }

    function init(){
        if (!ensureElements()) return;

        // Apply default hidden numbers
        DEFAULT_HIDDEN_NUMBERS.forEach(n => gridState.hiddenNumbers.add(n));

        if (mapImage.complete){
            redraw();
        } else {
            mapImage.addEventListener('load', redraw, { once: true });
        }

        const imgObserver = new MutationObserver((mutations)=>{
            for (const m of mutations){
                if (m.type === 'attributes' && m.attributeName === 'style'){
                    syncCanvasTransform();
                }
            }
        });
        imgObserver.observe(mapImage, { attributes: true, attributeFilter: ['style'] });

        mapImage.addEventListener('transitionend', (e)=>{
            if (e.propertyName === 'transform'){
                syncCanvasTransform();
            }
        });

        observePanLayerCreation();
        window.addEventListener('resize', redraw);

        // Public API
        window.isoGrid = {
            redraw,
            setTileSize(px){
                gridState.tileWidth = clamp(Math.floor(px), CONFIG.minTileWidth, CONFIG.maxTileWidth);
                gridState.tileHeight = Math.floor(gridState.tileWidth/2);
                redraw();
            },
            getTiles(){
                return Array.from(gridState.tiles.values());
            },
            hide(){ canvas && (canvas.style.display = 'none'); },
            show(){ canvas && (canvas.style.display = 'block'); },
            removeTileByNumber(n){
                if (typeof n !== 'number') return false;
                gridState.hiddenNumbers.add(n);
                drawGrid();
                return true;
            },
            restoreTileByNumber(n){
                gridState.hiddenNumbers.delete(n);
                drawGrid();
            },
            resetNumbering(){
                gridState.keyToNumber.clear();
                gridState.numberToKey.clear();
                gridState.hiddenNumbers.clear();
                gridState.nextNumber = 1;
                drawGrid();
            },
            getTileByNumber(n){
                const key = gridState.numberToKey.get(n);
                if (!key) return null;
                const t = gridState.tiles.get(key);
                if (t) return t;
                const [r,c] = key.split(':').map(Number);
                return { number: n, r, c };
            }
        };
    }

    if (document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
