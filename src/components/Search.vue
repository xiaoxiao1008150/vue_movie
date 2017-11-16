<template>
<transition
    v-on:before-enter="beforeEnter"
    v-on:enter="enter"
    v-on:leave="leave"
>
    <div class="container s-wrapper" ref="swrapper">
      <div class="search-box">
        <div class="input-con">
          <i class="iconfont icon-search">&#xe632;</i>
          <input ref="query" v-model="query" class="box" placeholder="找影视剧"/>
          <!-- <i class="iconfont icon-delete" v-show="hasfocus">&#xe605;</i> -->
        </div>
        <span class="cancel" @click="clear">取消</span>
      </div>
      <search-list 
        :searchList="com_movie" 
        v-show="!showResult"
        @search="getInfo"
        ></search-list>
      <search-result 
        v-show="showResult" 
        :searchResult="infoArr" 
        @searchR="goTosearchResult"
        :keyWord="keyWord"
        :length="length">
        </search-result>
        <div v-show="loading" class="loading"><loading></loading></div>
        <div v-show="!loading && noData" class="no-result">
        没有数据
        </div>
    </div>

</transition>
</template>
<script>
import SearchList from 'base/SearchList'
import SearchResult from 'base/SearchResult'
import Loading from 'base/Loading'
import {debounce} from 'common/js/util'
import {_getInfo} from 'api/movie'
import {mapState, mapMutations} from 'vuex'

export default {
  data () {
    return {
      query: '',
      infoArr: null,
      showResult: false,
      reset: false,
      loading: false,
      noData: false
    }
  },
  methods: {
    beforeEnter (el) {
      el.style.transform = 'translate3d(0,0px,0)'
    },
    enter (el, done) {
      el.style.transition = 'transform .15s ease'
      done()
      this.$refs.query.focus()
    },
    leave (el) {
      el.style.transform = 'translate3d(0,90%,0)'
      el.style.transition = 'transform .15s ease'
    },
    clear () {
      if (this.reset) {
        this.reset = false
      }
      this.infoArr = []
      this.query = ''
      this.showResult = false
      // 在这里就开始加载ajax数据
      this.$emit('pclear')
    },
    getInfo (info) {
      this.query = info
      this.reset = true
    },
    searchInfo (key) {
      this.keyWord = key
      this.loading = true
      _getInfo(key)
        .then((res) => {
          if (!res.subjects.length) {
            this.noData = true
            return
          }
          this.infoArr = res.subjects.slice(0, 3)
          this.length = res.total
          this.loading = false
        })
    },
    goTosearchResult (key) {
      this.$router.push({ path: `/search-list/${key}` })
    },
    ...mapMutations([
      'saveSearch'
    ])
  },
  computed: {
    ...mapState([
      'com_movie'
    ])
  },
  activated () {
  },
  created () {
    this.clear()
    this.length = 0
    this.keyWord = ''
    this.$watch('query', debounce((newQuery) => {
      console.log('query', newQuery)
      if (!newQuery) {
        return
      }
      if (this.loading) {
        return
      }
      this.showResult = true
      this.searchInfo(newQuery)
      this.saveSearch(newQuery)
    }, 500))
  },
  components: {
    SearchList,
    SearchResult,
    Loading
  }
}
</script>
<style scoped lang="stylus">
.s-wrapper
  position: absolute
  top:0
  left:0
  width: 100%
  height: 100%
  overflow: hidden
  z-index: 1000
  background: #f4f4f4
.search-box
    display: flex
    padding:20px 10px 10px 10px
    background: #f8f8f8
    .input-con
      flex: 1
      height: 30px
      position: relative
      color: #999
    .box
      background:rgba(172, 168, 168, 0.12)
      border-radius: 15px
      font-size: 12px
      padding-left: 22px
      line-height: 20px
      height: 30px
      width: 100%
    .icon-search
      position: absolute
      top: 8px
      left: 2px
    .icon-delete
      position: absolute
      right: 5px
      top: 8px
      // &::placeholder
      //   color: $color-text-d
    .cancel
      height: 30px
      line-height: 30px
      color: red
      font-size: 13px
      flex: 0 0 50px
      text-align: center
  .no-result
    text-align: center
    position:absolute
    top: 25%;
    width: 100%;
    margin-left: -16px;
    font-size: 18px;
    color: #ccc;
</style>