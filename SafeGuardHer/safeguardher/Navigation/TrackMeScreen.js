import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Location from "expo-location";

export default function TrackMeScreen({ navigation }) {
  const [mapRegion, setMapRegion] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    userLocation();
  }, []);

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01, // Adjusted for increased zoom
        longitudeDelta: 0.01, // Adjusted for increased zoom
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#554288" />
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icon-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>SafeGuard Her</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <MaterialCommunityIcons name="bell" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MaterialCommunityIcons name="account" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <MapView
        style={styles.map}
        region={mapRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Selected Location"
            pinColor="red"
          />
        )}
      </MapView>
      <View style={styles.bottomContainer}>
        <Text style={styles.trackText}>Track me</Text>
        <Text style={styles.descriptionText}>
          Share live location with your friends
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddContacts")}
        >
          <Text style={styles.addButtonText}>Add Friends</Text>
        </TouchableOpacity>
        <Text style={styles.friendDescription}>
          Add a friend to use SOS and Track me.
        </Text>
      </View>
      <TouchableOpacity style={styles.trackButton} onPress={userLocation}>
        <Text style={styles.trackButtonText}>Track Me</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdd9e4",
  },
  navbar: {
    backgroundColor: "#554288",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  appName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    tintColor: "#fff",
  },
  map: {
    flex: 1,
  },
  trackButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "#554288",
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  trackButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  trackText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#554288",
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 14,
    color: "#554288",
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: "#554288",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  friendDescription: {
    fontSize: 12,
    color: "#888",
    marginTop: 10,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 15,
  },
});
