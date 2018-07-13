import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';

const button = (props) => {
    const content = (
        <View style={
            [styles.btnStyle,
                {backgroundColor: props.color},
                props.disabled ? styles.disabledView : null
            ]}>
            <Text style={
                props.disabled ? styles.disabledView : null
            }>{props.children}</Text>
        </View>
    );
    if(props.disabled) {
        return content;
    }
    if (Platform.OS === "ios") {
        return (
            <TouchableOpacity onPress={props.onPress}>
                {content}
            </TouchableOpacity>
        );
    }

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            {content}
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000'
    },
    disabledView: {
        backgroundColor: '#eee',
        borderColor: '#aaa'
    },
    disabledText: {
        color: '#aaa'
    }
});

export default button;
