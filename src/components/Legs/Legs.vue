<template>
  <section ref="wrapper" class="gong">
    <div class="gong__leg"></div>
    <div class="gong__leg"></div>
    <div class="gong__beam"></div>
    <div class="gong__beam gong__beam--small"></div>
    <Gong :isDesktop="isDesktop" />
    <Stick
      v-if="isDesktop"
      :offset="offset"
      :gongTop="gongTop"
      :gongRight="gongRight"
      :gongBottom="gongBottom"
      :gongLeft="gongLeft"
      :rightOffset="rightOffset"
      :bodyPosition="bodyPosition"
    />
  </section>
</template>

<script>
import { debounce } from "throttle-debounce";
import Gong from "../Gong/Gong.vue";
import Stick from "../Stick/Stick.vue";
export default {
  components: { Stick, Gong },
  props: {
    offset: Number,
  },
  data() {
    return {
      gongTop: 0,
      gongRight: 0,
      gongBottom: 0,
      gongLeft: 0,
      bodyPosition: {},
    };
  },
  mounted() {
    this.setSizes();
    window.addEventListener(
      "resize",
      debounce(50, () => {
        this.resize();
      })
    );
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize, false);
  },
  computed: {
    isDesktop() {
      return this.$store.getters.isDesktopMq;
    },
    rightOffset() {
      return this.bodyPosition.right - this.gongRight;
    },
  },
  methods: {
    resize() {
      this.setSizes();
    },
    setSizes() {
      const { top, right, bottom, left } =
        this.$refs.wrapper.getBoundingClientRect();
      this.gongTop = top;
      this.gongRight = right;
      this.gongBottom = bottom;
      this.gongLeft = left;

      const bodyPosition = document.body.getBoundingClientRect();
      this.bodyPosition = bodyPosition;
    },
  },
};
</script>

<style lang="scss" scoped>
.gong {
  max-height: 800px;
  min-height: 400px;
  width: 100%;
  max-width: 700px;
  aspect-ratio: 1/1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-top: 40px;

  &__leg {
    width: $leg-width;
    height: 100%;
    background-color: $leg-color;
    position: absolute;
    top: 0;
    left: 40px;

    @media #{$min-width-desktop} {
      width: $leg-width-desktop;
    }
  }

  &__leg::before {
    content: "";
    position: absolute;
    height: 100%;
    width: $shadow-width;
    top: 0;
    right: 0;
    background-color: $leg-shadow;
  }

  &__leg::after {
    content: "";
    position: absolute;
    height: $leg-width;
    width: 80px;
    background-color: $leg-shadow;
    bottom: 0;
    margin-top: 100%;
    right: 0;

    @media #{$min-width-desktop} {
      height: $leg-width-desktop;
    }
  }

  &__leg:nth-child(2) {
    left: auto;
    right: 40px;
  }

  &__leg:nth-child(2)::before {
    left: 0;
    right: auto;
  }

  &__leg:nth-child(2)::after {
    left: 0;
    right: auto;
  }

  &__beam {
    width: 100%;
    height: $leg-width;
    background-color: $leg-color;
    margin-bottom: 14px;
    margin-left: 50%;
    transform: translateX(-50%);

    @media #{$min-width-desktop} {
      height: $leg-width-desktop;
    }
  }

  &__beam::after {
    content: "";
    width: 100%;
    height: $shadow-width;
    background-color: $leg-shadow;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  &__beam--small {
    width: calc(100% - 20px);
    margin-bottom: 0;
  }

  &__body {
    position: relative;
    flex-grow: 1;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

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
        bottom: 10%;
      }
    }

    &::before {
      left: 5%;

      @media #{$min-width-tablet} {
        left: 12%;
      }
    }

    &::after {
      right: 5%;

      @media #{$min-width-tablet} {
        right: 12%;
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
</style>