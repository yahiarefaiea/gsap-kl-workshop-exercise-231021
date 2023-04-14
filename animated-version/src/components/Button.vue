<template>
<a href="#" class="button" @click.prevent="action">
  <template v-if="!isIcon">{{cta}}</template>
  <span v-else :class="`fa fa-${cta}`"></span>
</a>
</template>

<script>
export default {
  props: {
    action: {type: Function, required: true},
    isIcon: {type: Boolean, default: false},
    cta: {type: String, required: true}
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.button {
  display: inline-block;
  padding: $button--padding-y $button--padding-x;
  border: $button--border-size solid $button--bg-normal-color;
  border-radius: $button--border-radius;
  font-family: $font-family;
  font-size: $button--font-size;
  line-height: $button--line-height;
  text-decoration: none;
  text-align: center;

  background-color: $button--bg-normal-color;
  color: $button--text-normal-color;
  &:hover, &:focus {
    border-color: $button--bg-focus-color;
    background-color: $button--bg-focus-color;
    color: $button--text-focus-color;
  }
}
</style>