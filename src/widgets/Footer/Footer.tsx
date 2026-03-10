import Image from 'next/image';
import Link from 'next/link';

import styles from "../Footer/Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <Link href="/">
                    <Image
                        src={'/images/logoWhite.png'}
                        alt="Shop Photo"
                        width={219}
                        height={50}
                    />
                </Link>
            </div>
        </footer>
    );
}
