<template>
<div id="header-wrapper">
  <div id="header-text">
    <tawk-flying-parrot :style="parrotStyle" />
    <h1>Knowledge base doesn’t have to be boring</h1>
    <h3>Everything you need to Manage your Messaging</h3>
  </div>
  <tawk-search-field />
</div>
</template>

<script>
import FlyingParrot from './FlyingParrot.vue'
import SearchField from './SearchField.vue'

export default {
  components: {
    'tawk-flying-parrot': FlyingParrot,
    'tawk-search-field': SearchField
  },
  computed: {
    parrotStyle: () => {
      const titleWidth = 640
      return {
        position: 'absolute',
        bottom: `${24+9 - 6}px`,
        left: '50%',
        transform: `translateX(-${titleWidth/2 + 110}px)`,
        width: `${1368/3}px`,
        height: `${604/3}px`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/_variables.scss';

#header-wrapper {
  padding: 204px 20px 74px;
  background-color: #fff;
}

#header-text {
  position: relative;
  margin-bottom: 35px;
  text-align: center;
  font-family: $font-family;
  color: $text-black;
}
</style>