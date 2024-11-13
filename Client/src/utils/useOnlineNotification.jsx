import React, { useSyncExternalStore } from 'react';

// Define a handler function for online/offline events
const handleOnlineOfflineChange = (callback) => {
  const onOnline = () => callback(true);
  const onOffline = () => callback(false);

  // Subscribe to online and offline events
  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);

  // Return the cleanup function to unsubscribe from events
  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", onOffline);
  };
};

// Define the snapshot function to get the current online status
const getOnlineSnapshot = () => {
  return navigator.onLine;
};

// Optionally, you can define a fallback server-side function 
// that might always return true if you don't rely on the browser's state
const getServerOnlineSnapshot = () => {
  return true; // For example, assuming server-side is always online
};

const useOnlineNotification = () => {
  // Use the `useSyncExternalStore` hook to manage subscriptions
  return useSyncExternalStore(
    handleOnlineOfflineChange, // subscribe function
    getOnlineSnapshot,         // snapshot for the online status
    getServerOnlineSnapshot    // fallback snapshot
  );
};

export default useOnlineNotification;
