<template>
  <div class="checkout">
    <BaseHeading variant="h1">Checkout</BaseHeading>

    <BasePlaceholder v-if="!isProductsInCart"
      >Cart is empty. Nothing to render</BasePlaceholder
    >

    <div class="checkout__content" v-if="isProductsInCart">
      <BaseCard>
        <Cart :delivery="delivery" />
      </BaseCard>

      <CheckoutForm
        :delivery="delivery"
        :location="confirmedLocation"
        v-if="delivery"
      ></CheckoutForm>
    </div>
  </div>
</template>

<script setup>
import Cart from "../views/Cart.vue";
import BaseCard from "../components/BaseCard.vue";
import { getLocationData } from "../stores/geoCoding";
import BasePlaceholder from "../components/BasePlaceholder.vue";
import BaseHeading from "../components/BaseHeading.vue";
import FadeTransition from "../components/FadeTransition.vue";
import { reactive, ref } from "@vue/reactivity";
import { watch } from "@vue/runtime-core";
import { useCartStore } from "../stores/useCartStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { isProductsInCart } = storeToRefs(cartStore);

const location = ref(null);
const delivery = reactive({});
const confirmedLocation = ref(null);
const isGeoApiLocationAllowed = ref(false);

const setDeliveryOption = async (deliveryOption) => {
  Object.assign(delivery, deliveryOption);
  if (deliveryOption.type === "delivery") {
    location.value = "";
    await getLocation();
  }
};

const getLocation = async () => {
  try {
    const { countryName, city } = await getLocationData();

    isGeoApiLocationAllowed.value = true;
    location.value = `${city}, ${countryName}`;
  } catch (error) {
    console.log(error);
  }
};

const confirmLocation = async (isConfirmed) => {
  if (!isConfirmed) {
    confirmedLocation.value = "";
    return;
  }

  confirmedLocation.value = location.value;
};

watch(delivery, () => {
  confirmedLocation.value = null;
});
</script>

<style scoped>
.checkout {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 934px;
  gap: 40px;
}

.checkout__content {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
