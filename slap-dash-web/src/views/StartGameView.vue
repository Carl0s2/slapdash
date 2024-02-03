<template>
  <v-sheet class="mx-auto mt5" v-if="loading">
    <h2>
      Loading
    </h2>
    <VProgressLinear color="primary" indeterminate :height="8" />

  </v-sheet>
  
  <v-sheet max-width="300" class="mx-auto mt-5" v-else>
    <v-form validate-on="input" @submit.prevent ref="form">
      <v-text-field
        v-model="gameStore.user.userName"
        :rules="rules"
        label="Username"

      ></v-text-field>
    
      <v-btn
        color="success"
        class="mt-2"
        block
        :disabled="!gameStore.user.userName"
        @click="submit"
        >
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
    return {gameStore, snackbar}
    },   
   data: () => ({
      loading: false,
      rules: [
        (value: any) => {
          if (value) return true
          return 'You must enter a Username.'
        },
        (value: any) => {
          if(value.length <= 10) return true
          return 'Username must be less than 10 charaters'
        }
      ],
    }),
    methods: {
      async submit(){
        //@ts-expect-error Object is of type 'unknown'.ts(2571) 
        const { valid } = await this.$refs.form.validate()
        if (!valid) return;
        
        axios.post('http://localhost:5000/api/user/', {name: this.gameStore.user.userName})
          .then( (response) => {
            console.log(response);
            this.gameStore.user.userId = response.data.id
            this.loading = true;
            axios.post('http://localhost:5000/api/game/', {userId: response.data.id})
              .then((response) => {
                // const {userId, questionNumber, questionIndex, timeLimit, completed} = response.data;
                this.gameStore.game = response.data
                this.loading = false
              }).catch((response) => {
                this.snackbar.text = response.data?.message
                this.snackbar.show = true
              })
          }).catch((response) => {
            console.log(JSON.stringify(response))
            this.snackbar.text = response.data?.message ?? JSON.stringify(response)
            this.snackbar.show = true
          })
      }
    }
  }
</script>

<style>

</style>
