import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.IG_CLONE_APIKEY,
  authDomain: process.env.IG_CLONE_AUTHDOMAIN,
  projectId: process.env.IG_CLONE_PROJECTID,
  storageBucket: process.env.IG_CLONE_STORAGEBUCKET,
  messagingSenderId: process.env.IG_CLONE_MESSAGINGSENDERID,
  appId: process.env.IG_CLONE_APPID,
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const storage = getStorage(app)

export const db = getFirestore(app)

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
}

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
}
