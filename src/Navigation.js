import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Chat from './pages/Chat';
import Welcome from './pages/Welcome';
const AuthStackNavigator = createStackNavigator({
    Welcome: {
        screen:Welcome
    },
    Login : {
        screen: Login,
    },
    Register : {
        screen: Register,
    }
},{ headerMode:'none'});

const AppStackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            title:"My Friends List",
            headerTitleAlign:"center",
            headerTintColor:"white",
            headerStyle: {
                backgroundColor: "#fb5b5a"
              }
        },
    },
    Chat: {
        screen: Chat,
        // navigationOptions:{
        //     title:"Chat Room",
        //     headerTitleAlign:"center",
        //     headerTintColor:"white",
        //     headerStyle: {
        //         backgroundColor: "#fb5b5a"
        //       }
        //}
    },

});
const SwitchNavigator = createSwitchNavigator(
    {
    AuthLoading: AuthStackNavigator,
    App: AppStackNavigator
},
{
    initialRouteName: 'AuthLoading',
});
const Navigation = createAppContainer(SwitchNavigator);
export default Navigation;