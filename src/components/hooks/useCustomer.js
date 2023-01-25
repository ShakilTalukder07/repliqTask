import { useEffect, useState } from 'react';

const useCustomer = (email) => {
    const [IsCustomer, setIsCustomer] = useState(false)
    const [IsCustomerLoading, setBuyerLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/customers/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsCustomer(data.role)
                setBuyerLoading(false)
            })
    }, [email])
    return [IsCustomer, IsCustomerLoading]
};

export default useCustomer;