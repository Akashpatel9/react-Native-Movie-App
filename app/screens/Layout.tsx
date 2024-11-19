import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "./Home";
import MyList from "./MyList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const Layout = () => {
  const renderIcon = (name: any, focused: boolean) => (
    <View
      style={[
        styles.iconContainer,
        { backgroundColor: focused ? "#B4B4B8" : "transparent" },
      ]}
    >
      <Ionicons
        style={[styles.icon, { color: focused ? "white" : "black" }]}
        name={name}
        size={20}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator  >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown:false,
            tabBarActiveTintColor: "black",
            tabBarIcon: ({ focused }) => renderIcon("home", focused),
          }}
        />
        <Tab.Screen
          name="My List"
          component={MyList}
          options={{
            headerShown:false,
            tabBarActiveTintColor: "black",
            tabBarIcon: ({ focused }) => renderIcon("list", focused),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  iconContainer: {
    borderRadius: 20,
    height: 30,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Layout;
