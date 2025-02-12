<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref, watch } from 'vue';

const myToken = ref(null);

async function generatePayload() {
  return setTimeout(() => {
    Promise.resolve({
      __typename: 'GenerateTokenResponse',
      token: 'abc123',
      personalAccessToken: {
        __typename: 'PersonalAccessToken',
        id: 'abc1234',
        name: 'my token',
        description: null,
        expiration: (new Date()).toISOString(),
        _deleted: null,
      }
    })
  }, 500);
}

async function populateToken() {
  myToken.value = await generatePayload();
}
populateToken();

watch(() => !!myToken.value, () => {
  emitMessage({
    token: myToken.value.token,
    personalAccessToken: myToken.value.personalAccessToken,
  });
});

function emitMessage(message) {
  const jsonString = JSON.stringify(message);

  if (window?.webkit?.messageHandlers?.jmp) {
    window.webkit.messageHandlers.jmp.postMessage(message);
    console.info(`Mac host was found for message: ${jsonString}`);
  }
  else {
    console.error(`Native host was not found for message: ${jsonString}`);
  }
}
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
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
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
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
