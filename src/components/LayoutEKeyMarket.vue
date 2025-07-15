<template>
  <div class="min-h-screen flex flex-col bg-gray-50 font-sans">
    <!-- Bandeau d'information -->
    <div class="bg-[#0071BC] text-white text-center py-2 px-4 text-sm sticky top-0 z-50">
      🚚 Livraison gratuite dès 50 000 FCFA | 🔒 Paiement sécurisé | 📦 Retrait en boutique
      disponible
    </div>
    <!-- Header sticky -->
    <header class="bg-white shadow-sm sticky top-[40px] z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-20 justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center select-none focus:outline-none">
          <img
            src="/src/assets/logo.png"
            alt="E-Key Market"
            class="h-10 w-auto mr-2 cursor-pointer"
          />
        </RouterLink>
        <!-- Barre de recherche centrale -->
        <form class="flex-1 mx-4 max-w-xl flex items-center">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            class="w-full rounded-l-full px-4 py-2 border border-gray-200 focus:outline-none"
          />
          <button
            type="submit"
            class="bg-[#009966] text-white px-4 py-2 rounded-r-full hover:bg-[#0071BC] transition"
          >
            <span class="material-icons">search</span>
          </button>
        </form>
        <!-- Menu catégories déroulant -->
        <div class="hidden md:block relative group mx-2">
          <button
            class="flex items-center font-semibold text-[#0071BC] hover:text-[#009966] transition"
          >
            <span class="material-icons mr-1">menu</span> Catégories
          </button>
          <div
            class="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition z-50"
          >
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Électronique</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Mode</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Maison</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Beauté</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Sports</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100">Voir toutes</a>
          </div>
        </div>
        <!-- Lien direct vers la page Catégories -->
        <RouterLink
          to="/categories"
          class="hidden md:inline-block font-semibold text-[#0071BC] hover:text-[#009966] transition mx-2"
          >Catégories</RouterLink
        >
        <!-- Icônes panier, wishlist, compte utilisateur -->
        <div class="flex items-center gap-4 ml-2">
          <!-- Panier avec aperçu au clic -->
          <div class="relative">
            <button id="cart-btn" class="relative" aria-label="Panier" @click="toggleCartPreview">
              <span class="material-icons text-2xl text-[#0071BC]">shopping_cart</span>
              <span
                v-if="cart.itemCount"
                class="absolute -top-2 -right-2 bg-[#F4A300] text-white text-xs rounded-full px-1"
                >{{ cart.itemCount }}</span
              >
            </button>
            <!-- Aperçu panier dynamique -->
            <transition name="cart-fade-slide">
              <div
                v-if="showCartPreview"
                id="cart-preview"
                class="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg border border-gray-100 z-50"
                ref="cartPreviewRef"
              >
                <div class="p-4 border-b font-bold text-[#0071BC]">Mon panier</div>
                <div v-if="cart.items.length">
                  <div
                    v-for="item in cart.items"
                    :key="item.id"
                    class="p-4 flex gap-3 items-center border-b last:border-b-0"
                  >
                    <img
                      :src="item.image"
                      class="rounded w-12 h-12 object-cover"
                      :alt="item.name"
                    />
                    <div class="flex-1">
                      <div class="font-semibold">{{ item.name }}</div>
                      <div class="text-sm text-gray-500">
                        {{ item.quantity }} x {{ item.price.toLocaleString() }} FCFA
                      </div>
                    </div>
                    <button
                      class="text-gray-400 hover:text-red-500"
                      @click="removeCartItem(item.id)"
                    >
                      <span class="material-icons text-base">close</span>
                    </button>
                  </div>
                  <div class="p-4 flex justify-between items-center">
                    <span class="font-bold">Total :</span>
                    <span class="text-[#F4A300] font-bold"
                      >{{ cart.subtotal.toLocaleString() }} FCFA</span
                    >
                  </div>
                  <div class="p-4">
                    <button
                      @click="goToCart"
                      class="w-full bg-[#009966] text-white rounded py-2 font-bold hover:bg-[#0071BC] transition"
                    >
                      Voir le panier
                    </button>
                  </div>
                </div>
                <div v-else class="p-4 text-center text-gray-500">Votre panier est vide.</div>
              </div>
            </transition>
          </div>
          <!-- Wishlist avec aperçu au hover -->
          <div class="relative group">
            <button class="relative group" aria-label="Wishlist">
              <span class="material-icons text-2xl text-[#009966]">favorite_border</span>
            </button>
            <!-- Aperçu wishlist -->
            <div
              class="absolute right-0 mt-2 w-80 bg-white rounded shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition z-50"
            >
              <div class="p-4 border-b font-bold text-[#009966]">Ma wishlist</div>
              <div class="p-4 flex gap-3 items-center border-b">
                <img
                  src="https://placehold.co/60x60/F4A300/fff?text=Prod3"
                  class="rounded"
                  alt="Produit 3"
                />
                <div class="flex-1">
                  <div class="font-semibold">Montre Connectée</div>
                  <div class="text-sm text-gray-500">25 000 FCFA</div>
                </div>
                <button class="text-gray-400 hover:text-red-500">
                  <span class="material-icons text-base">close</span>
                </button>
              </div>
              <div class="p-4 flex gap-3 items-center border-b">
                <img
                  src="https://placehold.co/60x60/0071BC/fff?text=Prod4"
                  class="rounded"
                  alt="Produit 4"
                />
                <div class="flex-1">
                  <div class="font-semibold">Aspirateur Robot</div>
                  <div class="text-sm text-gray-500">80 000 FCFA</div>
                </div>
                <button class="text-gray-400 hover:text-red-500">
                  <span class="material-icons text-base">close</span>
                </button>
              </div>
              <div class="p-4">
                <button
                  class="w-full bg-[#F4A300] text-white rounded py-2 font-bold hover:bg-[#e69500] transition"
                >
                  Voir la wishlist
                </button>
              </div>
            </div>
          </div>
          <!-- Compte utilisateur (dropdown desktop) -->
          <div class="relative hidden md:block">
            <button
              @click="toggleUserDropdown"
              class="relative group"
              aria-label="Compte utilisateur"
            >
              <span class="material-icons text-2xl text-gray-500">person</span>
            </button>
            <!-- Dropdown desktop : ajoute le lien Mon compte en haut -->
            <transition name="fade">
              <div
                v-if="showUserDropdown"
                ref="userDropdownRef"
                class="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg border border-gray-100 z-50 py-2"
              >
                <RouterLink
                  to="/user/dashboard"
                  class="block px-4 py-2 text-[#0071BC] hover:bg-gray-50 font-bold flex items-center gap-2 border-b border-gray-100 mb-1"
                >
                  <span class="material-icons">person</span> Mon compte
                </RouterLink>
                <RouterLink
                  to="/auth/login"
                  class="block px-4 py-2 text-[#0071BC] hover:bg-gray-50 font-semibold"
                  >Connexion</RouterLink
                >
                <RouterLink
                  to="/auth/register"
                  class="block px-4 py-2 text-[#009966] hover:bg-gray-50 font-semibold"
                  >Créer un compte</RouterLink
                >
                <RouterLink
                  to="/auth/forgot-password"
                  class="block px-4 py-2 text-[#F4A300] hover:bg-gray-50 font-medium"
                  >Mot de passe oublié ?</RouterLink
                >
              </div>
            </transition>
          </div>
          <!-- Menu mobile hamburger -->
          <button class="md:hidden ml-2" aria-label="Menu mobile" @click="showMobileMenu = true">
            <span class="material-icons text-3xl">menu</span>
          </button>
        </div>
      </div>
    </header>
    <!-- Menu mobile drawer -->
    <transition name="fade">
      <div v-if="showMobileMenu" class="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
        <div class="bg-white w-4/5 max-w-xs h-full p-6 overflow-y-auto flex flex-col gap-4">
          <div class="flex justify-between items-center mb-4">
            <img src="/src/assets/logo.png" alt="E-Key Market" class="h-8 w-auto" />
            <button @click="showMobileMenu = false" class="text-gray-500 text-2xl">&times;</button>
          </div>
          <RouterLink
            to="/"
            class="py-2 font-semibold text-[#0071BC] hover:text-[#009966]"
            @click="showMobileMenu = false"
            >Accueil</RouterLink
          >
          <RouterLink
            to="/categories"
            class="py-2 font-semibold text-[#0071BC] hover:text-[#009966]"
            @click="showMobileMenu = false"
            >Catégories</RouterLink
          >
          <RouterLink
            to="/user/dashboard"
            class="py-2 font-bold text-[#0071BC] hover:text-[#009966] flex items-center gap-2 border-b border-gray-100 mb-1"
            @click="showMobileMenu = false"
          >
            <span class="material-icons">person</span> Mon compte
          </RouterLink>
          <RouterLink
            to="/auth/login"
            class="py-2 font-semibold text-[#0071BC] hover:text-[#009966]"
            @click="showMobileMenu = false"
            >Connexion</RouterLink
          >
          <RouterLink
            to="/auth/register"
            class="py-2 font-semibold text-[#009966] hover:text-[#0071BC]"
            @click="showMobileMenu = false"
            >Créer un compte</RouterLink
          >
          <RouterLink
            to="/auth/forgot-password"
            class="py-2 font-medium text-[#F4A300] hover:text-[#0071BC]"
            @click="showMobileMenu = false"
            >Mot de passe oublié</RouterLink
          >
          <RouterLink
            to="/auth/reset-password"
            class="py-2 font-medium text-gray-500 hover:text-[#0071BC]"
            @click="showMobileMenu = false"
            >Réinitialiser mot de passe</RouterLink
          >
        </div>
        <div class="flex-1" @click="showMobileMenu = false"></div>
      </div>
    </transition>
    <!-- Bandeau suivi de commande -->
    <div class="bg-[#F4A300] text-white text-center py-2 text-sm">
      📦 Suivi de commande en temps réel | Assistance chat disponible
    </div>
    <!-- Contenu principal -->
    <main class="flex-1">
      <router-view />
    </main>
    <!-- Boutons flottants WhatsApp et retour haut de page -->
    <div class="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">
      <!-- WhatsApp (icône seule) -->
      <a
        href="https://wa.me/2250123456789"
        target="_blank"
        rel="noopener"
        class="bg-green-500 text-white rounded-full shadow-lg p-4 hover:bg-green-600 transition flex items-center"
        aria-label="Discuter sur WhatsApp"
      >
        <i class="fab fa-whatsapp text-2xl"></i>
      </a>
      <!-- Retour haut de page (icône seule) -->
      <button
        @click="scrollToTop"
        class="bg-[#0071BC] text-white rounded-full shadow-lg p-4 hover:bg-[#009966] transition flex items-center"
        aria-label="Retour en haut"
      >
        <span class="material-icons text-2xl">arrow_upward</span>
      </button>
    </div>
    <!-- Footer complet -->
    <footer class="bg-gray-900 text-white mt-12 pt-10 pb-6 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <img src="/src/assets/logo.png" alt="E-Key Market" class="h-10 mb-2" />
          <p class="text-sm">
            Votre marketplace de confiance pour tous vos achats en ligne en Afrique.
          </p>
        </div>
        <div>
          <h4 class="font-bold mb-2">Liens utiles</h4>
          <ul class="space-y-1 text-sm">
            <li><a href="#" class="hover:underline">Accueil</a></li>
            <li><a href="#" class="hover:underline">Catégories</a></li>
            <li><a href="#" class="hover:underline">Contact</a></li>
            <li><a href="#" class="hover:underline">FAQ</a></li>
            <li><a href="#" class="hover:underline">Mentions légales</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-2">Contact</h4>
          <ul class="space-y-1 text-sm">
            <li>Email : contact@ekeymarket.com</li>
            <li>Tél : +225 01 23 45 67 89</li>
            <li>WhatsApp : +225 07 89 65 43 21</li>
          </ul>
          <div class="flex gap-2 mt-2">
            <i class="fab fa-facebook-f"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-linkedin-in"></i>
          </div>
        </div>
        <div>
          <h4 class="font-bold mb-2">Paiements acceptés</h4>
          <div class="flex gap-2 items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Orange_Money_logo.svg"
              alt="Orange Money"
              class="h-8 bg-white rounded p-1"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2b/MTN_Group_Logo.svg"
              alt="MTN MoMo"
              class="h-8 bg-white rounded p-1"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
              alt="Visa"
              class="h-8 bg-white rounded p-1"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
              alt="Mastercard"
              class="h-8 bg-white rounded p-1"
            />
          </div>
        </div>
      </div>
      <div class="text-center text-xs text-gray-400 mt-8">
        © 2024 E-Key Market. Tous droits réservés.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useCartStore } from '../stores/cart'
const showMobileMenu = ref(false)
const cart = useCartStore()
const router = useRouter()
const showCartPreview = ref(false)
let cartPreviewRef = null
const showUserDropdown = ref(false)
let userDropdownRef = null

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function goToCart() {
  router.push('/panier')
  showCartPreview.value = false
}
function removeCartItem(id) {
  cart.removeFromCart(id)
}
function toggleCartPreview() {
  showCartPreview.value = !showCartPreview.value
}
function toggleUserDropdown() {
  showUserDropdown.value = !showUserDropdown.value
}
function handleUserDropdownClickOutside(event) {
  if (showUserDropdown.value && userDropdownRef && !userDropdownRef.contains(event.target)) {
    showUserDropdown.value = false
  }
}
function handleUserDropdownEsc(event) {
  if (showUserDropdown.value && event.key === 'Escape') {
    showUserDropdown.value = false
  }
}
function handleClickOutside(event) {
  if (showCartPreview.value && cartPreviewRef && !cartPreviewRef.contains(event.target)) {
    showCartPreview.value = false
  }
}
onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('mousedown', handleUserDropdownClickOutside)
  document.addEventListener('keydown', handleUserDropdownEsc)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('mousedown', handleUserDropdownClickOutside)
  document.removeEventListener('keydown', handleUserDropdownEsc)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
.font-sans {
  font-family: 'Poppins', 'Open Sans', Arial, sans-serif;
}
.material-icons {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: normal;
  font-size: inherit;
  display: inline-block;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
}
.cart-fade-slide-enter-active,
.cart-fade-slide-leave-active {
  transition: opacity 0.25s, transform 0.25s;
}
.cart-fade-slide-enter-from,
.cart-fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.cart-fade-slide-enter-to,
.cart-fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
