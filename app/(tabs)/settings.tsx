import useTheme from "@/hooks/useTheme";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Settings = () => {
  const { toggleDarkMode } = useTheme();
  return (
    <View>
      <Text>settings page</Text>
      <TouchableOpacity onPress={toggleDarkMode}>
        <Text>Toggle the mode</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;
