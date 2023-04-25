import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

export const firebaseApp = initializeApp({
  // your application settings
  apiKey: "AIzaSyDIoMd7gyZxaMwTIFaoBjSFc89aFNoGgtY",
  authDomain: "richbasin-3b5fa.firebaseapp.com",
  projectId: "richbasin-3b5fa",
  storageBucket: "richbasin-3b5fa.appspot.com",
  messagingSenderId: "1035865834977",
  appId: "1:1035865834977:web:3de17319da9a9c8b4a7ea0"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const servicesRef = collection(db, 'services')