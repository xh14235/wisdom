const audio = {
  state: {
    // 报警声音静音
    muted: true,
    // 报警声音播放与停止
    play: false
  },
  // 下面方法中的t表示ture，f表示false
  mutations: {
    tMuted(state) {
      state.muted = true;
    },
    fMuted(state) {
      state.muted = false;
    },
    tPlay(state) {
      state.play = true;
    },
    fPlay(state) {
      state.play = false;
    }
  }
};

export default audio;
