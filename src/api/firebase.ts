import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAiEh-g7s4DJHmn1mkkxCIeaX4j0ObQQxo',
  authDomain: 'dream-diary-3e6e0.firebaseapp.com',
  projectId: 'dream-diary-3e6e0',
  storageBucket: 'dream-diary-3e6e0.appspot.com',
  messagingSenderId: '663595615033',
  appId: '1:663595615033:web:88a69b3ae198590c025ee8',
  measurementId: 'G-3626W1B1DM',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getFirestore(firebaseApp);
const firebiseAuth = getAuth(firebaseApp)
const firebaseStorage = getStorage(firebaseApp);

export { firebaseDb, firebiseAuth, firebaseStorage };
