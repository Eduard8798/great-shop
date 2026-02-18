import Link from "next/link";
import React from "react";
import styles from "../Header/Header.module.css"

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                {/* Лого / Название */}
                <Link href="/">
                    <h1 className={styles.logo}>Great Shop</h1>
                </Link>

                {/* Навигация */}
                <nav className={styles.nav}>
                    <Link href="/products" className={styles.navLink}>Products</Link>
                    <Link href="/login" className={styles.navLink}>Login</Link>
                </nav>
            </div>
        </header>
    );
}
