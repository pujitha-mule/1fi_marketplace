import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useMarketplace } from '../../hooks/useMarketplace';
import { ProductCard } from '../../components/marketplace/ProductCard';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const MarketplaceScreen = () => {
  const navigation = useNavigation();
  const { products, loading, error, refreshing, refresh } = useMarketplace();

  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.centeredText}>Loading products...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Ionicons name="cloud-offline-outline" size={48} color={colors.textMuted} />
        <Text style={[styles.centeredText, styles.errorText]}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={refresh}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (products.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Ionicons name="cart-outline" size={48} color={colors.textMuted} />
        <Text style={styles.centeredText}>No products available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>1Fi Marketplace</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Shop today</Text>
          <Text style={styles.bannerSubtitle}>Pay later with 0% interest</Text>
          <View style={styles.bannerBadge}>
            <Text style={styles.bannerBadgeText}>0% Interest</Text>
          </View>
        </View>
        <Ionicons name="cart-outline" size={48} color="rgba(255,255,255,0.2)" />
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => handleProductPress(item.id)}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    ...typography.sectionTitle,
    color: colors.text,
  },
  banner: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerContent: {
    flex: 1,
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  bannerBadgeText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '700',
  },
  productGrid: {
    padding: 8,
    paddingBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
  },
  centeredText: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 12,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  retryButtonText: {
    ...typography.button,
    color: colors.surface,
  },
});