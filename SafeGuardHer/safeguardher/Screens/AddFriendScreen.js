import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AddFriendScreen() {
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
        <TouchableOpacity style={styles.contactIcon}>
          <MaterialCommunityIcons name="account-plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#aaa"
          />
          <MaterialCommunityIcons name="magnify" size={24} color="#aaa" />
        </View>
        <ScrollView style={styles.contactsContainer}>
          {[
            "Angelina Jolie",
            "Emma Watson",
            "Jennifer Aniston",
            "Beyoncé",
            "Taylor Swift",
            "Selena Gomez",
            "Katy Perry",
            "Rihanna",
            "Scarlett Johansson",
            "Blake Lively",
          ].map((name, index) => (
            <TouchableOpacity key={index} style={styles.contactItem}>
              <MaterialCommunityIcons
                name="account-circle"
                size={50}
                color="#554288"
              />
              <Text style={styles.contactName}>{name}</Text>
              <View style={styles.iconsContainer}>
                {index % 3 === 0 ? (
                  <MaterialCommunityIcons
                    name="account-check"
                    size={24}
                    color="#4CAF50"
                  />
                ) : (
                  <TouchableOpacity style={styles.icon}>
                    <MaterialCommunityIcons
                      name="account-plus"
                      size={24}
                      color="#554288"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
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
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  appName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },
  logo: {
    width: 40,
    height: 40,
    tintColor: "#fff",
  },
  contactIcon: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },
  contactsContainer: {
    flex: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  contactName: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
});
