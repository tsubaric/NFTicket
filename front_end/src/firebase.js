import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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
const database = getDatabase(firebase);

export { database, firebase };
