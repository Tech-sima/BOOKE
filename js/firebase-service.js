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

    if (typeof firebase === 'undefined') {
        console.warn('[Firebase] SDK not found. Skipping initialization.');
    } else if (isConfigFilled) {
        app = firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        fieldValue = firebase.firestore.FieldValue;
        console.info('[Firebase] Firestore initialized.');
    } else {
        console.warn('[Firebase] Configuration is incomplete. Update js/firebase-service.js with your project keys.');
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

    window.firebaseService = {
        app,
        db,
        isEnabled,
        FieldValue: fieldValue,
        fetchUserProgress,
        saveUserProgress
    };
})();

