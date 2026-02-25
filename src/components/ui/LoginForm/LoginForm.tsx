import Image from "next/image";
import styles from "../LoginForm/Login.module.scss";
import girlLogin from "../../../../public/girlLogin.png";
import {FcGoogle} from "react-icons/fc";
import {SiGmail} from 'react-icons/si';


export default function LoginForm() {
    return (
        <div className={styles.container}>
            {/*  Left side with image */}
            <div className={styles.left}>
                <Image
                    src={girlLogin}
                    alt="Shop Photo"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* First side with form */}
            <div className={styles.right}>
                <div className={styles.rigthWidth}>
                    <h1 className={styles.title}>Great Shop</h1>
                    <h2 className={styles.subtitle}>Sign in Great Shop</h2>

                    <div className={styles.socialButtons}>
                        <button className={styles.googleBtn}>
                            <FcGoogle size={28}/>
                            Sign up in with Google
                        </button>
                        <button className={styles.emailBtn}>
                            <SiGmail size={28} color="#EA4335"/>
                            Sign up with Email
                        </button>
                    </div>

                    <div className={styles.or}>
                        <p className={styles.line}>-</p>
                        <p className={styles.text}>OR</p>
                        <p className={styles.line}>-</p>
                    </div>

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
                    <div className={styles.forgot}>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <div className={styles.topBnt}>
                        <button className={styles.signInBtn}> Sign In</button>
                        <button className={styles.registerBtn}>Register Now</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

