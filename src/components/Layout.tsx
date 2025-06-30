
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 shadow-sm">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800">Employee Management System</h1>
              <p className="text-sm text-slate-600">Manage your workforce efficiently</p>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
