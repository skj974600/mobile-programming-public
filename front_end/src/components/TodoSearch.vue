<template>
  <!-- search bar -->
  <div class="searchBox">
    <v-text-field
      dense
      single-line
      outlined
      autofocus
      rounded
      hide-details
      v-model="searchStat"
      v-on:keypress.enter="addTodoTitle"
    >
    </v-text-field>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false,
      searchStat: "",
    };
  },
  watch: {
    searchStat(stat) {
      if (stat) {
        this.$emit("searchTodo", stat);
      } else {
        this.$emit("removeSearched");
      }
    },
  },
  methods: {
    clearSearchStat() {
      console.log(this.searchStat);
      this.searchStat = "";
    },
  },
};
</script>

<style scoped>
.inputBox {
  position: fixed;
  background-color: white;
  width: 100%;
  left: 0;
  bottom: 0;
}
.searchBox {
  margin-left: auto;
  width: 40%;
}
</style>
