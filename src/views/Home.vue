<template>
<div class="section">
  <div class="container grid-view">
    <tawk-ui-card
      v-for="item in items"
      :key="item.id"
      :item="item"
      :style="flexItemStyle"
    />
  </div>
</div>
</template>

<script>
import axios from 'axios'
import UICard from '../components/UICard.vue'

export default {
  components: {
    'tawk-ui-card': UICard
  },
  data: () => ({
    flexItemStyle: {flex: `calc(${100/3}% - 20px)`, flexGrow: 0},
    items: null
  }),
  methods: {
    isEnabled: item => item.enabled,
    orderItems: items => items.sort((a, b) => a.order - b.order),
    filterItems(items) {
      return items.filter(item => this.isEnabled(item))
    },
    async fetchCategories() {
      axios.get('/api/categories')
        .then(response => {
          this.items = this.filterItems(response.data)
          this.items = this.orderItems(this.items)
        })
        .catch(error => ({error: JSON.stringify(error)}))
    }
  },
  created() {
    this.fetchCategories()
  }
}
</script>

<style lang="scss">
@import '../scss/_variables.scss';

// my apologies for the inconvenience...
// the rules below should've been somewhere as shared styles.
/* start of block */
.section {
  background-color: $light-gray;
  .container {
    position: relative;
    max-width: $container--width;
    margin: 0 auto;
    padding: $container--padding-y 0;
    &.grid-view {
      display: flex;
      flex-wrap: wrap;
      gap: $container-grid--gap;
      max-width: $container-grid--width;
      transform: translateX($container-grid--gap*0.5);
    }
  }
}
/* end of block */
</style>