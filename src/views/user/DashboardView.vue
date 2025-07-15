<template>
  <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
    <!-- Sidebar navigation -->
    <aside class="hidden md:block w-64 bg-white shadow-lg p-6">
      <h2 class="text-xl font-bold text-[#0071BC] mb-6">Mon compte</h2>
      <nav class="flex flex-col gap-4">
        <RouterLink
          to="/user/orders"
          class="font-semibold hover:text-[#0071BC] flex items-center gap-2"
          ><span class="material-icons">receipt_long</span> Mes commandes</RouterLink
        >
        <RouterLink
          to="/user/wishlist"
          class="font-semibold hover:text-[#0071BC] flex items-center gap-2"
          ><span class="material-icons">favorite_border</span> Wishlist</RouterLink
        >
        <RouterLink
          to="/user/profile"
          class="font-semibold hover:text-[#0071BC] flex items-center gap-2"
          ><span class="material-icons">person</span> Profil</RouterLink
        >
        <RouterLink
          to="/user/loyalty"
          class="font-semibold hover:text-[#0071BC] flex items-center gap-2"
          ><span class="material-icons">star</span> Fidélité</RouterLink
        >
      </nav>
    </aside>
    <!-- Main dashboard -->
    <main class="flex-1 p-4 md:p-8">
      <div class="mb-6">
        <h1 class="text-2xl font-bold text-[#0071BC]">Bienvenue, Jean !</h1>
        <p class="text-gray-600">Voici un aperçu de votre compte E-Key Market.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <!-- Commandes récentes -->
        <div class="bg-white rounded-2xl shadow p-6 flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-icons text-[#0071BC]">receipt_long</span>
            <span class="font-bold">Commandes récentes</span>
          </div>
          <ul class="space-y-2">
            <li class="flex items-center justify-between">
              <span>Commande #1234</span>
              <span class="text-xs bg-[#009966] text-white px-2 py-1 rounded">Livrée</span>
            </li>
            <li class="flex items-center justify-between">
              <span>Commande #1235</span>
              <span class="text-xs bg-[#F4A300] text-white px-2 py-1 rounded">En cours</span>
            </li>
          </ul>
        </div>
        <!-- Recommandations produits -->
        <div class="bg-white rounded-2xl shadow p-6 flex flex-col">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-icons text-[#0071BC]">thumb_up</span>
            <span class="font-bold">Recommandés pour vous</span>
          </div>
          <div class="flex gap-2 overflow-x-auto pb-2">
            <div
              v-for="n in 3"
              :key="n"
              class="min-w-[100px] bg-gray-100 rounded p-2 flex flex-col items-center"
            >
              <img
                :src="`https://placehold.co/80x80/0071BC/fff?text=Prod${n}`"
                class="rounded mb-1"
              />
              <span class="text-xs font-semibold">Produit {{ n }}</span>
              <span class="text-xs text-[#0071BC]">12 000 FCFA</span>
            </div>
          </div>
        </div>
        <!-- Points fidélité -->
        <div class="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <div class="flex items-center gap-2 mb-2">
            <span class="material-icons text-[#F4A300]">star</span>
            <span class="font-bold">Points fidélité</span>
          </div>
          <span class="text-3xl font-bold text-[#009966] mb-2">320</span>
          <div class="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div class="bg-[#009966] h-3 rounded-full" style="width: 64%"></div>
          </div>
          <span class="text-xs text-gray-500">Niveau Argent - 500 pts pour le prochain palier</span>
        </div>
      </div>
      <!-- Section 10 dernières commandes -->
      <div class="bg-white rounded-2xl shadow p-6 mt-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-[#0071BC]">Mes 10 dernières commandes</h2>
          <RouterLink to="/user/orders" class="text-sm text-[#0071BC] hover:underline"
            >Voir tout</RouterLink
          >
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="text-gray-600 border-b">
                <th class="py-2">Commande</th>
                <th class="py-2">Date</th>
                <th class="py-2">Statut</th>
                <th class="py-2">Total</th>
                <th class="py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in lastOrders" :key="order.id" class="border-b last:border-b-0">
                <td class="py-2 font-semibold">#{{ order.id }}</td>
                <td class="py-2">{{ order.date }}</td>
                <td class="py-2">
                  <span
                    :class="{
                      'text-[#F4A300] font-bold': order.status === 'pending',
                      'text-[#009966] font-bold': order.status === 'delivered',
                      'text-[#0071BC] font-bold': order.status === 'shipped',
                    }"
                    >{{ order.statusLabel }}</span
                  >
                </td>
                <td class="py-2">{{ order.total }} FCFA</td>
                <td class="py-2">
                  <RouterLink
                    :to="`/user/orders?order=${order.id}`"
                    class="text-[#0071BC] hover:underline text-sm"
                    >Détails</RouterLink
                  >
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!lastOrders.length" class="text-center text-gray-500 py-8">
            Aucune commande récente.
          </div>
        </div>
      </div>
      <!-- Mobile navigation (tabs) -->
      <nav
        class="md:hidden flex justify-around bg-white rounded-xl shadow p-2 mb-6 sticky top-0 z-30"
      >
        <RouterLink
          to="/user/orders"
          class="flex flex-col items-center text-xs font-semibold text-[#0071BC]"
        >
          <span class="material-icons">receipt_long</span> Commandes
        </RouterLink>
        <RouterLink
          to="/user/wishlist"
          class="flex flex-col items-center text-xs font-semibold text-[#0071BC]"
        >
          <span class="material-icons">favorite_border</span> Wishlist
        </RouterLink>
        <RouterLink
          to="/user/profile"
          class="flex flex-col items-center text-xs font-semibold text-[#0071BC]"
        >
          <span class="material-icons">person</span> Profil
        </RouterLink>
        <RouterLink
          to="/user/loyalty"
          class="flex flex-col items-center text-xs font-semibold text-[#0071BC]"
        >
          <span class="material-icons">star</span> Fidélité
        </RouterLink>
      </nav>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
const lastOrders = [
  {
    id: '129818276',
    date: '25/05/2024',
    status: 'pending',
    statusLabel: 'En attente',
    total: '724',
  },
  {
    id: '676515234',
    date: '19/05/2024',
    status: 'pending',
    statusLabel: 'En attente',
    total: '876',
  },
  {
    id: '091827653',
    date: '14/05/2024',
    status: 'pending',
    statusLabel: 'En attente',
    total: '1002',
  },
  { id: '123456789', date: '10/05/2024', status: 'delivered', statusLabel: 'Livrée', total: '540' },
  {
    id: '987654321',
    date: '05/05/2024',
    status: 'shipped',
    statusLabel: 'En livraison',
    total: '320',
  },
  {
    id: '112233445',
    date: '01/05/2024',
    status: 'pending',
    statusLabel: 'En attente',
    total: '1500',
  },
  { id: '556677889', date: '28/04/2024', status: 'delivered', statusLabel: 'Livrée', total: '210' },
  {
    id: '998877665',
    date: '22/04/2024',
    status: 'pending',
    statusLabel: 'En attente',
    total: '430',
  },
  {
    id: '443322110',
    date: '18/04/2024',
    status: 'shipped',
    statusLabel: 'En livraison',
    total: '980',
  },
  { id: '667788990', date: '12/04/2024', status: 'delivered', statusLabel: 'Livrée', total: '670' },
]
</script>
