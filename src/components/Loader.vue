<template>
  <div class="loader">
    grabbing{{'.'.repeat(level)}}
  </div>
</template>

<script>
const MAX_LOADING_LEVEL = 3;

export default {
  name: 'Loader',
  mounted() {
    setInterval(this.load, 500);
  },
  destroyed() {
    clearInterval(this.load);
  },
  methods: {
    load() {
      if (this.level === MAX_LOADING_LEVEL) {
        this.level = 0;
      } else {
        this.level = this.level + 1;
      }
    },
  },
  data() {
    return {
      level: 1,
    };
  },
};
</script>

<style>
  .loader {
    text-align: center;
    color: #2196f3;
  }
</style>
