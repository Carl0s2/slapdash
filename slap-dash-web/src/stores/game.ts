import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
     game: {id: undefined, questionIndex:0, questionNumber: 0, timeLimit: undefined,completed: undefined},
     question: {id: undefined, questionIndex: 0, question: "", imageUrl: ""},
     options: [{id: undefined, text: ""}],
     score: 0,
     user: {userId: undefined, userName: undefined}
  }),
  getters:{
    gameState(): string {
      if (!this.game.id) {
        return 'start'
      }
      if (!this.game.completed && this.game.questionIndex > 0 && this.question.id){
        return 'question'
      }
      if (!this.game.completed && !this.question.id){
        return 'nextQuestion'
      }
      if (this.game.completed){
        return 'end'
      }
      return 'unknown'
    },
    imageUrl(): string {
        return this.gameState === 'question' 
        ? this.question.imageUrl 
        : 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg'
    },
    mainMsg(): string {
      return this.gameState === 'question' ? `Who's that Pokémon?` : "" 
    },
    subMsg(): string {
      return this.gameState === 'start' ? "This is a quiz game, where you have 10 rounds to guess the correct character." : ""
    }

  }

  
})