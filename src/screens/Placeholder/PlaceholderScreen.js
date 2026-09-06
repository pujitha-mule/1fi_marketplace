import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';

export const PlaceholderScreen = ({ route }) => {
  const title = route?.params?.title || 'Coming Soon';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="construct-outline" size={48} color={colors.textMuted} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>This feature is coming soon</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    ...typography.sectionTitle,
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
  },
});