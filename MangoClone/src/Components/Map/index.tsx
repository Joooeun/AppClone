import React, { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import MapView from 'react-native-maps';
import { SafeAreaView } from "react-native-safe-area-context";

const latitudeDelta = 0.025
const longitudeDelta = 0.025

const MapContainer = () => {

  const [mapstate, useMapState] = useState(
    {
      region: {
        latitudeDelta,
        longitudeDelta,
        latitude: 37.51147145500193,
        longitude: 127.0217667706
      },
      marker_float: '50%'
    }
  );

  const { region, marker_float } = mapstate;

  const onRegionChangeComplete = (region: any) => {
    useMapState({
      region,
      marker_float: '50%'
    })
  }

  const markerfloat = () => {
    useMapState({
      ...mapstate,
      marker_float: '49%'
    })
  }

  return (
    <>
      <View style={styles.map}>
        <MapView
          style={styles.map}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete.bind(this)}
          onRegionChange={markerfloat}
        />
        <View style={[styles.markerFixed, { top: marker_float }]}>
          <Image style={styles.marker} source={require("~/res/images/marker.png")} />
        </View>
        <SafeAreaView style={styles.footer}>
          <Text style={styles.region}>{JSON.stringify(region, null, 2)}</Text>
        </SafeAreaView>
      </View>
    </>
  )
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute'
  },
  marker: {
    resizeMode: 'contain',
    height: 48,
    width: 48
  },
  footer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    bottom: 0,
    position: 'absolute',
    width: '100%'
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20
  }
})


export default MapContainer;