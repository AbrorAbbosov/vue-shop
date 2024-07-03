<template>
  <div class="quantity">
    <BaseIconButton
      @click="emit('decrement')"
      :isDisabled="isButtonDisabled"
      variant="outlined"
      class="minus"
    >
      <MinusIcon />
    </BaseIconButton>

    <span class="quantity__count">{{ quantity }}</span>

    <BaseIconButton @click="emit('increment')" variant="outlined" class="plus">
      <PlusIcon />
    </BaseIconButton>
  </div>
</template>

<script setup>
import PlusIcon from "../components/PlusIcon.vue";
import MinusIcon from "../components/MinusIcon.vue";
import BaseIconButton from "../components/BaseIconButton.vue";
import { computed } from "@vue/runtime-core";

const emit = defineEmits(["increment", "decrement"]);
const props = defineProps({
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
});

const isButtonDisabled = computed(() => props.quantity <= 1);
</script>

<style scoped>
.quantity {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
.quantity__count {
  font-family: Arial, Helvetica, sans-serif;
  color: whitesmoke;
}
.plus {
  color: black;
  background: whitesmoke;
}
.minus {
  background: whitesmoke;
}
</style>
