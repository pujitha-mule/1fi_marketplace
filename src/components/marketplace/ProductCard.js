import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export const ProductCard = ({ product, onPress }) => {
  const [imageError, setImageError] = useState(false);

  const lowestEMI = product.emiPlans.length > 0
    ? product.emiPlans.reduce((min, plan) =>
        plan.monthlyAmount < min.monthlyAmount ? plan : min
      )
    : null;

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`View ${product.name}`}
    >
      <View style={styles.imageContainer}>
        {imageError || !product.images?.[0] ? (
          <View style={styles.imageFallback}>
            <Text style={styles.imageFallbackText}>🛍</Text>
          </View>
        ) : (
          <Image
            source={{ uri: product.images[0] }}
            style={styles.image}
            resizeMode="contain"
            onError={handleImageError}
            accessibilityLabel={`${product.name} product image`}
          />
        )}

        {!product.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.brand} numberOfLines={1}>
          {product.brand}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>
          ₹{product.price.toLocaleString('en-IN')}
        </Text>
        {lowestEMI && (
          <Text style={styles.emiText}>
            EMI ₹{lowestEMI.monthlyAmount.toLocaleString('en-IN')}/mo
          </Text>
        )}
        {product.rating !== undefined && (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>
              ★ {product.rating.toFixed(1)}
            </Text>
            {product.reviews !== undefined && (
              <Text style={styles.reviewText}>
                ({product.reviews})
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    margin: 8,
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    height: 160,
    padding: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageFallbackText: {
    fontSize: 40,
    opacity: 0.5,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  outOfStockText: {
    ...typography.caption,
    color: colors.surface,
  },
  content: {
    padding: 12,
  },
  brand: {
    ...typography.caption,
    color: colors.primary,
  },
  name: {
    ...typography.productName,
    color: colors.text,
    marginTop: 3,
  },
  price: {
    ...typography.price,
    color: colors.text,
    marginTop: 6,
  },
  emiText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ratingText: {
    ...typography.bodySmall,
    color: colors.rating,
    fontWeight: '600',
  },
  reviewText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    marginLeft: 4,
  },
});