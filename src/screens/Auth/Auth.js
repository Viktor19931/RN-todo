import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    ImageBackground,
    Dimensions,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';

import DefaultInput from "../../components/UI/DefaultInput/DefaultInput";
import HeadingText from "../../components/UI/HeadingText/HeadingText";
import MainText from "../../components/UI/MainText/MainText";
import Button from "../../components/UI/Button/Button";
import backgroundImage from "../../assets/background.jpg";
import validate from '../../utility/validation';
import { tryAuth } from '../../store/actions/auth';

class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: 'login',
        controls: {
            email: {
               value: "",
               valid: false,
                validationRules: {
                   isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
            }
        }
    };

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === 'login' ? 'signup' : 'login'
            };
        });
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    };

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles)
    };

    updateStyles = (dims) => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    authHandler = () => {
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        };

        this.props.onTryAuth(authData, this.state.authMode);
    };

    updateInputState = (key, value) => {
        let connectedValue = {};
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            };
        }
        if (key === 'password') {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            };
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid: key === 'password'
                            ? validate(
                                prevState.controls.confirmPassword.value,
                                prevState.controls.confirmPassword.validationRules,
                                connectedValue
                            )
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(
                            value,
                            prevState.controls[key].validationRules,
                            connectedValue
                        ),
                        touched: true
                    },
                },
            };
        });
    };

    render() {
        const { password, email, confirmPassword } = this.state.controls;

        let headingText = null;
        let confirmPasswordControl = null;
        let submitButton = (
            <Button
                color={'#29aaf4'}
                onPress={this.authHandler}
                disabled={
                    !confirmPassword.valid &&
                    this.state.authMode === 'signup' ||
                    !password.valid ||
                    !email.valid
                }
            >Submit</Button>
        );
        if (this.state.viewMode === "portrait") {
            headingText = (
                <MainText>
                    <HeadingText>
                        Please Log In
                    </HeadingText>
                </MainText>
            );
        }
        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={
                    this.state.viewMode === "portrait"
                        ? styles.portraitPasswordWrapper
                        : styles.landscapePasswordWrapper
                }>
                    <DefaultInput
                        placeholder="Confirm Password"
                        style={styles.inputStyle}
                        value={confirmPassword.value}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                        valid={confirmPassword.valid}
                        touched={confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            );
        }
        if (this.props.isLoading) {
            submitButton = <ActivityIndicator size="large" color="white"/>;
        }
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundStyle}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                    <View style={styles.contentWrapper}>
                        {headingText}
                        <Button
                            color={'#29aaf4'}
                            onPress={this.switchAuthModeHandler}
                        >
                            Switch to {this.state.authMode === 'login' ? 'Sing Up' : 'Login'}
                        </Button>
                            <View style={styles.inputContainer}>
                                <DefaultInput
                                    placeholder="Your E-Mail Address"
                                    style={styles.inputStyle}
                                    value={email.value}
                                    onChangeText={(val) => this.updateInputState('email', val)}
                                    valid={email.valid}
                                    touched={email.touched}
                                    keyboardType={'email-address'}
                                />
                                <View style={
                                    this.state.viewMode === "portrait" ||
                                    this.state.authMode === "login"
                                        ? styles.portraitPasswordContainer
                                        : styles.landscapePasswordContainer
                                }>
                                    <View style={
                                        this.state.viewMode === "portrait" ||
                                        this.state.authMode === "login"
                                            ? styles.portraitPasswordWrapper
                                            : styles.landscapePasswordWrapper
                                    }>
                                        <DefaultInput
                                            placeholder="Password"
                                            style={styles.inputStyle}
                                            value={password.value}
                                            onChangeText={(val) => this.updateInputState('password', val)}
                                            valid={password.valid}
                                            touched={password.touched}
                                            secureTextEntry
                                        />
                                    </View>
                                    {confirmPasswordControl}
                                </View>
                            </View>
                        {submitButton}
                    </View>
                    </TouchableWithoutFeedback>

                </KeyboardAvoidingView>
            </ImageBackground>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    landscapePasswordContainer: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection: 'column',
        justifyContent: "flex-start"
    },
    landscapePasswordWrapper: {
        width: "45%"
    },
    portraitPasswordWrapper: {
        width: "100%"
    },
    inputStyle: {
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    backgroundStyle: {
        flex: 1
    },
    contentWrapper: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }
});

const mapDispatchToProps = dispatch => {
    return {
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode))
    };
};

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
