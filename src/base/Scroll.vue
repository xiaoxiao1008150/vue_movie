<template>
  <div class="list-wrapper" ref="wrapper">
    <div class="scroll_container" v-if="detail">
        <div class="panel-header">
          <span class="panel_title">{{title}}</span>
          <span class="panel_more" @click="goToMovie">全部({{ count }})部</span>
        </div>
        <div class="list_wrapper" ref="list">
          <ul class="list-content clearfix" ref="ul">
            <li class="list-item" v-for="item in data" @click="goToDetail(item.id)">
              <a href="">
                <img :src="item.images.item ? item.images.small : '' ">
                <div class="wish"><span>{{item.rating && item.rating.average ? '观众评' + item.rating.average : ''}}</span></div>
              </a>
              <div class="list-text">
                <div class="list-title e-title">{{item.title}}</div>
                <button v-if="buy">购票</button>
                <span v-if="!buy" class="date">{{item.mainland_pubdate.slice(5)}}</span>
              </div>
            </li>
          </ul>
        </div>
    </div>
    <div class="scroll_container" v-else>
        <div class="panel-header">
          <span class="panel_title">{{title}}</span>
          <span class="panel_more" @click="goToMovie">全部</span>
        </div>
        <div class="list_wrapper" ref="list">
          <ul class="list-content clearfix" ref="ul" v-if="photoes">
            <li class="list-item" v-for="item in data">
              <a  :style="styleObject" href=""><img  :src="item.cover"></a>
            </li>
          </ul>
          <ul class="list-content clearfix" ref="ul" v-else>
            <li class="list-item" v-for="item in data">
              <a href=""><img :src="item.avatars.small"></a>
              <div class="list-text">
                <div class="list-title">{{item.name}}</div>
              </div>
            </li>
          </ul>
        </div>
    </div>

</div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'

  const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'
  export default {
    name: COMPONENT_NAME,
    data () {
      return {
        styleObject:{
          height: '100px'
        }
      }
    },
    props: {
      buy: {
        type: Boolean,
        default: true
      },
      photoes: {
        type: Boolean,
        default: false
      },
      detail: {
        type: Boolean,
        default: true
      },
      count: {
        type: Number,
        default: 0
      },
      flag: {
        type: String,
      },
      title: {
        type: String,
      },
      probeType: {
        type: Number,
        default: 1
      },
      direction: {
        type: String,
        default: DIRECTION_H
      },
      click: {
        type: Boolean,
        default: true
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initDom()
        this._initScroll()
      }, 20)
    },
    methods: {
      _initDom () {
        let parent = this.$refs.ul
        if (parent) {
          let children = parent.children
          let childrenW = children[0].clientWidth
          let width = children.length * childrenW
          parent.style.width = width + 10 + 'px'
        }
      },
      _initScroll() {
        if (!this.$refs.list) {
          return
        }
        let scrollDirectionX = this.direction===DIRECTION_H ? true : false
        // let pullUpLoad
        // if (this.pullup){
        //   pullUpLoad = {
        //     threshold: 50
        //   }
        // }

        this.scroll = new BScroll(this.$refs.list, {
          // probeType: this.probeType,
          // click: this.click,
          scrollX: scrollDirectionX,
          scrollY: !scrollDirectionX,
          // pullUpLoad: pullUpLoad

        })
        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      // // 下拉刷新设置
      //   if (this.pullup) {
      //     this.scroll.on('scrollEnd', () => {
      //       if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
      //         console.log('下拉')
      //         this.$emit('scrollToEnd')
      //       }
      //     })
      //   }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      goToMovie () {
        this.$router.push({path: '/movies', query: { flag: this.flag }})
      },
      goToDetail (id) {
        this.$router.push({path: `/movie/${id}`})
      },
    },
    computed: {
      ...mapState([
        'cityname'
      ])
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.list-wrapper
  overflow:hidden
  .panel-header
      height: 60px
      line-height: 60px
      .panel_title
        font-size: 13px
        font-weight: 800
      .panel_more
        float: right
        font-size: 12px
        color:#5B5B5B
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
      position: relative
      display:block
      height: 150px
      width: 100%
      .wish
        position: absolute
        bottom:5px
        padding-left: 8px
        font-size: 10px
        color: #ffb400
      img
        width:100%
        height:100%
        border: 1px solid #f0f0f0
    .list-text
      .list-title
        font-size: 12px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        margin: 15px 0
      .date
        font-size: 10px
        color:#999
        display: block
        transform: translate3d(0, -8px,0)
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
