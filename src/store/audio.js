const audio = {
  state: {
    muted: true,
    play: false
  },
  mutations: {
    tMuted (state) {
      state.muted = true
    },
    fMuted (state) {
      state.muted = false
    },
    tPlay (state) {
      state.play = true
    },
    fPlay (state) {
      state.play = false
    }
  }
}

export default audio
