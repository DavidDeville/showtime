import React, { useContext } from 'react';
import jwtDecode from 'jwt-decode';
import AuthContext from '../contexts/AuthContext';
import { useEffect } from 'react';
import api from '../services/authAPI';
import { useState } from 'react';

const AdminPage = ({history}) => {

    const {isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let isAdmin = api.isAdmin();
        
        if(!isAdmin)
        {
            setIsAdmin(false);
            history.replace('/login');
        }
        setIsAdmin(true);
    }, []);

    return (
        <div>
            <p>Bienvenue sur le panel admin !</p>
        </div>
    )
}

export default AdminPage;