import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure how notifications are displayed
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function sendLocalNotification(code: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Verification Code",
      body: `Your verification code is: ${code}`,
    },
    trigger: null, // Immediately send the notification
  });
}

// Request permissions for notifications
export async function requestNotificationPermission() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
}
