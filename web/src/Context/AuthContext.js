import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";

import api from '../services/api';

const Context = createContext();

function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            setAuthenticated(true);
        }

        setLoading(false);
    }, []);

    async function handleLogin(email, password) {
        const { data: { token } } = await api.post('/user/authenticate', {email, password});

        
        localStorage.setItem('token', JSON.stringify(token));
        
        api.defaults.headers.Authorization = `Bearer ${token}`;
        
        setAuthenticated(true);
        
        alert('Logado com sucesso');

    }

    function handleLogout() {
        setAuthenticated(false);

        localStorage.removeItem('token');
        
        api.defaults.headers.Authorization = undefined;
    }

    if(loading) {
        return <h1>Loading...</h1>
    }

    return(
        <Context.Provider value={{authenticated, handleLogin, handleLogout}}>
            {children}
        </Context.Provider>
    )
}

export { Context, AuthProvider };