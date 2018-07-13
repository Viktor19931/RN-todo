import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const defaultInput = (props) => (
    <TextInput
        underlineColorAndroid="transparent"
        autoCapitalize = "none"
        autoCorrect={false}
        { ...props }
        style={[
            styles.inputStyle,
            props.style,
            !props.valid && props.touched ? styles.invalid : null
        ]}
    />

);

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    inputStyle: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#eee',
        padding: 5,
        marginTop: 8,
        marginBottom: 8,
    },
    invalid: {
        backgroundColor: '#f9c0c0',
        borderColor: 'red'
    }
});

export default defaultInput;
