import Image from 'next/image';
import Link from "next/link";

import styles from "../HeroBanner/HeroBanner.module.scss";

interface HeroBannerProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  description: string[];
  link: {
    href: string;
    label: string;
  };
}

export default function HeroBanner({ image, title, description, link }: HeroBannerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={600}
          style={{ width: '100%', height: 'auto' }}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.contentTop}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.description}>
            {description.map((text, idx) => (
              <p key={idx}>{text}</p>
            ))}
          </div>
        </div>

        <Link href={link.href} className={`btn-primary ${styles.button}`}>{link.label}</Link>
      </div>
    </div>
  );
}
