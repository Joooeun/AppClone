import React, { useState } from 'react';
import {  Image,  LogBox,  Text, View } from 'react-native';
import {  TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';


type NavigationProp = StackNavigationProp<MangoNaviParamList, 'Filter'>;

interface Props {
    navigation: NavigationProp;
}
const Filter = ({ route, navigation }: Props) => {
    //console.disableYellowBox = true;
    LogBox.ignoreAllLogs(true)

    const {kind, setKind} = route.params;
    const [k, sK] = useState(kind);
    const clickIcon = (str:string) => {
        console.log(str)
        sK(str)
    }

    return (
        <View style={{ flex: 1 }}>
            <View
                style={{ flex: 1 }}>
                <TouchableOpacity
                    style={{ width: '100%', height: '100%' }}
                    onPress={navigation.goBack}
                >

                </TouchableOpacity>
            </View>
            <View style={{ height: 50, backgroundColor: '#eeeeee', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row' }}>
                <Text style={{ flex: 1, fontSize: 18 }} onPress={navigation.goBack}>취소</Text>
                <Text style={{ fontSize: 18, color: '#ff8800' }} onPress={()=>{setKind(k), navigation.goBack()}}>필터 적용</Text>
            </View>
            <View style={{ height: 260, backgroundColor: '#fff', alignItems: 'center', padding: 20, }}>
                <Text style={{ fontSize: 25, marginTop: 10 }}>음식종류</Text>
                <View style={{ flexDirection: 'row', marginTop: 30 }}>
                    <View style={{ alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity
                            onPress={() => clickIcon('')}>
                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 100, borderWidth: 3, borderColor: k === '' ? '#ff9900' : '#c2c2c2' }}>
                                <Image source={require("~/res/images/a.png")} style={{ width: 45, height: 45, resizeMode: 'contain', tintColor: k === '' ? '#ff9900' : '#c2c2c2' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: k === '' ? '#ff9900' : '#c2c2c2' }}>전체</Text>
                    </View>
                    <View style={{ alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity
                            onPress={() => clickIcon('한식')}>
                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 100, borderWidth: 3, borderColor: k === '한식' ? '#ff9900' : '#c2c2c2' }}>
                                <Image source={require("~/res/images/k.png")} style={{ width: 45, height: 45, resizeMode: 'contain', tintColor: k === '한식' ? '#ff9900' : '#c2c2c2' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: k === '한식' ? '#ff9900' : '#c2c2c2' }}>한식</Text>
                    </View>
                    <View style={{ alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity
                            onPress={() => clickIcon('일식')}>
                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 100, borderWidth: 3, borderColor: k === '일식' ? '#ff9900' : '#c2c2c2' }}>
                                <Image source={require("~/res/images/j.png")} style={{ width: 45, height: 45, resizeMode: 'contain', tintColor: k === '일식' ? '#ff9900' : '#c2c2c2' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: k === '일식' ? '#ff9900' : '#c2c2c2' }}>일식</Text>
                    </View>
                    <View style={{ alignItems: 'center', padding: 5 }}>
                        <TouchableOpacity
                            onPress={() => clickIcon('중식')}>
                            <View style={{ alignItems: 'center', padding: 10, borderRadius: 100, borderWidth: 3, borderColor: k === '중식' ? '#ff9900' : '#c2c2c2' }}>
                                <Image source={require("~/res/images/c.png")} style={{ width: 45, height: 45, resizeMode: 'contain', tintColor: k === '중식' ? '#ff9900' : '#c2c2c2' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 20, color: k === '중식' ? '#ff9900' : '#c2c2c2' }}>중식</Text>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default Filter;