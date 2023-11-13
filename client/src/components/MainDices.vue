<script setup lang="ts">
import { usePlayersStore } from '@/store/players';

const playersStore = usePlayersStore();

const dices = [4, 6, 8, 10, 12, 20, 100];
</script>

<template>
  <h2 :class="$style.title">Кубики</h2>

  <el-space>
    <el-button
      v-for="dice in dices"
      :key="dice"
      @click="playersStore.getDice(dice)"
    >
      D{{ dice }}
    </el-button>
  </el-space>
</template>

<style module lang="scss">
.title {
  margin-bottom: 24px;
}
</style>
