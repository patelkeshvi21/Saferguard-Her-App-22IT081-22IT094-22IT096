import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

export default function SOSScreen({ navigation }) {
  useEffect(() => {
    // Show success notification when SOS screen is mounted
    const timer = setTimeout(() => {
      Toast.show({
        type: "success",
        text1: "SOS sent!",
        text2:
          "SOS has been sent to your friends with emergency help and location.",
        position: "bottom",
        visibilityTime: 4000, // 4 seconds
      });
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleSOSPress = () => {
    // Logic to send SOS notification and location
    // You can use any library for showing notifications
    // For example, react-native-toastify
    // Example code: Toast.show("SOS has been sent to your friends", { type: "success" });
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
          <TouchableOpacity onPress={handleSOSPress}>
            <MaterialCommunityIcons name="alert" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MaterialCommunityIcons name="account" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Add SOS screen content below */}
      <View style={styles.content}>
        <Text style={styles.heading}>SOS Screen</Text>
        <Text style={styles.description}>
          Press the button to send an SOS notification to your friends.
        </Text>
        {/* Add more UI elements as needed */}
      </View>
      <Toast style={{ zIndex: 1 }} />
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
  iconContainer: {
    flexDirection: "row",
    gap: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#554288",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#554288",
  },
});
