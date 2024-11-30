import { createRouter, createWebHistory } from 'vue-router'
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
  history: createWebHistory(),
  routes
})

export default router 