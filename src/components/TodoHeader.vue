<template>
  <v-container>
    <v-row justify="center">
      <h1>
        {{
          getTodoItemsLength() > 0
            ? getTodoItemsLength() + "개의 할일이 남아있어요! "
            : "한가하시네요! "
        }}
      </h1>
      <h1 class="date">{{ "(오늘은 " + timestamp + " 입니다.)" }}</h1>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["propsdata"],
  data() {
    return {
      timestamp: "",
    };
  },
  created() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const weekList = new Array("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
    const week = weekList[now.getDay()];
    this.timestamp = `${month}/${date} ${week}`;
  },
  methods: {
    // 할 일 상태인 것들의 개수를 구해주는 메서드
    getTodoItemsLength() {
      return this.propsdata.filter((item) => item.state === "todo").length;
    },
  },
};
</script>

<style scoped>
h1 {
  color: #2f3b52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
}
</style>
