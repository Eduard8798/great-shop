import React, {useState} from 'react';
import styles from './Profile.module.scss'
import {bell, compited, exit, location, orders, user} from "@/features/auth/ui/ProfileForm/icon/ProfileIcon";
import ProfileFormList from "@/features/auth/ui/ProfileForm/ProfileFormList/ProfileFormList";

const ProfileForm = () => {
    type MenuItem = {
        id: string;
        name: string;
        active: boolean,
        icon: React.ReactNode;
    }

    const [listMain, setListMain] = useState<MenuItem[]>([
        {id: 'profile', name: 'Profile', active: false,icon: user},
        {id: 'bonuses', name: 'Bonuses', active: false,icon: compited},
        {id: 'orders', name: 'My orders', active: false,icon: orders},
        {id: 'addresses', name: 'Addresses', active: false,icon: location},
        {id: 'notifications', name: 'Notifications', active: false,icon: bell},
        {id: 'out', name: 'Log out', active: false,icon: exit},
    ])

    function changeActive (id:string){

        setListMain(item => item.map(e =>
            {
                if (e.id === id){
                    return {...e, active: true}
                }
                else {
                   return {...e,active:false}
                }
            }
        ))
    }

    return (
        <>
        <div className={styles.headerProfile}>
            <span className={styles.main}>

                <div className={styles.nameUser}>
                   <div>Hello</div>
                   <span className={styles.user}>John Smith</span>
                </div>
                {listMain.map(value => (
                    <div key={value.id} className={value.active ? styles.listItemMainActive : styles.listItemMain}
                     onClick={()=>changeActive(value.id)}
                    >{value.icon} {value.name}</div>
                ))}
            </span>
        </div>
        <ProfileFormList/>
        </>
    );
};


export default ProfileForm;

//  обробник на клік на меню - акт - збергти Ід
//
// первірити ід із збереженим
