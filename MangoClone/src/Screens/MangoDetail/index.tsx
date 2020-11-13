import React, { useContext } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import { UserContext } from '~/Context/User';

type NavigationProp = StackNavigationProp<MangoNaviParamList, 'MangoDetail'>;
interface Props {
    navigation:NavigationProp;
}

const MangoDetail = ({navigation}:Props) => {
    const {logout} = useContext<IUserContext>(UserContext);
    return (
        <View>
            <Text>홈페이지</Text>
            <Text onPress={()=>logout()}>로그아웃</Text>
        </View>
    );
};

export default MangoDetail;