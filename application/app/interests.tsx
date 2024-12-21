import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const interests = [
  { id: 1, name: "Photography", icon: "📸" },
  { id: 2, name: "Shopping", icon: "🛍" },
  { id: 3, name: "Karaoke", icon: "🎤" },
  { id: 4, name: "Yoga", icon: "🧘‍♀️" },
  { id: 5, name: "Cooking", icon: "👨‍🍳" },
  { id: 6, name: "Tennis", icon: "🎾" },
  { id: 7, name: "Run", icon: "🏃‍♂️" },
  { id: 8, name: "Swimming", icon: "🏊‍♂️" },
  { id: 9, name: "Art", icon: "🎨" },
  { id: 10, name: "Traveling", icon: "✈️" },
  { id: 11, name: "Extreme", icon: "🏂" },
  { id: 12, name: "Music", icon: "🎵" },
  { id: 13, name: "Drink", icon: "🍷" },
  { id: 14, name: "Video games", icon: "🎮" },
];

export default function Interests() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get("http://192.168.32.129:3000/profile/6");
      if (data?.interests) {
        router.replace("/(tabs)");
      }
    };
    getProfile();
  }, []);

  const updateProfile = useMutation({
    mutationFn: async (interests: string[]) => {
      const { data } = await axios.put(
        "http://192.168.32.129:3000/profile/update/6",
        { interests }
      );
      return data;
    },
    onSuccess: () => {
      console.log("Profile updated successfully");
      router.push("/(tabs)");
    },
    onError: (error) => {
      console.error("Failed to update profile:", error);
    },
  });

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = () => {
    if (selectedInterests.length === 0) {
      alert("Please select at least one interest.");
      return;
    }
    updateProfile.mutate(selectedInterests);
  };

  return (
    <View className="flex-1 p-6">
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text className="text-[#E94057]">Skip</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-2xl font-bold mb-2">Your interests</Text>
      <Text className="text-gray-500 mb-6">
        Select a few of your interests and let everyone know what you're
        passionate about.
      </Text>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-3">
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              onPress={() => toggleInterest(interest.name)}
              className={`px-4 py-2 border rounded-full flex-row items-center ${
                selectedInterests.includes(interest.name)
                  ? "border-[#E94057] bg-[#FFE4E6]"
                  : "border-gray-300"
              }`}
            >
              <Text
                className={`mr-2 ${
                  selectedInterests.includes(interest.name)
                    ? "text-[#E94057]"
                    : "text-black"
                }`}
              >
                {interest.icon}
              </Text>
              <Text
                className={`${
                  selectedInterests.includes(interest.name)
                    ? "text-[#E94057]"
                    : "text-black"
                }`}
              >
                {interest.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity
        onPress={handleSubmit}
        className="mt-6 bg-[#E94057] h-14 rounded-xl items-center justify-center"
      >
        <Text className="text-white text-base font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
