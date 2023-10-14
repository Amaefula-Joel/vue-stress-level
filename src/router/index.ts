import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '@/views/HomeView.vue'
import Home from '@/views/HomeView.vue'
import Register from '@/views/RegisterView.vue'
import Login from '@/views/LoginView.vue'
import UserWelcome from '@/views/user/UserWelcome.vue'
import ThankYou from '@/views/user/ThankYou.vue'
import AdminDashboard from '@/views/admin/adminDashboard.vue'
import EditQuestions from '@/views/admin/editQuestions.vue'
import Users from '@/views/admin/UserView.vue'
import StressChart from '@/views/admin/StressChart.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home`View',
      component: Home
    },
    {
      path: '/register',
      name: 'registerPage',
      component: Register
    },
    {
      path: '/login',
      name: 'loginPage',
      component: Login
    },
    {
      path: '/userwelcome',
      name: 'userWelcomePage',
      component: UserWelcome,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/thank-you',
      name: 'stressPresdiction',
      component: ThankYou,
      meta: {
        requiresAuth: true
      },
    },
    {
      path: '/admin',
      name: 'adminDashboard',
      component: AdminDashboard,
      // meta: {
      //   requiresAuth: true
      // },
    },
    {
      path: '/admin/editquestions',
      name: 'editquestions',
      component: EditQuestions,
      // meta: {
      //   requiresAuth: true
      // },
    },
    {
      path: '/admin/users',
      name: 'user',
      component: Users,
      // meta: {
      //   requiresAuth: true
      // },
    },
    {
      path: '/admin/stressChart',
      name: 'stressChart',
      component: StressChart,
      // meta: {
      //   requiresAuth: true
      // },
    },
  ]
});

function isAuthenticated() {
  const token = localStorage.getItem('token');

  return token !== null;
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth) && !isAuthenticated() ) {
    // if the user tries to access a route which requires authentication and isn't logged in
    
    next('/login');
  } else{
    next();
  }
});

export default router
