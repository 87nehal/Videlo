# Videlo: Blazing-Fast Video Streaming with HLS and a Customized Video.js Player

**Experience seamless video streaming with ultra-low latency and dynamic quality adjustments!**

Videlo is a modern video streaming website built on a powerful combination of technologies:

* **HLS Streaming:**  Delivering real-time video with minimal delay.
* **Video.js:**  A robust and highly customizable HTML5 video player, enhanced with unique features.
* **Vue.js:** A progressive JavaScript framework for building a responsive and interactive user interface.
* **FFmpeg:**  The industry-standard tool for video encoding and transcoding, enabling adaptive streaming.

## Key Features

* **Ultra-Low Latency:** HLS ensures a near-instantaneous viewing experience, perfect for live events and interactive content.
* **Adaptive Streaming:** Videlo automatically adjusts video quality based on your internet speed, providing smooth playback without buffering.
* **Custom Speed Module:** _A standout feature!_ Videlo accurately measures your internet speed and suggests the optimal video quality for uninterrupted enjoyment.
* **Custom Video.js Player:**  _We didn't stop at the basics!_ The Video.js player has been enhanced with:
    * **Integrated Quality Settings:** Choose from 'Auto', 'Low', 'Medium', and 'High' quality, or let Videlo select the best option for you.
    * **Real-Time Speed Information:**  See your current internet speed directly within the player. 
* **User-Friendly Interface:**  Videlo's clean and intuitive design makes it easy to browse videos, manage settings, and enjoy your favorite content.

## Code Highlights

### 1. Custom Speed Module

This module accurately measures internet speed and provides a recommended quality setting.

```javascript
import { ref, onMounted, onUnmounted } from 'vue';

const useInternetSpeed = () => {
  const speed = ref(0);
  const speedLabel = ref('');
  const recommendedQuality = ref('auto'); 
  let intervalId;

  const checkSpeed = () => {
    // ... (Implementation to measure internet speed using an XHR request)
  };

  // ... (Logic to categorize speed and recommend quality)

  return {
    speed,
    speedLabel,
    recommendedQuality,
  };
};

export default useInternetSpeed;
```

### 2. Customized Video.js Player

```vue
<template>
  <video ref="videoPlayer" class="video-js vjs-default-skin">
    <source :src="initialSrc" type="application/x-mpegURL" />
  </video>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import useInternetSpeed from '~/composables/useInternetSpeed';

// ... (Component props, data, and the useInternetSpeed composable)

const qualitySelector = function (options) {
  this.ready(() => {
    // ... (Implementation to create the quality menu and handle quality changes)
  });
};

onMounted(() => {
  videojs.registerPlugin('qualitySelector', qualitySelector);

  const player = videojs(videoPlayer.value, {
    plugins: {
      qualitySelector: {}, 
    },
  }, () => {
    // ... (Player initialization and event listeners)
  });
});
</script>
```

**Explanation:**

- **Custom Plugin:**  The `qualitySelector` function is registered as a Video.js plugin. It adds a custom menu button to the player's control bar, allowing users to select the video quality.
- **Quality Options:** The plugin creates menu items for 'Auto', 'Low', 'Medium', and 'High' quality settings.
- **Dynamic Quality Switching:**  The `changeQuality` function (not shown in the snippet) updates the player's source based on the selected quality, maintaining the current playback position.

## Screenshots

### Homepage

![Homepage Placeholder](https://raw.githubusercontent.com/87nehal/Videlo/master/public/SS/Homepage.png)

_An inviting homepage showcasing featured videos and categories._

### Speed Test Page

![Speed Test Placeholder](https://github.com/87nehal/Videlo/blob/master/public/SS/Speedtest.png)

_A simple interface displaying your measured internet speed and recommended video quality._

### Player Page

![Player Placeholder](https://raw.githubusercontent.com/87nehal/Videlo/master/public/SS/Player.png)

_Our customized Video.js player with quality settings and real-time speed information clearly visible._


## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for guidelines.

## License

This project is licensed under the [MIT License](LICENSE). 
