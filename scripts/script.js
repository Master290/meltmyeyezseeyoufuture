new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Melt Session #1 [Feat. Robert Glasper]",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/Melt Session 1.mp3",
          url: "https://www.youtube.com/@DENZELCURRYPH",
          favorited: false
        },
        {
          name: "Walkin",
          artist: "Denzel Curry",
          cover: "https://static.stereogum.com/uploads/2022/01/Denzel-Curry-Walkin-1643035668.jpeg",
          source: "mp3/Walkin.mp3",
          url: "https://www.youtube.com/watch?v=fOO1mWLGhh8",
          favorited: true
        },
        {
          name: "Worst Come To Worst",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/Worst Come To Worst.mp3",
          url: "https://www.youtube.com/@DENZELCURRYPH",
          favorited: false
        },
        {
          name: "John Wayne [Feat. Buzzy Lee]",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/John Wayne.mp3",
          url: "https://www.youtube.com/@DENZELCURRYPH",
          favorited: false
        },
        {
          name: "The Last",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/The Last.mp3",
          url: "https://www.youtube.com/@DENZELCURRYPH",
          favorited: true
        },
        {
          name: "Mental [Feat. Saul Williams & Bridget Perez]",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/Mental.mp3",
          url: "https://www.youtube.com/watch?v=FtRv1xAkPkQ",
          favorited: false
        },
        {
          name: "Troubles [Feat. T-Pain]",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/Troubles.mp3",
          url: "https://www.youtube.com/watch?v=o1SpNck4U0s",
          favorited: true
        },
        {
          name: "Ain't No Way [Feat. 6LACK, Rico Nasty, J.I.D & Jasiah]",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/Aint No Way.mp3",
          url: "https://www.youtube.com/@DENZELCURRYPH",
          favorited: true
        },
        {
          name: "X-Wing",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/X-Wing.mp3",
          url: "https://www.youtube.com/watch?v=xPS6Tuh880k",
          favorited: true
        },
        {
          name: "Angelz [Feat. Karriem Riggins]",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/Angelz.mp3",
          url: "https://www.youtube.com/watch?v=_ASrQq3O85E",
          favorited: true
        },
        {
          name: "The Smell Of Death",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/The Smell Of Death.mp3",
          url: "https://www.youtube.com/@DENZELCURRYPH",
          favorited: true
        },
        {
          name: "Sanjuro",
          artist: "Denzel Curry, 454",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/Sanjuro.mp3",
          url: "https://www.youtube.com/@DENZELCURRYPH",
          favorited: true
        },
        {
          name: "Zatoichi [Feat. slowtai]",
          artist: "Denzel Curry",
          cover: "https://images.genius.com/ae3ffd435e70cbaeca1b7a7c85278ad4.1000x1000x1.png",
          source: "mp3/Zatoichi.mp3",
          url: "https://www.youtube.com/watch?v=C-com9M91-4",
          favorited: true
        },
        {
          name: "The Ills",
          artist: "Denzel Curry",
          cover: "img/MeltMyEyezSeeYourFuture.jpg",
          source: "mp3/The Ills.mp3",
          url: "https://www.youtube.com/@DENZELCURRYPH",
          favorited: true
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
