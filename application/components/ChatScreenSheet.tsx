import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const chats = [
  {
    id: 1,
    sender: "other",
    message:
      "Hi Jake, how are you? I saw on the app that we've crossed paths several times this week 🙂",
    time: "2:58 PM",
  },
  {
    id: 2,
    sender: "me",
    message:
      "Haha truly! Nice to meet you Grace! What about a cup of coffee today evening? ☕",
    time: "3:02 PM",
  },
  {
    id: 3,
    sender: "other",
    message: "Sure, let's do it! 😊",
    time: "3:10 PM",
  },
  {
    id: 4,
    sender: "me",
    message:
      "Great! I will write later the exact time and place. See you soon!",
    time: "3:12 PM",
  },
];

export function ChatScreen() {
  const [newMessage, setNewMessage] = useState("");

  return (
    <View className="h-full w-full bg-white">
      {/* Header */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }} // Replace with actual profile image
          className="w-10 h-10 rounded-full mx-3"
        />
        <View className="flex-1">
          <Text className="font-semibold text-black text-lg">Grace</Text>
          <Text className="text-gray-500 text-sm">Online</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="call-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="ml-4">
          <Ionicons name="videocam-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Chat Messages */}
      <ScrollView className="h-full w-full p-4 bg-white flex-grow">
        {chats.map((message) => (
          <View
            key={message.id}
            className={`mb-4  ${
              message.sender === "me" ? "items-end" : "items-start"
            }`}
          >
            <View
              className={`p-4 rounded-2xl max-w-[75%] ${
                message.sender === "me" ? "bg-pink-500" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm ${
                  message.sender === "me" ? "text-white" : "text-black"
                }`}
              >
                {message.message}
              </Text>
            </View>
            <Text className="text-gray-500 text-xs mt-1">{message.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Input Box */}
      <View className="flex-row items-center p-4 border-t border-gray-200 bg-white">
        <TouchableOpacity className="mr-2">
          <Ionicons name="add-circle-outline" size={28} color="gray" />
        </TouchableOpacity>
        <TextInput
          className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-2 text-sm"
          placeholder="Type a message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity>
          <Ionicons name="send" size={28} color="pink" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
