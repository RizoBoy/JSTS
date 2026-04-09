export function createStore(reducer, preloadedState) {
  let state = preloadedState ?? reducer(undefined, { type: '__INIT__' });
  let listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.slice().forEach((l) => l());
    return action;
  }

  function subscribe(listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  dispatch({ type: '__INIT__' });

  return {
    getState,
    dispatch,
    subscribe
  };
}