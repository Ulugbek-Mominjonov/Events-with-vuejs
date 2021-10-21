<template>
  <div>
    <h1>Create Events</h1>
    <form @submit.prevent="createEvent">
      <div class="field">
        <label class="typo__label">Select category</label>
        <multiselect 
          v-model="event.category"
          :options="categories"
          :show-labels="false"
          placeholder="Select category"
          :class="{ error: $v.event.category.$error }"
          @close="$v.event.category.$touch()">
          </multiselect>
      </div>
      <template v-if="$v.event.category.$error">
        <p v-if="!$v.event.category.required" class="errorMessage">Category is required.</p>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput 
        label="Title"
        v-model="event.title"
        type="text"
        placeholder="Add a title"
        class="field"
        :className ="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()" />
      <template v-if="$v.event.title.$error">
        <p v-if="!$v.event.title.required" class="errorMessage">Title is required.</p>
      </template>

      <BaseInput
      label="Description"
      v-model="event.description"
      type="text"
      placeholder="Add a description"
      class="field"
      :className="{ error: $v.event.description.$error }"
      @blur="$v.event.description.$touch()"/>
      <template v-if="$v.event.description.$error">
        <p v-if="!$v.event.description.required" class="errorMessage">Description is required.</p>
      </template>

      <h3>Where is your event?</h3>
      <BaseInput
        label="Location"
        v-model="event.location"
        type="text"
        placeholder="Add a Location"
        class="field"
        :className="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"/>
        <template v-if="$v.event.location.$error">
        <p v-if="!$v.event.location.required" class="errorMessage">Location is required.</p>
        </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          placeholder="Select a date"
          v-model="event.date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <p v-if="!$v.event.date.required" class="errorMessage">Date is required.</p>
      </template>

      <div class="field">
        <label class="typo__label">Select category</label>
        <multiselect 
          v-model="event.time"
          :options="times"
          :show-labels="false"
          placeholder="Select time"
          :class="{ error: $v.event.time.$error }"
          @close="$v.event.time.$touch()"></multiselect>
      </div>
      <template v-if="$v.event.time.$error">
        <p v-if="!$v.event.time.required" class="errorMessage">Time is required.</p>
      </template>

      <BaseButton 
        type="submit" 
        buttonClass="-fill-gradient"
        :disabled="$v.$anyError"
      >Submit</BaseButton>  
      <p v-if="$v.$anyError" class="errorMessage">Please fill out the required field(s).</p>
    </form>  
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NProgress from 'nprogress';
import Datepicker from 'vuejs-datepicker'
import { required } from 'vuelidate/lib/validators';
  export default {
    components: {
      Datepicker
    },
    data() {
      const times = []
      for (let i = 1; i <= 24; i++) {
        times.push(`${i}:00`)
      }
      return {
        times,
        event: this.createFreshEventObject()
      }
    },
    validations: {
      event: {
        category: { required },
        title: { required },
        description: { required },
        location: { required },
        date: { required },
        time: { required },
      }
    },
    methods: {
      createEvent(){
        this.$v.$touch()
        if(!this.$v.$invalid) {
          NProgress.start()
          this.$store.dispatch('event/createEvent', this.event)
          .then(() => {
            this.$router.push({
              name: 'event-show',
              params: { id: this.event.id }
            })
            this.event = this.createFreshEventObject()
          })
          .catch(() => {
            NProgress.done()
          })
        }
      },
      createFreshEventObject() {
        const user = this.$store.state.user.user.name
        const id = Math.floor(Math.random() * 1000000)

        return {
          id: id,
          category: '',
          organizer: user,
          title: '',
          description: '',
          location: '',
          date: '',
          time: '',
          attendees: []
        }
      }
    },
    computed: {
      ...mapState(['user','categories'])
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>