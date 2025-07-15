<template>
  <div class="flex items-center justify-center bg-gray-50 py-8 px-2">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h1 class="text-2xl font-bold text-[#0071BC] mb-6 text-center">
        Réinitialiser le mot de passe
      </h1>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Nouveau mot de passe</label>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Confirmer le mot de passe</label>
          <input
            v-model="confirm"
            type="password"
            required
            minlength="6"
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-[#0071BC] text-white py-2 rounded-lg font-semibold text-lg hover:bg-[#005fa3] transition"
        >
          Réinitialiser
        </button>
        <div v-if="success" class="text-green-600 text-sm text-center mt-2">
          Mot de passe réinitialisé avec succès.
        </div>
        <div v-if="error" class="text-red-600 text-sm text-center mt-2">{{ error }}</div>
      </form>
      <RouterLink to="/auth/login" class="block text-center text-[#0071BC] mt-6 hover:underline"
        >Retour à la connexion</RouterLink
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
const password = ref('')
const confirm = ref('')
const success = ref(false)
const error = ref('')
function submit() {
  error.value = ''
  success.value = false
  if (password.value.length < 6) {
    error.value = 'Le mot de passe doit contenir au moins 6 caractères.'
    return
  }
  if (password.value !== confirm.value) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }
  // Simule la réinitialisation (remplace par appel API réel)
  setTimeout(() => {
    success.value = true
  }, 1000)
}
</script>
