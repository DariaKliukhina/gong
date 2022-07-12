<template>
  <div class="circle animate__circle">
    <div class="circle__wrapper animate__circle-wrapper">
      <button @click="setActive" type="button" class="circle__main">
        <span class="circle__body">
          <span class="circle__blick animate__blick"></span>
        </span>
      </button>

      <audio @ended="$emit('end')" ref="audio" controls class="hide">
        <source src="./sounds/gong-chinese.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setActive() {
      this.$refs.audio.play();
      this.$emit("activate");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/animations.scss";

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

.animate {
  &__circle {
    transform-origin: top center;
  }

  &__circle-wrapper {
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
  .animate {
    &__circle {
      animation-name: perspective;
      animation-duration: 3s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
    }

    &__circle-wrapper {
      &::before {
        animation-name: scale;
        animation-duration: 1s;
        animation-iteration-count: 3;
        animation-timing-function: ease-out;
      }
    }

    &__blick {
      animation-name: blick;
      animation-duration: 3s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
    }
  }
}
</style>