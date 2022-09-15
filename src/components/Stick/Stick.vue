<template>
  <div
    @click="activateStick"
    ref="stick"
    :style="`top: ${top}; left: ${left}; transition: ${transition}s`"
    :class="`stick cursor ${isReady && 'active'}`"
  ></div>
</template>

<script>
export default {
  props: {
    offset: Number,
    gongTop: Number,
    gongRight: Number,
    gongBottom: Number,
    gongLeft: Number,
    rightOffset: Number,
    bodyPosition: Object,
  },
  data() {
    return {
      top: "auto",
      left: "auto",
      height: 0,
      width: 0,
      transition: 0,
      transitionDuration: 0.3,
    };
  },
  computed: {
    isReady() {
      return this.$store.state.isReady;
    },
  },
  watch: {
    isReady(status) {
      if (!status) {
        this.setAnimationTransition();
        document.removeEventListener("mousemove", this.moveHandler);
        this.top = "auto";
        this.left = "auto";
      } else {
        document.addEventListener("mousemove", this.moveHandler);
      }
    },
  },
  mounted() {
    this.height = this.$refs.stick.offsetHeight;
    this.width = this.$refs.stick.offsetWidth;
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape") {
        this.$store.commit("prepare", false);
      }
    });
  },
  methods: {
    setAnimationTransition() {
      this.transition = this.transitionDuration;

      setTimeout(() => {
        this.transition = 0;
      }, this.transitionDuration * 100);
    },
    activateStick() {
      this.setAnimationTransition();
      this.$store.commit("prepare", true);
    },

    moveHandler(e) {
      this.top = `${e.pageY - this.gongTop}px`;
      this.left = `${e.pageX - this.rightOffset}px`;
      if (
        e.pageY < this.bodyPosition.top + this.offset * 2 ||
        e.pageY > this.bodyPosition.bottom - this.offset * 2
      ) {
        this.$store.commit("prepare", false);
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
    z-index: 0;
  }
}
</style>