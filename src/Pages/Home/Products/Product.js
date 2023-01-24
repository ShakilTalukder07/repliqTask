import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    // console.log(product);
    const { _id, name, image, price } = product
    return (
        <div className="card card-compact w-[270px] shadow-xl my-2 mx-auto">
            <figure><img className='w-full h-40' src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>${price}</p>
                <div className="card-actions flex">
                    <Link to={`/products/${_id}`} className="btn btn-accent h-2">View Details</Link>
                    <Link to={`/checkout/${_id}`} className="btn btn-accent h-2">Checkout</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;