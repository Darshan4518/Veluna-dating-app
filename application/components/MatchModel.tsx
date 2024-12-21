import React from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";

interface MatchModalProps {
  visible: boolean;
  onClose: () => void;
  matchedProfile: {
    id: string;
    name: string;
    image: string;
    age: number;
  };
  currentUserImage: string;
}

export default function MatchModal({
  visible,
  onClose,
  matchedProfile,
  currentUserImage,
}: MatchModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/80 justify-center items-center p-4">
        <View className="bg-white w-full rounded-3xl p-6 items-center">
          <Text className="text-2xl font-bold mb-6">
            It's a match, {matchedProfile.name}!
          </Text>
          <View className="flex-row justify-center mb-8">
            <Image
              source={{ uri: currentUserImage }}
              className="w-32 h-32 rounded-xl -rotate-12"
            />
            <Image
              source={{ uri: matchedProfile.image }}
              className="w-32 h-32 rounded-xl rotate-12 -ml-8"
            />
          </View>
          <TouchableOpacity
            onPress={onClose}
            className="bg-red-500 w-full rounded-full py-4 mb-2"
          >
            <Text className="text-white text-center font-semibold">
              Say hello
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text className="text-gray-500">Keep swiping</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
