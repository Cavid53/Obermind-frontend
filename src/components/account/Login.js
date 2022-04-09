import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/login.scss';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate('/order')
        }
    }, []);

 
    const onSubmit = async e => {
        e.preventDefault();
        let data = {email,password};
        const response = await axios.post("/v1/account/login", data);
        localStorage.setItem("user-info",JSON.stringify(response.data.data))
        navigate("/order");
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className='login-form' onSubmit={e => onSubmit(e)}>
                    <div className="form-outline mb-4 mt-3">
                        <input type="email" required  className="form-control" placeholder='Email address' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" required  className="form-control" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-primary btn-block mb-4">Sign in</button>
                </form>
            </div>
        </div>
    )
}
export default Login;

