import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { authService, RegistrationInfo } from '../services/auth.service'

import '../App.css'
import { storageService } from "../services/storage.service"
import userEvent from "@testing-library/user-event"

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [update, setUpdate] = useState<Boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = storageService.getLocalUser();
        if (user) {
            navigate('/home');

        }
        else {
            // הערה
            // alert('Wellcom');
        }
    }, [])

    useEffect(() => {
        const user = storageService.getLocalUser();
        if (user) {
            navigate('/home');

        }
        else {
            // הערה
            //   alert('Typing error, please try again');
        }
    }, [update])

    const loginUser = async () => {
        const res = await authService.login(email, password)
        // navigate('/bikes');
        if (res) {
            setUpdate(true);
        }
        // );


    }

    return (
        <div className="text-center m-5-auto">
            <h2>Sign in to us</h2>
            <form action="/login">
                <p>
                    <label>Email address</label><br />
                    <input onChange={(e) => setEmail(e.target.value)} type="text" name="username" required />
                </p>
                <p>
                    <label>Password</label>
                    <Link to="/forget-password"><label className="right-label">Forget password?</label></Link>
                    <br />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" required />
                </p>
                <p>
                    <button onClick={loginUser} id="sub_btn" type="submit">Login</button>
                </p>
            </form>
            <footer>
                <p>First time? <Link to="/register">Create an account</Link>.</p>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
        </div>
    )
}
