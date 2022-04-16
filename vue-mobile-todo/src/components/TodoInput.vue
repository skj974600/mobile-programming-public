<template>
    <div class="inputBox shadow">
        <v-row no-gutters align="center" class="pa-4">
            <v-text-field
                label="오늘은 무슨 일정이 있으신가요?"
                single-line
                outlined
                autofocus
                rounded
                hide-details
                v-model="newTodoItem"
                v-on:keypress.enter="addTodoTitle"
            ></v-text-field>

            <!-- 제목 + 내용 입력할 수 있는 UI를 띄워주는 버튼: 입력값이 없을 때 보임 -->
            <v-btn
                v-if="!newTodoItem"
                class="mx-2"
                fab
                dark
                color="deep-orange"
                @click="showDialog = true"
            >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>

            <!-- 제목만 간단하게 제출하는 버튼: 입력값이 있을 때 보임 -->
            <v-btn
                v-else
                class="mx-2"
                fab
                dark
                v-on:click="addTodoTitle"
                color="indigo"
            >
                <v-icon dark>
                    mdi-check
                </v-icon>
            </v-btn>
        </v-row>

        <!-- 경고창 모달 -->
        <modal v-if="showModal" @close="showModal = false">
            <h3 slot="header">경고</h3>
            <span slot="footer" @click="showModal = false">할 일을 입력하세요.
                <i class="closeModalBtn fas fa-times" aria-hidden="true"></i>
            </span>
        </modal>

        <!-- 상세보기 다이얼로그 -->
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
                        @click="showDialog = false"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>Detail</v-toolbar-title>
                </v-toolbar>
                <v-list>
                    <v-list-item>
                        <v-text-field
                            label="할 일"
                            placeholder="오늘은 무슨 일정이 있으신가요?"
                            autofocus
                            hide-details
                            outlined
                            v-model="newTodoTitle"
                            class="pa-4"
                        ></v-text-field>
                    </v-list-item>
                    <v-list-item>
                        <v-textarea
                            label="메모"
                            placeholder="자세한 내용을 적어주세요!"
                            hide-details
                            outlined
                            v-model="newTodoMemo"
                            no-resize
                            class="pa-4"
                        ></v-textarea>
                    </v-list-item>
                </v-list>
                <v-bottom-navigation fixed>
                    <v-row no-gutters>
                        <v-col>
                            <v-btn block height="100%" @click="showDialog = false">
                                <span>취소</span>
                            </v-btn>
                        </v-col>
                        <v-col>
                            <v-btn block height="100%" @click="addFullTodo()">
                                <span>저장</span>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-bottom-navigation>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import Modal from './common/AlertModal.vue'

export default {
    data() {
        return {
            newTodoItem: '',  // 제목만 있는 입력값
            newTodoTitle: '', // 상세보기 입력창에서의 제목
            newTodoMemo: '',  // 상세보기 입력창에서의 메모
            showModal: false,  // 경고창 띄워줄건지
            showDialog: false,  // 상세보기 띄워줄건지
        }
    },
    methods: {
        // 제목만 투두리스트에 등록하는 메서드
        addTodoTitle() {
            // 입력한게 있으면 등록
            if (this.newTodoItem !== "") {
                var title = this.newTodoItem && this.newTodoItem.trim();
                this.$emit('addTodo', { title });
                this.clearInput();

            // 없으면 경고창!!!!
            } else {
                this.showModal = !this.showModal;
            }
        },

        // 상세보기에서의 저장 (제목 + 메모 둘다 한번에 저장)
        addFullTodo() {
            this.$emit('addTodo', { title: this.newTodoTitle, memo: this.newTodoMemo });
            this.clearDialogInput();
            this.showDialog = false;
        },

        // 입력값 초기화
        clearInput() {
            this.newTodoItem = '';
        },

        // 상세보기 입력값 초기화
        clearDialogInput() {
            this.newTodoTitle = '';
            this.newTodoMemo = '';
        },
    },
    components: {
        Modal: Modal
    }
}
</script>

<style scoped>
.inputBox {
    position: fixed;
    background-color: white;
    width: 100%;
    left: 0;
    bottom: 0;
}
</style>
