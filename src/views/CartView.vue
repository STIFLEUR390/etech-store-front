<template>
  <div class="bg-gray-50 min-h-screen py-6 sm:py-10">
    <div class="container mx-auto px-2 sm:px-4 flex flex-col lg:flex-row gap-6 lg:gap-8">
      <!-- Section principale : Liste des articles -->
      <div class="flex-1">
        <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Votre panier ({{ cart.itemCount }} articles)
          </h1>
          <div v-if="cart.items.length" class="space-y-4">
            <div
              v-for="item in cart.items"
              :key="item.id"
              class="flex flex-col sm:flex-row items-center gap-4 border-b pb-4 last:border-b-0"
            >
              <img
                :src="item.image"
                :alt="item.name"
                class="w-20 h-20 object-cover rounded-lg border"
              />
              <div class="flex-1 w-full sm:w-auto text-center sm:text-left">
                <div class="font-semibold text-gray-800">{{ item.name }}</div>
                <div class="text-sm text-gray-500 mt-1">
                  Prix unitaire :
                  <span class="font-medium text-gray-700"
                    >{{ item.price.toLocaleString() }} XAF</span
                  >
                </div>
                <div class="flex items-center justify-center sm:justify-start mt-2 gap-2">
                  <button
                    @click="updateQty(item, item.quantity - 1)"
                    :disabled="item.quantity === 1"
                    class="px-2 py-1 rounded bg-gray-100 text-lg font-bold disabled:opacity-50"
                  >
                    -
                  </button>
                  <span class="px-3">{{ item.quantity }}</span>
                  <button
                    @click="updateQty(item, item.quantity + 1)"
                    class="px-2 py-1 rounded bg-gray-100 text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div class="text-right min-w-[100px]">
                <div class="font-semibold text-gray-800">
                  {{ (item.price * item.quantity).toLocaleString() }} XAF
                </div>
                <button @click="remove(item.id)" class="text-gray-400 hover:text-red-500 mt-2">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500 py-12 text-base sm:text-lg">
            Votre panier est vide.
          </div>
        </div>
      </div>
      <!-- Sidebar : Récapitulatif -->
      <div class="w-full lg:w-1/3">
        <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-8">
          <h2 class="text-lg sm:text-xl font-bold text-gray-900 mb-4">Récapitulatif</h2>
          <div class="space-y-2 mb-4">
            <div class="flex justify-between text-gray-600 text-sm sm:text-base">
              <span>Sous-total</span>
              <span>{{ cart.subtotal.toLocaleString() }} XAF</span>
            </div>
            <div class="flex justify-between text-gray-600 text-sm sm:text-base">
              <span>TVA (19,25%)</span>
              <span>{{ cart.vat.toLocaleString() }} XAF</span>
            </div>
            <div class="flex justify-between text-gray-600 text-sm sm:text-base">
              <span>Frais de livraison</span>
              <span>{{ cart.items.length ? cart.deliveryFee.toLocaleString() : 0 }} XAF</span>
            </div>
            <div
              v-if="cart.promoDiscount"
              class="flex justify-between text-green-600 font-semibold text-sm sm:text-base"
            >
              <span>Remise promo</span>
              <span>-{{ cart.promoDiscount.toLocaleString() }} XAF</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-gray-900 border-t pt-3 mt-3">
              <span>Total</span>
              <span>{{ cart.total.toLocaleString() }} XAF</span>
            </div>
          </div>
          <!-- Code promo -->
          <div class="mb-4">
            <label for="promo" class="block text-sm font-medium text-gray-700 mb-1"
              >Code promo</label
            >
            <div class="flex flex-wrap gap-2">
              <input
                id="promo"
                v-model="promoInput"
                @input="validatePromo"
                type="text"
                placeholder="Entrez le code"
                class="flex-1 min-w-0 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                :class="{ 'border-green-500': cart.promoValid, 'border-red-500': cart.promoError }"
              />
              <button
                @click="applyPromo"
                class="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto sm:shrink-0"
              >
                Appliquer
              </button>
            </div>
            <div v-if="cart.promoValid" class="text-green-600 text-sm mt-1 flex items-center">
              <i class="fas fa-check-circle mr-1"></i> Code promo appliqué !
            </div>
            <div v-if="cart.promoError" class="text-red-500 text-sm mt-1 flex items-center">
              <i class="fas fa-times-circle mr-1"></i> {{ cart.promoError }}
            </div>
          </div>
          <!-- Options de livraison -->
          <div class="mb-4">
            <div class="text-sm font-medium text-gray-700 mb-2">Options de livraison</div>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="home"
                  v-model="cart.delivery"
                  @change="setDelivery('home')"
                  class="accent-primary"
                />
                <span>Livraison à domicile</span>
              </label>
              <div v-if="cart.delivery === 'home'" class="text-xs text-gray-500 ml-6">
                Livraison estimée : 2-3 jours ouvrés
              </div>
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="pickup"
                  v-model="cart.delivery"
                  @change="setDelivery('pickup')"
                  class="accent-primary"
                />
                <span>Retrait en boutique</span>
              </label>
              <div v-if="cart.delivery === 'pickup'" class="text-xs text-gray-500 ml-6">
                Prêt sous 1h en magasin
              </div>
            </div>
          </div>
          <!-- CTA -->
          <RouterLink
            to="/checkout"
            class="w-full block mt-3 bg-[#0071BC] text-white py-3 rounded-lg font-semibold text-lg text-center hover:bg-[#005fa3] transition shadow"
          >
            Passer à la commande
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { RouterLink } from 'vue-router'
const cart = useCartStore()
const promoInput = ref(cart.promoCode)

function updateQty(item, qty) {
  if (qty < 1) return
  cart.updateQuantity(item.id, qty)
}
function remove(id) {
  cart.removeFromCart(id)
}
function validatePromo() {
  cart.setPromoCode(promoInput.value)
}
function applyPromo() {
  cart.setPromoCode(promoInput.value)
}
function setDelivery(option) {
  cart.setDelivery(option)
}
</script>

<style scoped>
.bg-primary {
  background-color: #0071bc;
}
.text-primary {
  color: #0071bc;
}
.accent-primary {
  accent-color: #0071bc;
}
@media (max-width: 1023px) {
  .sticky {
    position: static !important;
  }
}
</style>
