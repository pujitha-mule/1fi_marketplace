import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useMarketplace } from '../../hooks/useMarketplace';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const ProductDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;
  const { getProduct } = useMarketplace();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedEMI, setSelectedEMI] = useState(null);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProduct(productId);
      setProduct(data);
    } catch (err) {
      setError(err.message || 'Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const getVariantGroups = (variants) => {
    const groups = {};
    variants.forEach(v => {
      if (!groups[v.name]) groups[v.name] = [];
      groups[v.name].push(v);
    });
    return groups;
  };

  const handleVariantSelect = (variantName, variantId) => {
    setSelectedVariants(prev => ({
      ...prev,
      [variantName]: variantId,
    }));
  };

  const handleProceed = () => {
    if (selectedEMI && product) {
      const emiPlan = product.emiPlans.find(e => e.id === selectedEMI);
      navigation.navigate('Confirmation', {
        product,
        emiPlan,
        selectedVariants,
      });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.centeredText}>Loading product...</Text>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
        <Text style={[styles.centeredText, styles.errorText]}>
          {error || 'Product not found'}
        </Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadProduct}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const variantGroups = getVariantGroups(product.variants || []);
  const allVariantsSelected = Object.keys(variantGroups).every(
    group => selectedVariants[group]
  );
  const isProceedDisabled = !selectedEMI || !allVariantsSelected;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {imageError ? (
            <View style={styles.imageFallback}>
              <Text style={styles.imageFallbackText}>🛍</Text>
            </View>
          ) : (
            <Image
              source={{ uri: product.images[0] }}
              style={styles.productImage}
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.name}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{product.price.toLocaleString()}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>
                ₹{product.originalPrice.toLocaleString()}
              </Text>
            )}
          </View>

          {product.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>★ {product.rating}</Text>
              <Text style={styles.reviewText}>({product.reviews} reviews)</Text>
            </View>
          )}

          <Text style={styles.description}>{product.description}</Text>
        </View>

        {Object.keys(variantGroups).length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Variant</Text>
            {Object.entries(variantGroups).map(([name, variants]) => (
              <View key={name} style={styles.variantGroup}>
                <Text style={styles.variantLabel}>{name}</Text>
                <View style={styles.variantsContainer}>
                  {variants.map((variant) => {
                    const isSelected = selectedVariants[name] === variant.id;
                    return (
                      <TouchableOpacity
                        key={variant.id}
                        style={[
                          styles.variantOption,
                          isSelected && styles.variantSelected,
                          !variant.available && styles.variantDisabled,
                        ]}
                        onPress={() => variant.available && handleVariantSelect(name, variant.id)}
                        disabled={!variant.available}
                      >
                        <Text style={[
                          styles.variantText,
                          isSelected && styles.variantTextSelected,
                          !variant.available && styles.variantTextDisabled,
                        ]}>
                          {variant.value}
                        </Text>
                        {isSelected && (
                          <Ionicons name="checkmark" size={16} color={colors.primary} />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose EMI Plan</Text>
          <Text style={styles.emiSubtitle}>Pay in easy monthly installments</Text>
          
          {product.emiPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.emiOption,
                selectedEMI === plan.id && styles.emiSelected,
              ]}
              onPress={() => setSelectedEMI(plan.id)}
            >
              <View style={styles.emiHeader}>
                <View style={styles.emiRadio}>
                  {selectedEMI === plan.id && <View style={styles.emiRadioSelected} />}
                </View>
                <Text style={styles.emiMonths}>{plan.months} Months</Text>
                {plan.interestRate === 0 && (
                  <View style={styles.zeroInterestBadge}>
                    <Text style={styles.zeroInterestText}>0% Interest</Text>
                  </View>
                )}
              </View>
              <Text style={styles.emiAmount}>
                ₹{plan.monthlyAmount.toLocaleString()}/month
              </Text>
              <Text style={styles.emiTotal}>
                Total: ₹{plan.totalAmount.toLocaleString()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {product.features && product.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerContent}>
          {selectedEMI && product && (
            <View style={styles.selectedEMISummary}>
              <Text style={styles.selectedEMITitle}>Selected EMI</Text>
              <Text style={styles.selectedEMIAmount}>
                ₹{product.emiPlans.find(e => e.id === selectedEMI)?.monthlyAmount.toLocaleString()}/month
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.proceedButton,
              isProceedDisabled && styles.proceedButtonDisabled,
            ]}
            onPress={handleProceed}
            disabled={isProceedDisabled}
          >
            <Text style={styles.proceedButtonText}>
              {isProceedDisabled ? 'Select Variant & EMI' : 'Proceed with EMI'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
  imageContainer: {
    backgroundColor: colors.background,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
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
    fontSize: 60,
    opacity: 0.3,
  },
  infoContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    marginVertical: 8,
  },
  brand: {
    ...typography.caption,
    color: colors.primary,
  },
  name: {
    ...typography.screenTitle,
    color: colors.text,
    marginTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    ...typography.price,
    color: colors.text,
  },
  originalPrice: {
    ...typography.body,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  ratingText: {
    ...typography.body,
    color: colors.rating,
    fontWeight: '600',
  },
  reviewText: {
    ...typography.body,
    color: colors.textMuted,
    marginLeft: 4,
  },
  description: {
    ...typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
    marginTop: 12,
  },
  section: {
    backgroundColor: colors.surface,
    padding: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: 12,
  },
  emiSubtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  variantGroup: {
    marginBottom: 12,
  },
  variantLabel: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 8,
  },
  variantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  variantOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: colors.border,
    marginRight: 8,
    marginBottom: 8,
  },
  variantSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBg,
  },
  variantDisabled: {
    borderColor: colors.border,
    backgroundColor: colors.background,
    opacity: 0.5,
  },
  variantText: {
    ...typography.body,
    color: colors.text,
  },
  variantTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  variantTextDisabled: {
    color: colors.textMuted,
  },
  emiOption: {
    backgroundColor: colors.background,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: 8,
  },
  emiSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryBg,
  },
  emiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emiRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emiRadioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  emiMonths: {
    ...typography.productName,
    color: colors.text,
    flex: 1,
  },
  emiAmount: {
    ...typography.emiAmount,
    color: colors.primary,
    marginTop: 4,
    marginLeft: 32,
  },
  emiTotal: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 2,
    marginLeft: 32,
  },
  zeroInterestBadge: {
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  zeroInterestText: {
    ...typography.caption,
    color: colors.surface,
    fontWeight: '700',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  featureText: {
    ...typography.body,
    color: colors.textSecondary,
    flex: 1,
  },
  footer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedEMISummary: {
    flex: 1,
    marginRight: 12,
  },
  selectedEMITitle: {
    ...typography.bodySmall,
    color: colors.textMuted,
  },
  selectedEMIAmount: {
    ...typography.productName,
    color: colors.primary,
  },
  proceedButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
  },
  proceedButtonDisabled: {
    backgroundColor: colors.disabled,
  },
  proceedButtonText: {
    ...typography.button,
    color: colors.surface,
  },
});