<template>
<div class="section">
  <div class="container">
    <tawk-breadcrumb
      :items="breadcrumbItems"
      :style="breadcrumbStyle"
    />

    <div class="grid-view">
      <tawk-category-card
        v-if="!isEmpty(category)"
        :item="category"
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
</div>
</template>

<script>
import {isEmpty, kebabCase} from 'lodash'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb.vue'
import CategoryCard from '../components/CategoryCard.vue'
import ArticleCard from '../components/ArticleCard.vue'

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
    category: {},
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
    category() {
      this.breadcrumbItems = [...this.breadcrumbItems, {
        title: this.category.title
      }]
    }
  },
  methods: {
    extractCategoryId() {
      const {path} = this.$route
      // I'm sure there is a better way to extract the id below..
      return path.split('-').reverse()[0]
    },
    async fetchCategoryById(id) {
      axios.get('/api/categories')
        .then(response => {
          this.category = response.data.filter(item => item.id === id)[0]
        })
        .catch(error => ({error: JSON.stringify(error)}))
    },
    async fetchArticles() {
      axios.get('/api/category/')
        .then(response => {
          this.articles = response.data.filter(item => item.status === 'published')
        })
        .catch(error => ({error: JSON.stringify(error)}))
    }
  },
  created() {
    const id = this.extractCategoryId()
    this.fetchCategoryById(id)
    this.fetchArticles()
    this.breadcrumbItems = [{
      title: 'All categories',
      path: '/'
    }]
  }
}
</script>

<style lang="scss" scoped>
.section .grid-view {
  align-items: flex-start;
}
</style>

<!-- global styles -->
<style lang="scss">
@import '../scss/_variables.scss';

.section .list-view {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: $container-grid--gap;
}
</style>