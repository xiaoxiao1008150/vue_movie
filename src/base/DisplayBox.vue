<template>
  <div class="t-container">
    <div class="tab_flex" v-for="item in searchResult">
      <router-link :to=" '/item/' + item.id">
        <div class="d_left">
          <img :src="item.images.small">
        </div>
        <div class="d_right">
          <div class="d_right_first">
            <div class="d_title">{{item.title}}</div>
            <div class="d_genre">{{item.genres.join(',')}}</div>
            <div class="d_pubdate">{{item.mainland_pubdate}}大陆上映</div>
          </div>
          <div class="d_right_second"><span>{{item.rating.average}}</span>分</div>
        </div>
        </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      searchResult: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/stylus/mixin'
  .t-container
    // padding-bottom: 40px
    padding-top: 50px
    &.no-padding
      padding-top: 0
  .tab_flex
    a
      display: flex
      width: 100%
      height: 100%
      padding: 15px 0
      border-1px(#f0f0f0)
    .d_left
      flex: 0 0 80px
      // margin: 15px 0
      img
        width: 80px
        height: 100px
    .d_right
      flex: 1
      display: flex
      // border-bottom: 1px solid #f0f0f0
      // padding: 15px 0 15px 10px
      padding-left: 15px
      font-size: 12px
      .d_right_first
        flex: 1
        padding-right: 8px
        overflow: hidden
        line-height: 14px
        .d_title
          font-size: 13px
          line-height: 26px
          font-weight: 800
          color: #000
          no-wrap()
      .d_right_second
        flex: 0 0 45px
        color: #ffb400
        margin-top: 10px
        span
          font-size: 14px
</style>