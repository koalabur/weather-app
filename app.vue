<template>
  <main>
    <p
      class="text-off-white w-screen h-screen flex text-center justify-center items-center bg-black text-4xl"
      v-if="!payload"
    >
      To show you the weather, the app will need access to your location. <br />If you already have given access, please hold...
    </p>
    <Weather v-else :data="payload" />
  </main>
</template>

<script setup lang="ts">
import { useGeolocation } from "@vueuse/core";
const config = useRuntimeConfig();

// Get Geo Location
const { coords } = useGeolocation();

const latitude = computed<number | string>(() => {
  return coords.value.latitude;
});

const longitude = computed<number | string>(() => {
  return coords.value.longitude;
});

// Get Weather
const payload = ref<WeatherData | null>(null);
async function getWeather(lati: string, longi: string) {
  const { data } = await useFetch<WeatherData>(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&units=imperial&appid=${config.public.OPENWEATHER_API}`
  );
  if (data) {
    payload.value = data.value;
  }
}
/// Watch for changes in latitude
watch(latitude, () => {
  getWeather(latitude.value.toString(), longitude.value.toString());
});
</script>
