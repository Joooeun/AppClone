import React, { useContext } from 'react';
import { Image, PermissionsAndroid, Platform, Text } from 'react-native';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserContext } from '~/Context/User';
import Toast from 'react-native-toast-message';

const Container = styled.SafeAreaView`
    flex:1;
    background-color:#fff;
    align-items:center;
`

const StyleButton = styled.TouchableOpacity`
    background-color: #ff8800;
    width:300px;
    padding:15px 20px;
    border-radius:30px;
    margin-top:50px;
    align-items:center;
`

const StyleText = styled.Text`
    color:#fff;
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
        console.log(err);
        checkgeo(false)
    }
};


const Permission = ({ navigation }: Props) => {
    const { checkgeo } = useContext<IUserContext>(UserContext);
    const toastmessage = () => {
        Toast.show({
            type: 'error',
            position: 'top',
            text1: '앗 이런!',
            text2: '싫어요는 싫어요 😢',
            visibilityTime: 1500,
            autoHide: true,
            topOffset: 80,
        })
    }
    return (
        <Container>
            <Toast ref={(ref) => Toast.setRef(ref)} />
            <Image source={require("~/res/images/5.png")} style={{ width: 300, height:150, resizeMode: 'contain' , marginTop:150}} />
            <Text style={{marginTop:30, fontSize:30, fontWeight:'bold', color:'#525252'}}>위치기반 서비스 약관동의</Text>
            <Text style={{color:'#8f8f8f', textDecorationLine:'underline', marginTop:10}}>이용약관 보기</Text>
            <Text style={{marginTop:50, color:'#707070',fontSize:20,}}>편리한 맛집 검색을 위해 위치정보 동의가</Text>
            <Text style={{ color:'#707070',fontSize:20,marginTop:10}}>필요합니다.</Text>
            <StyleButton onPress={() => { requestCameraPermission(checkgeo) }}><StyleText>동의하기</StyleText></StyleButton>
            <Text style={{ color:'#ff8800',fontSize:20,marginTop:30}} onPress={()=>toastmessage()}>싫어요</Text>
        </Container>
    );
};

export default Permission;