import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';


const defaultContext: IUserContext = {
    isLoading: false,
    userInfo: undefined,
    login: (first: boolean) => { },
    getUserInfo: () => { },
    logout: () => { },
    geo: false,
    checkgeo: (first: boolean) => { },
};

const UserContext = createContext(defaultContext);

interface Props {
    children: JSX.Element | Array<JSX.Element>;
}

const UserContextProvider = ({ children }: Props) => {
    const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [geo, setGeo] = useState<boolean>(false);

    const login = (first: boolean): void => {
        AsyncStorage.setItem('token', 'save your token').then(() => {
            setUserInfo({
                first: false,
            });
            setIsLoading(true);
        });
    };

    const logout = (): void => {
        AsyncStorage.removeItem('token');
        setUserInfo(undefined);
    };

    const getUserInfo = (): void => {
        AsyncStorage.getItem('token')
            .then(value => {
                if (value) {
                    setUserInfo({
                        first: false,
                    });
                }
                setIsLoading(true);
            }).catch(() => {
                setUserInfo(undefined);
                setIsLoading(true);
            });

    };

    const checkgeo = (geo: boolean): void => {
        setGeo(geo);
    };

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <UserContext.Provider
            value={{
                isLoading,
                userInfo,
                login,
                getUserInfo,
                logout,
                geo,
                checkgeo,
            }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContextProvider, UserContext };