<template>
  <v-sheet class="mx-auto mt-5">
    <v-item-group :disabled="selected">
      <v-container>
        <v-row>
          <v-col
            v-for="option in gameStore.options"
            :key="option.id"
            cols="12"
            md="4"
          >
            <v-item v-slot="{ isSelected, toggle }">
              <v-card
                :color="isSelected ? 'primary' : ''"
                class="d-flex align-center"
                dark
                height="200"
                @click="toggle"
              >
                <v-scroll-y-transition>
                  <div
                    class="text-h3 flex-grow-1 text-center"
                  >
                    {{ option.text }}
                  </div>
                </v-scroll-y-transition>
              </v-card>
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
      selected: false
    }),
   // methods: {
    //  async submit(){
      //   axios.post(`http://localhost:5000/api/game/${this.gameStore.game.id}/next/`)
      //     .then( (response) => {
      //       console.log(response);
      //       this.gameStore.game = response.data
      //       this.loading = true;
      //       axios.post(`http://localhost:5000/api/game/${this.gameStore.game.id}/question/`)
      //         .then((response) => {
      //           const {question, options} = response.data;
      //           this.gameStore.question = question
      //           this.gameStore.options = options
      //           this.loading = false
      //         }).catch((response) => {
      //           this.snackbar.text = response.data.message
      //           this.snackbar.show = true
      //         })
      //     }).catch((response) => {
      //       this.snackbar.text = response.data.message
      //       this.snackbar.show = true
      //     })
      // }
    //},
  }
</script>

<style>

</style>
