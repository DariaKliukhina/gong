<template>
  <div :class="isReady && 'ready'">
    <div class="main-container">
      <Legs @activate="setReady">
        <Gong v-memo :isReady="isReady" />
      </Legs>
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
      isReady: false,
    };
  },
  methods: {
    setReady(status) {
      this.isReady = status;
    },
  },
};
</script>

<style lang="scss" scoped>
.ready {
  cursor: none;
  * {
    cursor: none;
  }
}
.main-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  height: 100vh;
  min-height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>