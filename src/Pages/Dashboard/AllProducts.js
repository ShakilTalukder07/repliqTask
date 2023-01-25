import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';

const AllProducts = () => {

    const { loading } = useContext(AuthContext)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('https://repliq-server-one.vercel.app/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    // console.log(products);

    if (loading) {
        return <Spinner></Spinner>
    }

    return (
        <>
            <h1 className="text-2xl font-bold ml-5 my-4">Total Products: {products.length}</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2'>
                {
                    products.map(product => <div className="card card-compact w-[270px] shadow-xl my-2 mx-auto">
                        <figure><img className='w-full h-40' src={product.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{product.name}</h2>
                            <p>${product.price}</p>
                            <div className="card-actions flex">
                                {/* <Link to={`/products/${_id}`} className="btn btn-accent h-2">View Details</Link>
                            <Link to={`/checkout/${_id}`} className="btn btn-accent h-2">Checkout</Link> */}
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </>
    );
};

export default AllProducts;