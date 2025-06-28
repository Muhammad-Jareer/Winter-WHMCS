// app/(tabs)/profile.js
// Updated Profile Screen for “winter” WHMCS app.
// Clean, professional, modern design using NativeWind (Tailwind) and @expo/vector-icons.
// Fixed icon names, spacing, and structure.

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ProfileScreen = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'Acme Inc',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, Suite 200\nNew York, NY 10001',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastLogin: '2025-06-14 09:42 AM',
    joinedDate: 'January 2023',
  });

  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPwdFields, setShowPwdFields] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const securityItems = [
    {
      icon: <Ionicons name="lock-closed-outline" size={20} color="#FFA800" />,
      label: 'Password',
      value: '••••••••',
      action: 'Change',
    },
    {
      icon: <Ionicons name="shield-checkmark-outline" size={20} color="#FFA800" />,
      label: 'Two-Factor Auth',
      value: 'Enabled',
      action: 'Manage',
    },
    {
      icon: <MaterialCommunityIcons name="devices" size={20} color="#FFA800" />,
      label: 'Devices',
      value: '3 active',
      action: 'View',
    },
  ];

  const billingItems = [
    {
      icon: <FontAwesome5 name="credit-card" size={20} color="#FFA800" />,
      label: 'Payment Methods',
      value: 'VISA •••• 4242',
    },
    {
      icon: <MaterialCommunityIcons name="receipt" size={20} color="#FFA800" />,
      label: 'Billing Address',
      value: 'Same as profile',
    },
    {
      icon: <MaterialIcons name="history" size={20} color="#FFA800" />,
      label: 'Billing History',
      value: '12 invoices',
    },
  ];

  const handleSaveProfile = () => {
    // TODO: validate & submit profile changes
    Alert.alert('Profile Saved', 'Your changes have been saved.');
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwords.current || !passwords.new) {
      Alert.alert('Error', 'Please fill in all password fields.');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      Alert.alert('Error', 'New password and confirmation do not match.');
      return;
    }
    // TODO: submit password change
    Alert.alert('Password Changed', 'Your password has been updated.');
    setPasswords({ current: '', new: '', confirm: '' });
    setShowPwdFields(false);
  };

  const renderProfileSection = () => (
    <View className="bg-primary-light rounded-xl p-6 mb-6" style={styles.cardShadow}>
      <View className="items-center mb-6 relative">
        <Image
          source={{ uri: user.profileImage }}
          className="w-24 h-24 rounded-full border-4 border-accent"
        />
        {isEditing && (
          <TouchableOpacity
            className="absolute bottom-0 right-0 bg-accent p-2 rounded-full"
            onPress={() => Alert.alert('Change Avatar', 'Image picker not implemented.')}
          >
            <Ionicons name="camera-outline" size={20} color="#1E2126" />
          </TouchableOpacity>
        )}
      </View>

      {isEditing ? (
        <>
          {/* Name */}
          <View className="mb-4">
            <Text className="text-text-secondary text-sm mb-1">Name</Text>
            <TextInput
              value={user.name}
              onChangeText={(text) => setUser(prev => ({ ...prev, name: text }))}
              editable
              placeholder="Name"
              placeholderTextColor="#999999"
              className="bg-primary-light text-text-primary border-b border-accent pb-1"
            />
          </View>
          {/* Email */}
          <View className="mb-4">
            <Text className="text-text-secondary text-sm mb-1">Email</Text>
            <TextInput
              value={user.email}
              onChangeText={(text) => setUser(prev => ({ ...prev, email: text }))}
              editable
              keyboardType="email-address"
              placeholder="Email"
              placeholderTextColor="#999999"
              className="bg-primary-light text-text-primary border-b border-accent pb-1"
            />
          </View>
          {/* Phone */}
          <View className="mt-4">
            <Text className="text-text-secondary text-sm mb-1">Phone</Text>
            <TextInput
              value={user.phone}
              onChangeText={(text) => setUser(prev => ({ ...prev, phone: text }))}
              editable
              keyboardType="phone-pad"
              placeholder="Phone"
              placeholderTextColor="#999999"
              className="bg-primary-light text-text-primary border-b border-accent pb-1"
            />
          </View>
          {/* Company */}
          <View className="mb-4">
            <Text className="text-text-secondary text-sm mb-1">Company</Text>
            <TextInput
              value={user.company}
              onChangeText={(text) => setUser(prev => ({ ...prev, company: text }))}
              editable
              placeholder="Company"
              placeholderTextColor="#999999"
              className="bg-primary-light text-text-primary border-b border-accent pb-1"
            />
          </View>
          {/* Address */}
          <View className="mb-4">
            <Text className="text-text-secondary text-sm mb-1">Address</Text>
            <TextInput
              value={user.address}
              onChangeText={(text) => setUser(prev => ({ ...prev, address: text }))}
              editable
              placeholder="Address"
              placeholderTextColor="#999999"
              multiline
              className="bg-primary-light text-text-primary border-b border-accent pb-1 h-20"
            />
          </View>
        </>
      ) : (
        <>
          <Text className="text-text-primary text-xl font-semibold text-center mb-1">{user.name}</Text>
          <Text className="text-text-secondary text-sm text-center mb-6">{user.email}</Text>
          <View className="mb-4 flex flex-col gap-6">
            <View className="flex-row items-center">
              <Ionicons name="business-outline" size={18} color="#FFA800" />
              <Text className="text-text-primary ml-2">{user.company}</Text>
            </View>
            <View className="flex-row items-center">
              <Ionicons name="call-outline" size={18} color="#FFA800" />
              <Text className="text-text-primary ml-2">{user.phone}</Text>
            </View>
            <View className="flex-row items-start">
              <Ionicons name="location-outline" size={18} color="#FFA800" className="mt-1" />
              <Text className="text-text-primary ml-2 flex-1">{user.address}</Text>
            </View>
          </View>
        </>
      )}

      <View className="flex-row justify-between border-t border-neutral-700 pt-4">
        <View>
          <Text className="text-text-secondary text-xs">Last Login</Text>
          <Text className="text-text-primary text-sm">{user.lastLogin}</Text>
        </View>
        <View>
          <Text className="text-text-secondary text-xs">Member Since</Text>
          <Text className="text-text-primary text-sm">{user.joinedDate}</Text>
        </View>
      </View>
    </View>
  );

  const renderSecuritySection = () => (
    <View className="bg-primary-light rounded-xl p-6 mb-6" style={styles.cardShadow}>
      <Text className="text-text-primary font-semibold mb-4">Security Settings</Text>
      {securityItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-row items-center justify-between py-4 ${
            index < securityItems.length - 1 ? 'border-b border-neutral-700' : ''
          }`}
          onPress={() => Alert.alert(item.label, `${item.action} not implemented.`)}
        >
          <View className="flex-row items-center">
            {item.icon}
            <View className="ml-3">
              <Text className="text-text-primary">{item.label}</Text>
              <Text className="text-text-secondary text-sm">{item.value}</Text>
            </View>
          </View>
          <Text className="text-accent text-sm">{item.action}</Text>
        </TouchableOpacity>
      ))}

      {/* Change password fields */}
      <TouchableOpacity
        className="flex-row items-center justify-between mt-4 mb-2"
        onPress={() => setShowPwdFields(prev => !prev)}
      >
        <View className="flex-row items-center">
          <Ionicons name="lock-closed-outline" size={20} color="#FFA800" />
          <Text className="text-text-primary ml-2">Change Password</Text>
        </View>
        <Ionicons
          name={showPwdFields ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={20}
          color="#999999"
        />
      </TouchableOpacity>
      {showPwdFields && (
        <>
          <View className="mb-4">
            <Text className="text-text-secondary text-sm mb-1">Current Password</Text>
            <TextInput
              value={passwords.current}
              onChangeText={val => setPasswords(p => ({ ...p, current: val }))}
              secureTextEntry
              placeholder="Current Password"
              placeholderTextColor="#999999"
              className="bg-primary-light text-text-primary border-b border-accent pb-1"
            />
          </View>
          <View className="mb-4">
            <Text className="text-text-secondary text-sm mb-1">New Password</Text>
            <TextInput
              value={passwords.new}
              onChangeText={val => setPasswords(p => ({ ...p, new: val }))}
              secureTextEntry
              placeholder="New Password"
              placeholderTextColor="#999999"
              className="bg-primary-light text-text-primary border-b border-accent pb-1"
            />
          </View>
          <View className="mb-4">
            <Text className="text-text-secondary text-sm mb-1">Confirm Password</Text>
            <TextInput
              value={passwords.confirm}
              onChangeText={val => setPasswords(p => ({ ...p, confirm: val }))}
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="#999999"
              className="bg-primary-light text-text-primary border-b border-accent pb-1"
            />
          </View>
          <TouchableOpacity
            className="bg-accent rounded-lg py-2 items-center mb-4"
            onPress={handleChangePassword}
          >
            <Text className="text-primary font-medium">Submit</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const renderBillingSection = () => (
    <View className="bg-primary-light rounded-xl p-6 mb-6" style={styles.cardShadow}>
      <Text className="text-text-primary font-semibold mb-4">Billing Information</Text>
      {billingItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className={`flex-row items-center justify-between py-4 ${
            index < billingItems.length - 1 ? 'border-b border-neutral-700' : ''
          }`}
          onPress={() => Alert.alert(item.label, 'Not implemented.')}
        >
          <View className="flex-row items-center">
            {item.icon}
            <View className="ml-3">
              <Text className="text-text-primary">{item.label}</Text>
              <Text className="text-text-secondary text-sm">{item.value}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={18} color="#999999" />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-primary">
          {/* Header */}
        <View className="bg-primary py-12 flex-row justify-between items-center px-4">
          <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} className="flex flex-row">
            <Ionicons name="menu" size={24} color="#FFA800" style={{ marginRight: 8 }} />
            <Text className="text-text-primary text-xl font-semibold">Billing</Text>
          </TouchableOpacity>
          {/* Optionally a "+" for new invoice */}
            <TouchableOpacity 
            onPress={() => {
              if (isEditing) {
                handleSaveProfile();
              } else {
                setIsEditing(true);
              }
            }}
            className="bg-primary px-4 py-2 rounded-full"
          >
            <Text className="text-white font-medium">
              {isEditing ? 'Save Changes' : <MaterialCommunityIcons name="pencil-outline" size={24} color="#FFA800" /> }
            </Text>
              
            </TouchableOpacity>
        </View>
      <ScrollView className="px-4 pt-4" contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Tabs */}
        <View className="flex-row mb-6 bg-primary-light rounded-full p-1" style={styles.cardShadow}>
          {['profile', 'security', 'billing'].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full ${
                activeTab === tab ? 'bg-accent' : ''
              }`}
            >
              <Text
                className={`text-center font-medium ${
                  activeTab === tab ? 'text-primary' : 'text-text-primary'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {activeTab === 'profile' && renderProfileSection()}
        {activeTab === 'security' && renderSecuritySection()}
        {activeTab === 'billing' && renderBillingSection()}

        {/* Additional Options */}
        <View className="bg-primary-light rounded-xl p-6 mb-6" style={styles.cardShadow}>
          <TouchableOpacity
            className="flex-row items-center justify-between py-3"
            onPress={() => Alert.alert('Sign Out', 'Not implemented')}
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="logout" size={20} color="#FFA800" />
              <Text className="text-text-primary ml-3">Sign Out</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#999999" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-between py-3 border-t border-neutral-700"
            onPress={() => Alert.alert('Account Preferences', 'Not implemented')}
          >
            <View className="flex-row items-center">
              <FontAwesome5 name="user-cog" size={18} color="#FFA800" />
              <Text className="text-text-primary ml-3">Account Preferences</Text>
            </View>
            <Ionicons name="chevron-forward-outline" size={18} color="#999999" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default ProfileScreen;
