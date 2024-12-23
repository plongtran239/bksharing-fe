importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyBLQL4_uTm11M4xUsj2uKqT2080_V1nHA0",
  authDomain: "bk-sharing.firebaseapp.com",
  projectId: "bk-sharing",
  storageBucket: "bk-sharing.firebasestorage.app",
  messagingSenderId: 546314884443,
  appId: "1:546314884443:web:ced5fb057ae46cd3b2767e",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
