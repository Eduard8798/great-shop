import Image from "next/image";
import styles from '../LoginForm/Login.module.css'
import girlLogin from '../../../../public/girlLogin.png'
export default function LoginForm() {
    return (
        <div className={styles.container}>
            {/*  половина с фото */}
            <div className={styles.left}>
                <Image
                    src={girlLogin} // помести свое фото в public/
                    alt="Shop Photo"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Правая половина с формой */}
            <div className={styles.right}>
                <h1 className={styles.title}>Great Shop</h1>
                <h2 className={styles.subtitle}>Sign in Great Shop</h2>

                <div className={styles.socialButtons}>
                    <button className={styles.googleBtn}>Sign in with Google</button>
                    <button className={styles.emailBtn}>Sign in with Email</button>
                </div>

                <div className={styles.or}>- OR -</div>

                <input
                    type="email"
                    placeholder="Email"
                    className={styles.inputField}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className={styles.inputField}
                />
                <div className={styles.topBnt}>
                <button className={styles.signInBtn}>Sign In</button>
                <button className={styles.registerBtn}>Register Now</button>
                </div>
                <div className={styles.forgot}>
                    <a href="#">Forgot Password?</a>
                </div>
            </div>
        </div>
    );
}
