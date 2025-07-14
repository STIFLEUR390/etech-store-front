<template>
  <div class="bg-gray-50 min-h-screen flex flex-col lg:flex-row">
    <!-- Sidebar Filters (desktop) -->
    <aside
      class="hidden lg:block w-72 bg-white rounded-xl shadow-md p-6 mr-8 mt-8 h-fit sticky top-8 self-start"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-6">Filtres</h2>
      <!-- Price Range -->
      <div class="mb-8">
        <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
          <i class="fas fa-money-bill-wave mr-2 text-blue-600"></i>Prix
        </h3>
        <div class="flex items-center space-x-2 mb-2">
          <input
            type="range"
            min="0"
            max="100000"
            v-model="filters.price"
            class="w-full accent-blue-600"
          />
        </div>
        <div class="flex justify-between text-sm text-gray-600">
          <span>0 XAF</span>
          <span>100,000 XAF</span>
        </div>
      </div>
      <!-- Categories -->
      <div class="mb-8">
        <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
          <i class="fas fa-th-large mr-2 text-blue-600"></i>Catégories
        </h3>
        <div class="space-y-2">
          <label v-for="cat in categories" :key="cat.name" class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="filters.categories"
              :value="cat.name"
              class="accent-blue-600 mr-2"
            />
            <i :class="cat.icon + ' text-lg mr-2'" :style="{ color: cat.color }"></i>
            <span class="text-gray-700">{{ cat.name }}</span>
          </label>
        </div>
      </div>
      <!-- Brands -->
      <div class="mb-8">
        <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
          <i class="fas fa-tags mr-2 text-blue-600"></i>Marques
        </h3>
        <div class="space-y-2">
          <label v-for="brand in brands" :key="brand" class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="filters.brands"
              :value="brand"
              class="accent-blue-600 mr-2"
            />
            <span class="text-gray-700">{{ brand }}</span>
          </label>
        </div>
      </div>
      <!-- Ratings -->
      <div class="mb-8">
        <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
          <i class="fas fa-star mr-2 text-blue-600"></i>Notes clients
        </h3>
        <div class="space-y-2">
          <label v-for="n in 5" :key="n" class="flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="filters.ratings"
              :value="n"
              class="accent-blue-600 mr-2"
            />
            <div class="flex">
              <i v-for="i in n" :key="i" class="fas fa-star text-yellow-400"></i>
              <i v-for="i in 5 - n" :key="'e' + i" class="fas fa-star text-gray-300"></i>
            </div>
            <span class="ml-2 text-gray-700">&amp; plus</span>
          </label>
        </div>
      </div>
      <!-- Availability -->
      <div class="mb-4">
        <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
          <i class="fas fa-box-open mr-2 text-blue-600"></i>Disponibilité
        </h3>
        <label class="inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="filters.inStock" class="accent-blue-600" />
          <span class="ml-2 text-gray-700">En stock uniquement</span>
        </label>
      </div>
      <div class="flex flex-col gap-2 mt-6">
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Appliquer
        </button>
        <button
          class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition"
          @click="resetFilters"
        >
          Réinitialiser
        </button>
      </div>
    </aside>
    <!-- Filtres mobile/tablette (bouton) -->
    <div class="lg:hidden flex justify-end px-4 pt-4">
      <button
        @click="showMobileFilters = true"
        class="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 shadow-sm"
      >
        <i class="fas fa-filter"></i> Filtres
      </button>
    </div>
    <!-- Drawer mobile/tablette -->
    <transition name="fade">
      <div v-if="showMobileFilters" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
        <div class="bg-white w-4/5 max-w-xs h-full p-6 overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold">Filtres</h2>
            <button @click="showMobileFilters = false" class="text-gray-500 text-2xl">
              &times;
            </button>
          </div>
          <h2 class="text-xl font-bold text-gray-800 mb-6">Filtres</h2>
          <!-- Price Range -->
          <div class="mb-8">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
              <i class="fas fa-money-bill-wave mr-2 text-blue-600"></i>Prix
            </h3>
            <div class="flex items-center space-x-2 mb-2">
              <input
                type="range"
                min="0"
                max="100000"
                v-model="filters.price"
                class="w-full accent-blue-600"
              />
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>0 XAF</span>
              <span>100,000 XAF</span>
            </div>
          </div>
          <!-- Categories -->
          <div class="mb-8">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
              <i class="fas fa-th-large mr-2 text-blue-600"></i>Catégories
            </h3>
            <div class="space-y-2">
              <label
                v-for="cat in categories"
                :key="cat.name"
                class="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  v-model="filters.categories"
                  :value="cat.name"
                  class="accent-blue-600 mr-2"
                />
                <i :class="cat.icon + ' text-lg mr-2'" :style="{ color: cat.color }"></i>
                <span class="text-gray-700">{{ cat.name }}</span>
              </label>
            </div>
          </div>
          <!-- Brands -->
          <div class="mb-8">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
              <i class="fas fa-tags mr-2 text-blue-600"></i>Marques
            </h3>
            <div class="space-y-2">
              <label v-for="brand in brands" :key="brand" class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="filters.brands"
                  :value="brand"
                  class="accent-blue-600 mr-2"
                />
                <span class="text-gray-700">{{ brand }}</span>
              </label>
            </div>
          </div>
          <!-- Ratings -->
          <div class="mb-8">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
              <i class="fas fa-star mr-2 text-blue-600"></i>Notes clients
            </h3>
            <div class="space-y-2">
              <label v-for="n in 5" :key="n" class="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  v-model="filters.ratings"
                  :value="n"
                  class="accent-blue-600 mr-2"
                />
                <div class="flex">
                  <i v-for="i in n" :key="i" class="fas fa-star text-yellow-400"></i>
                  <i v-for="i in 5 - n" :key="'e' + i" class="fas fa-star text-gray-300"></i>
                </div>
                <span class="ml-2 text-gray-700">&amp; plus</span>
              </label>
            </div>
          </div>
          <!-- Availability -->
          <div class="mb-4">
            <h3 class="font-semibold text-gray-700 mb-2 flex items-center">
              <i class="fas fa-box-open mr-2 text-blue-600"></i>Disponibilité
            </h3>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="filters.inStock" class="accent-blue-600" />
              <span class="ml-2 text-gray-700">En stock uniquement</span>
            </label>
          </div>
          <div class="flex flex-col gap-2 mt-6">
            <button
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Appliquer
            </button>
            <button
              class="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition"
              @click="resetFilters"
            >
              Réinitialiser
            </button>
          </div>
        </div>
        <div class="flex-1" @click="showMobileFilters = false"></div>
      </div>
    </transition>
    <!-- Main Content -->
    <main class="flex-1 max-w-7xl mx-auto mt-8 px-2 sm:px-4 md:px-6 lg:px-8">
      <!-- Espace sous header -->
      <div class="h-2 md:h-4"></div>
      <!-- Breadcrumbs -->
      <nav
        class="bg-white rounded-xl shadow-sm px-4 py-3 mb-6 flex items-center text-sm overflow-x-auto"
        aria-label="Fil d'Ariane"
      >
        <ol class="flex items-center space-x-2">
          <li>
            <a href="#" class="text-blue-600 hover:underline flex items-center"
              ><i class="fas fa-home mr-1"></i>Accueil</a
            >
          </li>
          <li><span class="text-gray-400">/</span></li>
          <li><a href="#" class="text-blue-600 hover:underline">Électronique</a></li>
          <li><span class="text-gray-400">/</span></li>
          <li class="text-gray-500">Smartphones</li>
        </ol>
      </nav>
      <!-- Display Options -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div class="flex items-center gap-2">
          <span class="text-gray-600 mr-2">Vue :</span>
          <button
            @click="view = 'grid'"
            :class="
              view === 'grid' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
            "
            class="p-2 rounded-lg transition"
          >
            <i class="fas fa-th-large"></i>
          </button>
          <button
            @click="view = 'list'"
            :class="
              view === 'list' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
            "
            class="p-2 rounded-lg transition"
          >
            <i class="fas fa-list"></i>
          </button>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-600">Trier par :</span>
          <select
            v-model="sortBy"
            class="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity">Popularité</option>
            <option value="price">Prix</option>
            <option value="newest">Nouveautés</option>
          </select>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gray-600">Afficher :</span>
          <select
            v-model.number="perPage"
            class="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option v-for="n in [10, 20, 40, 80, 100]" :key="n" :value="n">{{ n }}</option>
          </select>
          <span class="text-gray-600">produits</span>
        </div>
      </div>
      <!-- Product Grid/List -->
      <div
        v-if="view === 'grid'"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        <template v-if="!loading">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            :list="false"
            :is-wished="isProductWished(product.id)"
            @toggle-wishlist="handleToggleWishlist"
          >
            <template #image="{ product }">
              <RouterLink :to="`/produit/${product.id}`">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="rounded-t-lg w-full h-48 object-cover cursor-pointer hover:opacity-80 transition"
                />
              </RouterLink>
            </template>
            <template #title="{ product }">
              <RouterLink
                :to="`/produit/${product.id}`"
                class="font-semibold hover:text-[#0071BC] transition cursor-pointer"
              >
                {{ product.name }}
              </RouterLink>
            </template>
            <template #actions="{ product }">
              <button
                @click="addToCart(product)"
                class="mt-2 w-full bg-[#0071BC] hover:bg-[#009966] text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center"
              >
                <i class="fas fa-shopping-cart mr-1"></i> Ajouter au panier
              </button>
            </template>
          </ProductCard>
        </template>
        <template v-else>
          <div
            v-for="n in perPage"
            :key="'skeleton' + n"
            class="animate-pulse bg-white rounded-lg shadow-sm h-64 flex flex-col"
          >
            <div class="bg-gray-200 h-48 w-full rounded-t-lg"></div>
            <div class="p-4 flex-1 flex flex-col gap-2">
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              <div class="h-3 bg-gray-100 rounded w-1/2"></div>
              <div class="h-4 bg-gray-100 rounded w-1/3 mt-auto"></div>
            </div>
          </div>
        </template>
      </div>
      <div v-else class="flex flex-col gap-4">
        <template v-if="!loading">
          <ProductCard
            v-for="product in paginatedProducts"
            :key="product.id"
            :product="product"
            list
            :is-wished="isProductWished(product.id)"
            @toggle-wishlist="handleToggleWishlist"
          >
            <template #description="{ product }">
              <div class="text-gray-500 text-sm mt-1">{{ product.description }}</div>
            </template>
            <template #actions="{ product }">
              <RouterLink
                :to="`/produit/${product.id}`"
                class="mt-2 inline-block bg-[#0071BC] text-white px-3 py-1 rounded hover:bg-[#009966] transition text-sm font-semibold"
              >
                Voir le produit
              </RouterLink>
            </template>
          </ProductCard>
        </template>
        <template v-else>
          <div
            v-for="n in perPage"
            :key="'skeleton-list' + n"
            class="animate-pulse bg-white rounded-lg shadow-sm h-32 flex flex-row"
          >
            <div class="bg-gray-200 h-32 w-32 rounded-l-lg"></div>
            <div class="p-4 flex-1 flex flex-col gap-2">
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              <div class="h-3 bg-gray-100 rounded w-1/2"></div>
              <div class="h-4 bg-gray-100 rounded w-1/3 mt-auto"></div>
            </div>
          </div>
        </template>
      </div>
      <!-- Bouton Charger plus -->
      <div
        v-if="filteredProducts.length > paginatedProducts.length"
        class="flex justify-center mt-6"
      >
        <button
          @click="loadMore"
          :disabled="loading"
          class="bg-[#0071BC] hover:bg-[#009966] text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2"
        >
          <svg
            v-if="loading"
            class="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>Charger plus</span>
        </button>
      </div>
      <!-- Message si aucun produit -->
      <div
        v-if="!loading && filteredProducts.length === 0"
        class="text-center text-gray-500 py-12 text-lg"
      >
        Aucun produit ne correspond à vos filtres.
      </div>
      <!-- Pagination -->
      <div class="pagination-container">
        <VueAwesomePaginate
          :total-items="totalProducts"
          :items-per-page="itemsPerPage"
          :max-pages-shown="5"
          v-model="currentPage"
          :on-click="onPageChange"
          prev-button-text="<"
          next-button-text=">"
          :show-breakpoint-buttons="true"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { RouterLink } from 'vue-router'
import VueAwesomePaginate from 'vue-awesome-paginate'
import { useProductsStore } from '../stores/products'
import { useCartStore } from '../stores/cart'

const view = ref('grid')
const sortBy = ref('popularity')
const perPage = ref(20)

const wishlist = ref([])
function handleToggleWishlist({ product, wished }) {
  if (wished) {
    if (!wishlist.value.includes(product.id)) wishlist.value.push(product.id)
  } else {
    wishlist.value = wishlist.value.filter((id) => id !== product.id)
  }
}
function isProductWished(id) {
  return wishlist.value.includes(id)
}

const filters = ref({
  price: 100000,
  categories: [],
  brands: [],
  ratings: [],
  inStock: false,
})

const productsStore = useProductsStore()
onMounted(() => {
  productsStore.generateProducts()
})

const categories = computed(() => productsStore.getCategories)
const brands = computed(() => productsStore.getBrands)

const products = computed(() => productsStore.getProducts)

const loading = ref(true)

const filteredProducts = computed(() => {
  let result = products.value.filter((p) => p.price <= filters.value.price)
  if (filters.value.categories.length) {
    result = result.filter((p) => filters.value.categories.includes(p.category))
  }
  if (filters.value.brands.length) {
    result = result.filter((p) => filters.value.brands.includes(p.brand))
  }
  if (filters.value.ratings.length) {
    result = result.filter((p) => filters.value.ratings.some((r) => p.rating >= r))
  }
  if (filters.value.inStock) {
    result = result.filter((p) => p.inStock)
  }
  // Tri
  if (sortBy.value === 'price') {
    result = result.slice().sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'newest') {
    result = result.slice().sort((a, b) => b.id - a.id)
  } else if (sortBy.value === 'popularity') {
    result = result.slice().sort((a, b) => b.reviews - a.reviews)
  }
  return result
})

const currentPage = ref(1)
const itemsPerPage = perPage
const totalProducts = computed(() => filteredProducts.value.length)
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredProducts.value.slice(start, start + itemsPerPage.value)
})

function onPageChange(page) {
  currentPage.value = page
}

// Remet à la valeur du select si on change le nombre à afficher
watch(perPage, (val) => {
  itemsPerPage.value = val
})

function loadMore() {
  loading.value = true
  setTimeout(() => {
    itemsPerPage.value += perPage.value
    loading.value = false
  }, 800)
}

// Animation de chargement initiale
setTimeout(() => {
  loading.value = false
}, 900)

function resetFilters() {
  filters.value = { price: 100000, categories: [], brands: [], ratings: [], inStock: false }
}

const showMobileFilters = ref(false)

const cart = useCartStore()
function addToCart(product) {
  cart.addToCart(product)
  // Optionnel : feedback visuel
  alert('Produit ajouté au panier !')
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #e0e0e0;
  border-radius: 8px;
}
/* Squelette animation */
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
