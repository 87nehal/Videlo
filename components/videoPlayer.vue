<template>
  <div class="theater-mode rounded-lg overflow-hidden">
    <video ref="videoPlayer" class="video-js vjs-default-skin rounded-lg">
      <source :src="initialSrc" type="application/x-mpegURL" />
    </video>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, computed } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const props = defineProps({
  videoid: {
    type: String,
    required: true
  }
});

const DEFAULT_QUALITY = 'high';
const quality = ref(DEFAULT_QUALITY);
const videoPlayer = ref(null);
let player = null;

const initialSrc = computed(() => `../storage/${props.videoid}/${DEFAULT_QUALITY}/output.m3u8`);

const changeQuality = (newQuality) => {
  quality.value = newQuality;
  if (typeof window !== 'undefined') {
    localStorage.setItem('videoQuality', newQuality);
  }
  const newSrc = `../storage/${props.videoid}/${newQuality}/output.m3u8`;
  if (player) {
    const currentTime = player.currentTime();
    const isPlaying = !player.paused();
    player.src({ type: 'application/x-mpegURL', src: newSrc });
    player.load();
    player.currentTime(currentTime);
    if (isPlaying) {
      player.play();
    }
    // Update the button text
    const qualityButton = player.getChild('controlBar').getChild('QualityMenuButton');
    if (qualityButton) {
      qualityButton.updateButtonText(newQuality);
      qualityButton.updateMenuItems(newQuality);
    }
  }
};

// Custom Video.js plugin for quality selection
const qualitySelector = function(options) {
  this.ready(() => {
    const qualities = ['low', 'medium', 'high'];
    const qualityItems = qualities.map(q => ({
      label: q.charAt(0).toUpperCase() + q.slice(1),
      value: q
    }));

    const MenuButton = videojs.getComponent('MenuButton');
    const MenuItem = videojs.getComponent('MenuItem');

    class QualityMenuItem extends MenuItem {
      constructor(player, options) {
        super(player, {
          label: options.label,
          selectable: true,
          selected: options.selected || false
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
        return qualityItems.map(qualityItem => {
          return new QualityMenuItem(this.player_, {
            label: qualityItem.label,
            value: qualityItem.value,
            selected: qualityItem.value === quality.value
          });
        });
      }

      updateButtonText(qualityLevel) {
        this.el().querySelector('.vjs-icon-placeholder').textContent = qualityLevel.charAt(0).toUpperCase() + qualityLevel.slice(1);
      }

      updateMenuItems(selectedQuality) {
        const items = this.items;
        items.forEach(item => {
          item.selected(item.value === selectedQuality);
        });
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

  player = videojs(videoPlayer.value, {
    plugins: {
      qualitySelector: {}
    }
  }, () => {
    if (typeof window !== 'undefined') {
      const savedVolume = localStorage.getItem('videoPlayerVolume');
      if (savedVolume !== null) {
        player.volume(parseFloat(savedVolume));
      }
      // Load saved quality after mount
      const savedQuality = localStorage.getItem('videoQuality');
      if (savedQuality) {
        changeQuality(savedQuality);
      }
    }
    player.playsinline(true);
    player.controls(true);
    player.preload('auto');
    player.muted(false);
    player.load();
    player.on('volumechange', () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('videoPlayerVolume', player.volume());
      }
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
  transition: height 0.3s ease, width 0.3s ease;
}

/* Add this new style for the quality selector button */
:deep(.vjs-quality-selector) {
  font-size: 0.8em;
}

:deep(.vjs-quality-selector .vjs-icon-placeholder) {
  font-family: inherit;
  font-size: 1.2em;
  line-height: 2.2;
}

/* Responsive styles remain the same */
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
