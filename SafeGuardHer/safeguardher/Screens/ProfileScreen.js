import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#554288" />
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>Nilay Shah</Text>
            <Text style={styles.label}>Mobile Number:</Text>
            <Text style={styles.value}>+91 9558353148</Text>
          </View>
        </View>
        <View style={styles.passwordSection}>
          <Text style={styles.sectionTitle}>Change Password</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter current password"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.historyButton}>
          <MaterialCommunityIcons name="history" size={24} color="#fff" />
          <Text style={styles.historyButtonText}>History</Text>
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
  navbar: {
    backgroundColor: "#554288",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pageTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  content: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#554288",
  },
  inputContainer: {
    marginBottom: 15,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#554288",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#554288",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  historyButtonText: {
    color: "#fff",
    marginLeft: 10,
    fontSize: 16,
  },
});
