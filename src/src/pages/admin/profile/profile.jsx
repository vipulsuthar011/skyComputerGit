import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import { faIndianRupeeSign, faLock, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Profile = () => {
    const [updatedCompanyDetail, setUpdatedCompanyDetail] = useState([]);


    useEffect(() => {
        getUserInfo();
    }, [])

    const getUserInfo = async () => {
        await axios.get('http://localhost:8000/api/companyDetail/getCompanyDetail'
            , {
                'headers': {
                    'authorization': `Bearer ${sessionStorage.token}`,
                },
            })
            .then((response) => {
                console.log(response.data.data[0].term)
                setUpdatedCompanyDetail(response.data.data[0].term);
                toast(response.data.message)
            })
    }


    const handleSave = () => {

        const finalTerm = updatedCompanyDetail.filter(term => term.trim() !== '');
        console.log(finalTerm);
        axios.post('http://localhost:8000/api/companyDetail/updateCompanyDetail', { term: finalTerm })
            .then(response => {
                toast.success(response.data.message);
            })
            .catch(error => {
                console.error('Error updating terms and conditions:', error);
            });
    };


    const handleTermChange = (index, value) => {
        const updatedTerms = [...updatedCompanyDetail];
        updatedTerms[index] = value;
        setUpdatedCompanyDetail(updatedTerms);
    };

    const handleAddTerm = () => {
        const updatedTerms = [...updatedCompanyDetail, ''];
        setUpdatedCompanyDetail(updatedTerms);
    };

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
                        <div className={styles.companyName}>Sky Computer</div>
                        <div className={styles.landmark}>Sec-3</div>
                    </div>

                    {/* profit  and Revenue*/}
                    <div className={styles.orderDetails}>
                        {/* profit */}
                        <div className={styles.profileProfitWrapper}>
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
                        {/* <Link to="/"> */}
                        <div className={styles.profileLinkBtnWrapper}>
                            {/* button image */}
                            <FontAwesomeIcon icon={faUser} className={styles.LinkIcon} />
                            {/* button text */}
                            <div>Company Information</div>
                        </div>
                        {/* </Link> */}
                        {/* <Link to="/"> */}
                        <div className={styles.profileLinkBtnWrapper}>
                            {/* button image */}
                            <FontAwesomeIcon icon={faLock} className={styles.LinkIcon} />
                            {/* button text */}
                            <div>Login & Password</div>
                        </div>
                        {/* </Link> */}
                        {/* <Link to="/"> */}
                        <div className={styles.profileLinkBtnWrapper}>
                            {/* button image */}
                            <FontAwesomeIcon icon={faRightFromBracket} className={styles.LinkIcon} />
                            {/* button text */}
                            <div>Logout</div>
                        </div>
                        {/* </Link> */}

                    </div>

                </div>


                {/* Right` Wrapper */}
                <div className={styles.rightWrapper}>








                    <div className={styles.profileContainer}>
                        {/* <h2>Profile Section</h2> */}
                        <div>
                            <h3>Terms and Conditions:</h3>
                            {/* {console.log(updatedCompanyDetail)} */}
                            <ol className={styles.termInputWrapper}>

                                {updatedCompanyDetail.map((term, index) => (
                                    <li>                    <input
                                        key={index}
                                        type="text"
                                        className={styles.termInput}
                                        value={term}
                                        onChange={e => handleTermChange(index, e.target.value)}
                                    />
                                    </li>
                                ))}
                            </ol>
                        </div>
                        <div className={styles.editSection}>
                            <button className={styles.saveButton} onClick={handleSave}>Save</button>
                            <button className={styles.addButton} onClick={handleAddTerm}>Add Term</button>
                        </div>
                    </div>










                </div>
            </div>
        </div>
    )
}

export default Profile