import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAkLOvOoZ1PUoG5rkYlReBpyjNRIKHMnH8',
  authDomain: 'fir-project-13631.firebaseapp.com',
  projectId: 'fir-project-13631',
  storageBucket: 'fir-project-13631.appspot.com',
  messagingSenderId: '1079811418205',
  appId: '1:1079811418205:web:00b6e4c85e5556fe57c5b4',
  measurementId: 'G-24H0RXXSM0'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
