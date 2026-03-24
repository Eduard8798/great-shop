import Link from 'next/link';
import Image from 'next/image';

export default function Logo() {
  return (
      <Link href="/">
        <Image
            src={'/images/logo.png'}
            alt="Shop Photo"
            width={132}
            height={18}
        />
    </Link>
  );
}
