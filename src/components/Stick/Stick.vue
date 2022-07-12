<template>
  <div
    @click="takeStick"
    ref="stick"
    :style="`top: ${top}; left: ${left};`"
    :class="`stick cursor ${isActive && 'active'}`"
  ></div>
</template>

<script>
export default {
  props: {
    gongTop: Number,
    gongRight: Number,
  },
  data() {
    return {
      isActive: false,
      bodyRight: 0,
      top: "auto",
      left: "auto",
      height: 0,
      width: 0,
    };
  },
  computed: {
    rightOffset() {
      return this.bodyRight - this.gongRight;
    },
  },
  mounted() {
    this.setSizes();
    window.addEventListener("resize", this.setSizes);
  },
  methods: {
    takeStick() {
      this.isActive = true;
      document.addEventListener("mousemove", (e) => {
        this.top = `${e.pageY - this.gongTop}px`;
        this.left = `${e.pageX - this.rightOffset}px`;
      });
    },
    setSizes() {
      const { right } = document.body.getBoundingClientRect();
      this.bodyRight = right;

      this.height = this.$refs.stick.offsetHeight;
      this.width = this.$refs.stick.offsetWidth;
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
  // transition: .3s;

  &.active {
    transform: rotate(-55deg);
    cursor: none;
    pointer-events: none;
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #6e5c4f;
    transform: perspective(9px) rotateX(-1deg);
    z-index: 0;
  }

  &::after {
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    left: -8px;
    top: -12%;
    background-color: #f7d4a5;
    border-radius: 8px;
    z-index: 1;
  }
}
</style>