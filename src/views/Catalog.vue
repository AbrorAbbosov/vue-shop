<template>
  <div class="catalog">
    <div class="catalog__header">
      <div class="catalog__header-container">
        <BaseHeading variant="h2" class="h2">Catalog</BaseHeading>
        <div class="nav__content-search">
          <input
            class="search__input"
            type="search"
            name="search"
            placeholder="Qidirish..."
            v-model="searchQuery"
          />
          <font-awesome-icon
            icon="magnifying-glass"
            class="nav__content-search-icon"
          />
        </div>

        <CategoryTabs
          :items="allCategories"
          @onCategoryClick="setActiveCategory"
          v-if="isProducts"
        />
        <Search />
      </div>
      <BaseDivider />
    </div>

    <FadeTransition>
      <FailedHttpRequest
        :errorCode="error.errorCode"
        :errorMessage="error.message"
        :timeout="error.timeout"
        :serverIsDown="serverStatus.isDown"
        :serverErrorMessage="serverStatus.message"
        v-if="error?.isError && !isLoading"
      />
    </FadeTransition>

    <div class="catalog__loader">
      <FadeTransition>
        <Loader v-if="isLoading" />
      </FadeTransition>
    </div>

    <ProductList :products="filteredProductList" />
  </div>
</template>

<script setup>
import BaseHeading from "../components/BaseHeading.vue";
import CategoryTabs from "../components/CategoryTabs.vue";
import ProductList from "../views/ProductList.vue";
import FailedHttpRequest from "../components/FailedHttpRequest.vue";
import Loader from "../components/Loader.vue";
import FadeTransition from "../components/FadeTransition.vue";
import BaseDivider from "../components/BaseDivider.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useProductStore } from "../stores/useProductStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const {
  products,
  isProducts,
  allCategories,
  isLoading,
  error,
  serverStatus,
  searchQuery,
} = storeToRefs(productStore);

const activeCategory = ref("all");

const setActiveCategory = (selectedCategory) => {
  activeCategory.value = selectedCategory;
};

const productList = computed(() => {
  if (activeCategory.value === "all") return productStore.filteredProducts;
  return productStore.filteredProducts.filter(
    (product) => product.category === activeCategory.value
  );
});

const filteredProductList = computed(() => productList.value);
</script>

<style scoped>
.catalog {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 0;
}

.catalog__header {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0;
}

.catalog__header-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.catalog__loader {
  position: relative;
}

.h2 {
  color: whitesmoke;
}

.search__input {
  width: 40vh;
  height: 30px;
  border-radius: 10px;
  padding: 5px;
  outline: none;
}

@media screen and (min-width: 1024px) {
  .catalog__header-container {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
