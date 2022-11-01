import { View, Text } from 'react-native';
import React from 'react';
import styles from '../styles/styles';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.author}>|| Katariina Järvenpää || 2022 ||</Text>
    </View>
  )
}