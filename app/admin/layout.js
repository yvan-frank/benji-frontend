'use client'
import {useState} from "react";
import {UploadIcon, Utensils} from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true)

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
                   <Link href="/admin">
                   <NavItem icon={<UploadIcon className="h-5 w-5" />} active={true} expanded={sidebarOpen}>
                       Menu management
                    </NavItem>
                   </Link>
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
                        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                        <div className="flex items-center space-x-4">
                            <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                                </svg>
                            </button>
                            <div className="flex items-center">
                                <img className="h-8 w-8 rounded-full" src="https://via.placeholder.com/150"
                                     alt="Admin"/>
                                {sidebarOpen && <span className="ml-2 font-medium">Admin</span>}
                            </div>
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

const NavItem = ({children, icon, active, expanded}) => {
    return (
        <div className={`flex items-center px-6 py-3 border-t-[1px] border-white ${active ? 'bg-amber-700' : 'hover:bg-amber-700'} cursor-pointer`}>
            <div className="flex items-center">
                <span className="mr-3">{icon}</span>
                {expanded && <span>{children}</span>}
            </div>
        </div>
    )
}