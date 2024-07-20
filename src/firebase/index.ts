// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
import { ENV } from "@/environments/env";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const FB_CONFIG: FirebaseOptions = {
  apiKey: "AIzaSyDczxxyZKWR_5Y-B2XcSjP8F08QIUgXhBM",
  authDomain: "swedenmidsommar.firebaseapp.com",
  projectId: "swedenmidsommar",
  storageBucket: "swedenmidsommar.appspot.com",
  messagingSenderId: "717274358839",
  appId: "1:717274358839:web:9c88466ea752381b610bb2",
  measurementId: "G-8E1XNS2HV8",
  databaseURL: "https://swedenmidsommar-default-rtdb.europe-west1.firebasedatabase.app",
};

export const FB_UI_CONFIG: firebaseui.auth.Config = {
  callbacks: {
    // Called when the user has been successfully signed in.
    signInSuccessWithAuthResult: (authResult, _redirectUrl: string) => {

      if (authResult.user) {
        const isNewUser = authResult?.additionalUserInfo?.isNewUser ?? false;
        window.location.href = "/" + (isNewUser ? "?new=1" : "");
      }
      return false;
    },
  },
  signInSuccessUrl: ENV.url,
  siteName: ENV.name,
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // Whether the display name should be displayed in Sign Up page.
      requireDisplayName: true,
      signInMethod: "emailLink",
      disableSignUp: {
        status: false,
      },
    },
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

// Initialize Firebase
export const fbApp = initializeApp(FB_CONFIG);
export const fbAnalytics = getAnalytics(fbApp);
export const fbAuth = getAuth(fbApp);
export const fbUi = new firebaseui.auth.AuthUI(fbAuth);

export const fbDatabase = getDatabase(fbApp);
export const dbRef = (path: string) => ref(fbDatabase, ENV.dbPrefix + path);
