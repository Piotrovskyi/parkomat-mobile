const state = {};
const subscribers = [];

const trigger = () => {
  subscribers.forEach(listener => {
    if (!listener) return;
    listener(state);
  });
};

export const getState = () => state;

export const setState = newPartOfState => {
  Object.assign(state, newPartOfState);
  trigger();
};

export const subscribe = listener => {
  subscribers.push(listener);
  const index = subscribers.indexOf(listener);
  return () => {
    subscribers[index] = null;
  };
};
