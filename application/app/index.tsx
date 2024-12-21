import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  requestNotificationPermission,
  sendLocalNotification,
} from "@/notification";

export default function PhoneNumber() {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const fetchUser = async () => {
    const { data: user } = await axios.get("http://192.168.32.129:3000/user/2");
    if (user.isVerified) {
      router.replace("/profile");
    }
  };

  useEffect(() => {
    fetchUser();
    requestNotificationPermission();
  }, [fetchUser]);

  // Mutation for sending verification code
  const sendCodeMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        "http://192.168.32.129:3000/verify/send-code",
        {
          phoneNumber,
        }
      );
      return data;
    },
    onSuccess: async (data) => {
      if (data.code) {
        await sendLocalNotification(data.code);
      }
      Alert.alert("Success", "Code sent! Please check your messages.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Failed to send code.";
      Alert.alert("Error", message);
    },
  });

  const resendCodeMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        "http://192.168.32.129:3000/verify/resend-code",
        {
          phoneNumber,
        }
      );
      return data;
    },
    onSuccess: async (data) => {
      if (data.code) {
        await sendLocalNotification(data.code);
      }
      Alert.alert("Success", "Code sent! Please check your messages.");
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Failed to send code.";
      Alert.alert("Error", message);
    },
  });

  // Mutation for verifying code
  const verifyCodeMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://192.168.32.129:3000/verify/verify-code",
        {
          phoneNumber,
          code,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      Alert.alert("Success", data.message);
      router.push("/profile");
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || "Verification failed.";
      Alert.alert("Error", message);
    },
  });

  const handleSendCode = () => {
    if (!phoneNumber.trim()) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }
    sendCodeMutation.mutate();
  };

  const handleVerifyCode = () => {
    if (!code.trim()) {
      Alert.alert("Error", "Please enter the verification code.");
      return;
    }
    verifyCodeMutation.mutate();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity onPress={() => router.back()} className="p-4">
        <ChevronLeft size={24} color="#000" />
      </TouchableOpacity>

      <View className="p-6">
        <View className="mb-8">
          <Text className="text-2xl font-bold mb-2">My mobile</Text>
          <Text className="text-gray-500">
            Please enter your valid phone number. We will send you a 4-digit
            code to verify your account.
          </Text>
        </View>

        {/* Phone number input */}
        <View className="flex-row gap-3 mb-6">
          <View className="w-20 h-14 border border-gray-300 rounded-xl justify-center items-center">
            <Text className="text-base">+91</Text>
          </View>
          <TextInput
            className="flex-1 h-14 border border-gray-300 rounded-xl px-4 text-base"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          onPress={handleSendCode}
          className="bg-[#E94057] h-14 rounded-xl items-center justify-center mb-10"
        >
          <Text className="text-white text-base font-semibold">Send Code</Text>
        </TouchableOpacity>

        {/* Code verification */}
        <View>
          <Text className="text-gray-500 text-center mb-4">
            Type the verification code we've sent you
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 mb-4"
            placeholder="Enter verification code"
            keyboardType="numeric"
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity
            onPress={handleVerifyCode}
            className="bg-[#E94057] h-14 rounded-xl items-center justify-center"
          >
            <Text className="text-white text-base font-semibold">Verify</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSendCode} className="mt-6">
          <Text className="text-[#E94057] text-center">Resend Code</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
