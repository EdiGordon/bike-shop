import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { authService, RegistrationInfo } from '../services/auth.service'
import '../App.css'
import { storageService } from "../services/storage.service"
import { useNavigate } from 'react-router-dom'

export const RegisterPage: React.FC = () => {

    const [user, setUser] = useState({});
    const updateUser = (newValue: object) => {
        console.log(newValue);
        let key = Object.keys(newValue)[0];
        let value = Object.values(newValue)[0];
        setUser((prevUser) => {
            return { ...prevUser, [key]: value }
        })
    }
    const [update, setUpdate] = useState<Boolean>(false);
    const registerUser = async () => {
        const response = await authService.register(user as RegistrationInfo);
        navigate('/home');
        if (response) {
            setUpdate(true);
        }

    }

    const navigate = useNavigate();

    useEffect(() => {
        const user = storageService.getLocalUser();
        if (user) {
            navigate('/home');

        }
        else {
            // הערה
            console.log('heara');
        }
    }, [])

    useEffect(() => {
        const user = storageService.getLocalUser();
        if (user) {
            navigate('/home');

        }
        else {
            // הערה
            console.log('heara');
        }
    }, [update])

    // const loginUser = async () => {
    //     const res = await authService.login(email, password)
    //     // navigate('/bikes');
    //     if (res) {
    //         setUpdate(true);
    //     }
    //     // );


    // }

    return (
        <div className="text-center m-5-auto" >
            <h2>Join us </h2>
            < h5 > Create your personal account </h5>
            <form action="/login" >
                <p>
                    <label>Username </label><br />
                    <input onChange={(e) => updateUser({ username: e.target.value })} type="text" name="username" required />
                </p>
                <label>Email address </label><br />
                <input onChange={(e) => updateUser({ email: e.target.value })} type="email" name="email" required />
                < p >
                    <label>Password </label><br />
                    <input onChange={(e) => updateUser({ password: e.target.value })} type="password" name="password" required />
                </p>
                {/* <p >
                    <input type="checkbox" name="checkbox" id="checkbox" required /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer" > terms of service < /a></span >.
                </p> */}
                < p >
                    <button onClick={registerUser} id="sub_btn" type="submit" > Register </button>
                </p>
            </form>
        </div>
    )
}