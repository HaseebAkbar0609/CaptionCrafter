"use client";
import * as React from "react";
import {  LogOut, User, HelpCircle, BarChart2, Gem, Sliders, Bookmark, Pen, Home } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import auth from "@/config/firebase";


// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Generate Captions",
      url: "/dashboard/generate",
      icon: Pen,
    },
    {
      title: "Saved Captions",
      url: "/dashboard/saved",
      icon: Bookmark,
    },
    // {
    //   title: "Tone & Platform",
    //   url: "/dashboard/tone",
    //   icon: Sliders,
    // },
    {
      title: "Upgrade to Pro",
      url: "/dashboard/pricing",
      icon: Gem,
    },
    // {
    //   title: "Analytics",
    //   url: "/dashboard/analytics",
    //   icon: BarChart2,
    // },
    {
      title: "Help & Support",
      url: "/dashboard/help",
      icon: HelpCircle,
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Logout",
      url: "/dashboard/logout",
      icon: LogOut,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const [user, setuser] = React.useState({
    name: "Guest",
    email: "guest@gmail.com",
    avatar: "",
  });
  React.useEffect(() => {
    // console.log("Auth", auth);
    if (auth?.currentUser) {
      setuser({
        name:
          auth?.currentUser?.displayName ||
          auth?.currentUser?.email?.split("@")[0] ||
          "Guest",
        email: auth?.currentUser?.email,
        avatar: "",
      });
    }
  }, [auth, auth?.currentUser]);
  // console.log(auth.currentUser.email)
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
