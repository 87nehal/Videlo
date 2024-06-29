<template>
  <div class="theater-mode rounded-lg overflow-hidden relative">
    <video ref="videoPlayer" class="video-js vjs-default-skin rounded-lg">
      <source :src="initialSrc" type="application/x-mpegURL" />
    </video>
    <div v-if="debug" class="debug-info">
      Current Quality: {{ quality }}
      <br />
      Speed History: {{ speedHistory }}
      <br />
      Current Speed: {{ speed }} Kbps
      <br />
      Speed Label: {{ speedLabel }}
      <br />
      Recommended Quality: {{ recommendedQuality }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed, watch } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import useInternetSpeed from '~/composables/useInternetSpeed';

const props = defineProps({
  videoid: {
    type: String,
    required: true,
  },
});

const DEFAULT_QUALITY = 'auto';
const quality = ref(DEFAULT_QUALITY);
const speedHistory = ref([]);
const SPEED_HISTORY_LENGTH = 3;

if (typeof window !== 'undefined') {
  quality.value = localStorage.getItem('videoQuality') || DEFAULT_QUALITY;
}

const videoPlayer = ref(null);
let player = null;
let isChangingSource = false;

const { speed, speedLabel, recommendedQuality } = useInternetSpeed();

const getVideoSrc = () => {
  let actualQuality = quality.value;
  if (actualQuality === 'auto') {
    actualQuality = getAverageRecommendedQuality();
    if (speedLabel.value === '3G') {
      actualQuality = actualQuality === 'medium' ? 'low' : 'high';
    }
  }
  return `../storage/${props.videoid}/${actualQuality}/output.m3u8`;
};

const initialSrc = computed(() => getVideoSrc());
const lastQualityChange = ref(null);
const debug = ref(true);

const changeQuality = (newQuality) => {
  if (isChangingSource) return;

  if (newQuality === 'auto') {
    quality.value = 'auto';
    newQuality = getAverageRecommendedQuality();
  } else {
    quality.value = newQuality;
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem('videoQuality', quality.value);
  }

  const newSrc = `../storage/${props.videoid}/${newQuality}/output.m3u8`;
  if (player) {
    isChangingSource = true;
    const currentTime = player.currentTime();
    const wasPlaying = !player.paused();

    player.src({ type: 'application/x-mpegURL', src: newSrc });
    player.one('loadedmetadata', () => {
      player.currentTime(currentTime);
      if (wasPlaying) {
        player.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      }
      isChangingSource = false;
    });

    const qualityButton = player.getChild('controlBar').getChild('QualityMenuButton');
    if (qualityButton) {
      qualityButton.updateButtonText(quality.value);
      qualityButton.updateMenuItems(quality.value);
    }
  }
  lastQualityChange.value = newQuality;
};

const getAverageRecommendedQuality = () => {
  speedHistory.value.unshift(recommendedQuality.value);
  if (speedHistory.value.length > SPEED_HISTORY_LENGTH) {
    speedHistory.value.pop();
  }

  const qualityCount = { low: 0, medium: 0, high: 0 };
  speedHistory.value.forEach((q) => { qualityCount[q]++; });

  let maxCount = 0;
  let mostFrequentQuality = recommendedQuality.value;

  for (const q in qualityCount) {
    if (qualityCount[q] > maxCount) {
      maxCount = qualityCount[q];
      mostFrequentQuality = q;
    }
  }

  return mostFrequentQuality;
};

watch(
  [recommendedQuality, speedLabel],
  ([newRecommendedQuality, newSpeedLabel]) => {
    if (quality.value === 'auto' && !isChangingSource) {
      let qualityToSet = getAverageRecommendedQuality();
      if (newSpeedLabel === '3G') {
        qualityToSet = qualityToSet === 'medium' ? 'low' : 'high';
      }
      if (qualityToSet !== lastQualityChange.value) {
        changeQuality('auto');
      }
    }
  }
);

const qualitySelector = function (options) {
  this.ready(() => {
    const qualities = ['auto', 'low', 'medium', 'high'];
    const qualityItems = qualities.map((q) => ({
      label: q === 'auto' ? 'Auto' : q.charAt(0).toUpperCase() + q.slice(1),
      value: q,
    }));

    const MenuButton = videojs.getComponent('MenuButton');
    const MenuItem = videojs.getComponent('MenuItem');

    class QualityMenuItem extends MenuItem {
      constructor(player, options) {
        super(player, {
          label: options.label,
          selectable: true,
          selected: options.selected || false,
        });
        this.label = options.label;
        this.value = options.value;
      }

      handleClick(event) {
        super.handleClick(event);
        changeQuality(this.value);
      }
    }

    class QualityMenuButton extends MenuButton {
      constructor(player, options) {
        super(player, options);
        this.controlText('Quality');
        this.updateButtonText(quality.value);
      }

      createItems() {
        return qualityItems.map((qualityItem) => new QualityMenuItem(this.player_, {
          label: qualityItem.label,
          value: qualityItem.value,
          selected: qualityItem.value === quality.value,
        }));
      }

      updateButtonText(qualityLevel) {
        this.el().querySelector('.vjs-icon-placeholder').textContent =
          qualityLevel === 'auto' ? 'Auto' : qualityLevel.charAt(0).toUpperCase() + qualityLevel.slice(1);
      }

      updateMenuItems(selectedQuality) {
        this.items.forEach((item) => { item.selected(item.value === selectedQuality); });
      }

      buildCSSClass() {
        return `vjs-quality-selector ${super.buildCSSClass()}`;
      }
    }

    videojs.registerComponent('QualityMenuButton', QualityMenuButton);
    this.controlBar.addChild('QualityMenuButton', {}, this.controlBar.children_.length - 1);
  });
};

onMounted(() => {
  videojs.registerPlugin('qualitySelector', qualitySelector);

  player = videojs(
    videoPlayer.value,
    { plugins: { qualitySelector: {} } },
    () => {
      if (typeof window !== 'undefined') {
        const savedVolume = localStorage.getItem('videoPlayerVolume');
        if (savedVolume !== null) {
          player.volume(parseFloat(savedVolume));
        }
        player.playsinline(true);
        player.controls(true);
        player.preload('auto');
        player.muted(false);
        player.load();

        player.on('volumechange', () => {
          localStorage.setItem('videoPlayerVolume', player.volume());
        });

        player.on('error', (e) => {
          console.error('Video.js error:', player.error());
        });
      }
    }
  );
});

onBeforeUnmount(() => {
  if (player) player.dispose();
});
</script>

<style scoped>
.theater-mode .video-js {
  width: 100% !important;
  height: calc(100vh - 25vh) !important;
  transition: height 0.3s ease, width 0.3s ease;
}

:deep(.vjs-quality-selector) {
  font-size: 0.8em;
}

:deep(.vjs-quality-selector .vjs-icon-placeholder) {
  font-family: inherit;
  font-size: 1.2em;
  line-height: 2.2;
}

@media (max-width: 1200px) {
  .theater-mode .video-js {
    height: calc(70vh) !important;
  }
}

@media (max-width: 992px) {
  .theater-mode .video-js {
    height: calc(50vh) !important;
  }
}

@media (max-width: 768px) {
  .theater-mode .video-js {
    height: calc(40vh) !important;
  }
}

@media (max-width: 576px) {
  .theater-mode .video-js {
    height: calc(30vh) !important;
  }
}

@media (max-width: 400px) {
  .theater-mode .video-js {
    height: calc(20vh) !important;
  }
}
</style>