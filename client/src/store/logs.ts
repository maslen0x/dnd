import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Log } from '@/types/logs';

export const useLogsStore = defineStore('logs', () => {
  const logs = ref<Log[]>([]);

  return {
    logs,
  };
});
