// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getMessaging} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBygb2BrrEoSLhMlWYR5aadPAry8avkkxw",
    authDomain: "employee-management-dfd2b.firebaseapp.com",
    projectId: "employee-management-dfd2b",
    storageBucket: "employee-management-dfd2b.appspot.com",
    messagingSenderId: "1063426359440",
    appId: "1:1063426359440:web:8686d8ba093e2f7850d815",
    measurementId: "G-68402FTLXL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const messaging=getMessaging(app)
export { app, analytics ,messaging};
