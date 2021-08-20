import React, {useState, useEffect} from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import socketIOClient from "socket.io-client";


const socket = socketIOClient("http://10.3.10.117:3000")

  function ChatScreen(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  // console.log('state currentMessage', currentMessage)
  const [listMessage, setListMessage] = useState([])
  // console.log('list Message', listMessage);
  

  useEffect(() =>{
    socket.on('sendMessage', (newMessage, pseudo)=>{
      console.log('newMessage',newMessage)
      const u263A = /:\)/;
      const newValue = newMessage.replace(u263A, "\u263A")
      const u2022 = /fuck/ig;
      const filterFuck = newValue.replace(u2022, "\u2022\u2022\u2022")
      console.log('pseudo',pseudo)
      setListMessage([...listMessage, {newMessage: filterFuck, pseudo}])
    })
  },[listMessage])

  const sendMessage = (currentMessage) => {
    // console.log('click send message detectéee')
    socket.emit("sendMessage", currentMessage, props.pseudo)
    setCurrentMessage("")
  }

  const onChangeMessage = (value) => {
    setCurrentMessage(value)
  }

  return (
    <View style={{flex:1}}>
       
       <ScrollView style={{flex:1, marginTop: 50}}>
          {listMessage.map((message, index)=>{
            return( 
        <ListItem key={index}>
              <ListItem.Content >
                <ListItem.Title>{message.newMessage}</ListItem.Title>
                <ListItem.Subtitle>{message.pseudo}</ListItem.Subtitle>
              </ListItem.Content>
        </ListItem>)
          })}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <Input
              containerStyle = {{marginBottom: 5}}
              placeholder='Your message'
              onChangeText={(value)=> onChangeMessage(value)}
              value={currentMessage}
          />
          <Button
              icon={
                  <Icon
                  name="envelope-o"
                  size={20}
                  color="#ffffff"
                  />
              } 
              title="Send"
              buttonStyle={{backgroundColor: "#eb4d4b"}}
              type="solid"
              onPress={() => sendMessage(currentMessage)}
          />
      </KeyboardAvoidingView>
        
    </View>
  );
}

function mapStateToProps(state){
  console.log('state', state)
  return {pseudo:state.pseudo}
}

export default connect(mapStateToProps,null)(ChatScreen);
