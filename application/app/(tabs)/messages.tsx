import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ChatScreen } from "@/components/ChatScreenSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const messages = [
  {
    id: 1,
    name: "Emma",
    message: "Hey! How are you?",
    time: "2m ago",
    unread: 2,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Ava",
    message: "Sure, let's meet!",
    time: "1h ago",
    unread: 0,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "Sophia",
    message: "Ok, see you then!",
    time: "2h ago",
    unread: 1,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Isabella",
    message: "That sounds great!",
    time: "1d ago",
    unread: 0,
    image: "https://via.placeholder.com/50",
  },
];

export default function MessagesScreen() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleChatModal = () => {
    bottomSheetRef.current?.expand();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-white">
        <View className="p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold">Messages</Text>
            <TouchableOpacity>
              <Ionicons name="options-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-6"
          >
            <View className="items-center mr-4">
              <View className="w-16 h-16 rounded-full bg-gray-300 items-center justify-center">
                <Text className="text-2xl">+</Text>
              </View>
              <Text className="mt-2">You</Text>
            </View>
            {messages.map((message) => (
              <View key={message.id} className="items-center mr-4">
                <Image
                  source={{ uri: message.image }}
                  className="w-16 h-16 rounded-full"
                />
                <Text className="mt-2">{message.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <ScrollView>
          {messages.map((message) => (
            <TouchableOpacity
              key={message.id}
              className="flex-row items-center p-4 border-b border-gray-200"
              onPress={handleChatModal}
            >
              <Image
                source={{ uri: message.image }}
                className="w-12 h-12 rounded-full mr-4"
              />
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text className="font-semibold">{message.name}</Text>
                  <Text className="text-gray-500 text-sm">{message.time}</Text>
                </View>
                <Text numberOfLines={1} className="text-gray-500">
                  {message.message}
                </Text>
              </View>
              {message.unread > 0 && (
                <View className="bg-pink-500 rounded-full w-6 h-6 items-center justify-center">
                  <Text className="text-white text-xs">{message.unread}</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["50%", "90%"]}
          index={-1}
          enablePanDownToClose={true}
        >
          <BottomSheetView>
            <ChatScreen />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
