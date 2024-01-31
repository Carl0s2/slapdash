<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="300" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">Slap-Dash</h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://github.com/Carl0s2/slapdash"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-github" size="large" start />

            Github Repo
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            @click="createGameSession"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            variant="flat"
          >
            <v-icon icon="mdi-controller" size="large" start />

            Play Game
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import router from "@/plugins/router";

//
// need to call create game session and then router route to game with id as param
// we could also just store the game session off the bat here and then use that for the full game
// but that would be a lot of data to store in the vuex store
// so we should probably just store the id and then fetch the game session when we need it
function createGameSession() {
  // create game session here
  // api call create/get session
  const gameSessionId = "123"; // get game session id from api call
  // then push
  router.push({ name: "game", params: { id: gameSessionId } });
}
</script>
