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
      <TodoSearch
        class="search"
        v-on:searchTodo="searchTodo"
        v-on:removeSearched="removeSearched"
        v-bind:searched="searchedItems"
      />
    </v-app-bar>

    <v-main>
      <div class="main_wrapper">
        <TodoHeader v-if="searching" v-bind:propsdata="searchedItems" />
        <TodoHeader v-else v-bind:propsdata="todoItems" />
        <TodoList
          v-if="searching"
          v-bind:propsdata="searchedItems"
          @finishTodo="finishTodo"
          @updateTodo="updateTodo"
          @removeTodo="removeTodo"
        ></TodoList>
        <TodoList
          v-else
          v-bind:propsdata="todoItems"
          @finishTodo="finishTodo"
          @updateTodo="updateTodo"
          @removeTodo="removeTodo"
        ></TodoList>
        <TodoFooter v-if="getTodoItemsLength() > 0" v-on:removeAll="removeAll" />
      </div>
    </v-main>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
  </v-app>
</template>

<script>
import TodoFooter from "./components/TodoFooter.vue";
import TodoHeader from "./components/TodoHeader.vue";
import TodoList from "./components/TodoList.vue";
import TodoInput from "./components/TodoInput.vue";
import TodoSearch from "./components/TodoSearch.vue";

export default {
  name: "App",

  components: {
    TodoList,
    TodoFooter,
    TodoHeader,
    TodoInput,
    TodoSearch,
  },

  data() {
    return {
      todoItems: [],
      searchedItems: [],
      searching: false,
    };
  },
  methods: {
    // 할 일 상태인 것들의 개수를 구해주는 메서드
    getTodoItemsLength() {
      return this.todoItems.filter((item) => item.state === "todo").length;
    },

    // 할 일 등록
    addTodo(todoItem) {
      const { title, memo, index } = todoItem;

      let todoObj = {};

      if (localStorage.getItem("todo") && JSON.parse(localStorage.getItem("todo")).length > 0) {
        const localTodo = JSON.parse(localStorage.getItem("todo"));
        todoObj.id = localTodo[localTodo.length - 1].id + 1;
      } else {
        todoObj.id = 1;
      }

      todoObj = { ...todoObj, state: "todo", title: title || "", memo: memo || "", index: index || ""};

      this.todoItems.push(todoObj);
      localStorage.setItem("todo", JSON.stringify(this.todoItems));
    },

    // 할 일 완료
    finishTodo(id) {
      this.todoItems = this.todoItems.map((item) => {
        if (item.id === id) {
          return { ...item, state: "done" };
        } else {
          return item;
        }
      });
      localStorage.setItem("todo", JSON.stringify(this.todoItems));
    },

    // 할 일 수정
    updateTodo(todo) {
      const updatedTodoIndex = this.todoItems.findIndex((item) => item.id === todo.id);
      this.todoItems[updatedTodoIndex] = { ...todo, state: "todo" };
      localStorage.setItem("todo", JSON.stringify(this.todoItems));
    },
    
    // 검색 기능
    searchTodo(stat) {
      this.searching = true;
      this.searchedItems = this.todoItems.filter((todo) => {
        for (let e of stat.split(" ")) {
          if (todo.title.includes(e) || todo.memo.includes(e) || todo.index.includes(e)) {
            return true;
          }
        }
        return false;
      });
    },

    // 검색기록 삭제
    removeSearched() {
      this.searching = false;
      this.searchedItems = [];
    },

    // 할 일 삭제
    removeTodo(id) {
      this.todoItems = this.todoItems.filter((item) => item.id !== id);
      localStorage.setItem("todo", JSON.stringify(this.todoItems));
    },

    // 전체삭제
    removeAll() {
      localStorage.clear();
      this.todoItems = [];
    },
  },

  // 비유하자면 파이썬 class __init__ 같은 느낌 (시작하면 로컬스토리지에서 todolist 가져옴)
  created() {
    if (localStorage.getItem("todo")) {
      this.todoItems = JSON.parse(localStorage.getItem("todo"));
    }
  },
};
</script>

<style>
html {
  height: 100vh;
  overflow: hidden !important;
}
body {
  height: 100%;
  text-align: center;
  background-color: #dbc1d4;
}
#app {
  height: 100%;
}
.v-main {
  height: 100%;
  padding: 0 !important;
  margin: 56px 0px 88px 0px !important; 
}
.main_wrapper {
  height: calc(100% - 56px - 88px);
  overflow-y: auto;
  overflow-x: hidden;
}
.shadow {
  -webkit-box-shadow: 0px 0px 5px 0px rgba(181,181,181,1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(181,181,181,1);
  box-shadow: 0px 0px 5px 0px rgba(181,181,181,1);
}
.search {
  margin-left: auto;
}
</style>

