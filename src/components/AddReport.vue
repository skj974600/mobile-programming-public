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
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="move_main_page">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Detail</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-item>
            <v-text-field
              label="도서명"
              placeholder="도서명은 무엇인가요?"
              autofocus
              hide-details
              outlined
              v-model="newBookTitle"
              class="pa-4"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-textarea
              label="독후감"
              placeholder="독후감을 적어주세요!"
              hide-details
              outlined
              v-model="newBookMemo"
              no-resize
              class="pa-4"
            ></v-textarea>
          </v-list-item>
          <v-list-item>
            <v-textarea
              label="라벨"
              placeholder="책의 종류(라벨)을 입력해주세요"
              hide-details
              outlined
              v-model="newBookIndex"
              no-resize
              class="pa-4"
            ></v-textarea>
          </v-list-item>
        </v-list>
        <v-bottom-navigation fixed>
          <v-row no-gutters>
            <v-col>
              <v-btn block height="100%" @click="move_main_page">
                <span>취소</span>
              </v-btn>
            </v-col>
            <v-col>
              <v-btn block height="100%" @click="sendreportToDB()">
                <span>저장</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-bottom-navigation>
      </v-card>
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
    };
  },
  methods: {
    move_main_page() {
      this.$router.push({ path: "/main" });
    },
    sendreportToDB() {
      // 독후감 DB 전송 추가
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        bookID: 5, // bookID 처리 어떻게...?
        userName: this.name,
        bookName: this.newBookTitle,
        review: this.newBookMemo,
        label: this.newBookIndex,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("//141.164.51.245:5000/api/reviews", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      //
      this.$router.push({ path: "/main" });
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