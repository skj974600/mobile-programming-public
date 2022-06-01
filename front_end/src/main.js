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
  apiKey: "AIzaSyBoo71QTB2YnWV_VyIkeYBqQe55uIJOZcw",
  authDomain: "test2-841e4.firebaseapp.com",
  projectId: "test2-841e4",
  storageBucket: "test2-841e4.appspot.com",
  messagingSenderId: "393129925345",
  appId: "1:393129925345:web:89abbab9b288bb268275a0"
};

// Initialize Firebase
initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')