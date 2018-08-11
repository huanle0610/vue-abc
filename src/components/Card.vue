<template>
  <img
    height="155px"
    :src="`static/cards/${display ? card : 'back'}.svg`"
    @click="inverse"
  >
</template>
<script>
export default {
  name: 'Card',
  props: {
    card: {
      type: String,
      default: 'back',
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      display: this.show,
    };
  },
  methods: {
    inverse() {
      this.display = !this.display;
    },
  },
};
</script>
