import React from 'react';

const Product = ({ product }) => {
    // console.log(product);
    const { name, image, price } = product
    return (
        <div className="card card-compact w-60 shadow-xl my-2 mx-auto">
            <figure><img className='w-full h-40' src={image} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>${price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-accent w-full h-2">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default Product;