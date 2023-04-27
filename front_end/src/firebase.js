import { initializeApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "nfticket-f0356.firebaseapp.com",
    databaseURL: "https://nfticket-f0356-default-rtdb.firebaseio.com",
    projectId: "nfticket-f0356",
    storageBucket: "nfticket-f0356.appspot.com",
    messagingSenderId: "575312394572",
    appId: "1:575312394572:web:8203623c9256f953eeb7e9"
};

const firebase = initializeApp(firebaseConfig);

// point to emulators if on localhost
const database = getDatabase(firebase);
console.log("HOSTNAME: ", window.location.hostname);
if (window.location.hostname === "127.0.0.1") {
    connectDatabaseEmulator(database, "127.0.0.1", 9000);
}
else if (window.location.hostname === "localhost") {
    connectDatabaseEmulator(database, "localhost", 9000);
}

//creating a root reference
const storage = getStorage(firebase);


export { database, firebase, storage };
