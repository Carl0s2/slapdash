<template>
  <v-sheet max-width="300" class="mx-auto mt-5">
      <v-btn
        color="success"
        class="mt-2"
        block
        @click="submit"
        >
        Begin question {{ gameStore.game.questionIndex + 1 }}
      </v-btn>    
  </v-sheet>

</template>
<script lang="ts">
import { useGameStore } from '@/stores/game'
import { useSnackbar } from '@/stores/snackbar'
import axios from 'axios'
export default {
    setup() {
      const gameStore = useGameStore()
      const snackbar = useSnackbar()
    return {gameStore, snackbar}
    },   
   data: () => ({
      loading: false
    }),
    methods: {
      async submit(){
        axios.post(`http://localhost:5000/api/game/${this.gameStore.game.id}/next/`)
          .then( (response) => {
            console.log(response);
            this.gameStore.game = response.data
            this.loading = true;
            axios.get(`http://localhost:5000/api/game/${this.gameStore.game.id}/question/`)
              .then((response) => {
                const {question, options} = response.data;
                this.gameStore.question = question
                this.gameStore.options = options
                this.loading = false
              }).catch((response) => {
                this.snackbar.text = response.data.message
                this.snackbar.show = true
              })
          }).catch((response) => {
            this.snackbar.text = response.data.message
            this.snackbar.show = true
          })
      }
    }
  }
</script>

<style>

</style>
