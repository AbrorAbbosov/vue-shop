<template>
  <div :class="['base__card', isFullWidth && 'base__card_full-width']">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  isFullWidth: {
    type: Boolean,
    required: false,
  },
});
</script>

<style scoped>
.base__card {
  display: inline-block;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  background: hsl(240, 2%, 12%);
  height: v-bind(elHeight + "px");
  transition: "all 3s ease-in-out";
}

.base__card_full-width {
  width: 100%;
}
</style>
