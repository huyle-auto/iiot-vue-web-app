import { createRouter, createWebHistory } from 'vue-router'
import authApi from '@/api/v1/auth.js';

import LoginPage from '../pages/LoginPage.vue'
import OverviewPage from '../pages/OverviewPage.vue'
import TrendPage from '../pages/TrendPage.vue'
import HistoryPage from '../pages/HistoryPage.vue'
import AlarmPage from '../pages/AlarmPage.vue'
import ReportPage from '../pages/ReportPage.vue'

const routes = [
  { path: '/', redirect: (to) => {
    return authApi.isAuthenticated.value ? '/overview' : '/login';  // Redirect to login page if not auth-ed
  }},
  { path: '/login', component: LoginPage, meta: {hideSidebar: true}},
  { path: '/overview', component: OverviewPage, meta: { requiresAuth: true}},
  { path: '/trend', component: TrendPage, meta: { requiresAuth: true}},
  { path: '/history', component: HistoryPage, meta: { requiresAuth: true}},
  { path: '/alarm', component: AlarmPage, meta: { requiresAuth: true}},
  { path: '/report', component: ReportPage, meta: { requiresAuth: true}},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Route guard
router.beforeEach(async (to, from, next) => {
    if (!authApi.isAuthChecked.value) {
        await authApi.checkAuth();
    }

    // if (to.path === '/') {
    //   return next(authApi.isAuthenticated.value ? '/overview' : '/login');
    // }

    if (to.meta.requiresAuth && !authApi.isAuthenticated.value) {  // Route requires authentication and user is not authenticated
        return next('/login');
    }

    next();
});

export default router
