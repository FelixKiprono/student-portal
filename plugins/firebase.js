import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

// Your web app's Firebase configuration (this are keys from your firebase)
const firebaseConfig = 
{
  apiKey: "AIzaSyCjzEA6QrrVvG2IUx6WkmErdU5UTXCtc7g",
  authDomain: "nctproject-a0347.firebaseapp.com",
  databaseURL: "https://nctproject-a0347.firebaseio.com",
  projectId: "nctproject-a0347",
  storageBucket: "nctproject-a0347.appspot.com",
  messagingSenderId: "878024507371",
  appId: "1:878024507371:web:ae68959fbc7b76646fe3ae",
  measurementId: "G-MCHXGKZJWB"
}
// Initialize Firebase

let app = null
app = firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const DB = firebase.database()
export const StoreDB = firebase.firestore()
export default firebase