import { writable } from 'svelte/store';

const createThemeStore = () => {
  const { subscribe, set, update } = writable<'light' | 'dark'>('light');

  return {
    subscribe,
    set,
    toggle: () => update(theme => theme === 'light' ? 'dark' : 'light')
  };
};

export const theme = createThemeStore(); 