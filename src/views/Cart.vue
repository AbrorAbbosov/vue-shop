<template>
  <section class="cart">
    <div class="cart__mobile">
      <div class="cart__grid">
        <label class="cart__title">Photo</label>
        <label class="cart__title">Title</label>
        <label class="cart__title">Quantity</label>
        <label class="cart__title">Price</label>
        <label class="cart__title">Subtotal</label>
      </div>
    </div>

    <ul class="cart__list">
      <li class="cart__grid" v-for="product in cart" :key="product.id">
        <img
          :src="product.image"
          class="cart__img"
          :alt="product.title"
          @click="goToProductPage(product.id)"
        />
        <p
          class="cart__item-title cart__item-text"
          @click="goToProductPage(product.id)"
        >
          {{ product.title }}
        </p>

        <div class="cart__mobile">
          <span>Quantity:</span>
          <QuantityBlock
            :quantity="product.quantity"
            @increment="incrementQuantity(product.id)"
            @decrement="decrementQuantity(product.id)"
          ></QuantityBlock>
        </div>

        <div class="cart__mobile">
          <span>Price:</span>
          <p class="cart__item-text">${{ product.price }}</p>
        </div>

        <div class="cart__mobile">
          <span>Subtotal:</span>
          <p class="cart__item-text">
            ${{ (product.price * product.quantity).toFixed(2) }}
          </p>
        </div>

        <div class="cart__mobile-action">
          <BaseIconButton
            @click="removeProductFromCart(product.id)"
            variant="contained"
            iconHoverColor="#ef2525"
            iconColor="#74747474"
            opacity="1"
          >
            <DeleteIcon />
          </BaseIconButton>
        </div>
      </li>
    </ul>

    <div class="cart__totals-block">
      <span class="cart__totals-block-title">Total quantity:</span>
      <p class="block-text">{{ totalProductsAddedToCart }} pcs</p>
    </div>
    <div class="cart__totals-block">
      <span class="cart__totals-block-title">Total amount: </span>
      <p class="block-text">${{ totalAmount }}</p>
    </div>
  </section>
</template>

<script setup>
import DeleteIcon from "../components/DeleteIcon.vue";
import BaseIconButton from "../components/BaseIconButton.vue";
import QuantityBlock from "../components/QuantityBlock.vue";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/useCartStore";
import { storeToRefs } from "pinia";
const props = defineProps({
  // products: {
  //   type: Array,
  //   required: true,
  // },
  // delivery: {
  //   type: Object,
  //   required: false,
  // },
  // totalProductsAddedToCart: {
  //   type: Number,
  //   required: true,
  // },
  // totalAmount: {
  //   type: Number,
  //   required: true,
  // },
});

const emit = defineEmits(["onClick"]);

const router = useRouter();
const cartStore = useCartStore();
const { cart, totalProductsAddedToCart, totalAmount } = storeToRefs(cartStore);

const incrementQuantity = (id) => {
  cartStore.incrementQuantity(id);
};

const decrementQuantity = (id) => {
  cartStore.decrementQuantity(id);
};

const removeProductFromCart = (id) => {
  cartStore.removeProductFromCart(id);
};

const goToProductPage = (id) => {
  router.push(`/product/${id}`);
  emit("onClick", "cart");
};
</script>

<style scoped>
.cart {
  display: grid;
  background: hsl(240, 2%, 12%);
}

.cart__title {
  display: none;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  color: whitesmoke;
}

.cart__grid {
  display: grid;
  gap: 15px;
  border-bottom: 1px solid rgb(211, 211, 211);
}

.cart__mobile {
  display: flex;
  gap: 20px;
  align-items: center;
}

.cart__mobile-action {
  justify-self: start;
  padding: 0 0 10px;
}

.cart__mobile > span {
  font-weight: 600;
}

.cart__list {
  display: grid;
  gap: 20px;
  padding: 0;
  list-style: none;
}
.block-text {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  color: whitesmoke;
}
.cart__img {
  display: none;
}

.cart__item-title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 15px;
  cursor: pointer;
  justify-self: start;
  text-align: left;
  color: whitesmoke;
}

.cart__item-title:hover {
  transition: color 0.1s linear;
  color: #5aed39;
}

.cart__item-text {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: whitesmoke;
}

.cart__totals-block {
  display: flex;
  gap: 20px;
  justify-content: flex-end;
  align-items: center;
  padding: 15px 0 0;
}

.cart__actions {
  display: flex;
  justify-content: flex-end;
  gap: 20px;
}

.cart__totals-block-title {
  font-family: Arial, Helvetica, sans-serif;
  display: block;
  font-weight: 600;
  color: whitesmoke;
}

@media screen and (min-width: 768px) {
  .cart {
    display: block;
  }
  .cart__grid {
    max-width: 900px;
    margin: auto;
    align-items: center;
    justify-items: center;
    grid-template-columns: 1fr 4fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    color: #222;
    padding: 15px 0;
    border-bottom: 1px solid lightgray;
  }

  .cart__title {
    display: block;
    font-weight: 600;
  }

  .cart__img {
    cursor: pointer;
    display: block;
    width: 100%;
    height: 40px;
    object-fit: contain;
  }

  .cart__img:hover {
    opacity: 0.7;
    transition: opacity 0.2s linear;
  }

  .cart__mobile {
    display: contents;
  }

  .cart__mobile > span {
    display: none;
  }

  .cart__mobile-action {
    justify-self: center;
    padding: 0;
  }

  .cart__totals-block {
    padding: 15px 20px 0 0;
  }
}
</style>
