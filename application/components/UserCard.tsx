import React from "react";
import { View, Text, Image, Dimensions } from "react-native";

interface CardProps {
  name: string;
  age: number;
  image: string;
  distance: string;
  profession: string;
}

const { width, height } = Dimensions.get("window");

const UserCard: React.FC<CardProps> = ({
  name,
  age,
  image,
  distance,
  profession,
}) => {
  return (
    <View
      className=" overflow-hidden   self-center my-4  "
      style={{
        borderRadius: 20,
        height: height * 0.6,
        width: width * 0.9,
        elevation: 3,
      }}
    >
      {/* Image Section */}
      <Image
        source={{ uri: image }}
        className="w-full h-[60%] rounded-md "
        resizeMode="cover"
        width={width * 0.3}
        height={height * 0.6}
        style={{
          borderRadius: 20,
        }}
        accessible
        accessibilityLabel={`Profile picture of ${name}`}
      />

      {/* <View className="absolute top-[2vh] left-[5vw] bg-black rounded-full px-3 py-1">
        <Text className="text-white font-medium text-xs">{distance}</Text>
      </View> */}

      <View className="absolute bottom-0 w-full p-4 bg-gray-200 z-50">
        <Text className="text-gray-800 text-2xl font-semibold">
          {name}, <Text className="text-gray-300">{age}</Text>
        </Text>
        <Text className="text-gray-400 text-sm font-medium mt-1">
          {profession}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;
