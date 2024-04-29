import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import tw from "twrnc";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function OTPVerifyScreen({ navigation }) {
  const [otp, setOTP] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const otpInputs = Array(6).fill(null);
  const inputRefs = useRef([]);
  const [cooldownTimer, setCooldownTimer] = useState(null);

  useEffect(() => {
    // Fetch mobile number from AsyncStorage
    async function fetchMobileNumber() {
      try {
        const storedMobileNumber = await AsyncStorage.getItem("mobileNumber");
        if (storedMobileNumber) {
          setMobileNumber(storedMobileNumber);
        }
      } catch (error) {
        console.error("Error fetching mobile number:", error);
      }
    }
    fetchMobileNumber();
  }, []);

  const handleVerifyOTP = async () => {
    try {
      if (!otp) {
        return Alert.alert("Error", "Please enter the OTP.");
      }

      // Start cooldown timer for resend OTP button
      setCooldownTimer(setTimeout(() => setResendDisabled(false), 60000));

      // Send a POST request to verify OTP
      const response = await axios.post(
        "http://172.20.10.3:8080/auth/verify-otp",
        {
          mobileNumber: mobileNumber,
          otp: otp,
        }
      );

      if (response.data.message) {
        // Check if the user is onboarded
        const onboardedResponse = await axios.post(
          "http://172.20.10.3:8080/auth/check-onboarded",
          {
            mobileNumber: mobileNumber,
          }
        );

        if (onboardedResponse.data.onboarded) {
          // User is onboarded, navigate to Home
          navigation.navigate("TrackMeTab");
        } else {
          // User is not onboarded, navigate to create password screen
          navigation.navigate("CreatePassword");
        }
      } else {
        // OTP is invalid
        Alert.alert("Error", "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        // Handle invalid OTP error
        Alert.alert("Error", "Invalid OTP. Please try again.");
      } else {
        // Handle other errors
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    }
  };

  const handleResendOTP = async () => {
    try {
      // Disable resend button and start cooldown timer
      setResendDisabled(true);
      setCooldownTimer(setTimeout(() => setResendDisabled(false), 60000));

      // Send a POST request to generate OTP
      await axios.post("http://172.20.10.3:8080/auth/login", {
        mobileNumber: mobileNumber,
      });

      Alert.alert("Success", "OTP has been resent.");
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to resend OTP. Please try again later.");
    }
  };

  const focusNextInput = (index) => {
    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPreviousInput = (index) => {
    if (index > 0) {
      inputRefs.current[index - 1].focus();
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
          <Text style={{ fontSize: 22 }}>OTP Verification</Text>
          <View style={{ width: 60 }} />
        </View>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>
          Please enter the OTP sent to your mobile number
        </Text>
        <View style={tw`flex-row justify-between items-center`}>
          {otpInputs.map((_, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{
                borderWidth: 1,
                borderColor: "#000",
                width: 50,
                height: 50,
                textAlign: "center",
                fontSize: 20,
                borderRadius: 10,
              }}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index] || ""}
              onChangeText={(text) => {
                const newOTP = [...otp];
                newOTP[index] = text;
                setOTP(newOTP.join(""));
                if (text.length === 1) {
                  focusNextInput(index);
                }
              }}
              onSubmitEditing={() => {
                if (index === 5) {
                  handleVerifyOTP();
                }
              }}
              onKeyPress={({ nativeEvent, ...args }) => {
                if (nativeEvent.key === "Backspace") {
                  focusPreviousInput(index);
                }
              }}
            />
          ))}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: resendDisabled ? "#554288" : "#554288",
            paddingVertical: 15,
            borderRadius: 20,
            alignItems: "center",
            marginTop: 30,
          }}
          onPress={handleVerifyOTP}
        >
          <Text style={{ color: "white", fontSize: 18 }}>Verify OTP</Text>
        </TouchableOpacity>
        <View
          style={{ marginTop: 20, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ color: "#000", fontSize: 16 }}>
            Didn't receive the verification OTP?
          </Text>
          <TouchableOpacity onPress={handleResendOTP} disabled={resendDisabled}>
            <Text
              style={{
                color: resendDisabled ? "#000" : "#8e44ad",
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              Resend Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
