
import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
class  Welcome extends Component {

    goToLogin = () => {
        this.props.navigation.navigate('Login')
    }
    render() {
        return (
            
                <View style = {styles.container}>
                    <Text style= {styles.text}>Welcome to Chat App</Text>
                    <Text style={styles.text1}>Here is the place where you can connect with your family and friends </Text>
                    {
                        <TouchableOpacity style= {styles.submitButton} onPress={this.goToLogin}>
                            <Text style= {styles.button}>Let's Go</Text>
                        </TouchableOpacity>
                    
                    }
                    <Image source={require('./myimg1.png')}
                    style={{ width: 100, height: 100 , marginTop:80}} />
            </View>
          
        );
    }
}

  export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: 'black',
        alignItems:'center'
    },
    text:{
        fontSize:30,
        textAlign:'center',
        top:-20,
        marginBottom:50,
        color:'white'

    },
    text1: {
        color:'white',
        fontSize: 20,
        textAlign:'center',
        top:-40
    },
    button:{
            color:'black',
            fontSize:18,
            fontWeight:'bold',
            textAlign:'center'
        },   
        submitButton:  {
            width:'40%',
            backgroundColor:"white",
            borderRadius:25,
            height:50,
            alignItems:"center",
            justifyContent:'center',
            marginTop:40,
        }
                    
            
        
          
});
