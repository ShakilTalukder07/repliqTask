import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Spinner from '../../components/Spinner/Spinner';

const AllCustomers = () => {

    const [customers, setCustomers] = useState([])
    const {loading} = useContext(AuthContext)

    useEffect(()=>{
        fetch('http://localhost:5000/customers')
        .then( res => res.json())
        .then( data => setCustomers(data))
    },[])

    console.log(customers);

    if(loading){
        return <Spinner></Spinner>
    }

    return (
        <div>
        <h3 className="text-3xl font-bold m-4">You have: {customers?.length} customer</h3>
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.length && customers.map((customer) => <tr key={customer._id}>
                            
                            <td>
                                {customer.name}
                            </td>
                            <td>{customer.email}</td>
                            {/* <td>{order.description}</td> */}
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default AllCustomers;