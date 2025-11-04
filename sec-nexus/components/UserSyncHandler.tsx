"use client"; // This component needs to be a client component

import { useUser, useAuth } from '@clerk/nextjs';
import { useEffect } from 'react';

function UserSyncHandler() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    const syncUser = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const token = await getToken();
          // Trigger the backend sync
          const response = await fetch('/api/users-sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            // No body needed as the backend fetches user info from Clerk
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('User synced successfully:', data);
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, user, getToken]); // Re-run when user status changes

  return null; // This component doesn't render anything, just handles the sync
}

export default UserSyncHandler;