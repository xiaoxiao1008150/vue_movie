<template>
  <div class="city-result">
    <ul>
      <li ></li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      }
    }
  }
</script>
<style scoped lang="stylus">
  .city-result
    padding-left: 20px
    ul
      li
        height: 30px
        line-height: 30px
        border-1px(#f6f6f6)
</style>