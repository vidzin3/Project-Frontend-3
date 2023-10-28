// define router

import {createRouter,createWebHistory} from 'vue-router'
import home from '../view/home.vue'
import task from '../components/task.vue'

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            component: home
        },
        {
            path: '/task',
            component: task
        }
    ]
})

export default router