
import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { userList } from '../actions/userAction';
import { connect } from 'react-redux';

class  Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount() {
        this.props.onUserList();
    }

    goToChat = (userid, name) => {
        this.props.navigation.navigate('Chat',{userid: userid, name:name});
    }
    componentDidUpdate(nextProps) {
        
        if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess === true){
           this.setState({users:this.props.userReducer.userList}); 
         }
    }


    render() {
        const { users } = this.state;
        return (
            <View style = {styles.container}>
                {users && users.length>0?
                <View>
                    {users.map((item,index) =>
                    {
                        return(<TouchableOpacity onPress={()=>this.goToChat(item._id,item.name)} key={index}>
                            <Text style={styles.item}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )})}
            </View>:null}
            </View>
        );
    }
}
function mapStateToProps(state) {
    console.log(state,"State")
    return{
      userReducer: state.userReducer
    };
  }
  function mapDispatchToToProps(dispatch) {
    return{
      onUserList:() => dispatch(userList())
    };
  
  }
  export default connect(
    mapStateToProps,
    mapDispatchToToProps
  )(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#FFEBCD'
    },
    item: {
       padding:10,
        fontSize:18,
        height:44,
        color:'black'
    }
});
