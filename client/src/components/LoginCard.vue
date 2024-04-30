<script setup lang="ts">
import { ref } from 'vue';
import CreateMasterForm from './CreateMasterForm.vue';
import CreatePlayerForm from './CreatePlayerForm.vue';

const activeTab = ref('player');
</script>

<template>
  <el-container :class="$style.container">
    <el-card :class="$style.card">
      <el-tabs
        v-model="activeTab"
        stretch
      >
        <el-tab-pane
          label="Игрок"
          name="player"
        >
          <CreatePlayerForm />
        </el-tab-pane>

        <el-tab-pane
          label="Гейм-мастер"
          name="master"
        >
          <CreateMasterForm />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-container>
</template>

<style module lang="scss">
.container {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
}

.card {
  width: 100%;
  max-width: 500px;

  :global(.el-card__body) {
    padding-bottom: 2px;
  }
}
</style>
