<script lang="ts">
import TheMessage from './components/TheMessage.vue'
import TheSnackbar from './components/TheSnackbar.vue'
import StartGameView from './views/StartGameView.vue'
import NextQuestionView from './views/NextQuestionView.vue'
import QuestionView from './views/QuestionView.vue'
import EndView from './views/EndView.vue'
import {useGameStore} from './stores/game'
export default {
  setup() {
    const gameStore = useGameStore()
  return {gameStore}
  },
  components: { TheMessage, StartGameView, TheSnackbar, NextQuestionView, QuestionView, EndView }
}

</script>

<template>
  <header>
    <img alt="Image" class="mainImage" :src="gameStore.imageUrl" width="125" height="125" />
    <div class="wrapper">
      <TheMessage :msg="gameStore.mainMsg" :subMsg="gameStore.subMsg" />
    </div>
  </header>
  <main>
    <StartGameView v-if="gameStore.gameState === 'start'" />
    <NextQuestionView v-else-if="gameStore.gameState === 'nextQuestion'"/>
    <QuestionView v-else-if="gameStore.gameState === 'question'"/>
    <EndView v-else-if="gameStore.gameState === 'end'" />
    <TheSnackbar></TheSnackbar>
  </main>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.mainImage {
  display: block;
  margin: 0 auto 2rem;
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
}
</style>
