import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function FakeCallScreen({ navigation }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => clearInterval(timer);
  }, [timer]);

  const handleStartCall = () => {
    if (!name || !number) {
      Alert.alert("Please enter name and number");
      return;
    }
    const callTimer = setTimeout(() => {
      Alert.alert("Incoming Call", `${name} is calling...`, [
        {
          text: "Accept",
          onPress: () => {
            // Your logic for accepting call
            console.log("Call accepted");
          },
        },
        {
          text: "Decline",
          onPress: () => {
            // Your logic for declining call
            console.log("Call declined");
          },
        },
      ]);
    }, 5000); // 5 seconds timeout, change as needed
    setTimer(callTimer);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#554288" />
      <View style={styles.topBar}>
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
      <View style={styles.content}>
        <Text style={styles.heading}>Fake Call Setup</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Number"
            value={number}
            onChangeText={(text) => setNumber(text)}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity style={styles.callButton} onPress={handleStartCall}>
          <Text style={styles.callButtonText}>Start Fake Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdd9e4",
  },
  topBar: {
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
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  callButton: {
    backgroundColor: "#554288",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  callButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
