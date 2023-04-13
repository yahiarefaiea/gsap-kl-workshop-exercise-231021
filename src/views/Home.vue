<template>
<div class="section">
  <div class="container grid-view">
    <p v-if="!queryFilteredItems" class="fallback">
      Loading..
    </p>
    <p v-else-if="queryFilteredItems && queryFilteredItems.length === 0" class="fallback">
      {{`No items were found matching “${this.searchQuery}”.`}}
    </p>
    <tawk-category-card
      v-else-if="queryFilteredItems && queryFilteredItems.length > 0"
      v-for="item in queryFilteredItems"
      :key="item.id"
      :item="item"
      :style="categoryCardStyle"
    />
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import CategoryCard from '../components/CategoryCard.vue'
import {eventBus} from '../utils'

export default {
  components: {
    'tawk-category-card': CategoryCard
  },
  data: () => ({
    items: null,
    queryFilteredItems: null,
    searchQuery: ''
  }),
  computed: {
    categoryCardStyle: () => {
      return {flex: `calc(${100/3}% - 20px)`, flexGrow: 0}
    }
  },
  watch: {
    searchQuery() {
      this.filterItemsBasedOnQuery()
    }
  },
  methods: {
    isEnabled: item => item.enabled,
    orderItems: items => items.sort((a, b) => a.order - b.order),
    filterItems(items) {
      return items.filter(item => this.isEnabled(item))
    },
    filterItemsBasedOnQuery() {
      this.queryFilteredItems = this.items.filter(item => _.includes(
        // converting strings below to lower case for the seek of a complete demo, nothing more..
        _.toLower(item.title),
        _.toLower(this.searchQuery)
      ))
    },
    async fetchCategories() {
      axios.get('/api/categories')
        .then(response => {
          this.items = this.filterItems(response.data)
          this.items = this.orderItems(this.items)
          this.queryFilteredItems = this.items
        })
        .catch(error => ({error: JSON.stringify(error)}))
    },
    onQueryChanged(val) {
      this.searchQuery = val
    }
  },
  created() {
    this.fetchCategories()
    eventBus.$on('filter:items', this.onQueryChanged)
  },
  destroyed() {
    eventBus.$off('filter:items', this.onQueryChanged)
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

.fallback {
  flex: 1;
  color: $text-gray;
}
</style>

<!-- global styles -->
<style lang="scss">
@import '../scss/_variables.scss';

p {
  font-family: $font-family;
  text-align: center;
  color: $text-black;
}

.section {
  background-color: $light-gray;
  .container {
    position: relative;
    max-width: $container--width;
    margin: 0 auto;
    padding: $container--padding-y 0;
  }
  .grid-view {
    display: flex;
    flex-wrap: wrap;
    gap: $container-grid--gap;
    transform: translateX($container-grid--gap*0.5);
  }
  .grid-view, .container.grid-view {
    max-width: $container-grid--width;
  }
}
</style>