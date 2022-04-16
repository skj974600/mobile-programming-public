<template>
  <v-container>
    <transition-group class="pl-0" name="list" tag="ul">
      <!-- 상태가 todo인것만 보여줌 (v-show) -->
      <v-card class="mb-2 " v-for="(todoItem) in propsdata" :key="todoItem.id" v-show="(todoItem.state === 'todo')">
        <v-card-actions>
          <v-list-item class="list_item">
            <v-list-item-avatar @click="finishTodo(todoItem.id)">
              <v-icon class="grey lighten-1" dark> mdi-check </v-icon>
            </v-list-item-avatar>

            <v-list-item-content @click="showTodoDetail(todoItem.id)">
              <v-list-item-title v-text="todoItem.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action @click="removeTodo(todoItem.id)">
              <v-btn icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-card-actions>
      </v-card>
    </transition-group>

    <v-dialog
      v-model="showDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar
                dark
                color="primary"
            >
                <v-btn
                    icon
                    dark
                    @click="closeTodoDetail()"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Detail</v-toolbar-title>
            </v-toolbar>
            <v-list>
                <v-list-item>
                    <v-text-field
                        label="할 일"
                        hide-details
                        outlined
                        :readonly="updateMode ? false : true"
                        v-model="selectedTodoTitle"
                        @click="openUpdateMode()"
                        class="pa-4"
                    ></v-text-field>
                </v-list-item>
                <v-list-item>
                    <v-textarea
                        label="메모"
                        hide-details
                        outlined
                        :readonly="updateMode ? false : true"
                        v-model="selectedTodoMemo"
                        @click="openUpdateMode()"
                        no-resize
                        class="pa-4"
                    ></v-textarea>
                </v-list-item>
            </v-list>
            <v-bottom-navigation fixed>
                <v-row no-gutters v-if="!updateMode">
                    <v-col>
                        <v-btn block height="100%" @click="clickFinish()">
                            <span>완료</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block height="100%" @click="clickEdit()">
                            <span>편집</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block height="100%" @click="clickDelete()">
                            <span>삭제</span>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row no-gutters v-else>
                    <v-col>
                        <v-btn block height="100%" @click="clickCancel()">
                            <span>취소</span>
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn block height="100%" @click="clickSave()">
                            <span>저장</span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-bottom-navigation>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  props: ["propsdata"],
  data() {
    return {
      selectedTodo: null,  // 선택된 투두아이템 (전체) // 취소 눌렀을때 돌아가게 할려고 만들었음
      selectedTodoTitle: "", // 선택된 투두 아이템의 제목
      selectedTodoMemo: "",  // 선택된 투두 아이템의 메모
      showDialog: false,  // 상세보기 보여줄건지 말건지
      updateMode: false,  // 수정모드인지 아닌지
    }
  },
  methods: {
    // 할 일 완료
    finishTodo(id) {
      this.$emit("finishTodo", id);
    },

    // 할 일 삭제
    removeTodo(id) {
      this.$emit("removeTodo", id);
    },

    // 상세보기 보여주기 (여기서 selectedTodo를 세팅함)
    showTodoDetail(id) {
      const selectedTodo = this.propsdata.find((item) => item.id === id);
      this.selectedTodo = selectedTodo;
      this.selectedTodoTitle = selectedTodo.title;
      this.selectedTodoMemo = selectedTodo.memo;
      this.showDialog = true;
    },

    // 상세보기 닫기 (다 초기화)
    closeTodoDetail() {
      this.selectedTodo = null;
      this.selectedTodoTitle = "";
      this.selectedTodoMemo = "";
      this.showDialog = false;
      this.updateMode = false;
    },

    // 수정 모드 진입 (Text Input 눌렀을때 수정모드 진입할 수 있게 하기 위함)
    openUpdateMode() {
      if (!this.updateMode) {
        this.updateMode = true;
      }
    },

    // 완료 버튼 클릭
    clickFinish() {
      this.finishTodo(this.selectedTodo.id);
      this.showDialog = false;
    },

    // 편집 버튼 클릭
    clickEdit() {
      this.updateMode = true;
    },

    // 삭제 버튼 클릭
    clickDelete() {
      this.removeTodo(this.selectedTodo.id);
      this.showDialog = false;
    },

    // 취소 버튼 클릭
    clickCancel() {
      const { title, memo } = this.selectedTodo;
      this.selectedTodoTitle = title;
      this.selectedTodoMemo = memo;
      this.updateMode = false;
    },

    // 저장 버튼 클릭
    clickSave() {
      this.$emit("updateTodo", { id: this.selectedTodo.id, title: this.selectedTodoTitle, memo: this.selectedTodoMemo });
      this.selectedTodo = { ...this.selectedTodo, title: this.selectedTodoTitle, memo: this.selectedTodoMemo };
      this.updateMode = false;
    }
  },
};
</script>

<style scoped>
.list_item {
  width: 100%;
  text-align: left;
}
</style>
