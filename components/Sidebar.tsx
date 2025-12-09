// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, MessageCircle, BarChart, History, HeartHandshake } from "lucide-react";
import { clsx } from "clsx";

const menuItems = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Tes Kedekatan", href: "/test", icon: ClipboardList },
    { name: "Tanya AI", href: "/chat", icon: MessageCircle },
    { name: "Analisis Chat", href: "/analysis", icon: BarChart },
    { name: "Riwayat", href: "/result", icon: History }, // Shortcut ke hasil terakhir
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50">
            <div className="p-6 border-b border-gray-100 flex items-center gap-2">
                <HeartHandshake className="text-pink-500" size={28} />
                <h1 className="font-bold text-xl text-gray-800 tracking-tight">PDKT Aja Dulu</h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={clsx(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-pink-50 text-pink-600 shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 text-xs text-gray-400 text-center">
                © 2025 Relationship SPK
            </div>
        </aside>
    );
}