import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface ProfileInput {
  name: string;
  age: number;
  about?: string;
  location?: string;
  interests: string[];
  profileImage: string | null;
  images: string[];
  gender: string;
  dateOfBirth: Date | null;
}

export default function UpdateProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [profileInput, setProfileInput] = useState<ProfileInput>({
    name: "",
    age: 18,
    about: "",
    location: "",
    interests: [],
    profileImage: null,
    images: [],
    gender: "",
    dateOfBirth: null,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Fetch current profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await axios.get(
        `http://192.168.32.129:3000/profile/${id}`
      );
      setProfileInput({
        ...response.data,
      });
    },
  });

  const updateProfile = useMutation({
    mutationFn: async (profileData: ProfileInput) => {
      const { data } = await axios.put(
        `http://192.168.32.129:3000/profile/${id}/update`,
        profileData
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("Profile updated successfully:", data);
      alert("Profile updated successfully!");
      router.back();
    },
    onError: (error) => {
      console.error("Profile update failed:", error);
      alert("An error occurred while updating your profile.");
    },
  });

  // Function to pick an image
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProfileInput((prev) => ({ ...prev, profileImage: selectedImage }));
    }
  };

  // Handle Date Picker
  const handleConfirmDate = (date: Date) => {
    setProfileInput((prev) => ({ ...prev, dateOfBirth: date }));
    setDatePickerVisibility(false);
  };

  const formatDate = (date: Date | null) => {
    return date ? date.toLocaleDateString() : "Select Date";
  };

  const handleSubmit = () => {
    const { name, age, gender, dateOfBirth } = profileInput;

    if (!name || !gender || !dateOfBirth || !age) {
      alert("Please complete all fields.");
      return;
    }

    if (age < 18) {
      alert("You must be at least 18 years old to continue.");
      return;
    }

    updateProfile.mutate(profileInput);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-6">
      {/* Header */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold mb-8">Update Profile</Text>

      {/* Profile Image Section */}
      <View className="items-center mb-8">
        <TouchableOpacity onPress={pickImage} className="relative">
          <View className="w-24 h-24 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
            {profileInput?.profileImage ? (
              <Image
                source={{ uri: profileInput?.profileImage }}
                className="w-full h-full"
                resizeMode="cover"
              />
            ) : (
              <Camera size={32} color="#666" />
            )}
          </View>
          <View className="absolute bottom-0 right-0 w-8 h-8 bg-[#E94057] rounded-full items-center justify-center">
            <Text className="text-white text-xl">+</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View className="space-y-4">
        {/* Name */}
        <View>
          <Text className="text-gray-500 mb-2">Name</Text>
          <TextInput
            value={profileInput.name}
            onChangeText={(text) =>
              setProfileInput((prev) => ({ ...prev, name: text }))
            }
            placeholder="Enter your name"
            className="h-14 border border-gray-300 rounded-xl px-4 text-base"
          />
        </View>

        {/* Age */}
        <View>
          <Text className="text-gray-500 mb-2">Age</Text>
          <TextInput
            value={profileInput.age ? profileInput.age.toString() : ""}
            onChangeText={(text) => {
              const numericValue = parseInt(text, 10);
              setProfileInput((prev) => ({
                ...prev,
                age: isNaN(numericValue) ? 0 : numericValue,
              }));
            }}
            placeholder="Enter your age"
            keyboardType="numeric"
            className="h-14 border border-gray-300 rounded-xl px-4 text-base"
          />
        </View>

        {/* Date of Birth */}
        <View>
          <Text className="text-gray-500 mb-2">Date of Birth</Text>
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(true)}
            className="h-14 border border-gray-300 rounded-xl px-4 justify-center"
          >
            <Text className="text-base">
              {formatDate(profileInput.dateOfBirth)}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="mt-auto bg-[#E94057] h-14 rounded-xl items-center justify-center"
      >
        <Text className="text-white text-base font-semibold">Update</Text>
      </TouchableOpacity>
    </View>
  );
}
