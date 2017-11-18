<template>
<div style="height:100%">
  <transition name="review">
  <div class="container reviews" v-if="latestReviews.length">
     <div class="info-header">
            <div class="second" >
              <span class="icon" @click="goToback"><i class="iconfont">&#xe603;</i></span>
              <span class="current-movie">短评{{current_movie}}</span>
            </div>
        </div>
     <scrollv :pullup="true" 
              @scrollToEnd="loadMore(id,true)" 
              :listen-scroll="true"
              @scroll="scroll"
              :probe-type="3"
              class="test"
              :data="latestReviews" ref="reviews">
      <div class="reviews_wrapper" @touchstart="stopScroll">
        <div class="all_reviews" v-if="total">所有评论({{total}}条)</div>
        <div class="top_reviews" v-if="reviews.length" ref="top">
            <div class="t_header"><span>热门短评</span></div>
          <comments :reviews="reviews"></comments>
        </div>
        <div class="lastest_reviews" v-if="latestReviews.length"  ref="lreviews">
          <div class="t_header"><span>最新短评</span></div>
          <comments :reviews="latestReviews"></comments>
        </div>
          <div v-show="sloading" class="m_nodata">正在加载中...</div>
          <div v-show="noData" class="m_nodata">没有数据了</div>
      </div>
    </scrollv>
      <div class="list-fixed" ref="fixed" v-if="fixedTitle">
          <div class="fixed-title">{{fixedTitle}} </div>
      </div>
  </div>
</transition>
  <loading v-show="initloading"></loading>
  </div>
</template>
<script>
import Comments from 'base/Comments'
import Scrollv from 'base/Scrollv'
// import Sticky from 'base/Sticky'
import Loading from 'base/Loading'
import { _getMovieReviews } from 'api/movie'
import {mapState} from 'vuex'

// const TITLE_HEIGHT = 30
export default {
  data () {
    return {
      reviews: [],
      latestReviews: [],
      total: 0,
      count: 0,
      start: 0,
      initloading: true,
      sloading: false,
      noData: false,
      scrollY: -1,
      currentIndex: '',
      diff: -1,
      titleList: ['热门短评', '最新短评']
    }
  },
  methods: {
    stopScroll () {
      let el = this.$refs.reviews
      el.stop()
    },
    getMovieReviews (id, flag) {
      let query
      // 说明是下拉加载的
      if (flag) {
        this.start += 10
        if (this.start >= this.total) {
          // this.stopLoad = true
          this.noData = true
          return
        } else {
          query = `start=${this.start}`
        }
      }
      if (!this.initloading) {
        this.sloading = true
      }
      // this.loading = true
      _getMovieReviews(id, query).then((res) => {
        if (!this.latestReviews.length) {
          this.reviews = res.reviews
          this.latestReviews = res.reviews
          this.total = res.total
          this.count = res.count
          this.start = res.start
          // this.loading = false
          if (this.initloading) {
            this.initloading = false
          }
          if (this.sloading) {
            this.sloading = false
          }
        } else {
          this.latestReviews = this.latestReviews.concat(res.reviews)
          // this.loading = false
          if (this.initloading) {
            this.initloading = false
          }
          if (this.sloading) {
            this.sloading = false
          }
        }
      })
    },
    loadMore (id, flag) {
      this.getMovieReviews(id, flag)
    },
    _calculateHeight () {
      this.listHeight = []
      let top = this.$refs.top
      let topH = top.clientHeight
      let lastest = this.$refs.lreviews
      let lastestH = lastest.clientHeight
      let h = 0
      this.listHeight.push(h)
      this.listHeight.push(topH)
      this.listHeight.push(lastestH + topH)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    goToback () {
      this.$router.go(-1)
    }
  },
  computed: {
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.titleList[this.currentIndex] ? this.titleList[this.currentIndex] : ''
    },
    ...mapState([
      'current_movie'
    ])
  },
  watch: {
    latestReviews () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) {
      const listHeight = this.listHeight
      // 当滚动到顶部，newY>0
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY + 5
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    }
  },
  activated () {
    // this.probeType = 3
    // this.listenScroll = true
    this.listHeight = []
    this.id = this.$route.params.id
    this.getMovieReviews(this.id)
  },
  components: {
    Comments,
    // Sticky,
    Scrollv,
    Loading
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin"
.review-enter-active, .review-leave-active
  transform: translate3d(0, 0, 0)
  transition: transform .5s
.review-enter
  transform: translate3d(100%, 0, 0)
.test
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  margin-top: 60px
.reviews
  height: 100%
  .reviews_wrapper
    .list
      position: relative
.all_reviews
  font-size: 13px
  height: 35px
  line-height: 35px
  padding-left: 10px
.top_reviews
  position: relative
  padding-bottom: 50px
.list-fixed
      position: absolute
      top: 60px
      left: 0
      z-index: 1000
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 10px
        font-size: 13px
        color:#999
        background: rgb(235, 234, 234)
.t_header
  height: 30px
  line-height: 30px
  font-size: 13px
  color: #999
  background: rgb(235, 234, 234)
  padding-left: 10px
.m_nodata
  text-align : center
  padding: 15px 0
  color: #999
  font-size: 12px
.info-header
    position: absolute
    z-index: 100
    top: 0
    width: 100%
    height: 60px
    line-height: 60px
    text-align: center
    color: #fff
    font-size: 11px
    transition: all 0.5s linear
    // border-1px(pink)
    // &.change
    // .init
    //   span
    //     // background: rgba(255,255,255,0.3)
    //     // padding: 5px 15px
    //     // border-radius: 2px
    .second
      position: absolute
      z-index: 1000
      width: 100%
      height: 100%
      text-align: center
      font-size: 16px;
      color: #000
      background: #fff
      border-1px(#ADADAD)
      .icon
        position: absolute
        z-index: 10001
        left: 0
        width: 80px
        color:#df2d2d
      .current-movie
        position: absolute
        z-index: 1000
        width: 100%
        padding: 0 80px
        top:0
        left: 0
        no-wrap()
</style>