<template>
  <div class="theater-mode rounded-lg overflow-hidden">
    <video ref="videoPlayer" class="video-js vjs-default-skin rounded-lg">
      <source :src="src" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const videoPlayer = ref(null);
let player = null;

onMounted(() => {
  player = videojs(videoPlayer.value, {}, () => {
    // Retrieve saved volume from localStorage
    const savedVolume = localStorage.getItem('videoPlayerVolume');
    if (savedVolume !== null) {
      player.volume(parseFloat(savedVolume));
    }

    player.playsinline(true);
    player.controls(true);
    player.preload('auto');
    player.fluid(true);
    player.muted(false);
    player.load();

    // Save volume to localStorage whenever it changes
    player.on('volumechange', () => {
      localStorage.setItem('videoPlayerVolume', player.volume());
    });
  });
});

onBeforeUnmount(() => {
  if (player) {
    player.dispose();
  }
});
</script>

<style scoped>
.theater-mode .video-js {
  width: 100% !important;
  height: calc(100vh - 25vh) !important;
}
</style>
