import firebase from 'firebase/app';

import 'firebase/messaging';


var firebaseConfig = {
  apiKey: "AIzaSyCmpJa3zWf0NaV0mS34ZTcTN-uhVbVIoGE",
  authDomain: "fives-88983.firebaseapp.com",
  databaseURL: "https://fives-88983.firebaseio.com",
  projectId: "fives-88983",
  storageBucket: "fives-88983.appspot.com",
  messagingSenderId: "760700635565",
  appId: "1:760700635565:web:7862e577b0ae8c9e7bb924",
  measurementId: "G-PQZ5S7M6MX"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  
}else {
  firebase.app(); // if already initialized, use that one
}
//firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging.getToken({vapidKey: 'BEjCkA_3fG2bMe_J5gbGPlm1CDUapI76IBmY1lI0f7klZEVZ3ScvNV6gStak_hAmw3xMHtroIrVaFgkyX9oG2ek'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});