import { createApp } from 'vue';
import App from './App.vue';
import { store } from './core/store';
import { ui } from './core/ui';
import './style.scss';

const app = createApp(App);

app.use(store);
app.use(ui);

app.mount('#app');
