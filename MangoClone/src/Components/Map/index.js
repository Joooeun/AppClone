import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import markerImg from '~/res/images/marker.png';
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE = 37.4020573;
let LONGITUDE = 127.1073746;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const getPosition = () => {
  Geolocation.getCurrentPosition(
    position => {
      LATITUDE = position.coords.latitude
      LONGITUDE = position.coords.longitude
    },
    error => {
      console.log(error)
    }
  )
}
getPosition();

const MapContent = () => {
  //getPosition();

  const mapRef = useRef();
  const scrollRef = useRef();

  const [bottomview, setBottomview] = useState('list')

  const [coord, setCoord] = useState({
    currentcoord: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    searchcoord: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    serachradius: 300
  })

  const [markers, setMarkers] = useState([
    {
      latitude: coord.currentcoord.latitude + 0.001,
      longitude: coord.currentcoord.longitude + 0.001,
    },
    {
      latitude: coord.currentcoord.latitude + 0.002,
      longitude: coord.currentcoord.longitude + 0.0005,
    },
    {
      latitude: coord.currentcoord.latitude,
      longitude: coord.currentcoord.longitude,
    },
  ])

  const centerMap = () => {
    mapRef.current.animateToRegion(coord.currentcoord, 500);
    setBottomview('list')
  }

  const searchStore = () => {
    setBottomview('list')

  }

  const setSearchcoord = (region) => {
    setCoord({
      ...coord,
      searchcoord: {
        latitude: region.latitude,
        longitude: region.longitude,
      }
    })
    setBottomview('search')
  }


  const test = (event) => {
    const currentPage =  Math.floor(event.nativeEvent.contentOffset.x / (width-85));
    console.log(markers[currentPage])

    mapRef.current.animateToRegion({
      latitude: markers[currentPage].latitude,
      longitude: markers[currentPage].longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    300)
    

  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={coord.currentcoord}
        showsUserLocation={true}
        onRegionChange={() => setBottomview('')}
        onRegionChangeComplete={setSearchcoord.bind(this)}
      >
        {markers.map((marker, index) =>
          <Marker
            key={index}
            coordinate={marker}
            image={markerImg}
          />
        )}

        <Circle
          center={coord.currentcoord}
          radius={coord.serachradius}
          fillColor="rgba(255, 162, 0, 0.07)"
          strokeColor="rgba(255, 162, 0,1)"
          zIndex={2}
          strokeWidth={1}
        />
      </MapView>

      {
        bottomview === 'list' ?
          <ScrollView
            ref={scrollRef}
            style={styles.storeview}
            horizontal={true}
            pagingEnabled={true}
            onMomentumScrollEnd={test}
          >
            {markers.map((marker, index) =>
              <Animated.View key={index} style={styles.storecard}>
                <Text>{index}</Text>
              </Animated.View>

            )}

          </ScrollView>
          : bottomview === 'search' &&
          <View
            style={[styles.bubble, styles.button]}
          >
            <Text style={styles.text} onPress={() => searchStore()}> 이 지역 검색하기 </Text>
          </View>
      }



    </View>

  )
};
export default MapContent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  map: {
    flex: 1,
  },
  storeview: {
    width: width - 80,
    aspectRatio: 2.5,
    alignSelf: 'center',
    position: 'absolute',
    flexDirection: 'row',
    marginLeft: 40,
    overflow: 'visible',
  },
  storecard: {
    width: width - 80,
    aspectRatio: 3,
    backgroundColor: '#fff',
    marginRight: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#b4b4b4',
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