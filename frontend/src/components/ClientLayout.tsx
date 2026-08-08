"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAegisStore } from "@/stores/useAegisStore";
import { Sidebar } from "@/components/Sidebar";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAegisStore((state) => state.isAuthenticated);
  const initializeRealtime = useAegisStore((state) => state.initializeRealtime);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      initializeRealtime();
    }
  }, [isAuthenticated, initializeRealtime]);

  useEffect(() => {
    if (mounted && !isAuthenticated && pathname !== '/login' && pathname !== '/') {
      router.replace('/login');
    }
  }, [mounted, isAuthenticated, pathname, router]);

  if (!mounted) {
    return <div className="h-screen w-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const isPublicPage = pathname === '/login' || pathname === '/';

  if (isPublicPage) {
    return <main className="h-screen w-screen bg-background overflow-y-auto">{children}</main>;
  }

  if (!isAuthenticated) {
    return <div className="h-screen w-screen bg-background flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </>
  );
}
