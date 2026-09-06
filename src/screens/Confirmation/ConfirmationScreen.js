import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const ConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product, emiPlan, selectedVariants } = route.params;

  const getVariantDisplay = () => {
    if (!selectedVariants || !product) return '';
    return Object.entries(selectedVariants)
      .map(([name, id]) => {
        const variant = product.variants?.find(v => v.id === id);
        return variant ? `${name}: ${variant.value}` : null;
      })
      .filter(Boolean)
      .join(' • ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Confirmation</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={72} color={colors.success} />
        </View>

        <Text style={styles.title}>You're ready to proceed!</Text>
        <Text style={styles.subtitle}>Your EMI plan has been selected</Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Product</Text>
            <Text style={styles.detailValue}>{product?.name}</Text>
          </View>

          {getVariantDisplay() && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Variant</Text>
              <Text style={styles.detailValue}>{getVariantDisplay()}</Text>
            </View>
          )}

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>EMI Plan</Text>
            <Text style={styles.detailValue}>
              {emiPlan?.months} months
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monthly Payment</Text>
            <Text style={styles.detailValue}>
              ₹{emiPlan?.monthlyAmount.toLocaleString()}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount</Text>
            <Text style={styles.detailValue}>
              ₹{emiPlan?.totalAmount.toLocaleString()}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Interest</Text>
            <Text style={[styles.detailValue, { color: colors.success }]}>
              {emiPlan?.interestRate === 0 ? '0% Interest' : `${emiPlan?.interestRate}%`}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.navigate('ShopMain')}
        >
          <Text style={styles.continueButtonText}>Continue Shopping</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  successIcon: {
    marginTop: 32,
    marginBottom: 16,
  },
  title: {
    ...typography.screenTitle,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
  },
  detailsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    ...typography.body,
    color: colors.textSecondary,
  },
  detailValue: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginTop: 24,
  },
  continueButtonText: {
    ...typography.button,
    color: colors.surface,
  },
});