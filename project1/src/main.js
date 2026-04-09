import { createStore } from './store/createStore.js';
import { combineReducers } from './store/combineReducers.js';
import { tasksReducer } from './store/reducers/tasksReducer.js';
import { Router } from './router/router.js';
import { HomePage } from './pages/HomePage.js';
import { AboutPage } from './pages/AboutPage.js';

const rootReducer = combineReducers({
  tasks: tasksReducer
});

const saved = localStorage.getItem('state');
const preloadedState = saved ? JSON.parse(saved) : undefined;

const store = createStore(rootReducer, preloadedState);

const root = document.createElement('div');
root.id = 'app';
document.body.appendChild(root);

const router = new Router(
  {
    '/': HomePage,
    '/about': AboutPage
  },
  { store }
);

router.init();

store.subscribe(() => {
  localStorage.setItem('state', JSON.stringify(store.getState()));
  router.render();
});