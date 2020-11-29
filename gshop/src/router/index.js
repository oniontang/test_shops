import Vue from 'vue';
import VueRouter from 'vue-router';
import Msite from '@/views/Msite/Msite.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/msite',
    name: 'Msite',
    component: Msite,
		meta: {
			showFooter: true
		}
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order/Order.vue'),
		meta: {
			showFooter: true
		}
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search/Search.vue'),
		meta: {
			showFooter: true
		}
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile/Profile.vue'),
		meta: {
			showFooter: true
		}
  },
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login/Login.vue')
	},
	{
		path: '/shop',
		name: 'Shop',
		component: () => import('@/views/Shop/Shop.vue'),
		children: [
			{
				path: '/shop/goods',
				component: () => import('@/views/Shop/ShopGoods/ShopGoods.vue')
			},
			{
				path: '/shop/info',
				component: () => import('@/views/Shop/ShopInfo/ShopInfo.vue')
			},
			{
				path: '/shop/ratings',
				component: () => import('@/views/Shop/ShopRatings/ShopRatings.vue')
			},
			{
				path: '',
				redirect: '/shop/goods'
			}
		]
	}
];

const router = new VueRouter({
  routes
});

export default router;
