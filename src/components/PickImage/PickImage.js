import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import ImagePicker from "react-native-image-picker";

import Button from "../UI/Button/Button";
import imagePlaceholder from "../../assets/beautiful-place.jpg";


class PickImage extends Component {
    state = {
        pickedImage: null
    };

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick an Image"}, response => {
            if (response.didCancel) {
                console.log("User canceled !")
            } else if (response.error) {
                console.log("Error ", response.error)
            } else {
                this.setState({
                    pickedImage: {uri: response.uri}
                });
                this.props.onImagePicked({uri: response.uri, base64: response.data})
            }
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholderStyle}>
                    <Image source={this.state.pickedImage} style={styles.previewImage}/>
                </View>
                <View style={styles.buttonStyle}>
                    <Button onPress={this.pickImageHandler}>Pick Image</Button>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center'
    },
    placeholderStyle: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '80%',
        height: 150
    },
    buttonStyle: {
        margin: 8
    },
    previewImage: {
        height: '100%',
        width: '100%'
    }
});

export default PickImage;
