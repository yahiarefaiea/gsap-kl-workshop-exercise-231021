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

$line-height: 24px;
$font-size: 16px;
$padding-y: (60px - $line-height)*0.5;
$padding-x: 22px;
$border-size: 1px;
$border-color: #eee;
$border-radius: 4px;
$bg-color: #fff;

::placeholder {
  opacity: 1;
  color: $text-gray
}

.field {
  padding: $padding-y $padding-x;
  border: $border-size solid $border-color;
  border-radius: $border-radius;
  font-family: $font-family;
  font-size: $font-size;
  line-height: $line-height;
  background-color: $bg-color;
}
</style>