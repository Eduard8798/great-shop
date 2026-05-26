"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";

import styles from "../LoginForm/Login.module.scss";
import loginGirlImg from "../../../../../public/images/loginGirlImg.png";
import GoogleLogo from "../LoginForm/icon/GoogleIcon.png";
import AppleLogo from "../LoginForm/icon/AppleLogo.png";
import FaceLogo from "../LoginForm/icon/FaceBookLogo.png";

import { useAuth } from "@/shared/auth/AuthProvider";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();

    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        setError(null);
        setSubmitting(true);
        const result = await login({
            email_or_phone: emailOrPhone,
            password,
        });
        setSubmitting(false);

        if (!result.ok) {
            setError(result.error ?? "Login failed");
            return;
        }
        const next = searchParams.get("next") ?? "/profile";
        router.push(next);
        router.refresh();
    };

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <div className={styles.left}>
                <Image
                    src={loginGirlImg}
                    alt="Shop Photo"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div className={styles.right}>
                <div className={styles.formWrapper}>
                    <div className={styles.header}>
                        <p>Welcome! 👋 </p>
                        <p>Please login here</p>
                    </div>

                    <div className={styles.filed}>
                        <label htmlFor="email">Email or Phone</label>
                        <input
                            id="email"
                            type="text"
                            autoComplete="username"
                            placeholder="robertfox@example.com"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.filed}>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            placeholder="00000000"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.optinalRow}>
                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            <span> Remember me</span>
                        </label>
                        <span className={styles.forgBtn}>Forgot Password?</span>
                    </div>

                    {error && (
                        <p style={{ color: "crimson", margin: "8px 0" }}>{error}</p>
                    )}

                    <button
                        type="submit"
                        className={styles.loginBtn}
                        disabled={submitting}
                    >
                        {submitting ? "Signing in…" : "Login"}
                    </button>

                    <span className={styles.createAccount}>
                        <Image src={GoogleLogo} alt="Google" className="w-5 h-5" />
                        <Image src={FaceLogo} alt="FaceBook" className="w-4 h-5" />
                        <Image src={AppleLogo} alt="Apple" className="w-4 h-5" />
                        <Link href="/registration">Create new account?</Link>
                    </span>
                </div>
            </div>
        </form>
    );
}
