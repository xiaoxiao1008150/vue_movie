<template>
  <div class="search-list">
    <div class="h-search">
      <p class="title">热门搜索</p>
      <div class="h-result">
        <ul class="clearfix">
          <li v-for="(movie, index) in searchList" :key="index">
            <router-link :to=" '/movie/' + movie.id" >{{movie.title}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="r-search">
      <div class="title">最近搜索</div>
      <div class="r-result">
        <ul>
          <li :key="item" class="search-item" @click="search(item)" v-for="item in search_history">
          <span class="text">{{item}}</span>
          <span class="icon" @click.stop="delateSearchWord(item)">
            <i class="icon-delete iconfont">&#xe624;
</i>
          </span>
        </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations, mapState} from 'vuex'
export default {
  props: {
    searchList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    search (item) {
      // let info = e.target && e.target.children[0].innerHTML
      this.saveSearch(item)
      console.log('li')
      this.$emit('search', item)
    },
    delateSearchWord (item) {
      console.log('icon')
      this.delateSearch(item)
    },
    ...mapMutations([
      'saveSearch',
      'delateSearch'
    ])
  },
  computed: {
    ...mapState([
      'search_history'
    ])
  },
  components: {
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin"
  .search-list
    // background: rgba(247, 247, 247, 0.23)
    background: #fff
    padding: 0 20px
    font-size: 12px
    .h-search
      .h-result
        margin:20px 0
      ul
        li
          height: 25px
          line-height: 25px
          float: left
          margin: 0 15px 15px 0
          background:rgba(239, 238, 238, 0.68)
          a
            display: block
            height: 100%
            width: 100%
            padding: 0 10px
    .r-search
      color: #999
      ul
        li
          height: 35px
          line-height: 35px
          border-1px(#e8e8e8)
          display: flex
          .text
            flex: 1
          .icon
            extend-click()
            .icon-delete
              font-size: 10px
              color: $color-text-d
    .title
      font-sise: 13px
      color: #000
      font-weight: 800
      height: 30px
      line-height: 30px
</style>