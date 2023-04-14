<template>
<div class="section">
  <div class="container">
    <tawk-breadcrumb :items="breadcrumbItems" :style="breadcrumbStyle" />

    <div class="grid-view">
      <tawk-category-card
        v-if="!isEmpty(queryFilteredItems[0])"
        :item="queryFilteredItems[0]"
        :type="'expanded'"
        :style="categoryCardStyle"
      />

      <div class="list-view">
        <tawk-article-card
          v-for="(article, index) in articles"
          :key="`${kebabCase(article.title)}-${index}`"
          :item="article"
        />
      </div>
    </div>
  </div>

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
import _, {isEmpty, kebabCase} from 'lodash'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb.vue'
import CategoryCard from '../components/CategoryCard.vue'
import ArticleCard from '../components/ArticleCard.vue'
import {eventBus} from '../utils'

export default {
  components: {
    'tawk-breadcrumb': Breadcrumb,
    'tawk-category-card': CategoryCard,
    'tawk-article-card': ArticleCard
  },
  data: () => ({
    isEmpty,
    kebabCase,
    breadcrumbItems: [],
    items: null,
    queryFilteredItems: null,
    searchQuery: '',
    // category: {},
    articles: []
  }),
  computed: {
    breadcrumbStyle: () => {
      return {flex: 1, marginTop: `${21 - 60}px`, marginBottom: '22px'}
    },
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
    // extractCategoryId() {
    //   const {path} = this.$route
    //   // I'm sure there is a better way to extract the id below..
    //   return path.split('-').reverse()[0]
    // },
    // async fetchCategoryById(id) {
    //   axios.get('/api/categories')
    //     .then(response => {
    //       this.category = response.data.filter(item => item.id === id)[0]
    //     })
    //     .catch(error => ({error: JSON.stringify(error)}))
    // },
    async fetchArticles() {
      axios.get('/api/category/')
        .then(response => {
          this.articles = response.data.filter(item => item.status === 'published')
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

    // const id = this.extractCategoryId()
    // this.fetchCategoryById(id)
    this.fetchArticles()
    this.breadcrumbItems = [{
      title: 'All categories',
      path: '/'
    }]
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

.section .container .grid-view {
  transform: translateX(0);
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
    align-items: flex-start;
    gap: $container-grid--gap;
    transform: translateX($container-grid--gap*0.5);
  }
  .grid-view, .container.grid-view {
    max-width: $container-grid--width;
  }
  .list-view {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: $container-grid--gap;
  }
}
</style>