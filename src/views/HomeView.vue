<script setup>
import { ref, watch } from 'vue';
import { generatePayload } from '../lib/helpers';

const myToken = ref(null);

const emit = defineEmits(['message']);

async function populateToken() {
  myToken.value = await generatePayload();
}
populateToken();

watch(() => !!myToken.value, () => {
  emit('message', {
    token: myToken.value.token,
    personalAccessToken: myToken.value.personalAccessToken,
  });
});
</script>

<template>
  <div />
</template>
