<template>
  <div class="bg-gray-50 min-h-screen py-10">
    <div class="container mx-auto px-6">
      <div class="flex flex-col lg:flex-row gap-10">
        <!-- Galerie d'images -->
        <div class="w-full lg:w-1/2">
          <div class="relative bg-white rounded-xl shadow-md p-4 mb-4">
            <div class="flex items-center justify-center relative">
              <img
                :src="images[selectedImage]"
                :alt="product.name"
                class="w-full h-[400px] object-cover rounded-lg transition-transform duration-300 cursor-zoom-in hover:scale-105"
              />
              <button
                class="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
                title="Vue 360°"
              >
                <i class="fas fa-rotate text-blue-700"></i>
              </button>
            </div>
            <div class="flex gap-2 mt-4 justify-center">
              <img
                v-for="(img, idx) in images"
                :key="idx"
                :src="img"
                :alt="'Aperçu ' + (idx + 1)"
                @click="selectedImage = idx"
                :class="[
                  'w-20 h-20 object-cover rounded-lg border cursor-pointer transition-all',
                  selectedImage === idx
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200',
                ]"
              />
            </div>
          </div>
        </div>
        <!-- Infos produit -->
        <div class="w-full lg:w-1/2">
          <div class="bg-white rounded-xl shadow-md p-8 flex flex-col gap-6">
            <div class="flex justify-between items-start">
              <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
              <button class="text-gray-400 hover:text-red-500" title="Ajouter à la wishlist">
                <i class="far fa-heart text-2xl"></i>
              </button>
            </div>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400 mr-2">
                <i
                  class="fas fa-star"
                  v-for="n in Math.floor(product.rating)"
                  :key="'star' + n"
                ></i>
                <i v-if="product.rating % 1 >= 0.5" class="fas fa-star-half-alt"></i>
              </div>
              <span class="text-gray-600 text-sm"
                >{{ product.rating }} ({{ product.reviewsCount }} avis)</span
              >
            </div>
            <div>
              <span class="text-2xl font-bold text-[#0071BC]">{{ product.price }} XAF</span>
              <span v-if="product.oldPrice" class="ml-2 text-gray-500 line-through"
                >{{ product.oldPrice }} XAF</span
              >
              <span
                v-if="product.discount"
                class="ml-2 bg-orange-100 text-[#F4A300] text-sm font-semibold px-2 py-1 rounded"
                >{{ product.discount }}% OFF</span
              >
            </div>
            <p class="text-gray-700">{{ product.shortDescription }}</p>
            <!-- Spécifications techniques -->
            <div>
              <button
                @click="showSpecs = !showSpecs"
                class="flex items-center font-semibold text-gray-900 hover:text-blue-700"
              >
                <span>Spécifications techniques</span>
                <i
                  :class="[
                    'ml-2 transition-transform',
                    showSpecs ? 'fas fa-chevron-up' : 'fas fa-chevron-down',
                  ]"
                ></i>
              </button>
              <div v-show="showSpecs" class="mt-2">
                <table class="w-full text-sm text-gray-700">
                  <tbody>
                    <tr
                      v-for="(val, key) in product.specs"
                      :key="key"
                      class="border-b border-gray-100"
                    >
                      <td class="py-2 font-medium">{{ key }}</td>
                      <td class="py-2">{{ val }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- Sélecteur de quantité et actions -->
            <div class="flex items-center gap-4">
              <span class="font-semibold text-gray-900">Quantité</span>
              <div class="flex items-center border rounded-lg overflow-hidden">
                <button
                  @click="decrement"
                  class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  -
                </button>
                <input
                  type="text"
                  v-model.number="quantity"
                  class="w-12 text-center border-x border-gray-200 py-2 outline-none"
                />
                <button
                  @click="increment"
                  class="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  +
                </button>
              </div>
            </div>
            <div class="flex flex-col sm:flex-row gap-3">
              <button
                class="flex-1 bg-[#0071BC] hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <i class="fas fa-shopping-cart mr-2"></i> Ajouter au panier
              </button>
              <button
                class="flex-1 bg-white border border-[#0071BC] text-[#0071BC] font-bold py-3 px-4 rounded-lg hover:bg-blue-50 transition duration-200"
              >
                Acheter maintenant
              </button>
            </div>
            <!-- Badges -->
            <div class="flex flex-wrap gap-3">
              <div class="flex items-center bg-green-50 text-[#009966] px-3 py-2 rounded-lg">
                <i class="fas fa-check-circle mr-2"></i>
                <span class="text-sm font-medium">En stock</span>
              </div>
              <div class="flex items-center bg-blue-50 text-[#0071BC] px-3 py-2 rounded-lg">
                <i class="fas fa-truck mr-2"></i>
                <span class="text-sm font-medium">Livraison gratuite</span>
              </div>
              <div class="flex items-center bg-orange-50 text-[#F4A300] px-3 py-2 rounded-lg">
                <i class="fas fa-shield-alt mr-2"></i>
                <span class="text-sm font-medium">Garantie 1 an</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Les sections avis et recommandations seront ajoutées à l'étape suivante -->
      <!-- Section Avis Clients -->
      <div class="mt-16 bg-white rounded-xl shadow-md p-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900">Avis clients</h2>
          <button
            class="bg-[#0071BC] hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg flex items-center"
          >
            <i class="fas fa-pen mr-2"></i> Écrire un avis
          </button>
        </div>
        <div class="flex items-center mb-8">
          <div class="text-4xl font-bold mr-4">{{ product.rating }}</div>
          <div class="mr-4">
            <div class="flex text-yellow-400 mb-1">
              <i
                class="fas fa-star"
                v-for="n in Math.floor(product.rating)"
                :key="'star-avis' + n"
              ></i>
              <i v-if="product.rating % 1 >= 0.5" class="fas fa-star-half-alt"></i>
            </div>
            <div class="text-sm text-gray-600">{{ product.reviewsCount }} avis</div>
          </div>
          <div class="flex-1">
            <div v-for="(stat, idx) in reviewStats" :key="idx" class="flex items-center mb-1">
              <span class="w-10 text-sm text-gray-600">{{ stat.stars }} étoiles</span>
              <div class="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                <div
                  class="bg-yellow-400 h-2 rounded-full"
                  :style="'width: ' + stat.percent + '%'"
                />
              </div>
              <span class="w-10 text-sm text-gray-600">{{ stat.percent }}%</span>
            </div>
          </div>
        </div>
        <div class="space-y-6">
          <div
            v-for="(review, idx) in reviews"
            :key="idx"
            class="bg-gray-50 rounded-lg p-6 shadow-sm"
          >
            <div class="flex justify-between mb-2">
              <div class="flex items-center">
                <div
                  class="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold mr-3"
                >
                  {{ review.initials }}
                </div>
                <div>
                  <div class="font-semibold">{{ review.user }}</div>
                  <div class="flex text-yellow-400 text-sm">
                    <i
                      class="fas fa-star"
                      v-for="n in review.stars"
                      :key="'star-' + idx + '-' + n"
                    ></i>
                  </div>
                </div>
              </div>
              <div class="text-sm text-gray-500">{{ review.date }}</div>
            </div>
            <h3 class="font-medium text-gray-900 mb-2">{{ review.title }}</h3>
            <p class="text-gray-700">{{ review.text }}</p>
            <div class="flex mt-3">
              <button class="text-[#0071BC] hover:text-blue-800 text-sm font-medium mr-4">
                <i class="fas fa-thumbs-up mr-1"></i> Utile ({{ review.helpful }})
              </button>
              <button class="text-gray-600 hover:text-gray-800 text-sm font-medium">
                <i class="fas fa-flag mr-1"></i> Signaler
              </button>
            </div>
          </div>
        </div>
        <div class="mt-8 text-center">
          <button
            class="bg-white border border-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-50"
          >
            Charger plus d'avis
          </button>
        </div>
      </div>
      <!-- Section Recommandations -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Vous aimerez aussi</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(rec, idx) in recommendations"
            :key="idx"
            class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div class="relative">
              <img :src="rec.img" :alt="rec.name" class="w-full h-48 object-cover" />
              <button class="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                <i class="far fa-heart text-xl"></i>
              </button>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-900 mb-1">{{ rec.name }}</h3>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400 text-xs mr-1">
                  <i
                    class="fas fa-star"
                    v-for="n in rec.stars"
                    :key="'rec-star-' + idx + '-' + n"
                  ></i>
                </div>
                <span class="text-gray-500 text-xs">({{ rec.reviews }})</span>
              </div>
              <div class="flex items-center">
                <span class="text-lg font-bold text-[#0071BC]">{{ rec.price }} XAF</span>
                <span v-if="rec.oldPrice" class="ml-2 text-sm text-gray-500 line-through"
                  >{{ rec.oldPrice }} XAF</span
                >
              </div>
              <button
                class="mt-3 w-full bg-[#0071BC] hover:bg-blue-800 text-white py-2 px-4 rounded-lg text-sm font-medium"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Section Souvent achetés ensemble -->
      <div class="mt-16">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Souvent achetés ensemble</h2>
        <div class="bg-white rounded-xl shadow-md overflow-x-auto">
          <div class="flex gap-8 p-6 min-w-[700px]">
            <div
              v-for="(item, idx) in boughtTogether"
              :key="idx"
              class="flex flex-col items-center w-56 bg-gray-50 rounded-lg shadow-sm p-4 relative"
            >
              <img :src="item.img" :alt="item.name" class="w-32 h-32 object-cover rounded mb-2" />
              <h3 class="font-semibold text-gray-900 mb-1 text-center">{{ item.name }}</h3>
              <div class="flex items-center mb-2">
                <div class="flex text-yellow-400 text-xs mr-1">
                  <i
                    class="fas fa-star"
                    v-for="n in Math.floor(item.stars)"
                    :key="'bt-star-' + idx + '-' + n"
                  ></i>
                  <i v-if="item.stars % 1 >= 0.5" class="fas fa-star-half-alt"></i>
                </div>
                <span class="text-gray-500 text-xs">({{ item.reviews }})</span>
              </div>
              <div class="flex items-center mb-2">
                <span class="text-lg font-bold text-[#0071BC]">{{ item.price }} XAF</span>
                <span v-if="item.oldPrice" class="ml-2 text-sm text-gray-500 line-through"
                  >{{ item.oldPrice }} XAF</span
                >
              </div>
              <div class="flex gap-2 w-full mt-2">
                <button
                  class="flex-1 bg-[#0071BC] hover:bg-blue-800 text-white py-2 px-2 rounded-lg text-sm font-medium flex items-center justify-center"
                >
                  <i class="fas fa-shopping-cart mr-1"></i> Panier
                </button>
                <button
                  class="flex-1 bg-white border border-[#0071BC] text-[#0071BC] py-2 px-2 rounded-lg text-sm font-medium flex items-center justify-center hover:bg-blue-50"
                >
                  <i class="far fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '../stores/products'

export default {
  name: 'ProductDetail',
  data() {
    return {
      selectedImage: 0,
      showSpecs: false,
      quantity: 1,
    }
  },
  setup() {
    const route = useRoute()
    const productsStore = useProductsStore()
    productsStore.generateProducts()
    const product = computed(() => productsStore.getProductById(route.params.id))
    // Générer un tableau d'images fictives pour la galerie
    const images = computed(() => {
      if (!product.value) return []
      // Utilise l'image principale + variantes fictives
      const base = product.value.image
      // On génère 4 images différentes (ou la même si pas de variantes)
      return [
        base,
        base.replace('300x200', '300x200').replace('text=', 'text=Vue+2+'),
        base.replace('300x200', '300x200').replace('text=', 'text=Vue+3+'),
        base.replace('300x200', '300x200').replace('text=', 'text=Vue+4+'),
      ]
    })
    return { product, images }
  },
  methods: {
    increment() {
      this.quantity++
    },
    decrement() {
      if (this.quantity > 1) this.quantity--
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
