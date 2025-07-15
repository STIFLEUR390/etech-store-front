<template>
  <div class="max-w-3xl mx-auto py-8 px-2">
    <h1 class="text-2xl font-bold text-[#0071BC] mb-6">Détail de la commande #129818276</h1>
    <div class="bg-white rounded-2xl shadow p-6 mb-6">
      <div class="flex flex-col sm:flex-row sm:justify-between mb-4">
        <div>
          <div class="text-sm text-gray-500">Date : 25/05/2024</div>
          <div class="text-sm text-gray-500">
            Statut : <span class="text-[#F4A300] font-bold">En attente</span>
          </div>
        </div>
        <div class="mt-2 sm:mt-0">
          <span class="bg-[#F4A300] text-white px-3 py-1 rounded text-xs">En attente</span>
        </div>
      </div>
      <div class="mb-4">
        <h2 class="font-bold text-[#0071BC] mb-2">Produits</h2>
        <ul class="divide-y">
          <li v-for="item in orderItems" :key="item.name" class="flex items-center py-3 gap-3">
            <img :src="item.img" class="w-16 h-16 object-cover rounded" :alt="item.name" />
            <div class="flex-1">
              <div class="font-semibold">{{ item.name }}</div>
              <div class="text-sm text-gray-500">Quantité : {{ item.qty }}</div>
            </div>
            <div class="font-bold text-[#0071BC]">{{ item.price }} FCFA</div>
          </li>
        </ul>
      </div>
      <div class="flex flex-col sm:flex-row sm:justify-between gap-4 mb-4">
        <div>
          <div class="font-bold text-[#009966]">Adresse de livraison</div>
          <div class="text-sm text-gray-600">Jean Dupont<br />Abidjan, Cocody<br />0700000000</div>
        </div>
        <div class="text-right">
          <div class="font-bold">Total :</div>
          <div class="text-2xl text-[#0071BC] font-bold">{{ orderTotal }} FCFA</div>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-bold text-[#0071BC] mb-2">Suivi de livraison</div>
        <div class="w-full bg-gray-200 rounded-full h-3 mb-1">
          <div class="bg-[#F4A300] h-3 rounded-full" style="width: 30%"></div>
        </div>
        <div class="text-xs text-gray-500">Commande en attente de traitement</div>
      </div>
      <RouterLink
        to="/user/orders"
        class="inline-block mt-4 bg-[#0071BC] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#005fa3] transition"
        >Retour à l’historique</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
const orderItems = [
  {
    name: 'Casque Bluetooth',
    img: 'https://placehold.co/64x64/0071BC/fff?text=Prod1',
    qty: 1,
    price: '400',
  },
  {
    name: 'Montre connectée',
    img: 'https://placehold.co/64x64/009966/fff?text=Prod2',
    qty: 2,
    price: '324',
  },
]
const orderTotal = 400 + 324 * 2
</script>
