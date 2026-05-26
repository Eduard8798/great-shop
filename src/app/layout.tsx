import "@/styles/global.scss";

import Header from "@/widgets/Header/Header";
import Footer from "@/widgets/Footer/Footer";
import { AuthProvider } from "@/shared/auth/AuthProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
