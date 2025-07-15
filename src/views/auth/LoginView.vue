<template>
  <div class="flex items-center justify-center bg-gray-50 py-8 px-2">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h1 class="text-2xl font-bold text-[#0071BC] mb-6 text-center">Connexion à E-Key Market</h1>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
        <div v-if="error" class="text-red-500 text-sm flex items-center gap-2">
          <i class="fas fa-exclamation-circle"></i> {{ error }}
        </div>
        <button
          type="submit"
          class="w-full bg-[#0071BC] text-white py-2 rounded-lg font-semibold text-lg hover:bg-[#005fa3] transition"
        >
          Se connecter
        </button>
      </form>
      <div class="mt-4 text-center text-sm">
        Pas de compte ?
        <RouterLink to="/auth/register" class="text-[#0071BC] font-semibold hover:underline"
          >Créer un compte</RouterLink
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const email = ref('')
const password = ref('')
const error = ref('')
function login() {
  if (!email.value || !password.value) {
    error.value = 'Veuillez remplir tous les champs.'
    return
  }
  // Simule une connexion
  error.value = ''
  // ...
}
</script>
