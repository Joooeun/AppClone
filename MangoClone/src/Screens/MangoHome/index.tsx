import React, { useContext, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { SafeAreaView, Text, View } from 'react-native';
import { UserContext } from '~/Context/User';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native-gesture-handler';
import MapContent from '~/Components/Map';
import Geolocation from 'react-native-geolocation-service';

type NavigationProp = StackNavigationProp<MangoNaviParamList, 'MangoHome'>;

interface Props {
    navigation: NavigationProp;
}

const StyleButton = styled.TouchableOpacity`
    background-color:rgba(0,0,0, 0.6);
    padding:10px;
    border-radius:20px;
    width: 100px;
    align-items:center;
    margin : auto;
    bottom:0px;
`

const StyleText = styled.Text`
    color:#fff;
    font-size:20px;
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
        <MapContent coord = {coord} />
        // <SafeAreaView>
        //     <MapContent />
        //     <StyleButton onPress={() => logout()}><StyleText>로그아웃</StyleText></StyleButton>
        // </SafeAreaView>
    );
};

export default index;