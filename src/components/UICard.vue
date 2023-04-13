<template>
<router-link class="ui-card" :to="`/docs/${slug}`">
  <div class="block">
    <img :src="`/icons/${item.icon}.png`">

    <h3 v-if="type === 'default'">{{item.title}}</h3>
    <h2 v-else-if="type === 'expanded'">{{item.title}}</h2>

    <span class="text-primary" v-if="type === 'default'">{{item.totalArticle}} articles</span>
    <span class="text-gray">Last update {{formatDate(item.updatedOn)}}</span>
  </div>
</router-link>
</template>

<script>
import moment from 'moment'
import slugify from 'slugify'

export default {
  props: {
    item: {type: Object, required: true},
    type: {type: String, default: 'default'}
  },
  computed: {
    slug() {
      const {title, id} = this.item
      return this.createSlug(title, id)
    }
  },
  methods: {
    formatDate: timestamp => moment(timestamp).fromNow(),
    createSlug: (title, id) => `${slugify(title, {lower: true})}-${id}`
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.ui-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $ui-card--padding-y $ui-card--padding-x;
  border: $ui-card--border-size solid $ui-card--border-color;
  border-radius: $ui-card--border-radius;
  text-decoration: none;
  background-color: $ui-card--bg-normal-color;
  img {
    margin-bottom: 25px;
  }
  h3 {
    margin-bottom: 21px;
    font-weight: bold;
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