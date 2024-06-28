import { ref, onMounted, onUnmounted } from 'vue';

const useInternetSpeed = () => {
  const speed = ref(0);
  const speedLabel = ref('');

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
    };
  };

  onMounted(() => {
    checkSpeed();
    intervalId = setInterval(checkSpeed, 10000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  const getSpeedLabel = (speed) => {
    if (speed < 200) {
      return '2G';
    } else if (speed < 2000) {
      return '3G';
    } else if (speed < 5000) {
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
