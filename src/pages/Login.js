import React, { Component} from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { userLogin, userAuth } from '../actions/userAction';
import Toast from 'react-native-simple-toast';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {},
        };
        this.validateForm = this.validateForm.bind(this);
    }
    handleEmail = (text) => {
        this.setState({email: text})
    }
    handlePassword = (text) => {
        this.setState({password: text})
    }
    // componentDidMount() {
    //   this.props.userAuth()
    // }
    validateForm() {
        const { errors } = this.state;
        const emailaddr = this.state.email;
        const pass = this.state.password;
        const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-0]?\w+)*(\.\w{2,3})+$)/;
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
          if(errors.email === '' && errors.pass === '') {
             const userinfo = {
               email:this.state.email,
               password:this.state.password
             }
             this.props.onLogin(userinfo)
          }
    }

   /* submitForm = async () => {
        let that = this;
        axios.post('http://192.168.43.235:8082/loginuser',{
            email: this.state.email,
            password: this.state.password
        })
        .then(function (response) {
            if (response && response.data && response.data._id) {
                that.props.navigation.navigate('Home');
            } else if(response && response.data && response.data.message) {
               Toast.show(response.data.message, 1000);
              }
        })
        .catch(function (error) {
            console.log(error);
        });
    } */
    componentDidUpdate(nextProps) {
      if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userAuth && this.props.userReducer.userAuthSuccess === true){
        this.props.navigation.navigate('Home');
      }
    }

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    }
    render() {
        const { errors } = this.state;
        return (
            <View style = {styles.container}>
              <Text style = {styles.logo}>Heyy App</Text>
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
       onPress = {this.goToRegister}>
         <Text style = {styles.linksText}>Register</Text>
       </TouchableOpacity>
            </View>
        );
    }
}
function mapStateToProps(state) {
  //console.log(state,"state")
  return{
    userReducer: state.userReducer
  };
}
function mapDispatchToToProps(dispatch) {
  return{
    onLogin:(userinfo) => dispatch(userLogin(userinfo)),
   // userAuth: () => dispatch(userAuth())
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