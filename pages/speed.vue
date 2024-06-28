<template>
  <div class="flex items-center justify-center h-full bg-gray-100">
    <div class="bg-white p-6 rounded-lg shadow-lg text-center">
      <p class="text-xl font-semibold text-gray-700">Internet Speed</p>
      <p class="text-2xl font-bold text-blue-500 mt-2">{{ speedLabel }}</p>
      <p class="text-lg text-gray-500">({{ speed.toFixed(2) }} kbps)</p>
    </div>
  </div>
</template>

<script setup>
import useInternetSpeed from '~/composables/useInternetSpeed';
const { speed, speedLabel } = useInternetSpeed();
</script>
