import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommingSoon = (props) => (
    <View style={styles.container}>
        <Text>Comming Soon !</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
});

export default CommingSoon;
