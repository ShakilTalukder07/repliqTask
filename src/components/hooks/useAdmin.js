import { useEffect, useState } from 'react';

const useAdmin = (email) => {
    const [isAdmin, setIsAdmin] = useState('')
    const [isAdminLoading, setAdminLoading] = useState(true)
    useEffect(() => {
        fetch(`http://localhost:5000/admin/${email}`)
            .then(res => res.json())
            .then(data => {
                setIsAdmin(data.role)
                setAdminLoading(false)
            })
    }, [email])
    return [isAdmin, isAdminLoading]
};

export default useAdmin;