<template>
<div id="search-field">
  <tawk-field
    :placeholder="'Search for answers'"
    :value="query"
    @update:value="setQueryValue"
    :style="{
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRight: 0
    }"
  />
  <tawk-button
    :action="submitSearchQuery"
    :isIcon="true"
    :cta="'search'"
    :style="{
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      flex: '80px',
      flexShrink: 0
    }"
  />
</div>
</template>

<script>
import Field from './Field.vue'
import Button from './Button.vue'
import {eventBus} from '../utils'

export default {
  components: {
    'tawk-field': Field,
    'tawk-button': Button
  },
  data: () => ({
    query: ''
  }),
  watch: {
    '$route.path': function() {
      if(this.query) this.query = ''
    }
  },
  methods: {
    setQueryValue(value) {
      this.query = value
      eventBus.$emit('filter:items', this.query)
    },
    submitSearchQuery() {
      eventBus.$emit('filter:items', this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
#search-field {
  display: flex;
  max-width: 720px;
  margin: 0 auto;
}
</style>