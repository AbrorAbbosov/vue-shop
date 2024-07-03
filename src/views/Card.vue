<template>
  <div class="card">
    <BaseCard :isFullWidth="true">
      <div class="card__container">
        <div class="card__image-container">
          <img
            :src="image"
            class="card__image"
            :alt="title"
            @click="goToPage(id)"
          />

          <div class="card__like-btn">
            <BaseIconButton
              @click="like"
              variant="contained"
              iconColor="lightgray"
              iconHoverColor="#ef2525"
              iconActiveColor="#ef2525"
              :isActive="isProductLiked"
              opacity="0.5"
            >
              <LikeIcon />
            </BaseIconButton>
          </div>
        </div>

        <BaseHeading variant="h4" class="card__title" @click="goToPage(id)">{{
          title
        }}</BaseHeading>

        <div class="card__rating">
          <img src="../assets/star-icon.svg" />
          <p class="card__rating-text">{{ rating.rate }}</p>
        </div>

        <h3 class="card__price">${{ price }}</h3>

        <div class="card__actions" v-if="!isProductInCart">
          <QuantityBlock
            @decrement="decrementQuantity"
            @increment="incrementQuantity"
            :quantity="quantity"
          />
          <BaseIconButton
            variant="contained"
            text="Add to cart"
            iconColor="lightgray"
            iconHoverColor="#ffa801"
            @click="addToCart"
          >
            <CartIcon />
          </BaseIconButton>
        </div>

        <FadeTransition>
          <BaseButton
            @click="openModal('cart')"
            variant="contained"
            mode="success"
            class="Alrea"
            v-if="isProductInCart"
            >Already is in your Cart</BaseButton
          >
        </FadeTransition>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import LikeIcon from "../components/LikeIcon.vue";
import CartIcon from "../components/CartIcon.vue";
import BaseCard from "../components/BaseCard.vue";
import QuantityBlock from "../components/QuantityBlock.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseIconButton from "../components/BaseIconButton.vue";
import FadeTransition from "../components/FadeTransition.vue";
import BaseHeading from "../components/BaseHeading.vue";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import { useCartStore } from "../stores/useCartStore";
import { useLikeStore } from "../stores/useLikeStore";
import { useCommonStore } from "../stores/useCommonStore";
import { useQuantity } from "../stores/quantity";

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: [Object, Number],
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const [quantity, incrementQuantity, decrementQuantity] = useQuantity();
const cartStore = useCartStore();
const likesStore = useLikeStore();
const commonStore = useCommonStore();
const router = useRouter();

const product = computed(() => {
  return {
    id: props.id,
    title: props.title,
    price: props.price,
    image: props.image,
    quantity,
    rating: props.rating,
  };
});

const isProductInCart = computed(
  () => cartStore.productInCart(props.id) !== undefined
);

const isProductLiked = computed(
  () => likesStore.likedProduct(props.id) !== undefined
);

const openModal = (modal) => {
  commonStore.openModal(modal);
};

const goToPage = (id) => {
  router.push(`product/${id}`);
};

const like = () => {
  likesStore.handleLikes(product.value);
};

const addToCart = () => {
  cartStore.setProductToCart(product.value);
  openModal("cart");
};
</script>

<style scoped>
.card__container {
  display: flex;
  gap: 12px;
  flex-direction: column;
  align-items: flex-start;
  height: 560px;
}
.card__image-container {
  align-self: center;
  position: relative;
  width: 266px;
}

.card__image {
  display: block;
  width: 100%;
  height: 235px;
  object-fit: contain;
  cursor: pointer;
}

.card__title {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  min-height: 43px;
  cursor: pointer;
  color: whitesmoke;
}

.card__like-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}

.card__rating {
  display: flex;
  gap: 5px;
  align-items: baseline;
}

.card__rating-text {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  color: whitesmoke;
}

.card__price {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  color: whitesmoke;
}

.card__actions {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

@media screen and (min-width: 768px) {
  .card__title:hover {
    transition: color 0.1s linear;
    color: #2bff01;
  }

  .card__actions {
    gap: 47px;
  }
}
</style>
