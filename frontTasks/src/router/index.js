
import { createRouter, createWebHistory } from 'vue-router';
import DisplayTasks from '../components/DisplayTask.vue';
import AddTask from '../components/AddTask.vue';

const routes = [
  {
    path: '/',
    name: 'DisplayTasks',
    component: DisplayTasks
  },
  {
    path: '/add-task',
    name: 'AddTask',
    component: AddTask
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
