<script setup lang="ts">
defineProps<{
  msg: string,
  subMsg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      {{ subMsg }}
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 200;
  font-size: 1.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
    padding-left: 2rem;
  }
}
</style>
