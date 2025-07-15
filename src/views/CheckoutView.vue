<template>
  <div class="bg-gray-50 min-h-screen py-8 px-2 sm:px-4">
    <div class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      <!-- Main content -->
      <div class="flex-1">
        <!-- Progress Indicator -->
        <div class="flex items-center justify-between mb-8">
          <div class="flex-1 flex items-center">
            <StepIcon :active="step === 1" icon="fa-truck" label="Livraison" />
            <div class="flex-1 h-1 mx-2 bg-gray-200 rounded">
              <div
                v-if="step > 1"
                class="h-1 bg-[#0071BC] rounded transition-all"
                style="width: 100%"
              ></div>
            </div>
            <StepIcon :active="step === 2" icon="fa-credit-card" label="Paiement" />
            <div class="flex-1 h-1 mx-2 bg-gray-200 rounded">
              <div
                v-if="step > 2"
                class="h-1 bg-[#0071BC] rounded transition-all"
                style="width: 100%"
              ></div>
            </div>
            <StepIcon :active="step === 3" icon="fa-check-circle" label="Confirmation" />
          </div>
          <div class="hidden lg:block ml-6">
            <span class="text-sm text-gray-500">Étape {{ step }}/3</span>
          </div>
        </div>
        <!-- Step 1: Delivery Info -->
        <div v-if="step === 1" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 class="text-xl font-bold mb-4 text-gray-900">Informations de livraison</h2>
          <form @submit.prevent="goToStep(2)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Nom complet</label>
                <input
                  v-model="delivery.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  :class="{ 'border-red-500': errors.name }"
                />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Téléphone</label>
                <input
                  v-model="delivery.phone"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  :class="{ 'border-red-500': errors.phone }"
                />
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium mb-1">Adresse</label>
                <input
                  v-model="delivery.address"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  :class="{ 'border-red-500': errors.address }"
                />
                <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Ville</label>
                <input
                  v-model="delivery.city"
                  type="text"
                  required
                  class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  :class="{ 'border-red-500': errors.city }"
                />
                <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input
                  v-model="delivery.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
              </div>
            </div>
            <!-- Carnet d'adresses -->
            <div class="mt-2">
              <label class="block text-sm font-medium mb-1">Carnet d'adresses</label>
              <select v-model="selectedAddress" class="w-full px-3 py-2 border rounded">
                <option value="">Sélectionner une adresse enregistrée</option>
                <option v-for="(addr, idx) in addressBook" :key="idx" :value="idx">
                  {{ addr.name }} - {{ addr.address }}
                </option>
              </select>
              <button
                v-if="selectedAddress !== ''"
                type="button"
                class="text-xs text-[#0071BC] mt-1"
                @click="applyAddress"
              >
                Utiliser cette adresse
              </button>
            </div>
            <!-- Méthode de livraison -->
            <div class="mt-4">
              <label class="block text-sm font-medium mb-2">Méthode de livraison</label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="home"
                    v-model="delivery.method"
                    class="accent-[#0071BC]"
                  />
                  <span>Livraison à domicile</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="pickup"
                    v-model="delivery.method"
                    class="accent-[#0071BC]"
                  />
                  <span>Retrait en boutique</span>
                </label>
              </div>
            </div>
            <!-- Adresse de facturation -->
            <div class="mt-6">
              <label class="flex items-center gap-2 cursor-pointer"
                ><input type="checkbox" v-model="sameBilling" class="accent-[#0071BC]" /><span
                  class="text-sm"
                  >L’adresse de facturation est la même que la livraison</span
                ></label
              >
            </div>
            <div v-if="!sameBilling" class="mt-4 border-t pt-4">
              <h3 class="text-base font-semibold mb-2 text-gray-900">Adresse de facturation</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Nom complet</label>
                  <input
                    v-model="billing.name"
                    type="text"
                    required
                    class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Téléphone</label>
                  <input
                    v-model="billing.phone"
                    type="tel"
                    required
                    class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="block text-sm font-medium mb-1">Adresse</label>
                  <input
                    v-model="billing.address"
                    type="text"
                    required
                    class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Ville</label>
                  <input
                    v-model="billing.city"
                    type="text"
                    required
                    class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1">Email</label>
                  <input
                    v-model="billing.email"
                    type="email"
                    required
                    class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-end mt-6">
              <button
                type="submit"
                class="bg-[#0071BC] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005fa3] transition"
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
        <!-- Step 2: Payment -->
        <div v-if="step === 2" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 class="text-xl font-bold mb-4 text-gray-900">Méthode de paiement</h2>
          <form @submit.prevent="goToStep(3)" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label
                v-for="method in paymentMethods"
                :key="method.value"
                class="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:shadow transition"
              >
                <input
                  type="radio"
                  v-model="payment.method"
                  :value="method.value"
                  class="accent-[#0071BC]"
                />
                <i
                  :class="method.icon + ' text-2xl'"
                  :style="method.color ? 'color:' + method.color : ''"
                ></i>
                <span class="font-medium">{{ method.label }}</span>
                <i
                  v-if="method.secure"
                  class="fas fa-lock text-green-600 ml-2"
                  title="Paiement sécurisé"
                ></i>
              </label>
            </div>
            <!-- Badges sécurité et paiement -->
            <div class="flex items-center gap-4 mt-2">
              <i class="fas fa-lock text-green-600 text-xl"></i>
              <span class="text-xs text-gray-500">100% Paiement sécurisé</span>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/SSL-logo.svg"
                alt="SSL"
                class="h-5 ml-2"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
                alt="Visa"
                class="h-5 ml-1"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                alt="Mastercard"
                class="h-5 ml-1"
              />
            </div>
            <div class="flex justify-between mt-6">
              <button
                type="button"
                @click="goToStep(1)"
                class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Retour
              </button>
              <button
                type="submit"
                class="bg-[#0071BC] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005fa3] transition"
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
        <!-- Step 3: Confirmation -->
        <div v-if="step === 3" class="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 class="text-xl font-bold mb-4 text-gray-900">Confirmation de la commande</h2>
          <div class="mb-4 text-green-700 flex items-center gap-2">
            <i class="fas fa-check-circle text-2xl"></i>
            <span>Votre commande a bien été enregistrée !</span>
          </div>
          <div class="mb-4">
            <p class="text-gray-700">
              Merci pour votre achat sur
              <span class="font-bold text-[#0071BC]">E-Key Market</span>.<br />Un récapitulatif vous
              a été envoyé par email.
            </p>
          </div>
          <div class="flex justify-between mt-6">
            <button
              type="button"
              @click="goToStep(1)"
              class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Nouvelle commande
            </button>
            <RouterLink
              to="/"
              class="bg-[#0071BC] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005fa3] transition"
              >Retour à l'accueil</RouterLink
            >
          </div>
        </div>
      </div>
      <!-- Sidebar: Order Summary -->
      <aside class="w-full lg:w-1/3">
        <div class="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-8">
          <h3 class="text-lg font-bold mb-4 text-gray-900">Récapitulatif</h3>
          <div
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center gap-3 mb-3 border-b pb-2 last:border-b-0"
          >
            <img :src="item.image" :alt="item.name" class="w-14 h-14 object-cover rounded border" />
            <div class="flex-1">
              <div class="font-medium text-gray-800">{{ item.name }}</div>
              <div class="text-xs text-gray-500">
                x{{ item.quantity }} &times; {{ item.price.toLocaleString() }} XAF
              </div>
            </div>
            <div class="font-semibold text-gray-900">
              {{ (item.price * item.quantity).toLocaleString() }} XAF
            </div>
          </div>
          <div class="my-4">
            <div class="flex justify-between text-gray-600 text-sm">
              <span>Sous-total</span>
              <span>{{ cart.subtotal.toLocaleString() }} XAF</span>
            </div>
            <div class="flex justify-between text-gray-600 text-sm">
              <span>TVA (19,25%)</span>
              <span>{{ cart.vat.toLocaleString() }} XAF</span>
            </div>
            <div class="flex justify-between text-gray-600 text-sm">
              <span>Frais de livraison</span>
              <span>{{ cart.items.length ? cart.deliveryFee.toLocaleString() : 0 }} XAF</span>
            </div>
            <div
              v-if="cart.promoDiscount"
              class="flex justify-between text-green-600 font-semibold text-sm"
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
          <div class="mb-4 overflow-hidden">
            <label for="promo" class="block text-sm font-medium text-gray-700 mb-1"
              >Code promo</label
            >
            <div class="flex flex-wrap sm:flex-nowrap gap-2">
              <input
                id="promo"
                v-model="promoInput"
                @input="validatePromo"
                type="text"
                placeholder="Entrez le code"
                class="flex-1 min-w-0 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0071BC] text-sm sm:text-base"
                :class="{ 'border-green-500': cart.promoValid, 'border-red-500': cart.promoError }"
              />
              <button
                @click="applyPromo"
                class="bg-[#0071BC] text-white px-4 py-2 rounded hover:bg-[#005fa3] transition w-full sm:w-auto sm:shrink-0"
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
          <div class="flex items-center gap-2 mt-2">
            <i class="fas fa-lock text-green-600"></i>
            <span class="text-xs text-gray-500">Paiement 100% sécurisé</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5e/SSL-logo.svg"
              alt="SSL"
              class="h-5 ml-2"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              class="h-5 ml-1"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              class="h-5 ml-1"
            />
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { RouterLink } from 'vue-router'

const cart = useCartStore()
const step = ref(1)

// Formulaires
const delivery = ref({
  name: '',
  phone: '',
  address: '',
  city: '',
  email: '',
  method: 'home',
})
const errors = ref({})
const addressBook = ref([
  { name: 'Jean Dupont', address: '123 Rue de la Paix, Douala' },
  { name: 'Amina Traoré', address: '456 Avenue des Fleurs, Yaoundé' },
])
const selectedAddress = ref('')
function applyAddress() {
  if (selectedAddress.value !== '') {
    const addr = addressBook.value[selectedAddress.value]
    delivery.value.name = addr.name
    delivery.value.address = addr.address
  }
}
function validateDelivery() {
  errors.value = {}
  if (!delivery.value.name) errors.value.name = 'Nom requis'
  if (!delivery.value.phone) errors.value.phone = 'Téléphone requis'
  if (!delivery.value.address) errors.value.address = 'Adresse requise'
  if (!delivery.value.city) errors.value.city = 'Ville requise'
  if (!delivery.value.email) errors.value.email = 'Email requis'
  return Object.keys(errors.value).length === 0
}
function goToStep(n) {
  if (n === 2 && !validateDelivery()) return
  step.value = n
}
// Paiement
const payment = ref({ method: '' })
const paymentMethods = [
  {
    value: 'orange',
    label: 'Orange Money',
    icon: 'fab fa-cc-mastercard',
    color: '#F4A300',
    secure: true,
  },
  {
    value: 'mtn',
    label: 'MTN Mobile Money',
    icon: 'fab fa-cc-visa',
    color: '#F4A300',
    secure: true,
  },
  {
    value: 'card',
    label: 'Carte bancaire',
    icon: 'fas fa-credit-card',
    color: '#0071BC',
    secure: true,
  },
  {
    value: 'cash',
    label: 'Paiement à la livraison',
    icon: 'fas fa-money-bill-wave',
    color: '#009966',
    secure: false,
  },
]
// Promo
const promoInput = ref(cart.promoCode)
function validatePromo() {
  cart.setPromoCode(promoInput.value)
}
function applyPromo() {
  cart.setPromoCode(promoInput.value)
}
const sameBilling = ref(true)
const billing = ref({
  name: '',
  phone: '',
  address: '',
  city: '',
  email: '',
})
</script>

<script>
// StepIcon composant local
export default {
  components: {
    StepIcon: {
      props: ['active', 'icon', 'label'],
      template: `<div class="flex flex-col items-center min-w-[80px]">
        <div :class="['rounded-full w-10 h-10 flex items-center justify-center mb-1', active ? 'bg-[#0071BC] text-white shadow' : 'bg-gray-200 text-gray-500']">
          <i :class="['fas', icon, 'text-xl']"></i>
        </div>
        <span :class="['text-xs font-medium', active ? 'text-[#0071BC]' : 'text-gray-500']">{{ label }}</span>
      </div>`,
    },
  },
}
</script>

<style scoped>
@media (max-width: 1023px) {
  aside.sticky {
    position: static !important;
  }
}
</style>
