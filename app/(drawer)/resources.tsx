// app/(tabs)/resources.tsx
// WHMCS Resources screen with clean typography and consistent visual hierarchy.

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const resources = [
  {
    id: '1',
    title: 'Getting Started Guide',
    description: 'Learn how to set up and start using Winter WHMCS efficiently.',
    icon: 'rocket-outline',
    link: 'https://example.com/getting-started',
  },
  {
    id: '2',
    title: 'Billing & Invoices',
    description: 'Understand billing cycles, invoices, and automation options.',
    icon: 'card-outline',
    link: 'https://example.com/billing',
  },
  {
    id: '3',
    title: 'Support System',
    description: 'How to manage tickets and automate responses.',
    icon: 'help-circle-outline',
    link: 'https://example.com/support',
  },
  {
    id: '4',
    title: 'Product Setup',
    description: 'Configure and manage hosting products or services.',
    icon: 'construct-outline',
    link: 'https://example.com/product-setup',
  },
  {
    id: '5',
    title: 'Client Management',
    description: 'Track client activity, communication, and account history.',
    icon: 'people-outline',
    link: 'https://example.com/client-management',
  },
  {
    id: '6',
    title: 'Developer API',
    description: 'Explore our API docs for integration and automation.',
    icon: 'code-slash-outline',
    link: 'https://example.com/api-docs',
  },
];

export default function ResourcesScreen() {
  const navigation = useNavigation();
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
        {/* Header */}
        <View className="bg-primary py-12 flex-row justify-between items-center px-4">
          <TouchableOpacity onPress={() => navigation.goBack()} className="flex flex-row gap-4">
            <Ionicons name="arrow-back" size={24} color="#FFA800" />
            <Text className="text-white text-xl font-bold">Resources</Text>
          </TouchableOpacity>
          <Ionicons name="book-outline" size={24} color="#FFA800" />
        </View>
      <ScrollView className="px-4 pt-4 pb-32">

        {/* Cards */}
        {resources.map(resource => (
          <TouchableOpacity
            key={resource.id}
            onPress={() => openLink(resource.link)}
            activeOpacity={0.85}
            className="bg-primary-light rounded-2xl p-4 mb-4 flex-row"
            style={styles.cardShadow}
          >
            <Ionicons name={resource.icon as any} size={24} color="#FFA800" className="mt-1" />
            <View className="ml-4 flex-1">
              <Text className="text-text-primary text-base font-medium mb-1">
                {resource.title}
              </Text>
              <Text className="text-text-secondary text-sm leading-5">
                {resource.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Footer */}
        <View className="mt-8 items-center">
          <Text className="text-text-secondary text-sm mb-2">Still have questions?</Text>
          <TouchableOpacity
            onPress={() => openLink('https://example.com/contact-support')}
            className="bg-accent px-5 py-2 rounded-full"
          >
            <Text className="text-white text-sm font-semibold">Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
});
