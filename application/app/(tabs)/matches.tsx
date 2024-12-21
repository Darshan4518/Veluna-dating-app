import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const matches = [
  {
    id: 1,
    name: "Kimberly",
    age: 28,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 2,
    name: "Alexandra",
    age: 25,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 3,
    name: "Regina",
    age: 24,
    image: "/placeholder.svg?height=300&width=200",
  },
  {
    id: 4,
    name: "Alicia",
    age: 26,
    image: "/placeholder.svg?height=300&width=200",
  },
];

export default function MatchesScreen() {
  return (
    <View className="flex-1 bg-white">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-2">Matches</Text>
        <Text className="text-gray-500 mb-4">
          This is a list of people who have liked you and your matches.
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        <View className="flex-row flex-wrap justify-between">
          {matches.map((match) => (
            <TouchableOpacity
              key={match.id}
              className="w-[48%] mb-4 rounded-xl overflow-hidden"
            >
              <Image source={{ uri: match.image }} className="w-full h-64" />
              <View className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
                <Text className="text-white font-semibold">
                  {match.name}, {match.age}
                </Text>
              </View>
              <View className="absolute top-2 right-2 flex-row">
                <TouchableOpacity className="bg-white rounded-full p-2 mr-2">
                  <Ionicons name="close" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-full p-2">
                  <Ionicons name="heart" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
