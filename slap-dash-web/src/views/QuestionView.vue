<template>
  
  <v-sheet max-width="400" class="mx-auto mt-12">
    <div class="text-center mx-auto mb-1">
      {{ remainingTime }}
    </div>
    <v-progress-linear color="primary" :model-value="remainingTime" :max="gameStore.game.timeLimit" :height="5"></v-progress-linear>

    <v-item-group>
      <v-container>
        <v-row>
          <v-col
            v-for="option in gameStore.options"
            :key="option.id"
            cols="12"
            md="12"
            class="d-flex justify-center align-center"
          >
            <v-item>
              <v-btn
                :disabled="optionSelected || outOfTime"
                :color="option.id === selected ? 'primary' : ''"
                @click="submit(option.id)"
                variant="text"
              > 
                {{ option.text }}
              </v-btn>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
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
      loading: false,
      selected: 0,
      remainingTime: 20,
      outOfTime: false,
      get optionSelected() : boolean {
       return this.selected !== 0 
      }, 
    }),
    mounted(){
      this.remainingTime = this.gameStore.game.timeLimit
      this.countDownTimer()
    },
    methods: {
      countDownTimer () {
        if (this.remainingTime > 0 && !this.optionSelected) {
          setTimeout(() => {
              this.remainingTime -= 1
              this.countDownTimer()
          }, 1000)
        }
      },
     async submit(optionId: number){
      if (this.outOfTime) {
        alert('too slow')
        return
      }
      this.selected = optionId;

        axios.post(`${import.meta.env.VITE_BASEURL}api/game/${this.gameStore.game.id}/user/${this.gameStore.user.id}/answer/${optionId}`)
          .then( (response) => {
            this.loading = true;
            this.snackbar.color = response.data ? 'success' : ''
            this.snackbar.text = response.data ? 'Correct': 'False'
            this.snackbar.show = true
            axios.get(`${import.meta.env.VITE_BASEURL}api/game/${this.gameStore.game.id}/score/${this.gameStore.user.id}`)
              .then((response) => {
                this.gameStore.score = response.data.score;
                // trigger game state into next question
                this.gameStore.question.id = undefined;
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
    },
  }
</script>

<style>

</style>
