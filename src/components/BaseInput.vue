<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :class="className" :value="value" @input="updateValue" v-bind="$attrs" v-on="listeners"/>
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      label: {
        type: String,
        default: ""
      },
      className: {
        type: String,
        default: ""
      },
      value: [Number, String]
    },
    methods: {
      updateValue(event) {
        this.$emit('input', event.target.value)
      }
    },
    computed: {
      listeners() {
        return {
          ...this.$listeners,
          input: this.updateValue
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>