<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const log = ref([]);
const route = useRoute();

function emitMessage(message) {
  const jsonString = JSON.stringify(message, null, 2);

  if (window?.webkit?.messageHandlers?.jmp) {
    log.value.push(`Function found: ${window.webkit.messageHandlers.jmp.postMessage}`);
    window.webkit.messageHandlers.jmp.postMessage(message);
    console.info(`Mac host was found for message: ${jsonString}`);
    log.value.push(jsonString);
  }
  else {
    const err = `Native host was not found for message: ${jsonString}`;
    console.error(err);
    log.value.push(err);
  }
}

watch(() => route.name, () => {
  log.value = [];
})

const logText = computed(() => {
  return log.value.join('\n');
});
</script>

<template>
  <h1>Safari Post message Log</h1>
  <nav>
    <router-link to="/">Ref Value - Not Working</router-link>
    <router-link to="/working">Raw Object - Working</router-link>
  </nav>
  <code class="log">
    {{ logText }}
  </code>
  <router-view @message="emitMessage" />
</template>

<style scoped>
.log {
  white-space: pre;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  min-width: 400px;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
