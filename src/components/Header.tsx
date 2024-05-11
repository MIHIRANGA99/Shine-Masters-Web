import { logoutUser } from "@/firebase/utils";
import { MUIButton } from "@/styles/CustomMUI/custom";
import { NavItem } from "@/types/NavItem";
import { Box, Button, Fade } from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = {
  navItems: NavItem[];
  isHidden?: boolean;
  name?: string | null;
};

const Header = (props: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="bg-gradient-to-r from-primary to-secondary py-4 flex flex-row space-x-4 justify-between px-4 h-full items-center">
      <div>
        <Image
          width={180}
          height={180}
          alt="Shine Masters"
          src={"/shine-masters-logo.svg"}
        />
      </div>
      <Fade in={!!props.name}>
        <div className="flex flex-col justify-center">
          <text className="font-bold text-white text-3xl">{props.name}</text>
          <div className="flex justify-center space-x-2">
            <button className=" text-white/50 text-base text-center hover:text-white hover:duration-300">
              Edit Profile
            </button>
            <text className="text-white/50">|</text>
            <button onClick={() => logoutUser()} className=" text-white/50 text-base text-center hover:text-red-800 hover:duration-300">
              Logout
            </button>
          </div>
        </div>
      </Fade>
      <div className="flex space-x-4">
        {props.navItems.map((item, index) => (
          <Button
            key={index}
            hidden={props.isHidden}
            onClick={() => router.replace(item.path)}
            sx={{ fontWeight: "bold", fontStyle: "italic", color: "white" }}
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
