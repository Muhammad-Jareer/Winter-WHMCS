// app/(tabs)/billing.js
// Billing Screen for “winter” WHMCS app.
// Professional, clean, modern design using NativeWind (Tailwind) and @expo/vector-icons.
// Dummy data; replace with API integration as needed.

import { Ionicons } from '@expo/vector-icons';
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

// Dummy invoices data
const invoicesData = [
  {
    id: 'INV-1001',
    date: '2025-06-01',
    dueDate: '2025-06-15',
    amount: 49.99,
    status: 'Unpaid', // 'Paid', 'Overdue'
  },
  {
    id: 'INV-1002',
    date: '2025-05-10',
    dueDate: '2025-05-25',
    amount: 29.99,
    status: 'Paid',
  },
  {
    id: 'INV-1003',
    date: '2025-05-20',
    dueDate: '2025-06-05',
    amount: 99.99,
    status: 'Overdue',
  },
  {
    id: 'INV-1004',
    date: '2025-06-05',
    dueDate: '2025-06-20',
    amount: 19.99,
    status: 'Unpaid',
  },
  // ...more
];

// Status color mapping
const statusStyles = {
  Paid: {
    text: 'text-green-400',
    bg: 'bg-green-900',
  },
  Unpaid: {
    text: 'text-yellow-300',
    bg: 'bg-yellow-900',
  },
  Overdue: {
    text: 'text-red-400',
    bg: 'bg-red-900',
  },
};

export default function BillingScreen() {
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Unpaid', 'Paid', 'Overdue'
  const navigation = useNavigation();

  // Compute filtered list
  const filteredInvoices = useMemo(() => {
    return invoicesData.filter(inv => {
      // Filter by status
      if (filter !== 'All' && inv.status !== filter) return false;
      // Search by ID
      if (searchText.trim()) {
        return inv.id.toLowerCase().includes(searchText.trim().toLowerCase());
      }
      return true;
    });
  }, [searchText, filter]);

  // Summary totals
  const summary = useMemo(() => {
    const unpaid = invoicesData.filter(i => i.status === 'Unpaid').length;
    const overdue = invoicesData.filter(i => i.status === 'Overdue').length;
    const paid = invoicesData.filter(i => i.status === 'Paid').length;
    const totalOutstanding = invoicesData
      .filter(i => i.status !== 'Paid')
      .reduce((sum, i) => sum + i.amount, 0)
      .toFixed(2);
    return { unpaid, overdue, paid, totalOutstanding };
  }, []);

  // Render invoice card
  const renderInvoice = ({ item }) => {
    const st = statusStyles[item.status] || statusStyles.Paid;
    return (
      <TouchableOpacity
        className="bg-primary-light rounded-xl p-4 mb-4"
        style={styles.cardShadow}
        // onPress: navigate to invoice detail
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-text-primary font-medium text-base">{item.id}</Text>
          <View className={`px-2 py-1 rounded-full ${st.bg}`}>
            <Text className={`${st.text} text-xs font-semibold`}>
              {item.status}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-between">
          <View>
            <View className="flex-row items-center mb-1">
              <Ionicons name="calendar-outline" size={16} color="#999999" />
              <Text className="text-text-secondary text-xs ml-1">
                Date: {item.date}
              </Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={16} color="#999999" />
              <Text className="text-text-secondary text-xs ml-1">
                Due: {item.dueDate}
              </Text>
            </View>
          </View>
          <Text className="text-text-primary font-semibold text-lg">
            ${item.amount.toFixed(2)}
          </Text>
        </View>
        {/* Action button */}
        {item.status === 'Unpaid' && (
          <TouchableOpacity
            className="mt-3 bg-accent rounded-lg py-2 items-center"
            // onPress: navigate to payment
          >
            <Text className="text-primary font-medium">Pay Now</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  // Filter tabs
  const filters = ['All', 'Unpaid', 'Paid', 'Overdue'];

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <View className="bg-primary py-12 flex-row justify-between items-center px-4">
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} className="flex flex-row">
          <Ionicons name="menu" size={24} color="#FFA800" style={{ marginRight: 8 }} />
          <Text className="text-text-primary text-xl font-semibold">Billing</Text>
        </TouchableOpacity>
        {/* Optionally a "+" for new invoice */}
        <TouchableOpacity className="p-1">
          <Ionicons name="add-outline" size={24} color="#FFA800" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-4">
        <View className="flex-row items-center bg-primary-light rounded-lg px-3 py-2">
          <Ionicons name="search-outline" size={20} color="#999999" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search invoice ID..."
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

      {/* Summary */}
      <View className="px-4 mb-4">
        <View className="bg-primary-light rounded-xl p-4" style={styles.cardShadow}>
          <Text className="text-text-primary font-medium mb-2">Summary</Text>
          <View className="flex-row justify-between mb-1">
            <Text className="text-text-secondary text-sm">Unpaid:</Text>
            <Text className="text-text-primary font-semibold">{summary.unpaid}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-text-secondary text-sm">Overdue:</Text>
            <Text className="text-text-primary font-semibold">{summary.overdue}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-text-secondary text-sm">Paid:</Text>
            <Text className="text-text-primary font-semibold">{summary.paid}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-text-secondary text-sm">Total Outstanding:</Text>
            <Text className="text-text-primary font-semibold">
              ${summary.totalOutstanding}
            </Text>
          </View>
        </View>
      </View>

      {/* Filter Tabs */}
      <View className="px-4 mb-4">
        <View className="flex-row">
          {filters.map(f => {
            const selected = filter === f;
            return (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                className={`px-3 py-1 mr-2 rounded-full ${
                  selected ? 'bg-accent' : 'bg-primary-light'
                }`}
                style={selected ? styles.cardShadow : null}
              >
                <Text className={`${selected ? 'text-primary' : 'text-text-primary'} text-sm`}>
                  {f}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Invoices List */}
      <FlatList
        data={filteredInvoices}
        keyExtractor={item => item.id}
        renderItem={renderInvoice}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ListEmptyComponent={
          <View className="items-center mt-10">
            <Text className="text-text-secondary">No invoices found.</Text>
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
