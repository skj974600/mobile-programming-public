import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

import * as VueGoogleMaps from "vue2-google-maps" // Import package

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCCi_7tznaOyieARc7XxL4RgUgahQT-4Cs",
    libraries: "places",
    region: "KR"
  }
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
