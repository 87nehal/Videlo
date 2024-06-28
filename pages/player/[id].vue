<template>
  <div class="p-4">
    <VideoPlayer :videoid="id"/>
  </div>
</template>
<script setup>
const id = useRoute().params.id
</script>
