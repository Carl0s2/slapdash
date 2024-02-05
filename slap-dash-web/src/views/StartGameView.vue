<template>
  <v-sheet class="mx-auto mt12" v-if="loading">
    <!-- Could have some fun with differnt messages here -->
    <h2>
      Creating your game
    </h2>
    <VProgressLinear color="primary" indeterminate :height="8" />
  </v-sheet>

  <v-sheet max-width="400" class="mx-auto mt-2" v-else>
    <!-- Todo: add aditional game settings {time limit, Question number, Question source } -->
    <v-form validate-on="input" @submit.prevent ref="form">
      <v-text-field v-model="gameStore.user.userName" :rules="rules" label="Username"></v-text-field>
      <v-btn color="success" class="mt-2" block :disabled="!gameStore.user.userName" @click="submit">
        Start Game
      </v-btn>
    </v-form>
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
    return { gameStore, snackbar }
  },
  data: () => ({
    loading: false,
    rules: [
      (value: any) => {
        if (value) return true
        return 'You must enter a Username.'
      },
      (value: any) => {
        if (value.length <= 10) return true
        return 'Username must be less than 10 charaters'
      }
    ],
  }),
  methods: {
    async submit() {
      //@ts-expect-error Object is of type 'unknown'.ts(2571) 
      const { valid } = await this.$refs.form.validate()
      if (!valid) return;
      // todo: if userid alrady exists don't create a new user every time they start a new game
      axios.post(`${import.meta.env.VITE_BASEURL}api/user/`, { name: this.gameStore.user.userName })
        .then((response) => {
          this.gameStore.user.id = response.data.id
          this.loading = true;
          axios.post(`${import.meta.env.VITE_BASEURL}api/game/`, { userId: response.data.id })
            .then((response) => {
              this.gameStore.game = response.data
              this.loading = false
            }).catch((response) => {
              this.snackbar.text = response.data?.message
              this.snackbar.show = true
            })
        }).catch((response) => {
          this.snackbar.text = response.data?.message
          this.snackbar.show = true
        })
    }
  }
}
</script>

<style>
h2 {
  font-size: 1.2rem;
  text-align: center;
}
</style>
