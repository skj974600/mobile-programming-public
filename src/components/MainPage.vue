<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn text>
        <span>More</span>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-card>
        <v-btn
          class="pink white--text"
          block
          elevation="15"
          rounded
          @click="move_recommand_page"
          >추천 도서</v-btn
        >
      </v-card>
      <v-spacer></v-spacer>
      <v-card>
        <v-btn
          class="pink white--text"
          block
          elevation="15"
          rounded
          @click="move_reportlist_page"
          >독후감 목록</v-btn
        >
      </v-card>
      <v-spacer></v-spacer>
      <v-card>
        <v-btn
          class="pink white--text"
          block
          elevation="15"
          rounded
          @click="move_add_page"
          >독후감 추가</v-btn
        >
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "App",

  data() {
    return {
      auth: getAuth(),
    };
  },
  methods: {
    move_recommand_page() {
      this.$router.push({ path: "recommandlist" });
    },
    move_reportlist_page() {
      this.$router.push({ path: "reportlist" });
    },
    move_add_page() {
      this.$router.push({ path: "addreport" });
    },
  },
  created() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.name = user.email;
        // ...
      } else {
        this.$router.replace({ path: "/" });
        // ...
      }
    });
  },
};
</script>

<style>
body {
  text-align: center;
  background-color: #f6f6f8;
}
input {
  border-style: groove;
  width: 200px;
}
.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}
</style>