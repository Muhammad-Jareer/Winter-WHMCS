// app/(tabs)/index.js
// Dashboard / Home screen for “winter” WHMCS app.
// Uses Tailwind CSS via NativeWind. Added sections: Upcoming Renewals, Announcements, Quick Links, Support Summary.

import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Dummy user info
const user = {
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
};

// Dummy overview metrics
const overviewItems = [
  {
    key: 'Services',
    value: 8,
    icon: <FontAwesome5 name="server" size={20} color="#FFA800" />,
  },
  {
    key: 'Invoices',
    value: 2,
    icon: <FontAwesome5 name="file-invoice-dollar" size={20} color="#FFA800" />,
  },
  {
    key: 'Tickets',
    value: 1,
    icon: <MaterialIcons name="support-agent" size={20} color="#FFA800" />,
  },
  {
    key: 'Domains',
    value: 5,
    icon: <Entypo name="globe" size={20} color="#FFA800" />,
  },
];

// Dummy quick actions
const quickActions = [
  {
    id: 1,
    label: 'New Service',
    icon: <Ionicons name="add-circle-outline" size={20} color="#1E2126" />,
  },
  {
    id: 2,
    label: 'Pay Invoice',
    icon: <FontAwesome5 name="file-invoice-dollar" size={20} color="#1E2126" />,
  },
  {
    id: 3,
    label: 'New Ticket',
    icon: <MaterialIcons name="support-agent" size={20} color="#1E2126" />,
  },
  {
    id: 4,
    label: 'Domains',
    icon: <Entypo name="globe" size={20} color="#1E2126" />,
  },
  {
    id: 5,
    label: 'SSL Certs',
    icon: <FontAwesome5 name="lock" size={20} color="#1E2126" />,
  },
  {
    id: 6,
    label: 'Payments',
    icon: <FontAwesome5 name="credit-card" size={20} color="#1E2126" />,
  },
  {
    id: 7,
    label: 'Clients',
    icon: <FontAwesome5 name="users" size={20} color="#1E2126" />,
  },
  {
    id: 8,
    label: 'Reports',
    icon: <FontAwesome5 name="chart-line" size={20} color="#1E2126" />,
  },
  {
    id: 9,
    label: 'Settings',
    icon: <MaterialIcons name="settings" size={20} color="#1E2126" />,
  },
];

// Dummy recent activities
const recentActivities = [
  {
    id: 'a1',
    icon: <FontAwesome5 name="file-invoice-dollar" size={20} color="#FFA800" />,
    text: 'Invoice #202 due in 3 days',
  },
  {
    id: 'a2',
    icon: <FontAwesome5 name="ticket-alt" size={20} color="#FFA800" />,
    text: 'Ticket #56 awaiting reply',
  },
];

// Dummy upcoming renewals (domains/services)
const upcomingRenewals = [
  {
    id: 'r1',
    icon: <Entypo name="time-slot" size={20} color="#FFA800" />,
    text: 'example.com renews in 5 days',
  },
  {
    id: 'r2',
    icon: <FontAwesome5 name="server" size={20} color="#FFA800" />,
    text: 'VPS Basic renews in 10 days',
  },
];

// Dummy announcements
const announcements = [
  {
    id: 'n1',
    icon: <Ionicons name="megaphone-outline" size={20} color="#FFA800" />,
    text: 'Scheduled maintenance on Sat 02:00–04:00 UTC.',
  },
  {
    id: 'n2',
    icon: <MaterialIcons name="new-releases" size={20} color="#FFA800" />,
    text: 'New payment gateway “FastPay” now available.',
  },
];

// Dummy support summary
const supportSummary = {
  open: 2,
  pending: 1,
  respondedToday: 5,
};

// Quick links: KB, Support, Billing History, Profile
const quickLinks = [
  {
    id: 'l1',
    label: 'Knowledgebase',
    icon: <Ionicons name="book-outline" size={20} color="#FFA800" />,
  },
  {
    id: 'l2',
    label: 'Support',
    icon: <MaterialIcons name="support-agent" size={20} color="#FFA800" />,
  },
  {
    id: 'l3',
    label: 'Billing History',
    icon: <FontAwesome5 name="file-invoice" size={20} color="#FFA800" />,
  },
  {
    id: 'l4',
    label: 'My Profile',
    icon: <Ionicons name="person-circle-outline" size={20} color="#FFA800" />,
  },
];

// Reusable components
function MetricCard({ icon, label, value }) {
  return (
    <TouchableOpacity
      className="bg-primary-light rounded-xl p-4 mb-3"
      style={[styles.cardShadow, { width: '48%' }]}
    >
      <View className="flex-row items-center mb-2">
        {icon}
        <Text className="text-text-primary text-base font-medium ml-2">
          {label}
        </Text>
      </View>
      <Text className="text-text-primary text-2xl font-bold">{value}</Text>
    </TouchableOpacity>
  );
}

function ActionButton({ icon, label }) {
  return (
    <TouchableOpacity
      className="bg-accent rounded-lg py-3 items-center"
      style={[styles.cardShadow, { flex: 1 }]}
    >
      {icon}
      <Text className="text-primary text-sm font-medium mt-1">{label}</Text>
    </TouchableOpacity>
  );
}

function ActivityItem({ icon, text }) {
  return (
    <View
      className="flex-row items-center bg-primary-light rounded-lg p-3 mb-2"
      style={styles.cardShadow}
    >
      {icon}
      <Text className="text-text-primary text-sm ml-2 flex-shrink">{text}</Text>
    </View>
  );
}

function RenewalItem({ icon, text }) {
  return (
    <View
      className="flex-row items-center bg-primary-light rounded-lg p-3 mb-2"
      style={styles.cardShadow}
    >
      {icon}
      <Text className="text-text-primary text-sm ml-2 flex-shrink">{text}</Text>
    </View>
  );
}

function AnnouncementItem({ icon, text }) {
  return (
    <View
      className="flex-row items-center bg-primary-light rounded-lg p-3 mb-2"
      style={styles.cardShadow}
    >
      {icon}
      <Text className="text-text-primary text-sm ml-2 flex-shrink">{text}</Text>
    </View>
  );
}

function QuickLinkButton({ icon, label }) {
  return (
    <TouchableOpacity
      className="flex-row items-center bg-primary-light rounded-lg p-3 mb-3"
      style={[styles.cardShadow]}
    >
      {icon}
      <Text className="text-text-primary text-sm ml-2">{label}</Text>
    </TouchableOpacity>
  );
}

export default function DashboardScreen() {

  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-primary">
        {/* Greeting & Avatar */}
        <View className='bg-primary py-12 flex-row justify-between items-center px-4'>
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} className="flex flex-row">
            <Ionicons name="menu" size={24} color="#FFA800" style={{ marginRight: 8 }} />
            <Text className="text-white text-xl font-bold">Dashboard</Text>
            </TouchableOpacity>
          <View className="flex-row items-center">
            <Image
              source={{ uri: user.avatar }}
              className="w-12 h-12 rounded-full border-2 border-accent"
            />
          </View>
        </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} className="px-4">

        {/* Overview */}
        <Text className="text-text-primary text-lg font-semibold mb-3">
          Overview
        </Text>
        <View className="flex-row flex-wrap justify-between mb-6">
          {overviewItems.map(item => (
            <MetricCard
              key={item.key}
              icon={item.icon}
              label={item.key}
              value={item.value}
            />
          ))}
        </View>

        {/* Quick Actions: 3 per row */}
        <Text className="text-text-primary text-lg font-semibold mb-3">
          Quick Actions
        </Text>
        <View className="flex-row flex-wrap mb-6 -mx-1">
          {quickActions.map((act) => (
            <View key={act.id} className="w-1/3 px-1 mb-3">
              <ActionButton icon={act.icon} label={act.label} />
            </View>
          ))}
        </View>

        {/* Upcoming Renewals */}
        <Text className="text-text-primary text-lg font-semibold mb-3">
          Upcoming Renewals
        </Text>
        {upcomingRenewals.map(item => (
          <RenewalItem key={item.id} icon={item.icon} text={item.text} />
        ))}

        {/* Announcements */}
        <Text className="text-text-primary text-lg font-semibold mb-3 mt-4">
          Announcements
        </Text>
        {announcements.map(item => (
          <AnnouncementItem key={item.id} icon={item.icon} text={item.text} />
        ))}

        {/* Support Summary */}
        <Text className="text-text-primary text-lg font-semibold mb-3 mt-4">
          Support Summary
        </Text>
        <View className="bg-primary-light rounded-xl p-4 mb-6" style={styles.cardShadow}>
          <View className="flex-row justify-between mb-2">
            <Text className="text-text-primary">Open Tickets</Text>
            <Text className="text-text-primary font-bold">{supportSummary.open}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-text-primary">Pending Replies</Text>
            <Text className="text-text-primary font-bold">{supportSummary.pending}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-text-primary">Responded Today</Text>
            <Text className="text-text-primary font-bold">{supportSummary.respondedToday}</Text>
          </View>
        </View>

        {/* Quick Links */}
        <Text className="text-text-primary text-lg font-semibold mb-3 mt-4">
          Quick Links
        </Text>
        <View className="flex-row flex-wrap -mx-1 mb-6">
          {quickLinks.map(link => (
            <View key={link.id} className="w-1/2 px-1">
              <QuickLinkButton icon={link.icon} label={link.label} />
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <Text className="text-text-primary text-lg font-semibold mb-3">
          Recent Activity
        </Text>
        {recentActivities.map(item => (
          <ActivityItem key={item.id} icon={item.icon} text={item.text} />
        ))}
        <TouchableOpacity className="items-end mb-6">
          <Text className="text-accent text-sm">View All Activity</Text>
        </TouchableOpacity>

        {/* Footer / Version */}
        <View className="items-center mt-4">
          <Text className="text-text-secondary text-xs">
            WiRENET WHMCS App v1.0.0
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
  badgeShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
