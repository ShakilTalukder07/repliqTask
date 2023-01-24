import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import Spinner from '../../../components/Spinner/Spinner';

const Checkout = () => {

    const items = useLoaderData()
    const { loading, user } = useContext(AuthContext)

    // console.log(user);

    const { image, name, seller_name, price } = items

    if (loading) {
        return <Spinner></Spinner>
    }


    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const price = form.price.value;
        const email = user?.email || 'Unregistered'
        const description = form.description.value;
        // console.log(title, price, email, description);

        const totalServices = {
            serviceName: title,
            price,
            email,
            description
        }

        fetch('http://localhost:5000/orders/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(totalServices)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    form.reset();
                }
            })
            .catch(error => console.error(error))

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='grid mx-auto w-[450px] my-12 shadow-xl p-14 gap-4'>

                <img className='w-full h-40' src={image} alt="" />
                <input name='title' type="text" placeholder="Title" defaultValue={name} className="input input-bordered w-full  bg-gray-900 text-red-100" readOnly />

                <input name='price' type="number" placeholder="Price" defaultValue={price} className="input input-bordered w-full  bg-gray-900 text-red-100" readOnly />

                <input name='email' type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full  bg-gray-900 text-red-100" readOnly />


                <textarea name='description' type="text" className="textarea textarea-bordered h-40 w-full my-6  bg-gray-900 text-red-100 " placeholder="Your Order Details" required></textarea>
                <div className='flex justify-center items-center'>
                    <input className='btn btn-wide inline-flex items-center my-6' type="submit" value="Add to cart" />
                </div>
            </div>
        </form>
    );
};

export default Checkout;