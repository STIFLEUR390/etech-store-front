<template>
  <div :class="cardClass">
    <div class="relative flex-shrink-0">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-48 object-cover rounded-t-lg md:rounded-lg"
      />
      <div v-if="product.isPromo" class="absolute top-3 right-0">
        <span class="inline-block promo-badge">PROMO</span>
      </div>
      <div v-else-if="product.isNew" class="absolute top-3 right-0">
        <span class="inline-block new-badge">NOUVEAU</span>
      </div>
      <!-- Wishlist bouton -->
      <button
        @click.stop="toggleWishlist"
        :aria-label="
          isWished ? 'Retirer de la liste de souhaits' : 'Ajouter à la liste de souhaits'
        "
        class="absolute top-3 left-3 bg-white bg-opacity-80 rounded-full p-2 shadow hover:bg-opacity-100 transition"
      >
        <i :class="['fas', isWished ? 'fa-heart text-[#F4A300]' : 'fa-heart text-gray-300']"></i>
      </button>
    </div>
    <div class="p-4 flex flex-col flex-1 justify-between">
      <div>
        <h3 class="font-semibold text-gray-800 mb-1 text-base md:text-lg">{{ product.name }}</h3>
        <slot v-if="list" name="description" :product="product" />
        <div class="flex items-center mb-2">
          <div class="flex text-yellow-400">
            <i v-for="i in Math.floor(product.rating)" :key="'star' + i" class="fas fa-star"></i>
            <i v-if="product.rating % 1 >= 0.5" class="fas fa-star-half-alt"></i>
            <i
              v-for="i in 5 - Math.ceil(product.rating)"
              :key="'empty' + i"
              class="far fa-star text-gray-300"
            ></i>
          </div>
          <span class="text-gray-500 text-xs ml-2">({{ product.reviews }})</span>
        </div>
      </div>
      <div class="flex items-center justify-between mt-2">
        <div>
          <span class="text-lg font-bold text-blue-600"
            >{{ product.price.toLocaleString() }} XAF</span
          >
          <span v-if="product.oldPrice" class="text-sm text-gray-500 line-through ml-1"
            >{{ product.oldPrice.toLocaleString() }} XAF</span
          >
        </div>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-9 h-9 flex items-center justify-center transition"
        >
          <i class="fas fa-shopping-cart text-base"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
const props = defineProps({
  product: { type: Object, required: true },
  list: { type: Boolean, default: false },
})

const emit = defineEmits(['toggle-wishlist'])
const isWished = ref(false)
function toggleWishlist() {
  isWished.value = !isWished.value
  emit('toggle-wishlist', { product: props.product, wished: isWished.value })
}

const cardClass = computed(() =>
  props.list
    ? 'product-card flex flex-row bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 min-h-[180px]'
    : 'product-card bg-white rounded-lg shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 flex flex-col'
)
</script>

<style scoped>
.promo-badge {
  background-color: #f4a300;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 18px;
  border-radius: 0 0 0 12px;
  position: relative;
  right: -1px;
  top: 0;
  transform: rotate(15deg);
  box-shadow: 0 2px 8px rgba(244, 163, 0, 0.12);
}
.new-badge {
  background-color: #009966;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 3px 18px;
  border-radius: 0 0 0 12px;
  position: relative;
  right: -1px;
  top: 0;
  transform: rotate(15deg);
  box-shadow: 0 2px 8px rgba(0, 153, 102, 0.12);
}
</style>
