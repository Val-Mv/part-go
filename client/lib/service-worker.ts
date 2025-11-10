export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      console.log('Service Worker registered successfully:', registration);
      return registration;
    } catch (error) {
      console.log('Service Worker registration failed:', error);
    }
  }
};
