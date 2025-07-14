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
          />
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
      <div class="bg-white rounded-xl shadow-sm p-4 mt-8 flex justify-center">
        <nav class="inline-flex rounded-md shadow">
          <button
            @click="prevPage"
            :disabled="page === 1"
            class="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            v-for="n in totalPages"
            :key="n"
            @click="goToPage(n)"
            :class="
              page === n
                ? 'bg-blue-50 text-blue-600 font-medium'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            "
            class="px-3 py-2 border-t border-b border-gray-300"
          >
            {{ n }}
          </button>
          <button
            @click="nextPage"
            :disabled="page === totalPages"
            class="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </nav>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'

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

const categories = [
  { name: 'Électronique', icon: 'fas fa-tv', color: '#0071BC' },
  { name: 'Mode', icon: 'fas fa-tshirt', color: '#009966' },
  { name: 'Maison', icon: 'fas fa-couch', color: '#F4A300' },
  { name: 'Beauté', icon: 'fas fa-magic', color: '#E91E63' },
  { name: 'Sport', icon: 'fas fa-basketball-ball', color: '#4CAF50' },
]
const brands = [
  'Samsung',
  'Apple',
  'Tecno',
  'Infinix',
  'Nokia',
  'Xiaomi',
  'Oppo',
  'Sony',
  'LG',
  'HP',
  'Dell',
  'Adidas',
  'Nike',
  'Puma',
]

// Génération de produits fictifs
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const productNames = [
  'Samsung Galaxy S22 Ultra',
  'iPhone 14 Pro Max',
  'Tecno Camon 19 Pro',
  'Infinix Note 12 VIP',
  'Nokia G21',
  'Redmi Note 12 Pro',
  'Itel S23+',
  'Oppo Reno 8',
  'Sony Bravia 4K',
  'LG OLED TV',
  'HP Pavilion 15',
  'Dell XPS 13',
  'Adidas Ultraboost',
  'Nike Air Max',
  'Puma RS-X',
  'Apple Watch Series 8',
  'Samsung Galaxy Buds',
  'Xiaomi Mi Band 7',
  'Canon EOS 250D',
  'GoPro Hero 11',
  'Dyson V11',
  'Philips Airfryer',
  'Bose QC45',
  'JBL Flip 6',
  'PlayStation 5',
  'Xbox Series X',
  'Nintendo Switch',
  'Fitbit Versa 4',
  'Huawei MateBook D15',
  'Lenovo ThinkPad X1',
  'Lisseur GHD',
  'Sèche-cheveux Dyson',
  'Parfum Dior Sauvage',
  'Crème Nivea',
  'Tapis Yoga Reebok',
  'Ballon Adidas',
  'Vélo Decathlon',
  'Tente Quechua',
  'Table basse Ikea',
  'Canapé Maisons du Monde',
  'Lampe Philips Hue',
  'Aspirateur Rowenta',
  'Montre Fossil',
  'Sac à dos Eastpak',
  'Lunettes Ray-Ban',
  'Baskets Converse',
  'Baskets New Balance',
  'Baskets Asics',
  'Baskets Vans',
  'Baskets Reebok',
]
const productDescriptions = [
  'Le smartphone idéal pour la photo et la performance.',
  "L'ordinateur portable parfait pour le travail et le divertissement.",
  'Des baskets confortables pour le sport et la ville.',
  'Un accessoire tendance pour tous les styles.',
  "L'électroménager malin pour la maison.",
  'Un son immersif pour vos musiques préférées.',
  'La montre connectée pour suivre votre activité.',
  'Un objet design et pratique au quotidien.',
  'La meilleure expérience gaming à la maison.',
  'Un produit fiable et garanti 2 ans.',
]
const products = ref([])
for (let i = 0; i < 60; i++) {
  const name = productNames[i % productNames.length]
  const brand = brands[i % brands.length]
  const category = categories[i % categories.length].name
  const price = randomInt(10000, 800000)
  const oldPrice = Math.random() > 0.7 ? price + randomInt(5000, 50000) : undefined
  const rating = Math.round((Math.random() * 2 + 3) * 2) / 2 // 3 à 5 étoiles, demi-étoiles
  const reviews = randomInt(10, 500)
  const isNew = Math.random() > 0.8
  const isPromo = Math.random() > 0.7
  const inStock = Math.random() > 0.15
  const description = productDescriptions[i % productDescriptions.length]
  products.value.push({
    id: i + 1,
    name,
    image: `https://placehold.co/300x200/${
      ['0071BC', '009966', 'F4A300', 'E91E63', '4CAF50'][i % 5]
    }/fff?text=${encodeURIComponent(name)}`,
    price,
    oldPrice,
    rating,
    reviews,
    brand,
    category,
    isNew,
    isPromo,
    inStock,
    description,
  })
}

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

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage.value))
const shownCount = ref(perPage.value)
const paginatedProducts = computed(() => filteredProducts.value.slice(0, shownCount.value))

// Remet à la valeur du select si on change le nombre à afficher
watch(perPage, (val) => {
  shownCount.value = val
})

function loadMore() {
  loading.value = true
  setTimeout(() => {
    shownCount.value += perPage.value
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
