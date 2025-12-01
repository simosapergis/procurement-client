import { registerSW } from 'virtual:pwa-register';

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    registerSW({
      immediate: true,
      onNeedRefresh() {
        console.info('New content is available, please refresh.');
      },
      onOfflineReady() {
        console.info('App ready to work offline.');
      },
    });
  }
};
