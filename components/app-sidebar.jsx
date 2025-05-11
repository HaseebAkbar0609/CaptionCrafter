"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import auth from "@/config/firebase"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  
  ],
 
}

export function AppSidebar({
  ...props
}) {
  const [user,setuser] = React.useState({
    name: "Guest",
    email: "guest@gmail.com",
    avatar: "",
  })
  React.useEffect(() => {
      console.log("Auth",auth)
      if(auth?.currentUser){
        setuser({
          name: auth?.currentUser?.displayName || auth?.currentUser?.email?.split("@")[0] || "Guest",
          email: auth?.currentUser?.email,
          avatar: "",
        });
      }
  
  }, [auth, auth?.currentUser])
  // console.log(auth.currentUser.email)
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher  />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
       
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
