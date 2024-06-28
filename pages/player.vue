<template>
  <div class="p-4">
    <VideoPlayer src="../storage/output.m3u8" />
  </div>
</template>
<script setup>
const props = defineProps({
  viedoId: {
    type: String,
    //required: true
  }
})
</script>
