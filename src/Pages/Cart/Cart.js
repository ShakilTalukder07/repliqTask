import React, { useEffect, useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../components/Spinner/Spinner';

const Cart = () => {

    const [deletingProduct, setDeletingProduct] = useState(null)
    // const [orders, setOrders] = useState([])

    // useEffect(() => {
    //     fetch('https://repliq-server-one.vercel.app/orders')
    //         .then(res => res.json())
    //         .then(data => setOrders(data))
    // }, [])

    const { data: orders, isLoading, refetch } = useQuery({
        queryKey: ['orders'],
        queryFn: async () => {
            try {
                const res = await fetch('https://repliq-server-one.vercel.app/orders', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                const data = await res.json()
                return data;
            } catch (error) {

            }
        }
    })

    const closeModal = () => {
        setDeletingProduct(null)
    }

    const handleDeleteProduct = (order) => {
        console.log(order);
        fetch(`https://repliq-server-one.vercel.app/orders/${order._id}`, {
            method: "DELETE",
            // headers: {
            //     authorization: `bearer ${localStorage.getItem('accessToken')}`
            // }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success('Product deleted successfully')
                }
            })
    }

    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <h3 className="text-3xl font-bold m-4">You have: {orders?.length} orders</h3>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length && orders.map((order) => <tr key={order._id}>
                                <th>
                                    <label onClick={() => setDeletingProduct(order)} htmlFor="confirmationModal" className="btn  btn-ghost bg-orange-600 btn-sm">Delete</label>
                                </th>
                                <td>
                                    {order.serviceName}
                                </td>
                                <td>${order.price}</td>
                                <td>{order.description}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingProduct && <ConfirmationModal
                    title={`Are you sure, you want to delete?`}
                    successAction={handleDeleteProduct}
                    successButtonName="Delete"
                    modalData={deletingProduct}
                    closeModal={closeModal}
                >
                </ConfirmationModal>
            }
        </div>
    );
};

export default Cart;