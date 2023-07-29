import clsx from 'clsx'
import React, { useState } from 'react'
import styles from './signUp.module.css'
import axios from 'axios'
import { useNavigate, redirect, Link } from 'react-router-dom'
// import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify'

const SignUp = () => {
    const [value, setValue] = useState('')

    const [error, setError] = useState('')
    // const navigation = useNavigate();
    // let history = useHistory()
    const navigate = useNavigate();
    // const history=usehistory()

    const handleOnChange = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/user/signUp', { phoneNumber: value.phoneNumber, password: value.password, userType: "customer" }).
            then((response) => {
                console.log(response)
                // sessionStorage.setItem("userType", "customer")
                toast(response.data.message)
                // navigation("/sign-up")
                // redirect("/home")
                navigate('/sign-in', { replace: true })

            }).catch((error) => {
                console.log(error)
            })
    }
    return (
        <div className={styles.signUpWrapper}>
            <div className={styles.signUpSubWrapper}>
                <div className={`${styles.mainWrapper}`}>
                    <div className={clsx("", styles.singnUpLeftWrapper)}>
                        <img src="./images/signUp/signupbanner.jpg" alt="" />
                    </div>
                    <div className={clsx("", styles.signUpRightWrapper)}>
                        <div className={styles.signUpLeftFromWrapper}>
                            <h4 className='text-center mb-3'>Sign Up</h4>
                            <form className={styles.signUpLeftFormWrapper}>
                                {/* <input type="text" placeholder='Username' required onChange={handleOnChange} value={value.username} name="username" /> */}
                                <input type="number" placeholder='Phone number' required onChange={handleOnChange} value={value.phoneNumber} name="phoneNumber" />
                                <input type="text" placeholder='Password' required onChange={handleOnChange} value={value.password} name="password" />
                                {error ? <div className={styles.signInError}>{error}</div> : ""}

                                <button className={styles.signUpBtn} name="submit" type='submit' onClick={handleSubmit}>Sign Up</button>
                                <div className={`${styles.alreadyHaveAccount}`}>Already have account ? <Link to="/sign-in">Sign in</Link></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp