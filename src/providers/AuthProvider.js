import React, { useState, useEffect, createContext } from 'react';

import jwtDecode from 'jwt-decode';
import { getAccessTokenApi, getRefreshTokenApi, refreshAccessTokenApi, logout } from '../api/auth';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    useEffect(() => {
        checkUserLogin(setUser);
    }, []);

    const [user, setUser] = useState({
        user: null,
        isLoading: true
    });

    return (
        <AuthContext.Provider value={user}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;

function checkUserLogin (setUser) {
    const accessToken = getAccessTokenApi();

    if (!accessToken) {
        const refreshToken = getRefreshTokenApi();

        if (!refreshToken) {
            logout();
            setUser({
                user: null,
                isLoading: false
            });
        } else {
            refreshAccessTokenApi(refreshToken);
        }
    } else {
        setUser({
            isLoading: false,
            user: jwtDecode(accessToken)
        });
    }
};