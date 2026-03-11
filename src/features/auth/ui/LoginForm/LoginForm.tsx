import Image from "next/image";
import styles from "../LoginForm/Login.module.scss";
import loginGirlImg from "../../../../../public/images/loginGirlImg.png";
import {FcGoogle} from "react-icons/fc";
import {SiGmail} from 'react-icons/si';
import GoogleLogo from '../LoginForm/icon/GoogleIcon.png'
import AppleLogo from '../LoginForm/icon/AppleLogo.png'
import FaceLogo from '../LoginForm/icon/FaceBookLogo.png'
import {family} from "detect-libc";

export default function LoginForm() {
    return (
        <div className={styles.container}>

            {/*  Left side with image */}

            <div className={styles.left}>
                <Image
                    src={loginGirlImg}
                    alt="Shop Photo"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Right side with form */}
            <div className={styles.right}>
                <div className={styles.formWrapper}>

                    <div className={styles.header}>
                        <p>Welcome! 👋 </p>
                        <p>Please login here</p>
                    </div>

                    <div className={styles.filed}>
                        <label htmlFor={'email'}>Email Address</label>
                        <input
                            id={'email'}
                            type={"email"}
                            placeholder={'robertfox@example.com'}
                        />
                    </div>

                    <div className={styles.filed}>
                        <label htmlFor={'email'}>Password</label>
                        <input
                            id={'password'}
                            type={"password"}
                            placeholder={'00000000'}
                        />
                    </div>

                    <div className={styles.optinalRow}>
                        <label className={styles.checkbox}>
                            <input
                                type={"checkbox"}
                            />
                            <span> Remember me</span>
                        </label>

                        <span className={styles.forgBtn}>
                            Forgot Password?
                        </span>
                    </div>
                    <button className={styles.loginBtn}>Login</button>
                    <span className={styles.createAccount}>
                        <Image
                            src={GoogleLogo}
                            alt="Google"
                            className="w-4 h-4"
                        />

                        <Image
                            src={FaceLogo}
                            alt="FaceBook"
                            className="w-4 h-4"
                        />
                        <Image
                            src={AppleLogo}
                            alt="Apple"
                            className="w-4 h-4"
                        />
                        <p className={styles.createAccount}>
                        Create new account?
                    </p>
                    </span>

                </div>

            </div>
        </div>
    );
}

