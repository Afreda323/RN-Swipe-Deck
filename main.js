import Expo from "expo";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  UIManager,
  LayoutAnimation
} from "react-native";
import Deck from "./src/Deck";
import Card from "./src/Card";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  renderNoMoreCards() {
    return (
      <View style={styles.card}>
        <Text style={styles.cardText}>No More Cards</Text>
      </View>
    );
  }
  renderCard(item) {
    return (
      <Card key={item.id} title={item.text} btnText="Click Me" uri={item.uri} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#f0f0f0"
  },
  card: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    padding: 10,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    marginHorizontal: 10,
    marginBottom: 10
  },
  cardText: {
    fontSize: 20,
    padding: 10,
    alignSelf: "center"
  }
});

Expo.registerRootComponent(App);

const DATA = [
  {
    id: 2,
    text: "Card #2",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg"
  },
  {
    id: 1,
    text: "Card #1",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg"
  },
  {
    id: 3,
    text: "Card #3",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg"
  },
  {
    id: 4,
    text: "Card #4",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg"
  },
  {
    id: 5,
    text: "Card #5",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg"
  },
  {
    id: 6,
    text: "Card #6",
    uri: "http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg"
  },
  {
    id: 7,
    text: "Card #7",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg"
  },
  {
    id: 8,
    text: "Card #8",
    uri: "http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg"
  }
];
