<template>
  <div class="min-h-screen flex flex-col bg-gray-50 font-sans">
    <!-- Barre d'annonce -->
    <div class="bg-[#0071BC] text-white text-center py-2 px-4 text-sm">
      🚀 Livraison gratuite dès 50 000 FCFA | ⏳ Ventes flash en cours !
    </div>
    <!-- Navigation principale -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="flex items-center select-none">
            <img src="/src/assets/logo.png" alt="E-Key Market" class="h-10 w-10 mr-2" />
            <span class="text-[#0071BC] font-bold text-2xl">E-Key</span>
            <span class="text-[#009966] font-bold text-2xl ml-1">Market</span>
          </div>
          <!-- Menu catégories -->
          <nav class="hidden md:flex space-x-6 ml-8">
            <a href="#" class="text-gray-900 font-medium hover:text-[#0071BC] transition"
              >Accueil</a
            >
            <a href="#" class="text-gray-500 hover:text-[#0071BC] transition">Électronique</a>
            <a href="#" class="text-gray-500 hover:text-[#0071BC] transition">Mode</a>
            <a href="#" class="text-gray-500 hover:text-[#0071BC] transition">Maison</a>
            <a href="#" class="text-gray-500 hover:text-[#0071BC] transition">Beauté</a>
          </nav>
          <!-- Barre de recherche -->
          <div class="flex-1 px-4 hidden md:block">
            <div class="relative">
              <input
                type="text"
                placeholder="Rechercher des produits..."
                class="w-full rounded-full border border-gray-300 pl-10 pr-4 py-2 focus:ring-[#0071BC] focus:border-[#0071BC] transition"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="material-icons text-gray-400 text-xl">search</span>
              </div>
            </div>
          </div>
          <!-- Icônes utilisateur/panier -->
          <div class="flex items-center space-x-4">
            <button
              class="p-2 rounded-full text-gray-400 hover:text-[#0071BC] focus:outline-none transition"
            >
              <span class="material-icons text-lg">person</span>
            </button>
            <button
              class="p-2 rounded-full text-gray-400 hover:text-[#0071BC] focus:outline-none relative transition"
            >
              <span class="material-icons text-lg">shopping_cart</span>
              <span
                class="absolute -top-1 -right-1 bg-[#F4A300] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >3</span
              >
            </button>
          </div>
        </div>
      </div>
    </header>
    <!-- Contenu principal -->
    <main class="flex-1">
      <router-view />
    </main>
    <!-- Footer -->
    <footer class="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8 mt-12">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center mb-4 select-none">
              <img src="/src/assets/logo.png" alt="E-Key Market" class="h-10 w-10 mr-2" />
              <span class="text-[#0071BC] font-bold text-2xl">E-Key</span>
              <span class="text-[#009966] font-bold text-2xl ml-1">Market</span>
            </div>
            <p class="text-gray-400 mb-4">
              Votre marketplace de confiance pour des produits de qualité à prix abordable.
            </p>
            <div class="flex space-x-4 mt-2">
              <a href="#" class="text-gray-400 hover:text-white transition"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="#" class="text-gray-400 hover:text-white transition"
                ><i class="fab fa-twitter"></i
              ></a>
              <a href="#" class="text-gray-400 hover:text-white transition"
                ><i class="fab fa-instagram"></i
              ></a>
              <a href="#" class="text-gray-400 hover:text-white transition"
                ><i class="fab fa-linkedin-in"></i
              ></a>
            </div>
          </div>
          <div>
            <h3 class="text-lg font-medium mb-4">Boutique</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition">Tous les produits</a>
              </li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Nouveautés</a></li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition">Ventes Flash</a>
              </li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Promotions</a></li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-medium mb-4">Service client</h3>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white transition">Contact</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">FAQ</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Livraison</a></li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition"
                  >Retours & Remboursements</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-medium mb-4">À propos</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition">Notre histoire</a>
              </li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Carrières</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white transition">Conditions</a></li>
              <li>
                <a href="#" class="text-gray-400 hover:text-white transition">Confidentialité</a>
              </li>
            </ul>
          </div>
        </div>
        <div
          class="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <p class="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 E-Key Market. Tous droits réservés.
          </p>
          <div class="flex space-x-6">
            <img src="/src/assets/logo.png" alt="Visa" class="h-8" />
            <img src="/src/assets/logo.png" alt="Mastercard" class="h-8" />
            <img src="/src/assets/logo.png" alt="Orange Money" class="h-8" />
            <img src="/src/assets/logo.png" alt="SSL Secure" class="h-8" />
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Rien à déclarer pour l’instant
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
</style>
