import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import tw from "twrnc";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function CompleteProfileScreen({ navigation }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    // Retrieve mobile number from AsyncStorage
    AsyncStorage.getItem("mobileNumber").then((mobile) => {
      if (mobile) {
        setMobileNumber(mobile);
      }
    });
  }, []);

  useEffect(() => {
    console.log("Image URI:", imageUri);
  }, [imageUri]);

  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("ImagePicker result:", result);

      if (!result.cancelled && result.assets.length > 0) {
        const selectedImage = result.assets[0];
        console.log("Selected image URI:", selectedImage.uri);
        setImageUri(selectedImage.uri);
      } else {
        console.log("Image selection cancelled.");
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!name || !gender || !mobileNumber) {
        Alert.alert(
          "Incomplete Data",
          "Please fill all fields and upload a photo."
        );
        return;
      }

      // Send profile data along with the image URL and mobile number to the backend
      const response = await axios.post(
        "http://172.20.10.3:8080/auth/complete-profile",
        {
          mobileNumber: mobileNumber,
          name: name,
          gender: gender,
        }
      );

      Alert.alert("Success", "Profile completed successfully.");
      navigation.navigate("TrackMeTab");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <View style={[tw`flex-1 bg-white`, { backgroundColor: "#fdd9e4" }]}>
      <View style={[tw`flex-1`, { paddingHorizontal: 20, paddingTop: 40 }]}>
        <Text style={{ fontSize: 22, marginBottom: 20 }}>Complete Profile</Text>

        <TouchableOpacity
          style={{
            backgroundColor: "#ddd",
            width: 150,
            height: 150,
            borderRadius: 75,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={handleImageUpload}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
          ) : (
            <Text style={{ fontSize: 18 }}>Upload Photo</Text>
          )}
        </TouchableOpacity>

        <TextInput
          style={[
            tw`border border-black rounded-lg px-4 py-3 mb-4`,
            { width: "100%", borderWidth: 0.5 },
          ]}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 10 }}>Gender</Text>
          <View style={tw`flex-row items-center justify-between`}>
            <TouchableOpacity
              style={[
                tw`flex-row items-center mb-2 p-2 rounded-lg`,
                gender === "Female" && {
                  backgroundColor: "#8e44ad",
                },
                {
                  borderColor: gender === "Female" ? "#8e44ad" : "#000",
                  borderWidth: 0.5,
                },
              ]}
              onPress={() => setGender("Female")}
            >
              <MaterialCommunityIcons
                name="gender-female"
                size={24}
                color={gender === "Female" ? "white" : "#8e44ad"}
              />
              <Text
                style={{
                  color: gender === "Female" ? "white" : "#8e44ad",
                  marginLeft: 10,
                }}
              >
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw`flex-row items-center mb-2 p-2 rounded-lg`,
                gender === "Male" && {
                  backgroundColor: "#8e44ad",
                },
                {
                  borderColor: gender === "Male" ? "#8e44ad" : "#000",
                  borderWidth: 0.5,
                },
              ]}
              onPress={() => setGender("Male")}
            >
              <MaterialCommunityIcons
                name="gender-male"
                size={24}
                color={gender === "Male" ? "white" : "#8e44ad"}
              />
              <Text
                style={{
                  color: gender === "Male" ? "white" : "#8e44ad",
                  marginLeft: 10,
                }}
              >
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                tw`flex-row items-center mb-2 p-2 rounded-lg`,
                gender === "Other" && {
                  backgroundColor: "#8e44ad",
                },
                {
                  borderColor: gender === "Other" ? "#8e44ad" : "#000",
                  borderWidth: 0.5,
                },
              ]}
              onPress={() => setGender("Other")}
            >
              <MaterialCommunityIcons
                name="gender-transgender"
                size={24}
                color={gender === "Other" ? "white" : "#8e44ad"}
              />
              <Text
                style={{
                  color: gender === "Other" ? "white" : "#8e44ad",
                  marginLeft: 10,
                }}
              >
                Other
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={{ color: "#4a4a4a" }}>
            Allowing other genders into SafeGuard her is important as it enables
            husbands, fathers, family and friends to render immediate help in
            case of emergency. :)
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#554288",
            paddingVertical: 15,
            borderRadius: 20,
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={handleSubmit}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
