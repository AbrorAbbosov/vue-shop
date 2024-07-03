<template>
  <header class="header">
    <router-link
      to="/"
      :class="[
        'header__logo',
        isHomepage ? 'header__logo-disabled' : 'header__logo_active',
      ]"
      disabled="true"
    >
      <h2 class="header__logo">AAA.SHOP</h2>
    </router-link>

    <ul class="header_favorit">
      <li>
        <BaseButtonWithBadge :quantity="totalLikes" @click="openModal('likes')">
          <LikeIcon />
        </BaseButtonWithBadge>
      </li>

      <li>
        <BaseButtonWithBadge
          :quantity="totalProductsAddedToCart"
          @click="openModal('cart')"
        >
          <CartIcon />
        </BaseButtonWithBadge>
      </li>
    </ul>
  </header>
</template>

<script setup>
import { useCartStore } from "../stores/useCartStore";
import { useCommonStore } from "../stores/useCommonStore";
import { useLikeStore } from "../stores/useLikeStore";
import { computed } from "@vue/runtime-core";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import CartIcon from "../components/CartIcon.vue";
import LikeIcon from "../components/LikeIcon.vue";
import BaseButtonWithBadge from "../components/BaseButtonWithBadge.vue";

const route = useRoute();

const cartStore = useCartStore();
const likeStore = useLikeStore();
const commonStore = useCommonStore();

const { totalProductsAddedToCart } = storeToRefs(cartStore);
const { totalLikes } = storeToRefs(likeStore);

const isHomepage = computed(() => route.fullPath === "/");

const openModal = (modal) => {
  commonStore.openModal(modal);
};
</script>

<style scoped>
.header {
  display: grid;
  align-items: center;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 0 10px;
  background: hsl(0, 0%, 7%);
  opacity: 1;
}

.header__logo {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 60px;
  justify-self: start;
  color: whitesmoke;
  text-decoration: none;
  cursor: pointer;
  margin-left: 10px;
}

.header_favorit {
  display: flex;
  gap: 20px;
  justify-self: end;
  margin-right: 20px;
  list-style: none;
  padding: 0;
}

.header__logo-disabled {
  pointer-events: none;
}

.header__logo:hover {
  opacity: 0.6;
  transition: opacity 0.3s ease-in;
}

@media screen and (min-width: 768px) {
  .header {
    padding: 0;
  }

  .header__logo {
    width: 160px;
  }

  ul {
    gap: 25px;
  }
}
</style>
