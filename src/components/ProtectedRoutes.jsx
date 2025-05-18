import React from 'react'
import { Outlet, Navigate } from "react-router";


function ProtectedRoutes() {

    const token = localStorage.getItem("access_token")
    return (
        token ? <Outlet /> : <Navigate to="/login" />
    )
}

export default ProtectedRoutes
