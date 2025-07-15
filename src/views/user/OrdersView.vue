<template>
  <div class="max-w-4xl mx-auto py-8 px-2">
    <h1 class="text-2xl font-bold text-[#0071BC] mb-6">Historique des commandes</h1>
    <div class="bg-white rounded-2xl shadow p-6">
      <table class="w-full text-left">
        <thead>
          <tr class="text-gray-600 border-b">
            <th class="py-2">Date</th>
            <th class="py-2">N°</th>
            <th class="py-2">Produits</th>
            <th class="py-2">Total</th>
            <th class="py-2">Statut</th>
            <th class="py-2">Suivi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id" class="border-b last:border-b-0">
            <td class="py-2">{{ order.date }}</td>
            <td class="py-2">#{{ order.id }}</td>
            <td class="py-2">
              <div class="flex gap-1">
                <img
                  v-for="(prod, i) in order.products"
                  :key="i"
                  :src="prod.img"
                  class="w-8 h-8 rounded"
                  :alt="prod.name"
                />
              </div>
            </td>
            <td class="py-2">{{ order.total }} FCFA</td>
            <td class="py-2">
              <span
                v-if="order.status === 'delivered'"
                class="bg-[#009966] text-white px-2 py-1 rounded text-xs"
                >Livrée</span
              >
              <span
                v-else-if="order.status === 'shipped'"
                class="bg-[#F4A300] text-white px-2 py-1 rounded text-xs"
                >En livraison</span
              >
              <span v-else class="bg-[#0071BC] text-white px-2 py-1 rounded text-xs">En cours</span>
            </td>
            <td class="py-2">
              <div class="w-24 bg-gray-200 rounded-full h-2">
                <div
                  :class="{
                    'bg-[#009966]': order.status === 'delivered',
                    'bg-[#F4A300]': order.status === 'shipped',
                    'bg-[#0071BC]': order.status === 'processing',
                  }"
                  class="h-2 rounded-full"
                  :style="{ width: order.progress + '%' }"
                ></div>
              </div>
              <a
                v-if="order.tracking"
                :href="order.tracking"
                target="_blank"
                class="text-xs text-[#0071BC] underline ml-1"
                >Suivre</a
              >
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!orders.length" class="text-center text-gray-500 py-8">
        Aucune commande trouvée.
      </div>
    </div>
  </div>
</template>

<script setup>
const orders = [
  {
    id: 1234,
    date: '2024-06-01',
    products: [
      { name: 'Produit 1', img: 'https://placehold.co/32x32/0071BC/fff?text=P1' },
      { name: 'Produit 2', img: 'https://placehold.co/32x32/009966/fff?text=P2' },
    ],
    total: '24 000',
    status: 'delivered',
    progress: 100,
    tracking: 'https://tracking.com/1234',
  },
  {
    id: 1235,
    date: '2024-06-10',
    products: [{ name: 'Produit 3', img: 'https://placehold.co/32x32/F4A300/fff?text=P3' }],
    total: '12 000',
    status: 'shipped',
    progress: 70,
    tracking: '',
  },
]
</script>
