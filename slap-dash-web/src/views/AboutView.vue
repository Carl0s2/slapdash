<template>
  <div class="about">
  <v-sheet width="300" class="mx-auto">
    <v-form @submit.prevent>
      <v-text-field
        v-model="userName"
        :rules="rules"
        label="Username"
      ></v-text-field>
    
      <v-btn
          color="success"
          class="mt-4"
          block
          @click="submit"
        >
        submit
      </v-btn>    
    </v-form>
  </v-sheet>
  </div>
</template>
<script lang="ts">
export default {
  name: 'username',
    data: () => ({
      userName: '',
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
      methods: 
    }),
  }
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
