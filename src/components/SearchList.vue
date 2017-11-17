<template>
  <div class="container s-list">
    <div class="k-wrapper">
        <div class="k-title">
          <span class="icon" @click="goBack"><i class="iconfont">&#xe603;</i></span>
          <span>相关影视剧</span>
        </div>
    </div>
    <loading v-show="initloading" ></loading>
    <scrollv :pullup="true" 
              @scrollToEnd="loadMore(keyword, true)" 
              :listen-scroll="listenScroll"
              :data="searchResult" ref="searchList">
        <display-box :searchResult="searchResult" @touchstart.native="stopScroll"></display-box>
    </scrollv>
        <div v-show="sloading" class="m_nodata">正在加载...</div>
        <div v-show="noData" class="m_nodata">没有数据了</div>
  </div>
</template>
<script>
  import DisplayBox from 'base/DisplayBox'
  import Loading from 'base/Loading'
  import Scrollv from 'base/Scrollv'
  import {_getInfo} from 'api/movie'

  export default {
    data () {
      return {
        searchResult: [],
        initloading: true,
        sloading: false
      }
    },
    methods: {
      stopScroll () {
        let el = this.$refs.searchList
        el.stop()
      },
      goBack () {
        this.$router.go(-1)
      },
      searchInfo (keyword, flag) {
        let query
        // 说明是下拉加载的
        if (flag) {
          this.start += 10
          if (this.start >= this.total) {
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
        // this.sloading = true
        _getInfo(keyword, query).then((res) => {
          if (!this.searchResult.length) {
            this.searchResult = res.subjects
            this.total = res.total
            this.count = res.count
            this.start = res.start
            if (this.initloading) {
              this.initloading = false
            }
            if (this.sloading) {
              this.sloading = false
            }
            // this.loading = false
            // this.sloading = false
          } else {
            this.searchResult = this.searchResult.concat(res.subjects)
            if (this.initloading) {
              this.initloading = false
            }
            if (this.sloading) {
              this.sloading = false
            }
            // this.loading = false
            // this.sloading = false
          }
        })
      },
      loadMore (keyword, flag) {
        this.searchInfo(keyword, flag)
      }
    },
    activated () {
      this.noData = false
      this.listenScroll = true
      this.keyword = this.$route.params.key
      this.searchInfo(this.keyword, false)
    },
    deactivated () {
      this.$destroy()
    },
    components: {
      DisplayBox,
      Scrollv,
      Loading
    }
  }
</script>
<style scoped lang="stylus">
  @import '~common/stylus/mixin'
  .k-wrapper
    position: absolute
    z-index: 100
    top: 0
    left: 0
    width: 100%
  .m_nodata
    text-align : center
    padding: 15px 0
    color: #999
    font-size: 12px
  .s-list
    height: 100%
    padding: 0 20px 40px 20px
  .k-title
    height: 50px
    line-height: 60px
    font-size: 13px
    color: #000
    text-align: center
    border-1px(#e4e4e4)
    background: #f8f8f8
    position: relative
    .icon
      position: absolute
      top: 0
      left: 0
      width: 80px
</style>