// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPK Relationship Assistant",
  description: "Bantu tentukan langkah pendekatanmu",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <div className="flex min-h-screen">
          {/* Sidebar Fixed */}
          <Sidebar />
          
          {/* Main Content Area (didorong 64 unit ke kanan karena lebar sidebar) */}
          <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}