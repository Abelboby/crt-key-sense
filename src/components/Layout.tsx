import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-terminal-black">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 bg-terminal-black">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}