<template>
<footer>
  <div class="item_wrapper">
    <div class="item"><router-link to="/">首页</router-link></div>
    <div class="item"><router-link to="/movies">电影</router-link></div>
    <div class="item"><router-link to="">影院</router-link></div>
  </div>
</footer>
</template>
<script>
  
</script>
<style lang="stylus" scoped>
footer
  position: absolute
  z-index: 100
  bottom: 0
  background: pink
  height: 50px
  line-height: 50px
  width: 100%
  text-align:center
  .item_wrapper
    display: flex
    border-top: 1px solid #ccc
    background: #faf8fa;
    color: #ef4238
    .item
      flex-grow: 1
</style>