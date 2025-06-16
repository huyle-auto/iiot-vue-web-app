<template>
  <v-container class="ml-2">
    <v-date-input />
    <v-data-table :headers="headers" :items="items" fixed-header height="400px" class="elevation-1" />
    <v-btn @click="updateHistory" color="primary">Update History</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vuetify-sonner'
import toastOptions from '@/toast/toastOptions';
import { secureFetch } from '@/api/utils/secureFetch';
import { API_ENDPOINT, API_PATH } from '@/api/config';

const headers = ref([
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' }
]);
const items = ref([]);

async function updateHistory() {
  try {
    const result = await secureFetch(API_PATH.users + API_ENDPOINT.getAllUsers, {
      method: 'GET',
      credentials: 'include'
    })

    console.log(result);
    items.value = result.map(user => ({
      name: user.name,
      email: user.email
    }));
  }
  catch (err) {
    toast.error('Error get all users:' + err.message, toastOptions);
  }
}

</script>