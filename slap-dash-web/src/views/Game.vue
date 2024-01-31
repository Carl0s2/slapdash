<template>
  <v-container>
    <v-row>
      <v-col> Question Number: {{ questionNumber }} </v-col>
      <v-col> Timer: </v-col>
      <v-col> Score: {{ score }}/10 </v-col>
    </v-row>
    <v-row> <Question :question="question" /> </v-row>
    <v-row> <Answer /> </v-row>
  </v-container>
</template>
<script setup lang="ts">
import Question from "../components/Question.vue";
import Answer from "../components/Answer.vue";

const questionNumber = 1;
const score = 0;
// implement timer here
// logic for game here basically do what the game session api call tells you to do?
// maybe have a game session component that handles the logic for the game
const question = "What is the capital of France?";
</script>
