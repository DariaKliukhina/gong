<template>
  <div :class="`gong-body ${isActive && 'active'}`">
    <div
      :class="`gong-body__main ${
        isAnimationReady || !isDesktop ? 'animate' : 'animate-small'
      }`"
    >
      <span class="gong-body__ropes-container animate-ropes">
        <span class="gong-body__ropes"></span>
      </span>
      <Circle :isDesktop="isDesktop" />
    </div>
  </div>
</template>

<script>
import Circle from "../Circle/Circle.vue";
export default {
  components: { Circle },
  props: {
    isDesktop: Boolean,
  },
  data() {
    return {
      isAnimationReady: false,
    };
  },
  watch: {
    isReady(status) {
      if (!this.isActive) {
        this.isAnimationReady = status;
      }
    },
    isActive(status) {
      if (!status) {
        this.isAnimationReady = this.isReady;
      }
    },
  },
  computed: {
    isActive() {
      return this.$store.state.isActive;
    },
    isReady() {
      return this.$store.state.isReady;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/animations.scss";
.gong-body {
  position: relative;
  flex-grow: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &__main {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &__ropes-container {
    position: absolute;
    top: 0;
    left: 35%;
    display: inline-block;
    width: 30%;
    height: 28%;
    z-index: 5;
    pointer-events: none;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: $main-bg;
      bottom: 5%;
      z-index: 5;

      @media #{$min-width-tablet} {
        bottom: 5%;
      }
      @media #{$min-width-desktop} {
        bottom: 10%;
      }
    }

    &::before {
      left: 5%;

      @media #{$min-width-tablet} {
        left: 5%;
      }
      @media #{$min-width-desktop} {
        left: 9%;
      }
    }

    &::after {
      right: 5%;

      @media #{$min-width-tablet} {
        right: 5%;
      }
      @media #{$min-width-desktop} {
        right: 9%;
      }
    }
  }

  &__ropes {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-right: 3px solid $rope-color;
    border-left: 3px solid $rope-color;
    transform: perspective(15px) rotateX(-4deg);
  }
}

.animate,
.animate-small {
  &__ropes {
    transform-origin: top center;
  }
}

.active {
  .animate {
    .animate-ropes {
      animation-name: perspective-ropes;
      animation-duration: 3s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
    }
  }
  .animate-small {
    .animate-ropes {
      animation-name: perspective-ropes-small;
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
    }
  }
}
</style>