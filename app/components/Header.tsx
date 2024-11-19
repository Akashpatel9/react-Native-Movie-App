import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NavigationProp, useNavigation } from "@react-navigation/native";

type RootStackParamList = {
  Profile: undefined;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
    Alert.alert("Menu Clicked");
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={handleMenuClick}>
        <Ionicons name="menu" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Cinemas</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person-circle-outline" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default Header;
