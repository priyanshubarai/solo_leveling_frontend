import { useAuth, useUser } from "@clerk/react";
import { useEffect, useRef } from "react";
import { syncUser } from "@/lib/api/usersApi";

export default function AuthWatcher() {
  const { isSignedIn, isLoaded } = useAuth();
  const hasSynced = useRef(false);

  useEffect(() => {
    console.log("AuthWatcher is running");
    if (!isLoaded || !isSignedIn || hasSynced.current){
      console.log("User is not Signed In");
      return;
    } 
    console.log("User is signed in!");
    (async () => {
        const res = await syncUser();
        hasSynced.current = true;
        console.log("New user created : ",res.status,res.data);   
    })();
  }, [isLoaded, isSignedIn]);

  return null;
}