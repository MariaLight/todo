import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
    apiKey: "AIzaSyDW9FSWHxDSQqJgoQ3Cq6r1JmVFGvWf-Ew",
    authDomain: "todo-99cae.firebaseapp.com",
    projectId: "todo-99cae",
    storageBucket: "todo-99cae.firebasestorage.app",
    messagingSenderId: "1006337684387",
    appId: "1:1006337684387:web:158e9f00c0e2429874e016",
    databaseURL: 'https://todo-99cae-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
