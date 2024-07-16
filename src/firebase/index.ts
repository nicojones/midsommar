// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { getAuth } from "firebase/auth";
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
};

export const FB_UI_CONFIG: firebaseui.auth.Config = {
  signInSuccessUrl: ENV.url,
  siteName: ENV.name,
  signInFlow: "popup",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  // tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  // privacyPolicyUrl: function() {
  //   window.location.assign('<your-privacy-policy-url>');
  // },
};

// Initialize Firebase
export const fbApp = initializeApp(FB_CONFIG);
export const fbAnalytics = getAnalytics(fbApp);
export const fbAuth = getAuth(fbApp);
export const fbUi = new firebaseui.auth.AuthUI(fbAuth);
