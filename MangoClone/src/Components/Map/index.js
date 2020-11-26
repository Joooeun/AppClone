import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { TouchableOpacity } from "react-native-gesture-handler";
import markerImg from '~/res/images/marker.png';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE = 37.4020573;
let LONGITUDE = 127.1073746;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

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
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
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
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={coord.currentcoord}
        showsUserLocation={true}
      >
        {markers.map((marker, index) =>
          <Marker
            key={index}
            coordinate={marker}
            image={markerImg}
          />
        )}

        <Circle
          center={coord.searchcoord}
          radius={coord.serachradius}
          fillColor="rgba(255, 162, 0, 0.07)"
          strokeColor="rgba(255, 162, 0,1)"
          zIndex={2}
          strokeWidth={1}
        />
      </MapView>

      <View
        style={[styles.bubble, styles.button]}
      >
        <Text style={styles.text} onPress={() => centerMap()}> 이 지역 검색하기 </Text>
      </View>
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