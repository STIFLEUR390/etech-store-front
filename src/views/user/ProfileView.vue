<template>
  <div class="max-w-2xl mx-auto py-8 px-2">
    <h1 class="text-2xl font-bold text-[#0071BC] mb-6">Mon profil</h1>
    <form class="bg-white rounded-2xl shadow p-6 space-y-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nom complet</label>
          <input
            type="text"
            v-model="user.name"
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            v-model="user.email"
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Téléphone</label>
          <input
            type="tel"
            v-model="user.phone"
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            type="password"
            v-model="user.password"
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
      </div>
      <button
        type="submit"
        class="w-full bg-[#0071BC] text-white py-2 rounded-lg font-semibold text-lg hover:bg-[#005fa3] transition"
      >
        Enregistrer
      </button>
    </form>
    <div class="bg-white rounded-2xl shadow p-6 mt-8">
      <h2 class="text-lg font-bold text-[#009966] mb-4">Adresses enregistrées</h2>
      <ul class="space-y-2 mb-4">
        <li
          v-for="(address, i) in addresses"
          :key="i"
          class="flex justify-between items-center bg-gray-50 rounded p-3"
        >
          <span>{{ address }}</span>
          <button @click="removeAddress(i)" class="text-red-500 hover:underline">Supprimer</button>
        </li>
      </ul>
      <form @submit.prevent="addAddress" class="flex gap-2">
        <input
          v-model="newAddress"
          type="text"
          placeholder="Nouvelle adresse"
          class="flex-1 px-3 py-2 border rounded focus:ring-2 focus:ring-[#009966]"
        />
        <button
          type="submit"
          class="bg-[#009966] text-white px-4 py-2 rounded hover:bg-[#0071BC] transition"
        >
          Ajouter
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const user = ref({
  name: 'Jean Dupont',
  email: 'jean@email.com',
  phone: '0700000000',
  password: '',
})
const addresses = ref(['Abidjan, Cocody', 'Yamoussoukro'])
const newAddress = ref('')
function addAddress() {
  if (newAddress.value.trim()) {
    addresses.value.push(newAddress.value.trim())
    newAddress.value = ''
  }
}
function removeAddress(i) {
  addresses.value.splice(i, 1)
}
</script>
