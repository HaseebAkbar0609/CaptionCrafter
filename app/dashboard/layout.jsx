"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import auth from "@/config/firebase";
import Loading from "./Loading";
import ThemeChangeBtn from "@/components/ThemeChangeBtn";

export default function Layout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authLoading, setAuthLoading] = useState(true);
  const [crumb, setCrumb] = useState("Dashboard");
  const directries = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Generate Captions",
      url: "/dashboard/generate",
    },
    {
      title: "Saved Captions",
      url: "/dashboard/saved",
    },
    {
      title: "Tone & Platform",
      url: "/dashboard/tone",
    },
    {
      title: "Upgrade to Pro",
      url: "/dashboard/pricing",
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
    },
    {
      title: "Help & Support",
      url: "/dashboard/help",
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
    },
    {
      title: "Logout",
      url: "/dashboard/logout",
    },
  ];
  useEffect(() => {
    let paths = pathname.split("/");
    const path = paths.join("/");
    // const
    // console.log("Path", path, paths);
    const currentPath = directries.find((item) => item.url === path);
    // console.log("Current Path", currentPath);
    if (currentPath) {
      setCrumb(currentPath.title);
    } else {
      setCrumb("Dashboard");
    }
  }, [pathname]);

  // console.log("Pathname", pathname);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/auth/login");
      } else {
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (authLoading) {
    return <Loading />;
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex w-full items-center px-4 justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/dashboard">Dasboard</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{crumb}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
              <ThemeChangeBtn />
            </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
