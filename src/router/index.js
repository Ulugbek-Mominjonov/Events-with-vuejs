import Vue from "vue";
import VueRouter from "vue-router";
import EventList from "../views/EventList.vue";
import EventShow from '../views/EventShow.vue';
import EventCreate from '../views/EventCreate.vue';
import NotFound from '../views/NotFound.vue';
import NetworkIssue from '../views/NetworkIssue.vue';
import Example from '../views/Example.vue';
import store from '@/store/index';
import NProgress from 'nprogress';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    alias: '/event-show',
    props: true,
    beforeEnter(to, from, next) {
      store.dispatch('event/fetchEvent', to.params.id)
        .then((event) => {
         to.params.event = event
          next()
        })
        .catch((error) => {
          if(error.response && error.response.status == 404){
            next({ name: '404', params: { resource: 'event'} })
          } else next({ name: 'network-issue'})
        })
    },
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate
  },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
    beforeEnter(to, from, next) {
      NProgress.start()
      NProgress.done()
      next();
    },
  },
  {
    path: '*',
    redirect: { name: "404", params: { resource: 'page'}}
  },
  {
    path: '/network-issue',
    name: 'network-issue',
    component: NetworkIssue
  },
  {
    path: '/example',
    name: 'example-vuelidate',
    component: Example
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
