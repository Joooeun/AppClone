import React, { useContext, useEffect, useRef, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { UserContext } from '~/Context/User';
import styled from 'styled-components/native';
import MapContent from '~/Components/Map';
import ListContent from '~/Components/StoreList';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import DropDownPicker from 'react-native-dropdown-picker';
const { width, height } = Dimensions.get('window');
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
    const dist = [200, 300, 500]
    const [distnum, setDistnum] = useState(0)

    const [kind, setKind] = useState('')
    const [sort, setSort] = useState('distance');

    useEffect(() => {
        if (condition.myfield > 0) {

            getMarkers(condition.lat, condition.lot, condition.myfield)
        }
    }, [kind, sort])


    const [condition, setCondition] = useState({
        lat: '',
        lot: '',
        myfield: 0,
        rangearray: '',
        kind: ''
    })

    const [menu, setMenu] = useState('Map')
    const [markers, setMarkers] = useState([
        {
            "name": "논현장어",
            "id": 851,
            "address": "서울시 강남구 논현동 121",
            "distance": 238,
            "longitude": "127.02243256",
            "rating": 4.4,
            "latitude": "37.51125098",
            "picture": "https://mp-seoul-image-production-s3.mangoplate.com/66234_1508340946882418.jpg"
        },
        {
            "name": "논현장어",
            "id": 851,
            "address": "서울시 강남구 논현동 121",
            "distance": 238,
            "longitude": "127.02143256",
            "rating": 4.4,
            "latitude": "37.51145098",
            "picture": "https://mp-seoul-image-production-s3.mangoplate.com/66234_1508340946882418.jpg"
        }
    ])

    const getMarkers = async (lat: string, lot: string, myfield: number) => {

        try {
            let response = await fetch(
                `http://192.168.0.250:8080/api/mango/foodlist?lat=${lat}&lot=${lot}&myfield=${myfield}&rangearray=${sort}&kind=${kind}`
            );
            let json = await response.json();
            setMarkers(json)
            console.log(`서버 호출 : lat(${lat}) | lot(${lot}) | myfield(${myfield}) | count(${json.length})`)
        } catch (error) {
            console.log(error);
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: '식당을 찾을 수 없습니다.',
                text2: '다시 검색해 주세요',
                visibilityTime: 1000,
                autoHide: true,
                bottomOffset: 120,
            });
            //setMarkers([])
        }

        setCondition({
            lat: lat,
            lot: lot,
            myfield: myfield,
            rangearray: sort,
            kind: kind
        })
    };

    const toDetail = (data: any) => {
        console.log('상세')
        navigation.navigate("MangoDetail", data)
    }

    const toFileter = () => {

        console.log('필터')
        navigation.navigate("Filter", {
            kind: kind,
            setKind: setKind
        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 0.7, borderBottomColor: '#999999' }}>
                <View>
                    <Text>지금 보고 있는 지역은</Text>
                    <Text style={{ fontSize: 25 }} onPress={() => logout()}>방배/반포/잠원</Text>
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
            <DropDownPicker
                items={[
                    { label: '거리순', value: 'distance' },
                    { label: '평점순', value: 'rating' },
                ]}
                defaultValue='distance'
                containerStyle={{ height: 35, marginTop:5, marginLeft:20 }}
                style={{
                    backgroundColor: '#fff', width: 80, justifyContent: 'center',
                    zIndex:99,
                }}
                itemStyle={{
                    width: 80,
                    justifyContent: 'flex-start',
                    height: 30,
                    zIndex:99
                }}
                dropDownStyle={{ backgroundColor: '#fff',
                width: 80, }}
                onChangeItem={item => setSort(item.value)}
            />
            <View style={{
                paddingVertical: 5, paddingHorizontal: 20, flexDirection: 'row', borderBottomWidth: 0.7, borderBottomColor: '#999999', marginTop: -40
            }}>

                {/* <Text style={{ textDecorationLine: "underline", color: '#505050', alignSelf: 'center' }} onPress={() => console.log()}>평점순 ▽</Text> */}


                <View style={{ flex: 1 }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <StyleButton
                        style={{ backgroundColor: '#e2e2e2', marginRight: 5 }}
                        onPress={() => setDistnum((distnum + 1) % dist.length)}
                    >
                        <StyleText style={{ color: '#ff9900' }}>{dist[distnum]}m</StyleText>
                    </StyleButton>
                    <StyleButton style={{ borderColor: kind === '' ? '#c2c2c2' : '#ff9900', borderWidth: 1.5 }} onPress={() => toFileter()}>
                        <StyleText style={{ color: kind === '' ? '#c2c2c2' : '#ff9900' }}>필터 : {kind === '' ? '전체' : kind}</StyleText>
                    </StyleButton>
                </View>

            </View>

            {
                menu === 'Map' ?

                    <MapContent markers={markers} getMarkers={getMarkers} dist={dist[distnum]} toDetail={toDetail} kind={kind} />
                    :
                    <ListContent markers={markers} toDetail={toDetail} />
            }

            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    );
};

export default index;

const styles = StyleSheet.create({
    storeview: {
        width: width - 80,
        aspectRatio: 2.5,
        alignSelf: 'center',
        position: 'absolute',
        flexDirection: 'row',
        marginLeft: 45,
        overflow: 'visible',
    },
    storecard: {
        width: width - 90,
        aspectRatio: 3,
        backgroundColor: '#fff',
        marginRight: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#b4b4b4',
        flexDirection: 'row'
    },
    bubble: {
        backgroundColor: 'rgba(237, 135, 19, 0.8)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
    button: {
        bottom: 30,
        alignSelf: 'center',
        position: 'absolute'
    },
    text: {
        color: '#fff'
    },
    buttonContainer: {
        flexDirection: 'column',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});