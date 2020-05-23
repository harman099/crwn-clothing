import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyD7Y-VWAswPlyXEevuhZoWr_QBVLP6C6Ow",
  authDomain: "crwn-db-1c80b.firebaseapp.com",
  databaseURL: "https://crwn-db-1c80b.firebaseio.com",
  projectId: "crwn-db-1c80b",
  storageBucket: "crwn-db-1c80b.appspot.com",
  messagingSenderId: "288476163419",
  appId: "1:288476163419:web:cf33fdc04b6d11fbb2be7e",
  measurementId: "G-4RKRX2DDD9",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
