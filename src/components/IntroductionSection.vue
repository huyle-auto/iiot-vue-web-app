<!-- IntroductionSection.vue -->
<script setup>
const props = defineProps(['name', 'address', 'education'])
</script>

<template>
  <section>
    <p><strong>Name:</strong> {{ props.name }}</p>
    <p><strong>Address:</strong> {{ props.address }}</p>
    <p><strong>Education:</strong> {{ props.education }}</p>
  </section>
</template>

<style scoped>
section {
  font-size: 16px;
  color: #333;
  line-height: 1.5;
}
strong {
  color: #555;
}
</style>
