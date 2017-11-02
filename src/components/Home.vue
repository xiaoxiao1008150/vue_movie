<template>
<div class="container" v-if="scrollMovieH.length && scrollMovieC.length">
  <scroll direction="DIRECTION_V" :data="scrollMovieH">
    <div style="height: 100%">
      <div v-if="sliderMovie.length" class="slider-wrapper" ref="sliderWrapper">
        <slider :loop="false">
          <div v-for="item in sliderMovie">
            <a :href="item.alt">
              <img class="needsclick" :src="item.images.small">
            </a>
          </div>
        </slider>
      </div>
      <div class="scroll_container" v-if="scrollMovieH.length">
        <div class="panel-header">
          <span class="panel_title">正在热映</span>
          <span class="panel_more" @touchend="goToMovie('hot')">全部{{movieh_count}}部</span>
        </div>
        <scroll
          :data="scrollMovieH"
        >
          <ul ref="listH" class="list-content clearfix">
            <li class="list-item" v-for="item in scrollMovieH" @touchend="goToDetail(item.id)">
              <a href=""><img :src="item.images.small"></a>
              <div class="list-text">
                <div class="list-title">{{item.title}}</div>
                <button>购票</button>
            </div>
            </li>
          </ul>
       </scroll>
      </div>
      <div class="scroll_container" v-if="scrollMovieC.length">
        <div class="panel-header">
          <span class="panel_title">即将上映</span>
          <span class="panel_more" @touchend="goToMovie('coming')">全部{{moviec_count}}部</span>
        </div>
        <scroll
          :data="scrollMovieC"
        >
          <ul ref="listC" class="list-content clearfix">
            <li class="list-item" v-for="item in scrollMovieC">
            <a href=""><img :src="item.images.small"></a>
            <div class="list-text">
              <div class="list-title">{{item.title}}</div>
              <span></span>
            </div>
            </li>
          </ul>
       </scroll>
      </div>
    </div>
  </scroll>
  <mfooter></mfooter>
</div>
</template>

<script>
import Slider from 'base/Slider'
import Scroll from 'base/Scroll'
import Mfooter from 'base/Mfooter'
import { _getComingSoon, _getHot } from 'api/movie'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      sliderMovie: [],
      scrollMovieC: [],
      scrollMovieCall: [],
      scrollMovieH: [],
      scrollMovieHall: [],
      moviec_count: 0,
      movieh_count: 0
    }
  },
  methods: {
    getComingSoon () {
      _getComingSoon().then((res) => {
        this.scrollMovieCall = res.subjects
        this.moviec_count = res.total
        this.sliderMovie = res.subjects.slice(0, 5)
        this.scrollMovieC = res.subjects.slice(0, 10)
        this.getMovieHot(res.subjects)
        // this.$nextTick(function () {
        //   this._initDom('listC')
        // })
      })
    },
    getHot () {
      _getHot().then((res) => {
        this.scrollMovieHall = res.subjects
        this.movieh_count = res.total
        this.scrollMovieH = res.subjects.slice(0, 10)
        this.getMovieSoon(res.subjects)
        // this.$nextTick(function () {
        //   this._initDom('listH')
        // })
      })
    },
    // _initDom (el) {
    //   let parent = this.$refs[el]
    //   console.log('el===', el)
    //   console.log('parent===', parent)
    //   let children = parent.children
    //   let childrenW = children[0].clientWidth
    //   let width = children.length * childrenW
    //   console.log('children===', parent.children)
    //   console.log('length===', children.length)
    //   parent.style.width = width + 10 + 'px'
    // },
    goToMovie (flag) {
      this.$router.push({path: '/movies', query: { flag: flag }})
    },
    goToDetail (id) {
      this.$router.push({path: `/movie/${id}`})
    },
    ...mapMutations([
      'getMovieHot',
      'getMovieSoon'
    ])
  },
  created () {
    this.getComingSoon()
    this.getHot()
  },
  mounted () {
  },
  components: {
    Slider,
    Scroll,
    Mfooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.container
  width: 100%
  height: 100%
  overflow: hidden
.slider-wrapper
  position: relative
  width: 100%
  height: 150px
  overflow: hidden
.panel-header
      height: 60px
      line-height: 60px
      .panel_title
        font-size: 13px
        font-weight: 800
      .panel_more
        float: right
        font-size: 12px
.scroll_container
  padding: 0 10px
  margin-bottom: 20px
.scroll-content
  overflow:hidden
.list-content
  position: relative
  z-index: 10
  background: #fff
  // padding-right: 10px
  // height:170px
  width: 1200px
  .list-item
    // height: 150px
    width: 120px
    font-size: 18px
    padding-right:10px
    margin-bottom: 10px
    float: left
    a
      display:block
      height: 150px
      width: 100%
      img
        width:100%
        height:100%
    .list-text
      .list-title
        font-size: 12px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        margin: 15px 0
      button
        color: #fff
        padding: 5px 10px
        border-radius: 20px
        background: #ef4238
        border: none
.clearfix:after
  content:''
  display: block
  clear:both
  visibility: hidden
  height:0

</style>
