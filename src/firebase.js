import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDcr5ZR9wW5T7h_X5T29Zcerf5L2qpQ4dY",
    authDomain: "whatsapp-mern-c316c.firebaseapp.com",
    projectId: "whatsapp-mern-c316c",
    storageBucket: "whatsapp-mern-c316c.appspot.com",
    messagingSenderId: "105890285077",
    appId: "1:105890285077:web:0731819f1cea8c2614301c"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider()

  export {auth, provider}
  export default db