<template>
  <main>
    <GeoForm v-if="!payload" @send-geo="(lat, long) => getWeather(lat, long)" />

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
