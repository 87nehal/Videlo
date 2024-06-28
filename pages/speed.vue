<template>
  <div>
    <p>Internet speed: {{ speedLabel }} ({{ speed }} kbps)</p>
  </div>
</template>

<script setup>
import useInternetSpeed from '~/composables/useInternetSpeed';
const { speed, speedLabel } = useInternetSpeed();

</script>