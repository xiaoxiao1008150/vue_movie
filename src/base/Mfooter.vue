<template>
<footer>
  <div class="item_wrapper">
    <div class="item">
      <router-link to="/" :class="{active: routerActive===1}">
        <div class="">
          <i class="iconfont">&#xe62e;</i>
          <span>首页</span>
        </div>
      </router-link>
    </div>
    <div class="item">
      <router-link to="/movies" :class="{active: routerActive===2}">
      <i class="iconfont">&#xe635;</i>
      <span>电影</span>
      </router-link>
    </div>
  </div>
</footer>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    computed: {
      ...mapState([
        'routerActive'
      ])
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/stylus/mixin'
  footer
    position: absolute
    z-index: 100
    bottom: 0
    height: 50px
    line-height: 50px
    width: 100%
    text-align:center
    .item_wrapper
      display: flex
      bordert-1px(#e0e0e0)
      background: #fcfcfc;
      color: #ef4238
      height: 50px
      .item
        flex-grow: 1
        a
          display: block
          text-align: center
          height: 100%
          &.active
            color: #ef4238
          i,span
            display: block
          i
            font-size: 20px;
            line-height: 37px;
          span
            line-height: 5px
            font-size: 10px
</style>