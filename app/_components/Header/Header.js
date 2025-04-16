'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {AlignLeft, X} from "lucide-react";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Menu', href: '/menu' },
        { name: 'Reservation', href: '/reservations' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    {/*<img*/}
                    {/*    src="/images/logo.png"*/}
                    {/*    alt="Benji's African Delicacies"*/}
                    {/*    className="h-12"*/}
                    {/*/>*/}
                    <span className="ml-2 text-xl font-bold text-amber-800 hidden sm:inline">
                        Benji's African Delicacies
                    </span>
                </Link>

                {/* Navigation Desktop */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`px-3 py-2 font-medium ${
                                pathname === link.href
                                    ? 'text-amber-600 border-b-2 border-amber-600'
                                    : 'text-gray-700 hover:text-amber-600'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Bouton Panier/Réservation */}
                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        href="/reservations"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                        Book
                    </Link>
                </div>

                {/* Menu Mobile */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? (
                        <X size={24} />
                    ) : (
                        <AlignLeft size={24} />
                    )}
                </button>
            </div>

            {/* Menu Mobile Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    pathname === link.href
                                        ? 'bg-amber-50 text-amber-600'
                                        : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="px-3 pt-2">
                            <Link
                                href="/reservations"
                                className="block w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium text-center"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Book a table
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}