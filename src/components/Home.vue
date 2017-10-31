<template>
<div class="container">
  <div v-if="sliderMovie.length" class="slider-wrapper" ref="sliderWrapper">
    <slider :loop="false">
      <div v-for="item in sliderMovie">
        <a :href="item.alt">
          <img class="needsclick" :src="item.images.small">
        </a>
      </div>
    </slider>
  </div>
  
  <div v-if="scrollMovieH.length">
    <scroll ref="scroll"
              :data="scrollMovieH"
              title="正在热映"
    >
      </scroll>
  </div>
  <div v-if="scrollMovieC.length">
    <scroll ref="scroll"
              :data="scrollMovieC"
              title="即将上映"
    >
      </scroll>
  </div>
  <mfooter></mfooter>
</div>
</template>

<script>
import Slider from 'base/Slider'
import Scroll from 'base/Scroll'
import Mfooter from 'base/Mfooter'
import { _getComingSoon, _getHot } from 'api/movie'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      sliderMovie: [],
      scrollMovieC: [],
      scrollMovieCall: [],
      scrollMovieH: [],
      scrollMovieHall: []
    }
  },
  methods: {
    getComingSoon () {
      _getComingSoon().then((res) => {
        this.scrollMovieCall = res.subjects
        this.sliderMovie = res.subjects.slice(0, 5)
        this.scrollMovieC = res.subjects.slice(0, 10)
        this.getMovieHot(res.subjects)
      })
    },
    getHot () {
      _getHot().then((res) => {
        this.scrollMovieHall = res.subjects
        this.scrollMovieH = res.subjects.slice(0, 10)
        this.getMovieSoon(res.subjects)
      })
    },
    ...mapMutations([
      'getMovieHot',
      'getMovieSoon'
    ])
  },
  created () {
    this.getComingSoon()
    this.getHot()
  },
  components: {
    Slider,
    Scroll,
    Mfooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.slider-wrapper
  position: relative
  width: 100%
  height: 150px
  overflow: hidden
</style>
