import React from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const index = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Store />
    </View>
  );
};

const Store = () => {
  return (
    <View style={{ width: Dimensions.get('window').width / 2, padding: 15 }}>
      <TouchableOpacity>
        <Image
          source={{ uri: 'https://i.pinimg.com/originals/5f/ff/a1/5fffa187f3a66dc3dc09833517e63064.jpg' }}
          style={{ width: '100%', aspectRatio: 1, resizeMode: 'cover' }}
        />
        <View style={{ flexDirection: 'row' }}>
          <View>
            <Text style={{ fontSize: 20 }}>1. 논현장어</Text>
            <Text style={{ color: '#777' }}>논현동 240m</Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <Text style={{ color: '#ff8800', fontSize: 25, justifyContent: 'flex-end' }}>4.4</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default index;
