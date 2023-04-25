<template>
  <lottie ref="flyingParrot" :options="animationOptions" />
</template>

<script>
import Lottie from 'vue-lottie'
import animationData from '../assets/animations/flying-parrot.json'

export default {
  components: {Lottie},
  data: () => ({
    animationOptions: {
      animationData,
      renderer: 'html',
      loop: true,
      autoplay: true
    }
  })
}
</script>