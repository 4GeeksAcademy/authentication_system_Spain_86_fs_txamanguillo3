import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Outlet, Navigate } from "react-router-dom";

export const PrivateRoute = () => {
    const [isAdmin, setIsAdmin] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const checkIsAdmin = async () => {
            const token = localStorage.getItem("token")
            if (!token) {
                setIsAdmin(false)
                return;
            }
            try {
                const response = await fetch(`${process.env.BACKEND_URL}api/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if(!response.ok) throw new Error('token not valid');

                const data = await response.json();
                // if (data.is_admin == true) {
                //     setIsAdmin(true)
                // } else {
                //     setIsAdmin(false)
                //     localStorage.removeItem('token')
                // }
                setIsAdmin(data.is_admin == true)
            } catch (error) {
                console.log(error)
                setIsAdmin(false)
                localStorage.removeItem('token')
            }
        }
        checkIsAdmin()
    }, [])
    if (isAdmin == null) {
        return <h1>loading...</h1>
    }
    return isAdmin ? <Outlet /> : < Navigate to='/' replace/>
}