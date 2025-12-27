import { createSettingsStyles } from "@/assets/styles/settings.styles";
import DangerZone from "@/components/settings/DangerZone";
import Header from "@/components/settings/Header";
import Preferences from "@/components/settings/Preferences";
import ProgressStats from "@/components/settings/ProgressStats";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";

import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const { colors } = useTheme();

  const settingsStyles = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyles.container}
    >
      <SafeAreaView style={settingsStyles.safeArea}>
        <Header />

        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <Preferences />
          <DangerZone />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};
export default SettingsScreen;
