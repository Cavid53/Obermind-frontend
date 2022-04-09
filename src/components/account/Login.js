import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/login.scss'

const Login = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const history = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            history.push('/add')
        }
    },[]);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className='login-form'>
                    <div className="form-outline mb-4 mt-3">
                        <input type="email" className="form-control" placeholder='Email address' onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" className="form-control" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} />
                    </div>
                    <button type="button" className="btn btn-primary btn-block mb-4">Sign in</button>
                </form>
            </div>
        </div>
    )
}
export default Login;

