<template>
  <div class="container">
    <tab :tabtitles="tabtitles" 
    :current-page="3">
      <div class="tab-content-container">
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
        <div>hahaha1</div>
      </div>
      <div class="tab-content-container">
        bajian2
      </div>
    </tab>
    <mfooter></mfooter>
  </div>
</template>
<script>
import Mfooter from 'base/Mfooter'
import Tab from 'base/Tab'
export default {
  data () {
    return {
      'tabtitles': ['bajian', 'github']
    }
  },
  components: {
    Mfooter,
    Tab
  }
}
</script>
<style lang="stylus" scoped>
.tab_top
  display: flex
  height: 45px
  line-height: 45px
  background: #faf8fa
  text-align: center
  span
    flex-grow: 1
</style>