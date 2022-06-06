import { createApp } from 'vue'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import App from './App.vue'

import HelloWorld from './components/HelloWorld.vue'
import About from './components/about.vue'

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
