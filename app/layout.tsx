// app/layout.tsx
"use client"; // Ubah jadi client component untuk handle state sidebar
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="flex min-h-screen relative">
          
          {/* Sidebar Component */}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          
          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
            
            {/* Header Mobile (Hanya muncul di HP/Tablet) */}
            <header className="lg:hidden bg-white p-4 border-b flex items-center justify-between sticky top-0 z-30">
              <span className="font-bold text-gray-800">PDKT Aja Dulu</span>
              <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-100 rounded-lg">
                <Menu size={24} />
              </button>
            </header>

            {/* Konten Halaman */}
            <div className="p-4 md:p-8 w-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}