<template>
  <div class="loading">
    <img width="40" height="40" src="../common/images/loading-bars.svg">
  </div>
</template>
<script>
  export default {
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    height: 100%
    position: absolute
    transform: translate3d(0,40%,0)
    text-align: center
    &.bottom
      position: static
      transform: translate3d(0,0,0)
      height: 40px
      line-height: 40px
    .desc
      line-height: 30px
      font-size: $font-size-small
      color: $color-text-l
</style>
