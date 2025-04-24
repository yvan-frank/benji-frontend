'use client'
import Header from "@/app/_components/Header/Header";
import Footer from "@/app/_components/Footer/Footer";

export default function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}