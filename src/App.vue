<template>
  <div id="app">
    <audio muted loop ref='audio'>
      <source src="./assets/video/test.mp3" type="audio/mpeg">
    </audio>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      audio: null
    }
  },
  computed: {
    ...mapState({
      muted: state => state.audio.muted,
      play: state => state.audio.play
    })
  },
  watch: {
    muted () {
      this.audio.muted = this.muted
    },
    play () {
      if (this.play) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    }
  },
  mounted () {
    this.audio = this.$refs.audio
  }
}
</script>

<style></style>
