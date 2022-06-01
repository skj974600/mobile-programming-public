import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import TodoLogin from '../components/TodoLogin'
import MainPage from '../components/MainPage'
import AddReport from '../components/AddReport'
import ReportList from '../components/ReportList'
import RecommandList from '../components/RecommandList'

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: TodoLogin },
        { path: '/main', component: MainPage },
        { path: '/addreport', component: AddReport},
        { path: '/reportlist', component: ReportList},
        { path: '/recommandlist', component: RecommandList},
        { path: '*', component: TodoLogin }
    ]
})

export default router