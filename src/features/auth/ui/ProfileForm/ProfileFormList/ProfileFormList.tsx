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

    const tabs : {id:Tab,label:string} [] = [
        {id:'reviews',label: 'My reviews'},
        {id:'settings',label: 'Settings'},
        {id:'personalData',label: 'Personal Data'},
        {id:'correspondence',label: 'Correspondence'},
        {id:'deleteAccount',label: 'Delete Account'},

    ]

    const tabContent : Record<Tab, ReactNode> = {
        reviews : <MyReviews/>,
        settings : <Settings/>,
        personalData : <PersonalData/>,
        correspondence : <Correspondence/>,
        support : <Support/>,
        deleteAccount : <DeleteAccount/>
    }

    const [activeTab,setActiveTab] = useState<Tab>("personalData")

    return (
        <>
            {tabs.map(tab => (
                <button key={tab.id}
                        className={styles.tabs}
                onClick={()=> setActiveTab(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
            <div>
            {tabContent[activeTab]}
            </div>
        </>

    );
};

export default ProfileFormList;
