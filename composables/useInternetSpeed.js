// internet-speed.module.js
import { ref, onMounted, onUnmounted } from 'vue';

const useInternetSpeed = () => {
  const speed = ref(0);
  const speedLabel = ref('');

  let intervalId;

  onMounted(() => {
    intervalId = setInterval(() => {
      const startTime = Date.now();
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://localhost:3000', true);
      xhr.send();
      xhr.onload = () => {
        const endTime = Date.now();
        const latency = endTime - startTime;
        const speedValue = (xhr.responseText.length * 8) / latency;
        speed.value = speedValue;
        speedLabel.value = getSpeedLabel(speedValue);
      };
    }, 10000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  const getSpeedLabel = (speed) => {
    if (speed < 100) {
      return '2G';
    } else if (speed < 500) {
      return '3G';
    } else if (speed < 1000) {
      return '4G';
    } else {
      return '5G';
    }
  };

  return {
    speed,
    speedLabel,
  };
};

export default useInternetSpeed;