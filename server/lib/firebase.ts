// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, Firestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator, Auth } from "firebase/auth";

const config = useRuntimeConfig();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: config.FIREBASE_API_KEY,
	authDomain: config.public.FIREBASE_AUTH_DOMAIN,
	projectId: config.public.FIREBASE_PROJECT_ID,
	storageBucket: config.public.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID,
	appId: config.public.FIREBASE_APP_ID,
	measurementId: config.public.FIREBASE_MEASUREMENT_ID,
};

function connectToEmulators(auth: Auth, firestore: Firestore) {
	if (config.public.ENVIORNMENT === "development") {
    console.log("Connecting to emulators");
    
		connectFirestoreEmulator(firestore, "localhost", 8080);
		connectAuthEmulator(auth, "http://localhost:9099");
	}
}

function initializeServices() {
	const firebaseApp = initializeApp(firebaseConfig);
	const firestore = getFirestore(firebaseApp);
	const auth = getAuth(firebaseApp);
  
	connectToEmulators(auth, firestore);

	return { auth, firestore, firebaseApp };
}

export const { auth, firestore, firebaseApp } = initializeServices();
