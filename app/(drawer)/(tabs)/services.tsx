// app/(tabs)/services.js
// Services Screen for “winter” WHMCS app.
// Modern, clean, simple design using NativeWind (Tailwind) and @expo/vector-icons.
// Dummy data; integrate with WHMCS API as needed.

import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const dummyServices = [
  {
    id: 'SV-1001',
    name: 'VPS Basic Plan',
    type: 'VPS',
    status: 'Active', // Active, Suspended, Terminated
    nextDue: '2025-07-01',
  },
  {
    id: 'SV-1002',
    name: 'Shared Hosting Gold',
    type: 'Hosting',
    status: 'Suspended',
    nextDue: '2025-06-20',
  },
  {
    id: 'SV-1003',
    name: 'Domain: example.com',
    type: 'Domain',
    status: 'Active',
    nextDue: '2025-08-15',
  },
  {
    id: 'SV-1004',
    name: 'SSL Certificate for site.com',
    type: 'SSL',
    status: 'Active',
    nextDue: '2026-01-10',
  },
  {
    id: 'SV-1005',
    name: 'Managed Database',
    type: 'Addon',
    status: 'Terminated',
    nextDue: null,
  },
  // ...more services
];

const statusStyles = {
  Active: { bg: 'bg-green-900', text: 'text-green-400' },
  Suspended: { bg: 'bg-yellow-900', text: 'text-yellow-300' },
  Terminated: { bg: 'bg-red-900', text: 'text-red-400' },
};

const filterOptions = ['All', 'Active', 'Suspended', 'Terminated'];

export default function ServicesScreen() {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All');
  const navigation = useNavigation();

  const filteredServices = useMemo(() => {
    return dummyServices.filter((svc) => {
      if (filter !== 'All' && svc.status !== filter) return false;
      if (searchText.trim()) {
        const q = searchText.trim().toLowerCase();
        return (
          svc.id.toLowerCase().includes(q) ||
          svc.name.toLowerCase().includes(q) ||
          svc.type.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [searchText, filter]);

  const renderService = ({ item }) => {
    const st = statusStyles[item.status] || statusStyles.Active;
    // Choose icon by type
    let typeIcon;
    switch (item.type) {
      case 'VPS':
        typeIcon = <FontAwesome5 name="server" size={20} color="#FFA800" />;
        break;
      case 'Hosting':
        typeIcon = <FontAwesome5 name="cloud" size={20} color="#FFA800" />;
        break;
      case 'Domain':
        typeIcon = <Entypo name="globe" size={20} color="#FFA800" />;
        break;
      case 'SSL':
        typeIcon = <FontAwesome5 name="lock" size={20} color="#FFA800" />;
        break;
      case 'Addon':
        typeIcon = <Ionicons name="extension-puzzle-sharp" size={20} color="#FFA800" />;
        break;
      default:
        typeIcon = <MaterialIcons name="settings" size={20} color="#FFA800" />;
    }

    return (
      <TouchableOpacity
        className="bg-primary-light rounded-xl p-4 mb-4"
        style={styles.cardShadow}
        // onPress: navigate to service detail
      >
        {/* Header: ID and status */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-text-primary font-medium">{item.id}</Text>
          <View className={`px-2 py-1 rounded-full ${st.bg}`}>
            <Text className={`${st.text} text-xs font-semibold`}>
              {item.status}
            </Text>
          </View>
        </View>
        {/* Name & Type */}
        <View className="flex-row items-center mb-2">
          {typeIcon}
          <View className="ml-2 flex-1">
            <Text className="text-text-primary font-semibold">{item.name}</Text>
            <Text className="text-text-secondary text-sm">{item.type}</Text>
          </View>
        </View>
        {/* Next Due */}
        <View className="flex-row justify-between items-center">
          {item.nextDue ? (
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={16} color="#999999" />
              <Text className="text-text-secondary text-xs ml-1">
                Next Due: {item.nextDue}
              </Text>
            </View>
          ) : (
            <Text className="text-text-secondary text-xs italic">No upcoming due</Text>
          )}
          {/* Manage / details icon */}
          <Ionicons name="chevron-forward-outline" size={20} color="#999999" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      {/* Header */}
      <View className="bg-primary py-12 flex-row justify-between items-center px-4">
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} className="flex flex-row">
          <Ionicons name="menu" size={24} color="#FFA800" style={{ marginRight: 8 }} />
          <Text className="text-text-primary text-xl font-semibold">Services</Text>
        </TouchableOpacity>
        {/* Optionally a "+" for new invoice */}
        <TouchableOpacity className="p-1">
          <FontAwesome5 name="box-open" size={20} color="#FFA800" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="px-4 mb-3">
        <View className="flex-row items-center bg-primary-light rounded-lg px-3 py-2">
          <Ionicons name="search-outline" size={20} color="#999999" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search services..."
            placeholderTextColor="#999999"
            className="ml-2 flex-1 text-text-primary text-sm"
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#999999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="px-4 mb-4">
        <View className="flex-row">
          {filterOptions.map((opt) => {
            const selected = filter === opt;
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => setFilter(opt)}
                className={`px-3 py-1 mr-2 rounded-full ${
                  selected ? 'bg-accent' : 'bg-primary-light'
                }`}
                style={selected ? styles.cardShadow : null}
              >
                <Text
                  className={`text-sm font-medium ${
                    selected ? 'text-primary' : 'text-text-primary'
                  }`}
                >
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Service List */}
      <FlatList
        data={filteredServices}
        keyExtractor={(item) => item.id}
        renderItem={renderService}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Text className="text-text-secondary">No services found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
