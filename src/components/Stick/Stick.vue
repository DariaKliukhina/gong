<template>
  <div
    @click="takeStick"
    ref="stick"
    :style="`top: ${top}; left: ${left}; transition: ${transition}s`"
    :class="`stick cursor ${isReady && 'active'}`"
  ></div>
</template>

<script>
export default {
  props: {
    gongTop: Number,
    gongRight: Number,
    gongBottom: Number,
    gongLeft: Number,
    rightOffset: Number,
  },
  data() {
    return {
      isReady: false,
      top: "auto",
      left: "auto",
      height: 0,
      width: 0,
      offset: 100,
      transition: 0,
      transitionDuration: 0.3,
    };
  },

  watch: {
    isReady(status) {
      this.$emit("activate", status);
      if (!status) {
        document.removeEventListener("mousemove", this.moveHandler);
        this.top = "auto";
        this.left = "auto";
      }
    },
  },
  mounted() {
    this.height = this.$refs.stick.offsetHeight;
    this.width = this.$refs.stick.offsetWidth;
  },
  methods: {
    setAnimationTransition() {
      this.transition = this.transitionDuration;

      setTimeout(() => {
        this.transition = 0;
      }, this.transitionDuration * 100);
    },
    takeStick() {
      this.setAnimationTransition();

      this.isReady = true;
      document.addEventListener("mousemove", this.moveHandler);
    },
    moveHandler(e) {
      this.top = `${e.pageY - this.gongTop}px`;
      this.left = `${e.pageX - this.rightOffset}px`;

      if (
        e.pageY - this.offset / 2 > this.gongBottom ||
        e.pageY + this.offset / 2 < this.gongTop
        //  ||
        // e.pageX + this.offset < this.gongLeft ||
        // e.pageX + this.offset > this.gongRight
      ) {
        this.setAnimationTransition();
        this.isReady = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.stick {
  position: absolute;
  width: 24px;
  height: 180px;
  bottom: 58px;
  right: -10px;
  transform-origin: top center;
  transform: translateY(100%) rotate(170deg);
  cursor: pointer;
  z-index: 10;
  // transition: .3s;

  &.active {
    transform: rotate(-55deg);
    cursor: none;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    left: -8px;
    top: -12%;
    background-color: #f7d4a5;
    transform: perspective(9px) rotateX(-1deg);
    border-radius: 8px;
    z-index: 4;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #6e5c4f;
    // transform: perspective(9px) rotateX(-1deg);
    z-index: 0;
  }
}
</style>