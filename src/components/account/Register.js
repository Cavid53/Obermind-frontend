import React from 'react';
import '../../assets/styles/register.scss'

const Register = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <form className='login-form'>
                    <div className="form-outline mb-4 mt-3">
                        <input type="email" id="form2Example1" className="form-control" placeholder='Email address' />
                    </div>
                    <div className="form-outline mb-4 mt-3">
                        <input type="fullName" id="form2Example1" className="form-control" placeholder='Full name' />
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" placeholder='Password' />
                    </div>
                    <button type="button" className="btn btn-primary btn-block mb-4">Sign up</button>
                </form>
            </div>
        </div>
    )
}
export default Register;