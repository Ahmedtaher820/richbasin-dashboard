import { createWebHistory, createRouter } from "vue-router"
import Home from "../pages/index.vue"
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'contact',
            path: '/contact',
            component: () => import('../pages/contact.vue')
        },
        {
            name: 'news',
            path: '/news',
            component: () => import('../pages/news.vue')
        },
        {
            name: 'projects',
            path: '/projects',
            component: () => import('../pages/projects.vue')
        },
        {
            name: 'services',
            path: '/services',
            component: () => import('../pages/services.vue')
        },
        {
            name: 'teams',
            path: '/teams',
            component: () => import('../pages/teams.vue')
        },
        {
            name: 'csr',
            path: '/csr',
            component: () => import('../pages/csr.vue')
        },
        {
            name: 'login',
            path: '/login',
            component: () => import('../pages/login.vue')
        },

    ]

})
router.beforeEach((to, from, next) => {
    // @ts-ignore
    const auth = JSON.parse(localStorage.getItem('auth'))
    if (to.name === 'login' && auth){
        next({ name: 'home' })
    }
    else if (to.name === 'login' && !auth) {
        next()
    } else if (to.name !== 'login' && !auth) {
        next({ name: 'login'})
    } else {
        next()

    }
})
export default router