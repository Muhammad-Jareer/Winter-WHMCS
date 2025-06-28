// app/(tabs)/analytics.js
// Refined Analytics Screen for “winter” WHMCS app.
// Cleaner color usage, more detailed stats, subtler accents, better layout.

import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Dummy summary metrics with previous-period comparison
const summaryMetrics = [
  {
    key: 'Monthly Revenue',
    value: 12500,
    delta: 12.5, // percent increase
    isPositive: true,
    icon: <FontAwesome5 name="dollar-sign" size={20} color="#FFA800" />,
  },
  {
    key: 'Active Clients',
    value: 320,
    delta: 8, // percent increase
    isPositive: true,
    icon: <FontAwesome5 name="users" size={20} color="#FFA800" />,
  },
  {
    key: 'New Signups',
    value: 45,
    delta: -2, // percent change
    isPositive: false,
    icon: <Ionicons name="person-add-outline" size={20} color="#FFA800" />,
  },
  {
    key: 'Churn Rate',
    value: '2.4%',
    delta: -0.5,
    isPositive: true, // decrease in churn is positive
    icon: <FontAwesome5 name="chart-line" size={20} color="#FFA800" />,
  },
];

// Dummy monthly revenue data for bar chart
const revenueData = [
  { month: 'Jan', value: 8000 },
  { month: 'Feb', value: 9500 },
  { month: 'Mar', value: 11000 },
  { month: 'Apr', value: 10500 },
  { month: 'May', value: 12000 },
  { month: 'Jun', value: 12500 },
];

// Dummy new clients per month
const clientsData = [
  { month: 'Jan', value: 30 },
  { month: 'Feb', value: 35 },
  { month: 'Mar', value: 40 },
  { month: 'Apr', value: 38 },
  { month: 'May', value: 42 },
  { month: 'Jun', value: 45 },
];

// Reusable horizontal bar chart component
const BarChart = ({ data, labelKey, valueKey, maxValue, accentColor = '#FFA800' }) => {
  const maxVal = maxValue || Math.max(...data.map(d => d[valueKey]));
  return (
    <View className="space-y-2">
      {data.map((item) => {
        const percent = maxVal > 0 ? (item[valueKey] / maxVal) * 100 : 0;
        return (
          <View key={item[labelKey]} className="flex-row items-center">
            <Text className="text-text-secondary text-xs w-12">{item[labelKey]}</Text>
            <View
              style={{ backgroundColor: `${accentColor}33` }}
              className="flex-1 rounded-full h-3 mx-2 overflow-hidden"
            >
              <View
                style={{ width: `${percent}%`, backgroundColor: accentColor }}
                className="h-3"
              />
            </View>
            <Text className="text-text-primary text-xs w-16 text-right">
              {item[valueKey]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default function AnalyticsScreen() {
  const navigation = useNavigation();
  const maxRevenue = Math.max(...revenueData.map(d => d.value));
  const maxClients = Math.max(...clientsData.map(d => d.value));

  return (
    <SafeAreaView className="flex-1 bg-primary">
        {/* Header */}
        <View className="bg-primary py-12 flex-row justify-between items-center px-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="flex flex-row gap-4">
            <Ionicons name="arrow-back" size={24} color="#FFA800" />
            <Text className="text-white text-xl font-bold">Analytics</Text>
          </TouchableOpacity>
          <Ionicons name="analytics" size={24} color="#FFA800" />
        </View>

      <ScrollView className="px-4 mb-24">
        {/* Summary Metrics */}
        <Text className="text-text-primary text-lg font-semibold mb-3">Summary</Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          {summaryMetrics.map((item) => {
            const deltaText = `${item.isPositive ? '+' : ''}${item.delta}%`;
            const deltaColor = item.isPositive ? 'text-green-400' : 'text-red-400';
            const arrowIcon = item.isPositive ? 'arrow-up' : 'arrow-down';
            return (
              <View
                key={item.key}
                className="bg-primary-light rounded-xl p-4 mb-3"
                style={[styles.cardShadow, { width: '48%' }]}
              >
                <View className="flex-row items-center mb-2">
                  {item.icon}
                  <Text className="text-text-primary text-base font-medium ml-2">
                    {item.key}
                  </Text>
                </View>
                <Text className="text-text-primary text-2xl font-bold mb-1">
                  {typeof item.value === 'number'
                    ? item.value.toLocaleString()
                    : item.value}
                </Text>
                <View className="flex-row items-center">
                  <FontAwesome5
                    name={arrowIcon}
                    size={14}
                    color={item.isPositive ? '#4CAF50' : '#F44336'}
                  />
                  <Text className={`${deltaColor} text-xs ml-1`}>
                    {deltaText} vs prev
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Revenue Bar Chart */}
        <Text className="text-text-primary text-lg font-semibold mb-3">
          Revenue Trend
        </Text>
        <View className="bg-primary-light rounded-xl p-4 mb-6" style={styles.cardShadow}>
          <BarChart
            data={revenueData}
            labelKey="month"
            valueKey="value"
            maxValue={maxRevenue}
            accentColor="#FFA800"
          />
        </View>

        {/* New Clients Bar Chart */}
        <Text className="text-text-primary text-lg font-semibold mb-3">
          New Clients Trend
        </Text>
        <View className="bg-primary-light rounded-xl p-4 mb-6" style={styles.cardShadow}>
          <BarChart
            data={clientsData}
            labelKey="month"
            valueKey="value"
            maxValue={maxClients}
            accentColor="#FFA800"
          />
        </View>

        {/* Detailed Metrics */}
        <Text className="text-text-primary text-lg font-semibold mb-3">
          Detailed Metrics
        </Text>
        <View className="bg-primary-light rounded-xl p-4 mb-6" style={styles.cardShadow}>
          {/* Example: Average Revenue, MRR, ARR */}
          <View className="flex-row justify-between mb-3">
            <Text className="text-text-secondary">Average Monthly Revenue</Text>
            <Text className="text-text-primary font-semibold">${(12500 / 6).toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-text-secondary">MRR (Monthly Recurring)</Text>
            <Text className="text-text-primary font-semibold">$10,200</Text>
          </View>
          <View className="flex-row justify-between mb-3">
            <Text className="text-text-secondary">ARR (Annual Recurring)</Text>
            <Text className="text-text-primary font-semibold">$122,400</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-text-secondary">ARPU (Avg Rev per User)</Text>
            <Text className="text-text-primary font-semibold">
              ${(12500 / 320).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Trend Summary */}
        <Text className="text-text-primary text-lg font-semibold mb-3">
          Trend Highlights
        </Text>
        <View className="bg-primary-light rounded-xl p-4 mb-6" style={styles.cardShadow}>
          <View className="mb-3">
            <Text className="text-text-primary mb-1">Revenue Growth</Text>
            <View className="flex-row items-center">
              <FontAwesome5 name="arrow-up" size={16} color="#4CAF50" />
              <Text className="text-text-primary ml-1">+12.5% vs last 6 months</Text>
            </View>
          </View>
          <View className="mb-3">
            <Text className="text-text-primary mb-1">Client Growth</Text>
            <View className="flex-row items-center">
              <FontAwesome5 name="arrow-up" size={16} color="#4CAF50" />
              <Text className="text-text-primary ml-1">+8% vs last 6 months</Text>
            </View>
          </View>
          <View>
            <Text className="text-text-primary mb-1">Churn Rate Change</Text>
            <View className="flex-row items-center">
              <FontAwesome5 name="arrow-down" size={16} color="#4CAF50" />
              <Text className="text-text-primary ml-1">-0.5% vs last period</Text>
            </View>
          </View>
        </View>

        {/* Note */}
        <View className="items-center">
          <Text className="text-text-secondary text-xs">
            Data covers last 6 months. Adjust range in settings.
          </Text>
        </View>
      </ScrollView>
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
