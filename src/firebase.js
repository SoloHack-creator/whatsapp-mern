import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyB7Jg03-0GjyCGlmECCxDDPT7sXH65U3_4',
  authDomain: 'whatsappmern-ef90c.firebaseapp.com',
  databaseURL: 'https://whatsappmern-ef90c.firebaseio.com',
  projectId: 'whatsappmern-ef90c',
  storageBucket: 'whatsappmern-ef90c.appspot.com',
  messagingSenderId: '887600281915',
  appId: '1:887600281915:web:d04bcfb28e48aeb19c9f1e',
  measurementId: 'G-LX0P8JWLR7',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const providerFacebook = new firebase.auth.FacebookAuthProvider();

export { auth, provider, providerFacebook };
export default db;
