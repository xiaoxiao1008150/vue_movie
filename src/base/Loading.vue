<template>
  <div class="loading">
    <img width="30" height="30" src="../common/images/loading-spokes.svg">
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .loading
    width: 100%
    text-align: center
    .desc
      line-height: 30px
      font-size: $font-size-small
      color: $color-text-l
</style>
