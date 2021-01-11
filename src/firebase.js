import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBDinwn0s5KYv32o0KeM16afbYLcVVum8g",
  authDomain: "wirechat-21.firebaseapp.com",
  projectId: "wirechat-21",
  storageBucket: "wirechat-21.appspot.com",
  messagingSenderId: "911078668622",
  appId: "1:911078668622:web:8600901c75fb4dc49a461f",
  measurementId: "G-Y5MGES3RCB"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  firebase.analytics();
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth, provider, firebaseApp}
  export default db