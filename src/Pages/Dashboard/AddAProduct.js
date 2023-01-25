import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const AddAProduct = () => {

    const { register, handleSubmit, formState: { errors }, isLoading } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key
    const navigate = useNavigate()
    const handleAddProduct = data => {
        console.log(data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image)
        const url = (`https://api.imgbb.com/1/upload?key=${imageHostKey}`)
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const products = {
                        name: data.name,
                        title: data.title,
                        price: data.price,
                        number: data.number,
                        image: imgData.data.url
                    }
                    console.log(products);
                    // save product information to database
                    fetch('https://repliq-server-one.vercel.app/products', {
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
                            toast.success(`${data.title} is add successfully`)
                            navigate('/')
                        })
                }
            })
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-2xl m-4 text-center font-bold '>Add Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)}>

                    <div className="data-control w-full ma-w-xs">
                        <label className="label"> <span className="label-text">Product Image</span></label>
                        <input {...register("image", {
                            required: 'image is required'
                        })} type="file" className="file-input file-input-bordered  w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div div className="form-control w-full max-w-xs" >
                        <label className="label"> <span className="label-text">Brand Name</span></label>
                        <input {...register("name", {
                            required: 'category is required',
                        })} className="input input-bordered w-full max-w-xs" type="text" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Product Name</span></label>
                        <input {...register("title", {
                            required: 'title is required',
                        })} className="input input-bordered w-full max-w-xs" type="text" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>

                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Product Price</span></label>
                        <input {...register("price", {
                            required: 'price is required',
                        })} className="input input-bordered w-full max-w-xs" type="number" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <input className='btn btn-info w-full mt-6' value="Add Product" type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddAProduct;