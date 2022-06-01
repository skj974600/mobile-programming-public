<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <div @click="move_main_page()">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </div>
      </div>

      <v-spacer></v-spacer>
      <v-btn text>
        <span>More</span>
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <div class="reviewlist" v-for="review in reviews" :key="review._id">
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-card-title primary-title>
                  <div>
                    <h2 class="headline mb-0">{{ review.bookName }}</h2>
                    <span style="display: inline-block; text-align: right;">{{ review.label }}</span>
                    <div>{{ review.review }}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn color="orange" @click="delete_report(review._id)">delete</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      newBookTitle: "",
      newBookMemo: "",
      newBookIndex: "",
      auth: getAuth(),
      reviews: [],
    };
  },
  methods: {
    move_main_page() {
      this.$router.push({ path: "/main" });
    },
    async takeReportFromDB(user) {
      const requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const res = await fetch(
        "http://141.164.51.245:5000/api/reviews/user/" + user,
        requestOptions
      );
      const jsonRes = await res.json();
      this.reviews = jsonRes.review;
      // this.$router.push({ path: "/main" });
    },
    async delete_report(report_id) {
      const requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };
      fetch("http://141.164.51.245:5000/api/reviews/id/" + report_id, requestOptions);
      this.$router.push({ path: "/main" });
    },
  },
  created() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.name = user.email;
        await this.takeReportFromDB(user.email);
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