<template>
<nav class="breadcrumb">
  <ul>
    <li v-for="(item, index) in items">
      <router-link
        v-if="index !== items.length - 1"
        class="link"
        :to="item.path"
      >
        {{item.title}}
      </router-link>
      <template v-else>{{item.title}}</template>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: {
    items: {type: Array, required: true}
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

// my apologies for the inconvenience...
// the rule below should've been somewhere as shared styles.
// the reason to keep it here is to @extend it within breadcrumb list item.
/* start of block */
.link {
  display: inline-block;
  text-decoration: none;
  font-family: $font-family;
  font-size: $link--font-size;
  line-height: $link--line-height;
  color: $link--color;
  &:hover, &:focus {
    text-decoration: underline;
  }
}
/* end of block */

// .fa.fa-angle-right
.arrow-right {
  content: '\f105';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  color: $border-gray2;
}

.breadcrumb ul {
  display: flex;
  li {
    @extend .link;
    color: $text-gray;
    &:hover, &:focus {
      text-decoration: none;
    }
    &:not(:first-child) {
      margin-left: $breadcrumb--gap;
      &:before {
        margin-right: $breadcrumb--gap;
        @extend .arrow-right;
      }
    }
  }
}
</style>