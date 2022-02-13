import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeRXzEmBAF4cSnpQeMnVI2vFgdaDX-vBE",
  authDomain: "arsh-cb78c.firebaseapp.com",
  projectId: "arsh-cb78c",
  storageBucket: "arsh-cb78c.appspot.com",
  messagingSenderId: "794719212017",
  appId: "1:794719212017:web:5794fb108b8d13b985b450",
  measurementId: "G-WZQKJ0C47B",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp;
export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

export function blogToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
  };
}
