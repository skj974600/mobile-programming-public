<template>
  <v-container>
    <v-row class="text-center">
    <div class="clearAllContainer">
      <span class="clearAllBtn pb-3" @click="clearTodo">Clear All</span>
    </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    // 전체 삭제
    clearTodo() {
      this.$emit("removeAll");
    },
  },
};
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: #f1dcff;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #808080;
  display: block;
}
</style>
