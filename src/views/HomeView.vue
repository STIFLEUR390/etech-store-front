<script setup>
// Rien à déclarer pour l’instant
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div
        class="relative h-96 md:h-[500px] w-full flex items-center justify-center bg-gradient-to-r from-[#0071BC] to-[#009966]"
      >
        <div class="text-center px-4 z-10">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">Ventes Flash d'Été</h1>
          <p class="text-xl text-white mb-6">Jusqu'à -50% sur l'électronique et la mode</p>
          <button
            class="bg-[#F4A300] hover:bg-[#e69500] text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
          >
            Découvrir les offres
          </button>
        </div>
      </div>
    </section>
    <!-- Catégories populaires -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">Catégories Populaires</h2>
        <p class="mt-2 text-lg text-gray-600">Parcourez nos catégories les plus demandées</p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
          <div
            class="w-16 h-16 bg-[#0071BC]/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span class="material-icons text-[#0071BC] text-2xl">smartphone</span>
          </div>
          <h3 class="font-medium text-gray-900">Smartphones</h3>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
          <div
            class="w-16 h-16 bg-[#009966]/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span class="material-icons text-[#009966] text-2xl">laptop</span>
          </div>
          <h3 class="font-medium text-gray-900">Ordinateurs</h3>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
          <div
            class="w-16 h-16 bg-[#F4A300]/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span class="material-icons text-[#F4A300] text-2xl">checkroom</span>
          </div>
          <h3 class="font-medium text-gray-900">Mode</h3>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
          <div
            class="w-16 h-16 bg-[#0071BC]/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span class="material-icons text-[#0071BC] text-2xl">home</span>
          </div>
          <h3 class="font-medium text-gray-900">Maison</h3>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
          <div
            class="w-16 h-16 bg-[#009966]/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span class="material-icons text-[#009966] text-2xl">sports_basketball</span>
          </div>
          <h3 class="font-medium text-gray-900">Sports</h3>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center">
          <div
            class="w-16 h-16 bg-[#F4A300]/10 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span class="material-icons text-[#F4A300] text-2xl">face_retouching_natural</span>
          </div>
          <h3 class="font-medium text-gray-900">Beauté</h3>
        </div>
      </div>
    </section>
    <!-- Produits vedettes -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 rounded-xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">Produits Vedettes</h2>
        <p class="mt-2 text-lg text-gray-600">Nos produits les plus populaires du moment</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="bg-white rounded-xl overflow-hidden shadow-sm transition">
          <div class="relative pb-[100%] bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=500&q=80"
              alt="Smartphone"
              class="absolute h-full w-full object-contain p-4"
            />
            <div
              class="absolute top-2 right-2 bg-[#F4A300] text-white text-xs font-bold px-2 py-1 rounded-full"
            >
              -20%
            </div>
          </div>
          <div class="p-4">
            <h3 class="font-medium text-gray-900 mb-1">Samsung Galaxy S23</h3>
            <div class="flex items-center mb-2">
              <div class="flex text-yellow-400">
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star_half</span>
              </div>
              <span class="text-gray-500 text-sm ml-1">(48)</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <span class="text-lg font-bold text-[#0071BC]">450 000 FCFA</span>
                <span class="text-sm text-gray-500 line-through ml-1">550 000 FCFA</span>
              </div>
              <button
                class="bg-[#009966] hover:bg-[#008055] text-white p-2 rounded-full transition"
              >
                <span class="material-icons">shopping_cart</span>
              </button>
            </div>
          </div>
        </div>
        <!-- Répéter pour d'autres produits... -->
      </div>
    </section>
    <!-- Ventes Flash -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="bg-gradient-to-r from-[#0071BC] to-[#009966] rounded-xl p-8 text-white">
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 class="text-3xl font-bold mb-2">Ventes Flash</h2>
            <p class="text-lg">Offres limitées dans le temps - Ne ratez pas l'occasion !</p>
          </div>
          <div class="mt-4 md:mt-0">
            <div class="flex items-center bg-black/20 rounded-lg p-3">
              <div class="text-center px-3">
                <div class="text-2xl font-bold">12</div>
                <div class="text-xs uppercase">Heures</div>
              </div>
              <div class="text-2xl font-bold">:</div>
              <div class="text-center px-3">
                <div class="text-2xl font-bold">34</div>
                <div class="text-xs uppercase">Minutes</div>
              </div>
              <div class="text-2xl font-bold">:</div>
              <div class="text-center px-3">
                <div class="text-2xl font-bold">56</div>
                <div class="text-xs uppercase">Secondes</div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            class="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center border border-white/20"
          >
            <div class="w-24 h-24 bg-white rounded-lg flex-shrink-0 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=500&q=80"
                alt="Casque Audio"
                class="w-full h-full object-contain"
              />
            </div>
            <div class="ml-4">
              <h3 class="font-medium">Casque Audio Sans Fil</h3>
              <div class="flex items-center mt-1 text-yellow-400">
                <span class="material-icons text-xs">star</span>
                <span class="material-icons text-xs">star</span>
                <span class="material-icons text-xs">star</span>
                <span class="material-icons text-xs">star</span>
                <span class="material-icons text-xs">star_half</span>
              </div>
              <div class="mt-2">
                <span class="font-bold">45 000 FCFA</span>
                <span class="text-sm line-through ml-1">60 000 FCFA</span>
              </div>
            </div>
          </div>
          <!-- Répéter pour d'autres ventes flash... -->
        </div>
      </div>
    </section>
    <!-- Témoignages clients -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">Avis de nos clients</h2>
        <p class="mt-2 text-lg text-gray-600">Des milliers de clients satisfaits !</p>
      </div>
      <div class="flex overflow-x-auto space-x-6 pb-4">
        <div class="flex-shrink-0 bg-white rounded-xl shadow-sm p-6 w-80">
          <div class="flex items-center mb-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Client"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div class="ml-4">
              <h4 class="font-medium">Amina Diallo</h4>
              <div class="flex text-yellow-400 text-sm">
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
                <span class="material-icons">star</span>
              </div>
            </div>
          </div>
          <p class="text-gray-600">
            "Commande reçue le lendemain, produit conforme et bien emballé. Je recommande !"
          </p>
        </div>
        <!-- Répéter pour d'autres témoignages... -->
      </div>
    </section>
    <!-- Avantages -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 rounded-xl">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-xl shadow-sm flex items-start">
          <div class="bg-[#0071BC]/10 p-3 rounded-full mr-4">
            <span class="material-icons text-[#0071BC] text-xl">local_shipping</span>
          </div>
          <div>
            <h3 class="font-bold text-lg text-gray-900 mb-2">Livraison gratuite</h3>
            <p class="text-gray-600">Livraison offerte dès 50 000 FCFA partout au pays.</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm flex items-start">
          <div class="bg-[#009966]/10 p-3 rounded-full mr-4">
            <span class="material-icons text-[#009966] text-xl">lock</span>
          </div>
          <div>
            <h3 class="font-bold text-lg text-gray-900 mb-2">Paiement sécurisé</h3>
            <p class="text-gray-600">
              Payez en toute sécurité avec Orange Money, mobile money ou carte bancaire.
            </p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-sm flex items-start">
          <div class="bg-[#F4A300]/10 p-3 rounded-full mr-4">
            <span class="material-icons text-[#F4A300] text-xl">headset_mic</span>
          </div>
          <div>
            <h3 class="font-bold text-lg text-gray-900 mb-2">Support 24/7</h3>
            <p class="text-gray-600">Notre équipe est disponible à tout moment pour vous aider.</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Newsletter -->
    <section class="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        class="bg-gradient-to-r from-[#0071BC] to-[#009966] rounded-xl p-8 text-center text-white"
      >
        <h2 class="text-3xl font-bold mb-4">Abonnez-vous à la newsletter</h2>
        <p class="text-lg mb-6 max-w-2xl mx-auto">
          Recevez les nouveautés, offres spéciales et bons plans directement dans votre boîte mail.
        </p>
        <div class="flex flex-col sm:flex-row justify-center max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre adresse email"
            class="px-4 py-3 rounded-full w-full sm:rounded-r-none focus:outline-none text-gray-900"
          />
          <button
            class="bg-[#F4A300] hover:bg-[#e69500] text-white font-bold py-3 px-6 rounded-full sm:rounded-l-none mt-2 sm:mt-0 transition"
          >
            S'abonner
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
</style>
