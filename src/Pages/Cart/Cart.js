import React, { useEffect, useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

const Cart = () => {

    const [deletingProduct, setDeletingProduct] = useState(null)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/orders')
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])


    const closeModal = () => {
        setDeletingProduct(null)
    }

    // console.log(orders);

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
                // successAction={handleDeleteProduct}
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