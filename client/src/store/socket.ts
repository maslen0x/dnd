import { computed } from 'vue';
import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { Log } from '@/types/logs';
import { Player } from '@/types/players';
import { SocketEmit } from '@/types/socket';
import { useLogsStore } from './logs';
import { usePlayersStore } from './players';

export const useSocketStore = defineStore('socket', () => {
  const playersStore = usePlayersStore();
  const logsStore = useLogsStore();

  const socket = io(import.meta.env.VITE_APP_API_URL);

  const id = computed(() => socket.id);

  socket.on('connect', () => {
    console.log('connect', socket.id);

    socket.on('disconnect', (reason) => {
      playersStore.current = null;
      ElMessage({ message: 'Дисконнект!', type: 'error' });
      console.log('disconnect', reason);
    });

    socket.emit('findAllPlayers', {}, (players: Player[]) => {
      playersStore.players = players;
      console.log('findAllPlayers', players);
    });

    socket.emit('findAllLogs', {}, (logs: Log[]) => {
      logsStore.logs = logs;
      console.log('findAllLogs', logs);
    });
  });

  socket.on('updatePlayers', (players: Player[]) => {
    playersStore.players = players;
    console.log('updatePlayers', players);
  });

  socket.on('updateLogs', (logs: Log[]) => {
    logsStore.logs = logs;
  });

  const emit = (payload: SocketEmit) => {
    socket.emit(payload.event, payload.data, payload.callback);
  };

  return { id, emit };
});
