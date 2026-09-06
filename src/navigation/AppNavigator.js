import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { ShopScreen } from '../screens/Shop/ShopScreen';
import { MarketplaceScreen } from '../screens/Marketplace/MarketplaceScreen';
import { ProductDetailsScreen } from '../screens/Marketplace/ProductDetailsScreen';
import { ConfirmationScreen } from '../screens/Confirmation/ConfirmationScreen';
import { PlaceholderScreen } from '../screens/Placeholder/PlaceholderScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ShopStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ShopMain" component={ShopScreen} />
      <Stack.Screen name="Marketplace" component={MarketplaceScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
      <Stack.Screen 
        name="TopBrands" 
        component={PlaceholderScreen}
        initialParams={{ title: 'Top Brands' }}
      />
      <Stack.Screen 
        name="NearbyStores" 
        component={PlaceholderScreen}
        initialParams={{ title: 'Nearby Stores' }}
      />
    </Stack.Navigator>
  );
};

const PlaceholderTab = ({ title }) => {
  return () => (
    <PlaceholderScreen 
      route={{ params: { title } }} 
    />
  );
};

export const AppNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              const icons = {
                Home: focused ? 'home' : 'home-outline',
                Shop: focused ? 'storefront' : 'storefront-outline',
                'EMI Dues': focused ? 'cash' : 'cash-outline',
                Limit: focused ? 'card' : 'card-outline',
                Profile: focused ? 'person' : 'person-outline',
              };
              return <Ionicons name={icons[route.name]} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textMuted,
            headerShown: false,
            tabBarStyle: {
              paddingBottom: 4,
              paddingTop: 4,
              height: 60,
              backgroundColor: colors.surface,
              borderTopWidth: 1,
              borderTopColor: colors.border,
            },
          })}
        >
          <Tab.Screen name="Home" component={PlaceholderTab({ title: 'Home' })} />
          <Tab.Screen name="Shop" component={ShopStack} />
          <Tab.Screen name="EMI Dues" component={PlaceholderTab({ title: 'EMI Dues' })} />
          <Tab.Screen name="Limit" component={PlaceholderTab({ title: 'Limit' })} />
          <Tab.Screen name="Profile" component={PlaceholderTab({ title: 'Profile' })} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};