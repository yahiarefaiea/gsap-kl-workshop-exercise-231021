<template>
<a href="#" class="article-card">
  <span :class="`fa fa-${item.icon}`" />
  <h3>{{item.title}}</h3>
  <span class="text-gray">Last update {{formatDateFromNow(item.updatedOn)}}</span>
  <span class="fa fa-chevron-right" />
</a>
</template>

<script>
import {formatDateFromNow} from '../utils'

export default {
  props: {
    item: {type: Object, required: true}
  },
  data: () => ({
    formatDateFromNow
  })
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.article-card {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: $article-card--padding-y $article-card--padding-x;
  border: $article-card--border-size solid $article-card--border-color;
  border-radius: $article-card--border-radius;
  text-decoration: none;
  background-color: $article-card--bg-normal-color;
  .fa {
    display: block;
    position: absolute;
    top: 50%;
    left: 32px;
    transform: translateY(-50%);
    color: $green;
    font-size: 20px;
    line-height: 24px;
    &-chevron-right {
      left: auto;
      right: 32px;
    }
    // the properties below turn fill icons into outlines! Magic.
    // &:not(.fa-chevron-right) {
    //   font-size: 18px;
    //   -webkit-text-stroke-width: 1.5px;
    //   -webkit-text-stroke-color: $green;
    //   -webkit-text-fill-color: transparent;
    // }
  }
}
</style>