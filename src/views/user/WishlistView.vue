<template>
  <div class="max-w-5xl mx-auto py-8 px-2">
    <h1 class="text-2xl font-bold text-[#0071BC] mb-6">Ma wishlist</h1>
    <div class="bg-white rounded-2xl shadow p-4 overflow-x-auto">
      <table class="w-full min-w-[600px] text-left">
        <thead>
          <tr class="text-gray-600 border-b">
            <th class="py-2">Produit</th>
            <th class="py-2">Nom</th>
            <th class="py-2">Prix</th>
            <th class="py-2">Stock</th>
            <th class="py-2">Promo</th>
            <th class="py-2"></th>
            <th class="py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, i) in wishlist"
            :key="i"
            class="border-b last:border-b-0 hover:bg-gray-50 transition"
          >
            <td class="py-2">
              <img :src="item.img" class="w-16 h-16 object-cover rounded shadow" :alt="item.name" />
            </td>
            <td class="py-2 font-semibold">
              <RouterLink :to="`/produit/${item.id}`" class="hover:underline text-[#0071BC]">{{
                item.name
              }}</RouterLink>
            </td>
            <td class="py-2 font-bold text-[#0071BC]">{{ item.price }} FCFA</td>
            <td class="py-2">
              <span v-if="item.stock > 0" class="text-[#009966] font-semibold">En stock</span>
              <span v-else class="text-red-500 font-semibold">Rupture</span>
            </td>
            <td class="py-2">
              <span
                v-if="item.promo"
                class="bg-[#F4A300] text-white px-2 py-1 rounded text-xs font-bold"
                >-{{ item.promo }}%</span
              >
            </td>
            <td class="py-2">
              <button
                @click="addToCart(i)"
                :disabled="item.stock === 0"
                class="bg-[#009966] text-white px-4 py-2 rounded hover:bg-[#0071BC] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="material-icons align-middle text-base mr-1">shopping_cart</span>
                Ajouter
              </button>
            </td>
            <td class="py-2">
              <button
                @click="remove(i)"
                class="text-red-500 hover:bg-red-50 rounded-full p-2 transition"
                title="Supprimer"
              >
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!wishlist.length" class="text-center text-gray-500 py-8">
        Aucun produit dans la wishlist.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const wishlist = ref([
  {
    id: 1,
    name: 'Casque Bluetooth',
    img: 'https://placehold.co/96x96/0071BC/fff?text=Prod1',
    price: '15 000',
    stock: 5,
    promo: 10,
  },
  {
    id: 2,
    name: 'Montre connectée',
    img: 'https://placehold.co/96x96/009966/fff?text=Prod2',
    price: '25 000',
    stock: 0,
    promo: null,
  },
])
function remove(i) {
  wishlist.value.splice(i, 1)
}
function addToCart(i) {
  // À remplacer par l’ajout réel au panier
  alert(`Produit ajouté au panier : ${wishlist.value[i].name}`)
}
</script>
