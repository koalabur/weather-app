<template>
  <div
    class="w-screen h-screen flex flex-col text-center items-center justify-center bg-slate-950"
  >
    <label
      for="zipOrCity"
      class="text-off-white mb-5 text-3xl sm:text-4xl font-body"
    >
      What is your City or Zip Code?
    </label>

    <form class="flex flex-col mb-4 relative" @submit.prevent="sendGeo">
      <input
        type="text"
        id="zipOrCity"
        placeholder="city or zip code"
        class="w-full rounded-md border-gray-200 py-4 px-5 shadow-sm text-xl font-body sm:text-2xl"
        v-model="userInput"
        required
      />

      <span class="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <button
          type="submit"
          class="rounded-full bg-slate-950 p-1 text-slate-950 mr-5"
        >
          <span class="sr-only">Submit</span>
          <svg
            class="h-6 w-6 sm:h-8 sm:w-8"
            viewBox="0 0 24 24"
            xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
          >
            <path
              d="m22.4 19.6-4.8-4.8c.9-1.4 1.4-3 1.4-4.8 0-5-4-9-9-9s-9 4-9 9 4 9 9 9c1.8 0 3.4-.5 4.8-1.4l4.8 4.8c.4.4.9.6 1.4.6 1.1 0 2-.9 2-2 0-.6-.2-1.1-.6-1.4zM5 10c0-2.8 2.2-5 5-5s5 2.2 5 5-2.2 5-5 5-5-2.2-5-5z"
              fill="#e4e6f5"
              class="fill-000000"
            ></path>
          </svg>
        </button>
      </span>
    </form>
    <p class="font-body text-md text-off-white italic sm:text-2xl">
      Enabling location access through the browser will also work.
    </p>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const emit = defineEmits(["send-geo"]);

const userInput = ref("");

function sendGeo() {
  // Encode the location (city name or zip code) to include in the API request URL
  const encodedLocation = encodeURIComponent(userInput.value);

  // Send the API request
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${config.public.GEOCODE_API}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "OK") {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        emit("send-geo", lat, lng);
      } else {
        console.log("Geocoding API request failed.");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
</script>
