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
  apiKey: "AIzaSyCze87giTQFYjh8nOmea3T3uc_OP_fIXNc",
  authDomain: "test-7da0d.firebaseapp.com",
  projectId: "test-7da0d",
  storageBucket: "test-7da0d.appspot.com",
  messagingSenderId: "1009135980377",
  appId: "1:1009135980377:web:97f0830991cc020acf0648"
};

// Initialize Firebase
initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')