(function () {
    const COLLECTION_NAME = 'gameProgress';
    const config =
        (typeof window !== 'undefined' && (window.BOOKE_FIREBASE_CONFIG || window.firebaseConfig)) || null;

    if (typeof firebase === 'undefined') {
        console.error(
            '[Firebase] Firebase SDK not found. Include firebase-app-compat/firebase-auth-compat/firebase-firestore-compat before firebase-service.js.'
        );
        return;
    }

    if (!config) {
        console.error(
            '[Firebase] window.BOOKE_FIREBASE_CONFIG is not defined. Create js/firebase-config.js with your project keys before loading firebase-service.js.'
        );
        return;
    }

    let app = null;
    let db = null;
    let auth = null;
    let fieldValue = null;
    let currentUser = null;
    let resolveAuthReady;

    const authReady = new Promise((resolve) => {
        resolveAuthReady = resolve;
    });

    function emitReady(user) {
        currentUser = user || null;
        if (resolveAuthReady) {
            resolveAuthReady(currentUser);
            resolveAuthReady = null;
        }
        document.dispatchEvent(new CustomEvent('firebase-service-ready', { detail: { user: currentUser } }));
    }

    function initFirebase() {
        try {
            app = firebase.apps && firebase.apps.length ? firebase.app() : firebase.initializeApp(config);
            db = firebase.firestore();
            auth = firebase.auth();
            fieldValue = firebase.firestore.FieldValue;
        } catch (error) {
            console.error('[Firebase] Initialization failed:', error);
            emitReady(null);
            return;
        }

        auth.onAuthStateChanged(
            (user) => {
                emitReady(user);
            },
            (error) => {
                console.error('[Firebase] Auth state error:', error);
                emitReady(null);
            }
        );

        if (!auth.currentUser) {
            auth.signInAnonymously().catch((error) => {
                console.error('[Firebase] Anonymous auth failed:', error);
            });
        } else {
            emitReady(auth.currentUser);
        }
    }

    async function ensureAuthenticated() {
        if (currentUser) {
            return currentUser;
        }
        const user = await authReady;
        if (!user) {
            throw new Error('[Firebase] Authentication is not available.');
        }
        return user;
    }

    async function fetchUserProgress(docId) {
        if (!db || !docId) {
            return null;
        }
        await ensureAuthenticated();
        const docRef = db.collection(COLLECTION_NAME).doc(docId);
        const snapshot = await docRef.get();
        return snapshot.exists ? { id: snapshot.id, ...snapshot.data() } : null;
    }

    async function saveUserProgress(docId, payload, options = {}) {
        if (!db || !payload) {
            return;
        }
        const user = await ensureAuthenticated();
        const targetId = docId || user.uid;
        const docRef = db.collection(COLLECTION_NAME).doc(targetId);
        const dataToSave = {
            ...payload,
            authUid: targetId,
            updatedAt: fieldValue && fieldValue.serverTimestamp ? fieldValue.serverTimestamp() : new Date()
        };

        if (options.setFirstLogin && fieldValue && fieldValue.serverTimestamp) {
            dataToSave.firstLoginAt = fieldValue.serverTimestamp();
        }

        await docRef.set(dataToSave, { merge: true });
    }

    initFirebase();

    window.firebaseService = {
        get app() {
            return app;
        },
        get db() {
            return db;
        },
        get auth() {
            return auth;
        },
        FieldValue: fieldValue,
        authReady,
        ensureAuthenticated,
        isReady() {
            return Boolean(db && currentUser);
        },
        getCurrentUser() {
            return currentUser;
        },
        getCurrentUid() {
            return currentUser ? currentUser.uid : null;
        },
        fetchUserProgress,
        saveUserProgress
    };
})();

