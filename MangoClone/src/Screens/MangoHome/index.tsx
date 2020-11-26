import React, { useContext, useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserContext } from '~/Context/User';
import styled from 'styled-components/native';
import MapContent from '~/Components/Map';
import { View } from 'react-native';

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

    return (
        <MapContent />
        // <SafeAreaView>
        //     <MapContent />
        //     <StyleButton onPress={() => logout()}><StyleText>로그아웃</StyleText></StyleButton>
        // </SafeAreaView>
    );
};

export default index;