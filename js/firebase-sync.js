(function initFirebaseSync() {
    const SYNC_INTERVAL_MS = 15000;
    let syncTimer = null;
    let lastSignature = null;
    let hasSyncedOnce = localStorage.getItem('firebase.sync.initialized') === '1';

    function getFirebaseService() {
        return window.firebaseService && window.firebaseService.isEnabled && window.firebaseService.isEnabled()
            ? window.firebaseService
            : null;
    }

    function resolveDocId() {
        const tgUser = typeof window.getTelegramUser === 'function' ? window.getTelegramUser() : null;
        if (tgUser && tgUser.id) {
            return `tg_${tgUser.id}`;
        }
        if (window.currentUserId) {
            return `uid_${window.currentUserId}`;
        }
        const storedId = localStorage.getItem('uniqueUserId');
        return storedId ? `uid_${storedId}` : null;
    }

    function safeParse(json) {
        if (!json) return {};
        try {
            return JSON.parse(json);
        } catch (error) {
            console.warn('[firebase-sync] Cannot parse buildingsData', error);
            return {};
        }
    }

    function collectBuildings() {
        const parsed = safeParse(localStorage.getItem('buildingsData'));
        const details = {};
        let ownedCount = 0;
        let upgradedCount = 0;

        Object.entries(parsed).forEach(([key, value]) => {
            const owned = Boolean(value && value.isOwned);
            const level = owned ? parseInt(value.level, 10) || 1 : 0;
            const upgraded = owned && level > 1;

            details[key] = {
                owned,
                level,
                upgraded,
                name: value?.name || null
            };

            if (owned) {
                ownedCount += 1;
            }
            if (upgraded) {
                upgradedCount += 1;
            }
        });

        return {
            raw: parsed,
            ownedCount,
            upgradedCount,
            details
        };
    }

    function collectProfile() {
        const tgUser = typeof window.getTelegramUser === 'function' ? window.getTelegramUser() : null;
        const username = localStorage.getItem('profile.username') || null;

        return {
            username,
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

    function collectBalance() {
        if (typeof window.getBalance === 'function') {
            return window.getBalance();
        }
        const stored = localStorage.getItem('balance');
        return stored ? parseFloat(stored) : 0;
    }

    function buildPayload() {
        const buildings = collectBuildings();
        return {
            userId: window.currentUserId || localStorage.getItem('uniqueUserId') || null,
            balance: collectBalance(),
            buildings: {
                ownedCount: buildings.ownedCount,
                upgradedCount: buildings.upgradedCount,
                status: buildings.details
            },
            buildingsData: buildings.raw,
            profile: collectProfile(),
            platform: window.isTelegramApp ? 'telegram' : 'web',
            updatedAtClient: Date.now()
        };
    }

    async function syncOnce() {
        const service = getFirebaseService();
        if (!service) {
            return;
        }

        const docId = resolveDocId();
        if (!docId) {
            return;
        }

        const payload = buildPayload();
        const signature = JSON.stringify(payload);
        if (signature === lastSignature && hasSyncedOnce) {
            return;
        }

        try {
            await service.saveUserProgress(docId, payload, { setFirstLogin: !hasSyncedOnce });
            lastSignature = signature;
            if (!hasSyncedOnce) {
                hasSyncedOnce = true;
                localStorage.setItem('firebase.sync.initialized', '1');
            }
        } catch (error) {
            console.error('[firebase-sync] Failed to sync user progress', error);
        }
    }

    function startSyncLoop() {
        if (syncTimer) {
            return;
        }
        syncTimer = setInterval(syncOnce, SYNC_INTERVAL_MS);
        syncOnce();
    }

    document.addEventListener('DOMContentLoaded', startSyncLoop);
    window.addEventListener('focus', syncOnce);
    window.addEventListener('beforeunload', syncOnce);
})();

