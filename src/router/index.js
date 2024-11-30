// 确保使用完整的导入路径
import { createRouter, createWebHashHistory } from 'vue-router/dist/vue-router.esm-bundler'
import ChoiceView from '../views/ChoiceView.vue'
import ShortAnswerView from '../views/ShortAnswerView.vue'
import ProgrammingView from '../views/ProgrammingView.vue'

const routes = [
  {
    path: '/',
    redirect: '/choice'
  },
  {
    path: '/choice',
    name: 'choice',
    component: ChoiceView
  },
  {
    path: '/short-answer',
    name: 'shortAnswer',
    component: ShortAnswerView
  },
  {
    path: '/programming',
    name: 'programming',
    component: ProgrammingView
  }
]

const router = createRouter({
  history: createWebHashHistory('/JAVA-EE/'),
  routes
})

export default router