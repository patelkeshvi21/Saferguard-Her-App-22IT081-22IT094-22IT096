import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./Screens/WelcomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignupScreen from "./Screens/SignupScreen";
import OTPVerifyScreen from "./Screens/OTPVerifyScreen";
import { StatusBar } from "react-native";
import { UserContext } from "./UserContext";
import CreatePasswordScreen from "./Screens/CreatePasswordScreen";
import CompleteProfileScreen from "./Screens/CompleteProfileScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import TabsWrapper from "./Navigation/TabsWrapper";
import NotificationScreen from "./Screens/NotificationScreen";
import AddFriendScreen from "./Screens/AddFriendScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserContext>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="#fdd9e4" />
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTPVerify"
            component={OTPVerifyScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePassword"
            component={CreatePasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CompleteProfile"
            component={CompleteProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TrackMeTab"
            component={TabsWrapper}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RecordTab"
            component={TabsWrapper}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SOSTab"
            component={TabsWrapper}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FakeCallTab"
            component={TabsWrapper}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HelplineTab"
            component={TabsWrapper}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Notifications"
            component={NotificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddContacts"
            component={AddFriendScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext>
  );
}
