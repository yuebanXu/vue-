import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Goods from '@/components/pages/goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Login from '@/components/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/Main',name: 'Main',component: Main,
    children:[
      {path: '/',name: 'ShoppingMall',component: ShoppingMall},
      {path: '/CategoryList',name: 'CategoryList',component: CategoryList},
      {path: '/Cart',name: 'Cart',component: Cart},
    ]
    },
    
    {path: '/register',name: 'Register',component: Register},
    {path: '/Login',name: 'Login',component: Login},
    {path: '/Goods',name: 'Goods',component: Goods},
    
  ]
})
