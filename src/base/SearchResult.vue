<template>
<scrollv 
:data="searchResult" 
class="result-wrapper"
>
  <div class="search-result">
    <div  v-if="searchResult.length">
      <display-box :searchResult="searchResult" class="no-padding"></display-box>
        <div class="s-result" v-show="length" @click="goToSearchR">查看{{length}}条影视剧结果</div>
        <div v-show="length" style="height:60px"></div>
    </div>
  </div>
</scrollv>
</template>
<script>
  import DisplayBox from 'base/DisplayBox'
  import Scrollv from 'base/Scrollv'
  export default {
    props: {
      searchResult: {
        type: Array,
        default () {
          return []
        }
      },
      length: {
        type: Number,
        default: 0
      },
      keyWord: {
        type: String,
        default: ''
      }
    },
    methods: {
      goToSearchR () {
        this.$emit('searchR', this.keyWord)
      }
    },
    components: {
      DisplayBox,
      Scrollv
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin"
  .result-wrapper
    // padding-top: 60px
    margin-top: 60px
  .no-padding
    padding-top: 0
  .search-result
    padding: 0 20px
    border-top: 1px ssolid #f6f6f6
    border-bottom: 1px ssolid #f6f6f6
    background: #fff
  .s-result
    text-align: center
    height: 40px
    line-height: 40px
    color: #f00
    font-size: 13px
</style>