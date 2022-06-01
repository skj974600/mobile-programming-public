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
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title>추천도서</v-card-title>
            <v-card-subtitle>독후감을 바탕으로 도서를 추천해줍니다(대기시간 걸림)</v-card-subtitle>

            <v-card-actions>
              <v-btn class="blue white--text" block elevation="15" rounded @click="move_recommand_page">추천 도서</v-btn>
            </v-card-actions>

          </v-card>
          <v-card>
            <v-card-title>독후감 기록</v-card-title>
            <v-card-subtitle>본인이 작성한 독후감 기록을 볼 수 있습니다</v-card-subtitle>

            <v-card-actions>
              <v-btn class="blue white--text" block elevation="15" rounded @click="move_reportlist_page">독후감 기록</v-btn>
            </v-card-actions>

          </v-card>
          <v-spacer></v-spacer>
          <v-card>
            <v-card-title>독후감 작성</v-card-title>
            <v-card-subtitle>독후감을 작성합니다</v-card-subtitle>

            <v-card-actions>
              <v-btn class="blue white--text" block elevation="15" rounded @click="move_add_page">독후감 작성</v-btn>
            </v-card-actions>

          </v-card>
        </v-flex>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  name: "App",

  data() {
    return {
      auth: getAuth()      
    };
  },
  methods: {
    move_recommand_page() {
        this.$router.push({ path:"recommandlist" });
    },
    move_reportlist_page() {
        this.$router.push({ path:"reportlist" });
    },
    move_add_page() {
        this.$router.push({ path:"addreport"});
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
        this.$router.replace({path:"/"});
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