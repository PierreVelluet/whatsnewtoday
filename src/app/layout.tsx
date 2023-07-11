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
            {/* <header></header> */}
            {/* <Navbar /> */}
            <body style={{ marginTop: "90px" }} className={inter.className}>
                {children}
            </body>
        </html>
    );
}
