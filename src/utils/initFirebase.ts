// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

import config from "../config/firebase.json"

// Your web app's Firebase configuration
const firebaseConfig = config

console.log({ firebaseConfig })

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)
