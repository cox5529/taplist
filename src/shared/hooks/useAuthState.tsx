import { User } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";


export const useAuthState = (): [User | null, boolean] => {
  const [authState, setAuthState] = useState<User | null>(null);
  const [isAuthStateLoading, setAuthStateLoading] = useState(true);

  auth.onAuthStateChanged((user) => {
    setAuthState(user);
    setAuthStateLoading(false);
  });

  auth.authStateReady().then(() => {
    setAuthState(auth.currentUser);
    setAuthStateLoading(false);
  });

  return [authState, isAuthStateLoading];
};
