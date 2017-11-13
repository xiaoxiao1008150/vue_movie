<template>
<transition name="review">
  <div class="container reviews">
     <scrollv :pullup="true" 
              @scrollToEnd="loadMore(id,true)" 
              :listen-scroll="true"
              @scroll="scroll"
              :probe-type="3"
              class="test"
              :data="latestReviews">
      <div class="reviews_wrapper">
        <div class="all_reviews" v-if="total">所有评论({{total}}条)</div>
        <div class="top_reviews" v-if="reviews.length" ref="top">
            <div class="t_header"><span>热门短评</span></div>
          <comments :reviews="reviews"></comments>
        </div>
        <div class="lastest_reviews" v-if="latestReviews.length"  ref="lreviews">
          <div class="t_header"><span>最新短评</span></div>
          <comments :reviews="latestReviews"></comments>
        </div>
          <div v-show="loading" class="m_nodata">正在加载中...</div>
          <div v-show="noData" class="m_nodata">没有数据了</div>
      </div>
    </scrollv>
      <div class="list-fixed" ref="fixed" v-if="fixedTitle">
          <div class="fixed-title">{{fixedTitle}} </div>
      </div>
  </div>
</transition>
</template>
<script>
import Comments from 'base/Comments'
import Scrollv from 'base/Scrollv'
// import Sticky from 'base/Sticky'
import Loading from 'base/Loading'
import { _getMovieReviews } from 'api/movie'

// const TITLE_HEIGHT = 30
export default {
  data () {
    return {
      reviews: [],
      latestReviews: [],
      total: 0,
      count: 0,
      start: 0,
      loading: false,
      noData: false,
      scrollY: -1,
      currentIndex: '',
      diff: -1,
      titleList: ['热门短评', '最新短评']
    }
  },
  methods: {
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
      this.loading = true
      _getMovieReviews(id, query).then((res) => {
        if (!this.latestReviews.length) {
          this.reviews = res.reviews
          this.latestReviews = res.reviews
          this.total = res.total
          this.count = res.count
          this.start = res.start
          this.loading = false
        } else {
          this.latestReviews = this.latestReviews.concat(res.reviews)
          this.loading = false
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
      console.log('test', this.listHeight)
    },
    scroll (pos) {
      this.scrollY = pos.y
    }
  },
  computed: {
    fixedTitle () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.titleList[this.currentIndex] ? this.titleList[this.currentIndex] : ''
    }
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
      top: 0
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
</style>