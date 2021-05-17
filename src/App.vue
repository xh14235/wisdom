<template>
  <div id="app">
    <!-- 报警声音 -->
    <audio muted loop ref="audio">
      <source src="./assets/video/test.mp3" type="audio/mpeg" />
    </audio>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  data() {
    return {
      audio: null
    };
  },
  computed: {
    ...mapState({
      muted: state => state.audio.muted, // 报警声音静音
      play: state => state.audio.play // 报警声音停止
    })
  },
  watch: {
    muted() {
      this.audio.muted = this.muted;
    },
    play() {
      if (this.play) {
        this.audio.play();
      } else {
        this.audio.pause();
      }
    }
  },
  mounted() {
    this.audio = this.$refs.audio;
  }
};
</script>

<style></style>
