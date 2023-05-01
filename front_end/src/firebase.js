import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getStorage, connectStorageEmulator } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "nfticket-f0356.firebaseapp.com",
    databaseURL: "https://nfticket-f0356-default-rtdb.firebaseio.com",
    projectId: "nfticket-f0356",
    storageBucket: "nfticket-f0356.appspot.com",
    messagingSenderId: "575312394572",
    appId: "1:575312394572:web:8203623c9256f953eeb7e9"
};

let firebase; // = initializeApp(firebaseConfig);

let database; //= getDatabase(firebase);

let storage; //= getStorage(firebase);

// point to local emulator if running locally
if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    firebase = initializeApp(firebaseConfig, {experimentalForceLongPolling: true});
    database = getDatabase(firebase);
    storage = getStorage(firebase);
    connectDatabaseEmulator(database, "localhost", 9000);
    connectStorageEmulator(storage, "localhost", 9199);
} else {
    firebase = initializeApp(firebaseConfig);
    database = getDatabase(firebase);
    storage = getStorage(firebase);
}

export { database, firebase, storage };
