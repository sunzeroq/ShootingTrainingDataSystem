import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import ListBullet from './views/ListBullet.vue'
import CreateBullet from './views/CreateBullet.vue'
import EditBullet from './views/EditBullet.vue'
import UserLogin from './views/Login.vue'
import UserRegister from './views/RegisterUser.vue'
import SubmitForm from './views/SubmitForm.vue'
import ListForm from './views/ListForm.vue'
import CreateSoldier from './views/CreateSoldier.vue'
import ListSoldier from './views/ListSoldier.vue'
import CanvasSoldier from './views/CanvasSoldier.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'user-login',
      component: UserLogin
    },
    {
      path: '/register',
      name: 'user-register',
      component: UserRegister
    },
    {
      path: '/',
      name: 'home',
      component: Main,
      children:[
        {
          path: '/bullets/index',
          name: 'list-bullets',
          component: ListBullet
        },
        {
          path: '/bullets/create',
          name: 'create-bullets',
          component: CreateBullet,
          
        },
        {
          path: '/bullets/:id/edit',
          name: 'edit-bullets',
          component: EditBullet
        },
        {
          path: '/submitform',
          name: 'submit-form',
          component: SubmitForm
        },
        {
          path: '/listform',
          name: 'list-form',
          component: ListForm
        },
        {
          path: '/createsoldier',
          name: 'create-soldier',
          component: CreateSoldier
        },
        {
          path: '/listsoldier',
          name: 'list-soldier',
          component: ListSoldier
        },
        {
          path: '/soldierform/:id/canvas',
          name: 'canvas-soldier',
          component: CanvasSoldier
        },
      ]
    },
    
  ]
})
