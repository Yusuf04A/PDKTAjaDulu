"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ClipboardList, MessageCircle, X, Heart, ImageUp } from "lucide-react"
import { clsx } from "clsx"

const menuItems = [
  { name: "Beranda", href: "/", icon: Home },
  { name: "Tes Kedekatan", href: "/test", icon: ClipboardList },
  { name: "Tanya AI", href: "/chat", icon: MessageCircle },
  { name: "Analisis Chat", href: "/photoupload", icon: ImageUp },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-screen w-64 bg-white/95 backdrop-blur-xl border-r border-rose-100 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="p-6 border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Heart className="text-white animate-heart-beat" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-base text-rose-950 tracking-tight">PDKT Aja Dulu</h1>
              <p className="text-xs text-rose-600">Relationship AI</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-rose-400 hover:text-rose-700 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive
                    ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 shadow-sm border border-rose-200"
                    : "text-gray-600 hover:bg-rose-50 hover:text-rose-700",
                )}
              >
                <item.icon
                  size={18}
                  className={clsx(
                    "transition-transform duration-200",
                    isActive ? "scale-110" : "group-hover:scale-110",
                  )}
                />
                {item.name}
                {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-rose-100">
          <div className="p-3 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200">
            <p className="text-xs text-center text-rose-700">© 2025 PDKT Aja Dulu</p>
            <p className="text-xs text-center text-rose-600 mt-1">Created by Yusup & Rapi</p>
          </div>
        </div>
      </aside>
    </>
  )
}
