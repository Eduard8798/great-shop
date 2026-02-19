import React from "react";
import Link from "next/link";

import styles from "../Header/Header.module.scss"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/">
                    <h1 className={styles.logo}>Great Shop</h1>
                </Link>

                {/* Navigation */}
                <nav className={styles.nav}>
                    <Link href="/products" className={styles.navLink}>
                        Products
                    </Link>
                    <Link href="/login" className={styles.navLink}>
                        Login
                    </Link>
                </nav>
            </div>
        </header>
    );
}
