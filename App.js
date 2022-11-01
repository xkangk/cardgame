import { Text, View } from 'react-native';
import styles from './styles/styles';
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Gameboard from './components/Gameboard';


export default function App() {
  return (
    <View style={styles.container}>

        <Header />
        <Gameboard />
        <Footer />

    </View>
  );
};
