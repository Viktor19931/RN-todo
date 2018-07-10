import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button } from 'react-native';

class PlaceInput extends Component {
    state = {
        placeName: ""
    };

    placeNameChangedHandler = val => {
        this.setState({
            placeName: val
        });
    };

    onButtonPress = () => {
        if (this.state.placeName.trim() === '') {
            return;
        }

        this.props.onPlaceAdded(this.state.placeName);
        this.setState({
            placeName: ""
        });
    };

    render() {
        return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.placeInput}
                    placeholder="An awesome place"
                    value={this.state.placeName}
                    onChangeText={this.placeNameChangedHandler}
                />
                <Button
                    onPress={this.onButtonPress}
                    style={styles.placeButton}
                    title='Add'
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    placeInput: {
        width: "70%"
    },
    placeButton: {
        width: "30%"
    }
});

export default PlaceInput;
