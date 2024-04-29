import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import TrackMeScreen from "./TrackMeScreen";
import RecordScreen from "./RecordScreen";
import SOSScreen from "./SOSScreen";
import FakeCallScreen from "./FakeCallScreen";
import HelplineScreen from "./HelplineScreen";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const TabsWrapper = ({ navigation, route }) => {
  const { name } = route;

  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#554288", // Set the active color
        inactiveTintColor: "gray",
        style: styles.tabBar,
        labelStyle: styles.tabLabel,
        headerShown: false,
        tabStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <Tab.Screen
        name="TrackMeTab"
        component={TrackMeScreen}
        options={{
          tabBarLabel: "Track Me",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="location-on" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="RecordTab"
        component={RecordScreen}
        options={{
          tabBarLabel: "Record",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="fiber-manual-record" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SOSTab"
        component={SOSScreen}
        options={{
          tabBarLabel: "SOS",
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="alert" size={24} color="red" />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="FakeCallTab"
        component={FakeCallScreen}
        options={{
          tabBarLabel: "Fake Call",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="call" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="HelplineTab"
        component={HelplineScreen}
        options={{
          tabBarLabel: "Helpline",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsWrapper;

const styles = StyleSheet.create({
  tabBar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 60,
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  tabLabel: {
    fontSize: 12,
    color: "#554288",
  },
  iconContainer: {
    alignItems: "center",
  },
});
