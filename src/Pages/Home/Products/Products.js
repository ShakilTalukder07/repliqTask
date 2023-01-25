import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Spinner from '../../../components/Spinner/Spinner';
import Product from './Product';

const Products = () => {

    const [products, setProducts] = useState([])
    const { loading } = useContext(AuthContext)

    useEffect(() => {
        fetch('https://repliq-server-one.vercel.app/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    if (loading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                    ></Product>)
                }
            </div>
        </div>
    );
};

export default Products;