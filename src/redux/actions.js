import {
  ASYNC_INCREMENT,
  CHANGE_THEME,
  DECREMENT,
  DISABLE_BUTTONS,
  ENABLE_BUTTONS,
  INCREMENT,
} from './types';

export function increment() {
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}

export function asyncIncrement() {
  return function (dispatch) {
    dispatch(disableButton());
    setTimeout(() => {
      dispatch({ type: ASYNC_INCREMENT });
      dispatch(enableButton());
    }, 2000);
  };
}

export function changeTheme(newTheme) {
  return { type: CHANGE_THEME, payload: newTheme };
}

export function enableButton() {
  return { type: ENABLE_BUTTONS };
}

export function disableButton() {
  return { type: DISABLE_BUTTONS };
}
