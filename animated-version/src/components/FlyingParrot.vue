<template>
  <lottie ref="flyingParrot" :options="options" />
</template>

<script>
import Lottie from 'vue-lottie'
import animationData from '../assets/animations/flying-parrot.json'

export default {
  components: {Lottie},
  data: () => ({
    options: {
      animationData,
      renderer: 'html',
      loop: true,
      autoplay: true
    }
  })
}
</script>