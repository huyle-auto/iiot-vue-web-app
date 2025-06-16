<template>
    <v-row class="ma-2">
      <!-- Humidity Card -->
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="4" rounded="xl" color="white lighten-5">
          <v-card-title class="text-h6 font-weight-bold text-blue-darken-3">
            Humidity
          </v-card-title>
          <v-card-text>
            <div class="text-h3 font-weight-bold text-center text-blue">
              {{ currentHumidity.toFixed(1) + "%" }}
            </div>
            <div class="text-caption text-center text-grey mt-2">
              Measured just now
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Temperature Card -->
      <v-col cols="12" md="4">
        <v-card class="pa-4" elevation="4" rounded="xl" color="white lighten-5">
          <v-card-title class="text-h6 font-weight-bold text-deep-orange-darken-3">
            Temperature
          </v-card-title>
          <v-card-text>
            <div class="text-h3 font-weight-bold text-center text-deep-orange">
              {{ currentTemperature.toFixed(1) + "°C" }}
            </div>
            <div class="text-caption text-center text-grey mt-2">
              Measured just now
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { toast } from 'vuetify-sonner'
import toastOptions from '@/toast/toastOptions';
import { secureFetch } from '@/api/utils/secureFetch';
import { API_ENDPOINT, API_PATH } from '@/api/config';

let currentHumidity = ref(0);
let currentTemperature = ref(0);
let updateInterval = 2000;
let updateIntervalId = null;

async function updateSensorLatestData() {
    try {
        const latestHumidity = await secureFetch(API_PATH.sensors + "/1" + API_ENDPOINT.getLatest, {
            method: 'GET',
            credentials: 'include'
        });

        currentHumidity.value = latestHumidity.value;

        const latestTemperature = await secureFetch(API_PATH.sensors + "/2" + API_ENDPOINT.getLatest, {
            method: 'GET',
            credentials: 'include'
        });

        currentTemperature.value = latestTemperature.value;
    }
    catch (err) {
        toast.error('Error update environment factors:' + err.message, toastOptions);
    }
}

onMounted(() => {
    updateSensorLatestData();
    updateIntervalId = setInterval(updateSensorLatestData, updateInterval);
})

onUnmounted(() => {
    clearInterval(updateIntervalId);
})

</script>