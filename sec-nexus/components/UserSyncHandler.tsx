"use client"; // This component needs to be a client component

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

function UserSyncHandler() {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Trigger the backend sync
      fetch('/api/users-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // No body needed as the backend fetches user info from Clerk
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => console.log('User synced successfully:', data))
      .catch(error => console.error('Error syncing user:', error));
    }
  }, [isLoaded, isSignedIn, user]); // Re-run when user status changes

  return null; // This component doesn't render anything, just handles the sync
}

export default UserSyncHandler;