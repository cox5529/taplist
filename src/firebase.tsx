import { initializeApp } from 'firebase/app';
import { browserSessionPersistence, getAuth, setPersistence } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBTrkz2PYjEULgbtPl-hNpvBBP6x_UYfOU',
  authDomain: 'taplist-444ae.firebaseapp.com',
  projectId: 'taplist-444ae',
  storageBucket: 'taplist-444ae.appspot.com',
  messagingSenderId: '833514639526',
  appId: '1:833514639526:web:3810ebc1efa41ceb716467',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence);
