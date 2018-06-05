import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Poker from '@/components/Poker';
import RxPage from '@/components/RxPage';
import RxCancel from '@/components/RxCancel';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/poker',
      name: 'Poker',
      component: Poker,
    },
    {
      path: '/rx',
      name: 'Rx',
      component: RxPage,
    },
    {
      path: '/rx-cancel',
      name: 'RxCancel',
      component: RxCancel,
    },
  ],
});
