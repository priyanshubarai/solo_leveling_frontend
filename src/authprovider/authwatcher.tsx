import { useEffect, useRef } from "react";
import { SyncUser } from "@/lib/api/usersApi";
import { authClient } from "@/lib/auth-client"

export default function AuthWatcher() {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    // refetch //refetch the session
  } = authClient.useSession()
  const hasSynced = useRef(false);
  const syncUserMutation = SyncUser();

  useEffect(() => {
    if (!isPending || !session || hasSynced.current) {
      console.log("User is not Signed In");
      return;
    }
    if(error){
      console.log("Error in auth Watcher : ", error);
      return;
    }
    console.log("User is signed in!");
    hasSynced.current = true;
    syncUserMutation.mutate();
  }, [isPending, session]);

  return null;
}