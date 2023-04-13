<template>
<div class="section">
  <div class="container">
    <tawk-breadcrumb
      :items="breadcrumbItems"
      :style="breadcrumbStyle"
    />
    <div>
      <tawk-ui-card
        v-if="!isEmpty(category)"
        :item="category"
        :type="'expanded'"
      />
    </div>
  </div>
</div>
</template>

<script>
import {isEmpty} from 'lodash'
import axios from 'axios'
import Breadcrumb from '../components/Breadcrumb.vue'
import UICard from '../components/UICard.vue'

export default {
  components: {
    'tawk-breadcrumb': Breadcrumb,
    'tawk-ui-card': UICard
  },
  data: () => ({
    isEmpty,
    breadcrumbItems: [],
    category: {},
    articles: []
  }),
  computed: {
    breadcrumbStyle: () => {
      return {flex: 1, marginTop: `${21 - 60}px`, marginBottom: '22px'}
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
<!--
<style lang="scss" scoped>
@import '../scss/_variables.scss';
</style> -->