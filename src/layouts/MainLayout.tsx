"use client";
import Header from "@/components/Header";
import mainTheme from "@/constants/theme";
import { NavItem } from "@/types/NavItem";
import { ThemeProvider } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode | JSX.Element;
};

const MainLayout = (props: Props) => {
  const navItems: NavItem[] = [
    { label: "Dashboard", path: "dashboard" },
    { label: "Services", path: "services" },
  ];
  return (
    <ThemeProvider theme={mainTheme}>
      <div className="h-screen bg-white">
        <div className="h-[10%]">
            <Header navItems={navItems} />
        </div>
        <div className="p-4 h-[90%]">{props.children}</div>
      </div>
    </ThemeProvider>
  );
};

export default MainLayout;
