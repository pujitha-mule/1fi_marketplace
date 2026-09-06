import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const ShopScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.banner}>
            <View>
              <Text style={styles.bannerTitle}>Shop today</Text>
              <Text style={styles.bannerSubtitle}>Pay later with 0% interest</Text>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>Powered by 1Fi</Text>
              </View>
            </View>
            <Ionicons name="cart-outline" size={40} color="rgba(255,255,255,0.2)" />
          </View>
        </View>

        {/* Three Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('TopBrands', { title: 'Top Brands' })}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="ribbon-outline" size={28} color={colors.primary} />
            </View>
            <Text style={styles.optionTitle}>Top Brands</Text>
            <Text style={styles.optionSubtitle}>Coming soon</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('NearbyStores', { title: 'Nearby Stores' })}
          >
            <View style={styles.optionIcon}>
              <Ionicons name="location-outline" size={28} color={colors.primary} />
            </View>
            <Text style={styles.optionTitle}>Nearby Stores</Text>
            <Text style={styles.optionSubtitle}>Coming soon</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.optionCard, styles.marketplaceCard]}
            onPress={() => navigation.navigate('Marketplace')}
          >
            <View style={[styles.optionIcon, styles.marketplaceIcon]}>
              <Ionicons name="cart-outline" size={28} color={colors.surface} />
            </View>
            <Text style={[styles.optionTitle, styles.marketplaceTitle]}>
              1Fi Marketplace
            </Text>
            <Text style={[styles.optionSubtitle, styles.marketplaceSubtitle]}>
              Shop on 0% interest
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <Text style={styles.searchText}>Search online stores...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.surface,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    ...typography.screenTitle,
    color: colors.text,
  },
  bannerContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  banner: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerTitle: {
    ...typography.sectionTitle,
    color: colors.surface,
  },
  bannerSubtitle: {
    ...typography.body,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  bannerBadge: {
    marginTop: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  bannerBadgeText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '700',
  },
  optionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 16,
  },
  optionCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primaryBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionTitle: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  optionSubtitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  marketplaceCard: {
    backgroundColor: colors.primary,
  },
  marketplaceIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  marketplaceTitle: {
    color: colors.surface,
  },
  marketplaceSubtitle: {
    color: 'rgba(255,255,255,0.8)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchText: {
    ...typography.body,
    color: colors.textMuted,
    marginLeft: 8,
  },
});