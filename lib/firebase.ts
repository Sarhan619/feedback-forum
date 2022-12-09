// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

const firebaseConfig = {
	apiKey: 'AIzaSyAkOylS70v5ueRZJ3qWMvXpHGRyHdjj1Sg',
	authDomain: 'feedback-app-school.firebaseapp.com',
	projectId: 'feedback-app-school',
	storageBucket: 'feedback-app-school.appspot.com',
	messagingSenderId: '701044882962',
	appId: '1:701044882962:web:43823d8771527576b0e2cb',
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);

export const functions = getFunctions(app);

export const callable = ({ name, data }: { name: string; data?: any }) =>
	httpsCallable(functions, name)(data);

// if (process.env.NODE_ENV !== 'production') {
// 	connectFunctionsEmulator(functions, '127.0.0.1', 5001);
// }

// if (process.env.NODE_ENV !== 'production') {
// 	connectFirestoreEmulator(db, '127.0.0.1', 8080);
// 	connectAuthEmulator(auth, 'http://localhost:9099');
// 	connectFunctionsEmulator(functions, '127.0.0.1', 5001);
// }
