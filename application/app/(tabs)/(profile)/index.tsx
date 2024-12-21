import { HeartIcon, MapPinIcon, SparklesIcon, X } from "lucide-react-native";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

interface ProfileData {
  id: number;
  profileImage: string;
  name: string;
  age: number;
  profession: string;
  location: string;
  about: string;
  interests: string[];
  images: string[];
}

export default function Profile() {
  const fetchProfile = async (): Promise<ProfileData> => {
    const { data } = await axios.get<ProfileData>(
      "http://192.168.32.129:3000/profile/6"
    );
    return data;
  };

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<ProfileData>({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 30000,
  });

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error loading profile!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <Image
          source={{
            uri: profile?.profileImage,
          }}
          className=" w-full"
          width={400}
          height={300}
        />
        <View className="px-4 pt-6">
          <View>
            <View className="flex-row items-center">
              <Text className="text-2xl font-semibold">{profile?.name} </Text>
              <Text className="text-2xl">{profile?.age}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/[id]",
                  params: {
                    id: profile?.id!,
                  },
                })
              }
            >
              <Text>Edit Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View className="flex-row items-center mt-4">
            <MapPinIcon size={16} color="#FF4B7D" />
            <Text className="text-gray-600 ml-1">{profile?.location}</Text>
          </View>

          {/* About */}
          <View className="mt-6">
            <Text className="font-semibold text-lg">About</Text>
            <Text className="text-gray-600 mt-2">{profile?.about}</Text>
            <Text className="text-pink-500 mt-1">Read more</Text>
          </View>

          {/* Interests */}
          <View className="mt-6">
            <Text className="font-semibold text-lg">Interests</Text>
            <View className="flex-row flex-wrap gap-2 mt-2">
              {profile?.interests.map((interest: string, index: number) => (
                <View
                  className="px-4 py-2 bg-gray-100 rounded-full"
                  key={index}
                >
                  <Text> {interest}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Gallery */}
          <View className="mt-6">
            <View className="flex-row justify-between items-center">
              <Text className="font-semibold text-lg">Gallery</Text>
              <Text className="text-pink-500">See all</Text>
            </View>
            <View className="flex-row flex-wrap gap-2 mt-2">
              {profile?.images?.length == 0 ? (
                <View className=" w-full my-5">
                  <Text className=" text-black text-center">
                    No images found...
                  </Text>
                </View>
              ) : (
                profile?.images &&
                profile?.images?.map((image: string, index: number) => (
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfQtXXyUkxZibk0UkDXZUXg1JI3W-ZZm3MvQ&s",
                    }}
                    className="w-[110] h-[110] rounded-xl"
                    width={200}
                    height={200}
                  />
                ))
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="h-24 px-4 flex-row items-center justify-between border-t border-gray-200">
        <Pressable className="w-12 h-12 items-center justify-center bg-gray-100 rounded-full">
          <X size={24} color="#666" />
        </Pressable>
        <Pressable className="w-16 h-16 items-center justify-center bg-pink-500 rounded-full">
          <HeartIcon size={32} color="white" />
        </Pressable>
        <Pressable className="w-12 h-12 items-center justify-center bg-gray-100 rounded-full">
          <SparklesIcon size={24} color="#666" />
        </Pressable>
      </View>
    </View>
  );
}
