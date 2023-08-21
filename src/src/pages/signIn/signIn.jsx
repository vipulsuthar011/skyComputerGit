import clsx from 'clsx'
import React, { useState } from 'react'
import styles from './signIn.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import commonFunction from '../../commonServices/commonFunction'

const SignIn = () => {
    const [value, setValue] = useState({phoneNumber:'',password:''})
    const [error, setError] = useState('')
    const navigation = useNavigate()
    const handleOnChange = (event) => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/login', { phoneNumber: value.phoneNumber, password: value.password }).
            then((response) => {

                console.log(response)
                if(response.data.success){
                    toast(response.data.message)
                    sessionStorage.setItem("token", response.data.authToken)
                    sessionStorage.setItem("userType", "admin")
                        navigation("/admin/billing", { replace: true })
                        window.location.reload(true);
                }
                else{
                    toast.error(response.data.message)
                }
                debugger
         
            }).catch((error) => {
                console.log(error)
                setError(error.response.data.error)
                console.log(error.response.data.error)
            })
    }
    return (
        <div className={styles.signUpWrapper}>
            <div className={styles.signUpSubWrapper}>
                <div className={`${styles.mainWrapper}`}>
                    <div className={`", ${styles.singnUpLeftWrapper}`}>
                        <img src="./images/signUp/signupbanner.jpg" alt="" />
                    </div>
                    <div className={clsx("", styles.signUpRightWrapper)}>
                        <div className={styles.signUpLeftFromWrapper}>
                            <h4 className='text-center mb-3 font-weight-bold'>Sign In</h4>
                            <form className={styles.signUpLeftFormWrapper} onSubmit={handleSubmit}>
                                {/* <input type="text" placeholder='Username' required onChange={handleOnChange} value={value.username} name="username" /> */}
                                <input maxLength="10" minLength="10" onKeyPress={(e)=>commonFunction.validateOnlyInteger(e)} type="text" placeholder='Phone number' required onChange={handleOnChange} value={value.phoneNumber} name="phoneNumber" />
                                <input minLength={1} type="password" placeholder='Password' required onChange={handleOnChange} value={value.password} name="password" />
                                {error ? <div className={styles.signInError}>{error}</div> : ""}
                                <button className={styles.signUpBtn} name="submit" type='submit'>Sign In</button>
                                {/* <div className={`${styles.createAccount}`}>Dont haven't account ? <Link to="/sign-up">Create a account</Link></div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn