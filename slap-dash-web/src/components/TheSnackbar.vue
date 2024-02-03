<template>
    <div>
        <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        timeout="2000"
      >
        {{ snackbar.text }}
  
        <template v-slot:actions>
          <v-btn
            color="blue"
            variant="text"
            @click="snackbar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSnackbar } from '@/stores/snackbar';
export default defineComponent({
    setup () {
        const snackbar = useSnackbar()

        return {snackbar}
    }
})
</script>

<style scoped>

</style>