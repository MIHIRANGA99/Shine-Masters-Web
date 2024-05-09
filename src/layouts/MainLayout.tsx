"use client";
import Header from "@/components/Header";
import mainTheme from "@/constants/theme";
import { NavItem } from "@/types/NavItem";
import { Snackbar, ThemeProvider } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { useEffect } from "react";
import { auth } from "@/firebase/config";
import { usePathname, useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";

type Props = {
  children: React.ReactNode | JSX.Element;
};

const MainLayout = (props: Props) => {
  const navItems: NavItem[] = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Services", path: "/services" },
  ];

  const user = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/auth/login" && pathname !== "/auth/register") {
      if (user) {
        console.log(user);
      } else {
        router.replace("/auth/login");
      }
    }
  }, [pathname]);

  return (
    <ThemeProvider theme={mainTheme}>
      <>
        <div className="h-screen bg-white">
          <div className="h-[10%]">
            <Header name={user?.displayName} navItems={navItems} />
          </div>
          <div className="h-[90%]">{props.children}</div>
        </div>
      </>
    </ThemeProvider>
  );
};

export default MainLayout;
