<template>
  <div>
    <h1>Events for {{user.user.name}}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event"/>
    <template v-if="page != 1">
      <router-link class="link" :to="{ name: 'event-list', query: { page: page - 1} }" rel="prev">Prev page</router-link>
    </template>
    <template v-if="event.eventsTotal > page * 3">
      <router-link :to="{ name: 'event-list', query: { page: page + 1} }" rel="next">Next page</router-link>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from '@/store/index';
import EventCard from '@/components/EventCard.vue';

function getPageEvents (to, next) {
  const currentPage = parseInt(to.query.page || 1)
  store.dispatch('event/fetchEvents', { page: currentPage}).then(() => {
    to.params.page = currentPage;
    next()
  })
}
  export default {
    props: {
      page: {
        type: Number,
        required: true
      }
    },
    components: {
      EventCard
    },
    beforeRouteEnter(to, from, next) {
      getPageEvents (to, next)
    },
    beforeRouteUpdate(to, from, next) {
      getPageEvents (to, next)
    },
    // created() {
    //   this.fetchEvents({
    //     perPage: 3,
    //     page: this.page
    //   })
    // },
    computed: {
      // page() {
      //   return parseInt(this.$route.query.page) || 1
      // },
      ...mapState(['event', 'user'])
    },
    // methods: {
    //   ...mapActions('event', ['fetchEvents'])
    // }
  }
</script>

<style scoped>
.link {
  margin-right: 15px;
}
</style>