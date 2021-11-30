importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


firebase.initializeApp({
  apiKey: "AIzaSyCmpJa3zWf0NaV0mS34ZTcTN-uhVbVIoGE",
  authDomain: "fives-88983.firebaseapp.com",
  databaseURL: "https://fives-88983.firebaseio.com",
  projectId: "fives-88983",
  storageBucket: "fives-88983.appspot.com",
  messagingSenderId: "760700635565",
  appId: "1:760700635565:web:7862e577b0ae8c9e7bb924",
  measurementId: "G-PQZ5S7M6MX"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
onMessageReceived()
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notifinpcationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };
  if (typeof window !== 'undefined'){
  this?.registration.showNotification(notificationTitle,
    notificationOptions);
  }
});
