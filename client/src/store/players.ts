import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { CreatePlayerData, Player, UpdatePlayerData } from '@/types/players';
import { useSocketStore } from './socket';

export const usePlayersStore = defineStore('players', () => {
  const socketStore = useSocketStore();

  const current = ref<Player | null>(null);
  const players = ref<Player[]>([]);

  const map = computed(() => {
    return players.value.reduce<Record<string, Player>>((acc, player) => {
      acc[player.id] = player;
      return acc;
    }, {});
  });

  const findById = (id: string) => map.value[id];

  const create = (data: CreatePlayerData) => {
    socketStore.emit({
      event: 'createPlayer',
      data,
      callback: (player) => {
        current.value = player;
        ElMessage({ message: 'Добро пожаловать!', type: 'success' });
        console.log('createPlayer', player);
      },
    });
  };

  const update = (data: UpdatePlayerData, message?: string) => {
    socketStore.emit({
      event: 'updatePlayer',
      data,
      callback: (player) => {
        if (message) {
          ElMessage({ message, type: 'success' });
        }
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
    findById,
    create,
    update,
    getDice,
  };
});
