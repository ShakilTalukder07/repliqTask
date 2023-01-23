import React, { useContext, useState } from 'react';
import Icon from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';
import { toast } from 'react-hot-toast';



const Signup = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState("")
    const { createUser, updateUser, googleLogin } = useContext(AuthContext)
    const [signUpError, setSignUpError] = useState('');
    const [createUserEmail, setCreateUserEmail] = useState('')
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);
    const location = useLocation()
    const navigate = useNavigate();


    // if (token) {
    //     navigate('/')
    // }

    const from = location.state?.from?.pathname || '/'

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text');
        }
        else {
            setIcon(eyeOff);
            setType('password');
        }
    }

    const handleGoogle = () => {
        setError("");
        googleLogin()
            .then((result) => {
                console.log(result.user);
                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: 'buyer'
                }
                fetch('https://resala-server.vercel.app/users', {
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
            .catch((error) => setError(error.message));
    };

    const handleSignUp = data => {
        console.log(data);
        setSignUpError('');
        createUser(data.email, data.password, data.role)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully');
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.role)
                    })
                    .catch(error => console.error(error))
            })
            .catch(error => setSignUpError(error))
    }

    const saveUser = (name, email, role) => {
        const userData = { name, email, role }
        console.log(userData);
        // fetch('https://resala-server.vercel.app/users', {
        //     method: 'POST',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(userData)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         setCreateUserEmail(email);
        //     })
    }

    return (
        <div className='lg:flex md:flex-row flex-col lg:justify-evenly mt-24 mx-auto'>
            <div>
                <img className='h-[450px]' src="https://i.ibb.co/XxqDcj2/Mobile-login-pana.png" alt="" />
            </div>
            <div>
                <div className='flex justify-center items-center rounded-lg '>
                    <div className='w-96 p-7 shadow-2xl'>
                        <h1 className='text-2xl text-center font-bold'>Sign Up</h1>
                        <form onSubmit={handleSubmit(handleSignUp)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Name</span></label>
                                <input {...register("name", {
                                    required: 'Name is required',
                                })} className="input input-bordered w-full max-w-xs" type="text" />
                                {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Email</span></label>
                                <input {...register("email", {
                                    required: 'Email is required'
                                })} className="input input-bordered w-full max-w-xs" type="email" />
                                {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Password</span></label>
                                <div className='position: relative'>
                                    <input {...register("password", {
                                        required: 'Password is required',
                                        minLength: { value: 6, message: 'Password must be 6 character long' },
                                        pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase special character and number' }
                                    })} className="input input-bordered w-full max-w-xs" type={type} />
                                    <span className='position: absolute right-3 top-2' onClick={handleToggle}><Icon icon={icon} size={25} /></span>
                                    {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                                </div>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label"> <span className="label-text">Confirm Password</span></label>
                                <input {...register("confirmPassword", {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be 6 character long' },
                                    pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase special character and number' }
                                })} className="input input-bordered w-full max-w-xs" type="password" />
                                {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                            </div>
                            <input className='btn btn-info w-full mt-6 text-white' value="Sign Up" type="submit" />
                            {signUpError && <p className='text-red-600'> {signUpError}</p>}
                            <button onClick={handleGoogle} type="submit" className="btn w-full mt-2 border text-gray-800 bg-gray-50 border-sky-500 hover:bg-white">Sign In with <FcGoogle className="ml-4 text-2xl"></FcGoogle></button>
                        </form>
                        <div>
                            <p className="text-sm pt-4 capitalize text-center">Already have an account? <Link href='/login' className="text-[#0EA5E9] ">Login</Link> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;