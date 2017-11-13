<template>
  <ul class="comments">
    <li v-for="(item,index) in reviews" :key="index">
        <div class="portrait_container">
            <img :src="item.author.avatar">
        </div>
        <div class="main">
            <div class="user"><span>{{item.author.name}}</span></div>
            <div class="approve">
              <star :size="36" :score="item.rating.value"></star>
              <span>{{ item.rating.value}}分</span>
            </div>
            <div class="reviews">
              {{item.summary}}
            </div>
            <div class="time">
              <span>{{item.created_at | formatTime('{m}-{d}') }}</span>
              <span class="d_zan">
                <span class="exspan"><i class="iconfont">&#xe61e;</i></span>
                <span>{{item.useful_count}}</span>
              </span>
            </div>
        </div>
    </li>
</ul>
</template>
<script>
  import Star from 'base/star/Star'
  export default {
    props: {
      reviews: {
        type: Array,
        default: []
      }
    },
    components: {
      Star
    }
  }
</script>
<style scoped lang="stylus">
.comments
  padding: 0 15px
  li
    display: flex
    padding-top: 20px
    &:last-child
      .main
        border-bottom: none
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
      padding-right: 8px
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
        text-align: justify
      .time
        .d_zan
          float: right
          margin-right: 20px
          .exspan
            position: relative
            top: 1px
</style>