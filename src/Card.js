import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
class Card extends Component {
  render() {
    return (
      <View style={styles.card}>
        <View
          style={{
            alignItems: "center",
            height: 200
          }}>
          <Image
            style={styles.cardImage}
            resizeMode="cover"
            source={{ uri: this.props.uri }}
          />
        </View>
        <Text style={styles.cardText}>{this.props.title}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{this.props.btnText}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#3498db",
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 10
  },
  card: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    padding: 10,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    marginHorizontal: 10
  },
  cardImage: {
    flex: 1,
    alignSelf: "stretch",
    width: undefined,
    height: undefined
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  }
});
export default Card;
