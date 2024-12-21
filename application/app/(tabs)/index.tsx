import CardStack from "@/components/Card-stack";
import FiltersScreen from "@/components/Filter";
import MatchModal from "@/components/MatchModel";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const profiles = [
  {
    id: "1",
    name: "Jessica Parker",
    age: 23,
    image:
      "https://cdn.pixabay.com/photo/2024/04/08/10/27/ai-generated-8683187_640.png",
    distance: "1 km",
    profession: "Professional model",
  },
  {
    id: "2",
    name: "Alex Johnson",
    age: 29,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfQtXXyUkxZibk0UkDXZUXg1JI3W-ZZm3MvQ&s",
    distance: "2 km",
    profession: "Photographer",
  },
  {
    id: "3",
    name: "Emily Carter",
    age: 25,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2px7luekJl9KJIKpTKbBtaC2uP_osmLhnzM_hgljyatZXPLeVieHRgedkmNXwRKlkDEA&usqp=CAU",
    distance: "3 km",
    profession: "Graphic Designer",
  },
  {
    id: "4",
    name: "Sophia Bennett",
    age: 26,
    image:
      "https://img.freepik.com/premium-photo/anime-girl-watching-sunset-3d-illustration_717906-1411.jpg",
    distance: "4 km",
    profession: "Animator",
  },
];

export default function Index() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleFilterModal = () => {
    bottomSheetRef.current?.expand();
  };
  const [matchModalVisible, setMatchModalVisible] = useState(false);
  const [matchedProfile, setMatchedProfile] = useState<
    null | (typeof profiles)[0]
  >(null);

  const handleSwipeLeft = (profile: (typeof profiles)[0]) => {
    console.log("Rejected:", profile.name);
  };

  const handleSwipeRight = (profile: (typeof profiles)[0]) => {
    console.log("Liked:", profile.name);

    // Randomly trigger a match for demonstration
    if (Math.random() > 0.5) {
      setMatchedProfile(profile);
      setMatchModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setMatchModalVisible(false);
    setMatchedProfile(null);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className=" flex-1 items-center justify-center bg-white">
        <View className=" w-full bg-gray-100 flex-row items-center justify-between p-4">
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Discover</Text>
          <TouchableOpacity onPress={handleFilterModal}>
            <Ionicons name="options-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <CardStack
          profiles={profiles}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
        {matchedProfile && (
          <MatchModal
            visible={matchModalVisible}
            onClose={handleModalClose}
            matchedProfile={matchedProfile}
            currentUserImage="https://cdn.pixabay.com/photo/2024/04/08/10/27/ai-generated-8683187_640.png"
          />
        )}
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={["50%", "90%"]}
        index={-1}
        enablePanDownToClose={true}
      >
        <BottomSheetView>
          <FiltersScreen />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
