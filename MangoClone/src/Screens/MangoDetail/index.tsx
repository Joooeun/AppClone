import React, { useContext, useEffect } from 'react';
import { Dimensions, Image, Linking, SafeAreaView, Text, View } from 'react-native';
import { UserContext } from '~/Context/User';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface Props {
    navigation: NavigationScreenProp<NavigationState>;
}


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MangoDetail = (route: any, { navigation }: Props) => {
    const { logout } = useContext<IUserContext>(UserContext);
    const { params } = route.route;

    return (
        <ScrollView        >
            <Image
                source={{ uri: params.picture }}
                style={{ width: '100%', height: 250, resizeMode: 'cover' }}
            />
            <View style={{ flexDirection: 'row', padding: 20, backgroundColor: '#fff' }}>
                <View>
                    <Text style={{ fontSize: 28 }}>{params.name}</Text>
                    <Text style={{ color: '#777' }}>👁 31,578   |   💭 16   |   💛 964</Text>
                    <Text style={{ color: '#777' }}> {params.dist}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <Text style={{ color: '#ff8800', fontSize: 40, justifyContent: 'flex-end' }}>{params.rating}</Text>
            </View>
            <View style={{ backgroundColor: '#fff', marginTop: 13 }} pointerEvents='none'>
                <Text style={{ color: '#666666', padding: 20, fontSize: 15 }}>{params.address}</Text>
                <MapView style={{ height: 200, }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: Number(params.latitude),
                        longitude: Number(params.longitude),
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: Number(params.latitude), longitude: Number(params.longitude) }}
                    />
                </MapView>
                <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image style={{ width: 30, aspectRatio: 1, resizeMode: 'contain' }} source={{ uri: 'https://cdn4.iconfinder.com/data/icons/essential-app-2/16/navigation-compass-north-map-256.png' }} />
                        <Text>길찾기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image style={{ width: 30, aspectRatio: 1, resizeMode: 'contain' }} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/outline-location-icon-set/64/Taxi_1-128.png' }} />
                        <Text>택시부르기</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image style={{ width: 30, aspectRatio: 1, resizeMode: 'contain' }} source={{ uri: 'https://cdn4.iconfinder.com/data/icons/sheet/32/expand-web5-12-256.png' }} />
                        <Text>주소복사</Text>
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ backgroundColor: '#fff', marginTop: 13, padding: 20 }}>
                <View style={{ borderWidth: 1, borderColor: '#aaa', alignItems: 'center' }}>
                    <Text style={{ color: '#777', padding: 10, fontSize: 20, marginLeft: -20 }} onPress={() => Linking.openURL(`tel:010-5785-9881`)}>📞 전화하기</Text>
                </View>

            </View>
            <View style={{ backgroundColor: '#fff', marginTop: 13, padding: 20, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: '#302f2f', fontSize: 18, paddingVertical: 3 }}>편의정보</Text>
                    <Text style={{ color: '#9c9c9c', fontSize: 15, paddingVertical: 3 }}>영업시간</Text>
                    <Text style={{ color: '#9c9c9c', fontSize: 15, paddingVertical: 3 }}>쉬는시간</Text>
                    <Text style={{ color: '#9c9c9c', fontSize: 15, paddingVertical: 3 }}>휴일</Text>
                    <Text style={{ color: '#9c9c9c', fontSize: 15, paddingVertical: 3 }}>가격정보</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ color: '#302f2f', fontSize: 18, paddingVertical: 3 }}></Text>
                    <Text style={{ color: '#9c9c9c', fontSize: 15, paddingVertical: 3 }}>10:00 - 03:00</Text>
                    <Text style={{ color: '#9c9c9c', fontSize: 15, paddingVertical: 3 }}>15:00 - 17:00</Text>
                    <Text style={{ color: '#9c9c9c', fontSize: 15, paddingVertical: 3 }}>일요일</Text>
                    <Text style={{ color: '#9c9c9c', fontSize: 15, paddingVertical: 3 }}>3만원 - 4만원</Text>
                </View>
            </View>
            <View style={{ backgroundColor: '#fff', marginTop: 13, padding: 20, flexDirection: 'row' }}>
                <Text style={{ color: '#777', fontSize: 18 }}>⚠ </Text>
                <Text style={{ color: '#777', fontSize: 15 }}>잘못된 정보를 알려주세요.</Text>
            </View>
        </ScrollView>
    );
};

export default MangoDetail;