import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Player } from '@/types/players';

export const usePlayersStore = defineStore('players', () => {
  const current = ref<Player | null>(null);
  const players = ref<Player[]>([]);

  return {
    current,
    players,
  };
});
