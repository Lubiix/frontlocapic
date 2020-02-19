import React from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Button, ListItem, Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ChatScreen() {
  return (
    <View style={{flex:1}}>
       
        <ScrollView  style={{flex:1, marginTop: 15}}>
          <ListItem title="Parfait et toi ?" subtitle="Alex"/>
          <ListItem title="Coucou ça roule ?" subtitle="John"/>
        </ScrollView >

        <KeyboardAvoidingView behavior="padding" enabled>
            <Input
                containerStyle = {{marginBottom: 5}}
                placeholder='Your message'
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
            />
        </KeyboardAvoidingView>
        
    </View>
  );
}
