<script setup lang="ts">
import { Right } from '@element-plus/icons-vue';
import { characteristics } from '@/data/characteristics';
import { useLogsStore } from '@/store/logs';
import { Characteristic } from '@/types/characteristics';
import { Log } from '@/types/logs';
import { formatDate, formatTime } from '@/utils/format';

const events: Record<Log['event'], string> = {
  connect: 'подключился',
  disconnect: 'отключился',
  dice: 'кинул кубик',
  updatePlayer: 'обновил персонажа',
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

      <div v-else-if="log.event === 'updatePlayer'">
        <el-space v-if="log.value.new.health">
          Здоровье:
          {{ log.value.old.health }}
          <el-icon>
            <Right />
          </el-icon>
          {{ log.value.new.health }}
        </el-space>

        <div v-if="log.value.new.characteristics">
          <el-space
            v-for="[key, value] in Object.entries(log.value.new.characteristics)"
            :key="key"
            class="full-width"
          >
            {{ characteristics[key as Characteristic] }}:
            {{ log.value.old.characteristics[key as Characteristic] }}
            <el-icon>
              <Right />
            </el-icon>
            {{ value }}
          </el-space>
        </div>
      </div>
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
