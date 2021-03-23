import { applyMiddleware, createStore, compose } from 'redux';
//import createStore from './createStore';  //работает без Middleware
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {
  asyncIncrement,
  changeTheme,
  decrement,
  increment,
} from './redux/actions';
import { rootReducer } from './redux/rootReducer';

import './styles.css';

// //пишем свой Middleware
// function logger(state) {
//   return function (next) {
//     return function (action) {
//       console.log(state);
//       console.log(state.getState()); // до изменения состояния
//       console.log(action);

//       return next(action);
//     };
//   };
// }

const counter = document.getElementById('counter');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const asyncBtn = document.getElementById('async');
const themeBtn = document.getElementById('theme');

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  ),
);

addBtn.addEventListener('click', () => {
  store.dispatch(increment());
});

subBtn.addEventListener('click', () => {
  store.dispatch(decrement());
});

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement());
});

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';

  store.dispatch(changeTheme(newTheme));
});

//подписываемся на изменения стейта и отправляем ы подписку функцию которая вызоветься когда измениться стайт
store.subscribe(() => {
  const state = store.getState();

  counter.textContent = state.counter;
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled;
  });
});

store.dispatch({ type: 'INIT_APPLICATION' });
