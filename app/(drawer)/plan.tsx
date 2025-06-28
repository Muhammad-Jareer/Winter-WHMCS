// app/plan.js
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function PlanScreen() {
  const navigation = useNavigation();

  // Dummy plan data
  const currentPlan = {
    name: 'Business Pro',
    price: '$49.99/month',
    status: 'Active',
    renewalDate: '2023-12-15',
    features: [
      '500 GB Storage',
      'Unlimited Bandwidth',
      '10 Email Accounts',
      'Free SSL Certificate',
      '24/7 Priority Support',
      'Daily Backups'
    ],
    resources: {
      cpu: '4 Core',
      ram: '8 GB',
      storage: '500 GB SSD',
      bandwidth: 'Unlimited'
    }
  };

  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="bg-primary py-12 flex-row justify-between items-center px-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex flex-row gap-4">
          <Ionicons name="arrow-back" size={24} color="#FFA800" />
          <Text className="text-white text-xl font-bold">Analytics</Text>
        </TouchableOpacity>
        <Ionicons name="analytics" size={24} color="#FFA800" />
      </View>

      <ScrollView className="px-4 py-4">
        {/* Current Plan Card */}
        <View className="bg-gray-800 rounded-2xl p-6 mb-6 shadow-lg shadow-black/30">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-amber-500 text-2xl font-bold">{currentPlan.name}</Text>
            <View className="bg-emerald-500/20 px-3 py-1 rounded-full">
              <Text className="text-emerald-500 text-sm font-medium">{currentPlan.status}</Text>
            </View>
          </View>
          
          <Text className="text-white text-3xl font-bold mb-4">{currentPlan.price}</Text>
          
          <View className="flex-row items-center mb-6">
            <Ionicons name="calendar-outline" size={20} color="#FFA800" />
            <Text className="text-gray-400 ml-2">Renews on {currentPlan.renewalDate}</Text>
          </View>
          
          <TouchableOpacity className="bg-amber-500 py-3 rounded-xl items-center">
            <Text className="text-gray-900 font-bold">Manage Plan</Text>
          </TouchableOpacity>
        </View>

        {/* Plan Features */}
        <Text className="text-white text-xl font-bold mb-4">Plan Features</Text>
        <View className="bg-gray-800 rounded-2xl p-4 mb-6 shadow-md shadow-black/20">
          {currentPlan.features.map((feature, index) => (
            <View key={index} className="flex-row items-center py-2 border-b border-gray-700 last:border-b-0">
              <Ionicons name="checkmark-circle" size={20} color="#00E096" />
              <Text className="text-gray-300 ml-3">{feature}</Text>
            </View>
          ))}
        </View>

        {/* Resource Usage */}
        <Text className="text-white text-xl font-bold mb-4">Resource Usage</Text>
        <View className="bg-gray-800 rounded-2xl p-4 mb-6 shadow-md shadow-black/20">
          <View className="flex-row justify-between mb-4">
            <View className="items-center flex-1">
              <MaterialIcons name="memory" size={24} color="#00C6FF" />
              <Text className="text-gray-400 mt-1">CPU</Text>
              <Text className="text-white mt-1">{currentPlan.resources.cpu}</Text>
            </View>
            <View className="items-center flex-1">
              <FontAwesome5 name="memory" size={24} color="#FF4D94" />
              <Text className="text-gray-400 mt-1">RAM</Text>
              <Text className="text-white mt-1">{currentPlan.resources.ram}</Text>
            </View>
            <View className="items-center flex-1">
              <Ionicons name="hardware-chip-outline" size={24} color="#FFA800" />
              <Text className="text-gray-400 mt-1">Storage</Text>
              <Text className="text-white mt-1">{currentPlan.resources.storage}</Text>
            </View>
            <View className="items-center flex-1">
              <Ionicons name="speedometer-outline" size={24} color="#00E096" />
              <Text className="text-gray-400 mt-1">Bandwidth</Text>
              <Text className="text-white mt-1">{currentPlan.resources.bandwidth}</Text>
            </View>
          </View>
          
          {/* Usage Meter */}
          <View className="mt-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-400">Storage Usage</Text>
              <Text className="text-gray-400">315/500 GB (63%)</Text>
            </View>
            <View className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <View className="h-full bg-amber-500 rounded-full" style={{ width: '63%' }} />
            </View>
          </View>
          
          <View className="mt-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-gray-400">Bandwidth Usage</Text>
              <Text className="text-gray-400">2.1 TB/unlimited</Text>
            </View>
            <View className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <View className="h-full bg-emerald-500 rounded-full" style={{ width: '45%' }} />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="flex-row mb-24">
          <TouchableOpacity className="flex-1 bg-gray-800 rounded-xl py-4 items-center mr-2 shadow-md shadow-black/20">
            <Text className="text-amber-500 font-bold">Upgrade Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-gray-800 rounded-xl py-4 items-center ml-2 shadow-md shadow-black/20">
            <Text className="text-amber-500 font-bold">Renew Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}