import React, { useContext, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Button, SafeAreaView, Text, TextBase, View } from 'react-native';
import { UserContext } from '~/Context/User';
import styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import MapContent from '~/Components/Map';

type NavigationProp = StackNavigationProp<MangoNaviParamList, 'MangoHome'>;

interface Props {
    navigation: NavigationProp;
}

const StyleButton = styled.TouchableOpacity`
    padding:5px 10px;
    border-radius:20px;
    align-items:center;
    margin : auto;
`

const StyleText = styled.Text`
    color:#fff;
    font-size:15px;
`

const index = ({ navigation }: Props) => {
    const { logout } = useContext<IUserContext>(UserContext);
    const [coord, setCoord] = useState({})

    Geolocation.getCurrentPosition(
        position => {
            setCoord(position.coords);
        },
        error => {
            console.log(error)
        }
    )

    return (
        //<Text>ee</Text>
        //<MapContent coord = {coord} />
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 10, borderBottomWidth: 0.7, borderBottomColor: '#999999' }}>
                <Text>지금 보고 있는 지역은</Text>
                <Text style={{ fontSize: 25 }}>방배/반포/잠원</Text>
            </View>
            <View style={{ padding: 10 , flexDirection:'row'}}>
                <Text style={{ textDecorationLine: "underline", color: '#505050' }}>평점순 ▽</Text>
                <View style={{flexDirection:'row', flex:1,alignItems:'flex-end'}}>
                    <StyleButton style={{ backgroundColor: 'rgba(0,0,0, 0.1)' }}><StyleText style={{ color: '#ff8800' }}>300m</StyleText></StyleButton>
                    <StyleButton style={{ borderColor: 'rgba(0,0,0, 0.4)', borderWidth: 1.5 }}><StyleText style={{ color: 'rgba(0,0,0, 0.6)' }}>필터</StyleText></StyleButton>
                </View>
            </View>
            <MapContent />
            {/* <StyleButton onPress={() => logout()} style={{ backgroundColor: 'rgba(0,0,0, 0.6)' }}><StyleText>로그아웃</StyleText></StyleButton> */}
        </SafeAreaView>
    );
};

export default index;