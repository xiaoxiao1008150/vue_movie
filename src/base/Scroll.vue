<template>
  <div class="list-wrapper">
    <div class="panel-header">
      <span class="panel_title">{{title}}</span>
      <span class="panel_more" @click="gotoMoviePage">全部部</span>
    </div>
    <div class="scroll-content" ref="wrapper">
        <ul ref="list" class="list-content">
          <li @click="clickItem($event,item)" class="list-item" v-for="item in data">
          <a href=""><img :src="item.images.large"></a>
          </li>
        </ul>
  </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'
  export default {
    name: COMPONENT_NAME,
    props: {
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
        let parent = this.$refs.list
        let children = parent.children
        let children_width = children[0].clientWidth
        let width = children.length * children_width
        parent.style.width = width + 10 + 'px'
      },
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          // probeType: this.probeType,
          // click: this.click,
          scrollX: true,
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }
      // 下拉刷新设置
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

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
      gotoMoviePage() {
        this.$router.push({path: '/movies'})
      }
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
    // height: 170px
    padding:0 15px
    .panel-header
      height: 60px
      line-height: 60px
      .panel_title
        font-size: 13px
        font-weight: 800
      .panel_more
        float: right
        font-size: 12px
    .scroll-content
      overflow:hidden
      .list-content
        position: relative
        z-index: 10
        background: #fff
        padding-right: 10px
        height:170px
        .list-item
          height: 150px
          width: 120px
          font-size: 18px
          padding-right:10px
          margin-bottom: 10px
          float: left
          a
            display:block
            img
              width:100%
              height:100%
</style>
