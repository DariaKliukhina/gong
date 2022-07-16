<template>
  <audio @ended="$emit('end')" ref="audio" controls class="hide">
    <source :src="source" type="audio/mpeg" />
    Your browser does not support the audio tag.
  </audio>
</template>

<script>
export default {
  props: {
    source: String,
  },
  data() {
    return {
      sound: './sounds/click.wav', //url for placeholder image
      loading: true,
    };
  },
  mounted: function () {
    if (this.source) {
      //is it empty
      this.sound = this.source; //replace placeholder
    }
    this.loading = false;
  },
};
</script>

<style>
</style>