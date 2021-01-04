import Vue from 'vue'
import Router from 'vue-router'

import Home from '../components/Home'
import Login from '../components/Login'
import ChatRoomList from '../components/ChatRoomList'
import ChatRoom from '../components/ChatRoom'

Vue.use(Router)

const requireAuth = () => (from, to, next) => {
    const isAuthenticated = false
    if (isAuthenticated) return next()
    next('/login?returnPath=me')
}
export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/ChatRoomList',
            component: ChatRoomList,
            beforeEnter: requireAuth()
        },
        {
            path: '/chatRoom',
            component: ChatRoom
        }
    ]
})

