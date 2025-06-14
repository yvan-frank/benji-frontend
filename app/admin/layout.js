'use client'
<<<<<<< HEAD
import {useState} from "react";
import {UploadIcon, Utensils} from "lucide-react";
=======
import React, {useEffect, useState} from "react";
import {AlignStartVertical, Calendar, ChefHat, ListOrdered, UploadIcon} from "lucide-react";
import {usePathname} from "next/navigation";
>>>>>>> local
import Link from "next/link";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const pathname = usePathname()

    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex h-screen bg-zinc-50">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-zinc-800 text-white transition-all duration-300`}>
                <div className="p-4 flex items-center justify-between">
                    {sidebarOpen && <h1 className="text-xl font-bold">BENJI</h1>}
                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-lg hover:bg-amber-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <nav className="mt-6">
<<<<<<< HEAD
                   <Link href="/admin">
                   <NavItem icon={<UploadIcon className="h-5 w-5" />} active={true} expanded={sidebarOpen}>
                       Menu management
                    </NavItem>
                   </Link>
=======
                    <NavItem link="/menu" icon={<UploadIcon className="h-5 w-5" />} active={pathname.includes("menu")} expanded={sidebarOpen}>
                       Menu management
                    </NavItem>
                    <NavItem link="/orders" icon={<ListOrdered className="h-5 w-5" />} active={pathname.includes("orders")} expanded={sidebarOpen}>
                        Orders
                    </NavItem>
                    <NavItem link="/analytics" icon={<AlignStartVertical className="h-5 w-5" />} active={pathname.includes("analytics")} expanded={sidebarOpen}>
                        Analytics
                    </NavItem>
>>>>>>> local
                    {/* Autres items de navigation... */}
                   <Link href="/admin/food">
                   <NavItem className="border-t-[1px] border-white" icon={<Utensils className="h-5 w-5  " />} active={true} expanded={sidebarOpen}>
                      Food management
                    </NavItem>
                   </Link>
                </nav>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500 rounded-xl">
                                <ChefHat className="w-8 h-8 text-white"/>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Benji African Delicacies</h1>
                                <p className="text-gray-600">Restaurant dashboard</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-500">
                                    {currentTime.toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {currentTime.toLocaleTimeString('fr-FR')}
                                </p>
                            </div>
                            <Calendar className="w-6 h-6 text-gray-600"/>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {children}
                </main>
            </div>

        </div>
    );
}

const NavItem = ({children, icon, active, expanded, link}) => {
    return (
<<<<<<< HEAD
        <div className={`flex items-center px-6 py-3 border-t-[1px] border-white ${active ? 'bg-amber-700' : 'hover:bg-amber-700'} cursor-pointer`}>
=======
        <Link
            href={`/admin${link}`}
            className={`flex items-center px-6 py-3 ${active ? 'bg-amber-700' : 'hover:bg-amber-700/10'} cursor-pointer`}>
>>>>>>> local
            <div className="flex items-center">
                <span className="mr-3">{icon}</span>
                {expanded && <span>{children}</span>}
            </div>
        </Link>
    )
}