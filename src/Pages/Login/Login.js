import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { FaEnvelope, FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
// import firebase from 'firebase/compat/app'
// import * as firebaseui from 'firebase'
// import 'firebaseui/dist/firebase.css'


const Login = () => {

    const [pShow, setPShow] = useState(false)
    const { register, handleSubmit } = useForm()
    const { signIn, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [loginUserEmail, setLoginUserEmail] = useState('')
    // const [token] = useToken(loginUserEmail);
    const location = useLocation();

    const from = location.state?.from?.pathname || '/'

    // if (token) {
    //     navigate(from, { replace: true });
    // }


    const handleGoogle = () => {
        setLoginError("");
        googleLogin()
            .then((result) => {
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: 'customer'
                }
                fetch('http://localhost:5000/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(userInfo)
                })
                    .then(res => res.json())
                    .then()
                navigate(from, { replace: true })
            })
            .catch((error) => setLoginError(error.message));
    };

    const handleLogin = (data) => {
        console.log(data);
        signIn(data.email, data.password)
        .then( result =>{
            const user = result.user;
            console.log(user);
            setLoginUserEmail(data.email)
        })
        .catch(error => setLoginError(error.message))
    }
    //show password 
    const togglePassVisibility = () => {
        setPShow(!pShow)
    }
   

    return (
        <div className="">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                    <div className="">
                        <img src="https://i.ibb.co/9Wty6PY/Mobile-login-bro-1.png" alt="" />
                    </div>
                    <div className="w-9/12 mx-auto lg:w-full">
                        <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col justify-center space-y-3 lg:w-2/3 mx-auto bg-base-100 shadow-lg p-6 ">
                            <h4 className="text-center text-3xl uppercase py-4 font-semibold">login</h4>
                            <div className="relative">
                                <input {...register('email', { required: 'email required' })} type="text" placeholder="Email" className="input focus:outline-none w-full input-bordered focus:border focus:border-cyan-300" />
                                <span className="bg-base-100"><FaEnvelope size={20} className="text-gray-400 cursor-pointer hover:text-[#0EA5E9] absolute right-4 top-1/2 -translate-y-2/4 " /></span>
                            </div>
                            <div className="justify-center relative">
                                <input {...register('password', { required: 'required' })} type={pShow ? 'text' : 'password'} placeholder="Password" className="input input-bordered focus:outline-none w-full focus:border focus:border-cyan-300" />
                                <span className="bg-base-100"><FaEye size={20} onClick={togglePassVisibility} className="text-gray-400 cursor-pointer hover:text-[#0EA5E9] absolute right-4 top-1/2 -translate-y-2/4" /></span>
                            </div>
                            <button type="submit" className="btn bg-[#0EA5E9] border-none hover:bg-[#0EA5E9]">Login</button>
                            <button onClick={handleGoogle} type="submit" className="btn  border text-gray-800 bg-gray-50 border-sky-500 hover:bg-white">Sign In with <FcGoogle className="ml-4 text-2xl"></FcGoogle></button>
                            <div>
                                <p className="text-sm capitalize text-center">new to Repliq? <Link to='/signup' className="text-[#0EA5E9]">sign up</Link> </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;