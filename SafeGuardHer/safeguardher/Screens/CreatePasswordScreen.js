import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import tw from "twrnc";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "react-native-heroicons/solid";

export default function CreatePasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    const getMobileNumber = async () => {
      try {
        const storedMobileNumber = await AsyncStorage.getItem("mobileNumber");
        if (storedMobileNumber) {
          setMobileNumber(storedMobileNumber);
        }
      } catch (error) {
        console.error("Error retrieving mobile number:", error);
      }
    };

    getMobileNumber();
    validatePassword();
  }, [password, confirmPassword]);
  const validatePassword = () => {
    // Password length validation
    const isLengthValid = password.length >= 8 && password.length <= 16;
    setPasswordLength(isLengthValid);

    // Number validation
    const hasNumberRegex = /\d/;
    const hasNumberValid = hasNumberRegex.test(password);
    setHasNumber(hasNumberValid);

    // Uppercase validation
    const hasUppercaseRegex = /[A-Z]/;
    const hasUppercaseValid = hasUppercaseRegex.test(password);
    setHasUppercase(hasUppercaseValid);

    // Special character validation
    const hasSpecialCharRegex = /[!@#$%^&*]/;
    const hasSpecialCharValid = hasSpecialCharRegex.test(password);
    setHasSpecialChar(hasSpecialCharValid);

    // Password match validation
    setPasswordMatch(password === confirmPassword);
  };

  const handleCreatePassword = async () => {
    try {
      // Check if all validations passed
      if (
        passwordLength &&
        hasNumber &&
        hasUppercase &&
        hasSpecialChar &&
        passwordMatch
      ) {
        // Send a POST request to create password with the retrieved mobile number
        const response = await axios.post(
          "http://172.20.10.3:8080/auth/create-password",
          {
            mobileNumber: mobileNumber,
            password: password,
          }
        );

        // Handle success response
        Alert.alert("Success", "Password created successfully.");
        // Navigate to desired screen after password creation
        navigation.navigate("CompleteProfile");
      } else {
        // Handle validation errors
        Alert.alert(
          "Error",
          "Please make sure your password meets all requirements."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <View style={[tw`flex-1 bg-white`, { backgroundColor: "#fdd9e4" }]}>
      <View style={[tw`flex-1`, { paddingHorizontal: 20, paddingTop: 40 }]}>
        <View style={tw`flex-row items-center justify-between mb-8`}>
          <TouchableOpacity
            style={[
              tw`p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-2`,
              { backgroundColor: "#554288" },
            ]}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeftIcon size={20} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 22 }}>Create Password</Text>
          <View style={{ width: 60 }} />
        </View>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Enter New Password
        </Text>
        <TextInput
          style={[
            tw`border border-black rounded-lg px-4 py-3 mb-4`,
            password.length > 0 && { borderColor: "#8e44ad" },
          ]}
          placeholder="New Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Text
          style={{ color: passwordLength ? "green" : "red", marginBottom: 10 }}
        >
          Password must be between 8 to 16 characters.
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 10 }}>
          Re-Enter New Password
        </Text>
        <TextInput
          style={[
            tw`border border-black rounded-lg px-4 py-3 mb-4`,
            confirmPassword.length > 0 && { borderColor: "#8e44ad" },
          ]}
          placeholder="Confirm New Password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
        {!passwordMatch && (
          <Text style={{ color: "red", marginBottom: 10 }}>
            Passwords do not match. Please re-enter.
          </Text>
        )}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
            A good password should have:
          </Text>
          <View style={tw`flex-row items-center mb-2`}>
            {passwordLength ? (
              <CheckCircleIcon size={20} color="green" />
            ) : (
              <XCircleIcon size={20} color="red" />
            )}
            <Text style={{ marginLeft: 5 }}>8 or more characters</Text>
          </View>
          <View style={tw`flex-row items-center mb-2`}>
            {hasNumber ? (
              <CheckCircleIcon size={20} color="green" />
            ) : (
              <XCircleIcon size={20} color="red" />
            )}
            <Text style={{ marginLeft: 5 }}>At least one number</Text>
          </View>
          <View style={tw`flex-row items-center mb-2`}>
            {hasUppercase ? (
              <CheckCircleIcon size={20} color="green" />
            ) : (
              <XCircleIcon size={20} color="red" />
            )}
            <Text style={{ marginLeft: 5 }}>
              A mixture of upper and lowercase
            </Text>
          </View>
          <View style={tw`flex-row items-center mb-2`}>
            {hasSpecialChar ? (
              <CheckCircleIcon size={20} color="green" />
            ) : (
              <XCircleIcon size={20} color="red" />
            )}
            <Text style={{ marginLeft: 5 }}>
              At least 1 special character (!@#$%^&*)
            </Text>
          </View>
          <Text style={{ color: "#4a4a4a", marginTop: 10 }}>
            <Text style={{ color: "red", fontSize: 14 }}>*</Text>Note: We highly
            recommend you create a unique password - one that you don't use for
            any other sites.
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#554288",
            paddingVertical: 15,
            borderRadius: 20,
            alignItems: "center",
            marginTop: 30,
          }}
          onPress={handleCreatePassword}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
