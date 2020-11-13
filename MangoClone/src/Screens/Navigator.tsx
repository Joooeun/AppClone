import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserContext } from '~/Context/User';

import Loading from '~/Screens/Loading';
import Login from '~/Screens/Login';
import MangoHome from '~/Screens/MangoHome';
import MangoDetail from '~/Screens/MangoDetail';
import Permission from '~/Screens/Permission';

import { PermissionsAndroid } from 'react-native';

const Stack = createStackNavigator();

const LoginNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: "MangoIntro",
                    headerTransparent: true,
                    headerTintColor: '#E70915',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const PermissionNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Permission"
                component={Permission}
                options={{
                    title: "MangoPermission",
                    headerTransparent: true,
                    headerTintColor: '#E70915',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const MangoNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MangoHome"
                component={MangoHome}
                options={{
                    title: "MangoHome",
                    headerTintColor: '#E70915',
                    headerStyle: {
                        backgroundColor: '#141414',
                        borderBottomWidth: 0,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name="MangoDetail"
                component={MangoDetail}
                options={{
                    title: "MangoHome",
                    headerTintColor: '#E70915',
                    headerStyle: {
                        backgroundColor: '#141414',
                        borderBottomWidth: 0,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
};

const requestCameraPermission = async (checkgeo: any) => {
    try {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        checkgeo(granted)

    } catch (err) {
        console.warn(err);
        checkgeo(false)
    }
};

export default () => {
    const { isLoading, userInfo, checkgeo, geo } = useContext<IUserContext>(UserContext);
    requestCameraPermission(checkgeo);

    if (isLoading == false) {
        return <Loading />;
    }
    return (
        <NavigationContainer>
            {userInfo ? (geo ? <MangoNavigator /> : <PermissionNavigator />) : <LoginNavigator />}
        </NavigationContainer>
    );
};