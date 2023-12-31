import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navigation/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "WhatsNewToday",
    description: "Application de veille sur les centres d'intérêts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="mb-7">
                    <Navbar />
                </div>
                {children}
            </body>
        </html>
    );
}
