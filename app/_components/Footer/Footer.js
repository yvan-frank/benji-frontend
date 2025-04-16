import Link from 'next/link';
import {FacebookIcon, Instagram} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-amber-900 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Colonne 1 - À propos */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">Our Restaurant</h3>
                        <p className="mb-4">
                            Discover the authentic flavors of Africa in a warm atmosphere.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-white hover:text-amber-400">
                                <FacebookIcon size={20} />
                            </a>
                            <a href="#" className="text-white hover:text-amber-400">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Colonne 2 - Liens rapides */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">Quick links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/menu" className="hover:text-amber-400">
                                    Our Menu
                                </Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="hover:text-amber-400">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-amber-400">
                                    About us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-amber-400">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 - Horaires */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">Schedules</h3>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span>Monday - Thursday</span>
                                <span>11h - 22h</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Friday - Saturday</span>
                                <span>11h - 23h</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Sunday</span>
                                <span>11h - 21h</span>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 - Contact */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-amber-400">Contact</h3>
                        <address className="not-italic">
                            <p className="mb-2">123 Street</p>
                            <p className="mb-2">England</p>
                            <p className="mb-2">
                                <a href="tel:+33123456789" className="hover:text-amber-400">
                                    +1 000 00 00 0
                                </a>
                            </p>
                            <p>
                                <a href="mailto:contact@benjis-african.com" className="hover:text-amber-400">
                                    contact@benjis-african.com
                                </a>
                            </p>
                        </address>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-amber-700 mt-8 pt-6 text-center text-amber-300">
                    <p>
                        &copy; {new Date().getFullYear()} Benji's African Delicacies. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}