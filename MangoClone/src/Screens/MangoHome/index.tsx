import React, { useContext, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Image, SafeAreaView, Text, View } from 'react-native';
import { UserContext } from '~/Context/User';
import styled from 'styled-components/native';
import MapContent from '~/Components/Map';
import ListContent from '~/Components/StoreList';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';


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

    const [menu, setMenu] = useState('Map')

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.7, borderBottomColor: '#999999' }}>
                <View>
                    <Text>지금 보고 있는 지역은</Text>
                    <Text style={{ fontSize: 25 }}>방배/반포/잠원</Text>
                </View>
                <View style={{ flex: 1, borderColor: '#a1a1a1', borderRightWidth: 0.7 }}></View>
                <TouchableOpacity
                    style={{ paddingVertical: 7 }}
                    onPress={() => setMenu(menu === 'Map' ? 'List' : 'Map')}
                >
                    <Image
                        source={{
                            uri: (menu === 'Map' ? 'https://simpleicon.com/wp-content/uploads/list.png' : 'https://simpleicon.com/wp-content/uploads/map-5.png')
                        }}
                        style={{ width: 30, height: 35, opacity: 0.5, resizeMode: 'stretch', marginLeft: 20, marginRight: 10 }}
                    />
                </TouchableOpacity>
            </View>
            <View style={{ paddingVertical: 5, paddingHorizontal: 20, flexDirection: 'row', borderBottomWidth: 0.7, borderBottomColor: '#999999'  }}>
                <Text style={{ textDecorationLine: "underline", color: '#505050', alignSelf: 'center' }}>평점순 ▽</Text>
                <View style={{ flex: 1 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <StyleButton style={{ backgroundColor: 'rgba(0,0,0, 0.1)', marginRight: 5 }}><StyleText style={{ color: '#ff8800' }}>300m</StyleText></StyleButton>
                    <StyleButton style={{ borderColor: 'rgba(0,0,0, 0.4)', borderWidth: 1.5 }}><StyleText style={{ color: 'rgba(0,0,0, 0.6)' }}>필터</StyleText></StyleButton>
                </View>
            </View>
            {
                menu === 'Map' ? <MapContent /> : <ListContent />
            }

            {/* <StyleButton onPress={() => logout()} style={{ backgroundColor: 'rgba(0,0,0, 0.6)' }}><StyleText>로그아웃</StyleText></StyleButton> */}
        </SafeAreaView>
    );
};

export default index;