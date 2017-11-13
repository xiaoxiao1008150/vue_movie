<template>
<transition name="detail">
<!-- <div> -->
    <div class="container d-container" v-if="movie" ref="movie">
      <div class="info-header" :class="{change: isChange}">
          <div class="init" v-show="!isChange"><span>电影</span></div>
          <div class="second" v-show="isChange">
            <span class="icon" @click="goToback"><i class="iconfont">&#xe603;</i></span>
            <span class="current-movie">{{currentMovie}}</span>
          </div>
        </div>
        <scrollv 
          :data="reviews"
          :listenScroll="true" 
          :probe-type="3"
          @scroll="scroll" class="detail-scroll">
        <div>
          <div class="d_wrapper d_wrapper_first" >
            <div class="info">
              <div class="info-con">
                <p class="title">{{movie.title}}</p>
                <p class="genres">{{movie.genres.join(',')}}</p>
                <p class="country">{{movie.countries[0]}}/{{movie.durations[0]}}</p>
                <p class="pubdate">{{movie.mainland_pubdate}}大陆上映</p>
                <p class="wish">{{movie.wish_count}}人想看</p>
              </div>
              <div class="im-con">
                <router-link class="icon" tag="div" to="">
                  <i class="iconfont">&#xe625;</i>
                  <img :src="movie.trailers ? movie.trailers[0].medium : '' ">
                </router-link>
              </div>
            </div>
            <div class="summary">
              <div class="s_content" ref="scontent" :class="{ nheight: needHeight, toggle: istoggle }" >
                <span>
                  {{ movie.summary}}
                </span>
              </div>
              <div class="s_toggle" @touchend="toggle" v-if="isSpread">
                <transition name="spread" mode="in-out">
                  <i class="iconfont" v-show="!istoggle">&#xe604;</i>
                </transition>
                <transition name="spread" mode="in-out">
                 <i class="iconfont" v-show="istoggle">&#xe6ac;</i>
                </transition>
              </div>
            </div>
          </div>
          <div class="d_wrapper" v-if="casts.length" >
            <scroll 
                :data="casts" 
                :detail="false"
                title="演职人员">
            </scroll>
          </div>
          <div class="d_wrapper" v-if="photoes.length">
            <scroll 
                :data="photoes" 
                :detail="false"
                :photoes="true"
                title="剧照">
            </scroll>
          </div>
          <div class="d_wrapper" v-if="reviews.length">
            <div class="comments_container">
              <p class="header">短评</p>
              <comments :reviews="reviews"></comments>
            </div>
            <div class="all_reviews">
              <span @touchend="goToReviews(id)">查看全部{{ reviewsLength }}条短评 ></span>
            </div>
          </div>
          </div>
        </scrollv>
    </div>
    <div v-show="loading"><loading></loading></div>
<!-- </div> -->
  </transition>
</template>
<script>
import Scroll from 'base/Scroll'
import Loading from 'base/Loading'
import Scrollv from 'base/Scrollv'

// import Star from 'base/star/Star'
import Comments from 'base/Comments'
import { _getSingleMovie, _getMoviePhotoes, _getMovieReviews } from 'api/movie'
export default {
  data () {
    return {
      id: '',
      movie: '',
      casts: [],
      photoes: [],
      reviews: [],
      reviewsLength: 0,
      istoggle: false,
      isSpread: true,
      needHeight: false,
      draw: true,
      isChange: false,
      loading: false
    }
  },
  methods: {
    getSingleMovie (id) {
      this.loading = true
      _getSingleMovie(id)
        .then((res) => {
          this.movie = res
          this.currentMovie = res.title
          this.casts = res.directors.concat(res.casts)
          this.loading = false
          this.$nextTick(() => {
            this.chooseSpread()
          })
        })
    },
    getMoviePhotoes (id) {
      _getMoviePhotoes(id)
        .then((res) => {
          this.photoes = res.photos
        })
    },
    getMovieReviews (id) {
      _getMovieReviews(id)
        .then((res) => {
          let reviews = res.reviews
          this.reviews = reviews.slice(0, 3)
          this.reviewsLength = res.total
        })
    },
    toggle (e) {
      // let el = this.$refs.scontent
      this.istoggle = !this.istoggle
      e.preventDefault()
      e.stopPropagation()
    },
    goToReviews (id) {
      this.$router.push({ path: `/reviews/${id}` })
    },
    goToback () {
      this.$router.go(-1)
    },
    chooseSpread () {
      let elH = this.$refs.scontent.clientHeight
      if (elH <= 72) {
        this.isSpread = false
        this.$refs.scontent.style.paddingBottom = 20 + 'px'
      } else {
        this.needHeight = true
      }
    },
    scroll (pos) {
      if (-pos.y > 60) {
        this.isChange = true
      } else if (-pos.y < 30) {
        this.isChange = false
      }
    }
  },
  created () {
    console.log('ch', this.needHeight)
    this.currentMovie = ''
    this.id = this.$route.params.id
    this.getSingleMovie(this.id)
    this.getMoviePhotoes(this.id)
    this.getMovieReviews(this.id)
  },
  components: {
    Scroll,
    Scrollv,
    Comments,
    Loading
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin"
.detail-enter-active, .detail-leave-active
  transform: translate3d(0, 0, 0)
  transition: transform .3s
.detail-enter
  transform: translate3d(100%, 0, 0)
.spread-enter-active, .spread-leave-active
  transition: opacity .5s
.spread-enter, .spread-leave-to
  opacity: 0
 .spread-leave-active
  transition: opacity 0s
.detail-scroll
  padding-bottom: 40px
.d-container
  height: 100%
  background: rgba(229, 229, 229, 0.36)
.d_wrapper
  margin-bottom: 10px
  background: #fff
.d_wrapper_first
  color: #999
  font-size: 12px
  position: relative
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
    // border-1px(transparent)
    &.change
      background: #fff
      border-1px(#ADADAD)
    .init
      span
        background: rgba(255,255,255,0.3)
        padding: 5px 15px
        border-radius: 2px
    .second
      position: absolute
      width: 100%
      text-align: center
      font-size: 16px;
      color: #000
      .icon
        position: absolute
        left: 0
        width: 80px
        color:#df2d2d
      .current-movie
        position: absolute
        width: 100%
        padding: 0 80px
        top:0
        left: 0
        no-wrap()
  .info
    display: flex
    // align-items: flex-end
    height: 220px
    background: rgba(44, 37, 50, 0.67)
    padding: 50px 15px 10px 15px
    position: relative
    .info-con
      flex: 2
    .im-con
      flex: 1
      position: relative
      .icon
        position: absolute
        bottom: -10px
        right: 0
        width: 90px
        height: 110px
        i
          position: absolute
          width: 100%
          height: 100%
          font-size: 38px
          transform: translate3d(50%,50%,0)
          margin-left: -16px
          margin-top: -16px
          color: #fff
        img
          width: 100%
          height: 100%
    .title
      color: #fff
      font-size: 14px
      font-weight: 800
    p
      line-height: 24px
    .wish
      position: absolute
      bottom: 10px
      color: #ffc600
  .summary
    padding: 20px 15px 0 15px
    color: #000
    line-height: 18px
    text-align: justify
    letter-spacing: 1px
    .s_content
      // height: 72px
      // max-height: 72px
      transition: height 0.5s ease
      overflow: hidden
      &.nheight
        max-height: 72px
        padding-bottom: 0
      &.toggle
        max-height: 500px
    .s_toggle
      text-align: center
      height: 35px
      line-height: 35px
.comments_container
  // padding: 0 15px
  .header
    height: 45px
    line-height: 45px
    font-size: 13px
  .comments
    li
      display: flex
      padding-top: 20px
      .portrait_container
        flex:0 0 50px
        img
          width: 50px
          height: 50px
          border-radius: 50%
      .main
        flex: 1
        padding-left: 8px
        padding-bottom: 15px
        font-size: 12px
        line-height: 20px
        color: #666
        border-bottom: 1px solid #e5e5e5;
        .user
          color: #333
        .approve
          color: #ffc600
          font-weight: 800
          line-height: 0
          div
            display: inline-block
            vertical-align: middle
          span
            display: inline-block
            vertical-align: middle
            margin-top: 2px
        .reviews
          margin-top: 10px
          margin-bottom: 10px
        .time
          .d_zan
            float: right
            margin-right: 20px
.all_reviews
  height: 60px
  line-height: 20px
  text-align: center
  font-size: 13px
  color: #e7382d
</style>