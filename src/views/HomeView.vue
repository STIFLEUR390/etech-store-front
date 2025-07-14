<script setup>
import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useProductsStore } from '../stores/products'

// Slider dynamique fictif
const slides = ref([
  {
    img: 'https://placehold.co/1200x400/0071BC/fff?text=Promo+1',
    title: "Ventes Flash d'Été",
    desc: "Jusqu'à -50% sur l'électronique et la mode",
    cta: 'Découvrir',
  },
  {
    img: 'https://placehold.co/1200x400/009966/fff?text=Promo+2',
    title: 'Livraison Gratuite',
    desc: 'Profitez de la livraison offerte dès 50 000 FCFA',
    cta: 'Acheter maintenant',
  },
  {
    img: 'https://placehold.co/1200x400/F4A300/fff?text=Promo+3',
    title: 'Nouveautés Mode',
    desc: 'Découvrez les dernières tendances',
    cta: 'Voir la collection',
  },
])
const currentSlide = ref(0)
onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }, 3500)
})

// Catégories fictives
const categories = [
  { name: 'Électronique', img: 'https://placehold.co/100x100/009966/fff?text=TV' },
  { name: 'Mode', img: 'https://placehold.co/100x100/F4A300/fff?text=Mode' },
  { name: 'Maison', img: 'https://placehold.co/100x100/0071BC/fff?text=Maison' },
  { name: 'Beauté', img: 'https://placehold.co/100x100/009966/fff?text=Beauté' },
  { name: 'Sports', img: 'https://placehold.co/100x100/F4A300/fff?text=Sport' },
  { name: 'Informatique', img: 'https://placehold.co/100x100/0071BC/fff?text=PC' },
]

const productsStore = useProductsStore()
onMounted(() => {
  productsStore.generateProducts()
})

const produits = computed(() => productsStore.getProducts.slice(0, 6))
const produitsVedettes = computed(() => produits.value.slice(0, 4))
const produitsNouveautes = computed(() => produits.value.slice(2, 6))

// Témoignages fictifs
const avis = [
  {
    nom: 'A. Bamba',
    img: 'https://placehold.co/80x80/0071BC/fff?text=AB',
    note: 5,
    texte: 'Livraison rapide et produits de qualité, je recommande vivement !',
  },
  {
    nom: 'M. Koné',
    img: 'https://placehold.co/80x80/009966/fff?text=MK',
    note: 5,
    texte: "Service client très réactif, j'ai eu toutes mes réponses rapidement.",
  },
  {
    nom: 'Y. Akissi',
    img: 'https://placehold.co/80x80/F4A300/fff?text=YA',
    note: 5,
    texte: "Des promos incroyables, j'ai fait de super économies !",
  },
]

// Partenaires fictifs
const partenaires = [
  {
    nom: 'Orange',
    img: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Orange_Money_logo.svg',
  },
  { nom: 'MTN', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/MTN_Group_Logo.svg' },
  { nom: 'Visa', img: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png' },
  {
    nom: 'Mastercard',
    img: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
  },
]

// FAQ fictive
const faq = [
  {
    q: 'Quels sont les moyens de paiement acceptés ?',
    r: 'Orange Money, MTN MoMo, Visa, Mastercard, Mobile Money.',
  },
  { q: 'Quels sont les délais de livraison ?', r: 'Livraison sous 24 à 72h selon la zone.' },
  {
    q: 'Comment suivre ma commande ?',
    r: 'Depuis votre compte ou via le bandeau de suivi en haut du site.',
  },
]
</script>

<template>
  <div>
    <!-- Hero Section : slider dynamique -->
    <section class="relative overflow-hidden">
      <div
        class="relative h-96 md:h-[500px] w-full flex items-center justify-center bg-gradient-to-r from-[#0071BC] to-[#009966]"
      >
        <transition-group name="fade" tag="div">
          <div
            v-for="(slide, i) in slides"
            :key="i"
            v-show="currentSlide === i"
            class="absolute inset-0 flex flex-col items-center justify-center z-10"
          >
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow">
              {{ slide.title }}
            </h1>
            <p class="text-xl text-white mb-6 drop-shadow">{{ slide.desc }}</p>
            <button
              class="bg-[#F4A300] hover:bg-[#e69500] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105 mb-4"
            >
              {{ slide.cta }}
            </button>
          </div>
        </transition-group>
        <img
          :src="slides[currentSlide].img"
          alt="Slider"
          class="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      </div>
    </section>

    <!-- Catégories populaires -->
    <section class="max-w-7xl mx-auto py-12 px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-[#0071BC]">Catégories populaires</h2>
        <RouterLink
          to="/categories"
          class="bg-[#009966] text-white px-4 py-2 rounded hover:bg-[#0071BC] transition"
        >
          Explorer toutes les catégories
        </RouterLink>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-6 gap-6">
        <RouterLink
          v-for="cat in categories"
          :key="cat.name"
          to="/categories"
          class="flex flex-col items-center bg-white rounded-lg shadow p-4 hover:shadow-lg transition group cursor-pointer"
        >
          <img
            :src="cat.img"
            :alt="cat.name"
            class="mb-2 rounded-full group-hover:scale-110 transition"
          />
          <span class="font-semibold group-hover:text-[#009966]">{{ cat.name }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- Ventes Flash & Offres spéciales -->
    <section class="max-w-7xl mx-auto py-12 px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-[#F4A300]">Ventes Flash</h2>
        <div class="flex items-center gap-2 text-2xl font-mono text-[#F4A300]">
          <span>00</span><span>:</span><span>45</span><span>:</span><span>12</span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="prod in produitsVedettes"
          :key="prod.id"
          class="bg-white rounded-lg shadow p-4 flex flex-col relative"
        >
          <RouterLink :to="`/produit/${prod.id}`">
            <img
              :src="prod.image"
              :alt="prod.name"
              class="rounded mb-2 cursor-pointer hover:opacity-80 transition"
            />
          </RouterLink>
          <RouterLink
            :to="`/produit/${prod.id}`"
            class="font-semibold mb-1 hover:text-[#0071BC] transition cursor-pointer block"
            >{{ prod.name }}</RouterLink
          >
          <span class="text-yellow-400 mb-1">{{
            '★'.repeat(Math.round(prod.rating)) + '☆'.repeat(5 - Math.round(prod.rating))
          }}</span>
          <span class="text-[#F4A300] font-bold mb-2">{{ prod.price }} XAF</span>
          <button
            class="bg-[#009966] text-white rounded py-2 mt-auto hover:bg-[#0071BC] transition"
          >
            Ajouter au panier
          </button>
          <RouterLink
            :to="`/produit/${prod.id}`"
            class="mt-2 inline-block bg-[#0071BC] text-white px-3 py-1 rounded hover:bg-[#009966] transition text-sm font-semibold text-center"
            >Voir le produit</RouterLink
          >
        </div>
      </div>
    </section>

    <!-- Sélection de produits : carrousel nouveautés -->
    <section class="max-w-7xl mx-auto py-12 px-4">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-[#0071BC]">Nouveautés</h2>
        <button class="bg-[#F4A300] text-white px-4 py-2 rounded hover:bg-[#e69500] transition">
          Voir toutes
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div
          v-for="prod in produitsNouveautes"
          :key="prod.id"
          class="bg-white rounded-lg shadow p-4 flex flex-col"
        >
          <RouterLink :to="`/produit/${prod.id}`">
            <img
              :src="prod.image"
              :alt="prod.name"
              class="rounded mb-2 cursor-pointer hover:opacity-80 transition"
            />
          </RouterLink>
          <span class="font-semibold mb-1">{{ prod.name }}</span>
          <span class="text-yellow-400 mb-1">{{
            '★'.repeat(Math.round(prod.rating)) + '☆'.repeat(5 - Math.round(prod.rating))
          }}</span>
          <span class="text-[#F4A300] font-bold mb-2">{{ prod.price }} XAF</span>
          <button
            class="bg-[#009966] text-white rounded py-2 mt-auto hover:bg-[#0071BC] transition"
          >
            Ajouter au panier
          </button>
          <RouterLink
            :to="`/produit/${prod.id}`"
            class="mt-2 inline-block bg-[#0071BC] text-white px-3 py-1 rounded hover:bg-[#009966] transition text-sm font-semibold text-center"
            >Voir le produit</RouterLink
          >
        </div>
      </div>
    </section>

    <!-- Avis clients -->
    <section class="max-w-7xl mx-auto py-12 px-4">
      <h2 class="text-2xl font-bold mb-6 text-[#0071BC]">Avis clients</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="a in avis"
          :key="a.nom"
          class="bg-white rounded-lg shadow p-6 flex flex-col items-center"
        >
          <img :src="a.img" :alt="a.nom" class="rounded-full mb-2" />
          <div class="flex text-yellow-400 mb-2">{{ '★'.repeat(a.note) }}</div>
          <p class="text-center text-gray-600 mb-2">"{{ a.texte }}"</p>
          <span class="font-semibold">{{ a.nom }}</span>
        </div>
      </div>
    </section>

    <!-- Partenaires / certifications -->
    <section class="max-w-7xl mx-auto py-12 px-4">
      <h2 class="text-2xl font-bold mb-6 text-[#0071BC]">Ils nous font confiance</h2>
      <div class="flex flex-wrap gap-6 items-center justify-center">
        <img
          v-for="p in partenaires"
          :key="p.nom"
          :src="p.img"
          :alt="p.nom"
          class="h-12 bg-white rounded p-2 shadow"
        />
      </div>
    </section>

    <!-- Newsletter & fidélisation -->
    <section class="max-w-7xl mx-auto py-12 px-4">
      <div
        class="bg-[#0071BC] rounded-lg p-8 flex flex-col md:flex-row items-center justify-between"
      >
        <div class="mb-4 md:mb-0">
          <h3 class="text-white text-2xl font-bold mb-2">Inscrivez-vous à la newsletter</h3>
          <p class="text-white">
            Recevez -5% sur votre première commande et nos offres exclusives chaque semaine !
          </p>
        </div>
        <form class="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <input
            type="email"
            placeholder="Votre email"
            class="rounded px-4 py-2 focus:outline-none"
          />
          <button
            type="submit"
            class="bg-[#F4A300] text-white rounded px-6 py-2 font-bold hover:bg-[#e69500] transition"
          >
            S'inscrire
          </button>
        </form>
      </div>
      <div
        class="mt-8 bg-white rounded-lg p-8 flex flex-col md:flex-row items-center justify-between shadow"
      >
        <div class="mb-4 md:mb-0">
          <h3 class="text-[#0071BC] text-xl font-bold mb-2">Programme fidélité & Parrainage</h3>
          <p class="text-gray-700">
            Cumulez des points à chaque achat et parrainez vos amis pour gagner des bons d'achat !
          </p>
        </div>
        <button class="bg-[#009966] text-white px-6 py-2 rounded hover:bg-[#0071BC] transition">
          En savoir plus
        </button>
      </div>
    </section>

    <!-- Pourquoi choisir E-Key Market & FAQ -->
    <section class="max-w-7xl mx-auto py-12 px-4">
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h2 class="text-2xl font-bold mb-6 text-[#0071BC]">Pourquoi choisir E-Key Market ?</h2>
          <ul class="space-y-4">
            <li class="flex items-center gap-3">
              <span class="material-icons text-3xl text-[#009966]">local_shipping</span> Livraison
              rapide et gratuite
            </li>
            <li class="flex items-center gap-3">
              <span class="material-icons text-3xl text-[#0071BC]">security</span> Paiement mobile
              sécurisé
            </li>
            <li class="flex items-center gap-3">
              <span class="material-icons text-3xl text-[#F4A300]">support_agent</span> Support
              client 24/7
            </li>
            <li class="flex items-center gap-3">
              <span class="material-icons text-3xl text-[#009966]">verified_user</span> Garantie
              satisfait ou remboursé
            </li>
          </ul>
        </div>
        <div>
          <h2 class="text-2xl font-bold mb-6 text-[#0071BC]">FAQ</h2>
          <div v-for="(item, i) in faq" :key="i" class="mb-4">
            <div class="font-semibold">Q. {{ item.q }}</div>
            <div class="text-gray-700">R. {{ item.r }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
