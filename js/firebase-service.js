(function () {
    const firebaseConfig = {
        apiKey: 'AIzaSyD0nX_4Z8xUWq3IlXuBEfhgFedwHT6bL8U"',
        authDomain: 'booke-a3b98.firebaseapp.com',
        projectId: 'booke-a3b98',
        storageBucket: 'booke-a3b98.firebasestorage.app',
        messagingSenderId: '872731055996',
        appId: '1:872731055996:web:cdc3713efd92c46d48b6f9'
    };

    const COLLECTION_NAME = 'gameProgress';

    const isConfigFilled = Object.values(firebaseConfig).every((value) => {
        return typeof value === 'string' && value.trim() !== '' && !value.includes('YOUR_FIREBASE_');
    });

let app = null;
let db = null;
let fieldValue = null;
let auth = null;
let currentUser = null;
let resolveAuthReady = null;
const authReady = new Promise((resolve) => {
    resolveAuthReady = resolve;
});

function notifyAuthReady(user) {
    currentUser = user || null;
    if (resolveAuthReady) {
        resolveAuthReady(currentUser);
        resolveAuthReady = null;
    }
    if (currentUser) {
        document.dispatchEvent(new CustomEvent('firebase-service-ready', { detail: { user: currentUser } }));
    }
}

    if (typeof firebase === 'undefined') {
        console.warn('[Firebase] SDK not found. Skipping initialization.');
    notifyAuthReady(null);
    } else if (isConfigFilled) {
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
    auth = firebase.auth ? firebase.auth() : null;
        fieldValue = firebase.firestore.FieldValue;
        console.info('[Firebase] Firestore initialized.');

    if (auth) {
        if (auth.currentUser) {
            notifyAuthReady(auth.currentUser);
        } else {
            const unsubscribe = auth.onAuthStateChanged(
                (user) => {
                    if (user) {
                        notifyAuthReady(user);
                        unsubscribe();
                    }
                },
                (error) => {
                    console.error('[Firebase] Auth state error:', error);
                    notifyAuthReady(null);
                    unsubscribe();
                }
            );
            auth.signInAnonymously().catch((error) => {
                console.error('[Firebase] Anonymous auth failed:', error);
                notifyAuthReady(null);
            });
        }
    }
    } else {
        console.warn('[Firebase] Configuration is incomplete. Update js/firebase-service.js with your project keys.');
    notifyAuthReady(null);
    }

    async function fetchUserProgress(docId) {
        if (!db || !docId) return null;
        const docRef = db.collection(COLLECTION_NAME).doc(docId);
        const snapshot = await docRef.get();
        if (!snapshot.exists) {
            return null;
        }
        return { id: snapshot.id, ...snapshot.data() };
    }

    async function saveUserProgress(docId, payload, options = {}) {
    if (!db || !docId || !payload) return;
        const docRef = db.collection(COLLECTION_NAME).doc(docId);
        const dataToSave = {
            ...payload,
            updatedAt: fieldValue && fieldValue.serverTimestamp ? fieldValue.serverTimestamp() : new Date()
        };

        if (options.setFirstLogin && fieldValue && fieldValue.serverTimestamp) {
            dataToSave.firstLoginAt = fieldValue.serverTimestamp();
        }

        await docRef.set(dataToSave, { merge: true });
    }

    function isEnabled() {
        return Boolean(db);
    }

function getCurrentUser() {
    if (currentUser) {
        return currentUser;
    }
    if (auth && auth.currentUser) {
        currentUser = auth.currentUser;
    }
    return currentUser;
}

function getCurrentUid() {
    const user = getCurrentUser();
    return user ? user.uid : null;
}

    window.firebaseService = {
        app,
        db,
        isEnabled,
    auth,
    authReady,
        FieldValue: fieldValue,
    getCurrentUser,
    getCurrentUid,
        fetchUserProgress,
        saveUserProgress
    };

window.firebaseServiceReady = authReady;
})();

