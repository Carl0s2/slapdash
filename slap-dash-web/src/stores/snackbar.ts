import { defineStore } from 'pinia'

export const useSnackbar = defineStore('snackbar', {
  state: () => ({
     show: false, text:'', color: 'error',
  }), 
})
