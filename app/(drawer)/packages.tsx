// app/packages.js
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PackagesScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Available packages
  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$9.99/mo',
      description: 'Perfect for small websites and blogs',
      features: ['100 GB Storage', 'Unmetered Bandwidth', '5 Email Accounts', 'Free SSL', '24/7 Support'],
      popular: false
    },
    {
      id: 'business',
      name: 'Business',
      price: '$29.99/mo',
      description: 'Ideal for growing businesses',
      features: ['300 GB Storage', 'Unmetered Bandwidth', 'Unlimited Email', 'Free SSL & CDN', 'Priority Support'],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$79.99/mo',
      description: 'For high-traffic websites and apps',
      features: ['1 TB Storage', 'Unmetered Bandwidth', 'Unlimited Email', 'Advanced Security', 'Dedicated Support'],
      popular: false
    },
    {
      id: 'wordpress',
      name: 'WordPress Pro',
      price: '$19.99/mo',
      description: 'Optimized for WordPress sites',
      features: ['200 GB Storage', 'Unmetered Bandwidth', '10 Email Accounts', 'WP-CLI & SSH', 'Auto Updates'],
      popular: false
    }
  ];

  // Filter packages based on search
  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View className="flex-1 bg-primary">
      {/* Header */}
      <View className="bg-primary py-12 flex-row justify-between items-center px-4">
        <TouchableOpacity onPress={() => navigation.goBack()} className="flex flex-row gap-2">
          <Ionicons name="arrow-back" size={24} color="#FFA800" />
        <Text className="text-white text-xl font-bold">Available Packages</Text>
        </TouchableOpacity>
        <MaterialCommunityIcons name="package-variant" size={24} color="#FFA800" />
      </View>

        <View className="bg-gray-800 rounded-xl px-4 py-3 flex-row items-center mb-6 shadow-md shadow-black/20">
          <Ionicons name="search" size={20} color="#8A8F9D" />
          <TextInput
            className="flex-1 text-white ml-3"
            placeholder="Search packages..."
            placeholderTextColor="#8A8F9D"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      <ScrollView className="px-4 py-4 mb-24">
        {/* Search Bar */}

        {/* Package Cards */}
        {filteredPackages.map(pkg => (
          <View 
            key={pkg.id} 
            className={`bg-gray-800 rounded-2xl p-5 mb-6 shadow-lg shadow-black/30 ${
              pkg.popular ? 'border-2 border-amber-500' : ''
            }`}
          >
            {pkg.popular && (
              <View className="bg-amber-500 absolute top-0 right-6 px-4 py-1 rounded-b-lg">
                <Text className="text-gray-900 font-bold">POPULAR</Text>
              </View>
            )}
            
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-white text-2xl font-bold">{pkg.name}</Text>
              <Text className="text-amber-500 text-xl font-bold">{pkg.price}</Text>
            </View>
            
            <Text className="text-gray-400 mb-4">{pkg.description}</Text>
            
            <View className="mb-6">
              {pkg.features.map((feature, index) => (
                <View key={index} className="flex-row items-center py-2">
                  <MaterialCommunityIcons name="check-circle" size={20} color="#00E096" />
                  <Text className="text-gray-300 ml-3">{feature}</Text>
                </View>
              ))}
            </View>
            
            <TouchableOpacity 
              className={`py-3 rounded-xl items-center ${
                pkg.popular ? 'bg-amber-500' : 'bg-gray-700'
              }`}
            >
              <Text className={`font-bold ${pkg.popular ? 'text-gray-900' : 'text-amber-500'}`}>
                {pkg.popular ? 'Get Started' : 'View Details'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
        
        {/* Compare Section */}
        <Text className="text-white text-xl font-bold mb-4">Compare Plans</Text>
        <TouchableOpacity className="flex-row items-center justify-center bg-gray-800 rounded-xl py-4 mb-6 shadow-md shadow-black/20">
          <Ionicons name="options" size={20} color="#FFA800" />
          <Text className="text-amber-500 font-bold ml-2">Compare All Packages</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}