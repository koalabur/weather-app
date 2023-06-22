<template>
  <section class="flex flex-col sm:flex-row">
    <div
      class="flex flex-col items-center bg-transparent-blue w-full gap-[2rem] pt-5 pb-20 pl-5 pr-5 sm:pb-0 sm:gap-[3rem] sm:basis-1/4 sm:p-5 sm:h-screen"
    >
      <!-- item  -->
      <div>
        <h2
          class="font-body text-center text-off-white tracking-widest mb-1 text-3xl"
        >
          DESCRIPTION
        </h2>
        <p
          class="font-body text-off-white text-center font-extrabold uppercase tracking-widest text-2xl"
        >
          {{ weatherData.weather[0].description }}
        </p>
      </div>
      <!-- item  -->
      <div>
        <h2
          class="font-body text-center text-off-white tracking-widest mb-1 text-3xl"
        >
          FEELS LIKE
        </h2>
        <p
          class="font-body text-off-white text-center font-extrabold uppercase tracking-widest text-2xl"
        >
          {{ Math.round(weatherData.main.feels_like) }}°F
        </p>
      </div>
      <!-- item  -->
      <div>
        <h2
          class="font-body text-center text-off-white tracking-widest mb-1 text-3xl"
        >
          MINIMUM TEMP
        </h2>
        <p
          class="font-body text-off-white text-center font-extrabold uppercase tracking-widest text-2xl"
        >
          {{ Math.round(weatherData.main.temp_min) }}°F
        </p>
      </div>
      <!-- item  -->
      <div>
        <h2
          class="font-body text-center text-off-white tracking-widest mb-1 text-3xl"
        >
          MAXIMUM TEMP
        </h2>
        <p
          class="font-body text-off-white text-center font-extrabold uppercase tracking-widest text-2xl"
        >
          {{ Math.round(weatherData.main.temp_max) }}°F
        </p>
      </div>
      <!-- item  -->
      <div class="w-full">
        <h2
          class="font-body text-center text-off-white tracking-widest mb-1 text-3xl"
        >
          VISIBILITY
        </h2>
        <div
          class="relative bg-off-white h-8 rounded-full mb-8 sm:h-10"
          :style="{ width: visibility + '%' }"
        >
          <p
            class="absolute right-0 font-body text-off-white text-center font-extrabold uppercase tracking-widest text-2xl top-8 sm:top-10"
            :class="visibility <= 18 ? 'left-5' : 'left-auto'"
          >
            {{ visibility }}%
          </p>
        </div>
      </div>
      <!-- item  -->
      <div class="w-full">
        <h2
          class="font-body text-center text-off-white tracking-widest mb-1 text-3xl"
        >
          HUMIDITY
        </h2>
        <div
          class="relative bg-off-white h-8 rounded-full mb-8 sm:h-10"
          :style="{ width: humidity + '%' }"
        >
          <p
            class="absolute right-0 font-body text-off-white text-center font-extrabold uppercase tracking-widest text-2xl top-8 sm:top-10"
            :class="humidity <= 18 ? 'left-5' : 'left-auto'"
          >
            {{ humidity }}%
          </p>
        </div>
      </div>
    </div>
    <div
      class="order-first flex flex-col justify-center items-center pl-5 pr-5 pb-10 sm:p-0 sm:order-last sm:basis-3/4"
    >
      <nuxt-img
        class="w-[15rem]"
        :src="`/${weatherIcon}.png`"
        :alt="weatherIcon"
        width="282"
        height="282"
      />

      <p
        class="font-body text-center text-off-white mb-1 font-extrabold text-4xl sm:text-7xl"
      >
        {{ Math.round(weatherData.main.temp) }}°F
      </p>
      <h2
        class="font-body text-center text-off-white tracking-wide mb-1 text-2xl sm:text-5xl"
      >
        {{ weatherData.name }}, {{ weatherData.sys.country }}
      </h2>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object as () => WeatherData,
    required: true,
  },
});

const weatherData: WeatherData = props.data;
const visibility = computed(() => {
  return Math.round(weatherData.visibility / 100);
});
const humidity = computed(() => {
  return Math.round(weatherData.main.humidity);
});

const weatherDescription = computed(() => {
  return weatherData.weather[0].description;
});

const weatherIcon = computed(() => {
  if (weatherDescription.value === "clear sky") {
    return "clear_sky";
  } else if (weatherDescription.value === "few clouds") {
    return "few_clouds";
  } else if (
    weatherDescription.value === "scattered clouds" ||
    weatherDescription.value === "broken clouds"
  ) {
    return "scattered_clouds";
  } else if (
    weatherDescription.value === "shower rain" ||
    weatherDescription.value === "rain"
  ) {
    return "rain";
  } else if (weatherDescription.value === "thunderstorm") {
    return "thunderstorm";
  } else if (weatherDescription.value === "snow") {
    return "snow";
  } else if (weatherDescription.value === "mist") {
    return "mist";
  } else {
    return "clear_sky";
  }
});
</script>
