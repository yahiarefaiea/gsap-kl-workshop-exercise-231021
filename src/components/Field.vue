<template>
<input class="field" :type="type" :placeholder="placeholder">
</template>

<script>
export default {
  props: {
    type: {type: String, default: 'text'},
    placeholder: String
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