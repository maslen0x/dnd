<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { useSocketStore } from '@/store/socket';

const socketStore = useSocketStore();

const dices = [4, 6, 8, 10, 12, 20, 100];

const getDice = (dice: number) => {
  socketStore.emit({
    event: 'getDice',
    data: dice,
    callback: (value) => {
      ElMessage(`Результат: ${value}`);
    },
  });
};
</script>

<template>
  <h2 :class="$style.title">Кубики</h2>

  <el-space>
    <el-button
      v-for="dice in dices"
      :key="dice"
      @click="getDice(dice)"
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
