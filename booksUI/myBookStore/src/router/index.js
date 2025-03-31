import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue';
import BookDetails from '@/views/BookDetails.vue';
import Library from '@/views/BestSellers.vue';
import AddBookForm from '@/components/AddBookForm.vue';
import BestSellerHistory from '@/views/BestSellerHistory.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/book/:id', component: BookDetails },
  { path: '/library', component: Library},
  { path: '/add', component: AddBookForm},
  { path: '/bestsellers-history', component: BestSellerHistory}

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
