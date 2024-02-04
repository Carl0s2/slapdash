<template>
  <v-sheet max-width="400" class="mx-auto mt-12" >
      <CurrentScore />
      <ConfettiExplosion :stageHeight="300" :duration="4000"  :particleCount="100" :force="0.3"></ConfettiExplosion>
      <v-btn
        color="success"
        class="mt-2"
        block
        @click="submit"
        >
        Play again
      </v-btn>    
  </v-sheet>

</template>
<script lang="ts">
import CurrentScore from '@/components/CurrentScore.vue'
import ConfettiExplosion from "vue-confetti-explosion";
import { useGameStore } from '@/stores/game'
import { useSnackbar } from '@/stores/snackbar'
export default {
  setup() {
      const gameStore = useGameStore()
      const snackbar = useSnackbar()
    return {gameStore, snackbar}
  },   
  components: {CurrentScore, ConfettiExplosion},
  data: () => ({
      loading: false
    }),

  methods: {
    async submit(){
      // reset game to go back to start
      this.gameStore.score = 0
      this.gameStore.game.id = undefined
    }
  }
  }
</script>

<style>

</style>
