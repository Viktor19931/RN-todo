import React, { Component } from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import MainText from "../../components/UI/MainText/MainText";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import Button from "../../components/UI/Button/Button";
import PlaceInput from "../../components/PlaceInput/PlaceInput";
import PickImage from "../../components/PickImage/PickImage";
import PickLocation from "../../components/PickLocarion/PickLocation";
import validate from "../../utility/validation";

class SharePlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: 'orange'
    };

    state = {
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            },
            location: {
                value: null,
                valid: false
            },
            image: {
                value: null,
                valid: false
            }
        }
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === "NavBarButtonPress") {
            if (event.id === "sideDrawerToggle") {
                this.props.navigator.toggleDrawer({
                    side: "left"
                });
            }
        }
    };

    placeAddedHandler = () => {
        this.props.onAddPlace(
            this.state.controls.placeName.value,
            this.state.controls.location.value,
            this.state.controls.image.value
        );
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: ""
                    }
                }
            };
        });
    };

    placeNameChangeHandler = val => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            };
        });
    };

    locationPickedHandler = location => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    location: {
                        value: location,
                        valid: true
                    }
                }
            };
        })
    };

    imagePickedHandler = image => {
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    image: {
                        value: image,
                        valid: true
                    }
                }
            };
        });
    };

    render() {
        let submitButton = (
            <Button
                onPress={this.placeAddedHandler}
                disabled={
                    !this.state.controls.placeName.valid ||
                    !this.state.controls.location.valid ||
                    !this.state.controls.image.valid
                }
            >Share the Place</Button>
        );
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator size="large"/>;
        }
        return (
            <KeyboardAvoidingView  style={{flex: 1}} behavior="padding">
                <ScrollView>
                    <View style={styles.container}>
                        <MainText>
                          <HeadingText>Share a place with us !</HeadingText>
                        </MainText>

                        <PickImage onImagePicked={this.imagePickedHandler}/>

                        <PickLocation onLocationPick={this.locationPickedHandler}/>

                        <PlaceInput
                            placeData={this.state.controls.placeName}
                            onChangeText={this.placeNameChangeHandler}
                        />

                        <View style={styles.buttonStyle}>
                            {submitButton}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center'
    },
    placeholderStyle: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#eee',
        width: '100%',
        height: 150
    },
    buttonStyle: {
        margin: 8
    },
    imagePreview: {
        height: '100%',
        width: '100%'
    }
});

const mapStateToProps = state => {
  return {
      isLoading: state.ui.isLoading
  }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
