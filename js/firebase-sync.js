(function initRealtimeUserSync() {
    const SYNC_INTERVAL = 15000;
    const STORAGE_KEYS_TO_MONITOR = ['balance', 'buildingsData', 'profile.username', 'uniqueUserId'];

    let timerId = null;
    let lastPayloadHash = null;
    let firstSyncDone = localStorage.getItem('firebase.sync.initialized') === '1';

    const REQUIRED_BUILDINGS = ['library', 'factory', 'storage', 'print'];

    function getService() {
        return window.firebaseService && window.firebaseService.isReady()
            ? window.firebaseService
            : null;
    }

    function parseJSON(value, fallback = {}) {
        if (!value) return fallback;
        try {
            return JSON.parse(value);
        } catch (error) {
            console.warn('[firebase-sync] Failed to parse JSON', error);
            return fallback;
        }
    }

    function collectBuildingsSummary() {
        const raw = parseJSON(localStorage.getItem('buildingsData'));
        const status = {};
        let owned = 0;
        let upgraded = 0;

        REQUIRED_BUILDINGS.forEach((key) => {
            const info = raw[key] || {};
            const isOwned = Boolean(info.isOwned);
            const level = isOwned ? parseInt(info.level, 10) || 1 : 0;
            const isUpgraded = isOwned && level > 1;

            status[key] = {
                owned: isOwned,
                level,
                upgraded: isUpgraded,
                name: info.name || key
            };

            if (isOwned) owned += 1;
            if (isUpgraded) upgraded += 1;
        });

        return {
            raw,
            status,
            ownedCount: owned,
            upgradedCount: upgraded,
            label: `${owned}/${REQUIRED_BUILDINGS.length}`
        };
    }

    function collectProfileInfo() {
        const tgUser = typeof window.getTelegramUser === 'function' ? window.getTelegramUser() : null;
        const storedName = localStorage.getItem('profile.username') || null;

        return {
            username: storedName,
            telegram: tgUser
                ? {
                      id: tgUser.id || null,
                      username: tgUser.username || null,
                      firstName: tgUser.first_name || null,
                      lastName: tgUser.last_name || null
                  }
                : null
        };
    }

    function getBalance() {
        if (typeof window.getBalance === 'function') {
            return window.getBalance();
        }
        const raw = localStorage.getItem('balance');
        return raw ? parseFloat(raw) : 0;
    }

    function buildSnapshot(uid) {
        const buildings = collectBuildingsSummary();
        const profile = collectProfileInfo();
        const localUserId = window.currentUserId || localStorage.getItem('uniqueUserId') || null;

        return {
            authUid: uid,
            publicIds: {
                telegram: profile.telegram?.id || null,
                local: localUserId
            },
            balance: getBalance(),
            buildings: {
                ownedCount: buildings.ownedCount,
                upgradedCount: buildings.upgradedCount,
                label: buildings.label,
                status: buildings.status
            },
            buildingsData: buildings.raw,
            profile,
            platform: window.isTelegramApp ? 'telegram' : 'web',
            updatedAtClient: Date.now()
        };
    }

    async function pushSnapshot() {
        const service = getService();
        if (!service) {
            return;
        }

        let uid = service.getCurrentUid && service.getCurrentUid();
        if (!uid && typeof service.ensureAuthenticated === 'function') {
            try {
                const user = await service.ensureAuthenticated();
                uid = user && user.uid;
            } catch (error) {
                console.error('[firebase-sync] Cannot authenticate user:', error);
                return;
            }
        }

        if (!uid) {
            console.warn('[firebase-sync] Auth UID is missing. Skip sync.');
            return;
        }

        const payload = buildSnapshot(uid);
        const signature = JSON.stringify(payload);
        if (signature === lastPayloadHash) {
            return;
        }

        try {
            await service.saveUserProgress(uid, payload, { setFirstLogin: !firstSyncDone });
            lastPayloadHash = signature;
            if (!firstSyncDone) {
                firstSyncDone = true;
                localStorage.setItem('firebase.sync.initialized', '1');
            }
        } catch (error) {
            console.error('[firebase-sync] Failed to push snapshot', error);
        }
    }

    async function ensureLoop() {
        if (timerId) {
            return;
        }

        const service = window.firebaseService;
        if (!service) {
            return;
        }

        if (typeof service.authReady !== 'undefined') {
            const user = await service.authReady;
            if (!user) {
                console.warn('[firebase-sync] Firebase auth is not ready yet.');
                return;
            }
        }

        timerId = setInterval(pushSnapshot, SYNC_INTERVAL);
        pushSnapshot();
    }

    document.addEventListener('DOMContentLoaded', ensureLoop);
    document.addEventListener('firebase-service-ready', ensureLoop);
    window.addEventListener('focus', pushSnapshot);
    window.addEventListener('beforeunload', pushSnapshot);
    window.addEventListener('storage', (event) => {
        if (STORAGE_KEYS_TO_MONITOR.includes(event.key)) {
            pushSnapshot();
        }
    });
})();
