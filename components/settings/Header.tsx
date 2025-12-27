import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  return (
    <View style={settingsStyles.header}>
      <View style={settingsStyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={settingsStyles.iconContainer}
        >
          <Ionicons name="settings" size={28} color="#ffffff" />
        </LinearGradient>
        <Text style={settingsStyles.title}>Settings</Text>
      </View>
    </View>
  );
};

export default Header;
