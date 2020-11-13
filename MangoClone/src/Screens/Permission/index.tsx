import React, { useContext } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Geolocation from 'react-native-geolocation-service';
import { UserContext } from '~/Context/User';

const Container = styled.SafeAreaView`
    flex:1;
    align-items: flex-end;
    justify-content:flex-end;
`

const StyleButton = styled.TouchableOpacity`
    background-color:rgba(0,0,0, 0.6);
    padding:10px 20px;
    border-radius:20px;

`

const StyleText = styled.Text`
    color:#000;
    font-size:20px;
`

type NavigationProp = StackNavigationProp<LoginNaviParamList, 'Login'>;

interface Props {
    navigation: NavigationProp;
}

const requestCameraPermission = async (checkgeo: any) => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            checkgeo(true)
        } else {
            checkgeo(false)
        }
    } catch (err) {
        console.warn(err);
        checkgeo(false)
    }
};


const Permission = ({ navigation }: Props) => {
    const { checkgeo } = useContext<IUserContext>(UserContext);
    return (
        <Container>
            <StyleButton onPress={() => { requestCameraPermission(checkgeo) }}><StyleText>위치정보 제공 동의하기</StyleText></StyleButton>
        </Container>
    );
};

export default Permission;