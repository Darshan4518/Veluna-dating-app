import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";

export default function FiltersScreen() {
  const [selectedInterest, setSelectedInterest] = useState("Girls");
  const [distance, setDistance] = useState(40);
  const [ageRange, setAgeRange] = useState([20, 28]);

  const handleInterestChange = (interest: string) => {
    setSelectedInterest(interest);
  };

  return (
    <View className="flex-1 bg-white p-6">
      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-black">Filters</Text>
        <TouchableOpacity>
          <Text className="text-pink-500 text-lg font-semibold">Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Interested In */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-4">Interested in</Text>
        <View className="flex-row bg-gray-100 rounded-full p-2">
          {["Girls", "Boys", "Both"].map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleInterestChange(option)}
              className={`flex-1 items-center justify-center py-2 rounded-full ${
                selectedInterest === option ? "bg-pink-500" : "bg-transparent"
              }`}
            >
              <Text
                className={`text-sm font-semibold ${
                  selectedInterest === option ? "text-white" : "text-black"
                }`}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Location */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-4">Location</Text>
        <TouchableOpacity className="flex-row items-center justify-between bg-gray-100 px-4 py-3 rounded-full">
          <Text className="text-black text-sm">Chicago, USA</Text>
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Distance */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-4">Distance</Text>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-black text-sm">0km</Text>
          <Text className="text-black text-sm">{distance}km</Text>
        </View>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FF577E"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#FF577E"
          value={distance}
          onValueChange={(value) => setDistance(Math.round(value))}
        />
      </View>

      {/* Age */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-4">Age</Text>
        <View className="flex-row items-center justify-between mb-2">
          <Text className="text-black text-sm">{ageRange[0]}</Text>
          <Text className="text-black text-sm">{ageRange[1]}</Text>
        </View>
        <Slider
          style={{ width: "100%", height: 40 }}
          minimumValue={18}
          maximumValue={60}
          step={1}
          minimumTrackTintColor="#FF577E"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#FF577E"
          value={ageRange[0]}
          onValueChange={(value) =>
            setAgeRange([Math.min(value, ageRange[1]), ageRange[1]])
          }
        />
        <Slider
          style={{ width: "100%", height: 40, marginTop: -20 }}
          minimumValue={18}
          maximumValue={60}
          step={1}
          minimumTrackTintColor="#FF577E"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#FF577E"
          value={ageRange[1]}
          onValueChange={(value) =>
            setAgeRange([ageRange[0], Math.max(value, ageRange[0])])
          }
        />
      </View>

      {/* Continue Button */}
      <TouchableOpacity className="bg-pink-500 rounded-full py-4 items-center">
        <Text className="text-white font-semibold text-lg">Continue</Text>
      </TouchableOpacity>
    </View>
  );
}
