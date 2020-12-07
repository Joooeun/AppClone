import React from 'react';
import { Alert, Dimensions, Image, Text, View } from 'react-native';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const index = ({ markers, toDetail }) => {

  if (markers.length > 0) {
    return (
      <FlatList
        data={markers}
        renderItem={({ item, index }) => {
          return (
            <View style={{ width: (Dimensions.get('window').width / 2) - 5, paddingTop: 10, paddingLeft: 10, paddingBottom: 10 }}>
              <TouchableOpacity
                onPress={()=>toDetail(item)}
              >
                <Image
                  source={{ uri: item.picture }}
                  style={{ width: '100%', aspectRatio: 1, resizeMode: 'cover' }}
                />
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Text style={{ fontSize: 17 }}>{index + 1}. {item.name}</Text>
                    <Text style={{ color: '#777', maxWidth:150 }}>{item.address} / {item.distance}m</Text>
                  </View>
                  <View style={{ flex: 1 }}></View>
                  <Text style={{ color: '#ff8800', fontSize: 25, justifyContent: 'flex-end' }}>{item.rating}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }}
        keyExtractor={(item, index, toDetail) => item.id}
        numColumns={2}
      />
    );
  } else {
    return (
      <Text style={{ fontSize: 25, alignSelf: 'center', marginTop: 30, color: '#8f8f8f' }}>식당을 찾을 수 없습니다.</Text>
    )
  }


};

export default index;
