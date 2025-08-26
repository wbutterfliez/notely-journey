import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import Header from "@/components/ui/Header";
import { Home } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import App from "next/app";
import AppSidebar from "@/components/ui/AppSidebar";
import NoteProvider from "@/providers/NoteProvider";

export const metadata: Metadata = {
  title: "Notes with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NoteProvider>
              <SidebarProvider>
              <AppSidebar/>
                <div className="flex min-h-screen w-full flex-col">
                  <Header />
                  <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                    {children}
                  </main>
                </div>
              </SidebarProvider>

              <Toaster richColors position="bottom-right"/>
            </NoteProvider>
          </ThemeProvider>
      </body>
    </html>
  );
}
