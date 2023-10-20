<template>
<a
  class="category-card"
  :href="`#${slug}`"
  ref="categoryCard"
  @click="handleCategoryClick"
>
  <div class="block">
    <img :src="`/icons/${item.icon}.png`">

    <h3 v-if="type === 'default'">{{item.title}}</h3>
    <h2 v-else-if="type === 'expanded'">{{item.title}}</h2>

    <span class="text-primary" v-if="type === 'default'">{{item.totalArticle}} articles</span>
    <span class="text-gray">Last update {{formatDateFromNow(item.updatedOn)}}</span>
  </div>
  <div class="block" v-if="type === 'expanded'">
    <p>{{item.description}}</p>
  </div>
</a>
</template>

<script>
import {gsap} from 'gsap'
import {formatDateFromNow} from '../utils'
import slugify from 'slugify'

export default {
  props: {
    item: {type: Object, required: true},
    type: {type: String, default: 'default'}
  },
  data: () => ({
    formatDateFromNow,
    coordinates: {},
    timeline: null
  }),
  computed: {
    slug() {
      const {title, id} = this.item
      return this.createSlug(title, id)
    }
  },
  methods: {
    createSlug: (title, id) => `${slugify(title, {lower: true})}-${id}`,
    getCoordinates(item) {
      this.coordinates.width = gsap.getProperty(item, 'offsetWidth')
      this.coordinates.height = gsap.getProperty(item, 'offsetHeight')
      this.coordinates.top = gsap.getProperty(item, 'offsetTop')
      this.coordinates.left = gsap.getProperty(item, 'offsetLeft')
    },
    moveCard(item) {
      const {width, height, top, left} = this.coordinates
      gsap.set(item, {position: 'absolute', width, height, top, left})
      this.timeline = gsap.timeline()
      this.timeline.to(item, {
        duration: 0.7,
        ease: 'Power3.easeOut',
        position: 'absolute',
        top: 65,
        left: 0,
        transform: 'translate(-50%, -50%)'
      })
    },
    handleCategoryClick() {
      this.$emit('click', this.item)
      const cardRef = this.$refs.categoryCard
      this.getCoordinates(cardRef)
      this.moveCard(cardRef)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.category-card {
  display: block;
  border: $category-card--border-size solid $category-card--border-color;
  border-radius: $category-card--border-radius;
  text-decoration: none;
  background-color: $category-card--bg-normal-color;
  > .block {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $category-card--padding-y $category-card--padding-x;
    &:not(:first-child) {
      border-top: $category-card--border-size solid $category-card--border-color;
    }
  }
  img {
    margin-bottom: 25px;
  }
  h2, h3 {
    text-align: center;
  }
  h3 {
    margin-bottom: 21px;
    font-weight: bold;
  }
  p {
    font-size: 13px;
    line-height: 18px;
    color: $text-gray;
  }
}
</style>

<!-- global styles -->
<style lang="scss">
@import '../scss/_variables.scss';

h2, h3, .text-primary, .text-gray {
  font-family: $font-family;
  color: $text-black;
}
.text-primary {
  font-size: 13px;
  line-height: 15.6px;
  color: $green;
}
.text-gray {
  font-size: 11px;
  line-height: 13.2px;
  color: $text-gray;
}
</style>