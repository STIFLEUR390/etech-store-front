<template>
  <div class="flex items-center justify-center bg-gray-50 py-8 px-2">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <h1 class="text-2xl font-bold text-[#0071BC] mb-6 text-center">Mot de passe oublié</h1>
      <form @submit.prevent="submit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-[#0071BC]"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-[#0071BC] text-white py-2 rounded-lg font-semibold text-lg hover:bg-[#005fa3] transition"
        >
          Envoyer le lien de réinitialisation
        </button>
        <div v-if="success" class="text-green-600 text-sm text-center mt-2">
          Un email de réinitialisation a été envoyé.
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
const email = ref('')
const success = ref(false)
const error = ref('')
function submit() {
  error.value = ''
  success.value = false
  if (!email.value.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
    error.value = 'Adresse email invalide.'
    return
  }
  // Simule l’envoi (remplace par appel API réel)
  setTimeout(() => {
    success.value = true
  }, 1000)
}
</script>
