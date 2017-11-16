<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <keep-alive>
    <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted () {
    document.addEventListener('touchstart', (event) => {
      event.preventDefault()
    }, { passive: false })
  }
}
</script>

<style lang="stylus">
  @import "~common/stylus/index"
  #app 
    width: 100%
    height: 100%
    overflow: hidden
</style>
