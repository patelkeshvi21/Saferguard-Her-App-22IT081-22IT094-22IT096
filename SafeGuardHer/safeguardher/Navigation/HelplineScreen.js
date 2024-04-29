import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function HelplineScreen({ navigation }) {
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
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.heading}>Helpline Numbers</Text>
          <Text style={styles.helplineText}>
            Women Helpline: 1091 {"\n"}
            Domestic Abuse Helpline: 181 {"\n"}
            Police Emergency: 100 {"\n"}
            National Commission for Women: 011-26942369 {"\n"}
            Child Helpline: 1098
          </Text>
          <Text style={styles.developmentMessage}>
            This app is still in development. {"\n"}
            UI improvements are pending.
          </Text>
        </View>
      </ScrollView>
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
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  developmentMessage: {
    fontSize: 16,
    color: "#554288",
    marginTop: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#554288",
  },
  helplineText: {
    fontSize: 16,
    color: "#554288",
    textAlign: "center",
  },
});
