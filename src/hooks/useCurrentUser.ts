"use client"
import { auth } from "@/firebase/config";
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useCurrentUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.replace("/auth/login");
      }
    });
  }, [router]);

  return user;
};

export default useCurrentUser;
