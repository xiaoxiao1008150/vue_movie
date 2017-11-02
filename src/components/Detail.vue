<template>
  <div class="container" v-if="movie">
    <div class="d_wrapper d_wrapper_first" >
      <div class="info">
        <p class="title">{{movie.title}}</p>
        <p class="genres">{{movie.genres.join(',')}}</p>
        <p class="country">{{movie.countries.join(' ')}}</p>
        <p class="wish">{{movie.wish_count}}想看</p>
      </div>
      <div class="summary">
        {{ movie.summary}}
      </div>
    </div>
    <div class="d_wrapper">
      <div>这里有一个scroll, 演职人员</div>
    </div>
    <div class="d_wrapper">
      <div>这里有一个scroll，剧照</div>
    </div>
    <div class="d_wrapper">
      端评论
    </div>
  </div>
</template>
<script>
import { _getSingleMovie } from 'api/movie'
export default {
  data () {
    return {
      movie: ''
    }
  },
  methods: {
    getSingleMovie (id) {
      _getSingleMovie(id)
        .then((res) => {
          this.movie = res
        })
    }
  },
  created () {
    let id = this.$route.params.id
    console.log('id', id)
    this.getSingleMovie(id)
  }
}
</script>
<style scoped lang="stylus">
.d_wrapper
  // padding: 10px 15px
.d_wrapper_first
  color: #999
  font-size: 12px
  .info
    height: 220px
    background: rgba(44, 37, 50, 0.67)
    padding: 50px 15px 10px 15px
    position: relative
    .title
      color: #fff
      font-size: 14px
      font-weight: 800
    p
      line-height: 24px
    .wish
      position: absolute
      bottom: 10px
      color: #ffc600
  .summary
    padding: 20px 15px
    color: #000
    line-height: 18px
    text-align: justify
</style>