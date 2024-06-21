
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {apiKey: "AIzaSyBygb2BrrEoSLhMlWYR5aadPAry8avkkxw",
authDomain: "employee-management-dfd2b.firebaseapp.com",
projectId: "employee-management-dfd2b",
storageBucket: "employee-management-dfd2b.appspot.com",
messagingSenderId: "1063426359440",
appId: "1:1063426359440:web:8686d8ba093e2f7850d815",
measurementId: "G-68402FTLXL"};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});