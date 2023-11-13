import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { CreatePlayerData, Player } from '@/types/players';
import { useSocketStore } from './socket';

export const usePlayersStore = defineStore('players', () => {
  const socketStore = useSocketStore();

  const current = ref<Player | null>(null);
  const players = ref<Player[]>([]);

  const create = (data: CreatePlayerData) => {
    socketStore.emit({
      event: 'createPlayer',
      data,
      callback: (player) => {
        ElMessage({
          message: 'Добро пожаловать!',
          type: 'success',
        });
        console.log('createPlayer', player);
        current.value = player;
      },
    });
  };

  const getDice = (dice: number) => {
    socketStore.emit({
      event: 'getDice',
      data: dice,
      callback: (value) => {
        ElMessage(`Результат: ${value}`);
      },
    });
  };

  return {
    current,
    players,
    create,
    getDice,
  };
});
