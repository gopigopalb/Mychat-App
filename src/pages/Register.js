import React, { Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ToastAndroid } from 'react-native';
import { userRegister } from '../actions/userAction';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name : '',
            displayname: '',
            email: '',
            password: '',
            errors: {},
        };
        this.validateForm = this.validateForm.bind(this);
    }
    handleName = (text) => {
        this.setState({name: text})
    }
    handleDisplayName = (text) => {
        this.setState({displayname: text})
    }
    handleEmail = (text) => {
        this.setState({email: text})
    }
    handlePassword = (text) => {
        this.setState({password: text})
    }
    validateForm() {
        const { errors } = this.state;
        const name = this.state.name;
        const displayname = this.state.displayname;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-0]?\w+)*(\.\w{2,3})+$)/;
        if (name === '') {
            errors.name = 'Name cannot be empty.';
        } else {
            errors.name = '';
        }
        if (displayname === '') {
            errors.displayname = 'Display name cannot be empty.';
        } else {
            errors.displayname = '';
        }
        if(emailaddr === '') {
            errors.email='Email address cannot be empty.';
          }
          else if(emailaddr.length > 0 && !reg.test(emailaddr)) {
            errors.email="please provide correct email address";
    
          }
          else {
            errors.email='';
          }
    
          if(pass === '') {
            errors.pass="Password cannot be empty.";
          }
          else if(pass && pass.length < 5) {
            errors.pass="passs should be more than 5 charcters";
          }
          else{
            errors.pass='';
          }
          this.setState({ errors })
          if(errors.name === '' && errors.displayname === '' && errors.email === '' && errors.pass === '') {
              const userinfo = {
                name: this.state.name,
                displayname:this.state.displayname,
                email: this.state.email,
                password: this.state.password

              }
              this.props.onRegister(userinfo)
          }
    }

    componentDidUpdate(nextProps) {
        if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess === true){
          this.props.navigation.navigate('Home');
        }
      }
    goToLogin = () => {
        this.props.navigation.navigate('Login');
    }
    render() {
        const { errors } = this.state;
        return (
            <View style = {styles.container}>
                <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Name"
                placeholderTextColor = "white"
                autoCapitalize = "none"
                onChangeText = {this.handleName} />
                <Text style={styles.errorstyle}>{errors.name}</Text>
                <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Display Name"
                placeholderTextColor = "white"
                autoCapitalize = "none"
                onChangeText = {this.handleDisplayName} />
                <Text style={styles.errorstyle}>{errors.displayname}</Text>
                <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Email"
                placeholderTextColor = "white"
                autoCapitalize = "none"
                onChangeText = {this.handleEmail} />
                <Text style={styles.errorstyle}>{errors.email}</Text>
                <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Password"
                placeholderTextColor = "white"
                autoCapitalize = "none"
                onChangeText = {this.handlePassword} />
                <Text  style={styles.errorstyle} >{errors.pass}</Text>

                <TouchableOpacity 
            style = {styles.submitButton}
            onPress = {this.validateForm}
            >
        <Text style = {styles.submitButtonText}>Submit</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.links}
       onPress = {this.goToLogin}>
         <Text style = {styles.linksText}>Login</Text>
       </TouchableOpacity>
            </View>
        )
    }
}

function mapStateToProps(state) {
   // console.log(state,"state")
    return{
      userReducer: state.userReducer
    };
  }
  function mapDispatchToToProps(dispatch) {
    return{
      onRegister:(userinfo) => dispatch(userRegister(userinfo))
    };
  
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToToProps
  )(Register);

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems : 'center',
        flex : 1,
        backgroundColor: '#191970',
    },
    input: {
      width:"80%",
      backgroundColor:"#465881",
      borderRadius:25,
      height:50,
      marginBottom:20,
      justifyContent:"center",
      padding:15,
     
    color:"white"
    },
    submitButton:{
      width:"80%",
      backgroundColor:"#fb5b5a",
      borderRadius:25,
      height:50,
      alignItems:"center",
      justifyContent:"center",
      marginTop:40,
      marginBottom:10
    },
    submitButtonText:{
        color:'white',
        fontSize:18,
        fontWeight:'bold'
    },
    links: {
    fontSize: 15,
    margin: 15,
},
linksText: {
  color:"#fb5b5a"
},
logo:{
  fontWeight:"bold",
  fontSize:50,
  color:"#fb5b5a",
  marginBottom:40
},
errorstyle:{
  color:"white",
  height:30,
  marginTop:-20
}
});