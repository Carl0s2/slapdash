<template>
  <v-sheet max-width="400" class="mx-auto mt-12" v-if="loading">
    <VProgressCircular color="primary" indeterminate></VProgressCircular>
  </v-sheet>
  <v-sheet max-width="400" class="mx-auto mt-12" v-else>
      <CurrentScore />
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
import CurrentScore from '@/components/CurrentScore.vue'
import { useGameStore } from '@/stores/game'
import { useSnackbar } from '@/stores/snackbar'
import axios from 'axios'
export default {
  setup() {
      const gameStore = useGameStore()
      const snackbar = useSnackbar()
    return {gameStore, snackbar}
  },   
  components: {CurrentScore},
  data: () => ({
      loading: false
    }),
  mounted(){
    if(this.gameStore.game.questionIndex === this.gameStore.game.questionNumber){
      axios.post(`${import.meta.env.VITE_BASEURL}api/game/${this.gameStore.game.id}/next/`)
        .then( (response) => {
          this.gameStore.game = response.data
        }).catch((response) => {
          this.snackbar.text = response.data.message
          this.snackbar.show = true
        })
    }
  },
  methods: {
    async submit(){
      axios.post(`${import.meta.env.VITE_BASEURL}api/game/${this.gameStore.game.id}/next/`)
        .then( (response) => {
          this.gameStore.game = response.data
          this.loading = true;
          axios.get(`${import.meta.env.VITE_BASEURL}api/game/${this.gameStore.game.id}/question/`)
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
