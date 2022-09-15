<template>
  <div class="circle animate-circle">
    <div class="circle__wrapper animate-circle__wrapper">
      <button @click="setActive" type="button" class="circle__main">
        <span class="circle__body">
          <span class="circle__blick animate-circle__blick"></span>
        </span>
      </button>

      <audio @ended="end" ref="bang" controls class="hide" tabindex="-1">
        <source src="./sounds/bang.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      <audio @ended="end" ref="click" controls class="hide" tabindex="-1">
        <source src="./sounds/click.wav" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  </div>
</template>

<script>
import AudioBlock from "../AudioBlock/AudioBlock.vue";
export default {
  components: { AudioBlock },
  props: {
    isDesktop: Boolean,
  },
  data() {
    return {
      currentAudio: null,
    };
  },
  computed: {
    isReady() {
      return this.$store.state.isReady;
    },
    isActive() {
      return this.$store.state.isActive;
    },
    duration() {
      return this.currentAudio?.duration || 0;
    },
  },
  watch: {
    isReady(status) {
      this.currentAudio = status ? this.$refs.bang : this.$refs.click;
    },
    isDesktop(status) {
      this.currentAudio = status ? this.$refs.click : this.$refs.bang;
    },
  },
  mounted() {
    this.currentAudio = this.isDesktop ? this.$refs.click : this.$refs.bang;
  },
  methods: {
    end() {
      this.$store.commit("activate", false);
    },
    setActive() {
      if (!this.isActive) {
        this.currentAudio?.play();
        this.$store.commit("activate", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/animations.scss";

.ready {
  .circle__main {
    @media #{$min-width-desktop} {
      cursor: none;
    }
  }
}

.circle {
  position: absolute;
  width: 55%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  left: 50%;
  top: 30%;
  top: 18%;
  transform: translate(-50%);

  &__main {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    padding: 15%;
    background-color: $gong-border;
    border: none;
    z-index: 5;
    cursor: pointer;
    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: none;
      box-shadow: 0 0 10px 5px #9b8de2;
    }
  }

  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: $gong-border;
  }

  &__body {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    background-color: $gong-color;
    z-index: 5;

    &::after {
      content: "";
      position: absolute;
      display: inline-block;
      width: 38%;
      height: 38%;
      border-radius: 50%;
      background-color: $gong-border;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  &__blick {
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 00%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-16deg);
    transform-origin: center;
    border-top: 200px solid #a7967f;
    border-bottom: 200px solid #ddccb3;
    border-left: 100px solid transparent;
    border-right: 100px solid transparent;
  }
}

.animate-circle {
  transform-origin: top center;

  &__wrapper {
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 0;
      opacity: 1;
      left: 50%;
      top: 50%;
      border-radius: 50%;
      transform: scale(1) translate(-50%, -50%);
      transform-origin: 0 0;
      background-color: $gong-border;
    }
  }
}

.active {
  .animate-small {
    .animate-circle {
      animation-name: perspective-small;
      animation-duration: 0.7s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;

      &__wrapper {
        &::before {
          animation-name: scale-small;
          animation-duration: 1s;
          animation-iteration-count: 1;
          animation-timing-function: ease-out;
        }
      }

      &__blick {
        animation-name: blick-small;
        animation-duration: 1s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
      }
    }
  }
  .animate {
    .animate-circle {
      animation-name: perspective;
      animation-duration: 4s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;

      &__wrapper {
        &::before {
          animation-name: scale;
          animation-duration: 1s;
          animation-iteration-count: $animation-iterations;
          animation-timing-function: ease-out;
        }
      }

      &__blick {
        animation-name: blick;
        animation-duration: 4s;
        animation-iteration-count: 1;
        animation-timing-function: ease-in-out;
      }
    }
  }
}
</style>