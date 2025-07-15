<template>
  <div class="flex items-center justify-center bg-gray-50 py-8 px-2">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h1 class="text-2xl font-bold text-[#0071BC] mb-6 text-center">Créer un compte</h1>
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nom complet</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
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
        <div>
          <label class="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
          <input
            v-model="confirm"
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
          S’inscrire
        </button>
      </form>
      <div class="mt-4 text-center text-sm">
        Déjà un compte ?
        <RouterLink to="/auth/login" class="text-[#0071BC] font-semibold hover:underline"
          >Se connecter</RouterLink
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')
function register() {
  if (!name.value || !email.value || !password.value || !confirm.value) {
    error.value = 'Veuillez remplir tous les champs.'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }
  // Simule une inscription
  error.value = ''
  // ...
}
</script>
