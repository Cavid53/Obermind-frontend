import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/styles/register.scss'

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    const navigate = useNavigate();

    const onSubmit = async e => {
        debugger
        e.preventDefault();
        let data = {email,password,fullName};
        await axios.post("/v1/account/register", data);
        navigate("/login");
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className='login-form' onSubmit={e => onSubmit(e)}>
                    <div className="form-outline mb-4 mt-3">
                        <input type="email" className="form-control" required  placeholder='Email address' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-outline mb-4 mt-3">
                        <input type="text" className="form-control" required  placeholder='Full name' onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" className="form-control" required  placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-block mb-4">Sign up</button>
                </form>
            </div>
        </div>
    )
}
export default Register;