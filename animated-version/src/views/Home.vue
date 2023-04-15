<template>
<div class="section">
  <div class="container" :style="containerStyle">
    <tawk-breadcrumb :items="breadcrumbItems" :style="breadcrumbStyle" />

    <div class="grid-view">
      <div :style="categoryCardStyle" />

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
      ref="categoryCards"
      @click="hideSiblings(item)"
    />
  </div>
</div>
</template>

<script>
import _, {isEmpty, kebabCase} from 'lodash'
import axios from 'axios'
import {gsap} from 'gsap'
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
    timeline: null,
    category: {},
    articles: []
  }),
  computed: {
    breadcrumbStyle: () => {
      return {flex: 1, marginTop: `${21 - 60}px`, marginBottom: '22px'}
    },
    categoryCardStyle: () => {
      return {flex: `calc(${100/3}% - 20px)`, flexGrow: 0}
    },
    containerStyle: () => {
      return {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: '985px',
        marginLeft: `${-985/2}px`
      }
    }
  },
  watch: {
    searchQuery() {
      this.filterItemsBasedOnQuery()
    },
    category() {
      this.breadcrumbItems = [this.breadcrumbItems[0], {
        title: this.category.title
      }]
    },
    '$route.hash': function() {
      const id = this.extractCategoryId()
      this.fetchCategoryById(id)
      this.fetchArticles()
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
    extractCategoryId() {
      const {hash} = this.$route
      // I'm sure there is a better way to extract the id below..
      return hash.split('-').reverse()[0]
    },
    async fetchCategoryById(id) {
      this.category = this.queryFilteredItems.filter(item => item.id === id)[0]
    },
    async fetchArticles() {
      axios.get('/api/category/')
        .then(response => {
          this.articles = response.data.filter(item => item.status === 'published')
        })
        .catch(error => ({error: JSON.stringify(error)}))
    },
    onQueryChanged(val) {
      this.searchQuery = val
    },
    hideSiblings(item) {
      const siblingsRefs = this.$refs.categoryCards.filter(card => card._props.item.id !== item.id)
      const siblings = siblingsRefs.map(siblingCard => siblingCard.$el)
      this.timeline = gsap.timeline()
      this.timeline.staggerTo(siblings, 0.5, {
        ease: 'Power3.easeOut',
        opacity: 0
      }, 0.2)
    }
  },
  created() {
    this.fetchCategories()
    eventBus.$on('filter:items', this.onQueryChanged)

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
  position: relative;
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
    position: relative;
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