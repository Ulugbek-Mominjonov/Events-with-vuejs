<template>
  <div>
    <form @submit.prevent="submit">
      <input :class="{ error: $v.email.$error }" type="email" placeholder="What's your email" v-model="email" @blur="$v.email.$touch()">
      <div v-if="$v.email.$error">
        <p class="errorMessage" v-if="!$v.email.email">Please enter a valid email</p>
        <p class="errorMessage" v-if="!$v.email.required">Email must fill</p>
      </div>
      <button :disabled = "$v.$invalid" type="submit">Submit</button>
      <p v-if="$v.$anyError" class="errorMessage">Please fill out required fields</p>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators"
  export default {
    data() {
      return {
        email: null
      }
    },
    validations: {
      email: {
        required,
        email
      }
    },
    methods: {
      submit() {
        this.$v.$touch()
        if(!this.$v.$invalid) {
          console.log('From Submission: ' + this.email);
        }
      }
    }
  }
</script>

<style scoped>
.errorMessage {
  color: red;
  font-weight: bold;
}
.error {
  border-color: red;
}
</style>