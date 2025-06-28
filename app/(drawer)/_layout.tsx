import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function IndexDrawerLayout() {
  // Custom drawer header with Winter logo
  const DrawerHeader = () => (
    <View style={styles.drawerHeader}>
      <View style={styles.logoContainer}>
        <Text style={[styles.logoText, styles.yellowText]}>Win</Text>
        <Text style={[styles.logoText, styles.whiteText]}>ter</Text>
      </View>
      <Text style={styles.drawerSubtitle}>Management Dashboard</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            borderTopEndRadius: 0,
            borderEndEndRadius: 0,
            backgroundColor: '#1A1D25',
          },
          drawerActiveTintColor: '#FFA800',
          drawerInactiveTintColor: '#8A8F9D',
          drawerLabelStyle: {
            marginLeft: -16,
            fontSize: 16,
            fontWeight: '500',
          },
          drawerItemStyle: {
            borderRadius: 8,
            paddingHorizontal: 12,
          },
          drawerActiveBackgroundColor: 'rgba(255, 168, 0, 0.1)',
        }}
        drawerContent={(props) => {
          return (
            <View style={{ flex: 1 }}>
              {/* Custom drawer content */}
              <DrawerContentScrollView {...props} contentContainerStyle={{ flexGrow: 1 }}>
                <DrawerHeader />
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
            </View>
          );
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: '',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} marginRight={12} />
            ),
          }}
        />
        <Drawer.Screen
          name="analytics"
          options={{
            drawerLabel: 'Analytics',
            title: 'Analytics & Insights',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="analytics-outline" size={size} color={color} marginRight={12} />
            ),
          }}
        />
        <Drawer.Screen
          name="notifications"
          options={{
            drawerLabel: 'Notifications',
            title: 'Notifications',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="notifications-outline" size={size} color={color} marginRight={12} />
            ),
          }}
        />
        <Drawer.Screen
          name="resources"
          options={{
            drawerLabel: 'Resources',
            title: 'Resources',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="document-text-outline" size={size} color={color} marginRight={12} />
            ),
          }}
        />
        <Drawer.Screen
          name="packages"
          options={{
            drawerLabel: 'Packages',
            title: 'Packages & Services',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="cube-outline" size={size} color={color} marginRight={12} />
            ),
          }}
        />
        <Drawer.Screen
          name="plan"
          options={{
            drawerLabel: 'Plan',
            title: 'My Hosting Plan',
            drawerIcon: ({ size, color }) => (
              <Ionicons name="calendar-outline" size={size} color={color} marginRight={12} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#0F1218',
    borderBottomWidth: 1,
    borderBottomColor: '#252A34',
  },
  logoContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '800',
  },
  yellowText: {
    color: '#FFA800',
  },
  whiteText: {
    color: '#FFFFFF',
  },
  drawerSubtitle: {
    color: '#8A8F9D',
    fontSize: 14,
  },
});