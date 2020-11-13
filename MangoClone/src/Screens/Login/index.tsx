import React, { useContext } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserContext } from '~/Context/User';

const Container = styled.SafeAreaView`
    flex:1;
    align-items : flex-end;
    justify-content:flex-end;
    margin-bottom:20px;
    margin-right:20px;
`

const StyleButton = styled.TouchableOpacity`
    background-color:rgba(0,0,0, 0.6);
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

    return (
        <ImageBackground source={require("~/res/images/intro.jpg")} style={{ width: '100%', height: '100%', opacity: 0.8 }}>
            <Container>
                <StyleButton onPress={() => login(false)}><StyleText>건너뛰기</StyleText></StyleButton>
            </Container>
        </ImageBackground>
    );
};

export default Login;