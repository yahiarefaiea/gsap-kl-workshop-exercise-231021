<template>
<div id="header-wrapper">
  <div id="header-text">
    <h1>Knowledge base doesn’t have to be boring</h1>
    <h3>Everything you need to Manage your Messaging</h3>
  </div>
  <tawk-search-field />
</div>
</template>

<script>
import SearchField from './SearchField.vue'

export default {
  components: {
    'tawk-search-field': SearchField
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

#header-wrapper {
  padding: 54px 20px 74px;
  background-color: #fff;
}

#header-text {
  margin-bottom: 35px;
  text-align: center;
  font-family: $font-family;
  color: $text-black;
}
</style>