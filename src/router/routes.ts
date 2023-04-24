import { log } from 'console';
import { menu } from 'src/components/menus';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: '/home' }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

//将menus里面的装入其中
menu.value.forEach((element: any) => {
  element.children.forEach((children: any) => {
    routes[0].children?.push({
      path: '/' + children.link, component: () => import('../pages/' + children.link + '.vue')
    })
  });
});
console.log(routes)
export default routes;
