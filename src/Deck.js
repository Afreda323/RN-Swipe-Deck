import React, { Component } from "react";
import {
  View,
  Animated,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  Text
} from "react-native";
const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.35 * SCREEN_WIDTH;
const DURATION = 250;

class Deck extends Component {
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  };
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition(gesture);
        }
      }
    });
    this.state = { panResponder, position, index: 0 };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }
  forceSwipe(direction) {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: DURATION
    }).start(() => this.onSwipeComplete(direction));
  }
  onSwipeComplete(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];
    const x = direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });
  }
  resetPosition(gesture) {
    Animated.sequence([
      Animated.decay(this.state.position, {
        // coast to a stop
        velocity: { x: gesture.vx, y: gesture.vy }, // velocity from gesture release
        deceleration: 0.95
      }),
      Animated.spring(this.state.position, {
        toValue: { x: 0, y: 0 }
      })
    ]).start();
  }
  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 2, 0, SCREEN_WIDTH * 2],
      outputRange: ["-120deg", "0deg", "120deg"]
    });
    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }
  getBtnStyle() {
    const { position } = this.state;
    const color = position.x.interpolate({
      inputRange: [
        -SCREEN_WIDTH,
        -SWIPE_THRESHOLD,
        0,
        SWIPE_THRESHOLD,
        SCREEN_WIDTH
      ],
      outputRange: ["#c0392b", "#f0f0f0", "#f0f0f0", "#f0f0f0", "#2ecc71"]
    });
    return {
      backgroundColor: color
    };
  }
  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }
    return this.props.data
      .map((item, i) => {
        if (i < this.state.index) {
          return null;
        }
        if (i === this.state.index) {
          return (
            <Animated.View
              key={item.id}
              style={[
                this.getCardStyle(),
                { position: "absolute", width: SCREEN_WIDTH }
              ]}
              {...this.state.panResponder.panHandlers}>
              {this.props.renderCard(item)}
            </Animated.View>
          );
        }
        return (
          <Animated.View
            key={item.id}
            style={{
              position: "absolute",
              width: SCREEN_WIDTH,
              top: 4 * (i - this.state.index)
            }}>
            {this.props.renderCard(item)}
          </Animated.View>
        );
      })
      .reverse();
  }
  render() {
    return (
      <View>
        {this.renderCards()}
        <Animated.View
          style={[
            this.getBtnStyle(),
            { height: 20, width: 200, marginTop: 500, alignSelf: "center" }
          ]}
        />
      </View>
    );
  }
}

export default Deck;
