import { Navigation } from 'react-native-navigation';
import { Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === "ios" ? "ios-map" : "md-map", 30),
        Icon.getImageSource(Platform.OS === "ios" ? "ios-share" : "md-share", 30),
        Icon.getImageSource(Platform.OS === "ios" ? "ios-menu" : "md-menu", 30),
        Icon.getImageSource("md-help", 30)
    ]).then((sources) => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "App.FindPlaceScreen",
                    label: "Find Place",
                    title: "Find Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "App.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "App.ComingSoonScreen",
                    label: "Coming",
                    title: "Coming Soon",
                    icon: sources[3]
                }
            ],
            tabsStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            drawer: {
                left: {
                    screen: "App.SideDrawerScreen"
                }
            },
            appStyle: {
                tabBarSelectedButtonColor: "orange"
            },
        });
    });
};

export default startTabs;
