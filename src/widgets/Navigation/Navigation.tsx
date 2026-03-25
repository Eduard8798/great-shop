import Link from 'next/link';

import Logo from '../Logo/Logo';

import styles from "../Navigation/Navigation.module.scss";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
        <ul className={styles.navList}>
            <li className={styles.navItem}>
                <Link href="/new-arrivals" className={styles.navLink}>
                    new arrivals
                </Link>
            </li>
            <li className={styles.navItem}>
                <Logo />
            </li>
            <li className={styles.navItem}>
                <Link href="/women" className={styles.navLink}>
                    women
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link href="/men" className={styles.navLink}>
                    men
                </Link>
            </li>
        </ul>
    </nav>
  );
}
