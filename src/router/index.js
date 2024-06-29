import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import Register from '~/pages/register.vue'
import NotFound from '~/pages/404.vue'
import Activate from '~/pages/activate.vue'
import Admin from '~/layouts/admin.vue'

const routes = [
    {
        path: "/",
        component: Admin,
        // 子路由
        children: [{
            path: "/",
            component: Index,
            meta: {
                title: "后台首页"
            }
        }]
    }, {
        path: "/login",
        component: Login,
        meta: {
            title: "登录页"
        }
    },
    // {
    //     path: "/getinfo",
    //     component: getinfo,
    //     meta: {
    //         title: "登录页"
    //     }
    // }, 
    {
        path: "/register",
        component: Register,
        meta: {
            title: "注册页"
        }
    }, {
        path: "/activate/:uid/:token",
        component: Activate,
        meta: {
            title: "注册页"
        }
    }, {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    }]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router