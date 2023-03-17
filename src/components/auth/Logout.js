import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Auth.css"

export const LogOut = () => {
    const navigate = useNavigate();
    setTimeout(() => {
        navigate('/login');
    }, 500);
    return (
        <div>
            <p>You are being logged out</p>
            {localStorage.removeItem("lu_token")}
        </div>
    )
}