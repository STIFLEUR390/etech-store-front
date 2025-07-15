<template>
  <div class="flex items-center justify-center bg-gray-50 py-8 px-2">
    <div
      class="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center"
    >
      <i class="fas fa-envelope text-5xl text-[#0071BC] mb-4"></i>
      <h1 class="text-2xl font-bold text-[#0071BC] mb-2 text-center">Vérifiez votre email</h1>
      <p class="text-gray-700 text-center mb-6">
        Un lien de confirmation a été envoyé à votre adresse email. Cliquez sur ce lien pour activer
        votre compte.
      </p>
      <RouterLink
        to="/auth/login"
        class="w-full bg-[#0071BC] text-white py-2 rounded-lg font-semibold text-lg text-center hover:bg-[#005fa3] transition"
        >Retour à la connexion</RouterLink
      >
    </div>
  </div>
</template>
<script setup>
import { RouterLink } from 'vue-router'
</script>
