"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./Register.module.scss";
import poster from "../../../../../public/images/boyRegister.jpg";
import checkIcon from "../../../../../public/icons/checkIcon.svg";
import googleLogo from "../../../../../public/icons/GoogleLogo.svg";
import facebookLogo from "../../../../../public/icons/FacebookLogo.svg";
import appleLogo from "../../../../../public/icons/AppleLogo.svg";

export default function RegisterForm() {
    const [isChecked, setIsChecked] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isChecked) {
            alert("Please agree to the Terms & Conditions and Privacy Policy.");
            return;
        }

        console.log("Form Data:", formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Image
                    src={poster}
                    alt="Shop Photo"
                    layout="fill"
                    objectFit="cover"
                    priority
                />
            </div>

            <div className={styles.right}>
                <h1 className={styles.title}>Create New Account</h1>
                <h2 className={styles.subtitle}>Please enter details</h2>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <span className={styles.inputTitle}>First Name</span>
                        <input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            className={styles.inputField}
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <span className={styles.inputTitle}>Last Name</span>
                        <input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            className={styles.inputField}
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <span className={styles.inputTitle}>Email Address</span>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            className={styles.inputField}
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <span className={styles.inputTitle}>Password</span>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            className={styles.inputField}
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div
                        className={`${styles.checkboxContainer} inline-flex items-start gap-3`}
                    >
                        <label className="flex items-center cursor-pointer relative">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                                id="terms"
                            />

                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                <Image src={checkIcon} alt="Check" />
                            </span>
                        </label>

                        <label
                            htmlFor="terms"
                            className="text-sm cursor-pointer select-none"
                        >
                            I agree to the{" "}
                            <a href="/terms" className="underline">
                                Terms & Conditions
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="underline">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={!isChecked}
                        className={`${styles.submitBtn} transition-all duration-300 ease-in-out ${
                            !isChecked ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Register
                    </button>
                </form>
                <div className="flex justify-center items-center gap-[36px] mt-[30px]">
                    <button className="flex items-center justify-center w-12 h-12">
                        <Image
                            src={googleLogo}
                            alt="Google"
                            className="w-8 h-8"
                        />
                    </button>

                    <button className="flex items-center justify-center w-12 h-12">
                        <Image
                            src={facebookLogo}
                            alt="Facebook"
                            className="w-8 h-8"
                        />
                    </button>

                    <button className="flex items-center justify-center w-12 h-12">
                        <Image
                            src={appleLogo}
                            alt="Apple"
                            className="w-8 h-8"
                        />
                    </button>
                </div>

                <div className={styles.loginVariant}>
                    Already have an account?{" "}
                    <a href="/login" className={styles.loginLink}>
                        Login
                    </a>
                </div>
            </div>
        </div>
    );
}
