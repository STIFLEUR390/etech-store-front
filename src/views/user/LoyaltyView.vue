<template>
  <div class="max-w-2xl mx-auto py-8 px-2">
    <h1 class="text-2xl font-bold text-[#0071BC] mb-6">Programme de fidélité</h1>
    <div class="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
      <div class="flex items-center gap-2 mb-2">
        <span class="material-icons text-[#F4A300] text-3xl">star</span>
        <span class="font-bold text-lg">Vos points</span>
      </div>
      <span class="text-4xl font-bold text-[#009966] mb-2">320</span>
      <div class="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div class="bg-[#009966] h-4 rounded-full" style="width: 64%"></div>
      </div>
      <span class="text-xs text-gray-500 mb-4"
        >Niveau Argent - 500 pts pour le prochain palier</span
      >
      <div class="w-full">
        <h2 class="font-bold text-[#0071BC] mb-2">Récompenses disponibles</h2>
        <ul class="space-y-2">
          <li class="flex items-center justify-between bg-gray-50 rounded p-3">
            <span>Livraison gratuite</span>
            <span class="bg-[#F4A300] text-white px-2 py-1 rounded text-xs">200 pts</span>
            <button
              class="bg-[#0071BC] text-white px-3 py-1 rounded hover:bg-[#005fa3] transition text-xs"
            >
              Obtenir
            </button>
          </li>
          <li class="flex items-center justify-between bg-gray-50 rounded p-3">
            <span>5% de réduction</span>
            <span class="bg-[#F4A300] text-white px-2 py-1 rounded text-xs">300 pts</span>
            <button
              class="bg-[#0071BC] text-white px-3 py-1 rounded hover:bg-[#005fa3] transition text-xs"
            >
              Obtenir
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
