import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import Spinner from '../../../components/Spinner/Spinner';

const ProductDetails = () => {

    const items = useLoaderData()
    const { loading } = useContext(AuthContext)

    const { image, name, seller_name, price } = items

    if (loading) {
        return <Spinner></Spinner>
    }

    return (
        <div className="card lg:card-side bg-base-100 shadow-xl mx-10 my-10">
            <figure><img className='w-[600px]' src={image} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Seller: {seller_name}</p>
                <p>Price: ${price}</p>
                <div className="card-actions justify-end">
                    {/* <Link className="btn btn-accent">Add to cart</Link> */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;