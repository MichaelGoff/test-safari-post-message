<script setup>
import { generatePayload } from '@/lib/helpers';
import { onMounted } from 'vue';

const emit = defineEmits(['message']);

onMounted(async () => {
  const payload = await generatePayload();

  emit('message', {
    token: payload.token,
    personalAccessToken: payload.personalAccessToken,
  });
});
</script>

<template>
  <div />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
