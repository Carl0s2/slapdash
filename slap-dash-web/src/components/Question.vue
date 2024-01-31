<template>
  <v-card>
    <v-card-title> IMAGE</v-card-title>
    <v-card-text>
      <p>{{ question }}</p>
    </v-card-text>
  </v-card>
</template>
<script setup lang="ts">
// get component props
import { defineProps } from "vue";
const props = defineProps({
  question: {
    type: String,
    required: true,
  },
});
</script>
```
