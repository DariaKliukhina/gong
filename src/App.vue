<template>
  <div class="main-container">
    <Legs>
      <Gong />
    </Legs>
  </div>
</template>

<script>
import Gong from "./components/Gong/Gong.vue";
import Legs from "./components/Legs/Legs.vue";
export default {
  components: { Legs, Gong },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
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