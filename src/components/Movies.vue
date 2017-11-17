<template>
  <div class="container">
    <tab :tabtitles="tabtitles" 
    :curPage="curPage">
    <scrollv :pullup="true" @scrollToEnd="loadMore('hot')" :data="scrollMovieHall" >
      <div class="tab-content-container">
        <div class="tab_flex" v-for="item in scrollMovieHall">
          <router-link :to=" '/movie/' + item.id">
            <div class="d_left">
              <img :src="item.images.small">
            </div>
            <div class="d_right">
              <div class="d_right_first">
                <div class="d_title">{{item.title}}</div>
                <div class="d_casts"><span>主演:{{item.casts[0].name}}</span></div>
                <div class="d_rating"><span>评分:{{item.rating.average===0 ?  '暂无评分' : item.rating.average}}</span></div>
              </div>
              <div class="d_right_second"><button>购票</button></div>
            </div>
            </router-link>
        </div>
        <div v-show="loading" class="m_nodata">正在加载...</div>
        <div v-show="noData" class="m_nodata">没有数据了</div>
      </div>
    </scrollv>
    <scrollv :pullup="true" @scrollToEnd="loadMore('coming')" :data="scrollMovieCall" >
      <div class="tab-content-container">
        <div class="tab_flex" v-for="item in scrollMovieCall">
          <router-link :to=" '/movie/' + item.id">
          <div class="d_left">
            <img :src="item.images.small">
          </div>
          <div class="d_right">
            <div class="d_right_first">
              <div class="d_title">{{item.title}}</div>
              <div class="d_casts">
                <p>
                  <span>主演:</span>
                  <span v-for="(cast,index) in item.casts" :key="index">{{cast.name}},&nbsp</span>
                </p>
              </div>
              <div class="d_rating"><span>评分:{{item.rating.average===0 ?  '暂无评分' : item.rating.average}}</span></div>
            </div>
            <div class="d_right_second"><button>购票</button></div>
          </div>
          </router-link>
        </div>
        <div v-show="loading" class="m_nodata">正在加载...</div>
        <div v-show="noData1" class="m_nodata">没有数据了</div>
      </div>
    </scrollv>
    </tab>
    <mfooter></mfooter>
  </div>
</template>
<script>
import Mfooter from 'base/Mfooter'
import Loading from 'base/Loading'
import Scrollv from 'base/Scrollv'
import Tab from 'base/Tab'
import { _getComingSoon, _getHot } from 'api/movie'
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      curPage: 2,
      'tabtitles': ['正在热映', '即将上映'],
      scrollMovieCall: [],
      scrollMovieHall: [],
      loading: false,
      noData1: false,
      noData: false,
      stopLoad: false
    }
  },
  methods: {
    getComingSoon (flag) {
      let query
      if (flag) {
        this.start1 += 10
        if (this.start1 >= this.total1) {
          this.noData1 = true
          return
        } else {
          query = `start=${this.start1}`
        }
      }
      this.loading = true
      _getComingSoon(query).then((res) => {
        if (!this.scrollMovieCall.length) {
          this.scrollMovieCall = res.subjects
          this.count1 = res.count
          this.start1 = res.start
          this.total1 = res.total
          this.loading = false
        } else {
          this.scrollMovieCall = this.scrollMovieCall.concat(res.subjects)
          this.loading = false
        }
      })
    },
    getHot (flag) {
      //  说明是下拉下载的
      let query
      if (flag) {
        this.start += 10
        if (this.start >= this.total) {
          // this.stopLoad = true
          this.noData = true
          return
        } else {
          query = 'city=' + this.cityname + '&start=' + this.start
        }
      } else {
        query = 'city=' + this.cityname
      }
      this.loading = true
      _getHot(query).then((res) => {
        if (!this.scrollMovieHall.length) {
          this.scrollMovieHall = res.subjects
          this.count = res.count
          this.start = res.start
          this.total = res.total
          this.loading = false
        } else {
          this.scrollMovieHall = this.scrollMovieHall.concat(res.subjects)
          this.loading = false
        }
      })
    },
    loadMore (flag) {
      if (flag === 'hot') {
        this.getHot(true)
      } else if (flag === 'coming') {
        this.getComingSoon(true)
      }
    },
    resetData () {
      this.scrollMovieHall = []
      this.count = 0
      this.start = 0
      this.total = 0
      this.noData = false
    },
    ...mapMutations([
      'setRouterActive'
    ])
  },
  computed: {
    ...mapState([
      'cityname'
    ])
  },
  watch: {
    cityname (newname, oldname) {
      if (newname !== oldname) {
        this.isReset = true
      }
    }
  },
  created () {
    this.init = true
    this.getHot()
    this.getComingSoon()
  },
  activated () {
    let query = this.$route.query.flag
    if (query === 'coming') {
      this.curPage = 2
    } else {
      this.curPage = 1
    }
    this.setRouterActive(2)
    if (this.isReset) {
      this.resetData()
      this.getHot()
      this.getComingSoon()
    }
  },
  deactivated () {
    if (this.isReset) {
      this.isReset = false
    }
  },
  components: {
    Mfooter,
    Tab,
    Scrollv,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
.tab-content-container
  padding: 10px 10px 40px 10px
  .tab_flex
    // display: flex
    // align-items: center;
    a
      display: flex
      width: 100%
      height: 100%
    .d_left
      flex: 0 0 80px
      margin: 15px 0
      img
        width: 80px
        height: 100px
    .d_right
      flex: 1
      display: flex
      border-bottom: 1px solid #f0f0f0
      padding: 15px 0 15px 10px
      .d_right_first
        flex: 1
        padding-right: 8px
        overflow: hidden
        .d_title
          font-size: 13px
          line-height: 26px
          font-weight: 800
        .d_casts, .d_rating
          font-size: 12px
          line-height: 24px
          color: #999
        .d_casts p
          // max-width:90%
          max-width:180px
          // color: red
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
      .d_right_second
        flex:0  0 60px
        position: relative
        button
          display: block
          position:absolute
          color: #fff
          width: 50px
          height: 30px
          left: 50%
          top: 45%
          margin-left: -25px
          margin-top: -15px
          border-radius: 20px
          background: #ef4238
          border: none
.tab_top
  display: flex
  height: 45px
  line-height: 45px
  background: #faf8fa
  text-align: center
  span
    flex-grow: 1
.m_nodata
  text-align : center
  padding: 15px 0
  color: #999
  font-size: 12px
</style>