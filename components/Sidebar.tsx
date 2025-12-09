// components/Sidebar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, MessageCircle, BarChart, History, HeartHandshake, X } from "lucide-react";
import { clsx } from "clsx";

const menuItems = [
    { name: "Beranda", href: "/", icon: Home },
    { name: "Tes Kedekatan", href: "/test", icon: ClipboardList },
    { name: "Tanya AI", href: "/chat", icon: MessageCircle },
    { name: "Analisis Chat", href: "/analysis", icon: BarChart },
    { name: "Riwayat", href: "/result", icon: History },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay Gelap untuk Mobile */}
            <div
                className={clsx(
                    "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={onClose}
            />

            {/* Sidebar Container */}
            <aside
                className={clsx(
                    "fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
                    isOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <HeartHandshake className="text-pink-500" size={28} />
                        <h1 className="font-bold text-xl text-gray-800 tracking-tight">PDKT Aja Dulu</h1>
                    </div>
                    {/* Tombol Close di Mobile */}
                    <button onClick={onClose} className="lg:hidden text-gray-500">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose} // Tutup sidebar pas klik menu (mobile)
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
        </>
    );
}