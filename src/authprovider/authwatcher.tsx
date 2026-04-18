import { useAuth, useUser } from "@clerk/react";
import { useEffect, useRef } from "react";
import { SyncUser } from "@/lib/api/usersApi";

export default function AuthWatcher() {
  const { isSignedIn, isLoaded } = useAuth();
  const hasSynced = useRef(false);

  const syncUserMutation = SyncUser();

  useEffect(() => {
    console.log("AuthWatcher is running");
    if (!isLoaded || !isSignedIn || hasSynced.current){
      console.log("User is not Signed In");
      return;
    } 
    console.log("User is signed in!");
    hasSynced.current = true;
    syncUserMutation.mutate();
  }, [isLoaded, isSignedIn]);

  return null;
}