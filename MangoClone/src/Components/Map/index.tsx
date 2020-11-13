import React, { Props, useEffect } from "react";
import { View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

const MapContent = ({ coord }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: coord.lattitude,
          longitude: coord.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} />
    </View>

  )
};
export default MapContent;