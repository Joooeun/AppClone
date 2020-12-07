import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets, } from '@react-navigation/stack';

import { UserContext } from '~/Context/User';

import Loading from '~/Screens/Loading';
import Login from '~/Screens/Login';
import MangoHome from '~/Screens/MangoHome';
import MangoDetail from '~/Screens/MangoDetail';
import Permission from '~/Screens/Permission';
import Filter from '~/Screens/Filter';

import { Image, LogBox, PermissionsAndroid } from 'react-native';

const Stack = createStackNavigator();

const LoginNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: "",
                    headerTransparent: true,
                    headerStyle: {
                        height: 20
                    },
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
                    title: "",
                    headerTransparent: true,
                    headerStyle: {
                        height: 20
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'right'
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
                    title: "",
                    headerTransparent: true,
                    headerStyle: {
                        height: 20
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'right'
                    },
                }}
            />
            <Stack.Screen
                name="MangoDetail"
                component={MangoDetail}
                options={{
                    ...TransitionPresets.ModalSlideFromBottomIOS,
                    title: "",
                    headerStyle: {
                        height: 60,
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign: 'right'
                    },
                    headerTintColor: '#fff',
                    headerBackImage: () => (
                        <Image
                            style={{ width: 40, height: 40, tintColor: '#ff8800' }}
                            source={{ uri: 'https://cdn1.iconfinder.com/data/icons/essentials-pack/96/down_bottom_downward_arrow_navigation-256.png' }}
                            resizeMode='contain'
                        />
                    )
                }}
            />
        </Stack.Navigator>
    );
};

const ModalNavi = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
                cardStyleInterpolator: ({ current: { progress } }) => ({
                    cardStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 0.5, 0.9, 1],
                            outputRange: [0, 0.25, 0.7, 1],
                        }),
                    },
                    overlayStyle: {
                        opacity: progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0.5],
                            extrapolate: 'clamp',
                        }),
                    },
                }),
            }}
            mode="modal"
        >
            <Stack.Screen name="Stack" component={MangoNavigator} />
            <Stack.Screen
                name="Filter"
                component={Filter}
                options={{
                    //...TransitionPresets.ModalSlideFromBottomIOS,
                    headerShown: false
                }} />
        </Stack.Navigator>
    )
}

const requestCameraPermission = async (checkgeo: any) => {
    try {
        const granted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        checkgeo(granted)
        
    } catch (err) {
        console.log(err);
        checkgeo(false)
    }
};

export default () => {
    
    LogBox.ignoreAllLogs(true)
    const { isLoading, userInfo, checkgeo, geo } = useContext<IUserContext>(UserContext);
    requestCameraPermission(checkgeo);

    if (isLoading == false) {
        return <Loading />;
    }
    return (
        <NavigationContainer>
            {userInfo ? (geo ? <ModalNavi /> : <PermissionNavigator />) : <LoginNavigator />}
        </NavigationContainer>
    );
};