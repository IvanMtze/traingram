import firebase from "firebase";

const firebaseApp = firebase.initializeApp({apiKey: "AIzaSyALPKFW7YBihXMi0323orzjn8dDVoHtF0k",
authDomain: "instagram-clone-995c8.firebaseapp.com",
projectId: "instagram-clone-995c8",
storageBucket: "instagram-clone-995c8.appspot.com",
messagingSenderId: "86480134538",
appId: "1:86480134538:web:5705a78c7f464c5949e873",
measurementId: "G-WNYLHJ2YWW"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};