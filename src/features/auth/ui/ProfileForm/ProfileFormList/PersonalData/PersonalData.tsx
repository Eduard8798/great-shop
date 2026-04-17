import styles from '../PersonalData/PersonalData.module.scss'

const PersonalData = () => {
    return (
        <>
        <div className={styles.bodyFiledInput}>
            <div className={styles.filedInput}>
                <p>Personal Data</p>
                        <label className={styles.labelText} htmlFor={'name'}>First name</label>
                        <input

                            id={'firstName'}
                            type={"text"}
                            placeholder={'John'}/>
            </div>
            <div className={styles.filedInput}>

                        <label htmlFor={'name'}>Last name</label>
                        <input
                            id={'LastName'}
                            type={"text"}
                            placeholder={'Smith'}/>
            </div>
        </div>
    <div className={styles.bodyFiledInput}>
            <div className={styles.filedInput}>

                        <label className={styles.labelText} htmlFor={'name'}>Phone Number</label>
                        <input

                            id={'phoneNumber'}
                            type={"text"}
                            placeholder={'743043455'}/>
            </div>
            <div className={styles.filedInput}>

                        <label htmlFor={'name'}>First name</label>
                        <input
                            id={'name'}
                            type={"name"}
                            placeholder={'John'}/>
            </div>
        </div>
        </>
    );
};

export default PersonalData;
