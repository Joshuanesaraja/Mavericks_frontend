import {
    encryptData,
    decryptData
} from "../../services/encryptionService";

const DB_NAME = "healthcare-app";
// const DB_VERSION = 1;
const DB_VERSION = 2;
const STORE_NAME = "appointmentQueue";

let dbPromise = null;

function openDatabase() {
    if (dbPromise) {
        return dbPromise;
    }

    dbPromise = new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(
                new Error(
                    "IndexedDB is not supported by this browser."
                )
            );

            return;
        }

        const request = window.indexedDB.open(
            DB_NAME,
            DB_VERSION
        );

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath: "id"
                    }
                );

                store.createIndex(
                    "createdAt",
                    "createdAt",
                    {
                        unique: false
                    }
                );
            }

            if (!db.objectStoreNames.contains("patientCache")) {
                db.createObjectStore(
                    "patientCache",
                    {
                        keyPath: "id"
                    }
                );
            }

            if (!db.objectStoreNames.contains("providerCache")) {
                db.createObjectStore(
                    "providerCache",
                    {
                        keyPath: "id"
                    }
                );
            }
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            dbPromise = null;
            reject(request.error);
        };
    });

    return dbPromise;
}

function createQueueId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return `appointment-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`;
}

export async function addQueuedAppointment(
    appointment
) {
    const db = await openDatabase();

    const id = createQueueId();

    const record = {
        id,
        createdAt: Date.now(),

        /*
         * Don't store the appointment payload as
         * plain text in IndexedDB.
         */
        payload: encryptData(appointment)
    };

    await new Promise(
        (resolve, reject) => {
            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readwrite"
                );

            transaction
                .objectStore(STORE_NAME)
                .add(record);

            transaction.oncomplete =
                resolve;

            transaction.onerror = () =>
                reject(
                    transaction.error
                );

            transaction.onabort = () =>
                reject(
                    transaction.error
                );
        }
    );

    return {
        id,
        appointment,
        createdAt: record.createdAt
    };
}

export async function getQueuedAppointments() {
    const db = await openDatabase();

    const records =
        await new Promise(
            (resolve, reject) => {
                const transaction =
                    db.transaction(
                        STORE_NAME,
                        "readonly"
                    );

                const request =
                    transaction
                        .objectStore(
                            STORE_NAME
                        )
                        .index(
                            "createdAt"
                        )
                        .getAll();

                request.onsuccess = () =>
                    resolve(
                        request.result || []
                    );

                request.onerror = () =>
                    reject(
                        request.error
                    );
            }
        );

    return records
        .sort(
            (a, b) =>
                a.createdAt -
                b.createdAt
        )
        .map((record) => ({
            id: record.id,
            createdAt:
                record.createdAt,

            appointment:
                decryptData(
                    record.payload
                )
        }));
}

export async function removeQueuedAppointment(
    id
) {
    const db = await openDatabase();

    await new Promise(
        (resolve, reject) => {
            const transaction =
                db.transaction(
                    STORE_NAME,
                    "readwrite"
                );

            transaction
                .objectStore(STORE_NAME)
                .delete(id);

            transaction.oncomplete =
                resolve;

            transaction.onerror = () =>
                reject(
                    transaction.error
                );

            transaction.onabort = () =>
                reject(
                    transaction.error
                );
        }
    );
}

// to load both patient and provider in offline

export async function saveCachedPatients(patients) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            "patientCache",
            "readwrite"
        );

        const store = transaction.objectStore(
            "patientCache"
        );

        store.put({
            id: "all",
            updatedAt: Date.now(),
            payload: encryptData(patients)
        });

        transaction.oncomplete = () => {
            resolve();
        };

        transaction.onerror = () => {
            reject(transaction.error);
        };
    });
}

export async function getCachedPatients() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            "patientCache",
            "readonly"
        );

        const store = transaction.objectStore(
            "patientCache"
        );

        const request = store.get("all");

        request.onsuccess = () => {
            const record = request.result;

            if (!record?.payload) {
                resolve([]);
                return;
            }

            try {
                resolve(
                    decryptData(record.payload)
                );
            } catch (error) {
                reject(error);
            }
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function saveCachedProviders(providers) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            "providerCache",
            "readwrite"
        );

        const store = transaction.objectStore(
            "providerCache"
        );

        store.put({
            id: "all",
            updatedAt: Date.now(),
            payload: encryptData(providers)
        });

        transaction.oncomplete = () => {
            resolve();
        };

        transaction.onerror = () => {
            reject(transaction.error);
        };
    });
}

export async function getCachedProviders() {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(
            "providerCache",
            "readonly"
        );

        const store = transaction.objectStore(
            "providerCache"
        );

        const request = store.get("all");

        request.onsuccess = () => {
            const record = request.result;

            if (!record?.payload) {
                resolve([]);
                return;
            }

            try {
                resolve(
                    decryptData(record.payload)
                );
            } catch (error) {
                reject(error);
            }
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}