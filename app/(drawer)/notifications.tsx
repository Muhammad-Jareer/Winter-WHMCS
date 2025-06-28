// @ts-nocheck
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type NotificationType = 'success' | 'error' | 'info' | 'warning' | 'default';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'Invoice Paid',
    message: 'Your invoice #1234 has been successfully paid.',
    time: '2 hours ago',
    type: 'success',
  },
  {
    id: 2,
    title: 'New Support Ticket',
    message: 'A new support ticket has been opened.',
    time: '5 hours ago',
    type: 'info',
  },
  {
    id: 3,
    title: 'Payment Failed',
    message: 'Your recent payment attempt failed.',
    time: '1 day ago',
    type: 'error',
  },
  {
    id: 4,
    title: 'Account Warning',
    message: 'Please verify your email address to continue.',
    time: '2 days ago',
    type: 'warning',
  }
];

const getIconAndColor = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return { icon: 'checkmark-circle', color: '#4CAF50' };
    case 'error':
      return { icon: 'close-circle', color: '#F44336' };
    case 'info':
      return { icon: 'information-circle', color: '#2196F3' };
    case 'warning':
      return { icon: 'warning', color: '#FFC107' };
    default:
      return { icon: 'notifications-outline', color: '#999999' };
  }
};

export default function NotificationScreen() {
  const [list, setList] = useState<Notification[]>(notifications);
  const navigation = useNavigation();

  const handleClearAll = () => setList([]);

  return (
    <SafeAreaView className="flex-1 bg-primary pb-24">
      {/* Header */}
        <View className="bg-primary py-12 flex-row justify-between items-center px-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="flex flex-row gap-4">
            <Ionicons name="arrow-back" size={24} color="#FFA800" />
            <Text className="text-white text-xl font-bold">Notifications</Text>
          </TouchableOpacity>
          {list.length > 0 && (
          <TouchableOpacity onPress={handleClearAll}>
          <Text className="text-accent text-sm font-medium">Clear All</Text>
          </TouchableOpacity>
          )}
        </View>

      <ScrollView className="px-4">
        {list.length === 0 ? (
          <View className="items-center">
            <Ionicons name="notifications-off-outline" size={60} color="#777" />
            <Text className="text-text-secondary mt-3 text-base">No new notifications</Text>
          </View>
        ) : (
          list.map((item) => {
            const { icon, color } = getIconAndColor(item.type);
            return (
              <View
                key={item.id}
                className="bg-primary-light rounded-xl p-4 mb-3 flex-row items-start"
                style={styles.shadow}
              >
                <Ionicons name={icon} size={24} color={color} style={{ marginTop: 4 }} />
                <View className="ml-3 flex-1">
                  <Text className="text-text-primary font-semibold text-base">
                    {item.title}
                  </Text>
                  <Text className="text-text-secondary text-sm mt-1">{item.message}</Text>
                  <Text className="text-text-secondary text-xs mt-1">{item.time}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});
