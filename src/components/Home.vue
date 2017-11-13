<template>
<transition name="home">
<div class="home">
  <div class="container" v-if="scrollMovieH.length && scrollMovieC.length">
    <search v-show="showSearch" @pclear="goBackIndex"></search>
    <div v-show="!showSearch">
      <div class="index_header" :class="{change: isChange}">
        <span class="city" @click="goToCityList">{{cityname}}</span>
        <div class="in-con">
          <i class="icon iconfont">&#xe632;</i>
          <input id="search" @click="searchMovie" type="text" placeholder="找影视剧、影人">
        </div>
      </div>
      <div class="h">
        <scrollv 
          :data="scrollMovieH" 
          :listenScroll="true"
          :probe-type="3"
          @scroll="scroll">
          <div class="list_vertical">
            <div v-if="sliderMovie && sliderMovie.length" class="slider-wrapper" ref="sliderWrapper">
              <slider>
                <div v-for="item in sliderMovie">
                  <a :href=" '/movie/' + item.id" >
                    <img class="needsclick" src="../common/images/2.jpg">
                  </a>
                </div>
              </slider>
            </div>
            <scroll 
              :data="scrollMovieH" 
              v-if="scrollMovieH.length" 
              flag="hot"
              :buy="true"
              :count="movieh_count"
              title="正在热映">
              </scroll>
            <scroll 
              :data="scrollMovieC" 
              v-if="scrollMovieC.length" 
              flag="coming"
              :buy="false"
              :count="moviec_count"
              title="即将上映">
              </scroll>
          </div>
        </scrollv>
      </div>
      <mfooter></mfooter>
    </div>
    </div>
  <div v-show="loading"><loading></loading></div>
</div>

</transition>
</template>

<script>
import Slider from 'base/Slider'
import Scroll from 'base/Scroll'
import Scrollv from 'base/Scrollv'
import Loading from 'base/Loading'
import Mfooter from 'base/Mfooter'
import Search from 'components/Search'
import { _getComingSoon, _getHot } from 'api/movie'
import {mapMutations, mapState} from 'vuex'
export default {
  data () {
    return {
      sliderMovie: [],
      scrollMovieC: [],
      scrollMovieCall: [],
      scrollMovieH: [],
      scrollMovieHall: [],
      moviec_count: 0,
      movieh_count: 0,
      showSearch: false,
      isChange: false,
      loading: true
    }
  },
  methods: {
    getComingSoon () {
      _getComingSoon().then((res) => {
        this.scrollMovieCall = res.subjects
        this.moviec_count = res.total
        this.sliderMovie = res.subjects.slice(0, 5)
        this.scrollMovieC = res.subjects
        this.setComMovie(this.sliderMovie)
        this.loading = false
        // this.$nextTick(function () {
        //   this._initDom('listC')
        // })
      })
    },
    getHot () {
      let query = 'city=' + this.cityname
      _getHot(query).then((res) => {
        console.log('res', res)
        this.scrollMovieHall = res.subjects
        this.movieh_count = res.total
        this.scrollMovieH = res.subjects
        // this.$nextTick(function () {
        //   this._initDom('listH')
        // })
      })
    },
    goToCityList () {
      this.$router.push({ path: `/city-list` })
    },
    searchMovie () {
      this.showSearch = true
    },
    goBackIndex () {
      this.showSearch = false
    },
    scroll (pos) {
      if (-pos.y > 60) {
        this.isChange = true
      } else if (-pos.y < 30) {
        this.isChange = false
      }
    },
    ...mapMutations([
      'setComMovie',
      'setRouterActive'
    ])
  },
  watch: {
    cityname (newName, oldName) {
      console.log('newName', newName, oldName)
      if (newName !== oldName) {
        this.getComingSoon()
        this.getHot()
      }
    }
  },
  computed: {
    ...mapState([
      'cityname'
    ])
  },
  activated () {
    this.setRouterActive(1)
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
    Mfooter,
    Scrollv,
    Search,
    Loading
  }
}
</script>

<style scoped lang="stylus">
.home-enter-active
  transition: opacity .3s
.home-enter, .home-leave-to
  opacity: 0
.container
  width: 100%
  height: 100%
  overflow: hidden
.slider-wrapper
  position: relative
  width: 100%
  height: 150px
  overflow: hidden
.index_header
  position: fixed
  z-index: 100
  top: 0
  width: 100%
  padding: 20px 20px 10px
  font-size: 12px
  // background: #ef4238
  // background: rgba(0,0,0,0.3)
  background: rgba(255,255,255,0)
  transition: background 0.5s linear
  display: flex
  &.change
    background: #ef4238
    .city
      background:rgba(255,255,255,0.1)
  .city
    color: #fff
    display: inline-block
    height: 30px
    line-height: 30px
    padding: 0 8px
    border-radius: 15px
    background: rgba(108, 108, 108, 0.68)
    flex: 0 0 70px
    margin-right: 10px
    text-align: center
  .in-con
    flex: 1
    height: 30px
    position: relative
    .icon
      position: absolute
      top: 8px
      left: 3px
      color:#9D9D9D
  #search
    height: 100%
    width: 100%
    line-height: 30px
    border-radius: 15px
    padding-left: 22px
    &::placeholder
      color: #9D9D9D
.h
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 50px
  overflow: hidden
</style>
