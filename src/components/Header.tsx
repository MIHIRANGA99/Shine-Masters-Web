import { NavItem } from "@/types/NavItem";
import { Box, Button } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  navItems: NavItem[];
  isHidden?: boolean;
};

const Header = (props: Props) => {
  const pathname = usePathname();
  return (
    <div className="bg-gray-100 py-4 flex flex-row space-x-4 justify-between px-4 h-full items-center">
        <div>
            LOGO
        </div>
      <div className="flex space-x-4">
      {props.navItems.map((item) => (
        <Button
            hidden={props.isHidden}
          sx={{ fontWeight: "bold", fontStyle: "italic" }}
          variant={pathname.includes(item.path) ? "contained" : "text"}
        >
          {item.label}
        </Button>
      ))}
      </div>
    </div>
  );
};

export default Header;
