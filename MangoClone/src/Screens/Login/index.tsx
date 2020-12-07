import React, { useContext } from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserContext } from '~/Context/User';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const Container = styled.SafeAreaView`
    flex:1;
    align-items : flex-end;
    justify-content:flex-end;
    margin-bottom:20px;
    margin-right:20px;
`

const StyleButton = styled.TouchableOpacity`
    padding:10px 20px;
    border-radius:20px;

`

const StyleText = styled.Text`
    color:#fff;
    font-size:20px;
`

type NavigationProp = StackNavigationProp<LoginNaviParamList, 'Login'>;

interface Props {
    navigation: NavigationProp;
}

const Login = ({ navigation }: Props) => {
    const { login } = useContext<IUserContext>(UserContext);

    const clickbutton = () => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: '앗 이런! 😢',
            text2: '⛑ 공사중 ⛏',
            visibilityTime: 1000,
            autoHide: true,
            topOffset: 100,
        });
    }
    return (
        <ImageBackground source={require("~/res/images/intro.jpg")} style={{ width: '100%', height: '100%' }}>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <View style={{ flex: 1, alignItems: 'center', marginTop: 160 }}>
                <Text style={{ color: '#fff', fontSize: 70, fontFamily: 'Roboto', fontWeight: 'bold' }}>MANGO</Text>
                <Text style={{ color: '#fff', fontSize: 84, fontFamily: 'Roboto', fontWeight: 'bold', marginTop: -40, marginLeft: -2 }}>PLATE</Text>
                <TouchableOpacity onPress={clickbutton}><Image source={require("~/res/images/1.png")} style={{ width: 300, height: 50, resizeMode: 'contain' }} /></TouchableOpacity>
                <TouchableOpacity onPress={clickbutton}><Image source={require("~/res/images/2.png")} style={{ width: 300, height: 50, resizeMode: 'contain', marginTop: 10 }} /></TouchableOpacity>
                <TouchableOpacity onPress={clickbutton}><Image source={require("~/res/images/3.png")} style={{ width: 300, height: 50, resizeMode: 'contain', marginTop: 10 }} /></TouchableOpacity>
                <Text style={{ color: '#fff', marginTop: 10, fontSize: 20, fontFamily: 'serif', fontStyle: 'italic' }}>─  or  ─</Text>
                <TouchableOpacity onPress={()=>clickbutton()}><Image source={require("~/res/images/4.png")} style={{ width: 300, height: 50, resizeMode: 'contain', marginTop: 10 }} /></TouchableOpacity>
            </View>
            <Container>
                <StyleButton onPress={() => login(false)}><StyleText>건너뛰기</StyleText></StyleButton>
            </Container>
        </ImageBackground>
    );
};

export default Login;