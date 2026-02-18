import "./globals.css";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body >
        {/* Header */}
        <Header />

        {/* Основной контент */}
        <main >
            {children}
        </main>

        {/* Footer */}
        <Footer />
        </body>
        </html>
    );
}
