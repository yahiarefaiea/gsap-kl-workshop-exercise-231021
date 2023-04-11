<template>
<input class="field" :type="type" :placeholder="placeholder" v-model="computedValue">
</template>

<script>
export default {
  props: {
    value: {type: String, default: ''},
    type: {type: String, default: 'text'},
    placeholder: String
  },
  computed: {
    computedValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

::placeholder {
  opacity: 1;
  color: $field--text-placeholder-color;
}

.field {
  padding: $field--padding-y $field--padding-x;
  border: $field--border-size solid $field--border-color;
  border-radius: $field--border-radius;
  font-family: $font-family;
  font-size: $field--font-size;
  line-height: $field--line-height;
  background-color: $field--bg-color;
  color: $field--text-normal-color;
  &:focus {
    border-color: $field--border-focus-color;
    background-color: $field--bg-focus-color;
  }
}
</style>