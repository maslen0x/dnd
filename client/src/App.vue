<script setup lang="ts">
import CreatePlayerForm from '@/components/CreatePlayerForm.vue';
import PlayersList from '@/components/PlayersList.vue';
import LogsList from './components/LogsList.vue';
import MainDices from './components/MainDices.vue';
import { usePlayersStore } from './store/players';

const playersStore = usePlayersStore();
</script>

<template>
  <el-container
    v-if="playersStore.current"
    :class="$style.container"
  >
    <el-aside width="400px">
      <el-card :class="$style.scroll">
        <PlayersList />
      </el-card>
    </el-aside>

    <el-main>
      <el-card :class="$style.scroll">
        <MainDices />
        <el-divider />
      </el-card>
    </el-main>

    <el-aside width="400px">
      <el-card :class="$style.scroll">
        <LogsList />
      </el-card>
    </el-aside>
  </el-container>

  <CreatePlayerForm v-else />
</template>

<style module lang="scss">
.container {
  height: 100vh;
  padding: 16px;

  :global(.el-main) {
    padding: 0 16px;
  }
}

.scroll {
  height: 100%;
  overflow-y: auto !important;
}
</style>
