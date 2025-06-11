<template>
  <v-container class="ml-2">
    <v-date-input />
    <v-data-table :headers="headers" :items="items" fixed-header height="400px" class="elevation-1" />
    <v-btn @click="showToast" color="primary">Show Toast</v-btn>
    <v-btn @click="updateHistory" color="primary">Update History</v-btn>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { toast } from 'vuetify-sonner'

const headers = ref([
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' }
]);
const items = ref([]);

function updateHistory() {
  fetch('http://localhost:3000/api/v1/users', {
    method: 'GET',
    credentials: 'include'
  })
    .then(res => res.json())
    .then(data => {
      items.value = data.map(user => ({
        name: user.name,
        email: user.email
      }));
    })
    .catch(err => {
      console.error('Error loading history: ', err.message);
    })
}

async function testLogin() {
  try {
    const response = await fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'lequanghuyqn123@gmail.com',
        password: 'stanps77'
      })
    })

    const result = await response.json();

    if (!response.ok) {
      showToast('Login failed: ' + result.message, 'error');
      throw new Error(result.message);
    }
    else {
      showToast('Login successful!', 'success');
    }
  }
  catch (err) {
    showToast('Login failed: ' + err.message, 'error');
  }
}

function showToast(message, type) {
  if (type === 'error') {
    toast.error(message, {
      position: 'top-right',
      duration: 3000,
      icon: 'mdi-alert-circle',
      closeButton: true,
      important: true,
      duration: 2000
    });
  }
  else {
    toast.success(message, {
      position: 'top-right',
      duration: 3000,
      icon: 'mdi-check-circle',
      closeButton: true,
      important: true,
      duration: 2000
    });
  }
}
</script>