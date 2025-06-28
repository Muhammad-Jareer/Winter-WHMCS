// app/(tabs)/support.js
// Support Screen for “winter” WHMCS app.
// Clean, modern, simple design using NativeWind (Tailwind) and @expo/vector-icons.
// Dummy data; integrate with your WHMCS API as needed.

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
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

const dummyTickets = [
  {
    id: 'TCK-1001',
    subject: 'Cannot access control panel',
    status: 'Open', // Open, In Progress, Closed
    priority: 'High', // Low, Medium, High
    lastUpdate: '2025-06-13 14:22',
  },
  {
    id: 'TCK-1002',
    subject: 'Billing invoice question',
    status: 'In Progress',
    priority: 'Medium',
    lastUpdate: '2025-06-12 09:10',
  },
  {
    id: 'TCK-1003',
    subject: 'Domain renewal issue',
    status: 'Closed',
    priority: 'Low',
    lastUpdate: '2025-06-10 17:45',
  },
  {
    id: 'TCK-1004',
    subject: 'Unable to send emails',
    status: 'Open',
    priority: 'High',
    lastUpdate: '2025-06-14 08:30',
  },
  // ...more tickets
];

const statusStyles = {
  Open: { bg: 'bg-green-900', text: 'text-green-400' },
  'In Progress': { bg: 'bg-yellow-900', text: 'text-yellow-300' },
  Closed: { bg: 'bg-neutral-700', text: 'text-neutral-300' },
};

const filterOptions = ['All', 'Open', 'In Progress', 'Closed'];

export default function SupportScreen() {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All');

  const navigation = useNavigation();

  const filteredTickets = useMemo(() => {
    return dummyTickets.filter(ticket => {
      if (filter !== 'All' && ticket.status !== filter) return false;
      if (searchText.trim()) {
        return (
          ticket.id.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          ticket.subject.toLowerCase().includes(searchText.trim().toLowerCase())
        );
      }
      return true;
    });
  }, [searchText, filter]);

  const renderTicket = ({ item }) => {
    const st = statusStyles[item.status] || statusStyles.Open;
    return (
      <TouchableOpacity
        className="bg-primary-light rounded-xl p-4 mb-4"
        style={styles.cardShadow}
        // onPress: navigate to ticket detail
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-text-primary font-medium">{item.id}</Text>
          <View className={`px-2 py-1 rounded-full ${st.bg}`}>
            <Text className={`${st.text} text-xs font-semibold`}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text className="text-text-primary font-semibold mb-1">{item.subject}</Text>
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={14} color="#999999" />
            <Text className="text-text-secondary text-xs ml-1">
              {item.lastUpdate}
            </Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesome5
              name={
                item.priority === 'High'
                  ? 'exclamation-circle'
                  : item.priority === 'Medium'
                  ? 'exclamation-triangle'
                  : 'circle'
              }
              size={14}
              color={
                item.priority === 'High'
                  ? '#FF6B6B'
                  : item.priority === 'Medium'
                  ? '#FFD369'
                  : '#888888'
              }
            />
            <Text className="text-text-secondary text-xs ml-1">
              {item.priority}
            </Text>
          </View>
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
          <Text className="text-text-primary text-xl font-semibold">Support</Text>
        </TouchableOpacity>
        {/* Optionally a "+" for new invoice */}
        <TouchableOpacity className="p-1">
          <Ionicons name="add-outline" size={24} color="#FFA800" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="px-4 mb-3">
        <View className="flex-row items-center bg-primary-light rounded-lg px-3 py-2">
          <Ionicons name="search-outline" size={20} color="#999999" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search tickets..."
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
          {filterOptions.map(opt => {
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

      {/* Ticket List */}
      <FlatList
        data={filteredTickets}
        keyExtractor={item => item.id}
        renderItem={renderTicket}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Text className="text-text-secondary">No tickets found.</Text>
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
