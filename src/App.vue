<template>
  <div :class="`${isReady && 'ready'} root`" :style="`padding: ${offset}px 0`">
    <div class="wrapper">
      <div class="backdrop" @click="deactivate"></div>
      <div class="main-container">
        <Legs :offset="offset" />
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "throttle-debounce";
import Gong from "./components/Gong/Gong.vue";
import Legs from "./components/Legs/Legs.vue";
export default {
  components: { Legs, Gong },
  data() {
    return {
      offset: 20,
    };
  },
  mounted() {
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
    isReady() {
      return this.$store.state.isReady;
    },
  },
  methods: {
    deactivate() {
      this.$store.commit("prepare", false);
    },
    resize() {
      this.$store.dispatch("update", window.innerWidth);
    },
  },
};
</script>

<style lang="scss" scoped>
.root {
  height: 100vh;

  &::before,
  &::after {
    content: "";
    width: 20px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #ab86d5;
    opacity: 0.5;
    z-index: 1;
    display: none;

    @media #{$min-width-desktop} {
      display: block;
    }
  }

  &::after {
    left: auto;
    right: 0;
  }

  @media #{$max-width-desktop} {
    padding: 0 !important;
  }
}
.ready {
  cursor: none;
  * {
    cursor: none;
  }
}
.wrapper {
  background-color: $main-bg;
  height: 100%;
  position: relative;
}
.main-container {
  width: 100%;
  height: 100%;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>