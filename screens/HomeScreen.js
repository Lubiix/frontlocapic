import React, { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, Text } from "react-native";

import { Button, Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect } from "react-redux";

function HomeScreen(props) {
  const [pseudo, setPseudo] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("pseudo", function (error, data) {
      // console.log("data", data);
      if(data != null){
        setPseudo(data);
        setIsConnected(true)
      }
    });
  }, []);

  const handleGoToMap = () => {
    {
      props.onSubmitPseudo(pseudo);
      props.navigation.navigate("BottomNavigator", { screen: "Map" });
      // console.log("pseudo", pseudo);
      AsyncStorage.setItem("pseudo", pseudo);
    }
  };

  const buttonPseudo = () => {
    AsyncStorage.getItem("pseudo", function (error, data) {
      // console.log("pseudo local storage", data);
      setPseudo(data);
    });
  };

  const deletePseudo = () => {
    AsyncStorage.clear();
    // AsyncStorage.removeItem("pseudo")
  };

  if (isConnected) {
    return (
      <ImageBackground
        source={require("../assets/home.jpg")}
        style={styles.container}
      >
        <Text>Welcome back {pseudo}</Text>

        <Button
          icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
          title="Go to Map"
          type="solid"
          onPress={() => handleGoToMap()}
        />

        <Button
          icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
          title="Local pseudo"
          type="solid"
          onPress={() => buttonPseudo()}
        />

  <Button
    icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
    title="Delete pseudo"
    type="solid"
    onPress={() => deletePseudo()}
  />
      </ImageBackground>
    );
  }


  if (!isConnected) {
  return (
    <ImageBackground
      source={require("../assets/home.jpg")}
      style={styles.container}
    >
      <Input
        containerStyle={{ marginBottom: 25, width: "70%" }}
        inputStyle={{ marginLeft: 10 }}
        placeholder="John"
        leftIcon={<Icon name="user" size={24} color="#eb4d4b" />}
        onChangeText={(val) => setPseudo(val)}
      />

      <Button
        icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
        title="Go to Map"
        type="solid"
        onPress={() => handleGoToMap()}
      />

      <Button
        icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
        title="Local pseudo"
        type="solid"
        onPress={() => buttonPseudo()}
      />
      <Button
        icon={<Icon name="arrow-right" size={20} color="#eb4d4b" />}
        title="Delete pseudo"
        type="solid"
        onPress={() => deletePseudo()}
      />
    </ImageBackground>
  );
}
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapDispatchToProps(dispatch) {
  return {
    onSubmitPseudo: function (pseudo) {
      dispatch({ type: "savePseudo", pseudo: pseudo });
    },
  };
}

export default connect(null, mapDispatchToProps)(HomeScreen);
