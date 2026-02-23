import "@/styles/global.scss";

import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {/* Header */}
                <Header />

                {/* Main content */}
                <main>{children}</main>

                {/* Footer */}
                <Footer />
            </body>
        </html>
    );
}
