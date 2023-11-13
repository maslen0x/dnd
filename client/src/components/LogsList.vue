<script setup lang="ts">
import { useLogsStore } from '@/store/logs';
import { Log } from '@/types/logs';
import { formatDate, formatTime } from '@/utils/format';

const events: Record<Log['event'], string> = {
  connect: 'подключился',
  disconnect: 'отключился',
  dice: 'кинул кубик',
};

const logsStore = useLogsStore();
</script>

<template>
  <h2>Журнал событий</h2>

  <template
    v-for="log in logsStore.logs"
    :key="log.date"
  >
    <el-divider />

    <el-space
      :class="$style.space"
      direction="vertical"
      alignment="start"
    >
      <el-tooltip
        :content="formatDate(log.date)"
        placement="top"
      >
        <el-text type="info">{{ formatTime(log.date) }}</el-text>
      </el-tooltip>

      <div>
        {{ log.player }} {{ events[log.event] }}
        <template v-if="log.event === 'dice'">D{{ log.value.dice }}</template>
      </div>

      <div v-if="log.event === 'dice'">Результат: {{ log.value.value }}</div>
    </el-space>
  </template>
</template>

<style module lang="scss">
.space {
  :global(.el-space__item) {
    &:last-child {
      padding-bottom: 0 !important;
    }
  }
}
</style>
