import {ReactNode, useState} from "react";
import MyReviews from "@/features/auth/ui/ProfileForm/ProfileFormList/MyReviews/MyReviews";
import Settings from "@/features/auth/ui/ProfileForm/ProfileFormList/Settings/Settings";
import PersonalData from "@/features/auth/ui/ProfileForm/ProfileFormList/PersonalData/PersonalData";
import Correspondence from "@/features/auth/ui/ProfileForm/ProfileFormList/Correspondence/Correspondence";
import Support from "@/features/auth/ui/ProfileForm/ProfileFormList/Support/Support";
import DeleteAccount from "@/features/auth/ui/ProfileForm/ProfileFormList/DeleteAccount/DeleteAccount";
import styles from '../ProfileFormList/ProfileFormList.module.scss'

type Tab = 'reviews' | 'settings' | 'personalData' | 'correspondence' | 'support' | 'deleteAccount';

const ProfileFormList = () => {

    const tabs: { id: Tab, label: string , active : boolean } [] = [
        {id: 'reviews', label: 'My reviews' , active : false},
        {id: 'settings', label: 'Settings', active : false},
        {id: 'personalData', label: 'Personal Data', active : false},
        {id: 'correspondence', label: 'Correspondence', active : false},
        {id: 'deleteAccount', label: 'Delete Account', active : false},

    ]

    const tabContent: Record<Tab, ReactNode> = {
        reviews: <MyReviews/>,
        settings: <Settings/>,
        personalData: <PersonalData/>,
        correspondence: <Correspondence/>,
        support: <Support/>,
        deleteAccount: <DeleteAccount/>
    }

    const [activeTab, setActiveTab] = useState<Tab>("personalData")

    return (
        <>
            <div className={styles.wraper}>
                <div className={styles.hederTabs}>
                    {tabs.map(tab => (
                        <button key={tab.id}
                                className={activeTab === tab.id ? styles.tabChoice : styles.tabs}
                                onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className={styles.content}>
                    {tabContent[activeTab]}
                </div>
            </div>
        </>

    );
};

export default ProfileFormList;
