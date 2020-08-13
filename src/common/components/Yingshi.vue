<template>
  <div class="yingshi-wrapper">
    <video src="http://hls01open.ys7.com/openlive/fea250fabf4242efad0920de72c2f7e1.hd.m3u8" id="ddd" controls autoplay></video>
  </div>
</template>

<script>
export default {
  name: 'Yingshi',
  mounted () {
    var player = new EZUIKit.EZUIPlayer('ddd')
    player.on()
  }
}
</script>

<style lang="stylus" scoped>
.yingshi-wrapper
  width: 100%
  height: 100%
  video
    width: 100%
    height: 10vh
</style>
