import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';
import Spinner from '../../../components/Spinner/Spinner';
import Product from './Product';

const Products = () => {

    const [products, setProducts] = useState([])
    const { loading } = useContext(AuthContext)

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    // console.log(products,"product");

    if (loading) {
        return <Spinner></Spinner>
    }

    return (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2'>
            {
                products.map(product => <Product
                key={product._id}
                product={product}
                ></Product> )
            }
        </div>
    );
};

export default Products;