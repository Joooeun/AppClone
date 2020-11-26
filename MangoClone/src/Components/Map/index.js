import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.4020573;
const LONGITUDE = 127.1073746;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

const MapContent = () => {
  const mapRef = useRef();

  const [coord, setCoord] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  })

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        setCoord({
          ...coord,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        //mapRef.current.animateToRegion(coord, 1000);
        console.log(coord)
      },
      error => {
        console.log(error)
      }
    )
  }
  useEffect(() => {
    setTimeout(() => {
      getPosition()
    }, 10000);

  }, [coord])

  const centerMap = () => {
    mapRef.current.animateToRegion(coord, 500);
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={coord}
        showsUserLocation={true} 
        //onRegionChangeComplete={}
        >
        <Marker
          coordinate={{
            latitude: coord.latitude + 0.001,
            longitude: coord.longitude + 0.001,
          }}
        />
      </MapView>
      <TouchableOpacity
        onPress={() => centerMap()}
        style={[styles.bubble, styles.button]}
      >
        <Text> 반경내 좌표 뿌리기 </Text>
      </TouchableOpacity>
    </View>

  )
};
export default MapContent;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,1)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 30,
    marginRight: 30
  },
  buttonContainer: {
    flexDirection: 'column',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});