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
import Gong from "./components/Gong/Gong.vue";
import Legs from "./components/Legs/Legs.vue";
export default {
  components: { Legs, Gong },
  data() {
    return {
      offset: 40,
    };
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
  },
};
</script>

<style lang="scss" scoped>
.root {
  height: 100vh;
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
  left: 0
}
</style>