import React from 'react';
import ScanRNCamera from "./ScanRNCamera"
import { StyleSheet } from 'react-native';

export default function App() {
  return (
    <ScanRNCamera/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
