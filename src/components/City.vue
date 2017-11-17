<template>
<transition name="fade">
  <div class="container city-wrapper">
    <div class="c_header" :class="{hidden: showCancle }" ref="cheader">
        <span class="c-cancel" @click="selectCityDone"><i class="iconfont">&#xe624;</i>
</span>
        <span>当前城市名-{{cityname}}</span>
    </div>
    <div class="search_city" :class="{add: showCancle }">
      <input type="text"
        placeholder="🔍  输入城市名或拼音"
        :class="{active: showCancle }"
        @click="focus"
        v-model.trim="cname">
      <span v-show="showCancle" @click="cancel">取消</span>
    </div>
    <div class="city-result" v-if="showCitySearchResult">
      <scrollv :data="citySearchResult" v-if="citySearchResult.length">
      <ul @click="getCityName">
        <li 
          v-for="(item, index) in citySearchResult" 
          :key="index">
          {{item}}
        </li>
      </ul>
      </scrollv>
      <div class="city-no-data" v-if="!citySearchResult.length">无结果</div>
   </div>
    <scrollv @scroll="scroll"
            :class="{top: showCancle }"
            :listen-scroll="listenScroll"
            :probe-type="probeType"
            :data="data"
            class="listview"
            ref="listview">
      <ul>
        <li v-for="group in data" class="list-group" ref="listGroup">
          <h2 class="list-group-title">{{group.title}}</h2>
          <ul @click="getCityName">
            <li v-for="item in group.items" class="list-group-item">
              {{item}}
            </li>
          </uL>
        </li>
      </ul>
      <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart" 
          @touchmove.stop.prevent="onShortcutTouchMove"
           @touchend.stop>
        <ul>
          <li v-for="(item, index) in shortcutList" :data-index="index" class="item"
              :class="{'current':currentIndex===index}">{{item}}
          </li>
        </ul>
      </div>
      <div class="list-fixed" ref="fixed" v-show="fixedTitle">
        <div class="fixed-title">{{fixedTitle}}</div>
      </div>
      <test v-show="showCancle" ref="mask"></test>
    </scrollv>
  </div>
</transition>
</template>

<script>
  import Scrollv from 'base/Scrollv'
  import test from 'base/Mask'
  import {getData} from 'common/js/dom'
  import data from 'common/js/city'
  import {debounce} from 'common/js/util'
  import data1 from 'common/js/city1'
  import PinyinEngine from 'pinyin-engine'
  import {mapMutations, mapState} from 'vuex'

  const pinyinEngine = new PinyinEngine(data1)
  const TITLE_HEIGHT = 30
  const ANCHOR_HEIGHT = 18

  export default {
    data () {
      return {
        data: data,
        scrollY: -1,
        currentIndex: 0,
        diff: -1,
        cname: '',
        showCancle: false,
        showCitySearchResult: false,
        citySearchResult: []
      }
    },
    computed: {
      shortcutList () {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      },
      fixedTitle () {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
      },
      ...mapState([
        'cityname'
      ])
    },
    created () {
      this.probeType = 3
      this.listenScroll = true
      this.touch = {}
      this.listHeight = []
      // reset
      this.showCitySearchResult = false
      this.citySearchResult = []
      this.$watch('cname', debounce((newCityname) => {
        if (newCityname) {
          this.searchCity(newCityname)
        }
      }, 500))
    },
    methods: {
      addEvent (flag) {
        let el = this.$refs.mask.$el
        if (flag) {
          el.removeEventListener('touchstart', () => {})
        }
        el.addEventListener('touchstart', (event) => {
          event.preventDefault()
          event.stopPropagation()
        },
          { passive: false })
      },
      focus (e) {
        this.showCancle = true
        this.addEvent()
        setTimeout(() => {
          e.target.focus()
        }, 300)
      },
      cancel () {
        this.addEvent(true)
        this.showCancle = false
        this.showCitySearchResult = false
        this.citySearchResult = []
        this.cname = ''
      },
      searchCity (name) {
        this.citySearchResult = pinyinEngine.query(name)
        this.showCitySearchResult = true
      },
      getCityName (e) {
        let name = e.target
        if (name && name.tagName.toLowerCase() === 'li') {
          let ns = name.innerHTML.trim()
          this.setCityName(ns)
          this.selectCityDone()
        }
      },
      onShortcutTouchStart (e) {
        let anchorIndex = getData(e.target, 'index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove (e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      refresh () {
        this.$refs.listview.refresh()
      },
      scroll (pos) {
        this.scrollY = pos.y
      },
      _calculateHeight () {
        this.listHeight = []
        const list = this.$refs.listGroup
        let h = 0
        this.listHeight.push(h)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          h += item.clientHeight
          this.listHeight.push(h)
        }
      },
      _scrollTo (index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      },
      selectCityDone () {
        this.$router.push({ path: `/` })
      },
      ...mapMutations([
        'setCityName'
      ])
    },
    activated () {
      this.cancel()
    },
    mounted () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    watch: {
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
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      },
      diff (newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    },
    components: {
      Scrollv,
      test
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .fade-enter-active
    transition: transform .5s
  .fade-enter, .fade-leave-to
    // opacity: 0
    transform: translate3d(0,100%,0)
  .fade-leave-active
    transition: transform .3s
  .city-wrapper
    height: 100%
  .c_header
    background: #ef4238
    height: 50px
    line-height: 50px
    text-align: center
    color: #fff
    font-size: 14px
    transition:all 0.3s linear
    position: relative
    &.hidden
      transform: translate3d(0,-50px,0)
    .c-cancel
      position: absolute
      left: 0
      width: 80px
      height: 100%
  .search_city
    position: relative
    padding:10px
    background: #ccc
    font-size: 12px
    transition:all 0.3s linear
    &.add
      transform: translate3d(0,-50px,0)
      padding-top:30px
      background:rgba(172, 168, 168, 0.26);
      span
        right: 20px
    input
      width: 100%
      height: 30px
      line-height: 30px
      padding-left:10px
      border-radius: 5px
      transition:all 0.3s linear
      text-align: center
      letter-spacing: 1px
      &::placeholder
        color:#BEBEBE
      &.active
        width:calc(100% - 50px)
        margin-right: 8px
        text-align: left
    span
      position: absolute
      right: -10px
      color:#999
      height: 30px
      line-height: 30px
      font-size: 14px
      transition:all 0.3s linear
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: #f8f8f8
    transition:all 0.3s linear
    &.top
      transform: translate3d(0,-50px,0)
    .list-group
      padding-bottom: 30px
      ul
        padding: 0 25px 0 15px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: #000
        background:rgba(239,239,239,.9)
      .list-group-item
        display: flex
        align-items: center
        padding: 15px 0
        color:#000
        font-size: 12px
        border-bottom: 1px solid #e5e5e5
        extend-click()
        // .name
        //   color:#000
        //   font-size: 12px
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      // background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        // color: $color-text-l
        color: #999
        font-size: $font-size-small
        &.current
          color: #ef4238
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: #000
        background: rgba(239,239,239,0.9)
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
  .city-result
    padding-left: 20px
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 1000;
    overflow: hidden;
    ul
      li
        // height: 30px
        // line-height: 30px
        padding: 15px 0
        border-1px(#f6f6f6)
        extend-click()
    .city-no-data
      text-align: center
      position:absolute
      top: 20%;
      width: 100%;
      margin-left: -16px;
      font-size: 18px;
      color: #ccc;
</style>