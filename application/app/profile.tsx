import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { router } from "expo-router";
import { ChevronLeft, Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ProfileInput {
  name: string;
  age: number;
  gender: string;
  dateOfBirth: Date | null;
  profileImage: string | null;
}

export default function Profile() {
  const [profileInput, setProfileInput] = useState<ProfileInput>({
    name: "",
    age: 18,
    gender: "",
    dateOfBirth: null,
    profileImage: null,
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await axios.get("http://192.168.32.129:3000/profile/6");
      if (data?.id) {
        router.push("/interests");
      }
    };
    getProfile();
  }, []);

  // Mutation to handle profile creation
  const createProfile = useMutation({
    mutationFn: async (profileData: ProfileInput) => {
      const requestData = {
        ...profileData,
        userId: 2,
      };
      const { data } = await axios.post(
        "http://192.168.32.129:3000/profile/create",
        requestData
      );
      return data;
    },
    onSuccess: (data) => {
      console.log("Profile created successfully:", data);
      router.push("/interests");
    },
    onError: (error) => {
      console.error("Profile creation failed:", error);
      alert("An error occurred while creating your profile.");
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
    12;
    createProfile.mutate(profileInput);
  };

  return (
    <View className="flex-1 p-6">
      {/* Header */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity onPress={() => router.back()}>
          <ChevronLeft size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/interests")}>
          <Text className="text-[#E94057]">Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text className="text-2xl font-bold mb-8">Profile details</Text>

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
          <View className="h-14 border border-gray-300 rounded-xl px-4 justify-center">
            <TextInput
              value={profileInput.name}
              onChangeText={(text) =>
                setProfileInput((prev) => ({ ...prev, name: text }))
              }
              placeholder="Enter your name"
              className="text-base"
            />
          </View>
        </View>

        {/* Age */}
        <View>
          <Text className="text-gray-500 mb-2">Age</Text>
          <View className="h-14 border border-gray-300 rounded-xl px-4 justify-center">
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
              className="text-base"
            />
          </View>
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

      {/* Gender Selection */}
      <Text className="text-2xl font-bold mb-8 mt-6">I am a</Text>
      <View className="space-y-4">
        {["Woman", "Man", "Choose another"].map((gender) => (
          <TouchableOpacity
            key={gender}
            onPress={() => setProfileInput((prev) => ({ ...prev, gender }))}
            className={`h-14 rounded-xl items-center justify-center ${
              profileInput.gender === gender
                ? "border-2 border-[#E94057]"
                : "border border-gray-300"
            }`}
          >
            <Text
              className={`text-base ${
                profileInput.gender === gender ? "text-[#E94057]" : "text-black"
              }`}
            >
              {gender}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="mt-auto bg-[#E94057] h-14 rounded-xl items-center justify-center"
      >
        <Text className="text-white text-base font-semibold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
