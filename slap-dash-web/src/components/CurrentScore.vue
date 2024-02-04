<template>
  <h3>
    Score: {{ gameStore.score }} / {{ gameStore.game.questionNumber }}
  </h3>
</template>

<script lang="ts">
import { useGameStore } from '@/stores/game';
export default {
  setup() {
    const gameStore = useGameStore()
    return {gameStore}
  },   
}
</script>

<style scoped>
h3 {
  font-size: 1.2rem;
  text-align: center;
}
</style>