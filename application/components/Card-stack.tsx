import React, { useState, useRef } from "react";
import {
  View,
  PanResponder,
  Animated,
  Text,
  TouchableOpacity,
} from "react-native";
import UserCard from "./UserCard";
import { HeartIcon, Star, XIcon } from "lucide-react-native";

interface Profile {
  id: string;
  name: string;
  age: number;
  image: string;
  distance: string;
  profession: string;
}

interface CardStackProps {
  profiles: Profile[];
  onSwipeLeft: (profile: Profile) => void;
  onSwipeRight: (profile: Profile) => void;
}

const SWIPE_THRESHOLD = 120;

const CardStack: React.FC<CardStackProps> = ({
  profiles,
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy });
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > SWIPE_THRESHOLD) {
        swipeRight();
      } else if (gesture.dx < -SWIPE_THRESHOLD) {
        swipeLeft();
      } else {
        resetPosition();
      }
    },
  });

  const swipeLeft = () => {
    Animated.timing(position, {
      toValue: { x: -500, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => handleSwipe("left"));
  };

  const swipeRight = () => {
    Animated.timing(position, {
      toValue: { x: 500, y: 0 },
      duration: 300,
      useNativeDriver: true,
    }).start(() => handleSwipe("right"));
  };

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const handleSwipe = (direction: "left" | "right") => {
    const profile = profiles[currentIndex];
    if (!profile) return;

    if (direction === "left") {
      onSwipeLeft(profile);
    } else {
      onSwipeRight(profile);
    }

    setCurrentIndex((prevIndex) => prevIndex + 1);
    position.setValue({ x: 0, y: 0 });
  };

  if (profiles.length === 0 || currentIndex >= profiles.length) {
    return (
      <View className=" justify-center items-center ">
        <Text className="text-xl font-semibold text-gray-700">
          No more profiles
        </Text>
      </View>
    );
  }

  const rotate = position.x.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: ["-20deg", "0deg", "20deg"],
  });

  const animatedCardStyle = {
    transform: [{ rotate }, ...position.getTranslateTransform()],
  };

  const renderQueueCards = () => {
    const queueCards = [];
    const maxQueue = 3;
    for (let i = 0; i < maxQueue; i++) {
      const nextIndex = currentIndex + i + 1;
      if (nextIndex < profiles.length) {
        queueCards.push(
          <View
            key={profiles[nextIndex].id}
            style={{
              position: "absolute",
              bottom: i * 10,
              width: "100%",
              height: "95%",
              zIndex: -i,
              opacity: 1 + i * 0.6,
            }}
          >
            <UserCard {...profiles[nextIndex]} />
          </View>
        );
      }
    }
    return queueCards;
  };

  return (
    <View className="flex-1 p-4">
      <View className=" flex-1 justify-center items-center relative ">
        {renderQueueCards()}
        <Animated.View
          style={[animatedCardStyle, { position: "absolute", width: "100%" }]}
          {...panResponder.panHandlers}
        >
          <UserCard {...profiles[currentIndex]} />
        </Animated.View>
      </View>
      <View className=" w-full flex-row justify-between items-center g">
        <TouchableOpacity
          className="bg-white p-4 rounded-full shadow-lg"
          onPress={() => swipeLeft()}
        >
          <XIcon size={35} color="#FF6B6B" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-red-500 p-5 mb-2 rounded-full shadow-lg"
          onPress={() => swipeRight()}
        >
          <HeartIcon size={35} color="#4CAF50" className=" fill-white" />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white p-4 rounded-full shadow-lg"
          onPress={() => swipeRight()}
        >
          <Star size={35} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardStack;
