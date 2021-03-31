import React from "react";

import {
  View,
  Dimensions,
  StyleSheet,
  Text,
  LayoutAnimation,
} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";

import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const MARGIN = screenWidth * 0.2;
const PAN_WIDTH = screenWidth - MARGIN * 2;
const PAN_HEIGHT = PAN_WIDTH * 1;
const PAN_SCALE = 0.5;
const PAN_SCALE_TRANSLATE_X = (screenWidth - PAN_WIDTH * PAN_SCALE) / 2;
const PAN_SCALE_TRANSLATE_Y = (screenHeight - PAN_HEIGHT * PAN_SCALE) / 2;
const MOVE_RANGE_X = (screenWidth - PAN_WIDTH) / 4;
const MOVE_RANGE_Y = (screenHeight - PAN_HEIGHT) / 4;


const springActionConfig = {
  damping: 20,
  stiffness: 400,
  mass: 1,
  overshootClamping: false,
};

export const PanModal = React.memo((props) => {
  const {
    translateX,
    translateY,
    activeRange,
    leading,
    style,
    color,
    scale,
    borderRadius,
    colorMask,
  } = props;
  const rotateZ = useSharedValue(0);

  const gestureEvent = useAnimatedGestureHandler(
    {
      onStart: (_, ctx) => {
        ctx.startX = translateX.value;
        ctx.startY = translateY.value;
        scale.value = withSpring(1, springActionConfig);
        borderRadius.value = withSpring(999, springActionConfig)

      },
      onActive: (event, ctx) => {
        translateX.value = ctx.startX + event.translationX;
        translateY.value = ctx.startY + event.translationY;
      },
      onEnd: (event, _) => {
        scale.value = withSpring(PAN_SCALE, springActionConfig);
        borderRadius.value = withSpring(20, springActionConfig)

        const x = translateX.value;
        const y = translateY.value;
        if (x > MOVE_RANGE_X) {
          translateX.value = withSpring(
            PAN_SCALE_TRANSLATE_X,
            springActionConfig
          );
          if (y > MOVE_RANGE_Y) {
            translateY.value = withSpring(
              PAN_SCALE_TRANSLATE_Y,
              springActionConfig
            );
          } else if (y < -MOVE_RANGE_Y) {
            translateY.value = withSpring(
              -PAN_SCALE_TRANSLATE_Y,
              springActionConfig
            );
          } else {
            translateY.value = withSpring(0, springActionConfig);
          }
        } else if (x < -MOVE_RANGE_X) {
          translateX.value = withSpring(
            -PAN_SCALE_TRANSLATE_X,
            springActionConfig
          );
          if (y > MOVE_RANGE_Y) {
            translateY.value = withSpring(
              PAN_SCALE_TRANSLATE_Y,
              springActionConfig
            );
          } else if (y < -MOVE_RANGE_Y) {
            translateY.value = withSpring(
              -PAN_SCALE_TRANSLATE_Y,
              springActionConfig
            );
          } else {
            translateY.value = withSpring(0, springActionConfig);
          }
        } else {
          translateX.value = withSpring(0, springActionConfig);

          if (y > MOVE_RANGE_Y) {
            translateY.value = withSpring(
              PAN_SCALE_TRANSLATE_Y,
              springActionConfig
            );
          } else if (y < -MOVE_RANGE_Y) {
            translateY.value = withSpring(
              -PAN_SCALE_TRANSLATE_Y,
              springActionConfig
            );
          } else {
            translateY.value = withSpring(0, springActionConfig);
          }
        }
      },
    },
    []
  );

  const panTranslationStyle = useAnimatedStyle(() => {
    return {
      borderRadius: borderRadius.value,
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  }, []);

  return (
    <PanGestureHandler minDist={activeRange} onGestureEvent={gestureEvent}>
      <Animated.View
        style={[
          styles.container,
          panTranslationStyle,
          {
            backgroundColor: color ?? "rgb(41, 240, 203)",
          },
          style,
        ]}
      >
        <Text style={[styles.text]}>滑动我</Text>
      </Animated.View>
    </PanGestureHandler>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(41, 240, 203)",
    width: PAN_WIDTH,
    height: PAN_HEIGHT,
    borderRadius: PAN_WIDTH * 0.05,
    position: "absolute",
    // borderWidth: 2,
    // borderColor: "white",
  },
  text: {
    fontWeight: "900",
    color: "black",
    fontSize: PAN_WIDTH * 0.1,
  },
  shadow: {
    shadowColor: "rgb(0,0,0)",
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
});
