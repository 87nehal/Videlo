import { ref, onMounted, onUnmounted } from 'vue';

const useInternetSpeed = () => {
  const speed = ref(0);
  const speedLabel = ref('');
  const recommendedQuality = ref('auto');
  let intervalId;

  const checkSpeed = () => {
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
      recommendedQuality.value = getRecommendedQuality(speedValue);
    };
  };

  onMounted(() => {
    checkSpeed();
    intervalId = setInterval(checkSpeed, 5000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  const getSpeedLabel = (speed) => {
    if (speed < 200) return '2G';
    if (speed < 2000) return '3G';
    if (speed < 5000) return '4G';
    return '5G';
  };

  const getRecommendedQuality = (speed) => {
    if (speed < 1000) return 'low';
    if (speed < 5000) return 'medium';
    return 'high';
  };

  return {
    speed,
    speedLabel,
    recommendedQuality,
  };
};

export default useInternetSpeed;