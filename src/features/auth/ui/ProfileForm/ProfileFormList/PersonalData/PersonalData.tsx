import styles from '../PersonalData/PersonalData.module.scss'

const PersonalData = () => {
    return (
        <>
            {/*Personal Data*/}


            <p className={styles.nameSetting}>Personal Data</p>
            <div className={styles.form}>
                <div className={styles.formDataUser}>
                    <label htmlFor={'email'}>First name</label>
                    <input
                        id={'firstName'}
                        type={"text"}
                        placeholder={'John'}
                    />
                </div>
                <div className={styles.formDataUser}>
                    <label htmlFor={'email'}>Last name</label>
                    <input
                        id={'lastName'}
                        type={"text"}
                        placeholder={'Smith'}
                    />
                </div>
            </div>


            <div className={styles.form}>
                <div className={styles.formDataUser}>
                    <label htmlFor={'email'}>Phone Number</label>
                    <input
                        id={'phoneNumber'}
                        type={"number"}
                        placeholder={'74394355'}
                    />
                </div>
                <div className={styles.formDataUser}>
                    <label htmlFor={'email'}>Birthday</label>
                    <input
                        id={'birthday'}
                        type={"date"}
                        placeholder={'33.06.1999'}
                    />
                </div>
            </div>

            {/*Billing Address*/}

            <p className={styles.nameSetting}>Billing Address</p>
            <div className={styles.form}>
                <div className={styles.formDataUser}>
                    <label htmlFor={'text'}>Street and house number</label>
                    <input
                        id={'address'}
                        type={"text"}
                        placeholder={'John'}
                    />
                </div>
                <div className={styles.formDataUser}>
                    <label htmlFor={'email'}>Floor (optional)</label>
                    <input
                        id={'floor'}
                        type={"text"}
                        placeholder={'man'}
                    />
                </div>
            </div>

            {/*Account Details*/}

            <p className={styles.nameSetting}>Account Details</p>
            <div className={styles.form}>
                <div className={styles.formDataUser}>
                    <label htmlFor={'email'}>Email</label>
                    <input
                        id={'email'}
                        type={"email"}
                        placeholder={'Johnsmith@gmail.com'}
                    />
                </div>
                <div className={styles.formDataUser}>
                    <label htmlFor={'password'}>Password</label>
                    <input
                        id={'Password'}
                        type={"password"}
                        placeholder={'00000000'}
                    />
                </div>
            </div>
        </>
    );
};

export default PersonalData;
