import React, { useEffect, useRef, useState } from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
let LATITUDE = 37.4020573;
let LONGITUDE = 127.1073746;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const getPosition = () => {
  return new Promise((resolve, reject) => {

    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        LATITUDE = latitude;
        LONGITUDE = longitude;
        console.log('좌표설정');
        resolve()
      },
      error => {
        console.log(error);
        reject()
      }
    )
  })
};

getPosition();
const MapContent = ({ markers, getMarkers, dist, toDetail,kind }) => {

  useEffect(() => {
    getPosition().then(() => {
      getMarkers(LATITUDE, LONGITUDE, dist)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    if (markers.length > 0) {
      mapRef.current.animateToRegion({
        latitude: Number(markers[0].latitude),
        longitude: Number(markers[0].longitude),
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }, 300)
      clickMarker(0)
      setBottomview('list')
    } else {
      setBottomview('search')
    }

  }, [markers])

  useEffect(() => {
    searchStoreMyPosition()
  }, [dist])

  const searchStoreMyPosition = () => {
    getPosition().then(() => {
      setCoord({
        ...coord,
        searchcoord: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
        circlecoord: {
          latitude: LATITUDE,
          longitude: LONGITUDE,
        },
        serachradius: dist
      })
      getMarkers(LATITUDE, LONGITUDE, dist)
      setBottomview('list')
    }).catch((error) => {
      console.log(error)
    })
  }

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
    circlecoord: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
    },
    serachradius: dist,
    focusIndex: 0,
    searchKind : kind,
    serachSort : 'rating'
  })

  const centerMap = () => {
    mapRef.current.animateToRegion(coord.currentcoord, 500);
    setBottomview('list')
  }

  const searchStore = () => {
    getMarkers(coord.searchcoord.latitude, coord.searchcoord.longitude, coord.serachradius)
    setCoord({
      ...coord,
      circlecoord: {
        latitude: coord.searchcoord.latitude,
        longitude: coord.searchcoord.longitude,
      }
    })
  }

  const setSearchcoord = (region) => {
    setCoord({
      ...coord,
      searchcoord: {
        latitude: region.latitude,
        longitude: region.longitude,
      }
    })
    setBottomview(bottomview == !'list' ? 'search' : bottomview)
  }

  const scrollto = (event) => {
    const currentPage = Math.floor(event.nativeEvent.contentOffset.x / (width - 90));

    mapRef.current.animateToRegion({
      latitude: Number(markers[currentPage].latitude),
      longitude: Number(markers[currentPage].longitude),
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }, 300)

    setCoord({
      ...coord,
      focusIndex: currentPage
    })

  }

  const clickMarker = (index) => {
    setBottomview('list')
    scrollRef.current.getScrollResponder().scrollResponderScrollTo({ x: (width - 80) * index, y: 0, animated: true });
    setCoord({
      ...coord,
      focusIndex: index
    })
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={coord.currentcoord}
        showsUserLocation={true}
        onPanDrag={() => setBottomview('')}
        onRegionChangeComplete={setSearchcoord.bind(this)}
      >
        {markers.length > 0 && markers.map((marker, index) =>
          <Marker
            key={index}
            style={{ opacity: index === coord.focusIndex ? 1 : 0.5 }}
            coordinate={{ latitude: Number(marker.latitude), longitude: Number(marker.longitude) }}
            //image={index === coord.focusIndex ? markerImg2 :markerImg2}
            onPress={() => clickMarker(index)}
          />
        )}
        {
          bottomview === 'list' &&
          <Circle
            center={coord.circlecoord}
            radius={coord.serachradius}
            fillColor="rgba(255, 162, 0, 0.07)"
            strokeColor="rgba(255, 162, 0,1)"
            zIndex={2}
            strokeWidth={1}
          />
        }
      </MapView>
      <ScrollView
        ref={scrollRef}
        style={[styles.storeview, { opacity: bottomview === 'list' ? 1 : 0 }]}
        horizontal={true}
        pagingEnabled={true}
        onMomentumScrollEnd={scrollto}

      >
        {markers.map((marker, index) =>
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => toDetail(marker)}
          >
            <Animated.View style={styles.storecard}>

              <Image
                source={{ uri: marker.picture }}
                style={{ height: '100%', aspectRatio: 1, resizeMode: 'cover' }}
              />
              <View style={{ padding: 10, flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 18, width:160 }} >{index + 1}. {marker.name}</Text>
                  <Text style={{ color: '#ff8800', fontSize: 23, marginTop: -5 }}>{marker.rating}</Text>
                </View>
                <Text style={{ color: '#6d6d6d', marginTop:10 }}>{marker.address}</Text>
                <Text style={{ color: '#969696', fontSize:11 }}>{marker.distance}m</Text>
              </View>
            </Animated.View>
          </TouchableOpacity>

        )}

      </ScrollView>
      <View
        style={[styles.bubble, styles.button, { opacity: bottomview === 'search' ? 1 : 0 }]}
      >
        {
          markers.length > 0 ?
            <Text style={styles.text} onPress={() => searchStore()}> 이 지역 검색하기 </Text>
            :
            <Text style={styles.text} onPress={() => searchStoreMyPosition()}> 내 위치에서 검색하기 </Text>
        }
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