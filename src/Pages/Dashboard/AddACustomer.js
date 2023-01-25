import React from 'react';
import { toast } from 'react-hot-toast';
import Spinner from '../../components/Spinner/Spinner';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AddACustomer = () => {

    const { register, handleSubmit, formState: { errors }, isLoading } = useForm();
    const navigate = useNavigate()
    const handleAddProduct = data => {
        console.log(data);
        const products = {
            name: data.name,
            email: data.email,
            role: "customer"
        }
        console.log(products);
        // save product information to database
        fetch('http://localhost:5000/customers', {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                // authorization: `bearer${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(products)
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                toast.success(`${data.email} is add successfully`)
                // navigate('/')
            })
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-2xl m-4 text-center font-bold '>Add A New Customer</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>


                    <div div className="form-control w-full max-w-xs" >
                        <label className="label"> <span className="label-text">Customer Name</span></label>
                        <input {...register("name", {
                            required: 'category is required',
                        })} className="input input-bordered w-full max-w-xs" type="text" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Customer Email</span></label>
                        <input {...register("email", {
                            required: 'email is required',
                        })} className="input input-bordered w-full max-w-xs" type="text" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <input className='btn btn-info w-full mt-6' value="Add Product" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddACustomer;