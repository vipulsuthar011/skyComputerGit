import React from 'react'
import styles from './profile.module.css'
import { faIndianRupeeSign, faLock, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const Profile = () => {
    return (
        <div className={styles.profileMainWrapper}>
            {/* heading title */}
            <div className={styles.profileHeading}>Profile</div>
            {/* profile Wrapper */}
            <div className={styles.profileWrapper}>


                {/* left Wrapper */}
                <div className={styles.leftWrapper}>
                    <div className={styles.profileImageWrapper}>
                        <img src="	https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" alt="" className={styles.profileImage} />
                    </div>
                    {/* compnay name and landmark */}
                    <div>
                        <div className={styles.companyName}>Kalz Brgr</div>
                        <div className={styles.landmark}>Landmark</div>
                    </div>

                    {/* profit  and Revenue*/}
                    <div className={styles.orderDetails}>
                        {/* profit */}
                        <div className={styles.profileProfitWrapper}>
                            {/* 400  */}
                            <div className={styles.orderPrice}><FontAwesomeIcon icon={faIndianRupeeSign} /> <div>44</div></div>
                            <div className={styles.orderText}>Earned</div>
                        </div>
                        {/* orders */}
                        <div className={styles.profileOrderWrapper}>
                            <div className={styles.orderPrice}>53</div>
                            <div className={styles.orderText}>Orders</div>
                        </div>

                    </div>

                    {/* button */}
                    <div className={styles.profileButtons}>
                        <Link to="/">
                            <div className={styles.profileLinkBtnWrapper}>
                                {/* button image */}
                                    <FontAwesomeIcon icon={faUser} className={styles.LinkIcon} />
                                {/* button text */}
                                <div>Company Information</div>
                            </div>
                        </Link>
                        <Link to="/">
                            <div className={styles.profileLinkBtnWrapper}>
                                {/* button image */}
                                    <FontAwesomeIcon icon={faLock} className={styles.LinkIcon} />
                                {/* button text */}
                                <div>Login & Password</div>
                            </div>
                        </Link>
                        <Link to="/">
                            <div className={styles.profileLinkBtnWrapper}>
                                {/* button image */}
                                    <FontAwesomeIcon icon={faRightFromBracket} className={styles.LinkIcon} />
                                {/* button text */}
                                <div>Logout</div>
                            </div>
                        </Link>

                    </div>

                </div>


                {/* Right` Wrapper */}
                <div className={styles.rightWrapper}>

                </div>
            </div>
        </div>
    )
}

export default Profile