import React, { useState } from 'react';
import { setSession, clearSession } from '../../SessionManager';
import { useNavigate } from 'react-router-dom';


function HandleLogOut(){

    const navigate = useNavigate();


    const handleLogout = () => {
        clearSession();
        navigate('/');
      };

    return(
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default HandleLogOut;