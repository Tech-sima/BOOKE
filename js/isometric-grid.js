(function(){
    // Isometric grid overlay for the map image
    const MAP_CONTAINER_ID = 'map-container';
    const MAP_IMAGE_ID = 'main-menu-image';
    const PAN_LAYER_ID = 'map-pan-layer';
    const CANVAS_ID = 'iso-grid-canvas';

    // Configuration (can be tweaked later)
    const CONFIG = {
        // Fixed tile width in image pixels; height is half for isometric diamonds
        baseTileWidth: 90,
        minTileWidth: 60,
        maxTileWidth: 260,
        strokeStyle: 'rgba(0,0,0,0.25)',
        lineWidth: 1,
        numberFillStyle: 'rgba(0,0,0,0.8)',
        numberFont: '12px Segoe UI, Arial, sans-serif',
        numberShadowColor: 'rgba(255,255,255,0.9)',
        numberShadowBlur: 2
    };

    // Default tiles to hide (removed) by number
    const DEFAULT_HIDDEN_NUMBERS = [
        107, 94, 264, 265, 266, 267, 250, 251, 252, 253, 254, 237, 238, 239, 223, 224, 225, 226, 227, 212, 213, 214, 198, 199, 200, 201, 184, 185, 186, 187, 170, 171, 172, 173, 156, 157, 158, 159, 142, 143, 144, 145, 128, 129, 130, 131, 98, 112, 113, 126, 127, 125, 139, 140, 141, 153, 154, 155, 167, 168, 164, 151, 168, 124, 137, 150, 163, 136, 123, 110, 149, 135, 122, 109, 121, 108,
        72, 73, 74, 86, 87, 88, 99, 100, 101, 114, 115, 75, 60, 61, 62, 46, 47, 48, 34, 35, 24, 111, 168, 79, 80, 66, 40, 27, 54, 68, 82, 17, 28, 41, 55, 69, 83, 17, 18, 29, 42, 56, 70, 84, 85, 71, 57, 43, 30, 19, 10, 11, 20, 31, 44, 58, 45, 32, 21, 12, 5
    ];

    let canvas = null;
    let ctx = null;
    let mapImage = null;
    let container = null;
    let panLayer = null;

    // Internal grid state (tile sizes are in IMAGE PIXELS)
    const gridState = {
        tileWidth: CONFIG.baseTileWidth,
        tileHeight: Math.floor(CONFIG.baseTileWidth/2),
        tiles: new Map(),               // key: `${u}:${v}` -> { number, r: v, c: u, cx, cy }
        keyToNumber: new Map(),         // `${u}:${v}` -> number
        numberToKey: new Map(),         // number -> `${u}:${v}`
        hiddenNumbers: new Set(),       // numbers to hide (deleted)
        nextNumber: 1
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
        // Keep fixed tile size in IMAGE pixels
        gridState.tileWidth = clamp(gridState.tileWidth, CONFIG.minTileWidth, CONFIG.maxTileWidth);
        gridState.tileHeight = Math.floor(gridState.tileWidth / 2);
    }

    function syncCanvasTransform(){
        if (!mapImage || !canvas) return;
        const imgStyle = getComputedStyle(mapImage);
        canvas.style.transform = imgStyle.transform === 'none' ? 'none' : imgStyle.transform;
        canvas.style.transformOrigin = imgStyle.transformOrigin || 'center center';
        canvas.style.transition = imgStyle.transition && imgStyle.transition.includes('transform')
            ? imgStyle.transition
            : '';
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

    function drawGrid(){
        if (!ctx || !canvas) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const width = parseInt(canvas.style.width, 10) || 0;
        const height = parseInt(canvas.style.height, 10) || 0;
        if (!width || !height) return;

        // Natural image size (resolution-invariant basis)
        const nW = mapImage.naturalWidth || width;
        const nH = mapImage.naturalHeight || height;

        // Object-fit: cover uniform scale and centering offsets
        const s = Math.max(width / nW, height / nH);
        const offsetX = (width - nW * s) / 2;
        const offsetY = (height - nH * s) / 2;

        // Tile sizes in image and display pixels
        const tileW_img = gridState.tileWidth;
        const tileH_img = gridState.tileHeight;
        const tileW = tileW_img * s;
        const tileH = tileH_img * s;

        // Origin in image space: half-tile from top-left for neat coverage
        const O_img_x = tileW_img / 2;
        const O_img_y = tileH_img / 2;

        // Precompute constraints for u,v ranges to fully cover the image rect [0..nW] x [0..nH]
        const a_max = Math.floor(2 * nW / tileW_img - 1);           // for (u - v) <= a_max
        const b_max = Math.floor(2 * nH / tileH_img - 1);           // for (u + v) <= b_max
        const v_min = Math.ceil((-1 - a_max) / 2);
        const v_max = Math.floor((b_max + 1) / 2);

        ctx.lineWidth = CONFIG.lineWidth;
        ctx.strokeStyle = CONFIG.strokeStyle;

        gridState.tiles.clear();

        for (let v = v_min; v <= v_max; v++){
            const u_lower = -1 + Math.abs(v);
            const u_upper = Math.min(a_max + v, b_max - v);
            for (let u = Math.ceil(u_lower); u <= u_upper; u++){
                // Center in image pixels
                const cx_img = O_img_x + (u - v) * (tileW_img / 2);
                const cy_img = O_img_y + (u + v) * (tileH_img / 2);
                // Map to display pixels
                const cx = offsetX + cx_img * s;
                const cy = offsetY + cy_img * s;

                // Cull diamonds outside the visible canvas
                if (cx < -tileW || cx > width + tileW || cy < -tileH || cy > height + tileH){
                    continue;
                }

                const key = `${u}:${v}`;
                const number = getOrAssignNumberForKey(key);
                if (gridState.hiddenNumbers.has(number)) {
                    continue; // skip drawing hidden tiles
                }

                drawDiamond(cx, cy, tileW, tileH);
                drawNumber(String(number), cx, cy);
                gridState.tiles.set(key, { number, r: v, c: u, cx, cy });
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
        // Apply default hidden numbers before first draw
        DEFAULT_HIDDEN_NUMBERS.forEach(function(n){ gridState.hiddenNumbers.add(n); });

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
            // px is in IMAGE pixels to keep resolution-invariant mapping
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

                // Recompute current screen position from key deterministically
                const [uStr, vStr] = key.split(':');
                const u = parseInt(uStr, 10);
                const v = parseInt(vStr, 10);

                const width = parseInt(canvas.style.width, 10) || 0;
                const height = parseInt(canvas.style.height, 10) || 0;
                const nW = mapImage.naturalWidth || width;
                const nH = mapImage.naturalHeight || height;
                const s = Math.max(width / nW, height / nH);
                const offsetX = (width - nW * s) / 2;
                const offsetY = (height - nH * s) / 2;
                const tileW_img = gridState.tileWidth;
                const tileH_img = gridState.tileHeight;
                const O_img_x = tileW_img / 2;
                const O_img_y = tileH_img / 2;
                const cx_img = O_img_x + (u - v) * (tileW_img / 2);
                const cy_img = O_img_y + (u + v) * (tileH_img / 2);
                const cx = offsetX + cx_img * s;
                const cy = offsetY + cy_img * s;

                return { number: n, r: v, c: u, cx, cy };
            }
        };
    }

    if (document.readyState === 'loading'){
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }
})();
