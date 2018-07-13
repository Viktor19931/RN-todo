import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';

import AuthScreen from './src/screens/Auth/Auth';
import SharePlaceScreen from './src/screens/SharePlace/SharePlace';
import FindPlaceScreen from './src/screens/FindPlace/FindPlace';
import PlaceDetailsScreen from './src/screens/PlaceDetails/PlaceDetails';
import CommingSoon from "./src/screens/ComingSoon/ComingSoon";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer";

import configureStore from './src/store/configureStore';

const store = configureStore();


// Register Screens
Navigation.registerComponent(
    "App.AuthScreen",
    () => AuthScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.SharePlaceScreen",
    () => SharePlaceScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.FindPlaceScreen",
    () => FindPlaceScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.PlaceDetailesScreen",
    () => PlaceDetailsScreen,
    store,
    Provider
);
Navigation.registerComponent(
    "App.SideDrawerScreen",
    () => SideDrawer,
    store,
    Provider
);
Navigation.registerComponent(
    "App.ComingSoonScreen",
    () => CommingSoon
);


// Start an App
Navigation.startSingleScreenApp({
    screen: {
        screen: "App.AuthScreen",
        title: "Login"
    }
});
