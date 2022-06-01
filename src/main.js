import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './route/index.js'
import './registerServiceWorker'

Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-UFUlHYxjTkQL75PyOUN1Fi-UVjG4u70",
  authDomain: "book-review-dd493.firebaseapp.com",
  projectId: "book-review-dd493",
  storageBucket: "book-review-dd493.appspot.com",
  messagingSenderId: "169987784035",
  appId: "1:169987784035:web:a28ea8dd6e4718de6be756"
};

// Initialize Firebase
initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')