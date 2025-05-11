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
import { useRouter } from "next/navigation";
import auth from "@/config/firebase";
import Loading from "./Loading";
import ThemeChangeBtn from "@/components/ThemeChangeBtn";

export default function Layout({ children }) {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [pathname, setPathname] = useState("dashboard");

  useEffect(() => {
    setPathname(window.location.pathname.split("/").slice(2).join("/"));
  }, []);

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
          <div className="flex items-center  gap-2 px-4">
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
                {
                  pathname!=="dashboard" && 

                  <BreadcrumbPage>{pathname.charAt(0).toUpperCase() + pathname.slice(1)}</BreadcrumbPage>
                }
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
           
            <div className="flex items-center gap-2 ml-auto">
                     <ThemeChangeBtn />
                   </div>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
